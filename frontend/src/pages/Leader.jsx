import { useEffect, useState } from "react";
import { api } from '../api';
import { Trophy, Crown, Skull, Ghost } from "lucide-react";
import "./Leader.css";

// small helper
const classNames = (...xs) => xs.filter(Boolean).join(" ");

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(true);

  // 🔹 FETCH PART
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const data = await api.get('/teams/leaderboard');
        console.log("Leaderboard data fetched:", data);

        if (!data || data.length === 0) {
          console.warn("Leaderboard is empty!");
        }

        const limited = data.slice(0, 10).map((team) => ({
          id: team.id,
          rank: team.rank,
          name: team.teamName,
          score: team.score,
        }));

        setLeaders(limited);
      } catch (err) {
        console.error("Leaderboard fetch failed", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  // 🔹 DUMMY DATA (replace with fetch later)
  // useEffect(() => {
  //   const dummyLeaders = [
  //     { rank: 1, name: "Team Hawkins", score: 460 },
  //     { rank: 2, name: "UpsideDown.dev", score: 420 },
  //     { rank: 3, name: "Hellfire Club", score: 380 },
  //     { rank: 4, name: "DemogorgonX", score: 340 },
  //     { rank: 5, name: "Eleven Squad", score: 310 },
  //     { rank: 6, name: "Mind Flayers", score: 280 },
  //     { rank: 7, name: "Starcourt", score: 250 },
  //   ];

  //   setLeaders(dummyLeaders);
  //   setLoading(false);
  // }, []);

  // 🔹 Animation trigger
  useEffect(() => {
    const t = setTimeout(() => setAnimate(false), 100);
    return () => clearTimeout(t);
  }, []);

  const maxRank = 10;

  return (
    /* 🔥 FULL BLACK BACKGROUND */
    <div className="min-h-screen bg-black leaderboard-container flex items-center justify-center p-6 font-mono">
      {/* LEADERBOARD CARD */}
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-red-900/60 leaderboard-card shadow-[0_0_50px_rgba(255,0,0,0.1)]">
        {/* Header */}
        <div className="px-5 py-6 border-b border-red-900/40 bg-zinc-950/40">
          <div className="flex items-center gap-3">
            <Trophy className="text-red-500 w-6 h-6 animate-pulse" />
            <h3 className="text-2xl font-bold tracking-widest text-red-500 uppercase glitch-text">
              Rankings
            </h3>
          </div>
          <p className="text-xs text-red-900/80 mt-1 tracking-tighter uppercase">Top 10 intercepted signals</p>
        </div>

        {loading ? (
          <p className="px-5 py-6 text-sm text-neutral-400">
            Loading leaderboard...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-black/40 text-neutral-300">
                  <th className="text-left py-3 px-5">Rank</th>
                  <th className="text-left py-3 px-5">Team</th>
                  <th className="text-right py-3 px-5">Score</th>
                </tr>
              </thead>

              <tbody>
                {leaders.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-20 text-center">
                      <Ghost className="w-12 h-12 text-zinc-800 mx-auto mb-3 opacity-20" />
                      <p className="text-zinc-600 tracking-widest uppercase text-xs">No signals found in this dimension</p>
                    </td>
                  </tr>
                ) : (
                  leaders.map((row) => {
                    const delay = (maxRank - row.rank) * 100;

                    const isTop1 = row.rank === 1;
                    const isTop2 = row.rank === 2;
                    const isTop3 = row.rank === 3;

                    return (
                      <tr
                        key={row.id || row.name}
                        className={classNames(
                          "border-b border-red-900/10 transition-all duration-700 ease-out row-hover",
                          animate
                            ? "translate-x-full opacity-0"
                            : "translate-x-0 opacity-100",

                          "text-red-400/90",

                          // 🥇 TOP 1
                          isTop1 &&
                          "bg-red-950/20 shadow-[inset_0_0_20px_rgba(255,0,0,0.1)] text-red-100",

                          // 🥈 TOP 2
                          isTop2 &&
                          "bg-red-950/10",

                          // 🥉 TOP 3
                          isTop3 &&
                          "bg-red-950/5"
                        )}
                        style={{ transitionDelay: `${delay}ms` }}
                      >
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            {isTop1 ? <Crown className="w-4 h-4 text-yellow-500 rank-crown" /> :
                              isTop2 ? <Skull className="w-4 h-4 text-zinc-400" /> :
                                isTop3 ? <Skull className="w-4 h-4 text-zinc-500" /> : null}
                            <span className={isTop1 ? "font-bold text-red-100" : ""}>
                              #{row.rank}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-5 font-bold tracking-tight">
                          {row.name}
                        </td>
                        <td className="py-4 px-5 text-right">
                          <span className="font-black text-red-500 shadow-sm">
                            {row.score}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
