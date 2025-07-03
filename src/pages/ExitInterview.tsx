import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { UserX, TrendingDown, AlertTriangle, FileText, Calendar, Users } from 'lucide-react';
import { dataService } from '@/services/dataService';

const ExitInterview = () => {
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>('all');
  
  const exitInterviews = dataService.getExitInterviews();
  const exitReasonsData = dataService.getExitReasonsData();
  const monthlyExitTrend = dataService.getMonthlyExitTrend();

  // Department-wise exit data
  const departmentExits = exitInterviews.reduce((acc, exit) => {
    acc[exit.department] = (acc[exit.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentExitData = Object.entries(departmentExits).map(([department, exits]) => ({
    department,
    exits
  }));

  // Filter data based on selected department
  const filteredExitData = selectedDepartment === 'all' 
    ? exitInterviews 
    : exitInterviews.filter(exit => exit.department === selectedDepartment);

  const getExitReasonColor = (reason: string) => {
    switch (reason) {
      case 'Career Growth':
        return 'bg-blue-100 text-blue-800';
      case 'Higher Studies':
        return 'bg-purple-100 text-purple-800';
      case 'Better Opportunity':
        return 'bg-green-100 text-green-800';
      case 'Personal Reasons':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const averageSatisfaction = Math.round(
    exitInterviews.reduce((sum, response) => sum + response.overallSatisfaction, 0) / exitInterviews.length
  );

  const departments = ['all', ...Array.from(new Set(exitInterviews.map(exit => exit.department)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Exit Interview Management</h1>
        <p className="text-muted-foreground">
          Track employee departures, analyze exit reasons, and gather feedback for improvement
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exits</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exitInterviews.length}</div>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {exitInterviews.filter(exit => new Date(exit.exitDate).getMonth() === new Date().getMonth()).length}
            </div>
            <p className="text-xs text-red-600">+3 from last month</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSatisfaction}/5</div>
            <p className="text-xs text-muted-foreground">Exit interview ratings</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Exit Reason</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Career Growth</div>
            <p className="text-xs text-muted-foreground">35% of exits</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Exit Reasons Breakdown */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Exit Reasons Distribution</CardTitle>
            <CardDescription>Breakdown of reasons for leaving the organization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={exitReasonsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {exitReasonsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Exit Trend */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Monthly Exit Trend</CardTitle>
            <CardDescription>Employee departure trend over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyExitTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="exits" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Exits"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department-wise Exits */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Exits by Department</CardTitle>
            <CardDescription>Distribution of exits across different departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentExitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="exits" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Exit Interview Satisfaction Scores */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Exit Interview Satisfaction Scores</CardTitle>
            <CardDescription>Average ratings across different aspects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { aspect: 'Overall Satisfaction', score: averageSatisfaction },
                { aspect: 'Work Environment', score: Math.round(exitInterviews.reduce((sum, r) => sum + r.workEnvironment, 0) / exitInterviews.length) },
                { aspect: 'Management Support', score: Math.round(exitInterviews.reduce((sum, r) => sum + r.managementSupport, 0) / exitInterviews.length) },
                { aspect: 'Career Development', score: Math.round(exitInterviews.reduce((sum, r) => sum + r.careerDevelopment, 0) / exitInterviews.length) },
                { aspect: 'Work-Life Balance', score: Math.round(exitInterviews.reduce((sum, r) => sum + r.workLifeBalance, 0) / exitInterviews.length) }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{item.aspect}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${getRatingColor(item.score)}`}>{item.score}/5</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${item.score >= 4 ? 'bg-green-500' : item.score >= 3 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${(item.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exit Interviews Table */}
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Exit Interview Records</CardTitle>
            <CardDescription>Complete list of employee exits and reasons</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40">
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
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Exit Date</TableHead>
                <TableHead>Exit Reason</TableHead>
                <TableHead>Overall Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExitData.map((exit) => (
                <TableRow key={exit.id}>
                  <TableCell className="font-medium">{exit.employeeName}</TableCell>
                  <TableCell>{exit.department}</TableCell>
                  <TableCell>{new Date(exit.exitDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getExitReasonColor(exit.exitReason)}>
                      {exit.exitReason}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getRatingColor(exit.overallSatisfaction)}`}>
                      {exit.overallSatisfaction}/5
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed Exit Interview Responses */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Exit Interview Detailed Responses</CardTitle>
          <CardDescription>Comprehensive feedback from departing employees</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Overall</TableHead>
                <TableHead>Work Env</TableHead>
                <TableHead>Management</TableHead>
                <TableHead>Career Dev</TableHead>
                <TableHead>Work-Life</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exitInterviews.map((response) => (
                <TableRow key={response.id}>
                  <TableCell className="font-medium">{response.employeeName}</TableCell>
                  <TableCell>
                    <span className={`font-bold ${getRatingColor(response.overallSatisfaction)}`}>
                      {response.overallSatisfaction}/5
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getRatingColor(response.workEnvironment)}`}>
                      {response.workEnvironment}/5
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getRatingColor(response.managementSupport)}`}>
                      {response.managementSupport}/5
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getRatingColor(response.careerDevelopment)}`}>
                      {response.careerDevelopment}/5
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getRatingColor(response.workLifeBalance)}`}>
                      {response.workLifeBalance}/5
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getRatingColor(response.recommendation)}`}>
                      {response.recommendation}/5
                    </span>
                  </TableCell>
                  <TableCell className="max-w-48 truncate">{response.feedback}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExitInterview;