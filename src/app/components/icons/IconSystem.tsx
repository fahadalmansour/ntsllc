import React from 'react';
import { 
  Terminal, 
  Code, 
  Database, 
  Cloud, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  BarChart3, 
  Settings, 
  Lock, 
  Unlock, 
  Key, 
  Command, 
  Search, 
  Bell, 
  BellRing, 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  UserCheck, 
  UserPlus, 
  LogIn, 
  LogOut, 
  Home, 
  Dashboard as DashboardIcon, 
  Folder, 
  File, 
  FileText, 
  Download, 
  Upload, 
  Share, 
  Copy, 
  Edit, 
  Trash, 
  Plus, 
  Minus, 
  X, 
  Check, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Link, 
  Unlink, 
  Eye, 
  EyeOff, 
  Heart, 
  Star, 
  Bookmark, 
  Tag, 
  Filter, 
  Sort, 
  Grid, 
  List, 
  Menu, 
  MoreHorizontal, 
  MoreVertical, 
  Refresh, 
  RotateCw, 
  Play, 
  Pause, 
  Stop, 
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff, 
  Battery, 
  BatteryLow, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Server, 
  Router, 
  Layers, 
  Package, 
  Box, 
  Archive, 
  Briefcase, 
  Building, 
  Factory, 
  Store, 
  ShoppingCart, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Pulse, 
  Target, 
  Award, 
  Trophy, 
  Medal, 
  Gift, 
  Sparkles, 
  Rocket, 
  Plane, 
  Car, 
  Truck, 
  Ship, 
  Train, 
  Compass, 
  Navigation, 
  Map, 
  MapPin as LocationIcon, 
  Flag, 
  Bookmark as BookmarkIcon, 
  Camera, 
  Image, 
  Video, 
  Music, 
  Headphones, 
  Mic, 
  MicOff, 
  Volume, 
  Gamepad2, 
  Joystick, 
  Dice1, 
  Dice2, 
  Dice3, 
  Dice4, 
  Dice5, 
  Dice6, 
  CircuitBoard, 
  Binary, 
  Hash, 
  AtSign, 
  Percent, 
  Hash as HashtagIcon, 
  Type, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Highlighter, 
  Palette, 
  Paintbrush, 
  Pipette, 
  Eraser, 
  Scissors, 
  PenTool, 
  MousePointer, 
  Hand, 
  Move, 
  RotateCcw, 
  FlipHorizontal, 
  FlipVertical, 
  Crop, 
  Maximize, 
  Minimize, 
  Square, 
  Circle, 
  Triangle, 
  Hexagon, 
  Octagon, 
  Diamond, 
  Heart as HeartIcon, 
  Star as StarIcon, 
  Sun, 
  Moon, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Thermometer, 
  Droplets, 
  Wind, 
  Umbrella, 
  TreePine, 
  Flower, 
  Leaf, 
  Bug, 
  Fish, 
  Bird, 
  Dog, 
  Cat, 
  Rabbit, 
  Squirrel, 
  Turtle,
  AlertTriangle,
  Info,
  Loader,
  CheckCircle
} from 'lucide-react';

// Custom terminal-themed SVG icons
export const TerminalIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <polyline points="6,8 10,12 6,16"/>
    <line x1="12" y1="14" x2="18" y2="14"/>
  </svg>
);

export const MatrixIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="7" y1="7" x2="7" y2="17"/>
    <line x1="11" y1="7" x2="11" y2="17"/>
    <line x1="15" y1="7" x2="15" y2="17"/>
    <circle cx="7" cy="9" r="1"/>
    <circle cx="11" cy="11" r="1"/>
    <circle cx="15" cy="13" r="1"/>
    <circle cx="7" cy="15" r="1"/>
    <circle cx="11" cy="9" r="1"/>
    <circle cx="15" cy="15" r="1"/>
  </svg>
);

export const NeuralNetworkIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="6" cy="6" r="3"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="18" r="3"/>
    <circle cx="12" cy="12" r="2"/>
    <line x1="9" y1="6" x2="15" y2="6"/>
    <line x1="6" y1="9" x2="6" y2="15"/>
    <line x1="18" y1="9" x2="18" y2="15"/>
    <line x1="9" y1="18" x2="15" y2="18"/>
    <line x1="8.5" y1="8.5" x2="10.5" y2="10.5"/>
    <line x1="15.5" y1="8.5" x2="13.5" y2="10.5"/>
    <line x1="8.5" y1="15.5" x2="10.5" y2="13.5"/>
    <line x1="15.5" y1="15.5" x2="13.5" y2="13.5"/>
  </svg>
);

export const QuantumIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export const HologramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/>
    <polygon points="12,7 17,10 17,14 12,17 7,14 7,10"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M12 7v5m0 5v-5m-5-2.5 4.33 2.5m5.34 0L12 12m-4.33 2.5L12 12m4.33 2.5L12 12"/>
  </svg>
);

export const CyberspaceIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12h18"/>
    <path d="M3 6h18"/>
    <path d="M3 18h18"/>
    <circle cx="6" cy="6" r="1"/>
    <circle cx="12" cy="6" r="1"/>
    <circle cx="18" cy="6" r="1"/>
    <circle cx="6" cy="12" r="1"/>
    <circle cx="12" cy="12" r="1"/>
    <circle cx="18" cy="12" r="1"/>
    <circle cx="6" cy="18" r="1"/>
    <circle cx="12" cy="18" r="1"/>
    <circle cx="18" cy="18" r="1"/>
    <path d="M6 6L12 12L18 6"/>
    <path d="M6 18L12 12L18 18"/>
  </svg>
);

