import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import EnergyWidget from '../components/dashboard/EnergyWidget';
import CaloriesWidget from '../components/dashboard/CaloriesWidget';
import NextSessionWidget from '../components/dashboard/NextSessionWidget';
import WeeklyActivityWidget from '../components/dashboard/WeeklyActivityWidget';
import StreakWidget from '../components/dashboard/StreakWidget';
import MusicPlayerWidget from '../components/dashboard/MusicPlayerWidget';
import { getNextSession } from '../api/dashboardService';

// MOCK DATA - datos que aún no vienen del backend
const mockStaticData = {
  energy: {
    level: 87,
    message: 'Your energy is optimal for high-intensity training. Peak performance window active.',
  },
  calories: { burned: 1247, goal: 1500, trend: '+12%' },
  weeklyActivity: {
    data: [
      { day: 'MON', value: 40 },
      { day: 'TUE', value: 75 },
      { day: 'WED', value: 50 },
      { day: 'THU', value: 90 },
      { day: 'FRI', value: 45 },
      { day: 'SAT', value: 100 },
      { day: 'SUN', value: 35 },
    ],
    trend: '+18% vs last week',
    totalHours: 12.0,
    sessions: 7,
    avgDuration: '1.7H',
  },
  streak: { days: 14, activeDays: [true, true, true, true, true, false, false] },
};

/**
 * Formatea una fecha ISO del backend a un string legible
 * tipo "Today, 18:30 - 19:30" o "Tomorrow, 09:00 - 10:00"
 */
function formatSessionTime(isoDate, durationMinutes) {
  const start = new Date(isoDate);
  const end = new Date(start.getTime() + durationMinutes * 60000);

  const now = new Date();
  const isToday = start.toDateString() === now.toDateString();

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = start.toDateString() === tomorrow.toDateString();

  const timeFormat = { hour: '2-digit', minute: '2-digit', hour12: false };
  const startTime = start.toLocaleTimeString('en-GB', timeFormat);
  const endTime = end.toLocaleTimeString('en-GB', timeFormat);

  let dayLabel;
  if (isToday) dayLabel = 'Today';
  else if (isTomorrow) dayLabel = 'Tomorrow';
  else dayLabel = start.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

  return `${dayLabel}, ${startTime} - ${endTime}`;
}

export default function Dashboard() {
  const [nextSession, setNextSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const fetchNextSession = async () => {
      try {
        const data = await getNextSession();
        setNextSession(data);
      } catch (err) {
        console.error('Failed to load next session:', err);
      } finally {
        setLoadingSession(false);
      }
    };

    fetchNextSession();
  }, []);

  // Construir el objeto que espera el NextSessionWidget
  const nextSessionProps = nextSession
    ? {
        title: nextSession.title,
        description: nextSession.description,
        time: formatSessionTime(nextSession.date, nextSession.durationMinutes),
        location: 'Floor Alpha',
        coach: `Coach ${nextSession.professor?.name || 'TBA'}`,
        status: 'SCHEDULED',
      }
    : {
        title: 'No upcoming sessions',
        description: 'Check back later for new training sessions.',
        time: '—',
        location: '—',
        coach: '—',
        status: 'EMPTY',
      };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 text-[#D4FF00]">
          <Zap className="w-4 h-4" />
          <span className="font-['Roboto_Mono'] text-xs tracking-widest">SYSTEM STATUS: OPTIMAL</span>
        </div>
        <h1 className="font-['Bebas_Neue'] text-6xl md:text-7xl tracking-wide mb-3">
          KINETIC <span className="text-[#D4FF00]">DASHBOARD</span>
        </h1>
        <p className="font-['Roboto_Mono'] text-sm text-gray-400">
          Real-time performance metrics and activity management
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <EnergyWidget {...mockStaticData.energy} />
        <CaloriesWidget {...mockStaticData.calories} />
        <NextSessionWidget session={nextSessionProps} loading={loadingSession} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <WeeklyActivityWidget {...mockStaticData.weeklyActivity} />
        </div>
        <StreakWidget {...mockStaticData.streak} />
      </div>

      <MusicPlayerWidget />
    </div>
  );
}