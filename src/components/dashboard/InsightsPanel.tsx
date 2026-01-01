import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { insights, type Insight } from '@/data/mockData';

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  danger: AlertCircle,
  info: Info,
};

const borderColorMap = {
  success: 'border-status-success',
  warning: 'border-status-warning',
  danger: 'border-status-danger',
  info: 'border-status-info',
};

const iconColorMap = {
  success: 'text-status-success',
  warning: 'text-status-warning',
  danger: 'text-status-danger',
  info: 'text-status-info',
};

function InsightItem({ insight }: { insight: Insight }) {
  const Icon = iconMap[insight.type];
  
  return (
    <div className={`insight-card ${borderColorMap[insight.type]}`}>
      <div className="flex items-start gap-2">
        <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${iconColorMap[insight.type]}`} />
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-foreground">{insight.title}</p>
          <p className="text-xs text-muted-foreground">{insight.description}</p>
        </div>
      </div>
    </div>
  );
}

export function InsightsPanel() {
  return (
    <div className="filter-panel space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Key Insights</h3>
      <div className="space-y-3">
        {insights.map((insight) => (
          <InsightItem key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}
