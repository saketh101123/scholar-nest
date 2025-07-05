

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
      
      // Check specific requirements from scholarship data
      if (scholarship.requirements) {
        const req = scholarship.requirements;
        
        // Check gender requirements
        if (req.gender && req.gender !== userData.gender) {
          console.log(`${scholarship.name} - Failed gender requirement: needs ${req.gender}, user is ${userData.gender}`);
          return false;
        }
        
        // Check caste requirements
        if (req.caste) {
          if (Array.isArray(req.caste)) {
            if (!req.caste.includes(userData.caste)) {
              console.log(`${scholarship.name} - Failed caste requirement: needs ${req.caste.join(' or ')}, user is ${userData.caste}`);
              return false;
            }
          } else if (req.caste !== userData.caste) {
            console.log(`${scholarship.name} - Failed caste requirement: needs ${req.caste}, user is ${userData.caste}`);
            return false;
          }
        }
        
        // Check religion requirements
        if (req.religion) {
          if (Array.isArray(req.religion)) {
            if (!req.religion.includes(userData.religion)) {
              console.log(`${scholarship.name} - Failed religion requirement: needs ${req.religion.join(' or ')}, user is ${userData.religion}`);
              return false;
            }
          } else if (req.religion !== userData.religion) {
            console.log(`${scholarship.name} - Failed religion requirement: needs ${req.religion}, user is ${userData.religion}`);
            return false;
          }
        }
        
        // Check family income requirements
        if (req.income && userData.familyIncome > Number(req.income)) {
          console.log(`${scholarship.name} - Failed income requirement: max ${req.income}, user has ${userData.familyIncome}`);
          return false;
        }
        
        // Check percentage requirements
        if (req.percentage && userData.percentage < req.percentage) {
          console.log(`${scholarship.name} - Failed percentage requirement: needs ${req.percentage}%, user has ${userData.percentage}%`);
          return false;
        }
        
        // Check age requirements
        if (req.age && userData.age > req.age) {
          console.log(`${scholarship.name} - Failed age requirement: max age ${req.age}, user is ${userData.age}`);
          return false;
        }
        
        // Check disability requirements
        if (req.disability && (!userData.hasDisability || userData.disabilityPercentage < req.disability)) {
          console.log(`${scholarship.name} - Failed disability requirement: needs ${req.disability}% disability, user has ${userData.disabilityPercentage}%`);
          return false;
        }
        
        // Check family status requirements
        if (req.family_status && req.family_status !== userData.familyStatus) {
          console.log(`${scholarship.name} - Failed family status requirement: needs ${req.family_status}, user has ${userData.familyStatus}`);
          return false;
        }
        
        // Check course type requirements
        if (req.course_type && req.course_type !== userData.courseType) {
          console.log(`${scholarship.name} - Failed course type requirement: needs ${req.course_type}, user has ${userData.courseType}`);
          return false;
        }
        
        // Check class-specific requirements
        if (req.class) {
          if (req.class.includes('-')) {
            // Range like "9-10" or "1-10"
            const [start, end] = req.class.split('-');
            const userClassNum = parseInt(userData.currentClass);
            if (userClassNum >= parseInt(start) && userClassNum <= parseInt(end)) {
              // User is in range
            } else if (userData.currentClass === 'UG' && req.class.includes('UG')) {
              // UG is acceptable
            } else if (userData.currentClass === 'PG' && req.class.includes('PG')) {
              // PG is acceptable
            } else {
              console.log(`${scholarship.name} - Failed class requirement: needs ${req.class}, user is in ${userData.currentClass}`);
              return false;
            }
          } else if (req.class !== userData.currentClass) {
            console.log(`${scholarship.name} - Failed class requirement: needs ${req.class}, user is in ${userData.currentClass}`);
            return false;
          }
        }
      }
      
      // Category-based checks (fallback for scholarships without specific requirements)
      if (scholarship.category === 'Women' && userData.gender !== 'female') {
        console.log(`${scholarship.name} - Failed Women category check`);
        return false;
      }
      
      if (scholarship.category === 'SC' && userData.caste !== 'SC') {
        console.log(`${scholarship.name} - Failed SC category check`);
        return false;
      }
      
      if (scholarship.category === 'ST' && userData.caste !== 'ST') {
        console.log(`${scholarship.name} - Failed ST category check`);
        return false;
      }
      
      if (scholarship.category === 'OBC' && userData.caste !== 'OBC') {
        console.log(`${scholarship.name} - Failed OBC category check`);
        return false;
      }
      
      if (scholarship.category === 'Minority' && !['Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Parsi'].includes(userData.religion)) {
        console.log(`${scholarship.name} - Failed Minority category check`);
        return false;
      }
      
      if (scholarship.category === 'SC/ST/OBC' && !['SC', 'ST', 'OBC'].includes(userData.caste)) {
        console.log(`${scholarship.name} - Failed SC/ST/OBC category check`);
        return false;
      }
      
      // Check education level eligibility
      const userLevel = getUserEducationLevel(userData.currentClass);
      if (!isEducationLevelEligible(scholarship.level, userLevel, userData.currentClass)) {
        console.log(`${scholarship.name} - Failed education level check`);
        return false;
      }
      
      // General income check for scholarships without specific income requirements
      if (!scholarship.requirements?.income && userData.familyIncome > 800000) {
        // For high income families, only allow General category scholarships
        if (!['General', 'All'].includes(scholarship.category)) {
          console.log(`${scholarship.name} - Failed general income check for non-General category`);
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

  const isEducationLevelEligible = (scholarshipLevel: string, userLevel: string, currentClass: string): boolean => {
    // Handle "All" level scholarships
    if (scholarshipLevel === 'All') return true;
    
    // Handle combined levels like "UG/PG", "School/UG/PG", etc.
    if (scholarshipLevel.includes('/')) {
      const levels = scholarshipLevel.split('/');
      for (const level of levels) {
        if (level.trim() === userLevel) return true;
        if (level.trim() === 'UG (Technical)' && userLevel === 'UG') return true;
        if (level.trim() === 'PG (Abroad)' && userLevel === 'PG') return true;
      }
    }
    
    // Direct level match
    if (scholarshipLevel === userLevel) return true;
    
    // Handle technical course variants
    if (scholarshipLevel === 'UG (Technical)' && userLevel === 'UG') return true;
    if (scholarshipLevel === 'PG (Abroad)' && userLevel === 'PG') return true;
    
    // Handle PhD level
    if (scholarshipLevel.includes('PhD') && currentClass === 'PhD') return true;
    
    // Handle specific class ranges in scholarship levels
    if (scholarshipLevel.includes('School') && userLevel === 'School') return true;
    
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
              <SelectItem value="OBC">OBC</SelectItem>
              <SelectItem value="Minority">Minority</SelectItem>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="All">All</SelectItem>
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

