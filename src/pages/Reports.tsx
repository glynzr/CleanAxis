import { FileText, Download, Calendar, FileStack, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reports } from '@/data/mockData';
import { toast } from 'sonner';

const typeColors: Record<string, string> = {
  'Annual Report': 'bg-status-info/10 text-status-info',
  'Country Brief': 'bg-accent/10 text-accent',
  'Technical Study': 'bg-chart-wind/10 text-chart-wind',
  'Infrastructure Report': 'bg-status-success/10 text-status-success',
  'Risk Analysis': 'bg-status-warning/10 text-status-warning',
};

export default function Reports() {
  const handleDownload = (reportTitle: string) => {
    toast.success(`Downloading: ${reportTitle}`, {
      description: 'Your download will start shortly.',
      duration: 3000,
    });
  };

  const handleViewReport = (reportTitle: string) => {
    toast.info(`Opening: ${reportTitle}`, {
      description: 'Loading report preview...',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Reports & Publications</h1>
        <p className="text-sm text-muted-foreground">
          Access comprehensive analysis and research on clean energy investment in Central Asia
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card cursor-pointer hover:shadow-card-hover transition-shadow" onClick={() => toast.info('Browse all available reports below')}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <FileStack className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{reports.length}</p>
              <p className="text-xs text-muted-foreground">Available Reports</p>
            </div>
          </div>
        </div>
        <div className="stat-card cursor-pointer hover:shadow-card-hover transition-shadow" onClick={() => toast.info('Latest publication from Q1 2024')}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">Q1 2024</p>
              <p className="text-xs text-muted-foreground">Latest Publication</p>
            </div>
          </div>
        </div>
        <div className="stat-card cursor-pointer hover:shadow-card-hover transition-shadow" onClick={() => toast.info('Combined report pages available for download')}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Download className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">296</p>
              <p className="text-xs text-muted-foreground">Total Pages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="stat-card flex items-center justify-between hover:shadow-card-hover transition-shadow group"
          >
            <div 
              className="flex items-center gap-4 flex-1 cursor-pointer"
              onClick={() => handleViewReport(report.title)}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                  {report.title}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className={`px-2 py-0.5 rounded-full ${typeColors[report.type] || 'bg-muted text-muted-foreground'}`}>
                    {report.type}
                  </span>
                  <span>{new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>{report.pages} pages</span>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => handleDownload(report.title)}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
