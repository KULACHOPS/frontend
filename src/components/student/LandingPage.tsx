import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  ChevronRight,
  ArrowRight,
  X,
} from 'lucide-react';
import DoodleCrewFooter from '../ui/doodle-crew-footer';

interface LandingPageProps {
  onExploreClick?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  const {
    selectedCampus,
    setIsCampusModalOpen,
    setActiveTrackingOrderId,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<'restaurants' | 'shops' | 'pharmacies' | 'markets' | 'events' | 'bills'>('restaurants');
  // const [activeStep, setActiveStep] = useState(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [selectedMapLocation, setSelectedMapLocation] = useState<string>('Moremi Gate');

  // Multilingual Campus Headline Cycler
  const campusGreetings = [
    'I riela nri?',
    'You don chop?',
    'Se o ti jeun?',
    'Kun ci abinci?',
    'Have you eaten?',
    'Kula chop?',
  ];
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % campusGreetings.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [campusGreetings.length]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 6 "What's Cooking" Campus Verticals
  const verticals = [
    {
      id: 'restaurants',
      title: 'Restaurants',
      color: '#E8E4FB',
      borderColor: '#8C77EC',
      textColor: '#271386',
      description: 'Order food from a wide variety of campus canteens and bukkas, ranging from African to Continental cuisines.',
      tags: ['Jollof Rice', 'Pizza', 'Egusi Soup', 'Waffles', 'Pancakes', 'Swallow', 'Shawarma'],
    },
    {
      id: 'shops',
      title: 'Shops',
      color: '#FEF9E7',
      borderColor: '#FFC501',
      textColor: '#805B00',
      description: 'Groceries, stationery, hostel essentials, and snacks from trusted student shops and supermarkets nearby.',
      tags: ['Snacks', 'Beverages', 'Toiletries', 'Stationery', 'Provisions', 'Milk & Milo'],
    },
    {
      id: 'pharmacies',
      title: 'Pharmacies',
      color: '#E0F2FE',
      borderColor: '#38BDF8',
      textColor: '#0369A1',
      description: 'Over-the-counter meds, wellness products, first-aid items, and hygiene essentials from verified pharmacies.',
      tags: ['Pain Relief', 'Vitamins', 'First Aid', 'Skincare', 'Sanitary Pads', 'Bandages'],
    },
    {
      id: 'markets',
      title: 'Local Markets',
      color: '#E6F4EA',
      borderColor: '#34A853',
      textColor: '#137333',
      description: 'Fresh fruits, plantains, peppers, bread, and groceries directly from student food markets closest to you.',
      tags: ['Fresh Fruits', 'Plantain', 'Eggs', 'Vegetables', 'Tubers', 'Cooking Oil'],
    },
    {
      id: 'events',
      title: 'Events',
      color: '#FCE7F3',
      borderColor: '#F472B6',
      textColor: '#9D174D',
      description: 'Tickets to campus concerts, dinner nights, student week shows, sports derbies, and hall hangouts.',
      tags: ['Hall Week', 'Faculty Dinner', 'Concerts', 'Sports Derby', 'Campus Comedy'],
    },
    {
      id: 'bills',
      title: 'Bills',
      color: '#FFEDD5',
      borderColor: '#FB923C',
      textColor: '#C2410C',
      description: 'Hostel power tokens, student airtime, MTN/Airtel data bundles, and everyday campus subscriptions in one place.',
      tags: ['Airtime', 'Data Bundles', 'Power Tokens', 'Cable TV', 'Internet Subs'],
    },
  ];

  // 3 "Join our growing network" Cards
  const networkCards = [
    {
      title: 'Start selling',
      desc: 'Do you own a campus canteen, bukkah, bakery, or hostel snack stall? Join our network to reach new student customers and grow your sales.',
      tagColor: '#FF884D',
      linkText: 'SEE MORE',
      illustration: (
        <div style={{ width: '100%', height: '100%', background: '#FFC501', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <svg width="180" height="140" viewBox="0 0 200 160" fill="none">
            <circle cx="100" cy="80" r="60" fill="#FF884D" />
            <circle cx="100" cy="80" r="50" fill="#FFEAA7" />
            <circle cx="80" cy="70" r="8" fill="#E80B2E" />
            <circle cx="120" cy="75" r="9" fill="#E80B2E" />
            <circle cx="100" cy="100" r="8" fill="#E80B2E" />
            <rect x="70" y="85" width="10" height="6" rx="3" fill="#FF5500" />
            <rect x="115" y="90" width="12" height="6" rx="3" fill="#FF5500" />
            <path d="M40 80 L160 80" stroke="#090C0B" strokeWidth="3" strokeDasharray="6 6" />
            <path d="M100 20 L100 140" stroke="#090C0B" strokeWidth="3" strokeDasharray="6 6" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Deliver happiness',
      desc: 'Join our elite league of delivery riders delivering happiness to students and earn to achieve your dreams while at it.',
      tagColor: '#FF5500',
      linkText: 'SEE MORE',
      illustration: (
        <div style={{ width: '100%', height: '100%', background: '#FF7700', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <svg width="180" height="140" viewBox="0 0 200 160" fill="none">
            <rect x="60" y="45" width="80" height="65" rx="14" fill="#FF5500" stroke="#090C0B" strokeWidth="4" />
            <rect x="75" y="35" width="50" height="15" rx="6" fill="#FFC501" stroke="#090C0B" strokeWidth="3" />
            <path d="M60 75 H140" stroke="#FFC501" strokeWidth="6" />
            <circle cx="80" cy="125" r="16" fill="#090C0B" />
            <circle cx="80" cy="125" r="6" fill="#FFF" />
            <circle cx="130" cy="125" r="16" fill="#090C0B" />
            <circle cx="130" cy="125" r="6" fill="#FFF" />
            <path d="M20 140 Q100 130 180 140" stroke="#090C0B" strokeWidth="4" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Behind the scenes',
      desc: 'If you are passionate about helping us achieve our goal to deliver meals seamlessly, come join the campus lead & engineering team.',
      tagColor: '#8C77EC',
      linkText: 'SEE MORE',
      illustration: (
        <div style={{ width: '100%', height: '100%', background: '#8C77EC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <svg width="200" height="140" viewBox="0 0 220 160" fill="none">
            <circle cx="60" cy="80" r="26" fill="#FFD200" stroke="#090C0B" strokeWidth="4" />
            <circle cx="52" cy="76" r="4" fill="#090C0B" />
            <circle cx="68" cy="76" r="4" fill="#090C0B" />
            <path d="M54 90 Q60 98 66 90" stroke="#090C0B" strokeWidth="3" fill="none" />
            <circle cx="110" cy="65" r="28" fill="#FF884D" stroke="#090C0B" strokeWidth="4" />
            <circle cx="102" cy="62" r="4" fill="#090C0B" />
            <circle cx="118" cy="62" r="4" fill="#090C0B" />
            <path d="M104 76 Q110 84 116 76" stroke="#090C0B" strokeWidth="3" fill="none" />
            <circle cx="160" cy="82" r="24" fill="#05AA70" stroke="#090C0B" strokeWidth="4" />
            <circle cx="152" cy="80" r="3.5" fill="#090C0B" />
            <circle cx="168" cy="80" r="3.5" fill="#090C0B" />
            <path d="M154 92 Q160 98 166 92" stroke="#090C0B" strokeWidth="3" fill="none" />
          </svg>
        </div>
      ),
    },
  ];

  /*
  // 4 Steps in "Download the app" Carousel
  const stepItems = [
    {
      title: 'Download the app',
      step: '01',
      subtitle: 'Get Kulachop on Google Play or iOS, or order directly in your browser.',
    },
    {
      title: 'Explore categories',
      step: '02',
      subtitle: 'Find popular campus bukkas, shawarma grills, and 2AM late-night spots.',
    },
    {
      title: 'Place your order',
      step: '03',
      subtitle: 'Pay with your student in-app wallet and receive your secret 4-digit PIN.',
    },
    {
      title: 'Unpack and enjoy',
      step: '04',
      subtitle: 'Meet your student courier at your hostel gate, confirm your PIN, and enjoy.',
    },
  ];
  */

  // Stories Cards
  const stories = [
    {
      badge: 'BLACK FRIDAY',
      title: 'Campus Black Friday Chops Fest',
      desc: 'Claim special discount vouchers, ₦0 delivery fee drops, and bonus student wallet credits all week long!',
      btnText: 'Read More',
      themeBg: '#090C0B',
      themeText: '#FFC501',
    },
    {
      badge: 'CAMPUS DERBY',
      title: 'Matchday Delivery for Inter-Faculty Games',
      desc: 'Live pitchside food deliveries for faculty sports! Cold drinks and snacks brought straight to the bleachers.',
      btnText: 'Read More',
      themeBg: '#FF5500',
      themeText: '#FFF0E8',
    },
    {
      badge: 'KULAPASS VIP',
      title: 'Unlimited Free Deliveries for 15,000+ Students',
      desc: 'How KulaPass membership is helping students save thousands on hostel gate deliveries every single semester.',
      btnText: 'Read More',
      themeBg: '#271386',
      themeText: '#FFC501',
    },
  ];

  // FAQs & Detailed Answer Card
  const faqs = [
    {
      q: 'What is Kulachop?',
      a: 'Kulachop is a campus food and grocery logistics platform built specifically for Nigerian university communities. Our service connects students, campus eateries, bukkas, and dedicated student couriers to deliver hot, affordable meals and everyday essentials straight to resident hall gates in minutes.',
    },
    {
      q: 'Does Kulachop deliver groceries and essentials?',
      a: 'Yes! In addition to piping-hot cooked meals from top canteens, you can order groceries, bread, eggs, fruit, drinks, and hygiene supplies from verified mini-marts and campus kiosks.',
    },
    {
      q: 'Will my food stay hot when delivered to the hostel gate?',
      a: 'Absolutely. Our student couriers use insulated thermal bags and are stationed right on campus grounds, ensuring your orders arrive fresh and warm within 15–20 minutes.',
    },
    {
      q: 'How does the 4-digit handover PIN work?',
      a: 'When you place an order, you receive a secret 4-digit code. When the courier reaches your hostel gate or faculty quad, you provide this PIN. The order cannot be marked delivered without matching your code, preventing delivery mix-ups.',
    },
    {
      q: 'How do I sign up as a campus canteen or snack vendor?',
      a: 'Canteens and student kitchens can register online within 5 minutes. We verify your menu, set up automated bank settlements, and list your dishes for thousands of active student foodies.',
    },
    {
      q: 'What is the Student In-App Wallet?',
      a: 'The Student Wallet allows you to pre-load money and pay with a single tap, avoiding bank transfer delays or network downtimes. If an item sells out, your wallet is refunded instantly.',
    },
    {
      q: 'What is KulaPass?',
      a: 'KulaPass is our campus membership offering unlimited free deliveries on orders over ₦1,500, zero surge charges, and 15% discounts at partner canteens.',
    },
  ];

  const campusMapZones = [
    { name: 'Moremi Gate', x: 28, y: 35, subtitle: 'Female Hall Zone • 10-15 min', status: 'Active' },
    { name: 'New Hall Quad', x: 48, y: 52, subtitle: 'Central Hub • 8-12 min', status: 'Active' },
    { name: 'Jaja Hall Gate', x: 22, y: 68, subtitle: 'Hostel Gate • 12-18 min', status: 'Active' },
    { name: 'Faculty Quad', x: 68, y: 38, subtitle: 'Lecture Theatres • 10-15 min', status: 'Active' },
    { name: 'Library Complex', x: 42, y: 22, subtitle: 'Study Area • 10-14 min', status: 'Active' },
    { name: 'Akoka Main Gate', x: 82, y: 20, subtitle: 'Campus Entrance • 12-16 min', status: 'Active' },
    { name: 'Medilag Campus Gate', x: 78, y: 72, subtitle: 'College of Medicine • 18-25 min', status: 'Active' },
    { name: 'Mariere Hall Gate', x: 35, y: 58, subtitle: 'Male Hostel • 10-15 min', status: 'Active' },
  ];

  return (
    <div style={{ width: '100%', backgroundColor: '#FAF9F5', color: '#090C0B', fontFamily: 'inherit' }}>
      {/* =========================================================================
          1. CAMPUS HERO SHOWCASE
          ========================================================================= */}
      <section style={{ position: 'relative', width: '100%', paddingTop: '48px', paddingBottom: 0, overflow: 'hidden', backgroundColor: '#FAF9F5' }}>
        {/* Floating Playful Neo-Brutalist Badges (Desktop) */}
        <div
          className="hero-floating-badge-left"
          style={{
            position: 'absolute',
            top: '40px',
            left: '3%',
            backgroundColor: '#FFFFFF',
            border: '3px solid #090C0B',
            borderRadius: '20px',
            padding: '12px 18px',
            boxShadow: '0 8px 0 #090C0B',
            alignItems: 'center',
            gap: '12px',
            zIndex: 30,
            maxWidth: '240px',
            textAlign: 'left',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#FFC501',
              border: '2px solid #090C0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
            }}
          >
            🛵
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#090C0B', lineHeight: 1.2 }}>
              Rider on the way
            </div>
            <div style={{ fontSize: '11px', color: '#525C57', fontWeight: 700, marginTop: '2px' }}>
              Moremi Gate • 4 min
            </div>
          </div>
        </div>

        <div
          className="hero-floating-badge-right"
          style={{
            position: 'absolute',
            top: '55px',
            right: '3%',
            backgroundColor: '#FFC501',
            border: '3px solid #090C0B',
            borderRadius: '20px',
            padding: '12px 18px',
            boxShadow: '0 8px 0 #090C0B',
            alignItems: 'center',
            gap: '12px',
            zIndex: 30,
            maxWidth: '230px',
            textAlign: 'left',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '2px solid #090C0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
            }}
          >
            🔥
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#090C0B', lineHeight: 1.2 }}>
              Hot Jollof & Asun
            </div>
            <div style={{ fontSize: '11px', color: '#090C0B', fontWeight: 700, opacity: 0.85, marginTop: '2px' }}>
              ₦1,200 • Student Special
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px', textAlign: 'center', position: 'relative', zIndex: 20 }}>
          {/* Giant Multilingual Cycling Headline */}
          <h1
            style={{
              fontSize: 'clamp(44px, 7.5vw, 108px)',
              fontWeight: 900,
              letterSpacing: '-2.5px',
              color: '#090C0B',
              lineHeight: 1.02,
              marginBottom: '24px',
              minHeight: '1.2em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              key={greetingIndex}
              style={{
                display: 'inline-block',
                animation: 'heroGreetingIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {campusGreetings[greetingIndex]}
            </span>
          </h1>

          {/* Floating Pill Search Bar */}
          <div style={{ width: '100%', maxWidth: '680px', margin: '0 auto 40px' }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px 0 16px',
                height: '68px',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 14px 35px -4px rgba(9, 12, 11, 0.12)',
                border: '2px solid #E2E8F0',
                transition: 'all 0.2s ease',
              }}
            >
              <button
                type="button"
                onClick={() => setIsCampusModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#FF5500',
                  padding: '4px 8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                title="Change Campus"
              >
                <MapPin size={22} color="#FF5500" />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#090C0B',
                    backgroundColor: '#F0F3F1',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {selectedCampus.shortName} ▾
                </span>
              </button>

              <input
                type="text"
                placeholder="Enter a delivery address or campus hostel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') scrollToSection('campus-map-section');
                }}
                style={{
                  flex: 1,
                  border: 'none',
                  height: '100%',
                  background: 'transparent',
                  outline: 'none',
                  color: '#090C0B',
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '0 12px',
                }}
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    padding: '4px',
                    color: '#94A3B8',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '8px',
                  }}
                >
                  <X size={18} />
                </button>
              )}

              <button
                type="button"
                onClick={() => scrollToSection('campus-map-section')}
                style={{
                  backgroundColor: '#FF5500',
                  borderRadius: '9999px',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  padding: '13px 28px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(255, 85, 0, 0.4)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                Order now
              </button>
            </div>
          </div>
        </div>

        {/* HERO CITY / CAMPUS SKYLINE ILLUSTRATION */}
        <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, position: 'relative', zIndex: 10, paddingTop: '16px' }}>
          <svg
            style={{ width: '100%', height: 'auto', minHeight: '160px', maxHeight: '340px' }}
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYEnd meet"
          >
            <rect width="1440" height="320" fill="transparent" />
            <path d="M0 260 L1440 260 L1440 320 L0 320 Z" fill="#FF5500" opacity="0.12" />
            <path d="M800 180 L1440 180 L1440 230 L800 230 Z" fill="#FFA366" opacity="0.25" />
            <path d="M820 230 Q860 210 900 230 Q940 210 980 230 Q1020 210 1060 230 Q1100 210 1140 230 Q1180 210 1220 230 Q1260 210 1300 230 Q1340 210 1380 230" stroke="#FF5500" strokeWidth="4" fill="none" opacity="0.4" />

            {/* Drifting Animated Clouds */}
            <g style={{ animation: 'heroCloudDrift1 45s linear infinite' }}>
              <path d="M0 45 Q20 28 42 38 Q65 22 95 35 Q125 25 145 42 Q165 32 185 45 Z" fill="#FFFFFF" opacity="0.75" />
            </g>
            <g style={{ animation: 'heroCloudDrift2 30s linear infinite', animationDelay: '-15s' }}>
              <path d="M0 80 Q25 62 55 72 Q80 54 115 68 Q145 58 170 76 Q195 66 220 80 Z" fill="#FFFFFF" opacity="0.6" />
            </g>

            {/* Left Building (Yellow Striped Tower) */}
            <g transform="translate(40, 40)">
              <rect x="0" y="0" width="160" height="230" fill="#F8C134" stroke="#090C0B" strokeWidth="5" />
              {[...Array(14)].map((_, i) => (
                <rect key={i} x="10" y={15 + i * 15} width="140" height="7" fill="#090C0B" />
              ))}
              <rect x="15" y="-15" width="30" height="15" fill="#E80B2E" stroke="#090C0B" strokeWidth="4" />
              {/* Blinking Red Beacon Light */}
              <circle cx="30" cy="-20" r="5" fill="#E80B2E" style={{ animation: 'heroBeaconBlink 1.4s ease-in-out infinite' }} />
            </g>

            {/* Foliage */}
            <circle cx="280" cy="240" r="45" fill="#05AA70" />
            <circle cx="340" cy="235" r="40" fill="#038B5C" />
            <circle cx="410" cy="240" r="45" fill="#05AA70" />

            {/* Center Stadium / Dome Structure */}
            <g transform="translate(320, 80)">
              <ellipse cx="260" cy="90" rx="260" ry="32" fill="#05AA70" stroke="#090C0B" strokeWidth="6" />
              <ellipse cx="260" cy="85" rx="240" ry="24" fill="#014C32" />
              <path d="M50 90 L120 180 L400 180 L470 90 Z" fill="#FFFFFF" stroke="#090C0B" strokeWidth="6" />
              <path d="M100 90 L150 180" stroke="#090C0B" strokeWidth="5" />
              <path d="M160 90 L195 180" stroke="#090C0B" strokeWidth="5" />
              <path d="M220 90 L240 180" stroke="#090C0B" strokeWidth="5" />
              <path d="M280 90 L280 180" stroke="#090C0B" strokeWidth="5" />
              <path d="M340 90 L320 180" stroke="#090C0B" strokeWidth="5" />
              <path d="M400 90 L365 180" stroke="#090C0B" strokeWidth="5" />
              <rect x="235" y="110" width="50" height="14" rx="4" fill="#E80B2E" />
              <rect x="245" y="132" width="30" height="10" rx="3" fill="#3B82F6" />
            </g>

            {/* Right Skyscraper (Blue Highrise with Windows) */}
            <g transform="translate(880, 60)">
              <rect x="0" y="0" width="150" height="210" fill="#559CFF" stroke="#090C0B" strokeWidth="5" />
              <rect x="15" y="-20" width="45" height="20" fill="#FFC501" stroke="#090C0B" strokeWidth="4" />
              {/* Blinking Red Beacon Light */}
              <circle cx="37" cy="-26" r="5" fill="#E80B2E" style={{ animation: 'heroBeaconBlink 1.6s ease-in-out infinite 0.5s' }} />
              {[...Array(6)].map((_, r) => (
                <g key={r}>
                  {[...Array(4)].map((_, c) => (
                    <rect key={c} x={20 + c * 30} y={20 + r * 28} width="18" height="16" fill="#FFFFFF" rx="2" />
                  ))}
                </g>
              ))}
            </g>

            {/* Trees in front */}
            <circle cx="850" cy="245" r="35" fill="#05AA70" stroke="#090C0B" strokeWidth="4" />
            <circle cx="1060" cy="240" r="40" fill="#014C32" stroke="#090C0B" strokeWidth="4" />
            <circle cx="1120" cy="250" r="32" fill="#05AA70" stroke="#090C0B" strokeWidth="4" />

            {/* Foreground Asphalt Road */}
            <path
              d="M0 270 Q400 240 800 260 L1440 230 L1440 320 L0 320 Z"
              fill="#2C3A3B"
              stroke="#090C0B"
              strokeWidth="5"
            />
            <path
              d="M0 295 Q400 265 800 285 L1440 255"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeDasharray="25 20"
            />

            {/* Animated Delivery Courier Riding Continuously Across Road */}
            <g style={{ animation: 'heroRiderDrive 18s linear infinite' }}>
              <g style={{ animation: 'floatSlow 1.4s ease-in-out infinite' }}>
                {/* Rear Wheel with Rotating Spokes */}
                <g style={{ transformOrigin: '20px 40px', animation: 'heroWheelSpin 1.2s linear infinite' }}>
                  <circle cx="20" cy="40" r="14" fill="#090C0B" />
                  <circle cx="20" cy="40" r="6" fill="#FFFFFF" />
                  <line x1="20" y1="26" x2="20" y2="54" stroke="#090C0B" strokeWidth="1.5" />
                  <line x1="6" y1="40" x2="34" y2="40" stroke="#090C0B" strokeWidth="1.5" />
                </g>
                {/* Front Wheel with Rotating Spokes */}
                <g style={{ transformOrigin: '68px 40px', animation: 'heroWheelSpin 1.2s linear infinite' }}>
                  <circle cx="68" cy="40" r="14" fill="#090C0B" />
                  <circle cx="68" cy="40" r="6" fill="#FFFFFF" />
                  <line x1="68" y1="26" x2="68" y2="54" stroke="#090C0B" strokeWidth="1.5" />
                  <line x1="54" y1="40" x2="82" y2="40" stroke="#090C0B" strokeWidth="1.5" />
                </g>
                {/* Bike Frame & Delivery Courier */}
                <path d="M20 40 L38 35 L52 20 L68 40" stroke="#FF5500" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="0" y="8" width="32" height="26" rx="4" fill="#FF5500" stroke="#090C0B" strokeWidth="2.5" />
                <circle cx="16" cy="21" r="5" fill="#FFC501" />
                <circle cx="48" cy="4" r="11" fill="#FFC501" stroke="#090C0B" strokeWidth="2.5" />
                <path d="M48 15 L45 32" stroke="#090C0B" strokeWidth="6" strokeLinecap="round" />
                <path d="M48 20 L58 24" stroke="#090C0B" strokeWidth="4" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </div>
      </section>

      {/* =========================================================================
          2. "WHAT'S ON KULACHOP?" (TRY THE EVERYTHING CAMPUS PLATFORM)
          ========================================================================= */}
      <section style={{ padding: '80px 20px', backgroundColor: '#FFFFFF', borderTop: '2px solid #E5EAE7', borderBottom: '2px solid #E5EAE7', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#090C0B', letterSpacing: '-1.5px', marginBottom: '8px' }}>
            What’s on Kulachop?
          </h2>
          <p style={{ fontSize: '18px', color: '#525C57', fontWeight: 600, marginBottom: '32px' }}>
            Try the everything campus app.
          </p>

          {/* App download buttons commented out since mobile app is not yet live */}
          {/*
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
            <button
              onClick={() => showToast('Kulachop Android App on Google Play launching soon!', 'info')}
              style={{
                backgroundColor: '#FF5500',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(255, 85, 0, 0.4)',
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M4 3.5v17l14-8.5-14-8.5z" fill="#FFF" />
              </svg>
              <span>Download on Google Play</span>
            </button>

            <button
              onClick={() => showToast('Kulachop iOS App on App Store launching soon!', 'info')}
              style={{
                backgroundColor: '#FF5500',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(255, 85, 0, 0.4)',
              }}
            >
              <svg width="16" height="18" fill="currentColor" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.66-7.8-11.91-14.28-6.1-9.35-10.8-19.8-14.11-31.35-3.31-11.55-4.97-22.38-4.97-32.48 0-14.34 3.48-26.29 10.43-35.85 6.95-9.56 15.65-14.52 26.11-14.88 5.43 0 11.39 1.41 17.88 4.23 6.49 2.82 10.63 4.3 12.42 4.45 1.52-.15 5.92-1.74 13.2-4.77 7.28-3.03 13.54-4.38 18.78-4.05 14.12.98 25.09 5.86 32.91 14.65-12.38 7.5-18.42 17.71-18.13 30.64.22 10.21 4.13 18.68 11.73 25.42 7.6 6.74 16.73 10.76 27.38 12.06-2.17 6.3-4.89 12.5-8.15 18.6zM119.22 31.55c-.22 2.82-1.09 5.86-2.61 9.12-1.52 3.26-3.7 6.08-6.52 8.47-3.15 2.61-6.68 4.45-10.59 5.54-3.91 1.09-7.55 1.47-10.92 1.14-.22-2.82.65-5.86 2.61-9.12 1.95-3.26 4.35-6.08 7.17-8.47 3.04-2.61 6.57-4.45 10.59-5.54 4.02-1.09 7.49-1.47 10.27-1.14z" />
              </svg>
              <span>Download on App Store</span>
            </button>
          </div>
          */}

          {/* Web Explore Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
            <a
              href="#campus-map-section"
              style={{
                backgroundColor: '#FF5500',
                color: '#FFFFFF',
                padding: '14px 32px',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(255, 85, 0, 0.4)',
                textDecoration: 'none',
              }}
            >
              <span>Explore Delivery Locations</span>
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Phone Mockup Centered with Vertical Colored Cards */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', maxWidth: '1240px', margin: '0 auto' }}>
            {/* Left 3 Cards */}
            <div style={{ flex: '1 1 300px', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              {verticals.slice(0, 3).map((v) => {
                const isActive = selectedVertical === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVertical(v.id as any)}
                    style={{
                      backgroundColor: v.color,
                      border: `4px solid ${isActive ? '#090C0B' : v.borderColor}`,
                      borderRadius: '24px',
                      padding: '24px',
                      cursor: 'pointer',
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: isActive ? '0 10px 25px rgba(0,0,0,0.1)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px', color: v.textColor }}>
                      {v.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#4A5550', lineHeight: 1.5, marginBottom: '14px' }}>
                      {v.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {v.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          style={{
                            background: 'rgba(255, 255, 255, 0.85)',
                            border: '1px solid rgba(0,0,0,0.1)',
                            borderRadius: '9999px',
                            padding: '3px 10px',
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#090C0B',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Phone Mockup (Device Frame) */}
            <div style={{ position: 'relative', width: '310px', flexShrink: 0 }}>
              {/* Smiling Burger Sticker on Phone Shoulder */}
              <div
                style={{
                  position: 'absolute',
                  top: '-24px',
                  right: '-24px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#FFC501',
                  border: '3px solid #090C0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                  transform: 'rotate(12deg)',
                  zIndex: 10,
                }}
              >
                🍔
              </div>

              {/* iPhone Frame */}
              <div style={{ border: '4px solid #090C0B', borderRadius: '48px', padding: '14px', background: '#090C0B', boxShadow: '0 25px 60px rgba(0,0,0,0.35)' }}>
                <div style={{ borderRadius: '36px', overflow: 'hidden', background: '#FFFFFF', border: '2px solid #16201C' }}>
                  {/* Speaker Bar */}
                  <div style={{ background: '#000000', height: '22px', width: '120px', margin: '0 auto 12px', borderRadius: '0 0 12px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1E293B', marginRight: '8px' }} />
                    <div style={{ width: '32px', height: '4px', borderRadius: '99px', background: '#1E293B' }} />
                  </div>

                  {/* App Screen Content */}
                  <div style={{ padding: '14px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#FF5500' }}>DELIVER TO</span>
                        <p style={{ fontSize: '13px', fontWeight: 900, color: '#090C0B', margin: 0 }}>
                          {selectedCampus.name} ▾
                        </p>
                      </div>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FFF0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5500', fontWeight: 800, fontSize: '11px' }}>
                        KC
                      </div>
                    </div>

                    {/* Featured Dish */}
                    <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', border: '1px solid #E5EAE7' }}>
                      <img
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
                        alt="Campus Special"
                        style={{ width: '100%', height: '110px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '10px', background: '#F8F9F8' }}>
                        <span style={{ fontSize: '10px', fontWeight: 900, background: '#FFC501', padding: '2px 6px', borderRadius: '4px', color: '#090C0B', marginRight: '6px' }}>
                          TOP PICK
                        </span>
                        <strong style={{ fontSize: '13px', fontWeight: 800, color: '#090C0B', display: 'block', marginTop: '4px' }}>Smoky Party Jollof & Dodo</strong>
                        <span style={{ fontSize: '11px', color: '#525C57' }}>Madam Kofo Bukka • 15 mins</span>
                      </div>
                    </div>

                    {/* Quick Items Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div style={{ background: '#F8F9F8', padding: '8px', borderRadius: '10px', border: '1px solid #EEF2F0' }}>
                        <img
                          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80"
                          alt="Shawarma"
                          style={{ width: '100%', height: '55px', objectFit: 'cover', borderRadius: '6px', marginBottom: '4px' }}
                        />
                        <strong style={{ fontSize: '11px', display: 'block', color: '#090C0B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Akoka Shawarma</strong>
                        <span style={{ fontSize: '10px', color: '#FF5500', fontWeight: 800 }}>₦2,500</span>
                      </div>
                      <div style={{ background: '#F8F9F8', padding: '8px', borderRadius: '10px', border: '1px solid #EEF2F0' }}>
                        <img
                          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80"
                          alt="Amala"
                          style={{ width: '100%', height: '55px', objectFit: 'cover', borderRadius: '6px', marginBottom: '4px' }}
                        />
                        <strong style={{ fontSize: '11px', display: 'block', color: '#090C0B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Bukka Amala</strong>
                        <span style={{ fontSize: '10px', color: '#FF5500', fontWeight: 800 }}>₦1,800</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 3 Cards */}
            <div style={{ flex: '1 1 300px', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              {verticals.slice(3, 6).map((v) => {
                const isActive = selectedVertical === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVertical(v.id as any)}
                    style={{
                      backgroundColor: v.color,
                      border: `4px solid ${isActive ? '#090C0B' : v.borderColor}`,
                      borderRadius: '24px',
                      padding: '24px',
                      cursor: 'pointer',
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: isActive ? '0 10px 25px rgba(0,0,0,0.1)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px', color: v.textColor }}>
                      {v.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#4A5550', lineHeight: 1.5, marginBottom: '14px' }}>
                      {v.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {v.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          style={{
                            background: 'rgba(255, 255, 255, 0.85)',
                            border: '1px solid rgba(0,0,0,0.1)',
                            borderRadius: '9999px',
                            padding: '3px 10px',
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#090C0B',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. "JOIN OUR GROWING NETWORK ↓" (SCREENSHOT SECTION 3)
          ========================================================================= */}
      <section style={{ maxWidth: '1240px', margin: '90px auto', padding: '0 20px' }}>
        <p
          style={{
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#8E9993',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '28px',
          }}
        >
          <span>Join our growing network</span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="18"
            width="18"
            style={{ color: '#8E9993', display: 'inline' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z" />
          </svg>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {networkCards.map((card) => (
            <div
              key={card.title}
              style={{
                border: '4px solid #090C0B',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#FFFFFF',
                boxShadow: '0 8px 0 #090C0B',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div style={{ padding: '28px', height: '280px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: card.tagColor }} />
                  <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: '#525C57', letterSpacing: '0.8px' }}>
                    OPPORTUNITY
                  </span>
                </div>
                <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#090C0B', letterSpacing: '-0.8px', marginBottom: '10px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#525C57', lineHeight: 1.6, marginBottom: '16px' }}>
                  {card.desc}
                </p>
                <button
                  onClick={() => showToast(`${card.title} portal opening...`, 'info')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 900,
                    fontSize: '12px',
                    letterSpacing: '1px',
                    color: '#090C0B',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: 'auto',
                    width: 'fit-content',
                    textTransform: 'uppercase',
                    padding: 0,
                  }}
                >
                  <span>{card.linkText}</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Bottom Artwork */}
              <div style={{ height: '180px', width: '100%', borderTop: '4px solid #090C0B' }}>
                {card.illustration}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. "DOWNLOAD THE APP" (SECTION COMMENTED OUT AS APP IS NOT YET LIVE)
          ========================================================================= */}
      {/*
      <section style={{ maxWidth: '1240px', margin: '80px auto', padding: '0 20px' }}>
        <div
          style={{
            border: '4px solid #090C0B',
            borderRadius: '32px',
            backgroundColor: '#6C5CE7',
            color: '#FFFFFF',
            padding: '48px 32px',
            boxShadow: '0 16px 0 #090C0B',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '24px' }}>
            {stepItems[activeStep].title}
          </h2>

          <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="320" height="200" viewBox="0 0 320 200" fill="none" style={{ maxWidth: '100%', filter: 'drop-shadow(0 16px 25px rgba(0,0,0,0.3))' }}>
              <g transform="translate(60, 20)">
                <rect x="15" y="-10" width="12" height="60" rx="3" fill="#FFC501" stroke="#090C0B" strokeWidth="3" transform="rotate(-12)" />
                <rect x="35" y="-18" width="12" height="70" rx="3" fill="#FFD200" stroke="#090C0B" strokeWidth="3" transform="rotate(4)" />
                <rect x="52" y="-12" width="12" height="65" rx="3" fill="#FFC501" stroke="#090C0B" strokeWidth="3" transform="rotate(15)" />
                <rect x="25" y="-5" width="12" height="60" rx="3" fill="#FFEAA7" stroke="#090C0B" strokeWidth="3" />
                <rect x="42" y="-8" width="12" height="60" rx="3" fill="#FFC501" stroke="#090C0B" strokeWidth="3" transform="rotate(8)" />
                <path d="M10 40 L20 120 L75 120 L85 40 Q47 55 10 40 Z" fill="#E80B2E" stroke="#090C0B" strokeWidth="4" />
                <circle cx="47" cy="80" r="16" fill="#FFC501" stroke="#090C0B" strokeWidth="3" />
              </g>

              <ellipse cx="200" cy="160" rx="85" ry="22" fill="#05AA70" stroke="#090C0B" strokeWidth="4" />
              <ellipse cx="200" cy="157" rx="72" ry="16" fill="#014C32" />

              <g transform="translate(140, 60)">
                <path d="M10 50 Q60 5 110 50 Z" fill="#F39C12" stroke="#090C0B" strokeWidth="4" />
                <ellipse cx="40" cy="30" rx="3" ry="1.5" fill="#FFF" />
                <ellipse cx="65" cy="22" rx="3" ry="1.5" fill="#FFF" />
                <ellipse cx="85" cy="32" rx="3" ry="1.5" fill="#FFF" />
                <path d="M5 50 Q30 62 60 50 Q90 62 115 50" stroke="#2ECC71" strokeWidth="8" strokeLinecap="round" />
                <path d="M8 58 L112 58 L100 68 L60 62 L20 68 Z" fill="#FFC501" stroke="#090C0B" strokeWidth="3" />
                <rect x="10" y="65" width="100" height="18" rx="8" fill="#5D4037" stroke="#090C0B" strokeWidth="4" />
                <rect x="12" y="82" width="96" height="16" rx="6" fill="#F39C12" stroke="#090C0B" strokeWidth="4" />
              </g>
            </svg>

            <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '16px', fontWeight: 700, maxWidth: '440px', marginTop: '16px' }}>
              {stepItems[activeStep].subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '28px', paddingTop: '18px', borderTop: '2px solid rgba(255, 255, 255, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {stepItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    width: activeStep === i ? '28px' : '12px',
                    height: '12px',
                    borderRadius: '999px',
                    backgroundColor: activeStep === i ? '#FFC501' : 'rgba(255, 255, 255, 0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : stepItems.length - 1))}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                &larr;
              </button>
              <button
                onClick={() => setActiveStep((prev) => (prev < stepItems.length - 1 ? prev + 1 : 0))}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
      */}



      {/* =========================================================================
          6. INTERACTIVE MAP & CAMPUS LOCATIONS (SCREENSHOT SECTION 6)
          ========================================================================= */}
      <section id="campus-map-section" style={{ maxWidth: '1240px', margin: '90px auto', padding: '0 20px' }}>
        <div
          style={{
            border: '4px solid #090C0B',
            borderRadius: '32px',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 16px 0 #090C0B',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          }}
        >
          {/* Left Side: Map */}
          <div
            style={{
              backgroundColor: '#FFFBF0',
              padding: '32px',
              minHeight: '480px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '4px solid #090C0B',
            }}
          >
            {/* Background SVG Map Lines */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none' }}>
              <svg width="100%" height="100%" viewBox="0 0 600 500" fill="none">
                <path d="M50 0 L150 500 M250 0 L320 500 M450 0 L400 500" stroke="#E2D9C5" strokeWidth="6" />
                <path d="M0 120 L600 160 M0 280 L600 240 M0 400 L600 420" stroke="#E2D9C5" strokeWidth="6" />
                <path d="M50 80 Q250 200 550 120" stroke="#FFD200" strokeWidth="12" />
                <path d="M120 450 Q300 350 480 460" stroke="#FFD200" strokeWidth="12" />
                <path d="M0 320 Q200 380 600 340 L600 380 L0 380 Z" fill="#99C8FF" opacity="0.3" />
              </svg>
            </div>

            {/* Top Map Header */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.92)', padding: '6px 14px', borderRadius: '999px', border: '1px solid #E5EAE7' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#05AA70' }} />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#090C0B' }}>Live Campus Map ({selectedCampus.shortName})</span>
              </div>
            </div>

            {/* Interactive Campus Zone Pins */}
            <div style={{ position: 'relative', zIndex: 10, margin: '40px 0', width: '100%', height: '300px' }}>
              {campusMapZones.map((zone) => {
                const isSelected = selectedMapLocation === zone.name;
                return (
                  <button
                    key={zone.name}
                    onClick={() => {
                      setSelectedMapLocation(zone.name);
                      showToast(`Selected delivery location: ${zone.name}`, 'info');
                    }}
                    style={{
                      position: 'absolute',
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      border: '2px solid #090C0B',
                      fontWeight: 800,
                      fontSize: '12px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      backgroundColor: isSelected ? '#FFC501' : '#FFFFFF',
                      color: '#090C0B',
                      zIndex: isSelected ? 30 : 10,
                    }}
                  >
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#05AA70' }} />
                    <span>{zone.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Floating Pill Note */}
            <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '9999px', padding: '10px 20px', border: '1px solid rgba(0,0,0,0.1)', textAlign: 'center', margin: '0 auto' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#090C0B' }}>
                Click on any live location to view delivery coverage
              </span>
            </div>
          </div>

          {/* Right Side: Locations Directory (Matches Chowdeck Locations Split) */}
          <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#99C8FF', padding: '16px 20px', borderBottom: '4px solid #090C0B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} color="#090C0B" />
                <h3 style={{ fontWeight: 900, fontSize: '18px', color: '#090C0B', margin: 0 }}>Locations</h3>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: 'rgba(9, 12, 11, 0.1)', color: '#090C0B', padding: '3px 8px', borderRadius: '999px' }}>
                {campusMapZones.length} Zones
              </span>
            </div>

            <div style={{ padding: '16px', overflowY: 'auto', maxHeight: '460px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {campusMapZones.map((zone) => {
                const isSelected = selectedMapLocation === zone.name;
                return (
                  <div
                    key={zone.name}
                    onClick={() => {
                      setSelectedMapLocation(zone.name);
                      showToast(`Selected delivery location: ${zone.name}`, 'info');
                    }}
                    style={{
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      backgroundColor: isSelected ? '#FFF0E8' : 'transparent',
                      border: isSelected ? '2px solid #FF5500' : '1px solid #F0F3F1',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = '#FFF8F5';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div>
                      <h4 style={{ fontWeight: 800, fontSize: '14px', color: '#090C0B', margin: 0 }}>
                        {zone.name}
                      </h4>
                      <span style={{ fontSize: '11px', color: '#525C57' }}>{zone.subtitle}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          color: '#FF5500',
                          backgroundColor: '#FFF0E8',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF5500' }} />
                        {zone.status}
                      </span>
                      <ChevronRight size={16} color="#8E9993" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. "STORIES 🥬" SECTION (SCREENSHOT SECTION 7)
          ========================================================================= */}
      <section style={{ maxWidth: '1240px', margin: '90px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#090C0B', letterSpacing: '-1px', margin: 0 }}>
            Stories
          </h2>
          <span style={{ fontSize: '32px' }}>🥬</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {stories.map((st) => (
            <div
              key={st.title}
              style={{
                border: '4px solid #090C0B',
                borderRadius: '28px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 8px 0 #090C0B',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  backgroundColor: st.themeBg,
                  height: '170px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderBottom: '4px solid #090C0B',
                }}
              >
                <span
                  style={{
                    color: st.themeText,
                    fontWeight: 900,
                    fontSize: '11px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    width: 'fit-content',
                  }}
                >
                  {st.badge}
                </span>
                <p style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.25, margin: 0 }}>
                  {st.title}
                </p>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <p style={{ fontSize: '14px', color: '#525C57', lineHeight: 1.6, marginBottom: '24px' }}>
                  {st.desc}
                </p>
                <button
                  onClick={() => showToast('Full student story coming soon!', 'info')}
                  style={{
                    border: '2px solid #090C0B',
                    borderRadius: '9999px',
                    padding: '8px 20px',
                    fontWeight: 800,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#090C0B',
                    background: 'transparent',
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#090C0B';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#090C0B';
                  }}
                >
                  {st.btnText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. "FAQS. ANS." (GIANT YELLOW CARD - SCREENSHOT SECTION 8)
          ========================================================================= */}
      <section style={{ maxWidth: '1240px', margin: '90px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'start' }}>
          {/* Left Column: Questions List */}
          <div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: '#090C0B', letterSpacing: '-1.5px', marginBottom: '32px' }}>
              FAQs.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => {
                const isActive = activeFaqIndex === idx;
                return (
                  <button
                    key={faq.q}
                    onClick={() => setActiveFaqIndex(idx)}
                    style={{
                      width: '100%',
                      padding: '18px 22px',
                      borderRadius: '20px',
                      border: '3.5px solid #090C0B',
                      textAlign: 'left',
                      fontWeight: 800,
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      backgroundColor: isActive ? '#090C0B' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#090C0B',
                      boxShadow: isActive ? '0 8px 18px rgba(0,0,0,0.15)' : 'none',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronRight size={18} color={isActive ? '#FFC501' : '#8E9993'} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Giant Bright Yellow "Ans." Card */}
          <div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: '#090C0B', letterSpacing: '-1.5px', marginBottom: '32px' }}>
              Ans.
            </h2>

            <div
              style={{
                border: '4px solid #090C0B',
                borderRadius: '32px',
                backgroundColor: '#FFC501',
                padding: '40px 36px',
                boxShadow: '0 12px 0 #090C0B',
                color: '#090C0B',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#090C0B', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px', lineHeight: 1.25 }}>
                  {faqs[activeFaqIndex].q}
                </h3>
                <p style={{ fontSize: '16px', lineHeight: 1.6, fontWeight: 700, color: '#1A1A1A' }}>
                  {faqs[activeFaqIndex].a}
                </p>
              </div>

              <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '2px solid rgba(9, 12, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800 }}>
                <span>Kulachop Campus Support Desk</span>
                <span>Verified 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. "PLACE YOUR ORDER IN SECONDS" PROMO BANNER (SCREENSHOT SECTION 9)
          ========================================================================= */}
      <section style={{ maxWidth: '1240px', margin: '80px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
          {/* Left Orange Promo Card */}
          <div
            style={{
              border: '4px solid #090C0B',
              borderRadius: '32px',
              backgroundColor: '#FF5500',
              color: '#FFFFFF',
              padding: '44px 36px',
              boxShadow: '0 12px 0 #090C0B',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '400px',
            }}
          >
            <div>
              <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '24px' }}>
                Place your <br />
                order in seconds
              </h2>

              {/* App download buttons commented out since mobile app is not yet live */}
              {/*
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <button
                  onClick={() => showToast('Kulachop on Google Play launching soon!', 'info')}
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#FF5500',
                    fontWeight: 800,
                    fontSize: '13px',
                    padding: '12px 20px',
                    borderRadius: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 3.5v17l14-8.5-14-8.5z" />
                  </svg>
                  <span>Download on Google Play</span>
                </button>

                <button
                  onClick={() => showToast('Kulachop on App Store launching soon!', 'info')}
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#FF5500',
                    fontWeight: 800,
                    fontSize: '13px',
                    padding: '12px 20px',
                    borderRadius: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <svg width="15" height="18" fill="currentColor" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.66-7.8-11.91-14.28-6.1-9.35-10.8-19.8-14.11-31.35-3.31-11.55-4.97-22.38-4.97-32.48 0-14.34 3.48-26.29 10.43-35.85 6.95-9.56 15.65-14.52 26.11-14.88 5.43 0 11.39 1.41 17.88 4.23 6.49 2.82 10.63 4.3 12.42 4.45 1.52-.15 5.92-1.74 13.2-4.77 7.28-3.03 13.54-4.38 18.78-4.05 14.12.98 25.09 5.86 32.91 14.65-12.38 7.5-18.42 17.71-18.13 30.64.22 10.21 4.13 18.68 11.73 25.42 7.6 6.74 16.73 10.76 27.38 12.06-2.17 6.3-4.89 12.5-8.15 18.6z" />
                  </svg>
                  <span>Download on App Store</span>
                </button>
              </div>
              */}

              {/* Web Order Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <a
                  href="#campus-map-section"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#FF5500',
                    fontWeight: 800,
                    fontSize: '14px',
                    padding: '14px 28px',
                    borderRadius: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <span>Order Now on Web</span>
                  <ArrowRight size={18} />
                </a>
              </div>

              {/* Promo Code KULAWEB */}
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px 20px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.12)', maxWidth: '340px' }}>
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1.5px dashed rgba(255, 197, 1, 0.8)',
                    color: '#FFC501',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontWeight: 800,
                    fontSize: '20px',
                    padding: '6px 16px',
                    borderRadius: '12px',
                    display: 'inline-block',
                    letterSpacing: '2px',
                    marginBottom: '8px',
                  }}
                >
                  KULAWEB
                </span>
                <p style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                  Get <strong style={{ color: '#FFC501' }}>₦300 off</strong> your first order when you use this promo code!
                </p>
              </div>
            </div>

            {/* Drink Bottles Illustration */}
            <div style={{ position: 'absolute', right: '16px', bottom: '8px', opacity: 0.85, pointerEvents: 'none' }}>
              <svg width="140" height="160" viewBox="0 0 140 160" fill="none">
                <rect x="70" y="30" width="36" height="110" rx="8" fill="#FFC501" stroke="#090C0B" strokeWidth="3" />
                <rect x="80" y="15" width="16" height="15" fill="#E80B2E" stroke="#090C0B" strokeWidth="2.5" />
                <path d="M20 70 L28 140 L58 140 L66 70 Z" fill="#FF884D" stroke="#090C0B" strokeWidth="3" />
                <path d="M42 70 L48 20 L58 20" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Right Mobile Phone in Hand Image */}
          <div style={{ border: '4px solid #090C0B', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 12px 0 #090C0B', minHeight: '400px' }}>
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
              alt="Hands holding phone ordering on Kulachop"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. DOODLE CREW FOOTER — HAND-DRAWN SKETCHBOOK WITH "KULACHOPS"
          ========================================================================= */}
      <DoodleCrewFooter
        wordmark="KULACHOPS"
        brand="KULACHOPS"
        tagline="Fresh meals, cold drinks & midnight snacks delivered right to your hostel door."
        preset="kulachop"
        palette={{ background: '#090C0B', ink: '#FFFFFF', accent: '#FF5500' }}
        doodles={[
          'burger',
          'pizza',
          'deliveryBike',
          'takeoutBag',
          'riceBowl',
          'drinkCup',
          'drumstick',
          'cloche',
          'deliveryBox',
          'chili',
        ]}
        actions={[
          {
            label: 'Track live courier',
            icon: 'deliveryBike',
            variant: 'solid',
            onClick: () => setActiveTrackingOrderId('ord_101'),
          },
        ]}
        copyright="© 2026 KULACHOPS Logistics Ltd. Delivering happiness across campus."
        legal={[
          { label: 'Privacy Policy', href: '#privacy' },
          { label: 'Terms of Service', href: '#terms' },
          { label: 'Campus Delivery Guidelines', href: '#guidelines' },
        ]}
        socials={[
          { label: 'Twitter', href: '#twitter' },
          { label: 'Instagram', href: '#instagram' },
          { label: 'TikTok', href: '#tiktok' },
          { label: 'LinkedIn', href: '#linkedin' },
        ]}
        backToTop={true}
      />
    </div>
  );
};
