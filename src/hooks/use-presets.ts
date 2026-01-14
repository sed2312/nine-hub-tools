import { useState, useEffect, useCallback } from 'react';

interface Preset<T> {
  id: string;
  name: string;
  data: T;
  createdAt: number;
}

export function usePresets<T>(toolName: string, currentState: T) {
  const storageKey = `nineproo-presets-${toolName}`;
  const [presets, setPresets] = useState<Preset<T>[]>([]);

  // Load presets from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setPresets(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load presets:', e);
    }
  }, [storageKey]);

  // Save presets to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(presets));
    } catch (e) {
      console.error('Failed to save presets:', e);
    }
  }, [presets, storageKey]);

  const savePreset = useCallback(
    (name: string) => {
      const newPreset: Preset<T> = {
        id: crypto.randomUUID(),
        name,
        data: currentState,
        createdAt: Date.now(),
      };
      setPresets((prev) => [...prev, newPreset]);
      return newPreset;
    },
    [currentState]
  );

  const deletePreset = useCallback((id: string) => {
    setPresets((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getShareableUrl = useCallback(() => {
    try {
      const encoded = btoa(JSON.stringify(currentState));
      const url = new URL(window.location.href);
      url.searchParams.set('preset', encoded);
      return url.toString();
    } catch (e) {
      console.error('Failed to create shareable URL:', e);
      return null;
    }
  }, [currentState]);

  const loadFromUrl = useCallback((): T | null => {
    try {
      const url = new URL(window.location.href);
      const preset = url.searchParams.get('preset');
      if (preset) {
        return JSON.parse(atob(preset));
      }
    } catch (e) {
      console.error('Failed to load preset from URL:', e);
    }
    return null;
  }, []);

  return {
    presets,
    savePreset,
    deletePreset,
    getShareableUrl,
    loadFromUrl,
  };
}
