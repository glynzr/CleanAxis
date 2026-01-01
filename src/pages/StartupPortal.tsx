import { useState } from 'react';
import { Building2, MapPin, Cpu, TrendingUp, CheckCircle, Clock, AlertCircle, Filter, ExternalLink, Mail } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { startups, countries } from '@/data/mockData';
import { toast } from 'sonner';

const technologies = ['Solar PV Manufacturing', 'Wind Turbine Components', 'Smart Grid Solutions', 'Battery Storage', 'Small Hydro', 'Biomass'];
const stages = ['Pre-Seed', 'Seed', 'Series A', 'Series B'];

export default function StartupPortal() {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [readinessRange, setReadinessRange] = useState([0, 100]);

  const filteredStartups = startups.filter(startup => {
    if (selectedCountry !== 'all' && startup.country !== selectedCountry) return false;
    if (selectedTech !== 'all' && startup.technology !== selectedTech) return false;
    if (selectedStage !== 'all' && startup.stage !== selectedStage) return false;
    if (startup.readinessScore < readinessRange[0] || startup.readinessScore > readinessRange[1]) return false;
    return true;
  });

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-3.5 w-3.5 text-status-success" />;
      case 'pending':
        return <Clock className="h-3.5 w-3.5 text-status-warning" />;
      default:
        return <AlertCircle className="h-3.5 w-3.5 text-status-danger" />;
    }
  };

  const getComplianceLabel = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'pending':
        return 'Pending';
      default:
        return 'Incomplete';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-status-success';
    if (score >= 60) return 'text-status-warning';
    return 'text-status-danger';
  };

  const handleViewStartup = (startupName: string) => {
    toast.info(`Loading ${startupName} profile...`, {
      description: 'Detailed company information coming soon.',
    });
  };

  const handleContact = (startupName: string) => {
    toast.success(`Contact request sent to ${startupName}`, {
      description: 'They will receive your inquiry within 24 hours.',
    });
  };

  const handleClearFilters = () => {
    setSelectedCountry('all');
    setSelectedTech('all');
    setSelectedStage('all');
    setReadinessRange([0, 100]);
    toast.success('Filters cleared');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Startup-to-Market Portal</h1>
        <p className="text-sm text-muted-foreground">
          Connect clean-tech startups with investors across Central Asia
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filters */}
        <div className="lg:col-span-3">
          <div className="filter-panel space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Filters</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-xs h-7 px-2">
                Clear
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Country</Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All countries" />
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
                <Label className="text-xs text-muted-foreground">Technology</Label>
                <Select value={selectedTech} onValueChange={setSelectedTech}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All technologies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Technologies</SelectItem>
                    {technologies.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Stage</Label>
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All stages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    {stages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Readiness Score</Label>
                  <span className="text-xs font-medium text-foreground">
                    {readinessRange[0]} - {readinessRange[1]}
                  </span>
                </div>
                <Slider
                  value={readinessRange}
                  onValueChange={setReadinessRange}
                  max={100}
                  step={5}
                  className="py-2"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Showing {filteredStartups.length} of {startups.length} startups
              </p>
            </div>
          </div>
        </div>

        {/* Startup Grid */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredStartups.map((startup) => (
              <div
                key={startup.id}
                className="stat-card hover:shadow-card-hover transition-shadow group"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div 
                      className="cursor-pointer"
                      onClick={() => handleViewStartup(startup.name)}
                    >
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-1">
                        {startup.name}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {startup.country}
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${
                      startup.complianceStatus === 'verified' ? 'status-success' :
                      startup.complianceStatus === 'pending' ? 'status-warning' :
                      'status-danger'
                    } status-badge`}>
                      {getComplianceIcon(startup.complianceStatus)}
                      {getComplianceLabel(startup.complianceStatus)}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Cpu className="h-3.5 w-3.5" />
                      <span>{startup.technology}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{startup.stage}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {startup.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Investment Readiness</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`h-4 w-4 ${getScoreColor(startup.readinessScore)}`} />
                        <span className={`text-lg font-semibold ${getScoreColor(startup.readinessScore)}`}>
                          {startup.readinessScore}
                        </span>
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Target</p>
                      <p className="text-sm font-semibold text-foreground">{startup.fundingTarget}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={() => handleContact(startup.name)}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Contact Startup
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredStartups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No startups match your current filters.</p>
              <Button variant="link" onClick={handleClearFilters} className="mt-2">
                Clear filters to see all startups
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
