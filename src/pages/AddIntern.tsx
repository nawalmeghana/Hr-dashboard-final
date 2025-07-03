import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserPlus, Download, Search, Filter, ExternalLink, Users, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { dataService } from '@/services/dataService';

const AddIntern = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const employees = dataService.getActiveEmployees();

  // Department distribution data
  const departmentData = employees.reduce((acc, intern) => {
    acc[intern.department] = (acc[intern.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentChartData = Object.entries(departmentData).map(([department, count]) => ({
    department,
    count
  }));

  // Location distribution data
  const locationData = employees.reduce((acc, intern) => {
    const city = intern.location.split(',')[0];
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const locationChartData = Object.entries(locationData).map(([location, count]) => ({
    name: location,
    value: count,
    fill: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)]
  }));

  // T-shirt size distribution
  const tShirtData = employees.reduce((acc, intern) => {
    acc[intern.tShirtSize] = (acc[intern.tShirtSize] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tShirtChartData = Object.entries(tShirtData).map(([size, count]) => ({
    size,
    count
  }));

  // Filter data
  const filteredData = employees.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || intern.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = ['all', ...Array.from(new Set(employees.map(intern => intern.department)))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportToSheets = () => {
    toast.success('Data exported to Google Sheets successfully!');
  };

  const handleSyncFromSheets = () => {
    toast.success('Data synced from Google Sheets successfully!');
  };

  const handleAddIntern = () => {
    toast.success('New intern added successfully!');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Add Intern & Database Management</h1>
        <p className="text-muted-foreground">
          Manage intern database with Google Sheets integration and comprehensive tracking
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interns</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">In database</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Interns</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employees.filter(intern => intern.status === 'Active').length}
            </div>
            <p className="text-xs text-green-600">Currently working</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(departmentData).length}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(locationData).length}</div>
            <p className="text-xs text-muted-foreground">Different cities</p>
          </CardContent>
        </Card>
      </div>

      {/* Google Sheets Integration */}
      <Card className="card-hover border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-blue-600" />
            Google Sheets Integration
          </CardTitle>
          <CardDescription>
            Automatically sync intern data from Google Forms and Google Sheets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleSyncFromSheets} className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Sync from Google Sheets
            </Button>
            <Button variant="outline" onClick={handleExportToSheets}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Export to Google Sheets
            </Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Google Form
            </Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Google Sheet
            </Button>
          </div>
          <div className="mt-4 p-4 bg-white border rounded-lg">
            <h4 className="font-medium mb-2">Integration Status</h4>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Connected to Google Sheets API
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last sync: 2 minutes ago • Next auto-sync in 58 minutes
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Department Distribution */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Interns by Department</CardTitle>
            <CardDescription>Distribution across different teams</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={departmentChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location Distribution */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Intern locations across cities</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={locationChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {locationChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* T-Shirt Size Distribution */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>T-Shirt Size Distribution</CardTitle>
            <CardDescription>For merchandise planning</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={tShirtChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="size" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Intern Database</CardTitle>
          <CardDescription>Search, filter, and manage intern information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or college..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Intern
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Intern</DialogTitle>
                  <DialogDescription>
                    Add a new intern to the database manually
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Content">Content</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" placeholder="Enter role" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <Input id="college" placeholder="Enter college name" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddIntern}>Add Intern</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Intern Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>T-Shirt</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((intern) => (
                  <TableRow key={intern.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{intern.name}</div>
                        <div className="text-xs text-muted-foreground">{intern.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{intern.department}</TableCell>
                    <TableCell>{intern.role}</TableCell>
                    <TableCell>{intern.contactNumber}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{intern.college}</div>
                        <div className="text-xs text-muted-foreground">{intern.degree}</div>
                      </div>
                    </TableCell>
                    <TableCell>{intern.location}</TableCell>
                    <TableCell>{new Date(intern.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{intern.tShirtSize}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(intern.status)}>
                        {intern.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No interns found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddIntern;