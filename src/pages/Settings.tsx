import { useState } from "react";
import { ArrowLeft, Download, Trash2, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import { grindStorage } from "@/lib/storage";

export default function Settings() {
  const grinds = grindStorage.getGrinds();
  
  const totalKills = grinds.reduce((sum, grind) => sum + grind.kills, 0);
  const totalDiamonds = grinds.reduce((sum, grind) => sum + grind.diamonds, 0);
  const totalRares = grinds.reduce((sum, grind) => sum + grind.rares, 0);
  const greatOnesHarvested = grinds.filter(grind => grind.goHarvested).length;

  const handleExportData = () => {
    const data = {
      grinds: grindStorage.getGrinds(),
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `headhunter-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all tracking data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

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
            <h1 className="text-2xl font-bold text-white">Settings & Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Statistics Overview */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3" />
            Your Hunting Statistics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>

          {greatOnesHarvested > 0 && (
            <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{greatOnesHarvested}</div>
                <div className="text-yellow-400">Great Ones Harvested</div>
              </div>
            </div>
          )}
        </div>

        {/* Data Management */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Data Management</h2>
          
          <div className="space-y-4">
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Export Tracking Data</span>
            </button>
            
            <button
              onClick={handleClearAllData}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              <span>Clear All Data</span>
            </button>
          </div>
          
          <div className="mt-4 text-sm text-slate-400">
            <p>• Export creates a backup file of all your tracking data</p>
            <p>• Clear all data will permanently remove all grinds and statistics</p>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">About HeadHunter</h2>
          <div className="text-slate-300 space-y-2">
            <p>Version 1.0</p>
            <p>Professional hunting tracker for Call of the Wild</p>
            <p>Track your progress across all 16 authentic reserves</p>
          </div>
        </div>
      </div>
    </div>
  );
              }
