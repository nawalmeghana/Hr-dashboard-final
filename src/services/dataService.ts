import databaseData from '@/data/database.json';

// This service will be replaced with actual API calls when backend is ready
class DataService {
  private data = databaseData;

  // Employee methods
  getEmployees() {
    return this.data.employees;
  }

  getEmployeeById(id: number) {
    return this.data.employees.find(emp => emp.id === id);
  }

  getActiveEmployees() {
    return this.data.employees.filter(emp => emp.status === 'Active');
  }

  // Payroll methods
  getPayrollData() {
    return this.data.payroll.map(payroll => {
      const employee = this.getEmployeeById(payroll.employeeId);
      return {
        ...payroll,
        name: employee?.name,
        department: employee?.department,
        contactNumber: employee?.contactNumber,
        startDate: employee?.startDate
      };
    });
  }

  getPayrollByEmployeeId(employeeId: number) {
    return this.data.payroll.find(p => p.employeeId === employeeId);
  }

  // Timesheet methods
  getTimesheets() {
    return this.data.timesheets.map(timesheet => {
      const employee = this.getEmployeeById(timesheet.employeeId);
      return {
        ...timesheet,
        internName: employee?.name,
        department: employee?.department
      };
    });
  }

  getTimesheetsByEmployeeId(employeeId: number) {
    return this.data.timesheets.filter(t => t.employeeId === employeeId);
  }

  // Performance methods
  getPerformanceData() {
    return this.data.performance.map(perf => {
      const employee = this.getEmployeeById(perf.employeeId);
      return {
        ...perf,
        internName: employee?.name,
        department: employee?.department
      };
    });
  }

  getPerformanceByEmployeeId(employeeId: number) {
    return this.data.performance.find(p => p.employeeId === employeeId);
  }

  // Engagement methods
  getEngagementData() {
    return this.data.engagement.map(eng => {
      const employee = this.getEmployeeById(eng.employeeId);
      return {
        ...eng,
        name: employee?.name,
        department: employee?.department
      };
    });
  }

  getEngagementByEmployeeId(employeeId: number) {
    return this.data.engagement.find(e => e.employeeId === employeeId);
  }

  // Documents methods
  getDocumentsData() {
    return this.data.documents.map(doc => {
      const employee = this.getEmployeeById(doc.employeeId);
      return {
        ...doc,
        name: employee?.name
      };
    });
  }

  getDocumentsByEmployeeId(employeeId: number) {
    return this.data.documents.find(d => d.employeeId === employeeId);
  }

  // Exit Interview methods
  getExitInterviews() {
    return this.data.exitInterviews;
  }

  // Learning methods
  getLearningData() {
    return this.data.learning.map(learn => {
      const employee = this.getEmployeeById(learn.employeeId);
      return {
        ...learn,
        internName: employee?.name
      };
    });
  }

  getLearningByEmployeeId(employeeId: number) {
    return this.data.learning.find(l => l.employeeId === employeeId);
  }

  // HR Consulting methods
  getHRConsultingData() {
    return this.data.hrConsulting.map(session => {
      const employee = this.getEmployeeById(session.employeeId);
      return {
        ...session,
        internName: employee?.name
      };
    });
  }

  // Training Programs methods
  getTrainingPrograms() {
    return this.data.trainingPrograms;
  }

  // ATS methods
  getATSApplications() {
    return this.data.atsApplications;
  }

  // Dashboard metrics
  getDashboardMetrics() {
    const employees = this.getActiveEmployees();
    const totalEmployees = employees.length;
    const totalInterns = employees.filter(emp => emp.role.includes('Intern')).length;
    const totalPayrollCost = 285000; // This would be calculated from actual payroll data
    const newHiresThisMonth = employees.filter(emp => {
      const startDate = new Date(emp.startDate);
      const currentMonth = new Date().getMonth();
      return startDate.getMonth() === currentMonth;
    }).length;
    const terminationsThisMonth = this.data.exitInterviews.filter(exit => {
      const exitDate = new Date(exit.exitDate);
      const currentMonth = new Date().getMonth();
      return exitDate.getMonth() === currentMonth;
    }).length;
    const womenEmployees = employees.filter(emp => 
      ['Priya', 'Sneha', 'Kavya'].some(name => emp.name.includes(name))
    ).length;
    const womenEmployeesRatio = womenEmployees / totalEmployees;
    const completedTrainingRatio = 0.73; // This would be calculated from learning data
    const employeeSatisfactionRatio = 0.84; // This would be calculated from feedback data

    return {
      totalEmployees,
      totalInterns,
      totalPayrollCost,
      newHiresThisMonth,
      terminationsThisMonth,
      womenEmployeesRatio,
      completedTrainingRatio,
      employeeSatisfactionRatio
    };
  }

