// CleanAxis Mock Data

export interface Region {
  id: string;
  name: string;
  country: string;
  coordinates: { lat: number; lng: number };
  renewablePotential: number;
  gridDistance: number;
  regulatoryReadiness: 'high' | 'medium' | 'low';
  capexRange: string;
  permits: string[];
  approvalTimeline: string;
  riskFlags: ('green' | 'yellow' | 'red')[];
}

export interface Startup {
  id: string;
  name: string;
  country: string;
  technology: string;
  stage: string;
  readinessScore: number;
  complianceStatus: 'verified' | 'pending' | 'incomplete';
  description: string;
  fundingTarget: string;
}

export interface DashboardStats {
  renewableHotspots: number;
  avgPermittingTime: string;
  policyStabilityIndex: number;
  gridReadyCapacity: string;
}

export interface Insight {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description: string;
}

export const dashboardStats: DashboardStats = {
  renewableHotspots: 47,
  avgPermittingTime: '8.5 months',
  policyStabilityIndex: 72,
  gridReadyCapacity: '12.4 GW',
};

export const regions: Region[] = [
  {
    id: 'az-absheron',
    name: 'Absheron Peninsula',
    country: 'Azerbaijan',
    coordinates: { lat: 40.4093, lng: 49.8671 },
    renewablePotential: 85,
    gridDistance: 12,
    regulatoryReadiness: 'high',
    capexRange: '$45-65M',
    permits: ['Environmental Impact Assessment', 'Grid Connection License', 'Land Use Permit'],
    approvalTimeline: '6-8 months',
    riskFlags: ['green', 'green', 'yellow'],
  },
  {
    id: 'az-nakhchivan',
    name: 'Nakhchivan Region',
    country: 'Azerbaijan',
    coordinates: { lat: 39.2089, lng: 45.4123 },
    renewablePotential: 78,
    gridDistance: 35,
    regulatoryReadiness: 'medium',
    capexRange: '$55-80M',
    permits: ['Environmental Impact Assessment', 'Special Zone Permit', 'Grid Connection License'],
    approvalTimeline: '9-12 months',
    riskFlags: ['green', 'yellow', 'yellow'],
  },
  {
    id: 'kz-mangystau',
    name: 'Mangystau Region',
    country: 'Kazakhstan',
    coordinates: { lat: 43.6532, lng: 51.1605 },
    renewablePotential: 92,
    gridDistance: 8,
    regulatoryReadiness: 'high',
    capexRange: '$40-55M',
    permits: ['Environmental Permit', 'Grid Access Agreement', 'Construction License'],
    approvalTimeline: '5-7 months',
    riskFlags: ['green', 'green', 'green'],
  },
  {
    id: 'kz-almaty',
    name: 'Almaty Oblast',
    country: 'Kazakhstan',
    coordinates: { lat: 43.2551, lng: 76.9126 },
    renewablePotential: 71,
    gridDistance: 22,
    regulatoryReadiness: 'medium',
    capexRange: '$50-70M',
    permits: ['Environmental Assessment', 'Regional Development Approval', 'Grid License'],
    approvalTimeline: '8-10 months',
    riskFlags: ['green', 'yellow', 'green'],
  },
  {
    id: 'uz-navoi',
    name: 'Navoi Region',
    country: 'Uzbekistan',
    coordinates: { lat: 40.0844, lng: 65.3792 },
    renewablePotential: 88,
    gridDistance: 15,
    regulatoryReadiness: 'high',
    capexRange: '$35-50M',
    permits: ['State Ecological Expertise', 'Power Purchase Agreement', 'Land Allocation'],
    approvalTimeline: '4-6 months',
    riskFlags: ['green', 'green', 'green'],
  },
  {
    id: 'uz-bukhara',
    name: 'Bukhara Region',
    country: 'Uzbekistan',
    coordinates: { lat: 39.7675, lng: 64.4231 },
    renewablePotential: 82,
    gridDistance: 18,
    regulatoryReadiness: 'medium',
    capexRange: '$42-58M',
    permits: ['Environmental Clearance', 'Grid Connection Agreement', 'Regional Approval'],
    approvalTimeline: '6-9 months',
    riskFlags: ['green', 'yellow', 'green'],
  },
];

export const insights: Insight[] = [
  {
    id: '1',
    type: 'success',
    title: 'Mangystau, Kazakhstan',
    description: 'Highest investment readiness score (92) with expedited permitting available',
  },
  {
    id: '2',
    type: 'success',
    title: 'Navoi, Uzbekistan',
    description: 'Fastest approval timeline in region (4-6 months) with strong policy support',
  },
  {
    id: '3',
    type: 'info',
    title: 'Absheron, Azerbaijan',
    description: 'New offshore wind incentives announced under 2024 Green Energy Framework',
  },
  {
    id: '4',
    type: 'warning',
    title: 'Nakhchivan Region',
    description: 'Grid infrastructure upgrade pending - monitor for delays',
  },
  {
    id: '5',
    type: 'danger',
    title: 'Regulatory Alert',
    description: 'Proposed changes to feed-in tariff structure in Kazakhstan Q2 2024',
  },
];

