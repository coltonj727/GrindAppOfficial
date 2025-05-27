import { ArrowLeft, BarChart3, Target, Crown } from "lucide-react";
import { Link } from "wouter";
import { grindStorage } from "@/lib/storage";
import { RESERVE_ANIMALS } from "@/data/species";

export default function Stats() {
  const grinds = grindStorage.getGrinds();

  // Calculate overall statistics
  const totalKills = grinds.reduce((sum, grind) => sum + grind.kills, 0);
  const totalDiamonds = grinds.reduce((sum, grind) => sum + grind.diamonds, 0);
  const totalRares = grinds.reduce((sum, grind) => sum + grind.rares, 0);
  const totalTrolls = grinds.reduce((sum, grind) => sum + grind.trolls, 0);
  const greatOnesHarvested = grinds.filter(grind => grind.goHarvested).length;

  // Calculate rates
  const diamondRate = totalKills > 0 ? ((totalDiamonds / totalKills) * 100).toFixed(1) : "0.0";
  const rareRate = totalKills > 0 ? ((totalRares / totalKills) * 100).toFixed(1) : "0.0";

  // Species breakdown
  const speciesStats = grinds.reduce((acc, grind) => {
    if (!acc[grind.species]) {
      acc[grind.species] = { kills: 0, diamonds: 0, rares: 0, trolls: 0, goHarvested: false };
    }
    acc[grind.species].kills += grind.kills;
    acc[grind.species].diamonds += grind.diamonds;
    acc[grind.species].rares += grind.rares;
    acc[grind.species].trolls += grind.trolls;
    if (grind.goHarvested) acc[grind.species].goHarvested = true;
    return acc;
  }, {} as Record<string, { kills: number; diamonds: number; rares: number; trolls: number; goHarvested: boolean }>);

  // Reserve breakdown
  const reserveStats = grinds.reduce((acc, grind) => {
    if (!acc[grind.map]) {
      acc[grind.map] = { grinds: 0, kills: 0, diamonds: 0, rares: 0 };
    }
    acc[grind.map].grinds += 1;
    acc[grind.map].kills += grind.kills;
    acc[grind.map].diamonds += grind.diamonds;
    acc[grind.map].rares += grind.rares;
    return acc;
  }, {} as Record<string, { grinds: number; kills: number; diamonds: number; rares: number }>);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <button className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <BarChart3 className="w-8 h-8 mr-3" />
              Hunting Statistics
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Overall Statistics */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Overall Performance</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{grinds.length}</div>
              <div className="text-slate-400">Active Grinds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{totalKills}</div>
              <div className="text-slate-400">Total Kills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{totalDiamonds}</div>
              <div className="text-cyan-400">Diamonds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{totalRares}</div>
              <div className="text-purple-400">Rares</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{totalTrolls}</div>
              <div className="text-orange-400">Trolls</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cyan-900/30 border border-cyan-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400">{diamondRate}%</div>
              <div className="text-cyan-400">Diamond Rate</div>
            </div>
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{rareRate}%</div>
              <div className="text-purple-400">Rare Rate</div>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{greatOnesHarvested}</div>
              <div className="text-yellow-400">Great Ones</div>
            </div>
          </div>
        </div>

        {/* Species Breakdown */}
        {Object.keys(speciesStats).length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Species Performance</h2>
            <div className="space-y-4">
              {Object.entries(speciesStats)
                .sort(([,a], [,b]) => b.kills - a.kills)
                .map(([species, stats]) => (
                  <div key={species} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white flex items-center">
                        {species}
                        {stats.goHarvested && <Crown className="w-4 h-4 ml-2 text-yellow-400" />}
                      </h3>
                      <div className="text-slate-400">{stats.kills} kills</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-cyan-400 font-bold">{stats.diamonds}</div>
                        <div className="text-cyan-400">Diamonds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-400 font-bold">{stats.rares}</div>
                        <div className="text-purple-400">Rares</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-400 font-bold">{stats.trolls}</div>
                        <div className="text-orange-400">Trolls</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Reserve Breakdown */}
        {Object.keys(reserveStats).length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Reserve Performance</h2>
            <div className="space-y-4">
              {Object.entries(reserveStats)
                .sort(([,a], [,b]) => b.kills - a.kills)
                .map(([reserve, stats]) => (
                  <div key={reserve} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">{reserve}</h3>
                      <div className="text-slate-400">{stats.grinds} grinds</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-white font-bold">{stats.kills}</div>
                        <div className="text-slate-400">Total Kills</div>
                      </div>
                      <div className="text-center">
                        <div className="text-cyan-400 font-bold">{stats.diamonds}</div>
                        <div className="text-cyan-400">Diamonds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-400 font-bold">{stats.rares}</div>
                        <div className="text-purple-400">Rares</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {grinds.length === 0 && (
          <div className="text-center py-16">
            <Target className="w-24 h-24 text-slate-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">No Statistics Yet</h2>
            <p className="text-slate-400 mb-8">Start tracking some grinds to see your hunting statistics here.</p>
            <Link href="/grinds">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
                Start Your First Grind
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
