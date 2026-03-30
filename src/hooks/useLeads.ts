import { useState, useCallback } from 'react';
import type { LeadData } from '../services/leadsService';
import { submitLead, getLeads, updateLead } from '../services/leadsService';
import type { Database } from '../lib/database.types';

type Lead = Database['public']['Tables']['leads']['Row'];

interface UseLeadsState {
  leads: Lead[] | null;
  loading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
}

interface UseLeadsReturn extends UseLeadsState {
  submitNewLead: (data: LeadData) => Promise<boolean>;
  fetchLeads: (limit?: number, offset?: number) => Promise<void>;
  refreshLeads: () => Promise<void>;
  updateExistingLead: (id: string, updates: Partial<LeadData>) => Promise<boolean>;
}

export function useLeads(): UseLeadsReturn {
  const [state, setState] = useState<UseLeadsState>({
    leads: null,
    loading: false,
    error: null,
    total: 0,
    hasMore: false
  });

  const fetchLeads = useCallback(async (limit = 50, offset = 0) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const result = await getLeads({ limit, offset });

    if (result.success) {
      setState(prev => ({
        ...prev,
        leads: result.data.data,
        total: result.data.total,
        hasMore: result.data.hasMore,
        loading: false
      }));
    } else {
      setState(prev => ({
        ...prev,
        error: result.error,
        loading: false
      }));
    }
  }, []);

  const submitNewLead = useCallback(async (data: LeadData): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const result = await submitLead(data);

    if (result.success) {
      setState(prev => ({ ...prev, loading: false }));
      await fetchLeads();
      return true;
    } else {
      setState(prev => ({
        ...prev,
        error: result.error,
        loading: false
      }));
      return false;
    }
  }, [fetchLeads]);

  const updateExistingLead = useCallback(async (id: string, updates: Partial<LeadData>): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const result = await updateLead(id, updates);

    if (result.success) {
      setState(prev => ({ ...prev, loading: false }));
      await fetchLeads();
      return true;
    } else {
      setState(prev => ({
        ...prev,
        error: result.error,
        loading: false
      }));
      return false;
    }
  }, [fetchLeads]);

  const refreshLeads = useCallback(async () => {
    await fetchLeads();
  }, [fetchLeads]);

  return {
    ...state,
    submitNewLead,
    fetchLeads,
    refreshLeads,
    updateExistingLead
  };
}
