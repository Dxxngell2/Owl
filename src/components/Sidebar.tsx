import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, Link2, Key, Settings, Zap, Users, ArrowUpDown } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transactions', icon: CreditCard, label: 'Transactions' },
    { path: '/payment-links', icon: Link2, label: 'Payment Links' },
    { path: '/subscriptions', icon: Users, label: 'Subscriptions' },
    { path: '/conversions', icon: ArrowUpDown, label: 'Conversions' },
    { path: '/api-keys', icon: Key, label: 'API Keys' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Owl</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/20 to-purple-500/20 text-white border border-teal-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;