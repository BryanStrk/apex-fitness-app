import GlassCard from '../common/GlassCard';

export default function ProfileCard({ user = {} }) {
  const {
    initials = 'JD',
    name = 'JOHN DRAKE',
    tier = 'Platinum Member',
    memberSince = 'Jan 2024',
    totalWorkouts = 87,
    caloriesBurned = 54230,
    activeDays = 72,
  } = user;

  return (
    <GlassCard className="flex flex-col">
      <div className="flex flex-col items-center py-6 mb-6">
        <div className="w-32 h-32 rounded-full bg-[#D4FF00] flex items-center justify-center mb-4">
          <span className="font-['Bebas_Neue'] text-5xl text-black">{initials}</span>
        </div>
        <h2 className="font-['Bebas_Neue'] text-3xl tracking-wide">{name}</h2>
        <p className="font-['Roboto_Mono'] text-sm text-gray-400">{tier}</p>
      </div>

      <div className="space-y-3 font-['Roboto_Mono'] text-sm border-t border-[#1A1A1A] pt-6 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-400">Member Since</span>
          <span>{memberSince}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Total Workouts</span>
          <span className="text-[#D4FF00]">{totalWorkouts}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Calories Burned</span>
          <span className="text-[#D4FF00]">{caloriesBurned.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Active Days</span>
          <span className="text-[#D4FF00]">{activeDays}</span>
        </div>
      </div>

      <button className="w-full py-3 rounded-lg bg-[#D4FF00] text-black font-['Bebas_Neue'] text-lg tracking-wider hover:bg-[#c5ef00] transition">
        EDIT PROFILE
      </button>
    </GlassCard>
  );
}