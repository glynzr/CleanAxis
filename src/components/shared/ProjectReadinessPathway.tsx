import { createPortal } from 'react-dom';
import {
  X,
  FileCheck,
  Clock,
  AlertTriangle,
  Building2,
  Download,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Region } from '@/data/mockData';

interface ProjectReadinessPathwayProps {
  region: Region;
  onClose: () => void;
}

export function ProjectReadinessPathway({
  region,
  onClose,
}: ProjectReadinessPathwayProps) {
  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-[10001] w-full max-w-4xl bg-background text-foreground rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Project Readiness Pathway
          </h2>
          <p className="text-sm text-muted-foreground">
            Regulatory, permitting, and grid-readiness overview for{' '}
            <span className="font-medium text-foreground">
              {region.name}
            </span>
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-1">
              <FileCheck className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted-foreground">
                Required Permits
              </p>
            </div>
            <p className="text-lg font-semibold">3–4 permits</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted-foreground">
                Approval Timeline
              </p>
            </div>
            <p className="text-lg font-semibold">6–9 months</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted-foreground">
                Regulatory Risk
              </p>
            </div>
            <div className="flex gap-2 mt-1">
              <span className="status-badge status-success">Low</span>
              <span className="status-badge status-warning">Medium</span>
            </div>
          </div>
        </div>

        {/* Pathway Steps */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-semibold">
            Recommended Project Pathway
          </h3>

          <div className="space-y-3">
            <div className="flex gap-3">
              <Building2 className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium">
                  Site Qualification & Land Access
                </p>
                <p className="text-xs text-muted-foreground">
                  Verify land ownership, zoning rules, and environmental
                  eligibility.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <FileCheck className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium">
                  Permitting & Licensing
                </p>
                <p className="text-xs text-muted-foreground">
                  Apply for construction, generation, and grid-connection
                  permits.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium">
                  Grid Connection & PPA
                </p>
                <p className="text-xs text-muted-foreground">
                  Secure grid access approval and power purchase agreements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>

          <Button size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
