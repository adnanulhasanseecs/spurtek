import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
  feature?: 'ai-recommendation' | 'predictive-maintenance' | 'smart-diagnostics';
}

export function ComingSoon({ title, description, feature }: ComingSoonProps) {
  return (
    <Card className="relative overflow-hidden border-dashed">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>{title}</CardTitle>
          <Badge variant="secondary" className="ml-auto">
            Coming Soon
          </Badge>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="relative">
        <p className="text-sm text-muted-foreground">
          This AI-powered feature is currently under development. We're working hard to bring you
          innovative solutions that will enhance your experience.
        </p>
        {feature === 'ai-recommendation' && (
          <div className="mt-4 rounded-lg bg-muted p-4">
            <p className="text-xs font-medium text-muted-foreground">
              AI-Powered Product Recommendation will analyze your requirements and suggest the best
              products for your needs.
            </p>
          </div>
        )}
        {feature === 'predictive-maintenance' && (
          <div className="mt-4 rounded-lg bg-muted p-4">
            <p className="text-xs font-medium text-muted-foreground">
              Predictive Maintenance Insights will help you anticipate equipment needs and optimize
              maintenance schedules.
            </p>
          </div>
        )}
        {feature === 'smart-diagnostics' && (
          <div className="mt-4 rounded-lg bg-muted p-4">
            <p className="text-xs font-medium text-muted-foreground">
              Smart Diagnostics Dashboard will provide real-time analysis and troubleshooting
              recommendations.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

