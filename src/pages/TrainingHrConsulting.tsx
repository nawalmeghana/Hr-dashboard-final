import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, CheckCircle, Clock, AlertTriangle, MessageSquare, GraduationCap, Users } from 'lucide-react';
import { dataService } from '@/services/dataService';

const TrainingHrConsulting = () => {
  const documentsData = dataService.getDocumentsData();
  const hrConsultingData = dataService.getHRConsultingData();
  const trainingPrograms = dataService.getTrainingPrograms();

  // Calculate document completion statistics
  const documentStats = {
    offerLetterSent: documentsData.filter(d => d.offerLetterSent).length,
    offerSigned: documentsData.filter(d => d.offerSigned).length,
    formFilled: documentsData.filter(d => d.formFilled).length,
    certificateIssued: documentsData.filter(d => d.certificateIssued).length,
    lorIssued: documentsData.filter(d => d.lorIssued).length,
  };

  const documentCompletionData = [
    { name: 'Offer Letter Sent', value: documentStats.offerLetterSent, fill: '#3b82f6' },
    { name: 'Offer Signed', value: documentStats.offerSigned, fill: '#10b981' },
    { name: 'Form Filled', value: documentStats.formFilled, fill: '#f59e0b' },
    { name: 'Certificate Issued', value: documentStats.certificateIssued, fill: '#8b5cf6' },
    { name: 'LOR Issued', value: documentStats.lorIssued, fill: '#ef4444' },
  ];

  const getCompletionPercentage = (employee: any) => {
    const fields = ['offerLetterSent', 'offerSigned', 'formFilled', 'linkedinPost', 'linkedinFollow', 'instagramFollow', 'googleReview', 'certificateIssued', 'lorIssued'];
    const completed = fields.filter(field => employee[field]).length;
    return Math.round((completed / fields.length) * 100);
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'Career Guidance':
        return 'bg-blue-100 text-blue-800';
      case 'Performance Review':
        return 'bg-green-100 text-green-800';
      case 'Skill Development':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Training & HR Consulting</h1>
        <p className="text-muted-foreground">
          Document tracking, training programs, and HR consulting sessions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Processed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(documentStats).reduce((sum, count) => sum + count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total document actions</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Training Programs</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainingPrograms.filter(p => p.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HR Consultations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hrConsultingData.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(documentsData.reduce((sum, emp) => sum + getCompletionPercentage(emp), 0) / documentsData.length)}%
            </div>
            <Progress value={Math.round(documentsData.reduce((sum, emp) => sum + getCompletionPercentage(emp), 0) / documentsData.length)} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Document Completion Chart */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Document Processing Status</CardTitle>
            <CardDescription>Breakdown of document completion across all processes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
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

        {/* Training Programs Overview */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Training Programs Progress</CardTitle>
            <CardDescription>Current training initiatives and completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trainingPrograms}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="programName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="participants" fill="#3b82f6" name="Participants" />
                <Bar dataKey="completion" fill="#10b981" name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Document Tracker Table */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Documents Tracker</CardTitle>
          <CardDescription>Complete tracking of document processing and social media engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Offer Letter</TableHead>
                  <TableHead>Form Status</TableHead>
                  <TableHead>Social Media</TableHead>
                  <TableHead>Certificates</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentsData.map((employee) => {
                  const completionRate = getCompletionPercentage(employee);
                  return (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={employee.offerLetterSent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {employee.offerLetterSent ? 'Sent' : 'Pending'}
                          </Badge>
                          <Badge className={employee.offerSigned ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {employee.offerSigned ? 'Signed' : 'Unsigned'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={employee.formFilled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {employee.formFilled ? 'Completed' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Badge variant="outline" className={employee.linkedinPost ? 'border-green-300' : 'border-red-300'}>
                            {employee.linkedinPost ? '✓' : '✗'} Post
                          </Badge>
                          <Badge variant="outline" className={employee.linkedinFollow ? 'border-green-300' : 'border-red-300'}>
                            {employee.linkedinFollow ? '✓' : '✗'} LI
                          </Badge>
                          <Badge variant="outline" className={employee.instagramFollow ? 'border-green-300' : 'border-red-300'}>
                            {employee.instagramFollow ? '✓' : '✗'} IG
                          </Badge>
                          <Badge variant="outline" className={employee.googleReview ? 'border-green-300' : 'border-red-300'}>
                            {employee.googleReview ? '✓' : '✗'} Review
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={employee.certificateIssued ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}>
                            {employee.certificateIssued ? 'Certificate ✓' : 'Certificate Pending'}
                          </Badge>
                          <Badge className={employee.lorIssued ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                            {employee.lorIssued ? 'LOR ✓' : 'LOR Pending'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{completionRate}%</span>
                          <Progress value={completionRate} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>{new Date(employee.documentDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* HR Consulting Sessions */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>HR Consulting Sessions</CardTitle>
          <CardDescription>Individual consulting sessions and feedback tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intern</TableHead>
                <TableHead>Session Date</TableHead>
                <TableHead>Session Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Next Session</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hrConsultingData.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.internName}</TableCell>
                  <TableCell>{new Date(session.sessionDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getSessionTypeColor(session.sessionType)}>
                      {session.sessionType}
                    </Badge>
                  </TableCell>
                  <TableCell>{session.duration} min</TableCell>
                  <TableCell>
                    <span className="text-yellow-500">{getRatingStars(session.rating)}</span>
                  </TableCell>
                  <TableCell className="max-w-48 truncate">{session.feedback}</TableCell>
                  <TableCell>{new Date(session.nextSession).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Training Programs Details */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Training Programs Management</CardTitle>
          <CardDescription>Manage and track all training initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.programName}</TableCell>
                  <TableCell>{program.duration}</TableCell>
                  <TableCell>{program.participants}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{program.completion}%</span>
                      <Progress value={program.completion} className="w-16" />
                    </div>
                  </TableCell>
                  <TableCell>{program.instructor}</TableCell>
                  <TableCell>
                    <Badge className={program.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                      {program.status}
                    </Badge>
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
    </div>
  );
};

export default TrainingHrConsulting;