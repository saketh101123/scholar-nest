
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScholarshipCard from '@/components/ScholarshipCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { scholarshipsData } from '@/data/scholarships';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [filteredScholarships, setFilteredScholarships] = useState(scholarshipsData);

  const categories = ['All', 'Women', 'SC', 'ST', 'Minority', 'General'];
  const levels = ['School', 'UG', 'PG', 'UG (Technical)', 'PG (Technical)', 'UG/PG'];

  const applyFilters = () => {
    let filtered = scholarshipsData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(scholarship =>
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(scholarship =>
        scholarship.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(scholarship =>
        scholarship.level.toLowerCase().includes(levelFilter.toLowerCase())
      );
    }

    setFilteredScholarships(filtered);
  };

  // Apply filters whenever search term or filters change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, categoryFilter, levelFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setLevelFilter('all');
    setFilteredScholarships(scholarshipsData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse All Scholarships</h1>
          <p className="text-xl text-gray-600">
            Explore all available scholarships for Karnataka students
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-scholar-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Scholarships</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 form-input"
              />
            </div>

            {/* Category Filter */}
            <Select 
              value={categoryFilter} 
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="form-input">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.filter(cat => cat !== 'All').map(category => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Level Filter */}
            <Select 
              value={levelFilter} 
              onValueChange={setLevelFilter}
            >
              <SelectTrigger className="form-input">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level.toLowerCase()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="bg-scholar-blue-100 text-scholar-blue-800">
                Search: {searchTerm}
              </Badge>
            )}
            {categoryFilter !== 'all' && (
              <Badge variant="secondary" className="bg-scholar-purple-100 text-scholar-purple-800">
                Category: {categoryFilter}
              </Badge>
            )}
            {levelFilter !== 'all' && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Level: {levelFilter}
              </Badge>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredScholarships.length}</span> of{' '}
            <span className="font-semibold">{scholarshipsData.length}</span> scholarships
          </p>
        </div>

        {/* Scholarships Grid */}
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScholarships.map((scholarship, index) => (
              <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                <ScholarshipCard scholarship={scholarship} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Scholarships Found</h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search terms or filters to find more scholarships.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Browse;
