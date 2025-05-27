export interface LocalGrind {
  id: number;
  species: string;
  map: string;
  kills: number;
  diamonds: number;
  rares: number;
  trolls: number;
  goHarvested: boolean;
  createdAt: string;
}

class LocalStorage {
  private readonly GRINDS_KEY = 'grindtracker-grinds';
  private readonly NEXT_ID_KEY = 'grindtracker-next-id';

  private getNextId(): number {
    const currentId = parseInt(localStorage.getItem(this.NEXT_ID_KEY) || '1');
    localStorage.setItem(this.NEXT_ID_KEY, (currentId + 1).toString());
    return currentId;
  }

  getGrinds(): LocalGrind[] {
    const stored = localStorage.getItem(this.GRINDS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  createGrind(grind: Omit<LocalGrind, 'id' | 'createdAt'>): LocalGrind {
    const grinds = this.getGrinds();
    const newGrind: LocalGrind = {
      ...grind,
      id: this.getNextId(),
      createdAt: new Date().toISOString()
    };
    
    grinds.push(newGrind);
    localStorage.setItem(this.GRINDS_KEY, JSON.stringify(grinds));
    return newGrind;
  }

  updateGrind(id: number, updates: Partial<LocalGrind>): LocalGrind | undefined {
    const grinds = this.getGrinds();
    const index = grinds.findIndex(grind => grind.id === id);
    
    if (index === -1) return undefined;
    
    grinds[index] = { ...grinds[index], ...updates };
    localStorage.setItem(this.GRINDS_KEY, JSON.stringify(grinds));
    return grinds[index];
  }

  deleteGrind(id: number): boolean {
    const grinds = this.getGrinds();
    const filtered = grinds.filter(grind => grind.id !== id);
    
    if (filtered.length === grinds.length) return false;
    
    localStorage.setItem(this.GRINDS_KEY, JSON.stringify(filtered));
    return true;
  }
}

export const grindStorage = new LocalStorage();
