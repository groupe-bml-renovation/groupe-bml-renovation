import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';

interface LayoutProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  onNavigateToServices?: (pageId?: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  currentPage,
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onNavigateToServices,
}) => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Navigation
        currentPage={currentPage}
        onNavigate={onNavigate}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <Footer onNavigateToServices={onNavigateToServices} />
    </div>
  );
};

export default Layout;
