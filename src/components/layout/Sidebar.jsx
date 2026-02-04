import React from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  TrendingUp,
  Wrench,
  Settings,
  LogOut,

  FileBarChart,
  Phone,
  ShoppingCart,
  DollarSign,
  Clock,
  FileText,
  LifeBuoy,
  Megaphone
} from
  'lucide-react';
import { cn } from '../../lib/utils';








export function Sidebar({ currentView, onNavigate, userRole, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ALL'] },
    { id: 'news', label: 'News & Updates', icon: Megaphone, roles: ['ALL'] },
    { id: 'employees', label: 'Employees', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH_ADMIN', 'BRANCH_MANAGER'] },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, roles: ['ALL'] },
    { id: 'schedule', label: 'Shift Schedule', icon: Clock, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'SALES_MANAGER'] },
    { id: 'payroll', label: 'Payroll', icon: DollarSign, roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH_ADMIN'] },
    { id: 'documents', label: 'Documents', icon: FileText, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER'] },
    { id: 'support', label: 'Help Desk', icon: LifeBuoy, roles: ['ALL'] },
    { id: 'sales', label: 'Sales & Incentives', icon: TrendingUp, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'SALES_MANAGER'] },
    { id: 'customer-sales', label: 'Customer Sales', icon: ShoppingCart, roles: ['SUPER_ADMIN', 'SALES_MANAGER'] },
    { id: 'leads', label: 'Leads & Enquiries', icon: Phone, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'SALES_MANAGER'] },
    { id: 'service', label: 'Service Tasks', icon: Wrench, roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'SERVICE_STAFF'] },
    { id: 'reports', label: 'Reports', icon: FileBarChart, roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH_ADMIN'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['SUPER_ADMIN', 'ADMIN'] }];


  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes('ALL') || item.roles.includes(userRole)
  );

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-slate-800">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex flex-col items-start hover:opacity-80 transition-opacity"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
            HAWKEYE NEST
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Enterprise Edition</p>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {filteredMenu.map((item) =>
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
              currentView === item.id ?
                "bg-blue-600 text-white shadow-lg shadow-blue-900/50" :
                "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}>

            <item.icon size={18} />
            {item.label}
          </button>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="bg-slate-800 rounded-lg p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-slate-400 truncate">{userRole.replace('_', ' ')}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium">

          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>);

}