  // Chart data methods
  getNewHiresExitsData() {
    return [
      { month: 'Jan', hires: 12, exits: 5 },
      { month: 'Feb', hires: 8, exits: 3 },
      { month: 'Mar', hires: 15, exits: 7 },
      { month: 'Apr', hires: 10, exits: 4 },
      { month: 'May', hires: 18, exits: 6 },
      { month: 'Jun', hires: 14, exits: 8 },
    ];
  }

  getInternsByDepartmentData() {
    const employees = this.getActiveEmployees();
    const departmentCounts = employees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(departmentCounts).map(([department, count]) => ({
      department,
      count
    }));
  }

  getWorkingModeData() {
    const employees = this.getActiveEmployees();
    const modeCounts = employees.reduce((acc, emp) => {
      acc[emp.workingMode] = (acc[emp.workingMode] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colors = { Remote: '#3b82f6', Hybrid: '#06b6d4', 'On-site': '#8b5cf6' };
    return Object.entries(modeCounts).map(([name, value]) => ({
      name,
      value,
      fill: colors[name as keyof typeof colors]
    }));
  }

  getDocumentCompletionData() {
    const documents = this.getDocumentsData();
    const completed = documents.filter(doc => 
      doc.offerLetterSent && doc.offerSigned && doc.formFilled && doc.certificateIssued
    ).length;
    const inProgress = documents.filter(doc => 
      doc.offerLetterSent && doc.offerSigned && (!doc.formFilled || !doc.certificateIssued)
    ).length;
    const pending = documents.length - completed - inProgress;

    return [
      { name: 'Completed', value: completed, fill: '#10b981' },
      { name: 'In Progress', value: inProgress, fill: '#3b82f6' },
      { name: 'Pending', value: pending, fill: '#ef4444' },
    ];
  }

  getRewardsByDepartmentData() {
    const engagement = this.getEngagementData();
    const departmentRewards = engagement.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + emp.rewardsEarned;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(departmentRewards).map(([department, rewards]) => ({
      department,
      rewards
    }));
  }

  getPerformanceTrendData() {
    return [
      { subject: 'Quality', week1: 80, week2: 85, week3: 88, week4: 92 },
      { subject: 'Timeliness', week1: 75, week2: 82, week3: 85, week4: 88 },
      { subject: 'Communication', week1: 85, week2: 87, week3: 90, week4: 93 },
      { subject: 'Innovation', week1: 70, week2: 75, week3: 80, week4: 85 },
      { subject: 'Teamwork', week1: 90, week2: 88, week3: 92, week4: 95 },
    ];
  }

  getAttendanceTrendData() {
    return [
      { month: 'Jan', attendance: 92, leaves: 8 },
      { month: 'Feb', attendance: 89, leaves: 11 },
      { month: 'Mar', attendance: 94, leaves: 6 },
      { month: 'Apr', attendance: 91, leaves: 9 },
      { month: 'May', attendance: 88, leaves: 12 },
      { month: 'Jun', attendance: 93, leaves: 7 },
    ];
  }

  getExitReasonsData() {
    const exitReasons = this.data.exitInterviews.reduce((acc, exit) => {
      acc[exit.exitReason] = (acc[exit.exitReason] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colors = {
      'Career Growth': '#3b82f6',
      'Higher Studies': '#06b6d4',
      'Better Opportunity': '#8b5cf6',
      'Personal Reasons': '#10b981',
      'Other': '#ef4444'
    };

    return Object.entries(exitReasons).map(([name, value]) => ({
      name,
      value,
      fill: colors[name as keyof typeof colors] || '#6b7280'
    }));
  }

  getMonthlyExitTrend() {
    return [
      { month: 'Jul', exits: 2 },
      { month: 'Aug', exits: 1 },
      { month: 'Sep', exits: 3 },
      { month: 'Oct', exits: 2 },
      { month: 'Nov', exits: 6 },
      { month: 'Dec', exits: 1 },
    ];
  }

  getAMSData() {
    const employees = this.getActiveEmployees();
    const departmentAttendance = employees.reduce((acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = { department: emp.department, presentToday: 0, totalEmployees: 0 };
      }
      acc[emp.department].totalEmployees += 1;
      // Simulate attendance (90-95% present)
      if (Math.random() > 0.1) {
        acc[emp.department].presentToday += 1;
      }
      return acc;
    }, {} as Record<string, any>);

    return Object.values(departmentAttendance).map((dept: any) => ({
      ...dept,
      attendanceRate: Math.round((dept.presentToday / dept.totalEmployees) * 100)
    }));
  }
}

export const dataService = new DataService();
export default dataService;