import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import LoginPage from '@/pages/LoginPage';
import DashboardLayout from '@/components/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import LeaveAttendance from '@/pages/LeaveAttendance';
import PayrollCompliance from '@/pages/PayrollCompliance';
import AtsAmsEssEms from '@/pages/AtsAmsEssEms';
import Timesheets from '@/pages/Timesheets';
import EmployeeEngagement from '@/pages/EmployeeEngagement';
import PmsTrpLms from '@/pages/PmsTrpLms';
import TrainingHrConsulting from '@/pages/TrainingHrConsulting';
import ExitInterview from '@/pages/ExitInterview';
import AddIntern from '@/pages/AddIntern';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLogin={() => setIsAuthenticated(true)} />
              )
            }
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <DashboardLayout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/leave-attendance" element={<LeaveAttendance />} />
                    <Route path="/payroll-compliance" element={<PayrollCompliance />} />
                    <Route path="/ats-ams-ess-ems" element={<AtsAmsEssEms />} />
                    <Route path="/timesheets" element={<Timesheets />} />
                    <Route path="/employee-engagement" element={<EmployeeEngagement />} />
                    <Route path="/pms-trp-lms" element={<PmsTrpLms />} />
                    <Route path="/training-hr-consulting" element={<TrainingHrConsulting />} />
                    <Route path="/exit-interview" element={<ExitInterview />} />
                    <Route path="/add-intern" element={<AddIntern />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </DashboardLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;