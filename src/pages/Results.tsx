import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScholarshipCard from '@/components/ScholarshipCard';
import { scholarships } from '@/data/scholarships';
import Navbar from '@/components/Navbar';

const Results = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState(scholarships);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let results = scholarships.filter(scholarship =>
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter) {
      results = results.filter(scholarship => scholarship.category === categoryFilter);
    }

    if (levelFilter) {
      results = results.filter(scholarship => scholarship.level === levelFilter);
    }

    setFilteredScholarships(results);
  }, [searchTerm, categoryFilter, levelFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Explore Scholarships
          </h1>
          <p className="text-gray-600">
            Find the perfect scholarship to fund your education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="ST">ST</SelectItem>
              <SelectItem value="Minority">Minority</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Levels</SelectItem>
              <SelectItem value="School">School</SelectItem>
              <SelectItem value="UG">Undergraduate</SelectItem>
              <SelectItem value="PG">Postgraduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500">Loading scholarships...</div>
        ) : (
          filteredScholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScholarships.map((scholarship, index) => (
                <ScholarshipCard 
                  key={index} 
                  scholarship={scholarship} 
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No scholarships found matching your criteria.
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default Results;
