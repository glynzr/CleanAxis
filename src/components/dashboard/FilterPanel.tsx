import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries, energyTypes, riskProfiles } from '@/data/mockData';

interface FilterPanelProps {
  selectedCountry: string;
  selectedEnergy: string;
  selectedRisk: string;
  onCountryChange: (value: string) => void;
  onEnergyChange: (value: string) => void;
  onRiskChange: (value: string) => void;
}

export function FilterPanel({
  selectedCountry,
  selectedEnergy,
  selectedRisk,
  onCountryChange,
  onEnergyChange,
  onRiskChange,
}: FilterPanelProps) {
  return (
    <div className="filter-panel space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Filters</h3>
      
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Country</Label>
          <Select value={selectedCountry} onValueChange={onCountryChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Energy Type</Label>
          <Select value={selectedEnergy} onValueChange={onEnergyChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {energyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Investor Risk Profile</Label>
          <Select value={selectedRisk} onValueChange={onRiskChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {riskProfiles.map((risk) => (
                <SelectItem key={risk} value={risk}>
                  {risk}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