export const startups: Startup[] = [
  {
    id: '1',
    name: 'SolarTech Baku',
    country: 'Azerbaijan',
    technology: 'Solar PV Manufacturing',
    stage: 'Series A',
    readinessScore: 85,
    complianceStatus: 'verified',
    description: 'Locally manufactured solar panels optimized for Caspian climate conditions',
    fundingTarget: '$5M',
  },
  {
    id: '2',
    name: 'WindPower KZ',
    country: 'Kazakhstan',
    technology: 'Wind Turbine Components',
    stage: 'Seed',
    readinessScore: 72,
    complianceStatus: 'verified',
    description: 'Turbine blade manufacturing using local composite materials',
    fundingTarget: '$2.5M',
  },
  {
    id: '3',
    name: 'GreenGrid Tashkent',
    country: 'Uzbekistan',
    technology: 'Smart Grid Solutions',
    stage: 'Series B',
    readinessScore: 91,
    complianceStatus: 'verified',
    description: 'AI-powered grid management for renewable integration',
    fundingTarget: '$12M',
  },
  {
    id: '4',
    name: 'Caspian Storage',
    country: 'Azerbaijan',
    technology: 'Battery Storage',
    stage: 'Pre-Seed',
    readinessScore: 58,
    complianceStatus: 'pending',
    description: 'Utility-scale battery storage solutions for grid stabilization',
    fundingTarget: '$1M',
  },
  {
    id: '5',
    name: 'EcoHydro Almaty',
    country: 'Kazakhstan',
    technology: 'Small Hydro',
    stage: 'Series A',
    readinessScore: 79,
    complianceStatus: 'verified',
    description: 'Micro-hydro systems for mountain communities',
    fundingTarget: '$4M',
  },
  {
    id: '6',
    name: 'BioEnergy UZ',
    country: 'Uzbekistan',
    technology: 'Biomass',
    stage: 'Seed',
    readinessScore: 65,
    complianceStatus: 'incomplete',
    description: 'Agricultural waste-to-energy conversion technology',
    fundingTarget: '$3M',
  },
];

export const countries = ['Azerbaijan', 'Kazakhstan', 'Uzbekistan'] as const;
export const energyTypes = ['Solar', 'Wind', 'Offshore Wind', 'Hydro', 'Biomass'] as const;
export const riskProfiles = ['Low', 'Medium', 'High'] as const;

export const mapLayers = [
  { id: 'solar', name: 'Solar Irradiance', color: 'hsl(45, 93%, 58%)' },
  { id: 'wind', name: 'Wind Potential', color: 'hsl(200, 80%, 55%)' },
  { id: 'grid', name: 'Grid Proximity', color: 'hsl(155, 30%, 40%)' },
  { id: 'sez', name: 'Special Economic Zones', color: 'hsl(280, 60%, 50%)' },
  { id: 'incentive', name: 'Clean Energy Incentive Zones', color: 'hsl(38, 92%, 50%)' },
] as const;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; reference: string }[];
  timestamp: Date;
}

export const sampleChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'What incentives apply to offshore wind projects in Azerbaijan under the 2024 green energy framework?',
    timestamp: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    role: 'assistant',
    content: `Under the 2024 Green Energy Framework, offshore wind projects in Azerbaijan are eligible for the following incentives:

• **Tax Exemptions**: 10-year corporate income tax holiday for projects exceeding 100MW capacity
• **Feed-in Tariff**: Guaranteed purchase price of $0.065/kWh for 20 years
• **Import Duty Waiver**: Zero customs duties on specialized equipment and components
• **Land Lease Terms**: Preferential seabed lease rates at 50% reduction for first 15 years
• **Grid Priority**: Guaranteed grid access and priority dispatch for renewable generators

**Important Conditions:**
- Minimum 30% local content requirement applies from year 3
- Environmental Impact Assessment required within Caspian Sea protected zones
- Projects must register with AREA (Azerbaijan Renewable Energy Agency) prior to construction`,
    sources: [
      { title: 'Law on the Use of Renewable Energy Sources (2024)', reference: 'Article 12, Sections 3-7' },
      { title: 'Cabinet of Ministers Resolution No. 145', reference: 'Ministry of Energy Portal' },
    ],
    timestamp: new Date('2024-01-15T10:30:15'),
  },
];

export const reports = [
  {
    id: '1',
    title: 'ECO Region Clean Energy Investment Outlook 2024',
    type: 'Annual Report',
    date: '2024-01-15',
    pages: 124,
  },
  {
    id: '2',
    title: 'Kazakhstan Renewable Policy Assessment',
    type: 'Country Brief',
    date: '2024-01-10',
    pages: 32,
  },
  {
    id: '3',
    title: 'Offshore Wind Potential: Caspian Sea Analysis',
    type: 'Technical Study',
    date: '2024-01-05',
    pages: 67,
  },
  {
    id: '4',
    title: 'Grid Infrastructure Readiness: Uzbekistan',
    type: 'Infrastructure Report',
    date: '2023-12-20',
    pages: 45,
  },
  {
    id: '5',
    title: 'Regulatory Risk Assessment Q4 2023',
    type: 'Risk Analysis',
    date: '2023-12-15',
    pages: 28,
  },
];
