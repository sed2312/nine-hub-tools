import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Preset {
  id: string;
  name: string;
  toolId: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export const useSavedPresets = (toolId: string) => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load presets from localStorage (fallback if not logged in)
  useEffect(() => {
    const loadLocalPresets = () => {
      const key = `nineproo_presets_${toolId}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          setPresets(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse presets:', e);
        }
      }
      setLoading(false);
    };

    loadLocalPresets();
  }, [toolId]);

  const savePreset = async (name: string, data: Record<string, unknown>) => {
    const newPreset: Preset = {
      id: Date.now().toString(),
      name,
      toolId,
      data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newPresets = [...presets, newPreset];
    setPresets(newPresets);
    
    const key = `nineproo_presets_${toolId}`;
    localStorage.setItem(key, JSON.stringify(newPresets));

    toast({
      title: 'Preset saved',
      description: `"${name}" has been saved successfully.`,
    });

    return newPreset;
  };

  const deletePreset = async (presetId: string) => {
    const newPresets = presets.filter(p => p.id !== presetId);
    setPresets(newPresets);
    
    const key = `nineproo_presets_${toolId}`;
    localStorage.setItem(key, JSON.stringify(newPresets));

    toast({
      title: 'Preset deleted',
      description: 'The preset has been removed.',
    });
  };

  const loadPreset = (presetId: string) => {
    return presets.find(p => p.id === presetId);
  };

  return {
    presets,
    loading,
    savePreset,
    deletePreset,
    loadPreset
  };
};
