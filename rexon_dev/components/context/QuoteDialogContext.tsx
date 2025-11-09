'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface QuoteDialogContextType {
  isDialogOpen: boolean;
  toggleDialog: () => void;
}

const QuoteDialogContext = createContext<QuoteDialogContextType | undefined>(undefined);

export const QuoteDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  return (
    <QuoteDialogContext.Provider value={{ isDialogOpen, toggleDialog }}>
      {children}
    </QuoteDialogContext.Provider>
  );
};

export const useQuoteDialog = () => {
  const context = useContext(QuoteDialogContext);
  if (!context) {
    throw new Error('useQuoteDialog must be used within a QuoteDialogProvider');
  }
  return context;
};
