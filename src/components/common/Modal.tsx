import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { getUIStyleClasses } from '../../utils/uiStyles';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  initialFocusRef?: React.RefObject<HTMLElement>;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
  maxWidth = '2xl',
  initialFocusRef,
}) => {
  const { theme, uiStyle } = useTheme();
  const uiClasses = getUIStyleClasses(uiStyle, theme);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Remember the previously focused element to return focus on modal close
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    // 2. Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 3. Set initial focus inside modal
    const focusTimer = setTimeout(() => {
      if (initialFocusRef && initialFocusRef.current) {
        initialFocusRef.current.focus();
      } else if (modalRef.current) {
        const nodeList = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable: HTMLElement[] = [];
        for (let i = 0; i < nodeList.length; i++) {
          const el = nodeList[i] as HTMLElement;
          if (!el.hasAttribute('disabled') && el.offsetParent !== null) {
            focusable.push(el);
          }
        }
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 20);

    // 4. Keyboard Navigation: Escape key and Focus Trap (Tab / Shift+Tab)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const nodeList = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableElements: HTMLElement[] = [];
        for (let i = 0; i < nodeList.length; i++) {
          const el = nodeList[i] as HTMLElement;
          if (!el.hasAttribute('disabled') && el.offsetParent !== null) {
            focusableElements.push(el);
          }
        }

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;

      // Restore focus to trigger element
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose, initialFocusRef]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full ${maxWidthClasses} ${uiClasses.modal} z-10 flex flex-col max-h-[90vh] overflow-hidden outline-none animate-in fade-in-0 zoom-in-95 duration-150`}
        style={{
          borderColor: theme.palette.border,
        }}
      >
        {/* Header */}
        <div
          className={`flex items-start justify-between p-4 sm:p-5 border-b ${uiClasses.header}`}
          style={{
            borderColor: theme.palette.border,
          }}
        >
          <div className="flex items-center gap-2.5">
            {icon && (
              <div
                className="p-2 rounded-xl border flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: theme.category === 'dark' ? '#020617' : '#f1f5f9',
                  borderColor: theme.palette.border,
                  color: theme.palette.primary,
                }}
              >
                {icon}
              </div>
            )}
            <div>
              <h2
                id="modal-title"
                className="text-base sm:text-lg font-bold"
                style={{ color: theme.palette.text }}
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  className="text-xs mt-0.5"
                  style={{ color: theme.category === 'dark' ? '#94a3b8' : '#64748b' }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition cursor-pointer ${uiClasses.buttonSecondary}`}
            aria-label="モーダルを閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div
            className={`p-4 sm:p-5 border-t flex items-center justify-end gap-2 ${uiClasses.header}`}
            style={{
              borderColor: theme.palette.border,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
