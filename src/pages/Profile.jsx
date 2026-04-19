import { User, Activity, Flame, Target, Award } from 'lucide-react';
import ProfileCard from '../components/profile/ProfileCard';
import StatCard from '../components/profile/StatCard';
import WeeklyBreakdownChart from '../components/profile/WeeklyBreakdownChart';
import FitnessRadarChart from '../components/profile/FitnessRadarChart';
import MonthlyTrendChart from '../components/profile/MonthlyTrendChart';
import AchievementsList from '../components/profile/AchievementsList';

// MOCK DATA - reemplazar con axios.get('/api/profile/me')
const mockProfile = {
  user: {
    initials: 'JD',
    name: 'JOHN DRAKE',
    tier: 'Platinum Member',
    memberSince: 'Jan 2024',
    totalWorkouts: 87,
    caloriesBurned: 54230,
    activeDays: 72,
  },
  stats: { weekSessions: 12, weeklyBurn: 5960, goalProgress: 92, achievements: 24 },
};

export default function Profile() {
  const { user, stats } = mockProfile;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 text-[#D4FF00]">
          <User className="w-4 h-4" />
          <span className="font-['Roboto_Mono'] text-xs tracking-widest">MEMBER PROFILE</span>
        </div>
        <h1 className="font-['Bebas_Neue'] text-6xl md:text-7xl tracking-wide mb-3">
          ATHLETE <span className="text-[#D4FF00]">DASHBOARD</span>
        </h1>
        <p className="font-['Roboto_Mono'] text-sm text-gray-400">Your complete performance analytics and achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ProfileCard user={user} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2">
          <StatCard icon={Activity} label="This Week" value={stats.weekSessions} subtitle="Sessions" />
          <StatCard
            icon={Flame}
            label="Weekly Burn"
            value={stats.weeklyBurn.toLocaleString()}
            subtitle="Calories"
            iconBg="bg-blue-400/10"
            iconColor="text-blue-400"
          />
          <StatCard
            icon={Target}
            label="Goal Progress"
            value={`${stats.goalProgress}%`}
            subtitle="Complete"
            iconBg="bg-purple-400/10"
            iconColor="text-purple-400"
          />
          <StatCard
            icon={Award}
            label="Achievements"
            value={stats.achievements}
            subtitle="Unlocked"
            iconBg="bg-yellow-400/10"
            iconColor="text-yellow-400"
            badge="+2 New"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <WeeklyBreakdownChart />
        </div>
        <FitnessRadarChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyTrendChart />
        </div>
        <AchievementsList />
      </div>
    </div>
  );
}