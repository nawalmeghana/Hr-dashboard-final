import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Heart, Award, Linkedin, Instagram, Star, TrendingUp } from 'lucide-react';
import { dataService } from '@/services/dataService';

const EmployeeEngagement = () => {
  const engagementData = dataService.getEngagementData();

  // Engagement metrics by department
  const departmentEngagement = engagementData.reduce((acc, emp) => {
    const dept = emp.department;
    if (!acc[dept]) {
      acc[dept] = { department: dept, totalScore: 0, employees: 0, totalRewards: 0 };
    }
    acc[dept].totalScore += emp.engagementScore;
    acc[dept].employees += 1;
    acc[dept].totalRewards += emp.rewardsEarned;
    return acc;
  }, {} as Record<string, any>);

  const departmentData = Object.values(departmentEngagement).map(dept => ({
    ...dept,
    averageScore: Math.round(dept.totalScore / dept.employees)
  }));

  // Social media engagement data
  const socialMediaData = [
    { platform: 'LinkedIn Posts', count: engagementData.reduce((sum, emp) => sum + emp.linkedinPosts, 0) },
    { platform: 'LinkedIn Follows', count: engagementData.reduce((sum, emp) => sum + emp.linkedinFollows, 0) },
    { platform: 'Instagram Follows', count: engagementData.reduce((sum, emp) => sum + emp.instagramFollows, 0) },
    { platform: 'Google Reviews', count: engagementData.reduce((sum, emp) => sum + emp.googleReviews, 0) },
  ];

  const engagementLevels = [
    { name: 'High (80+)', value: engagementData.filter(emp => emp.engagementScore >= 80).length, fill: '#10b981' },
    { name: 'Medium (60-79)', value: engagementData.filter(emp => emp.engagementScore >= 60 && emp.engagementScore < 80).length, fill: '#3b82f6' },
    { name: 'Low (<60)', value: engagementData.filter(emp => emp.engagementScore < 60).length, fill: '#ef4444' },
  ];

  const getEngagementLevel = (score: number) => {
    if (score >= 80) return { level: 'High', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { level: 'Medium', color: 'bg-blue-100 text-blue-800' };
    return { level: 'Low', color: 'bg-red-100 text-red-800' };
  };

  const averageEngagement = Math.round(
    engagementData.reduce((sum, emp) => sum + emp.engagementScore, 0) / engagementData.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Employee Engagement, Wellbeing & Networking</h1>
        <p className="text-muted-foreground">
          Track employee engagement through social media, rewards, and recognition programs
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageEngagement}%</div>
            <Progress value={averageEngagement} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {engagementData.reduce((sum, emp) => sum + emp.rewardsEarned, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all employees</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LinkedIn Posts</CardTitle>
            <Linkedin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {engagementData.reduce((sum, emp) => sum + emp.linkedinPosts, 0)}
            </div>
            <p className="text-xs text-green-600">+15% this month</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Google Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {engagementData.reduce((sum, emp) => sum + emp.googleReviews, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Company reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Department Engagement Chart */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Engagement by Department</CardTitle>
            <CardDescription>Average engagement scores across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageScore" fill="#3b82f6" name="Avg Engagement Score" />
                <Bar dataKey="totalRewards" fill="#10b981" name="Total Rewards" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Levels Pie Chart */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Engagement Level Distribution</CardTitle>
            <CardDescription>Employee distribution by engagement score</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementLevels}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementLevels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Social Media Engagement */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Social Media Engagement</CardTitle>
            <CardDescription>Employee participation across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={socialMediaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Employees with highest engagement scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engagementData
                .sort((a, b) => b.engagementScore - a.engagementScore)
                .slice(0, 3)
                .map((employee, index) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{employee.name}</h4>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">{employee.engagementScore}%</div>
                      <p className="text-xs text-muted-foreground">{employee.rewardsEarned} rewards</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Employee Engagement Table */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Employee Engagement Details</CardTitle>
          <CardDescription>Comprehensive view of individual employee engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>LinkedIn Posts</TableHead>
                <TableHead>Social Follows</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Engagement Score</TableHead>
                <TableHead>Rewards</TableHead>
                <TableHead>Recognition</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {engagementData.map((employee) => {
                const engagementLevel = getEngagementLevel(employee.engagementScore);
                return (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Linkedin className="h-4 w-4 text-blue-600" />
                        {employee.linkedinPosts}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Linkedin className="h-3 w-3 text-blue-600" />
                          {employee.linkedinFollows}
                        </div>
                        <div className="flex items-center gap-1">
                          <Instagram className="h-3 w-3 text-pink-600" />
                          {employee.instagramFollows}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-blue-500" />
                        {employee.googleReviews}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{employee.engagementScore}%</span>
                        <Badge className={engagementLevel.color}>
                          {engagementLevel.level}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-blue-600" />
                        {employee.rewardsEarned}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {employee.recognitionBadges.map((badge, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
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

export default EmployeeEngagement;