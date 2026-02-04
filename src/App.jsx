import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { SuperAdminDashboard } from './components/dashboard/SuperAdminDashboard';
import { StaffDashboard } from './components/dashboard/StaffDashboard';
import { AttendanceModule } from './components/attendance/AttendanceModule';
import { SalesEntry } from './components/sales/SalesEntry';
import { SalesEnquiries } from './components/sales/SalesEnquiries';
import { CustomerSalesDetails } from './components/sales/CustomerSalesDetails';
import { TaskBoard } from './components/service/TaskBoard';
import { EmployeeList } from './components/hr/EmployeeList';
import { PayrollSheet } from './components/hr/PayrollSheet';
import { ShiftScheduler } from './components/hr/ShiftScheduler';
import { DocumentManager } from './components/hr/DocumentManager';
import { SupportTickets } from './components/support/SupportTickets';
import { NewsFeed } from './components/communication/NewsFeed';
import { AnalyticsReports } from './components/reports/AnalyticsReports';

import { ToastProvider } from './components/ui/Toast';
import { CustomCursor } from './components/ui/CustomCursor';

function App() {
  const [authView, setAuthView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [userRole, setUserRole] = useState('SUPER_ADMIN');

  const handleLogin = (role, name) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
    setAuthView('login');
  };

  if (!isLoggedIn) {
    if (authView === 'register') {
      return (
        <Register
          onRegister={handleLogin}
          onLoginClick={() => setAuthView('login')} />);


    }
    return (
      <Login
        onLogin={handleLogin}
        onRegisterClick={() => setAuthView('register')} />);


  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        if (userRole === 'SERVICE_STAFF' || userRole === 'SALES_MANAGER') {
          return <StaffDashboard onNavigate={setCurrentView} />;
        }
        return <SuperAdminDashboard onNavigate={setCurrentView} />;
      case 'news':
        return <NewsFeed />;
      case 'employees':
        return <EmployeeList />;
      case 'payroll':
        return <PayrollSheet />;
      case 'schedule':
        return <ShiftScheduler />;
      case 'documents':
        return <DocumentManager />;
      case 'support':
        return <SupportTickets />;
      case 'attendance':
        return <AttendanceModule userRole={userRole} />;
      case 'sales':
        return <SalesEntry />;
      case 'leads':
        return <SalesEnquiries />;
      case 'customer-sales':
        return <CustomerSalesDetails />;
      case 'service':
        return <TaskBoard />;
      case 'reports':
        return <AnalyticsReports />;
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">⚙️</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-700">System Settings</h2>
            <p className="text-slate-500 mt-2 max-w-md">Global configuration, role management, and incentive rule settings go here.</p>
          </div>);

      default:
        return <SuperAdminDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <ToastProvider>
      <CustomCursor />
      <div className="flex h-screen font-sans bg-slate-50 text-slate-900">
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          userRole={userRole}
          onLogout={handleLogout} />

        <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
          <Header title={currentView} userRole={userRole} onNavigate={setCurrentView} />

          <main className="flex-1 overflow-y-auto p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </ToastProvider>);

}

export default App;