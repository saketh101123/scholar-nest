
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  description: string;
  eligibility: string;
  category: string;
  level: string;
  application_deadline: string;
  official_website: string;
  requirements?: any;
}

const AdminScholarships = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    amount: '',
    description: '',
    eligibility: '',
    category: '',
    level: '',
    application_deadline: '',
    official_website: '',
    requirements: ''
  });

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScholarships(data || []);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      toast({
        title: "Error",
        description: "Failed to fetch scholarships",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const scholarshipData = {
        ...formData,
        requirements: formData.requirements ? JSON.parse(formData.requirements) : null
      };

      if (editingScholarship) {
        const { error } = await supabase
          .from('scholarships')
          .update(scholarshipData)
          .eq('id', editingScholarship.id);

        if (error) throw error;

        await logAdminAction('UPDATE', 'scholarships', editingScholarship.id, scholarshipData);
        
        toast({
          title: "Success",
          description: "Scholarship updated successfully",
        });
      } else {
        const { data, error } = await supabase
          .from('scholarships')
          .insert([scholarshipData])
          .select()
          .single();

        if (error) throw error;

        await logAdminAction('CREATE', 'scholarships', data.id, scholarshipData);
        
        toast({
          title: "Success",
          description: "Scholarship created successfully",
        });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchScholarships();
    } catch (error) {
      console.error('Error saving scholarship:', error);
      toast({
        title: "Error",
        description: "Failed to save scholarship",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scholarship?')) return;

    try {
      const { error } = await supabase
        .from('scholarships')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await logAdminAction('DELETE', 'scholarships', id);
      
      toast({
        title: "Success",
        description: "Scholarship deleted successfully",
      });
      
      fetchScholarships();
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      toast({
        title: "Error",
        description: "Failed to delete scholarship",
        variant: "destructive",
      });
    }
  };

  const logAdminAction = async (action: string, targetTable: string, targetId?: string, details?: any) => {
    try {
      await supabase.from('admin_logs').insert([{
        admin_id: (await supabase.auth.getUser()).data.user?.id,
        action,
        target_table: targetTable,
        target_id: targetId,
        details
      }]);
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      provider: '',
      amount: '',
      description: '',
      eligibility: '',
      category: '',
      level: '',
      application_deadline: '',
      official_website: '',
      requirements: ''
    });
    setEditingScholarship(null);
  };

  const handleEdit = (scholarship: Scholarship) => {
    setEditingScholarship(scholarship);
    setFormData({
      name: scholarship.name,
      provider: scholarship.provider,
      amount: scholarship.amount,
      description: scholarship.description,
      eligibility: scholarship.eligibility,
      category: scholarship.category,
      level: scholarship.level,
      application_deadline: scholarship.application_deadline,
      official_website: scholarship.official_website,
      requirements: scholarship.requirements ? JSON.stringify(scholarship.requirements, null, 2) : ''
    });
    setIsDialogOpen(true);
  };

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Loading scholarships...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scholarship Management</CardTitle>
              <CardDescription>
                Create, edit, and manage scholarships in the system
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Scholarship
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="provider">Provider *</Label>
                      <Input
                        id="provider"
                        value={formData.provider}
                        onChange={(e) => setFormData({...formData, provider: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Amount *</Label>
                      <Input
                        id="amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="level">Level *</Label>
                      <Input
                        id="level"
                        value={formData.level}
                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="application_deadline">Application Deadline *</Label>
                      <Input
                        id="application_deadline"
                        value={formData.application_deadline}
                        onChange={(e) => setFormData({...formData, application_deadline: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="official_website">Official Website *</Label>
                    <Input
                      id="official_website"
                      type="url"
                      value={formData.official_website}
                      onChange={(e) => setFormData({...formData, official_website: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="eligibility">Eligibility *</Label>
                    <Textarea
                      id="eligibility"
                      value={formData.eligibility}
                      onChange={(e) => setFormData({...formData, eligibility: e.target.value})}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="requirements">Requirements (JSON format)</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                      rows={4}
                      placeholder='{"documents": ["transcript", "essay"], "gpa": 3.5}'
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingScholarship ? 'Update' : 'Create'} Scholarship
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredScholarships.map((scholarship) => (
              <Card key={scholarship.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{scholarship.name}</h3>
                      <p className="text-muted-foreground">{scholarship.provider}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{scholarship.category}</Badge>
                        <Badge variant="outline">{scholarship.level}</Badge>
                        <Badge>{scholarship.amount}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Deadline: {scholarship.application_deadline}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(scholarship)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(scholarship.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminScholarships;
