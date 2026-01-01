import { useState } from 'react';
import { MapPin, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { regions } from '@/data/mockData';
import { toast } from 'sonner';

interface InteractiveMapProps {
  onRegionClick?: (regionId: string) => void;
}

export function InteractiveMap({ onRegionClick }: InteractiveMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
    toast.success('Map zoomed in');
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.6));
    toast.success('Map zoomed out');
  };

  const handleFullscreen = () => {
    toast.info('Fullscreen mode coming soon');
  };

  const handleRegionClick = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (region) {
      toast.success(`Selected: ${region.name}, ${region.country}`);
      onRegionClick?.(regionId);
    }
  };

  const hoveredData = regions.find(r => r.id === hoveredRegion);

  // Country paths (simplified Central Asia map)
  const countryPaths = {
    kazakhstan: {
      path: "M250,80 L420,60 L580,80 L650,120 L700,180 L680,250 L620,290 L550,300 L480,280 L400,290 L320,270 L260,220 L200,180 L180,120 Z",
      fill: "hsl(var(--secondary))",
      name: "Kazakhstan"
    },
    uzbekistan: {
      path: "M320,270 L400,290 L480,280 L520,320 L480,360 L400,380 L320,360 L280,320 Z",
      fill: "hsl(var(--secondary))",
      name: "Uzbekistan"
    },
    azerbaijan: {
      path: "M120,200 L180,180 L220,200 L240,240 L220,280 L180,300 L140,280 L100,240 Z",
      fill: "hsl(var(--secondary))",
      name: "Azerbaijan"
    },
    caspianSea: {
      path: "M160,180 L200,160 L240,180 L260,220 L250,270 L220,310 L180,330 L140,310 L120,270 L130,220 Z",
      fill: "hsl(200, 80%, 75%)",
      name: "Caspian Sea"
    }
  };

  // Region positions on the map
  const regionPositions: Record<string, { x: number; y: number }> = {
    'az-absheron': { x: 170, y: 240 },
    'az-nakhchivan': { x: 140, y: 290 },
    'kz-mangystau': { x: 280, y: 180 },
    'kz-almaty': { x: 580, y: 220 },
    'uz-navoi': { x: 420, y: 320 },
    'uz-bukhara': { x: 360, y: 340 },
  };

  return (
    <div className="map-container relative h-[450px] overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="secondary" size="icon" onClick={handleZoomIn} className="h-8 w-8">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut} className="h-8 w-8">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleFullscreen} className="h-8 w-8">
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Title */}
      <div className="absolute top-4 left-4 z-10 bg-card/95 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-border shadow-sm">
        <p className="text-sm font-semibold text-foreground">Clean Energy Investment Map</p>
        <p className="text-xs text-muted-foreground">Azerbaijan • Kazakhstan • Uzbekistan</p>
      </div>

      {/* SVG Map */}
      <svg 
        viewBox="0 0 800 450" 
        className="w-full h-full transition-transform duration-300"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(210, 20%, 96%)" />
            <stop offset="100%" stopColor="hsl(150, 15%, 94%)" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5"/>
          </pattern>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill="url(#mapBg)" />
        <rect width="100%" height="100%" fill="url(#gridPattern)" />

        {/* Caspian Sea */}
        <path
          d={countryPaths.caspianSea.path}
          fill={countryPaths.caspianSea.fill}
          opacity="0.4"
          className="transition-opacity"
        />
        <text x="185" y="250" className="text-[10px] fill-muted-foreground font-medium" textAnchor="middle">
          Caspian Sea
        </text>

        {/* Kazakhstan */}
        <path
          d={countryPaths.kazakhstan.path}
          fill="hsl(155, 25%, 88%)"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          className="transition-all hover:fill-[hsl(155,30%,82%)] cursor-pointer"
          onClick={() => toast.info('Kazakhstan - Click on specific regions for details')}
        />
        <text x="450" y="180" className="text-sm fill-foreground font-semibold pointer-events-none" textAnchor="middle">
          Kazakhstan
        </text>

        {/* Uzbekistan */}
        <path
          d={countryPaths.uzbekistan.path}
          fill="hsl(38, 40%, 88%)"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          className="transition-all hover:fill-[hsl(38,45%,82%)] cursor-pointer"
          onClick={() => toast.info('Uzbekistan - Click on specific regions for details')}
        />
        <text x="400" y="330" className="text-sm fill-foreground font-semibold pointer-events-none" textAnchor="middle">
          Uzbekistan
        </text>

        {/* Azerbaijan */}
        <path
          d={countryPaths.azerbaijan.path}
          fill="hsl(200, 35%, 88%)"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          className="transition-all hover:fill-[hsl(200,40%,82%)] cursor-pointer"
          onClick={() => toast.info('Azerbaijan - Click on specific regions for details')}
        />
        <text x="170" y="235" className="text-xs fill-foreground font-semibold pointer-events-none" textAnchor="middle">
          Azerbaijan
        </text>

        {/* Region markers */}
        {regions.map((region) => {
          const pos = regionPositions[region.id];
          if (!pos) return null;
          
          const isHovered = hoveredRegion === region.id;
          const markerColor = region.regulatoryReadiness === 'high' 
            ? 'hsl(var(--status-success))'
            : region.regulatoryReadiness === 'medium'
            ? 'hsl(var(--status-warning))'
            : 'hsl(var(--status-danger))';

          return (
            <g
              key={region.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(region.id)}
            >
              {/* Pulse effect */}
              <circle
                r={isHovered ? 24 : 18}
                fill={markerColor}
                opacity={isHovered ? 0.3 : 0.15}
                className="transition-all duration-300"
              />
              {/* Inner marker */}
              <circle
                r={isHovered ? 10 : 8}
                fill={markerColor}
                filter={isHovered ? "url(#glow)" : ""}
                className="transition-all duration-200"
              />
              {/* Label */}
              <text
                y={-20}
                textAnchor="middle"
                className={`text-[10px] font-medium transition-all ${isHovered ? 'fill-foreground' : 'fill-muted-foreground'}`}
              >
                {region.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover Tooltip */}
      {hoveredData && (
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg shadow-lg p-4 w-72 animate-fade-in z-20">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div className="space-y-2">
              <div>
                <p className="font-semibold text-foreground">{hoveredData.name}</p>
                <p className="text-xs text-muted-foreground">{hoveredData.country}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Potential</p>
                  <p className="font-semibold text-foreground">{hoveredData.renewablePotential}/100</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Grid Distance</p>
                  <p className="font-semibold text-foreground">{hoveredData.gridDistance} km</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Readiness</p>
                  <p className={`font-semibold capitalize ${
                    hoveredData.regulatoryReadiness === 'high' ? 'text-status-success' :
                    hoveredData.regulatoryReadiness === 'medium' ? 'text-status-warning' :
                    'text-status-danger'
                  }`}>
                    {hoveredData.regulatoryReadiness}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">CAPEX</p>
                  <p className="font-semibold text-foreground">{hoveredData.capexRange}</p>
                </div>
              </div>
              <p className="text-xs text-accent font-medium">Click to view project pathway →</p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
        <p className="text-xs font-medium text-foreground mb-2">Regulatory Readiness</p>
        <div className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-status-success" />
            <span className="text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-status-warning" />
            <span className="text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-status-danger" />
            <span className="text-muted-foreground">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}
