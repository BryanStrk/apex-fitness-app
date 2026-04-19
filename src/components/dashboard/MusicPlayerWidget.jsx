    import { Music, Shuffle, Repeat, SkipBack, Play, SkipForward, Volume2 } from 'lucide-react';
    import GlassCard from '../common/GlassCard';

    const DEFAULT_PLAYLISTS = [
    { name: 'Beast Mode', tracks: 45, genre: 'Electronic' },
    { name: 'Power Hour', tracks: 32, genre: 'Hip Hop' },
    { name: 'Zen Flow', tracks: 28, genre: 'Ambient' },
    { name: 'Cardio Rush', tracks: 52, genre: 'EDM' },
    ];

    export default function MusicPlayerWidget({
    currentTrack = {
        title: 'Thunderstruck',
        artist: 'AC/DC',
        currentTime: '2:45',
        duration: '4:12',
        progress: 65,
    },
    playlists = DEFAULT_PLAYLISTS,
    }) {
    return (
        <GlassCard>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                <Music className="w-5 h-5 text-[#D4FF00]" />
            </div>
            <span className="font-['Roboto_Mono'] text-xs text-gray-400 tracking-widest">WORKOUT SOUNDTRACK</span>
            </div>
            <div className="flex gap-3">
            <Shuffle className="w-4 h-4 text-gray-400" />
            <Repeat className="w-4 h-4 text-gray-400" />
            </div>
        </div>

        <h3 className="font-['Bebas_Neue'] text-2xl mb-6 tracking-wide">MUSIC PLAYER</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
            <p className="font-['Roboto_Mono'] text-xs text-gray-400 tracking-widest mb-4">NOW PLAYING</p>
            <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-xl bg-[#D4FF00] flex items-center justify-center shrink-0">
                <Music className="w-10 h-10 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                <h4 className="font-['Bebas_Neue'] text-2xl truncate">{currentTrack.title}</h4>
                <p className="font-['Roboto_Mono'] text-sm text-gray-400">{currentTrack.artist}</p>
                </div>
            </div>

            <div className="mb-4">
                <div className="h-1 bg-[#1A1A1A] rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#D4FF00]" style={{ width: `${currentTrack.progress}%` }} />
                </div>
                <div className="flex justify-between font-['Roboto_Mono'] text-xs text-gray-400">
                <span>{currentTrack.currentTime}</span>
                <span>{currentTrack.duration}</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-6">
                <button className="text-gray-400 hover:text-white transition">
                <SkipBack className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-full bg-[#D4FF00] flex items-center justify-center hover:bg-[#c5ef00] transition">
                <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                </button>
                <button className="text-gray-400 hover:text-white transition">
                <SkipForward className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition ml-2">
                <Volume2 className="w-5 h-5" />
                </button>
            </div>
            </div>

            <div>
            <p className="font-['Roboto_Mono'] text-xs text-gray-400 tracking-widest mb-4">QUICK SELECT</p>
            <div className="grid grid-cols-2 gap-3">
                {playlists.map((p) => (
                <button
                    key={p.name}
                    className="text-left p-4 rounded-lg border border-[#1A1A1A] hover:border-[#D4FF00]/30 transition"
                >
                    <p className="font-['Roboto_Mono'] text-sm text-white mb-1">{p.name}</p>
                    <p className="font-['Roboto_Mono'] text-xs text-gray-500">
                    {p.tracks} tracks · {p.genre}
                    </p>
                </button>
                ))}
            </div>
            </div>
        </div>
        </GlassCard>
    );
    }