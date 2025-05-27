export const RESERVE_ANIMALS = {
  "Hirschfelden": ["Red Deer", "Roe Deer", "Wild Boar", "European Rabbit", "Red Fox", "Fallow Deer"],
  "Layton Lake": ["Whitetail Deer", "Black Bear", "Moose", "Canada Goose", "Mallard", "Coyote"],
  "Medved-Taiga": ["Brown Bear", "Lynx", "Wild Boar", "Roe Deer", "Black Grouse", "Capercaillie"],
  "Vurhonga Savanna": ["Cape Buffalo", "Lion", "Blue Wildebeest", "Gemsbok", "Springbok", "Warthog"],
  "Parque Fernando": ["Water Buffalo", "Axis Deer", "Blackbuck", "Feral Goat", "Feral Pig", "Red Deer"],
  "Yukon Valley": ["Moose", "Grizzly Bear", "Caribou", "Dall Sheep", "Black Bear", "Gray Wolf"],
  "Cuatro Colinas": ["Iberian Wolf", "Red Deer", "Roe Deer", "Wild Boar", "Iberian Mouflon", "Feral Goat"],
  "Silver Ridge Peaks": ["Rocky Mountain Elk", "Mule Deer", "Bighorn Sheep", "Mountain Goat", "American Black Bear", "Puma"],
  "Te Awaroa": ["Red Deer", "Sika Deer", "Feral Pig", "Feral Goat", "Chamois", "Turkey"],
  "Rancho del Arroyo": ["Mule Deer", "Wild Turkey", "Rio Grande Turkey", "Collared Peccary", "Coyote", "Mexican Bobcat"],
  "Mississippi Acres": ["Whitetail Deer", "Wild Turkey", "Alligator", "Wild Hog", "Raccoon", "Bobcat"],
  "Revontuli Coast": ["Reindeer", "Rock Ptarmigan", "Willow Ptarmigan", "Lynx", "Brown Bear", "Gray Wolf"],
  "New England Mountains": ["Whitetail Deer", "Black Bear", "Moose", "Wild Turkey", "Ruffed Grouse", "Coyote"],
  "Emerald Coast": ["Sambar Deer", "Hog Deer", "Feral Pig", "Banteng", "Water Buffalo", "Scrub Hare"],
  "Rocky Mountain": ["Rocky Mountain Elk", "Mule Deer", "Bighorn Sheep", "Mountain Goat", "American Black Bear", "Puma"],
  "Sundarpatan": ["Himalayan Tahr", "Water Buffalo", "Blackbuck", "Axis Deer", "Wild Boar", "Rhesus Macaque"]
};

export const GREAT_ONE_SPECIES = [
  "Whitetail Deer", "Red Deer", "Black Bear", "Moose",
  "Fallow Deer", "Red Fox", "Ring-Necked Pheasant", "Himalayan Tahr"
];

export const MAPS = Object.keys(RESERVE_ANIMALS);

export function getSpeciesForMap(mapName: string): string[] {
  return RESERVE_ANIMALS[mapName as keyof typeof RESERVE_ANIMALS] || [];
}

export function hasGreatOne(species: string): boolean {
  return GREAT_ONE_SPECIES.includes(species);
}
