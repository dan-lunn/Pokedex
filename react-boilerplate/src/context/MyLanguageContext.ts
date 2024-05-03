import { createContext, useContext } from 'react';
import { LanguageContext } from '../types';

// Setup default context
export const MyLanguageContext = createContext<LanguageContext>({
  language: 'english',
  setLanguage: () => {},
});

export const useLanguageContext = () => useContext(MyLanguageContext);