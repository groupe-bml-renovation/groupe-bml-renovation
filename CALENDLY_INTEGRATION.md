# Unified Contact Form with Calendly Integration

## Overview
A complete unified contact form solution combining traditional form submission with real-time Calendly appointment scheduling. Users fill out contact information on the left while selecting appointment times in an embedded Calendly widget on the right.

## Components Implemented

### 1. Environment Configuration (.env)
- `VITE_CALENDLY_API_TOKEN` - Calendly API authentication token
- `VITE_CALENDLY_CALENDAR_URL` - Calendly calendar scheduling URL

### 2. Calendly Integration Service (src/services/calendlyService.ts)
Key functions for widget loading, prefill management, and event handling.

### 3. Database Schema Updates
Added columns to "Groupe BML Rénovation Leads" table:
- calendly_event_uri
- calendly_scheduled_time
- calendly_invitee_uri
- calendly_booking_status

### 4. Unified Contact Form Component (src/components/UnifiedContactForm.tsx)
Two-column responsive form with real-time Calendly integration.

### 5. Service Layer Enhancement (src/services/consultationsService.ts)
Updated to handle Calendly event data alongside form submission.

### 6. Homepage Integration
Replaced QuoteRequestForm with UnifiedContactForm in App.tsx.

## Key Features

- Real-time name/email prefill to Calendly widget
- Form validation prevents submission without appointment
- Responsive two-column desktop / stacked mobile layout
- Complete error handling and user feedback
- Analytics tracking of successful bookings
- Database storage of all appointment details
- TypeScript type safety throughout

## Build Status

Project builds successfully. No errors detected.
