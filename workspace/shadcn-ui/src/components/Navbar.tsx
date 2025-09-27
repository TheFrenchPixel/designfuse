import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusCircle, User, LogOut } from 'lucide-react';

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/create', label: 'Create Brief', icon: PlusCircle },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => navigate('/create')}
              className="flex items-center space-x-3 mr-6 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logo.jpg" 
                alt="DesignFuse Logo" 
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-teal-400">DesignFuse</span>
            </button>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={`${
                    isActive 
                      ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                      : 'text-slate-300 hover:text-teal-400 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-slate-300 hover:text-red-400 hover:bg-slate-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/create')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo.jpg" 
              alt="DesignFuse Logo" 
              className="w-7 h-7 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-teal-400">DesignFuse</span>
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-slate-300 hover:text-red-400 hover:bg-slate-700"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 px-4 py-2 z-50">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center space-y-1 h-auto py-2 px-4 ${
                  isActive 
                    ? 'text-teal-400 bg-slate-700' 
                    : 'text-slate-400 hover:text-teal-400 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    </>
  );
}