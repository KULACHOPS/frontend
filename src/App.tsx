import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { CampusSelectorModal } from './components/common/CampusSelectorModal';
import { Toast } from './components/common/Toast';
import { BottomNav } from './components/common/BottomNav';

// Student Components
import { LandingPage } from './components/student/LandingPage';
import { VendorDetailView } from './components/student/VendorDetailView';
import { AuthModal } from './components/student/AuthModal';
import { MenuItemModal } from './components/student/MenuItemModal';
import { CartDrawer } from './components/student/CartDrawer';
import { CheckoutModal } from './components/student/CheckoutModal';
import { OrderTrackingModal } from './components/student/OrderTrackingModal';
import { WalletModal } from './components/student/WalletModal';
import { OrderHistoryModal } from './components/student/OrderHistoryModal';
import { RatingModal } from './components/student/RatingModal';

const StudentHome: React.FC = () => {
  const { selectedVendorForMenu } = useApp();

  if (selectedVendorForMenu) {
    return <VendorDetailView />;
  }

  return <LandingPage />;
};

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState<'explore' | 'search' | 'orders' | 'profile'>('explore');

  return (
    <>
      <Navbar />

      <main className="main-content" style={{ paddingBottom: isAuthenticated ? undefined : 0 }}>
        <div className="app-container">
          <StudentHome />
        </div>
      </main>

      {/* PWA Bottom Navigation Bar - ONLY displayed when student is authenticated */}
      {isAuthenticated && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

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
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}