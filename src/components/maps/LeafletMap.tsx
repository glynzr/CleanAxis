import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { regions, Region } from '@/data/mockData';

const getReadinessColor = (readiness: Region['regulatoryReadiness']) => {
  switch (readiness) {
    case 'high': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'low': return '#ef4444';
    default: return '#94a3b8';
  }
};

const getCountryIcon = (country: string) => {
  switch (country) {
    case 'Azerbaijan': return '🇦🇿';
    case 'Kazakhstan': return '🇰🇿';
    case 'Uzbekistan': return '🇺🇿';
    default: return '📍';
  }
};

interface LeafletMapProps {
  onRegionClick?: (regionId: string) => void;
  filterCountry?: string;
  height?: string;
  showLayers?: boolean;
  activeLayers?: string[];
}

const LeafletMap = ({ 
  onRegionClick, 
  filterCountry = 'all',
  height = '450px',
  showLayers = false,
  activeLayers = []
}: LeafletMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const layersRef = useRef<L.Layer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const filteredRegions = filterCountry === 'all' 
    ? regions 
    : regions.filter(r => r.country === filterCountry);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Clean up existing map
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Central Asia center coordinates
    const centerLat = 42.5;
    const centerLng = 59;

    // Initialize map
    mapRef.current = L.map(mapContainer.current, {
      center: [centerLat, centerLng],
      zoom: 4,
      minZoom: 3,
      maxZoom: 10,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    // Add tile layer (CartoDB Positron - clean, professional look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(mapRef.current);

    // Clear existing markers and layers
    markersRef.current = [];
    layersRef.current = [];

    // Add layer overlays if enabled
    if (showLayers && mapRef.current) {
      // Solar layer - ellipse over Uzbekistan/Kazakhstan
      if (activeLayers.includes('solar')) {
        const solarCircle = L.circle([41.5, 64], {
          radius: 400000,
          fillColor: '#facc15',
          fillOpacity: 0.15,
          stroke: false,
        }).addTo(mapRef.current);
        layersRef.current.push(solarCircle);
      }

      // Wind layer - ellipse over western Kazakhstan
      if (activeLayers.includes('wind')) {
        const windCircle = L.circle([44, 52], {
          radius: 350000,
          fillColor: '#3b82f6',
          fillOpacity: 0.15,
          stroke: false,
        }).addTo(mapRef.current);
        layersRef.current.push(windCircle);
      }

      // Grid layer - polylines
      if (activeLayers.includes('grid')) {
        const gridLine = L.polyline([
          [40.4, 49.8],
          [43.6, 51.1],
          [40.0, 65.3],
          [43.2, 76.9]
        ], {
          color: '#166534',
          weight: 3,
          opacity: 0.6,
          dashArray: '10, 5',
        }).addTo(mapRef.current);
        layersRef.current.push(gridLine);
      }

      // Special Economic Zones
      if (activeLayers.includes('sez')) {
        const sez1 = L.rectangle([[39.5, 64], [41, 66]], {
          fillColor: '#8b5cf6',
          fillOpacity: 0.2,
          stroke: true,
          color: '#8b5cf6',
          weight: 1,
        }).addTo(mapRef.current);
        const sez2 = L.rectangle([[43, 50], [44.5, 52.5]], {
          fillColor: '#8b5cf6',
          fillOpacity: 0.2,
          stroke: true,
          color: '#8b5cf6',
          weight: 1,
        }).addTo(mapRef.current);
        layersRef.current.push(sez1, sez2);
      }

      // Clean Energy Incentive Zones
      if (activeLayers.includes('incentive')) {
        const incentive1 = L.circle([40.4, 49.8], {
          radius: 80000,
          fillColor: '#f97316',
          fillOpacity: 0.2,
          stroke: true,
          color: '#f97316',
          weight: 1,
        }).addTo(mapRef.current);
        const incentive2 = L.circle([40.0, 65.3], {
          radius: 100000,
          fillColor: '#f97316',
          fillOpacity: 0.2,
          stroke: true,
          color: '#f97316',
          weight: 1,
        }).addTo(mapRef.current);
        layersRef.current.push(incentive1, incentive2);
      }
    }

    // Add markers for each region
    filteredRegions.forEach((region) => {
      const marker = L.circleMarker([region.coordinates.lat, region.coordinates.lng], {
        radius: 12,
        fillColor: getReadinessColor(region.regulatoryReadiness),
        color: 'white',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(mapRef.current!);

      // Add popup
      marker.bindPopup(`
        <div style="text-align: center; min-width: 200px; font-family: system-ui, sans-serif;">
          <div style="font-size: 24px; margin-bottom: 8px;">
            ${getCountryIcon(region.country)}
          </div>
          <h3 style="font-weight: 600; font-size: 14px; margin-bottom: 4px; color: #1e293b;">
            ${region.name}
          </h3>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">
            ${region.country}
          </p>
          <div style="
            background: ${getReadinessColor(region.regulatoryReadiness)}; 
            color: white; 
            padding: 4px 12px; 
            border-radius: 4px;
            font-size: 11px;
            margin-bottom: 12px;
            text-transform: capitalize;
            display: inline-block;
          ">
            ${region.regulatoryReadiness} readiness
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; text-align: left;">
            <div>
              <p style="color: #94a3b8; margin: 0;">Potential</p>
              <p style="font-weight: 600; color: #1e293b; margin: 2px 0 0 0;">${region.renewablePotential}/100</p>
            </div>
            <div>
              <p style="color: #94a3b8; margin: 0;">Grid Distance</p>
              <p style="font-weight: 600; color: #1e293b; margin: 2px 0 0 0;">${region.gridDistance} km</p>
            </div>
            <div>
              <p style="color: #94a3b8; margin: 0;">CAPEX Range</p>
              <p style="font-weight: 600; color: #1e293b; margin: 2px 0 0 0;">${region.capexRange}</p>
            </div>
            <div>
              <p style="color: #94a3b8; margin: 0;">Timeline</p>
              <p style="font-weight: 600; color: #1e293b; margin: 2px 0 0 0;">${region.approvalTimeline}</p>
            </div>
          </div>
          <p style="font-size: 11px; color: #16a34a; margin-top: 12px; cursor: pointer;">
            Click for detailed pathway →
          </p>
        </div>
      `);

      // Event handlers
      marker.on('mouseover', () => {
        marker.setRadius(16);
        marker.setStyle({ fillOpacity: 1 });
      });

      marker.on('mouseout', () => {
        marker.setRadius(12);
        marker.setStyle({ fillOpacity: 0.8 });
      });

      marker.on('click', () => {
        onRegionClick?.(region.id);
      });

      markersRef.current.push(marker);
    });

    // Add legend
    const legend = new L.Control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.cssText = `
        background: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        font-size: 12px;
        font-family: system-ui, sans-serif;
      `;
      div.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 8px; color: #1e293b;">Regulatory Readiness</div>
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="width: 12px; height: 12px; background: #22c55e; border-radius: 50%; display: inline-block;"></span>
          <span style="color: #64748b;">High</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="width: 12px; height: 12px; background: #f59e0b; border-radius: 50%; display: inline-block;"></span>
          <span style="color: #64748b;">Medium</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="width: 12px; height: 12px; background: #ef4444; border-radius: 50%; display: inline-block;"></span>
          <span style="color: #64748b;">Low</span>
        </div>
      `;
      return div;
    };
    legend.addTo(mapRef.current);

    // Add title
    const title = new L.Control({ position: 'topleft' });
    title.onAdd = () => {
      const div = L.DomUtil.create('div', 'map-title');
      div.style.cssText = `
        background: white;
        padding: 10px 16px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        font-family: system-ui, sans-serif;
      `;
      div.innerHTML = `
        <p style="font-weight: 600; font-size: 14px; color: #1e293b; margin: 0;">Clean Energy Investment Map</p>
        <p style="font-size: 12px; color: #64748b; margin: 4px 0 0 0;">Azerbaijan • Kazakhstan • Uzbekistan</p>
      `;
      return div;
    };
    title.addTo(mapRef.current);

    setIsLoaded(true);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [filteredRegions, onRegionClick, showLayers, activeLayers, filterCountry]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-border" style={{ height }}>
      <div 
        ref={mapContainer} 
        className="h-full w-full"
        style={{ background: '#f8fafc' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 rounded-lg">
          <span className="text-muted-foreground">Loading map...</span>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
