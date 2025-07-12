
import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { scholarshipsData } from '@/data/scholarships';
import { CalendarDays, Search, Filter } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Parse deadlines and create calendar data
  const scholarshipDates = useMemo(() => {
    const dates: { [key: string]: any[] } = {};
    
    scholarshipsData.forEach((scholarship, index) => {
      const deadline = scholarship.application_deadline;
      
      // Try to parse various date formats
      let parsedDate: Date | null = null;
      
      // Check if it contains specific months
      const monthPatterns = [
        { pattern: /january|jan/i, month: 0 },
        { pattern: /february|feb/i, month: 1 },
        { pattern: /march|mar/i, month: 2 },
        { pattern: /april|apr/i, month: 3 },
        { pattern: /may/i, month: 4 },
        { pattern: /june|jun/i, month: 5 },
        { pattern: /july|jul/i, month: 6 },
        { pattern: /august|aug/i, month: 7 },
        { pattern: /september|sep/i, month: 8 },
        { pattern: /october|oct/i, month: 9 },
        { pattern: /november|nov/i, month: 10 },
        { pattern: /december|dec/i, month: 11 },
      ];
      
      for (const { pattern, month } of monthPatterns) {
        if (pattern.test(deadline)) {
          parsedDate = new Date(2024, month, 15); // Use 15th as default day
          break;
        }
      }
      
      // If no specific date found, create a default date for display
      if (!parsedDate && !deadline.toLowerCase().includes('varies')) {
        parsedDate = new Date(2024, 11, 31); // Default to end of year
      }
      
      if (parsedDate) {
        const dateKey = format(parsedDate, 'yyyy-MM-dd');
        if (!dates[dateKey]) {
          dates[dateKey] = [];
        }
        dates[dateKey].push({ ...scholarship, index });
      }
    });
    
    return dates;
  }, []);

  // Filter scholarships based on search and category
  const filteredScholarships = useMemo(() => {
    let filtered = scholarshipsData;
    
    if (searchTerm) {
      filtered = filtered.filter(scholarship =>
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(scholarship => scholarship.category === categoryFilter);
    }
    
    return filtered;
  }, [searchTerm, categoryFilter]);

  // Get scholarships for selected date
  const selectedDateScholarships = selectedDate 
    ? scholarshipDates[format(selectedDate, 'yyyy-MM-dd')] || []
    : [];

  // Get dates that have scholarships
  const datesWithScholarships = Object.keys(scholarshipDates).map(dateStr => new Date(dateStr));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scholarship Calendar</h1>
          <p className="text-gray-600">View scholarship deadlines in calendar format</p>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="ST">ST</SelectItem>
              <SelectItem value="OBC">OBC</SelectItem>
              <SelectItem value="Minority">Minority</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
            }}
            variant="outline"
          >
            <Filter className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" />
                Scholarship Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                  hasScholarship: datesWithScholarships,
                }}
                modifiersStyles={{
                  hasScholarship: {
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                    fontWeight: 'bold',
                  },
                }}
                className="rounded-md border"
              />
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Dates with scholarship deadlines</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Date Scholarships */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate 
                  ? `Scholarships for ${format(selectedDate, 'MMMM d, yyyy')}`
                  : 'Select a date to view scholarships'
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateScholarships.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateScholarships.map((scholarship) => (
                    <div key={scholarship.index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{scholarship.name}</h3>
                        <Badge variant="secondary">{scholarship.category}</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{scholarship.provider}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 font-semibold">{scholarship.amount}</span>
                        <Button size="sm" asChild>
                          <a href={`/scholarship/${scholarship.index}`}>View Details</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  {selectedDate 
                    ? 'No scholarships have deadlines on this date'
                    : 'Select a date to view scholarship deadlines'
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>All Scholarship Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredScholarships.map((scholarship, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{scholarship.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {scholarship.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{scholarship.provider}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600 font-medium">{scholarship.amount}</span>
                    <span className="text-orange-600">{scholarship.application_deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default CalendarPage;
