import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
import { Target, TrendingUp, GraduationCap, Award, BookOpen, Users, Star } from 'lucide-react';
import { dataService } from '@/services/dataService';

const PmsTrpLms = () => {
  const performanceData = dataService.getPerformanceData();
  const learningData = dataService.getLearningData();
  const trainingPrograms = dataService.getTrainingPrograms();

  // Talent Review Process data
  const trpData = [
    { category: 'High Potential', count: 15, percentage: 35 },
    { category: 'Core Performers', count: 20, percentage: 47 },
    { category: 'Developing Talent', count: 8, percentage: 18 }
  ];

  const performanceProgressData = performanceData.map(emp => ({
    name: emp.internName.split(' ')[0],
    week1: emp.week1,
    week2: emp.week2,
    week3: emp.week3,
    week4: emp.week4
  }));

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 80) return { level: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 70) return { level: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { level: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  const averagePerformance = Math.round(
    performanceData.reduce((sum, emp) => sum + emp.week4, 0) / performanceData.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">PMS, TRP & LMS</h1>
        <p className="text-muted-foreground">
          Performance Management, Talent Review Process & Learning Management System
        </p>
      </div>

      <Tabs defaultValue="pms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pms" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Performance Management
          </TabsTrigger>
          <TabsTrigger value="trp" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Talent Review Process
          </TabsTrigger>
          <TabsTrigger value="lms" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Learning Management
          </TabsTrigger>
        </TabsList>

        {/* Performance Management System */}
        <TabsContent value="pms" className="space-y-6">
          {/* PMS Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averagePerformance}%</div>
                <Progress value={averagePerformance} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceData.filter(emp => emp.week4 >= 90).length}
                </div>
                <p className="text-xs text-muted-foreground">Excellence rating</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-xs text-green-600">From week 1 to week 4</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hire Recommendations</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceData.filter(emp => emp.finalRecommendation.includes('recommend')).length}
                </div>
                <p className="text-xs text-muted-foreground">Ready for full-time</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Progress Chart */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Performance Progress Tracking</CardTitle>
              <CardDescription>Week-over-week performance improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="week1" stroke="#ef4444" strokeWidth={2} name="Week 1" />
                  <Line type="monotone" dataKey="week2" stroke="#f59e0b" strokeWidth={2} name="Week 2" />
                  <Line type="monotone" dataKey="week3" stroke="#3b82f6" strokeWidth={2} name="Week 3" />
                  <Line type="monotone" dataKey="week4" stroke="#10b981" strokeWidth={2} name="Week 4" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Details Table */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Performance Management Details</CardTitle>
              <CardDescription>Comprehensive performance evaluation and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Intern</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Week 1-4 Progress</TableHead>
                    <TableHead>Current Score</TableHead>
                    <TableHead>KPIs</TableHead>
                    <TableHead>Improvement Areas</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((performance) => {
                    const currentLevel = getPerformanceLevel(performance.week4);
                    return (
                      <TableRow key={performance.id}>
                        <TableCell className="font-medium">{performance.internName}</TableCell>
                        <TableCell>{performance.department}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">{performance.week1}</span>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{performance.week2}</span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{performance.week3}</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{performance.week4}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={currentLevel.color}>
                            {performance.week4}% - {currentLevel.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-32 truncate">{performance.kpis}</TableCell>
                        <TableCell className="max-w-32 truncate">{performance.improvementAreas}</TableCell>
                        <TableCell className="max-w-48 truncate">{performance.finalRecommendation}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Talent Review Process */}
        <TabsContent value="trp" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Talent Distribution */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Talent Distribution</CardTitle>
                <CardDescription>Employee categorization based on performance and potential</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trpData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Talent Review Actions */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Talent Review Actions</CardTitle>
                <CardDescription>Recommended actions for talent development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trpData.map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{category.category}</h4>
                        <Badge variant="outline">{category.count} employees</Badge>
                      </div>
                      <Progress value={category.percentage} className="mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {category.category === 'High Potential' && 'Fast-track for leadership roles and challenging projects'}
                        {category.category === 'Core Performers' && 'Maintain engagement and provide growth opportunities'}
                        {category.category === 'Developing Talent' && 'Focus on skill development and mentoring'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Succession Planning */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Succession Planning & Leadership Pipeline</CardTitle>
              <CardDescription>Future leaders and their readiness levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 border rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">Ready Now</h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                  <p className="text-sm text-muted-foreground">Candidates ready for immediate promotion</p>
                </div>
                <div className="p-6 border rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">Ready in 1-2 Years</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
                  <p className="text-sm text-muted-foreground">High potential with development needed</p>
                </div>
                <div className="p-6 border rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">Future Potential</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                  <p className="text-sm text-muted-foreground">Emerging talents to watch</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Management System */}
        <TabsContent value="lms" className="space-y-6">
          {/* LMS Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Completion Rate</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(learningData.reduce((sum, emp) => sum + emp.completionRate, 0) / learningData.length)}%
                </div>
                <Progress value={Math.round(learningData.reduce((sum, emp) => sum + emp.completionRate, 0) / learningData.length)} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Training Hours</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {learningData.reduce((sum, emp) => sum + emp.trainingHours, 0)}h
                </div>
                <p className="text-xs text-muted-foreground">Across all employees</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certifications Earned</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {learningData.reduce((sum, emp) => sum + emp.certificationsEarned, 0)}
                </div>
                <p className="text-xs text-green-600">+25% this quarter</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{learningData.length}</div>
                <p className="text-xs text-muted-foreground">Currently enrolled</p>
              </CardContent>
            </Card>
          </div>

          {/* Learning Progress Chart */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Learning Progress by Employee</CardTitle>
              <CardDescription>Course completion rates and training hours</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={learningData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="internName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="coursesCompleted" fill="#3b82f6" name="Courses Completed" />
                  <Bar dataKey="certificationsEarned" fill="#10b981" name="Certifications" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* LMS Details Table */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Learning Management Details</CardTitle>
              <CardDescription>Individual learning progress and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Courses Enrolled</TableHead>
                    <TableHead>Courses Completed</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Training Hours</TableHead>
                    <TableHead>Certifications</TableHead>
                    <TableHead>Last Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {learningData.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.internName}</TableCell>
                      <TableCell>{employee.coursesEnrolled}</TableCell>
                      <TableCell>{employee.coursesCompleted}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{employee.completionRate}%</span>
                          <Progress value={employee.completionRate} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>{employee.trainingHours}h</TableCell>
                      <TableCell>
                        <Badge className="bg-purple-100 text-purple-800">
                          {employee.certificationsEarned} earned
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(employee.lastActivity).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PmsTrpLms;