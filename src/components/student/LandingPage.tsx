import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VendorCard } from './VendorCard';
import { FilterBar } from './FilterBar';
import type { FilterState } from './FilterBar';
import {
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  Wallet,
  Sparkles,
  ArrowRight,
  Store,
  Bike,
  GraduationCap,
  SearchX,
} from 'lucide-react';

interface LandingPageProps {
  onExploreClick?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  const {
    vendors,
    selectedCampus,
    setIsCampusModalOpen,
    showToast,
  } = useApp();

  const [selectedHostelZone, setSelectedHostelZone] = useState<string>(
    selectedCampus.deliveryZones[0]?.name || 'Moremi Hall'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState<FilterState>({
    onlyOpen: false,
    budgetFriendly: false,
    topRated: false,
    fastDelivery: false,
    campusSpecialOnly: false,
  });

  const campusVendors = vendors.filter((v) => v.campusId === selectedCampus.id);

  const filteredVendors = campusVendors.filter((v) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = v.name.toLowerCase().includes(q);
      const matchesTagline = v.tagline.toLowerCase().includes(q);
      const matchesCuisine = v.cuisineTypes.some((c) => c.toLowerCase().includes(q));
      if (!matchesName && !matchesTagline && !matchesCuisine) return false;
    }

    if (selectedCategory !== 'all') {
      const hasCuisine = v.cuisineTypes.some(
        (c) => c.toLowerCase() === selectedCategory.toLowerCase()
      );
      if (!hasCuisine) return false;
    }

    if (filters.onlyOpen && !v.isOpen) return false;
    if (filters.campusSpecialOnly && !v.isCampusSpecial) return false;
    if (filters.budgetFriendly && v.minOrderAmount > 1500) return false;
    if (filters.topRated && v.rating < 4.8) return false;
    if (filters.fastDelivery && !v.prepTimeEstimate.includes('10')) return false;

    return true;
  });

  const scrollToCanteens = () => {
    const el = document.getElementById('campus-canteens-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cravings = [
    { id: 'all', name: 'All Chops', emoji: '🔥', count: '15+ dishes' },
    { id: 'Rice Classics', name: 'Jollof & Fried Rice', emoji: '🍛', count: 'Hot & Smoky' },
    { id: 'Grills & Shawarma', name: 'Grills & Shawarma', emoji: '🌯', count: 'Jumbo wraps' },
    { id: 'Swallow & Soups', name: 'Amala, Egusi & Swallow', emoji: '🍲', count: 'Bukka specials' },
    { id: 'Late Night', name: 'Late Night (2AM)', emoji: '🌙', count: 'Exam fuel' },
    { id: 'Quick Bites', name: 'Noodles & Fries', emoji: '🍟', count: 'Fast prep' },
    { id: 'Drinks & Desserts', name: 'Zobo & Parfait', emoji: '🥤', count: 'Ice cold' },
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      {/* HERO SECTION - CHOWDECK "HAVE YOU EATEN?" STYLE */}
      <section
        style={{
          position: 'relative',
          borderRadius: '32px',
          background: 'radial-gradient(circle at 80% 20%, #3D2D28 0%, #241A17 50%, #17100E 100%)',
          color: '#FFFFFF',
          padding: '48px 24px 56px',
          overflow: 'hidden',
          marginBottom: '40px',
          boxShadow: '0 20px 50px -10px rgba(36, 26, 23, 0.4)',
        }}
      >
        {/* Decorative background aura */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(181, 154, 104, 0.25) 0%, rgba(181, 154, 104, 0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '20%',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 56, 30, 0.25) 0%, rgba(217, 56, 30, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Campus Pill */}
          <div
            onClick={() => setIsCampusModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(181, 154, 104, 0.35)',
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#B59A68',
              cursor: 'pointer',
              marginBottom: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            <MapPin size={14} color="#D9381E" />
            <span>Active Campus: {selectedCampus.name}</span>
            <span style={{ color: '#E9E3D8', fontSize: '11px' }}>(Change ▾)</span>
          </div>

          {/* Iconic Chowdeck-style Headline */}
          <h1
            style={{
              fontSize: 'clamp(32px, 5.5vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-1.2px',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
          >
            Have you eaten today? <br />
            <span style={{ color: '#D9381E' }}>Chop life on campus.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 2.5vw, 18px)',
              color: '#E9E3D8',
              maxWidth: '620px',
              margin: '0 auto 32px',
              lineHeight: 1.45,
            }}
          >
            Hot meals from your favorite campus canteens and late-night spots, delivered right to your hostel door in minutes.
          </p>

          {/* Chowdeck-style Search & Hostel Dropdown Location Bar */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              boxShadow: '0 15px 35px rgba(36,26,23,0.3)',
              border: '1px solid #DDD6CA',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            {/* Hostel Zone Dropdown */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                background: '#F8F5EF',
                borderRadius: '16px',
                border: '1px solid #DDD6CA',
                flex: '1 1 200px',
              }}
            >
              <MapPin size={18} color="#D9381E" />
              <select
                value={selectedHostelZone}
                onChange={(e) => setSelectedHostelZone(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#241A17',
                  width: '100%',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {selectedCampus.deliveryZones.map((z) => (
                  <option key={z.id} value={z.name}>
                    Deliver to: {z.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Food Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                flex: '2 1 240px',
              }}
            >
              <Search size={18} color="#8C7B74" />
              <input
                type="text"
                placeholder="What are you craving? (Jollof, Shawarma...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '14px',
                  color: '#241A17',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToCanteens}
              style={{
                background: 'linear-gradient(135deg, #D9381E 0%, #B82E17 100%)',
                color: '#FFFFFF',
                padding: '14px 26px',
                borderRadius: '18px',
                fontSize: '14px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(217, 56, 30, 0.4)',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <span>Find Food</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Hero Floating Feature Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: '28px',
              fontSize: '12px',
              color: '#E9E3D8',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} color="#B59A68" /> ~25 min hostel delivery
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#7A8469" /> 4-digit handover verification
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Wallet size={14} color="#B59A68" /> Meals from ₦1,000
            </span>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORIES CAROUSEL - CHOWDECK STYLE */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#241A17', letterSpacing: '-0.4px' }}>
              Explore Categories
            </h2>
            <p style={{ fontSize: '13px', color: '#574640', marginTop: '2px' }}>
              What are you in the mood for today?
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
          }}
        >
          {cravings.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  scrollToCanteens();
                }}
                style={{
                  background: isSelected ? '#241A17' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#241A17',
                  border: isSelected ? '2px solid #D9381E' : '1px solid #DDD6CA',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  minWidth: '150px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  boxShadow: isSelected ? '0 8px 20px rgba(36, 26, 23, 0.25)' : '0 2px 6px rgba(36,26,23,0.03)',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: '28px', marginBottom: '4px' }}>{c.emoji}</span>
                <strong style={{ fontSize: '14px', fontWeight: 800 }}>{c.name}</strong>
                <span style={{ fontSize: '11px', color: isSelected ? '#B59A68' : '#8C7B74' }}>
                  {c.count}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* CANTEEN CATALOG & SEARCH SECTION */}
      <section id="campus-canteens-section" style={{ marginBottom: '56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#241A17', letterSpacing: '-0.4px' }}>
              Available Campus Canteens ({filteredVendors.length})
            </h2>
            <p style={{ fontSize: '13px', color: '#574640', marginTop: '2px' }}>
              Delivering to <strong>{selectedHostelZone}</strong> and all UNILAG faculties
            </p>
          </div>
        </div>

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          totalVendorsCount={filteredVendors.length}
        />

        {filteredVendors.length === 0 ? (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '48px 24px',
              textAlign: 'center',
              border: '1px solid #DDD6CA',
            }}
          >
            <SearchX size={44} style={{ color: '#8C7B74', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#241A17' }}>No canteens matched your filters</h3>
            <p style={{ fontSize: '13px', color: '#574640', marginTop: '4px', maxWidth: '320px', margin: '4px auto 16px' }}>
              Try clearing your search query or loosening active filters to see all available food spots.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilters({
                  onlyOpen: false,
                  budgetFriendly: false,
                  topRated: false,
                  fastDelivery: false,
                  campusSpecialOnly: false,
                });
              }}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}
      </section>

      {/* "WHY KULACHOPS?" - CHOWDECK 4 PILLARS SECTION */}
      <section
        style={{
          background: '#FFFFFF',
          borderRadius: '32px',
          padding: '40px 24px',
          border: '1px solid #DDD6CA',
          boxShadow: '0 4px 20px rgba(36,26,23,0.03)',
          marginBottom: '56px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 36px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#D9381E',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              background: '#FDF1EE',
              padding: '4px 12px',
              borderRadius: '99px',
              border: '1px solid #F8C3B9',
            }}
          >
            Why Students Love Kulachops
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#241A17', marginTop: '8px', letterSpacing: '-0.5px' }}>
            Built completely around campus life.
          </h2>
          <p style={{ fontSize: '14px', color: '#574640', marginTop: '6px' }}>
            We solve the daily struggles of student feeding, canteen queues, and unsafe payment methods.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {/* Pillar 1 */}
          <div style={{ padding: '24px', borderRadius: '20px', background: '#F8F5EF', border: '1px solid #DDD6CA' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'rgba(122, 132, 105, 0.15)',
                color: '#7A8469',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Bike size={24} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17' }}>Direct Hostel Delivery</h4>
            <p style={{ fontSize: '13px', color: '#574640', marginTop: '6px', lineHeight: 1.4 }}>
              Forget trekking across faculty under the sun or queuing for 45 minutes at lunch. Riders deliver straight to your hostel gate or room block.
            </p>
          </div>

          {/* Pillar 2 */}
          <div style={{ padding: '24px', borderRadius: '20px', background: '#F8F5EF', border: '1px solid #DDD6CA' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: '#FDF1EE',
                color: '#D9381E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Wallet size={24} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17' }}>Student-Budget Prices</h4>
            <p style={{ fontSize: '13px', color: '#574640', marginTop: '6px', lineHeight: 1.4 }}>
              Meals tailored for student pockets from ₦1,000. Transparent low delivery fees (₦300–₦400 flat) with zero hidden surge charges.
            </p>
          </div>

          {/* Pillar 3 */}
          <div style={{ padding: '24px', borderRadius: '20px', background: '#F8F5EF', border: '1px solid #DDD6CA' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'rgba(181, 154, 104, 0.15)',
                color: '#B59A68',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17' }}>4-Digit Handover PIN</h4>
            <p style={{ fontSize: '13px', color: '#574640', marginTop: '6px', lineHeight: 1.4 }}>
              Never worry about someone claiming your food in the hostel lobby. Delivery only completes after you give the rider your secret 4-digit code.
            </p>
          </div>

          {/* Pillar 4 */}
          <div style={{ padding: '24px', borderRadius: '20px', background: '#F8F5EF', border: '1px solid #DDD6CA' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'rgba(36, 26, 23, 0.08)',
                color: '#241A17',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Sparkles size={24} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17' }}>In-App Wallet & Refunds</h4>
            <p style={{ fontSize: '13px', color: '#574640', marginTop: '6px', lineHeight: 1.4 }}>
              Tired of bank transfer network delays? Top up your Kulachops wallet once and order in 1 click, with automated instant refunds if an item runs out.
            </p>
          </div>
        </div>
      </section>

      {/* CHOWDECK 3-PILLAR ECOSYSTEM CARDS: STUDENTS, VENDORS, RIDERS */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 36px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#241A17', letterSpacing: '-0.5px' }}>
            A Complete Food Ecosystem for Your University
          </h2>
          <p style={{ fontSize: '14px', color: '#574640', marginTop: '6px' }}>
            Empowering students, campus food vendors, and student couriers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Card 1: Students */}
          <div
            style={{
              background: 'linear-gradient(135deg, #D9381E 0%, #A92610 100%)',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 25px rgba(217, 56, 30, 0.25)',
            }}
          >
            <div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <GraduationCap size={24} color="#FFFFFF" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>For Students</h3>
              <p style={{ fontSize: '13px', color: '#FDF1EE', marginTop: '8px', lineHeight: 1.45 }}>
                Order piping hot meals during lectures, midnight study marathons, or weekend chill sessions. Track your rider in real time.
              </p>
            </div>
            <button
              onClick={scrollToCanteens}
              style={{
                marginTop: '24px',
                background: '#241A17',
                color: '#FFFFFF',
                fontWeight: 800,
                padding: '12px 20px',
                borderRadius: '99px',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                alignSelf: 'flex-start',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              Start Ordering <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2: Campus Vendors */}
          <div
            style={{
              background: '#241A17',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 25px rgba(36, 26, 23, 0.2)',
            }}
          >
            <div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(181, 154, 104, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Store size={24} color="#B59A68" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>For Campus Vendors</h3>
              <p style={{ fontSize: '13px', color: '#DDD6CA', marginTop: '8px', lineHeight: 1.45 }}>
                Digitize your menu, eliminate the chaos of WhatsApp orders, reach thousands of students in hostels, and enjoy guaranteed automated bank settlements.
              </p>
            </div>
            <button
              onClick={() => showToast('Vendor Onboarding application opened (Simulated)', 'info')}
              style={{
                marginTop: '24px',
                background: '#B59A68',
                color: '#241A17',
                fontWeight: 800,
                padding: '12px 20px',
                borderRadius: '99px',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                alignSelf: 'flex-start',
              }}
            >
              List Your Restaurant <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 3: Student Couriers */}
          <div
            style={{
              background: 'linear-gradient(135deg, #7A8469 0%, #575E4B 100%)',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 25px rgba(122, 132, 105, 0.25)',
            }}
          >
            <div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Bike size={24} color="#FFFFFF" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>For Student Couriers</h3>
              <p style={{ fontSize: '13px', color: '#F1F4EE', marginTop: '8px', lineHeight: 1.45 }}>
                Earn on your own schedule between lectures. Deliver on foot or bicycle across campus zones, earn per trip, and get paid weekly.
              </p>
            </div>
            <button
              onClick={() => showToast('Courier sign-up opened (Simulated)', 'info')}
              style={{
                marginTop: '24px',
                background: '#241A17',
                color: '#FFFFFF',
                fontWeight: 800,
                padding: '12px 20px',
                borderRadius: '99px',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                alignSelf: 'flex-start',
              }}
            >
              Deliver with Kulachops <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* CHOWDECK-STYLE BOTTOM FOOTER */}
      <footer
        style={{
          background: '#241A17',
          borderRadius: '32px',
          padding: '48px 32px',
          color: '#DDD6CA',
          fontSize: '13px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
                KULA<span style={{ color: '#D9381E' }}>CHOPS</span>
              </span>
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.5, color: '#DDD6CA' }}>
              The on-demand campus food ordering and delivery web platform built for Nigerian university students.
            </p>
            <p style={{ fontSize: '11px', color: '#7A8469', fontWeight: 700, marginTop: '12px' }}>
              ● 100% Student Vetted & Safe
            </p>
          </div>

          {/* Col 2: Campuses */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
              Pilot Campuses
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ color: '#E9E3D8' }}>UNILAG (Akoka & Yaba)</span>
              <span style={{ color: '#E9E3D8' }}>University of Ibadan (UI)</span>
              <span style={{ color: '#E9E3D8' }}>Obafemi Awolowo Univ (OAU)</span>
              <span style={{ color: '#8C7B74' }}>FUTA, Covenant (Coming soon)</span>
            </div>
          </div>

          {/* Col 3: Popular Food */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
              Campus Classics
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ color: '#E9E3D8' }}>Smoky Jollof & Dodo</span>
              <span style={{ color: '#E9E3D8' }}>Double Sausage Shawarma</span>
              <span style={{ color: '#E9E3D8' }}>Hot Amala & Abula</span>
              <span style={{ color: '#E9E3D8' }}>Midnight Exam Indomie</span>
            </div>
          </div>

          {/* Col 4: Safety & Support */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
              Trust & Safety
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span>4-Digit Delivery Code</span>
              <span>PCI-DSS Secured Card Pay</span>
              <span>Dedicated Virtual Accounts</span>
              <span>Support: 0800-KULACHOPS</span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid #3D2D28',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12px',
          }}
        >
          <span>© 2026 KULACHOPS Inc. All rights reserved. Built for Nigerian Campuses.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>NDPC Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
