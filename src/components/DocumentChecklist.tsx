
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
  completed: boolean;
  dueDate?: string;
}

const DocumentChecklist = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: '1',
      name: 'Academic Transcripts',
      description: 'Official transcripts from all educational institutions',
      required: true,
      completed: true,
    },
    {
      id: '2',
      name: 'Personal Statement',
      description: 'Essay describing your goals and achievements',
      required: true,
      completed: false,
      dueDate: '2024-03-01',
    },
    {
      id: '3',
      name: 'Letters of Recommendation',
      description: 'Two letters from academic or professional references',
      required: true,
      completed: false,
      dueDate: '2024-02-25',
    },
    {
      id: '4',
      name: 'Financial Aid Forms',
      description: 'FAFSA or other financial documentation',
      required: true,
      completed: false,
    },
    {
      id: '5',
      name: 'Resume/CV',
      description: 'Current resume highlighting achievements',
      required: false,
      completed: true,
    },
    {
      id: '6',
      name: 'Portfolio',
      description: 'Work samples or creative portfolio',
      required: false,
      completed: false,
    },
  ]);

  const toggleDocument = (id: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === id ? { ...doc, completed: !doc.completed } : doc
      )
    );
  };

  const completedCount = documents.filter(doc => doc.completed).length;
  const requiredCount = documents.filter(doc => doc.required).length;
  const completedRequired = documents.filter(doc => doc.required && doc.completed).length;
  const progressPercentage = (completedCount / documents.length) * 100;

  const getDaysUntilDue = (dueDate?: string) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Checklist
        </CardTitle>
        <CardDescription>
          Track your required documents and submission progress
        </CardDescription>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{completedCount} of {documents.length} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Required: {completedRequired}/{requiredCount}</span>
            <span>Optional: {completedCount - completedRequired}/{documents.length - requiredCount}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => {
            const daysUntilDue = getDaysUntilDue(doc.dueDate);
            const isOverdue = daysUntilDue !== null && daysUntilDue < 0;
            const isDueSoon = daysUntilDue !== null && daysUntilDue <= 3 && daysUntilDue >= 0;

            return (
              <div key={doc.id} className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={doc.completed}
                    onCheckedChange={() => toggleDocument(doc.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-medium ${doc.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {doc.name}
                        </h3>
                        {doc.required && (
                          <Badge variant="secondary" className="text-xs">
                            Required
                          </Badge>
                        )}
                        {doc.completed && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {doc.dueDate && (
                          <Badge 
                            variant={isOverdue ? 'destructive' : isDueSoon ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {isOverdue ? (
                              <>
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Overdue
                              </>
                            ) : isDueSoon ? (
                              <>
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Due in {daysUntilDue} days
                              </>
                            ) : (
                              `Due ${new Date(doc.dueDate).toLocaleDateString()}`
                            )}
                          </Badge>
                        )}
                        
                        {!doc.completed && (
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3 mr-1" />
                            Upload
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {completedRequired === requiredCount ? (
                <span className="text-green-600 font-medium">
                  ✓ All required documents completed
                </span>
              ) : (
                <span>
                  {requiredCount - completedRequired} required documents remaining
                </span>
              )}
            </div>
            <Button>
              Submit Application
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentChecklist;
