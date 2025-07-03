import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Clock, Calendar, TrendingUp, FileText } from 'lucide-react';
import { dataService } from '@/services/dataService';

const Timesheets = () => {
  const timesheetData = dataService.getTimesheets();

  // Department-wise hours summary
  const departmentSummary = timesheetData.reduce((acc, timesheet) => {
    const dept = timesheet.department;
    if (!acc[dept]) {
      acc[dept] = { department: dept, totalHours: 0, employees: 0 };
    }
    acc[dept].totalHours += timesheet.totalHours;
    acc[dept].employees += 1;
    return acc;
  }, {} as Record<string, any>);

  const departmentData = Object.values(departmentSummary);

  const getHoursStatus = (hours: number) => {
    if (hours >= 40) return { status: 'Full Time', color: 'bg-green-100 text-green-800' };
    if (hours >= 30) return { status: 'Part Time', color: 'bg-blue-100 text-blue-800' };
    return { status: 'Under Hours', color: 'bg-slate-100 text-slate-800' };
  };

  const totalHours = timesheetData.reduce((sum, timesheet) => sum + timesheet.totalHours, 0);
  const averageHours = Math.round(totalHours / timesheetData.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Timesheet Management</h1>
        <p className="text-muted-foreground">
          Track employee working hours and generate timesheet reports
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Hours</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageHours}h</div>
            <p className="text-xs text-muted-foreground">Per employee</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timesheetData.length}</div>
            <p className="text-xs text-muted-foreground">Submitted timesheets</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-green-600">All timesheets submitted</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Hours Chart */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Hours by Department</CardTitle>
          <CardDescription>Total working hours across different departments</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalHours" fill="#3b82f6" name="Total Hours" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Timesheet Table */}
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Weekly Timesheet Summary</CardTitle>
            <CardDescription>Detailed breakdown of employee working hours</CardDescription>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Timesheets
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Week</TableHead>
                <TableHead>Mon</TableHead>
                <TableHead>Tue</TableHead>
                <TableHead>Wed</TableHead>
                <TableHead>Thu</TableHead>
                <TableHead>Fri</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timesheetData.map((timesheet) => {
                const hoursStatus = getHoursStatus(timesheet.totalHours);
                return (
                  <TableRow key={timesheet.id}>
                    <TableCell className="font-medium">{timesheet.internName}</TableCell>
                    <TableCell>{timesheet.department}</TableCell>
                    <TableCell>{timesheet.week}</TableCell>
                    <TableCell>{timesheet.mondayHours}h</TableCell>
                    <TableCell>{timesheet.tuesdayHours}h</TableCell>
                    <TableCell>{timesheet.wednesdayHours}h</TableCell>
                    <TableCell>{timesheet.thursdayHours}h</TableCell>
                    <TableCell>{timesheet.fridayHours}h</TableCell>
                    <TableCell className="font-bold">{timesheet.totalHours}h</TableCell>
                    <TableCell>
                      <Badge className={hoursStatus.color}>
                        {hoursStatus.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Export & Reports</CardTitle>
          <CardDescription>Generate timesheet reports in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Download className="h-5 w-5" />
              <span>Export to Excel</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>Generate PDF Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Monthly Summary</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timesheets;