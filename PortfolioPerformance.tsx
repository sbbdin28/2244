import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Percent, Calendar, Target } from "lucide-react";
import { useState } from "react";

interface PerformanceMetric {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

function PerformanceMetric({ label, value, change, changeType, icon }: PerformanceMetric) {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 
                     changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground';
  
  const ChangeIcon = changeType === 'positive' ? TrendingUp : 
                    changeType === 'negative' ? TrendingDown : Calendar;

  return (
    <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
      <div className="p-2 bg-muted rounded-lg">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-bold">{value}</p>
        <div className={`flex items-center space-x-1 text-sm ${changeColor}`}>
          <ChangeIcon className="h-3 w-3" />
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
}

export function PortfolioPerformance() {
  const [timeRange, setTimeRange] = useState("1M");

  const performanceData = [
    { date: '2024-07-30', value: 782000, sp500: 780000 },
    { date: '2024-08-05', value: 795000, sp500: 785000 },
    { date: '2024-08-10', value: 801000, sp500: 790000 },
    { date: '2024-08-15', value: 815000, sp500: 795000 },
    { date: '2024-08-20', value: 823000, sp500: 800000 },
    { date: '2024-08-25', value: 839000, sp500: 810000 },
    { date: '2024-08-30', value: 847392, sp500: 815000 },
  ];

  const allocationData = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Healthcare', value: 20, color: '#10b981' },
    { name: 'Finance', value: 15, color: '#f59e0b' },
    { name: 'Consumer', value: 12, color: '#ef4444' },
    { name: 'Energy', value: 10, color: '#8b5cf6' },
    { name: 'Other', value: 8, color: '#6b7280' },
  ];

  const topHoldings = [
    { symbol: 'AAPL', name: 'Apple Inc.', value: 125000, weight: 14.7, change: 2.3 },
    { symbol: 'MSFT', name: 'Microsoft Corp', value: 98000, weight: 11.6, change: 1.8 },
    { symbol: 'NVDA', name: 'NVIDIA Corp', value: 87000, weight: 10.3, change: -0.5 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', value: 76000, weight: 9.0, change: 1.2 },
    { symbol: 'TSLA', name: 'Tesla Inc.', value: 65000, weight: 7.7, change: -2.1 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Portfolio Performance</h1>
          <p className="text-muted-foreground">
            Track your investment returns and allocation
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1W">1W</SelectItem>
            <SelectItem value="1M">1M</SelectItem>
            <SelectItem value="3M">3M</SelectItem>
            <SelectItem value="6M">6M</SelectItem>
            <SelectItem value="1Y">1Y</SelectItem>
            <SelectItem value="ALL">ALL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PerformanceMetric
          label="Total Value"
          value="$847,392"
          change="+8.2%"
          changeType="positive"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <PerformanceMetric
          label="Total Return"
          value="+$67,392"
          change="+12.5%"
          changeType="positive"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <PerformanceMetric
          label="Daily Change"
          value="+$8,392"
          change="+1.0%"
          changeType="positive"
          icon={<Percent className="h-4 w-4" />}
        />
        <PerformanceMetric
          label="vs S&P 500"
          value="+3.2%"
          change="Outperforming"
          changeType="positive"
          icon={<Target className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Value Over Time</CardTitle>
            <CardDescription>
              Your portfolio performance vs S&P 500
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                    fontSize={12}
                  />
                  <YAxis 
                    tickFormatter={(value) => formatCurrency(value)}
                    fontSize={12}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      formatCurrency(value), 
                      name === 'value' ? 'Portfolio' : 'S&P 500'
                    ]}
                    labelFormatter={(label) => formatDate(label as string)}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="sp500"
                    stroke="#6b7280"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>
              Portfolio breakdown by sector
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Allocation']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Holdings</CardTitle>
          <CardDescription>
            Your largest positions by market value
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topHoldings.map((holding, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{holding.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{holding.symbol}</p>
                    <p className="text-sm text-muted-foreground">{holding.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(holding.value)}</p>
                  <p className="text-sm text-muted-foreground">{holding.weight}% of portfolio</p>
                </div>
                <div className="text-right ml-4">
                  <Badge 
                    variant={holding.change >= 0 ? "default" : "destructive"}
                    className={holding.change >= 0 ? "bg-green-100 text-green-800" : ""}
                  >
                    {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}