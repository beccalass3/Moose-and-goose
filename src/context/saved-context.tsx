import { createContext, ReactNode, useContext, useState } from 'react';

type SavedContextType = {
  savedIds: number[];
  toggleSaved: (id: number) => void;
};

const SavedContext = createContext<SavedContextType>({
  savedIds: [],
  toggleSaved: () => {},
});

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  function toggleSaved(id: number) {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((savedId) => savedId !== id) : [...prev, id]
    );
  }

  return (
    <SavedContext.Provider value={{ savedIds, toggleSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  return useContext(SavedContext);
}