// Local Storage Utilities for Nine Hub Tools
// Manages favorites, presets, and export history

export interface ToolPreset {
  id: string;
  toolKey: string;
  name: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ExportHistory {
  id: string;
  toolKey: string;
  format: string;
  data: string;
  timestamp: string;
}

const STORAGE_KEYS = {
  FAVORITES: 'nine_hub_favorites',
  PRESETS: 'nine_hub_presets',
  EXPORT_HISTORY: 'nine_hub_export_history',
  THEME_PREFERENCE: 'nine_hub_theme',
} as const;

// Favorites Management
export const getFavorites = (): string[] => {
  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const addFavorite = (toolKey: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(toolKey)) {
    favorites.push(toolKey);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }
};

export const removeFavorite = (toolKey: string): void => {
  const favorites = getFavorites();
  const updated = favorites.filter(key => key !== toolKey);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
};

export const toggleFavorite = (toolKey: string): boolean => {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(toolKey);
  
  if (isFavorite) {
    removeFavorite(toolKey);
    return false;
  } else {
    addFavorite(toolKey);
    return true;
  }
};

export const isFavorite = (toolKey: string): boolean => {
  return getFavorites().includes(toolKey);
};

// Presets Management
export const getPresets = (toolKey?: string): ToolPreset[] => {
  try {
    const presets = localStorage.getItem(STORAGE_KEYS.PRESETS);
    const allPresets: ToolPreset[] = presets ? JSON.parse(presets) : [];
    
    if (toolKey) {
      return allPresets.filter(preset => preset.toolKey === toolKey);
    }
    
    return allPresets;
  } catch (error) {
    console.error('Error reading presets:', error);
    return [];
  }
};

export const savePreset = (preset: Omit<ToolPreset, 'id' | 'createdAt' | 'updatedAt'>): ToolPreset => {
  const presets = getPresets();
  const now = new Date().toISOString();
  
  const newPreset: ToolPreset = {
    ...preset,
    id: `preset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  };
  
  presets.push(newPreset);
  localStorage.setItem(STORAGE_KEYS.PRESETS, JSON.stringify(presets));
  
  return newPreset;
};

export const updatePreset = (id: string, updates: Partial<Omit<ToolPreset, 'id' | 'createdAt'>>): ToolPreset | null => {
  const presets = getPresets();
  const index = presets.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const updatedPreset: ToolPreset = {
    ...presets[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  presets[index] = updatedPreset;
  localStorage.setItem(STORAGE_KEYS.PRESETS, JSON.stringify(presets));
  
  return updatedPreset;
};

export const deletePreset = (id: string): void => {
  const presets = getPresets();
  const updated = presets.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRESETS, JSON.stringify(updated));
};

// Export History Management
export const getExportHistory = (toolKey?: string, limit?: number): ExportHistory[] => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.EXPORT_HISTORY);
    let allHistory: ExportHistory[] = history ? JSON.parse(history) : [];
    
    if (toolKey) {
      allHistory = allHistory.filter(item => item.toolKey === toolKey);
    }
    
    // Sort by timestamp (newest first)
    allHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    if (limit) {
      return allHistory.slice(0, limit);
    }
    
    return allHistory;
  } catch (error) {
    console.error('Error reading export history:', error);
    return [];
  }
};

export const addToExportHistory = (item: Omit<ExportHistory, 'id' | 'timestamp'>): void => {
  const history = getExportHistory();
  const maxHistory = 50; // Keep last 50 exports
  
  const newItem: ExportHistory = {
    ...item,
    id: `export_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
  
  // Add to beginning and limit size
  history.unshift(newItem);
  const trimmed = history.slice(0, maxHistory);
  
  localStorage.setItem(STORAGE_KEYS.EXPORT_HISTORY, JSON.stringify(trimmed));
};

export const clearExportHistory = (toolKey?: string): void => {
  if (toolKey) {
    const history = getExportHistory();
    const filtered = history.filter(item => item.toolKey !== toolKey);
    localStorage.setItem(STORAGE_KEYS.EXPORT_HISTORY, JSON.stringify(filtered));
  } else {
    localStorage.removeItem(STORAGE_KEYS.EXPORT_HISTORY);
  }
};

// Utility to get storage usage
export const getStorageUsage = () => {
  const usage = {
    favorites: getFavorites().length,
    presets: getPresets().length,
    exports: getExportHistory().length,
  };
  
  return usage;
};

// Clear all app data
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    if (key !== STORAGE_KEYS.THEME_PREFERENCE) {
      localStorage.removeItem(key);
    }
  });
};
