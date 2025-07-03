import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, UserCheck, Clock, Settings, ExternalLink, TrendingUp } from 'lucide-react';
import { dataService } from '@/services/dataService';

const AtsAmsEssEms = () => {
  const atsData = dataService.getATSApplications();
  const amsData = dataService.getAMSData();
  const employees = dataService.getActiveEmployees();

  const essOptions = [
    { title: 'Update Personal Information', description: 'Update contact details, address, emergency contacts' },
    { title: 'Request Leave', description: 'Submit leave applications and view leave balance' },
    { title: 'Download Payslips', description: 'Access and download monthly payslips' },
    { title: 'Training Enrollment', description: 'Enroll in available training programs' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hired':
        return 'bg-green-100 text-green-800';
      case 'Interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'Not Hired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">ATS, AMS, ESS & EMS</h1>
        <p className="text-muted-foreground">
          Integrated systems for applicant tracking, attendance, employee self-service, and management
        </p>
      </div>

      {/* System Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ATS Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{atsData.length}</div>
            <p className="text-xs text-muted-foreground">Total applications</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AMS Active Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {amsData.reduce((sum, dept) => sum + dept.presentToday, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Employees present</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ESS Services</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{essOptions.length}</div>
            <p className="text-xs text-muted-foreground">Available services</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EMS Profiles</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">Managed employees</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* ATS - Applicant Tracking System */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Applicant Tracking System (ATS)
            </CardTitle>
            <CardDescription>Track hiring status and candidate progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atsData.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.candidate}</TableCell>
                    <TableCell>{application.position}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* AMS - Attendance Management System */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Attendance Management System (AMS)
            </CardTitle>
            <CardDescription>Department-wise attendance summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {amsData.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{dept.department}</h4>
                    <p className="text-sm text-muted-foreground">
                      {dept.presentToday} of {dept.totalEmployees} present
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{dept.attendanceRate}%</div>
                    <p className="text-xs text-muted-foreground">Attendance rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ESS - Employee Self Service */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Employee Self-Service (ESS)
            </CardTitle>
            <CardDescription>Self-service portal for employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {essOptions.map((option, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium">{option.title}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* EMS - Employee Management System */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Employee Management System (EMS)
            </CardTitle>
            <CardDescription>Overview of employee management metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
                  <p className="text-sm text-muted-foreground">Total Employees</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {employees.filter(emp => emp.role.includes('Intern')).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Active Interns</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {employees.filter(emp => {
                      const startDate = new Date(emp.startDate);
                      const currentMonth = new Date().getMonth();
                      return startDate.getMonth() === currentMonth;
                    }).length}
                  </div>
                  <p className="text-sm text-muted-foreground">New This Month</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">91%</div>
                  <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AtsAmsEssEms;