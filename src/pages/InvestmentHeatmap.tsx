import { useState } from 'react';
import { Layers } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { regions, mapLayers } from '@/data/mockData';
import { ProjectReadinessPathway } from '@/components/shared/ProjectReadinessPathway';
import LeafletMap from '@/components/maps/LeafletMap';

export default function InvestmentHeatmap() {
  const [activeLayers, setActiveLayers] = useState<string[]>(['solar', 'grid']);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const selectedData = regions.find(r => r.id === selectedRegion);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Investment Heatmap</h1>
        <p className="text-sm text-muted-foreground">
          Identify policy-aligned, grid-ready clean energy investment locations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Layers Panel */}
        <div className="lg:col-span-2">
          <div className="filter-panel space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Map Layers</h3>
            </div>
            
            <div className="space-y-3">
              {mapLayers.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: layer.color }}
                    />
                    <Label htmlFor={layer.id} className="text-xs cursor-pointer">
                      {layer.name}
                    </Label>
                  </div>
                  <Switch
                    id={layer.id}
                    checked={activeLayers.includes(layer.id)}
                    onCheckedChange={() => toggleLayer(layer.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Map */}
        <div className="lg:col-span-10">
          <LeafletMap 
            onRegionClick={handleRegionClick}
            height="500px"
            showLayers={true}
            activeLayers={activeLayers}
          />

          {/* Project Readiness Summary */}
          <div className="mt-4 stat-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">Project Readiness Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Required Permits (Avg)</p>
                <p className="text-lg font-semibold text-foreground">3-4 permits</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Estimated Approval Timeline</p>
                <p className="text-lg font-semibold text-foreground">6-9 months</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Regulatory Risk Flags</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="status-badge status-success">12 Low</span>
                  <span className="status-badge status-warning">8 Medium</span>
                  <span className="status-badge status-danger">2 High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Readiness Pathway Modal */}
      {selectedData && (
        <ProjectReadinessPathway
          region={selectedData}
          onClose={() => setSelectedRegion(null)}
        />
      )}
    </div>
  );
}
