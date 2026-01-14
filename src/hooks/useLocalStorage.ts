import { useState, useEffect, useCallback } from 'react';
import {
  getFavorites,
  toggleFavorite as toggleFav,
  isFavorite as checkFavorite,
  getPresets,
  savePreset as savePresetUtil,
  updatePreset as updatePresetUtil,
  deletePreset as deletePresetUtil,
  getExportHistory,
  addToExportHistory as addExport,
  clearExportHistory as clearHistory,
  ToolPreset,
  ExportHistory,
} from '@/lib/storage';

// Hook for managing favorites
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = useCallback((toolKey: string) => {
    const newState = toggleFav(toolKey);
    setFavorites(getFavorites());
    return newState;
  }, []);

  const isFavorite = useCallback((toolKey: string) => {
    return checkFavorite(toolKey);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};

// Hook for managing presets
export const usePresets = (toolKey?: string) => {
  const [presets, setPresets] = useState<ToolPreset[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPresets = useCallback(() => {
    setLoading(true);
    const loaded = getPresets(toolKey);
    setPresets(loaded);
    setLoading(false);
  }, [toolKey]);

  useEffect(() => {
    loadPresets();
  }, [loadPresets]);

  const savePreset = useCallback((preset: Omit<ToolPreset, 'id' | 'createdAt' | 'updatedAt'>) => {
    const saved = savePresetUtil(preset);
    loadPresets();
    return saved;
  }, [loadPresets]);

  const updatePreset = useCallback((id: string, updates: Partial<Omit<ToolPreset, 'id' | 'createdAt'>>) => {
    const updated = updatePresetUtil(id, updates);
    loadPresets();
    return updated;
  }, [loadPresets]);

  const deletePreset = useCallback((id: string) => {
    deletePresetUtil(id);
    loadPresets();
  }, [loadPresets]);

  return {
    presets,
    loading,
    savePreset,
    updatePreset,
    deletePreset,
    refresh: loadPresets,
  };
};

// Hook for managing export history
export const useExportHistory = (toolKey?: string, limit?: number) => {
  const [history, setHistory] = useState<ExportHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(() => {
    setLoading(true);
    const loaded = getExportHistory(toolKey, limit);
    setHistory(loaded);
    setLoading(false);
  }, [toolKey, limit]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const addToHistory = useCallback((item: Omit<ExportHistory, 'id' | 'timestamp'>) => {
    addExport(item);
    loadHistory();
  }, [loadHistory]);

  const clearHistory = useCallback(() => {
    clearHistory(toolKey);
    loadHistory();
  }, [toolKey, loadHistory]);

  return {
    history,
    loading,
    addToHistory,
    clearHistory,
    refresh: loadHistory,
  };
};

// Hook for copy to clipboard with animation feedback
export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  }, []);

  return { copied, copy };
};
