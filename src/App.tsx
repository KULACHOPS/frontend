import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { DesktopSidebar } from './components/common/DesktopSidebar';
import { DashboardTopNav } from './components/common/DashboardTopNav';
import { CampusSelectorModal } from './components/common/CampusSelectorModal';
import { Toast } from './components/common/Toast';
import { BottomNav } from './components/common/BottomNav';

// Student Components & Views
import { LandingPage } from './components/student/LandingPage';
import { StudentDashboard } from './components/student/StudentDashboard';
import { VendorDetailView } from './components/student/VendorDetailView';
import { AuthModal } from './components/student/AuthModal';
import { MenuItemModal } from './components/student/MenuItemModal';
import { CartDrawer } from './components/student/CartDrawer';
import { CheckoutModal } from './components/student/CheckoutModal';
import { OrderTrackingModal } from './components/student/OrderTrackingModal';
import { WalletModal } from './components/student/WalletModal';
import { OrderHistoryModal } from './components/student/OrderHistoryModal';
import { RatingModal } from './components/student/RatingModal';

const MainLayout: React.FC = () => {
  const { isAuthenticated, selectedVendorForMenu, activeTab, setActiveTab } = useApp();

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="main-content">
          <LandingPage />
        </main>

        {/* Global Modals */}
        <AuthModal />
        <CampusSelectorModal />
        <MenuItemModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderTrackingModal />
        <WalletModal />
        <OrderHistoryModal />
        <RatingModal />
        <Toast />
      </>
    );
  }

  // Authenticated Student Experience: Desktop Sidebar + Mobile PWA BottomNav
  return (
    <div className="kula-auth-layout">
      {/* Mobile Top Navbar (hidden on desktop >= 960px where DesktopSidebar handles navigation) */}
      <div className="kula-mobile-nav-wrapper">
        <Navbar />
      </div>

      <div className="kula-auth-body-container">
        {/* Desktop Sidebar (visible on desktop >= 960px, hidden on mobile) */}
        <DesktopSidebar />

        {/* Main Content Column with Top Nav Section */}
        <div className="kula-auth-content-column" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Top Nav Section in the Dashboard (visible on desktop) */}
          <DashboardTopNav />

          {/* Main Content Area */}
          <main className="kula-auth-main-content">
            {selectedVendorForMenu ? (
              <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '24px 20px 80px' }}>
                <VendorDetailView />
              </div>
            ) : (
              <StudentDashboard />
            )}
          </main>
        </div>
      </div>

      {/* PWA Mobile Bottom Navigation Bar (visible on mobile <= 959px, hidden on desktop) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Modals */}
      <AuthModal />
      <CampusSelectorModal />
      <MenuItemModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <WalletModal />
      <OrderHistoryModal />
      <RatingModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
