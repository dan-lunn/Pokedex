import { useState, useEffect, useRef } from 'react';
import { useLanguageContext } from '../context/MyLanguageContext';
import { Button } from './Button';
import { DropdownItem } from './DropdownItem';
import { Languages } from '../types';

const SUPPORTED_LANGUAGES = ['English', 'Japanese', 'Chinese', 'French'];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setLanguage } = useLanguageContext();

  // Click handler attached to document to close Dropdown if click is outside of element
  const handleDocumentClick = (event: MouseEvent): void => {
    if (event.target instanceof Element &&
      event.target.closest(`#${dropdownRef.current?.id}`) === null &&
      isOpen) {
        setIsOpen(false);
    }
  }

  // Update context used to render Hits
  const setLanguageHandler = (value: string) => {
    localStorage.setItem('language', value.toLowerCase());
    setLanguage(value.toLowerCase() as keyof Languages)
    setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
    }
  })

  return (
    <div id="language-selector" ref={dropdownRef}>
      <Button label={'Select Language'} onClick={() => setIsOpen(isOpen => !isOpen)} />
      {isOpen && <DropdownItem data={SUPPORTED_LANGUAGES} onClick={setLanguageHandler} />}
    </div>
  )
}