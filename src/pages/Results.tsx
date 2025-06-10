

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScholarshipCard from '@/components/ScholarshipCard';
import { scholarshipsData, Scholarship } from '@/data/scholarships';
import Navbar from '@/components/Navbar';

interface FormData {
  gender: string;
  caste: string;
  religion: string;
  currentClass: string;
  percentage: number;
  familyIncome: number;
  hasDisability: boolean;
  disabilityPercentage: number;
  courseType: string;
  familyStatus: string;
  age: number;
}

const Results = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [eligibleScholarships, setEligibleScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    // Get form data from localStorage
    const storedFormData = localStorage.getItem('eligibilityFormData');
    if (storedFormData) {
      const parsedFormData: FormData = JSON.parse(storedFormData);
      setFormData(parsedFormData);
      
      // Filter scholarships based on eligibility
      const eligible = filterEligibleScholarships(scholarshipsData, parsedFormData);
      setEligibleScholarships(eligible);
      setFilteredScholarships(eligible);
    } else {
      // If no form data, show all scholarships
      setEligibleScholarships(scholarshipsData);
      setFilteredScholarships(scholarshipsData);
    }
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const filterEligibleScholarships = (scholarships: Scholarship[], userData: FormData): Scholarship[] => {
    return scholarships.filter(scholarship => {
      console.log(`Checking eligibility for: ${scholarship.name}`);
      
      // Check gender eligibility
      if (scholarship.category === 'Women' && userData.gender !== 'female') {
        console.log(`${scholarship.name} - Failed gender check`);
        return false;
      }
      
      // Check caste/category eligibility
      if (scholarship.category === 'SC' && userData.caste !== 'SC') {
        console.log(`${scholarship.name} - Failed SC caste check`);
        return false;
      }
      
      if (scholarship.category === 'ST' && userData.caste !== 'ST') {
        console.log(`${scholarship.name} - Failed ST caste check`);
        return false;
      }
      
      if (scholarship.category === 'Minority' && !['Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Parsi'].includes(userData.religion)) {
        console.log(`${scholarship.name} - Failed minority religion check`);
        return false;
      }
      
      // Check education level eligibility
      const userLevel = getUserEducationLevel(userData.currentClass);
      if (!isEducationLevelEligible(scholarship.level, userLevel)) {
        console.log(`${scholarship.name} - Failed education level check`);
        return false;
      }
      
      // Check family income (most scholarships are for lower income families)
      // Assuming scholarships are generally for families with income < 8 lakhs
      if (userData.familyIncome > 800000) {
        // Only allow 'General' category scholarships for higher income
        if (scholarship.category !== 'General') {
          console.log(`${scholarship.name} - Failed income check`);
          return false;
        }
      }
      
      console.log(`${scholarship.name} - Eligible!`);
      return true;
    });
  };

  const getUserEducationLevel = (currentClass: string): string => {
    if (['8', '9', '10', '11', '12'].includes(currentClass)) {
      return 'School';
    } else if (currentClass === 'UG') {
      return 'UG';
    } else if (currentClass === 'PG') {
      return 'PG';
    }
    return 'School';
  };

  const isEducationLevelEligible = (scholarshipLevel: string, userLevel: string): boolean => {
    // School level students can apply for school scholarships
    if (userLevel === 'School' && scholarshipLevel === 'School') return true;
    
    // UG students can apply for UG scholarships
    if (userLevel === 'UG' && scholarshipLevel === 'UG') return true;
    
    // PG students can apply for PG scholarships
    if (userLevel === 'PG' && scholarshipLevel === 'PG') return true;
    
    return false;
  };

  useEffect(() => {
    let results = eligibleScholarships.filter(scholarship =>
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter) {
      results = results.filter(scholarship => scholarship.category === categoryFilter);
    }

    if (levelFilter) {
      results = results.filter(scholarship => scholarship.level === levelFilter);
    }

    setFilteredScholarships(results);
  }, [searchTerm, categoryFilter, levelFilter, eligibleScholarships]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            {formData ? 'Your Eligible Scholarships' : 'Explore Scholarships'}
          </h1>
          <p className="text-gray-600">
            {formData 
              ? `Found ${eligibleScholarships.length} scholarships matching your profile.`
              : 'Find the perfect scholarship to fund your education.'
            }
          </p>
          {!formData && (
            <p className="text-sm text-orange-600 mt-2">
              Complete the eligibility check to see personalized results.
            </p>
          )}
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
              {formData 
                ? 'No scholarships found matching your eligibility criteria. Try adjusting the filters above.'
                : 'No scholarships found matching your criteria.'
              }
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default Results;

