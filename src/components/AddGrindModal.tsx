import { useState } from "react";
import { X, Plus } from "lucide-react";
import { MAPS, getSpeciesForMap } from "@/data/species";

interface AddGrindModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (species: string, map: string) => void;
}

export function AddGrindModal({ isOpen, onClose, onAdd }: AddGrindModalProps) {
  const [selectedMap, setSelectedMap] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSpecies && selectedMap) {
      onAdd(selectedSpecies, selectedMap);
      setSelectedMap("");
      setSelectedSpecies("");
      onClose();
    }
  };

  const availableSpecies = selectedMap ? getSpeciesForMap(selectedMap) : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Add New Grind</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Select Reserve
            </label>
            <select
              value={selectedMap}
              onChange={(e) => {
                setSelectedMap(e.target.value);
                setSelectedSpecies("");
              }}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Choose a reserve...</option>
              {MAPS.map((map) => (
                <option key={map} value={map}>{map}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Select Species
            </label>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500"
              required
              disabled={!selectedMap}
            >
              <option value="">Choose a species...</option>
              {availableSpecies.map((species) => (
                <option key={species} value={species}>{species}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedSpecies || !selectedMap}
              className="flex-1 px-4 py-2
