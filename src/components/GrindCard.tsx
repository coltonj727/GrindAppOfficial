import { LocalGrind } from "@/lib/storage";
import { MapPin, Plus, Minus, BarChart3, Crown, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";
import { hasGreatOne } from "@/data/species";

interface GrindCardProps {
  grind: LocalGrind;
  onAddKill: (grind: LocalGrind) => void;
  onRemoveKill: (grind: LocalGrind) => void;
  onAddDiamond: (grind: LocalGrind) => void;
  onRemoveDiamond: (grind: LocalGrind) => void;
  onAddRare: (grind: LocalGrind) => void;
  onRemoveRare: (grind: LocalGrind) => void;
  onAddTroll: (grind: LocalGrind) => void;
  onRemoveTroll: (grind: LocalGrind) => void;
  onViewDetails: (grind: LocalGrind) => void;
  onMarkGO?: (grind: LocalGrind) => void;
  onDelete: (grind: LocalGrind) => void;
}

export function GrindCard({ grind, onAddKill, onRemoveKill, onAddDiamond, onRemoveDiamond, onAddRare, onRemoveRare, onAddTroll, onRemoveTroll, onViewDetails, onMarkGO, onDelete }: GrindCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  
  const diamondRate = grind.kills > 0 ? ((grind.diamonds / grind.kills) * 100).toFixed(1) : "0.0";
  const rareRate = grind.kills > 0 ? ((grind.rares / grind.kills) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 mb-4">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">{grind.species}</h3>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-400 hover:text-white p-1"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      onViewDetails(grind);
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-left text-white hover:bg-gray-600"
                  >
                    <BarChart3 className="w-4 h-4 mr-3" />
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      onDelete(grind);
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-left text-red-400 hover:bg-gray-600"
                  >
                    <Trash2 className="w-4 h-4 mr-3" />
                    Delete Grind
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center text-gray-400 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{grind.map}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{grind.kills}</div>
              <div className="text-xs text-gray-400">Kills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{grind.diamonds}</div>
              <div className="text-xs text-cyan-400">Diamonds ({diamondRate}%)</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">{grind.rares}</div>
              <div className="text-xs text-purple-400">Rares ({rareRate}%)</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-400">{grind.trolls}</div>
              <div className="text-xs text-orange-400">Trolls</div>
            </div>
          </div>
        </div>
      </div>

      {/* Regular Kills */}
      <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4 mb-4">
        <div className="text-white font-medium">Regular Kills</div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onRemoveKill(grind)}
            className="h-8 w-8 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded flex items-center justify-center disabled:opacity-50"
            disabled={grind.kills === 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
            {grind.kills}
          </span>
          <button
            onClick={() => onAddKill(grind)}
            className="h-8 w-8 bg-green-600/20 border border-green-600 text-green-400 hover:bg-green-600/30 rounded flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Diamonds */}
      <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4 mb-4">
        <div className="flex flex-col">
          <div className="text-cyan-400 font-medium">Diamonds</div>
          <div className="text-sm text-cyan-300 opacity-90">{diamondRate}% rate</div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onRemoveDiamond(grind)}
            className="h-8 w-8 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded flex items-center justify-center disabled:opacity-50"
            disabled={grind.diamonds === 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-2xl font-bold text-cyan-400 min-w-[3rem] text-center">
            {grind.diamonds}
          </span>
          <button
            onClick={() => onAddDiamond(grind)}
            className="h-8 w-8 bg-green-600/20 border border-green-600 text-green-400 hover:bg-green-600/30 rounded flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Rares */}
      <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4 mb-4">
        <div className="flex flex-col">
          <div className="text-purple-400 font-medium">Rares</div>
          <div className="text-sm text-purple-300 opacity-90">{rareRate}% rate</div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onRemoveRare(grind)}
            className="h-8 w-8 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded flex items-center justify-center disabled:opacity-50"
            disabled={grind.rares === 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-2xl font-bold text-purple-400 min-w-[3rem] text-center">
            {grind.rares}
          </span>
          <button
            onClick={() => onAddRare(grind)}
            className="h-8 w-8 bg-green-600/20 border border-green-600 text-green-400 hover:bg-green-600/30 rounded flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trolls */}
      <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4 mb-4">
        <div className="text-orange-400 font-medium">Trolls</div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onRemoveTroll(grind)}
            className="h-8 w-8 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded flex items-center justify-center disabled:opacity-50"
            disabled={grind.trolls === 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-2xl font-bold text-orange-400 min-w-[3rem] text-center">
            {grind.trolls}
          </span>
          <button
            onClick={() => onAddTroll(grind)}
            className="h-8 w-8 bg-green-600/20 border border-green-600 text-green-400 hover:bg-green-600/30 rounded flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Great One Button */}
      {hasGreatOne(grind.species) && onMarkGO && (
        <button
          onClick={() => onMarkGO(grind)}
          disabled={grind.goHarvested}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
            grind.goHarvested
              ? 'bg-yellow-600 text-yellow-100 cursor-not-allowed'
              : 'bg-yellow-700 hover:bg-yellow-600 text-yellow-100'
          }`}
        >
          <Crown className="w-5 h-5" />
          <span>{grind.goHarvested ? 'Great One Harvested!' : 'Mark Great One'}</span>
        </button>
      )}
    </div>
  );
}
