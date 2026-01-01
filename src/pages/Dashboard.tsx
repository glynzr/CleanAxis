import { useState } from 'react';
import { Sun, Wind, Activity, Zap } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { FilterPanel } from '@/components/dashboard/FilterPanel';
import { InsightsPanel } from '@/components/dashboard/InsightsPanel';
import LeafletMap from '@/components/maps/LeafletMap';
import { ProjectReadinessPathway } from '@/components/shared/ProjectReadinessPathway';
import { dashboardStats, regions } from '@/data/mockData';
import { toast } from 'sonner';

export default function Dashboard() {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedEnergy, setSelectedEnergy] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  const selectedRegion = regions.find(r => r.id === selectedRegionId);

  const handleStatClick = (statName: string) => {
    toast.info(`Viewing details for: ${statName}`);
  };

  const handleRegionClick = (regionId: string) => {
    setSelectedRegionId(regionId);
    const region = regions.find(r => r.id === regionId);
    if (region) {
      toast.success(`Selected: ${region.name}, ${region.country}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Regional Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          High-level overview of clean energy investment opportunities across Central Asia
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div onClick={() => handleStatClick('Renewable Hotspots')} className="cursor-pointer">
          <StatCard
            title="Renewable Hotspots Identified"
            value={dashboardStats.renewableHotspots}
            subtitle="Across 3 countries"
            icon={Sun}
            trend={{ value: 12, label: 'vs last quarter', positive: true }}
          />
        </div>
        <div onClick={() => handleStatClick('Permitting Time')} className="cursor-pointer">
          <StatCard
            title="Average Permitting Time"
            value={dashboardStats.avgPermittingTime}
            subtitle="From application to approval"
            icon={Activity}
            trend={{ value: 8, label: 'improvement', positive: true }}
          />
        </div>
        <div onClick={() => handleStatClick('Policy Stability')} className="cursor-pointer">
          <StatCard
            title="Policy Stability Index"
            value={`${dashboardStats.policyStabilityIndex}/100`}
            subtitle="Weighted regional average"
            icon={Wind}
          />
        </div>
        <div onClick={() => handleStatClick('Grid Capacity')} className="cursor-pointer">
          <StatCard
            title="Grid-Ready Capacity"
            value={dashboardStats.gridReadyCapacity}
            subtitle="Available connection points"
            icon={Zap}
            trend={{ value: 23, label: 'growth YoY', positive: true }}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Filters */}
        <div className="lg:col-span-2">
          <FilterPanel
            selectedCountry={selectedCountry}
            selectedEnergy={selectedEnergy}
            selectedRisk={selectedRisk}
            onCountryChange={setSelectedCountry}
            onEnergyChange={setSelectedEnergy}
            onRiskChange={setSelectedRisk}
          />
        </div>

        {/* Center Map */}
        <div className="lg:col-span-7">
          <LeafletMap 
            onRegionClick={handleRegionClick} 
            filterCountry={selectedCountry}
            height="450px"
          />
        </div>

        {/* Right Insights */}
        <div className="lg:col-span-3">
          <InsightsPanel />
        </div>
      </div>

      {/* Project Readiness Pathway Modal */}
      {selectedRegion && (
        <ProjectReadinessPathway
          region={selectedRegion}
          onClose={() => setSelectedRegionId(null)}
        />
      )}
    </div>
  );
}
