'use client';

import { useEffect, useCallback } from 'react';
import { useUIStore } from '@/store/uiStore';

export function useKeyboardShortcuts() {
  const { toggleCommandPalette, toggleAddLinkModal, toggleSidebar } = useUIStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMeta = e.ctrlKey || e.metaKey;

      if (isMeta && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      if (isMeta && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        toggleAddLinkModal();
        return;
      }

      if (isMeta && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      if (e.key === 'Escape') {
        const state = useUIStore.getState();
        if (state.commandPaletteOpen) {
          state.toggleCommandPalette();
        }
        if (state.addLinkModalOpen) {
          state.toggleAddLinkModal();
        }
      }
    },
    [toggleCommandPalette, toggleAddLinkModal, toggleSidebar]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
