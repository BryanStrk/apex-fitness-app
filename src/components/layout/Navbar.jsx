import { NavLink } from 'react-router-dom';
import { Bell, Settings, Dumbbell } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/profile', label: 'Profile' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4FF00] flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-black" strokeWidth={2.5} />
            </div>
            <span className="font-['Bebas_Neue'] text-2xl tracking-wider">APEX FITNESS</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-['Roboto_Mono'] transition-colors ${
                    isActive ? 'text-[#D4FF00]' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#D4FF00] flex items-center justify-center text-black font-['Bebas_Neue'] text-sm">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}