import { 
  LayoutDashboard, 
  Users, 
  Palette, 
  BookOpen, 
  Mail, 
  Camera, 
  Settings, 
  Plus, 
  Calendar, 
  MapPin, 
  Heart, 
  CheckCircle2, 
  Clock, 
  Image as ImageIcon,
  ChevronRight,
  Filter,
  Star,
  MessageSquare,
  Upload,
  Download,
  Eye,
  Home,
  Info,
  Map,
  UserCheck
} from 'lucide-react';

export type AppMode = 'PLANNER' | 'GUEST' | 'COUPLE' | 'PHOTOGRAPHER';

export interface WeddingTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  fontFamily: string;
  bannerStyle: 'classic' | 'modern' | 'minimal' | 'romantic';
}

export interface DecorPackage {
  id: string;
  name: string;
  category: 'Stage' | 'Floral' | 'Bouquet' | 'Entrance';
  image: string;
  description: string;
  themeId: string;
}

export interface ScheduleItem {
  id: string;
  name: string;
  time: string;
  date: string;
  desc: string;
}

export interface Wedding {
  id: string;
  coupleNames: string;
  title: string;
  city: string;
  country: string;
  date: string;
  status: 'Planning' | 'Upcoming' | 'Live' | 'Completed';
  guestCount: number;
  registrations: number;
  themeId: string;
  decorPackageId?: string;
  plannerBranding: string;
  websiteUrl: string;
  schedule: ScheduleItem[];
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  events: string[];
  attendees: number;
  notes: string;
  selfieUrl?: string;
  matchedPhotos?: string[];
}

export interface Photo {
  id: string;
  url: string;
  category: 'Ceremony' | 'Reception' | 'Portrait' | 'Guest';
  isShortlisted: boolean;
  isFavorite: boolean;
}

export const THEMES: WeddingTheme[] = [
  {
    id: 'floral-pastel',
    name: 'Floral Pastel',
    primary: '#FDF2F8',
    secondary: '#FCE7F3',
    accent: '#DB2777',
    background: '#FFFFFF',
    fontFamily: 'serif',
    bannerStyle: 'romantic'
  },
  {
    id: 'royal-maroon',
    name: 'Royal Maroon',
    primary: '#450A0A',
    secondary: '#7F1D1D',
    accent: '#FDE047',
    background: '#FEFCE8',
    fontFamily: 'serif',
    bannerStyle: 'classic'
  },
  {
    id: 'ivory-gold',
    name: 'Ivory Gold',
    primary: '#FFFBEB',
    secondary: '#FEF3C7',
    accent: '#D97706',
    background: '#FFFFFF',
    fontFamily: 'serif',
    bannerStyle: 'modern'
  },
  {
    id: 'emerald-classic',
    name: 'Emerald Classic',
    primary: '#064E3B',
    secondary: '#065F46',
    accent: '#FCD34D',
    background: '#F0FDF4',
    fontFamily: 'serif',
    bannerStyle: 'classic'
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    primary: '#18181B',
    secondary: '#27272A',
    accent: '#71717A',
    background: '#FAFAFA',
    fontFamily: 'sans-serif',
    bannerStyle: 'minimal'
  },
  {
    id: 'sunset-romance',
    name: 'Sunset Romance',
    primary: '#FFF7ED',
    secondary: '#FFEDD5',
    accent: '#F97316',
    background: '#FFFBF7',
    fontFamily: 'serif',
    bannerStyle: 'romantic'
  },
  {
    id: 'luxury-blush',
    name: 'Luxury Blush',
    primary: '#FFF1F2',
    secondary: '#FFE4E6',
    accent: '#E11D48',
    background: '#FFFFFF',
    fontFamily: 'serif',
    bannerStyle: 'modern'
  }
];

export const MOCK_PHOTOS: Photo[] = [
  { id: 'p1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', category: 'Ceremony', isShortlisted: false, isFavorite: false },
  { id: 'p2', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', category: 'Reception', isShortlisted: true, isFavorite: false },
  { id: 'p3', url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800', category: 'Portrait', isShortlisted: false, isFavorite: true },
  { id: 'p4', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800', category: 'Ceremony', isShortlisted: false, isFavorite: false },
  { id: 'p5', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800', category: 'Portrait', isShortlisted: true, isFavorite: true },
  { id: 'p6', url: 'https://images.unsplash.com/photo-1465495910483-0d674575603e?auto=format&fit=crop&q=80&w=800', category: 'Guest', isShortlisted: false, isFavorite: false },
  { id: 'p7', url: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=800', category: 'Reception', isShortlisted: false, isFavorite: false },
  { id: 'p8', url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800', category: 'Guest', isShortlisted: true, isFavorite: false },
];

export const DECOR_PACKAGES: DecorPackage[] = [
  {
    id: 'dp-1',
    name: 'Enchanted Garden',
    category: 'Stage',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    description: 'A lush floral stage with pastel roses and hanging wisteria.',
    themeId: 'floral-pastel'
  },
  {
    id: 'dp-2',
    name: 'Regal Heritage',
    category: 'Stage',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    description: 'Deep maroon drapes with gold accents and traditional motifs.',
    themeId: 'royal-maroon'
  },
  {
    id: 'dp-3',
    name: 'Golden Elegance',
    category: 'Entrance',
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800',
    description: 'Minimalist gold frames with white orchids and warm lighting.',
    themeId: 'ivory-gold'
  },
  {
    id: 'dp-4',
    name: 'Emerald Forest',
    category: 'Floral',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
    description: 'Rich greenery with white lilies and emerald velvet textures.',
    themeId: 'emerald-classic'
  }
];

export const MOCK_WEDDINGS: Wedding[] = [
  {
    id: 'w-1',
    coupleNames: 'Sarah & James',
    title: 'The Smith-Jones Wedding',
    city: 'New York',
    country: 'USA',
    date: '2026-06-15',
    status: 'Upcoming',
    guestCount: 150,
    registrations: 112,
    themeId: 'floral-pastel',
    decorPackageId: 'dp-1',
    plannerBranding: 'Elegant Events by Sarah',
    websiteUrl: 'sarah-james.wedding.com',
    schedule: [
      { id: 's1', name: 'Ceremony', time: '4:00 PM', date: 'June 15, 2026', desc: 'Exchange of vows at the Central Park Conservatory Garden.' },
      { id: 's2', name: 'Cocktail Hour', time: '5:30 PM', date: 'June 15, 2026', desc: 'Drinks and hors d\'oeuvres on the terrace.' },
      { id: 's3', name: 'Reception', time: '7:00 PM', date: 'June 15, 2026', desc: 'Dinner, dancing, and celebration in the Grand Ballroom.' }
    ]
  },
  {
    id: 'w-2',
    coupleNames: 'Priya & Arjun',
    title: 'A Royal Celebration',
    city: 'Mumbai',
    country: 'India',
    date: '2026-08-20',
    status: 'Planning',
    guestCount: 500,
    registrations: 45,
    themeId: 'royal-maroon',
    decorPackageId: 'dp-2',
    plannerBranding: 'Royal Weddings Co.',
    websiteUrl: 'priya-arjun.wedding.com',
    schedule: [
      { id: 's1', name: 'Sangeet', time: '6:00 PM', date: 'August 18, 2026', desc: 'A night of music and dance.' },
      { id: 's2', name: 'Wedding Ceremony', time: '10:00 AM', date: 'August 20, 2026', desc: 'Traditional Vedic ceremony.' },
      { id: 's3', name: 'Reception', time: '7:30 PM', date: 'August 20, 2026', desc: 'Grand reception for family and friends.' }
    ]
  }
];
