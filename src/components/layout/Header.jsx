import React, { useState } from 'react';
import { Bell, Search, MapPin, X } from 'lucide-react';
import { LeaveApprovals } from '../attendance/LeaveApprovals';






export function Header({ title, userRole, onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const isManager = userRole === 'BRANCH_MANAGER' || userRole === 'SUPER_ADMIN';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-xl font-bold text-[#190E5D] capitalize">{title}</h2>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />

        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
          <MapPin size={12} />
          <span>New York Branch</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-full transition-colors ${showNotifications ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}>

            <Bell size={20} />
            {isManager &&
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            }
          </button>

          {showNotifications &&
            <>
              <div
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setShowNotifications(false)}>
              </div>
              <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-20 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-slate-800">Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={16} />
                  </button>
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                  {isManager ?
                    <div className="p-4">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-3">Leave Requests</p>
                      <LeaveApprovals compact limit={3} />
                    </div> :

                    <div className="p-8 text-center text-slate-500 text-sm">
                      <Bell size={32} className="mx-auto mb-2 opacity-20" />
                      No new notifications
                    </div>
                  }
                </div>

                {isManager &&
                  <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
                    <button
                      onClick={() => {
                        onNavigate('news');
                        setShowNotifications(false);
                      }}
                      className="text-blue-600 text-xs font-bold hover:underline"
                    >
                      View All Notifications
                    </button>
                  </div>
                }
              </div>
            </>
          }
        </div>
      </div>
    </header>);

}