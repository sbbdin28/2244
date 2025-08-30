import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Search, Filter, Download, ExternalLink } from "lucide-react";

interface Filing {
  id: string;
  company: string;
  ticker: string;
  insider: string;
  title: string;
  transactionType: 'Purchase' | 'Sale' | 'Grant' | 'Exercise';
  shares: number;
  price: number;
  totalValue: number;
  shareholdingChange: number;
  filingDate: string;
  transactionDate: string;
}

export function FilingsTracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("filingDate");

  const filings: Filing[] = [
    {
      id: "1",
      company: "Apple Inc.",
      ticker: "AAPL",
      insider: "Timothy D. Cook",
      title: "Chief Executive Officer",
      transactionType: "Sale",
      shares: 5040,
      price: 189.84,
      totalValue: 956794,
      shareholdingChange: -0.8,
      filingDate: "2024-08-30",
      transactionDate: "2024-08-28"
    },
    {
      id: "2",
      company: "Microsoft Corporation",
      ticker: "MSFT",
      insider: "Satya Nadella",
      title: "Chief Executive Officer",
      transactionType: "Purchase",
      shares: 2500,
      price: 374.12,
      totalValue: 935300,
      shareholdingChange: 1.2,
      filingDate: "2024-08-30",
      transactionDate: "2024-08-29"
    },
    {
      id: "3",
      company: "Tesla, Inc.",
      ticker: "TSLA",
      insider: "Elon Musk",
      title: "Chief Executive Officer",
      transactionType: "Sale",
      shares: 10000,
      price: 248.50,
      totalValue: 2485000,
      shareholdingChange: -0.03,
      filingDate: "2024-08-29",
      transactionDate: "2024-08-27"
    },
    {
      id: "4",
      company: "Amazon.com, Inc.",
      ticker: "AMZN",
      insider: "Andrew R. Jassy",
      title: "Chief Executive Officer",
      transactionType: "Grant",
      shares: 1200,
      price: 145.33,
      totalValue: 174396,
      shareholdingChange: 0.5,
      filingDate: "2024-08-29",
      transactionDate: "2024-08-26"
    },
    {
      id: "5",
      company: "NVIDIA Corporation",
      ticker: "NVDA",
      insider: "Jensen Huang",
      title: "Chief Executive Officer",
      transactionType: "Sale",
      shares: 8000,
      price: 118.11,
      totalValue: 944880,
      shareholdingChange: -0.2,
      filingDate: "2024-08-28",
      transactionDate: "2024-08-25"
    }
  ];

  const filteredFilings = filings.filter(filing => {
    const matchesSearch = filing.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         filing.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         filing.insider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || filing.transactionType.toLowerCase() === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'Purchase': return 'bg-green-100 text-green-800';
      case 'Sale': return 'bg-red-100 text-red-800';
      case 'Grant': return 'bg-blue-100 text-blue-800';
      case 'Exercise': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    // Create CSV headers
    const headers = [
      'Company',
      'Ticker',
      'Insider Name',
      'Position',
      'Transaction Type',
      'Shares',
      'Price',
      'Total Value',
      'Holdings Change (%)',
      'Filing Date',
      'Transaction Date'
    ];

    // Convert filtered filings to CSV rows
    const csvRows = [
      headers.join(','),
      ...filteredFilings.map(filing => [
        `"${filing.company}"`,
        filing.ticker,
        `"${filing.insider}"`,
        `"${filing.title}"`,
        filing.transactionType,
        filing.shares,
        filing.price,
        filing.totalValue,
        filing.shareholdingChange,
        filing.filingDate,
        filing.transactionDate
      ].join(','))
    ];

    // Create and download the CSV file
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `sec-form4-filings-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Form 4 Filings Tracker</h1>
        <p className="text-muted-foreground">
          Monitor insider trading activity across public companies
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>
            Find specific filings by company, ticker, or insider name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search companies, tickers, or insiders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="purchase">Purchases</SelectItem>
                <SelectItem value="sale">Sales</SelectItem>
                <SelectItem value="grant">Grants</SelectItem>
                <SelectItem value="exercise">Exercises</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Filings</CardTitle>
          <CardDescription>
            {filteredFilings.length} filings found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Insider</TableHead>
                  <TableHead>Transaction</TableHead>
                  <TableHead className="text-right">Shares</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                  <TableHead className="text-right">Holdings Change</TableHead>
                  <TableHead>Filing Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFilings.map((filing) => (
                  <TableRow key={filing.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{filing.company}</div>
                        <div className="text-sm text-muted-foreground">{filing.ticker}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{filing.insider}</div>
                        <div className="text-sm text-muted-foreground">{filing.title}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTransactionColor(filing.transactionType)}>
                        {filing.transactionType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {filing.shares.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${filing.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(filing.totalValue)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`font-medium ${
                        filing.shareholdingChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {filing.shareholdingChange >= 0 ? '+' : ''}{filing.shareholdingChange.toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {formatDate(filing.filingDate)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}