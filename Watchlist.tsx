import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { 
  Plus, 
  Search, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  X,
  ExternalLink,
  MoreVertical
} from "lucide-react";

interface WatchlistItem {
  id: string;
  symbol: string;
  company: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  lastFiling: string;
  alerts: boolean;
  starred: boolean;
}

export function Watchlist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSymbol, setNewSymbol] = useState("");

  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([
    {
      id: "1",
      symbol: "AAPL",
      company: "Apple Inc.",
      currentPrice: 189.84,
      change: 4.25,
      changePercent: 2.29,
      volume: 58420000,
      marketCap: "2.95T",
      lastFiling: "2 hrs ago",
      alerts: true,
      starred: true
    },
    {
      id: "2",
      symbol: "MSFT",
      company: "Microsoft Corporation",
      currentPrice: 374.12,
      change: -2.18,
      changePercent: -0.58,
      volume: 24350000,
      marketCap: "2.78T",
      lastFiling: "4 hrs ago",
      alerts: true,
      starred: true
    },
    {
      id: "3",
      symbol: "TSLA",
      company: "Tesla, Inc.",
      currentPrice: 248.50,
      change: -5.23,
      changePercent: -2.06,
      volume: 87640000,
      marketCap: "792B",
      lastFiling: "6 hrs ago",
      alerts: false,
      starred: false
    },
    {
      id: "4",
      symbol: "NVDA",
      company: "NVIDIA Corporation",
      currentPrice: 118.11,
      change: 1.85,
      changePercent: 1.59,
      volume: 342850000,
      marketCap: "2.91T",
      lastFiling: "1 day ago",
      alerts: true,
      starred: true
    },
    {
      id: "5",
      symbol: "AMZN",
      company: "Amazon.com, Inc.",
      currentPrice: 145.33,
      change: 0.87,
      changePercent: 0.60,
      volume: 45230000,
      marketCap: "1.51T",
      lastFiling: "8 hrs ago",
      alerts: false,
      starred: false
    }
  ]);

  const filteredItems = watchlistItems.filter(item => 
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(0)}K`;
    }
    return volume.toString();
  };

  const toggleAlert = (id: string) => {
    setWatchlistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, alerts: !item.alerts } : item
      )
    );
  };

  const toggleStar = (id: string) => {
    setWatchlistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setWatchlistItems(items => items.filter(item => item.id !== id));
  };

  const addSymbol = () => {
    if (newSymbol.trim()) {
      const newItem: WatchlistItem = {
        id: Date.now().toString(),
        symbol: newSymbol.toUpperCase(),
        company: `${newSymbol.toUpperCase()} Company`,
        currentPrice: 100.00,
        change: 0,
        changePercent: 0,
        volume: 1000000,
        marketCap: "1B",
        lastFiling: "No recent filings",
        alerts: false,
        starred: false
      };
      setWatchlistItems([...watchlistItems, newItem]);
      setNewSymbol("");
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Watchlist</h1>
          <p className="text-muted-foreground">
            Monitor your favorite stocks and track insider activity
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add to Watchlist</CardTitle>
            <CardDescription>
              Enter a stock symbol to add to your watchlist
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter stock symbol (e.g., AAPL)"
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSymbol()}
                className="flex-1"
              />
              <Button onClick={addSymbol}>Add</Button>
              <Button variant="outline" onClick={() => {
                setShowAddForm(false);
                setNewSymbol("");
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Search Watchlist</CardTitle>
          <CardDescription>
            Filter your watchlist by symbol or company name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search your watchlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(item.id)}
                      className="p-1 h-6 w-6"
                    >
                      <Star 
                        className={`h-4 w-4 ${item.starred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                      />
                    </Button>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{item.symbol}</h3>
                        <Badge variant="outline" className="text-xs">
                          {item.marketCap}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.company}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-semibold">${item.currentPrice.toFixed(2)}</p>
                    <div className={`flex items-center space-x-1 text-sm ${
                      item.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>
                        {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} 
                        ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="font-medium">{formatVolume(item.volume)}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Last Filing</p>
                    <p className="font-medium text-sm">{item.lastFiling}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Bell className="h-3 w-3 text-muted-foreground" />
                      <Switch
                        checked={item.alerts}
                        onCheckedChange={() => toggleAlert(item.id)}
                      />
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No stocks found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}