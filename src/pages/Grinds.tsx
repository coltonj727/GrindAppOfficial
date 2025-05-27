import { useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { grindStorage, LocalGrind } from "@/lib/storage";
import { GrindCard } from "@/components/GrindCard";
import { AddGrindModal } from "@/components/AddGrindModal";

export default function Grinds() {
  const [grinds, setGrinds] = useState<LocalGrind[]>(grindStorage.getGrinds());
  const [showAddModal, setShowAddModal] = useState(false);

  const refreshGrinds = () => {
    setGrinds(grindStorage.getGrinds());
  };

  const handleAddGrind = (species: string, map: string) => {
    grindStorage.createGrind({
      species,
      map,
      kills: 0,
      diamonds: 0,
      rares: 0,
      trolls: 0,
      goHarvested: false
    });
    refreshGrinds();
  };

  const handleAddKill = (grind: LocalGrind) => {
    grindStorage.updateGrind(grind.id, { kills: grind.kills + 1 });
    refreshGrinds();
  };

  const handleRemoveKill = (grind: LocalGrind) => {
    if (grind.kills > 0) {
      grindStorage.updateGrind(grind.id, { kills: grind.kills - 1 });
      refreshGrinds();
    }
  };

  const handleAddDiamond = (grind: LocalGrind) => {
    grindStorage.updateGrind(grind.id, { diamonds: grind.diamonds + 1 });
    refreshGrinds();
  };

  const handleRemoveDiamond = (grind: LocalGrind) => {
    if (grind.diamonds > 0) {
      grindStorage.updateGrind(grind.id, { diamonds: grind.diamonds - 1 });
      refreshGrinds();
    }
  };

  const handleAddRare = (grind: LocalGrind) => {
    grindStorage.updateGrind(grind.id, { rares: grind.rares + 1 });
    refreshGrinds();
  };

  const handleRemoveRare = (grind: LocalGrind) => {
    if (grind.rares > 0) {
      grindStorage.updateGrind(grind.id, { rares: grind.rares - 1 });
      refreshGrinds();
    }
  };

  const handleAddTroll = (grind: LocalGrind) => {
    grindStorage.updateGrind(grind.id, { trolls: grind.trolls + 1 });
    refreshGrinds();
  };

  const handleRemoveTroll = (grind: LocalGrind) => {
    if (grind.trolls > 0) {
      grindStorage.updateGrind(grind.id, { trolls: grind.trolls - 1 });
      refreshGrinds();
    }
  };

  const handleViewDetails = (grind: LocalGrind) => {
    // Could implement details modal later
    console.log("View details for:", grind);
  };

  const handleMarkGO = (grind: LocalGrind) => {
    grindStorage.updateGrind(grind.id, { goHarvested: true });
    refreshGrinds();
  };

  const handleDelete = (grind: LocalGrind) => {
    if (confirm(`Are you sure you want to delete the ${grind.species} grind on ${grind.map}?`)) {
      grindStorage.deleteGrind(grind.id);
      refreshGrinds();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <button className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Active Grinds</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Grind</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {grinds.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold text-white mb-4">No Active Grinds</h2>
            <p className="text-slate-400 mb-8">Start your first grind to begin tracking your hunting progress.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              <Plus className="w-5 h-5 mr-2 inline" />
              Add Your First Grind
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {grinds.map((grind) => (
              <GrindCard
                key={grind.id}
                grind={grind}
                onAddKill={handleAddKill}
                onRemoveKill={handleRemoveKill}
                onAddDiamond={handleAddDiamond}
                onRemoveDiamond={handleRemoveDiamond}
                onAddRare={handleAddRare}
                onRemoveRare={handleRemoveRare}
                onAddTroll={handleAddTroll}
                onRemoveTroll={handleRemoveTroll}
                onViewDetails={handleViewDetails}
                onMarkGO={handleMarkGO}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <AddGrindModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddGrind}
      />
    </div>
  );
}
