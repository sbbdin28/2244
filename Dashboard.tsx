import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, FileText, Eye, DollarSign, Activity } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, changeType, icon }: MetricCardProps) {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 
                     changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground';
  
  const ChangeIcon = changeType === 'positive' ? TrendingUp : 
                    changeType === 'negative' ? TrendingDown : Activity;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center space-x-1 text-xs ${changeColor}`}>
          <ChangeIcon className="h-3 w-3" />
          <span>{change}</span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface RecentFilingProps {
  company: string;
  insider: string;
  position: string;
  transaction: 'Purchase' | 'Sale';
  shares: string;
  price: string;
  shareholdingChange: string;
  date: string;
}

function RecentFiling({ company, insider, position, transaction, shares, price, shareholdingChange, date }: RecentFilingProps) {
  const isPositiveChange = shareholdingChange.startsWith('+');
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <p className="font-medium">{company}</p>
          <Badge variant={transaction === 'Purchase' ? 'default' : 'secondary'}>
            {transaction}
          </Badge>
        </div>
        <p className="font-medium text-sm">{insider}</p>
        <p className="text-xs text-muted-foreground">{position}</p>
      </div>
      <div className="text-right mx-4">
        <p className="font-medium">{shares} shares</p>
        <p className="text-sm text-muted-foreground">${price}</p>
      </div>
      <div className="text-right mx-4">
        <p className="text-sm text-muted-foreground">Holdings Impact</p>
        <p className={`font-medium text-sm ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
          {shareholdingChange}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  const recentFilings = [
    {
      company: "Apple Inc.",
      insider: "Tim Cook",
      position: "Chief Executive Officer",
      transaction: "Sale" as const,
      shares: "5,040",
      price: "189.84",
      shareholdingChange: "-0.8%",
      date: "2 hrs ago"
    },
    {
      company: "Microsoft Corp",
      insider: "Satya Nadella",
      position: "Chief Executive Officer",
      transaction: "Purchase" as const,
      shares: "2,500",
      price: "374.12",
      shareholdingChange: "+1.2%",
      date: "4 hrs ago"
    },
    {
      company: "Tesla Inc",
      insider: "Elon Musk",
      position: "Chief Executive Officer",
      transaction: "Sale" as const,
      shares: "10,000",
      price: "248.50",
      shareholdingChange: "-0.03%",
      date: "6 hrs ago"
    },
    {
      company: "Amazon.com Inc",
      insider: "Andy Jassy",
      position: "Chief Executive Officer",
      transaction: "Purchase" as const,
      shares: "1,200",
      price: "145.33",
      shareholdingChange: "+0.5%",
      date: "8 hrs ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>SEC Filings Dashboard</h1>
        <p className="text-muted-foreground">
          Track insider trading activity and portfolio performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Portfolio Value"
          value="$847,392"
          change="+12.5%"
          changeType="positive"
          icon={<DollarSign />}
        />
        <MetricCard
          title="Active Watchlist Items"
          value="24"
          change="+3"
          changeType="positive"
          icon={<Eye />}
        />
        <MetricCard
          title="Form 4 Filings Today"
          value="47"
          change="+8"
          changeType="positive"
          icon={<FileText />}
        />
        <MetricCard
          title="Monthly Return"
          value="+8.2%"
          change="-2.1%"
          changeType="negative"
          icon={<Activity />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Form 4 Filings</CardTitle>
          <CardDescription>
            Latest insider trading activity from your watchlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {recentFilings.map((filing, index) => (
              <RecentFiling key={index} {...filing} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}