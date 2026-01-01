import { MapPin } from 'lucide-react';
import { regions } from '@/data/mockData';

export function MapPreview() {
  return (
    <div className="map-container relative h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Stylized map background */}
        <svg viewBox="0 0 800 400" className="w-full h-full opacity-30">
          {/* Caspian Sea region outline */}
          <path
            d="M200 100 Q250 80 300 100 L350 150 Q380 200 360 250 L300 300 Q250 320 200 300 L150 250 Q120 200 150 150 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-accent"
          />
          {/* Central Asia regions */}
          <path
            d="M400 80 Q500 60 600 100 L650 180 Q680 250 620 300 L500 340 Q400 350 350 280 L360 180 Q380 100 400 80 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground"
          />
          {/* Grid lines */}
          {[...Array(8)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={50 * i}
              x2="800"
              y2={50 * i}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border"
            />
          ))}
          {[...Array(16)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={50 * i}
              y1="0"
              x2={50 * i}
              y2="400"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border"
            />
          ))}
        </svg>
        
        {/* Region markers */}
        <div className="absolute inset-0">
          {regions.slice(0, 4).map((region, index) => {
            const positions = [
              { top: '25%', left: '25%' },
              { top: '45%', left: '35%' },
              { top: '30%', left: '60%' },
              { top: '55%', left: '70%' },
            ];
            return (
              <div
                key={region.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={positions[index]}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-accent/20 rounded-full animate-pulse-subtle" />
                  <MapPin className="h-6 w-6 text-accent relative z-10" />
                  <div className="absolute left-8 top-0 bg-card border border-border rounded px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    <p className="text-xs font-medium text-foreground">{region.name}</p>
                    <p className="text-xs text-muted-foreground">{region.country}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Map label */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded px-3 py-2 border border-border">
        <p className="text-sm font-medium text-foreground">Clean Energy Investment Overview</p>
        <p className="text-xs text-muted-foreground">Azerbaijan • Kazakhstan • Uzbekistan</p>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded px-3 py-2 border border-border">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-status-success" />
            <span className="text-muted-foreground">High Readiness</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-status-warning" />
            <span className="text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-status-danger" />
            <span className="text-muted-foreground">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}
