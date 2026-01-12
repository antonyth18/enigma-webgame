import { useEffect, useState } from "react";
import "./Leader.css";

// small helper
const classNames = (...xs) => xs.filter(Boolean).join(" ");

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(true);

  // 🔹 FETCH PART (kept exactly, just isolated)
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(
          "https://657d4a533ab7ea5c72e276f7.mockapi.io/leaderboard/scores"
        );
        const data = await res.json();

        const sorted = data
          .sort((a, b) => b.score - a.score)
          .slice(0, 7)
          .map((team, index) => ({
            rank: index + 1,
            name: team.name,
            score: team.score,
          }));

        setLeaders(sorted);
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

  // // 🔹 Animation trigger
  // useEffect(() => {
  //   const t = setTimeout(() => setAnimate(false), 100);
  //   return () => clearTimeout(t);
  // }, []);

  const maxRank = 7;

  return (
    /* 🔥 FULL BLACK BACKGROUND */
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      {/* LEADERBOARD CARD */}
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-red-900/40 bg-neutral-900/60">
        {/* Header */}
        <div className="px-5 py-4 border-b border-red-900/40">
          <h3 className="text-lg font-semibold text-red-300 relative">
            Leaderboard
            <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-red-500/70 shadow-[0_0_8px_rgba(255,0,0,0.6)]" />
          </h3>
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
                {leaders.map((row) => {
                  const delay = (maxRank - row.rank) * 150;

                  const isTop1 = row.rank === 1;
                  const isTop2 = row.rank === 2;
                  const isTop3 = row.rank === 3;

                  return (
                    <tr
                      key={row.rank}
                      className={classNames(
                        "border-t transition-all duration-700 ease-out",
                        "hover:bg-neutral-900/70",
                        animate
                          ? "translate-y-full opacity-0"
                          : "translate-y-0 opacity-100",

                        "text-red-300",

                        // 🥇 TOP 1
                        isTop1 &&
                          "bg-red-900/30 shadow-[0_0_25px_rgba(255,0,0,0.65)] text-red-200",

                        // 🥈 TOP 2
                        isTop2 &&
                          "bg-red-900/20 shadow-[0_0_18px_rgba(255,0,0,0.45)]",

                        // 🥉 TOP 3
                        isTop3 &&
                          "bg-red-900/10 shadow-[0_0_12px_rgba(255,0,0,0.3)]"
                      )}
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      <td className="py-3 px-5">
                        {isTop1 ? "👑 #1" : `#${row.rank}`}
                      </td>
                      <td className="py-3 px-5 font-semibold">
                        {row.name}
                      </td>
                      <td className="py-3 px-5 text-right font-bold text-red-300">
                        {row.score}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