export const DataFlowIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12h20"/>
    <path d="M17 7l5 5-5 5"/>
    <circle cx="5" cy="12" r="2"/>
    <circle cx="12" cy="12" r="1"/>
    <circle cx="19" cy="12" r="1"/>
    <path d="M7 9l2 3-2 3"/>
    <path d="M10 9l2 3-2 3"/>
  </svg>
);

export const BlockchainIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="6" height="6" rx="1"/>
    <rect x="9" y="2" width="6" height="6" rx="1"/>
    <rect x="16" y="2" width="6" height="6" rx="1"/>
    <rect x="2" y="9" width="6" height="6" rx="1"/>
    <rect x="9" y="9" width="6" height="6" rx="1"/>
    <rect x="16" y="9" width="6" height="6" rx="1"/>
    <rect x="2" y="16" width="6" height="6" rx="1"/>
    <rect x="9" y="16" width="6" height="6" rx="1"/>
    <rect x="16" y="16" width="6" height="6" rx="1"/>
    <line x1="8" y1="5" x2="9" y2="5"/>
    <line x1="15" y1="5" x2="16" y2="5"/>
    <line x1="5" y1="8" x2="5" y2="9"/>
    <line x1="12" y1="8" x2="12" y2="9"/>
    <line x1="19" y1="8" x2="19" y2="9"/>
    <line x1="8" y1="12" x2="9" y2="12"/>
    <line x1="15" y1="12" x2="16" y2="12"/>
    <line x1="5" y1="15" x2="5" y2="16"/>
    <line x1="12" y1="15" x2="12" y2="16"/>
    <line x1="19" y1="15" x2="19" y2="16"/>
  </svg>
);

// Icon wrapper component with consistent styling
export const Icon = ({ 
  icon: IconComponent, 
  size = 24, 
  className = "", 
  variant = "default",
  animated = false 
}: { 
  icon: React.ComponentType<any>; 
  size?: number; 
  className?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error";
  animated?: boolean;
}) => {
  const variantClasses = {
    default: "text-[#C0C5CE]",
    primary: "text-[#4AE54A]",
    secondary: "text-[#12151C]",
    success: "text-[#4AE54A]",
    warning: "text-yellow-400",
    error: "text-red-400"
  };

  const animationClass = animated ? "transition-all duration-200 hover:scale-110" : "";

  return (
    <IconComponent 
      size={size} 
      className={`${variantClasses[variant]} ${animationClass} ${className}`}
    />
  );
};

// Predefined icon sets for different contexts
export const NavigationIcons = {
  home: Home,
  dashboard: DashboardIcon,
  services: Grid,
  portfolio: Folder,
  about: User,
  contact: Mail,
  auth: LogIn,
  settings: Settings,
  api: Code,
  analytics: BarChart3,
  collaboration: Users,
  notifications: Bell,
  command: Command,
  performance: Activity,
  terminal: Terminal,
  neo: TerminalIcon
};

export const TechIcons = {
  code: Code,
  database: Database,
  cloud: Cloud,
  server: Server,
  api: Layers,
  security: Shield,
  blockchain: BlockchainIcon,
  ai: NeuralNetworkIcon,
  quantum: QuantumIcon,
  matrix: MatrixIcon,
  hologram: HologramIcon,
  cyberspace: CyberspaceIcon,
  dataflow: DataFlowIcon,
  neural: CircuitBoard,
  binary: Binary
};

export const BusinessIcons = {
  analytics: BarChart3,
  growth: TrendingUp,
  revenue: DollarSign,
  customers: Users,
  support: MessageSquare,
  success: Trophy,
  target: Target,
  strategy: Compass,
  innovation: Sparkles,
  rocket: Rocket,
  award: Award,
  medal: Medal
};

export const StatusIcons = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
  loading: Loader,
  online: Wifi,
  offline: WifiOff,
  active: CheckCircle,
  inactive: Circle,
  pending: Clock
};

export const ActionIcons = {
  add: Plus,
  remove: Minus,
  edit: Edit,
  delete: Trash,
  copy: Copy,
  share: Share,
  download: Download,
  upload: Upload,
  search: Search,
  filter: Filter,
  sort: Sort,
  refresh: Refresh,
  play: Play,
  pause: Pause,
  stop: Stop
};

// Export all Lucide icons for convenience
export {
  Terminal,
  Code,
  Database,
  Cloud,
  Zap,
  Shield,
  Globe,
  Users,
  BarChart3,
  Settings,
  Lock,
  Unlock,
  Key,
  Command,
  Search,
  Bell,
  BellRing,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  User,
  UserCheck,
  UserPlus,
  LogIn,
  LogOut,
  Home,
  DashboardIcon,
  Folder,
  File,
  FileText,
  Download,
  Upload,
  Share,
  Copy,
  Edit,
  Trash,
  Plus,
  Minus,
  X,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Link,
  Unlink,
  Eye,
  EyeOff,
  Heart,
  Star,
  Bookmark,
  Tag,
  Filter,
  Sort,
  Grid,
  List,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Refresh,
  RotateCw,
  Play,
  Pause,
  Stop,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Server,
  Router,
  Layers,
  Package,
  Box,
  Archive,
  Briefcase,
  Building,
  Factory,
  Store,
  ShoppingCart,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Pulse,
  Target,
  Award,
  Trophy,
  Medal,
  Gift,
  Sparkles,
  Rocket,
  AlertTriangle,
  Info,
  Loader,
  CheckCircle
};

// Default export for the Icon component
export default Icon;