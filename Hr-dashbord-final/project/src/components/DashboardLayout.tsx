import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import OwlLogo from '@/components/OwlLogo';
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Heart,
  TrendingUp,
  GraduationCap,
  UserX,
  UserPlus,
  Menu,
  LogOut,
  Bell,
  Settings
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leave & Attendance', href: '/leave-attendance', icon: Calendar },
  { name: 'Payroll & Compliance', href: '/payroll-compliance', icon: DollarSign },
  { name: 'ATS, AMS, ESS & EMS', href: '/ats-ams-ess-ems', icon: Users },
  { name: 'Timesheets', href: '/timesheets', icon: Clock },
  { name: 'Employee Engagement', href: '/employee-engagement', icon: Heart },
  { name: 'PMS, TRP & LMS', href: '/pms-trp-lms', icon: TrendingUp },
  { name: 'Training & HR Consulting', href: '/training-hr-consulting', icon: GraduationCap },
  { name: 'Exit Interview', href: '/exit-interview', icon: UserX },
  { name: 'Add Intern', href: '/add-intern', icon: UserPlus },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
    window.location.reload();
  };

  const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`${isMobile ? 'w-full' : 'w-64'} h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col`}>
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <OwlLogo size="md" />
          <div>
            <h1 className="text-lg font-bold">Humble Walking</h1>
            <p className="text-xs text-slate-400">HR Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="text-xs text-slate-400 text-center">
          © Humble Walking 2025
          <br />
          Built with 💙 by Team Yash Shah
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar isMobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>

              <div className="hidden lg:flex items-center space-x-3">
                <OwlLogo size="sm" />
                <h1 className="text-xl font-bold text-gray-900">Humble Walking HRMS</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Yash Shah</p>
                  <p className="text-xs text-gray-500">CEO</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;