import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import { dataService } from '@/services/dataService';

const LeaveAttendance = () => {
  const employees = dataService.getActiveEmployees();
  const attendanceTrendData = dataService.getAttendanceTrendData();

  const getWorkingModeColor = (mode: string) => {
    switch (mode) {
      case 'Remote':
        return 'bg-blue-100 text-blue-800';
      case 'Hybrid':
        return 'bg-purple-100 text-purple-800';
      case 'On-site':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceStatus = (hours: number) => {
    if (hours >= 160) return { status: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (hours >= 140) return { status: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (hours >= 120) return { status: 'Average', color: 'bg-slate-100 text-slate-800' };
    return { status: 'Needs Attention', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Leave & Attendance Management</h1>
        <p className="text-muted-foreground">
          Track employee attendance, working hours, and leave management
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(employees.reduce((sum, emp) => sum + emp.hoursCompleted, 0) / employees.length)}
            </div>
            <p className="text-xs text-muted-foreground">Hours per employee</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leave Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employees.reduce((sum, emp) => sum + emp.leaveDays, 0)}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <p className="text-xs text-green-600">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Trend Chart */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Monthly Attendance Trend</CardTitle>
          <CardDescription>Attendance percentage and leave days over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={attendanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Attendance %"
              />
              <Line 
                type="monotone" 
                dataKey="leaves" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Leave Days"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Employee Attendance Overview</CardTitle>
          <CardDescription>Detailed view of individual employee attendance and working hours</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Working Mode</TableHead>
                <TableHead>Hours Completed</TableHead>
                <TableHead>Leave Days</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => {
                const attendanceStatus = getAttendanceStatus(employee.hoursCompleted);
                return (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <Badge className={getWorkingModeColor(employee.workingMode)}>
                        {employee.workingMode}
                      </Badge>
                    </TableCell>
                    <TableCell>{employee.hoursCompleted}h</TableCell>
                    <TableCell>{employee.leaveDays}</TableCell>
                    <TableCell>
                      <Badge className={attendanceStatus.color}>
                        {attendanceStatus.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveAttendance;