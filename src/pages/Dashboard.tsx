import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, DollarSign, UserPlus, UserX, Award, Target, Heart } from 'lucide-react';
import { dataService } from '@/services/dataService';

const Dashboard = () => {
  const dashboardMetrics = dataService.getDashboardMetrics();
  const newHiresExitsData = dataService.getNewHiresExitsData();
  const internsByDepartmentData = dataService.getInternsByDepartmentData();
  const workingModeData = dataService.getWorkingModeData();
  const documentCompletionData = dataService.getDocumentCompletionData();
  const rewardsByDepartmentData = dataService.getRewardsByDepartmentData();
  const performanceTrendData = dataService.getPerformanceTrendData();

  const MetricCard = ({ title, value, icon: Icon, change, prefix = '', suffix = '' }: any) => (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{prefix}{value}{suffix}</div>
        {change && (
          <p className={`text-xs ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">HR Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your HR metrics and employee analytics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Employees"
          value={dashboardMetrics.totalEmployees}
          icon={Users}
          change={5.2}
        />
        <MetricCard
          title="Total Interns"
          value={dashboardMetrics.totalInterns}
          icon={UserPlus}
          change={12.5}
        />
        <MetricCard
          title="Total Payroll Cost"
          value={dashboardMetrics.totalPayrollCost.toLocaleString()}
          icon={DollarSign}
          prefix="₹"
          change={8.1}
        />
        <MetricCard
          title="New Hires This Month"
          value={dashboardMetrics.newHiresThisMonth}
          icon={TrendingUp}
          change={-2.3}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Women Employees Ratio"
          value={(dashboardMetrics.womenEmployeesRatio * 100).toFixed(0)}
          icon={Users}
          suffix="%"
          change={1.2}
        />
        <MetricCard
          title="Training Completion"
          value={(dashboardMetrics.completedTrainingRatio * 100).toFixed(0)}
          icon={Award}
          suffix="%"
          change={6.8}
        />
        <MetricCard
          title="Employee Satisfaction"
          value={(dashboardMetrics.employeeSatisfactionRatio * 100).toFixed(0)}
          icon={Heart}
          suffix="%"
          change={3.1}
        />
        <MetricCard
          title="Terminations This Month"
          value={dashboardMetrics.terminationsThisMonth}
          icon={UserX}
          change={-15.2}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* New Hires vs Exits */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>New Hires vs Exits Over Time</CardTitle>
            <CardDescription>Monthly hiring and termination trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={newHiresExitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="hires" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="New Hires"
                />
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

        {/* Interns by Department */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Interns by Department</CardTitle>
            <CardDescription>Distribution of interns across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={internsByDepartmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Working Mode Breakdown */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Working Mode Breakdown</CardTitle>
            <CardDescription>Employee working preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workingModeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {workingModeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Document Completion Rate */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Document Completion Rate</CardTitle>
            <CardDescription>Status of document processing</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {documentCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rewards by Department */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Rewards by Department</CardTitle>
            <CardDescription>Recognition distribution across teams</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rewardsByDepartmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rewards" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Trend */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Performance Trend Analysis</CardTitle>
            <CardDescription>Week-over-week performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceTrendData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Week 1"
                  dataKey="week1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Week 4"
                  dataKey="week4"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.1}
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;