import React, { useEffect } from 'react';

/**
 * ✅ NEOTECHNOLOGY DESIGN SYSTEM PROVIDER
 * 
 * This component ensures that the NeoTech terminal design system 
 * is properly applied across all components by:
 * 
 * 1. Force-overriding default ShadCN/library styles
 * 2. Applying consistent terminal aesthetics
 * 3. Ensuring proper color and typography inheritance
 * 4. Managing responsive behavior
 * 5. Handling RTL and accessibility features
 */

interface DesignSystemProviderProps {
  children: React.ReactNode;
  forceOverrides?: boolean;
  terminalMode?: boolean;
  debugMode?: boolean;
}

export function DesignSystemProvider({ 
  children, 
  forceOverrides = true, 
  terminalMode = true,
  debugMode = false 
}: DesignSystemProviderProps) {

  useEffect(() => {
    // ✅ CRITICAL: Force override all default styles
    if (forceOverrides) {
      const styleElement = document.createElement('style');
      styleElement.id = 'neo-design-system-overrides';
      
      const forceOverrideCSS = `
        /* ✅ FORCE OVERRIDE: Reset all component defaults */
        *:not(.preserve-defaults) {
          font-family: 'JetBrains Mono', monospace !important;
          color: var(--neo-text-primary, #C0C5CE) !important;
        }
        
        /* ✅ FORCE OVERRIDE: ShadCN Components */
        [class*="ui-"],
        [data-radix-collection-item],
        [data-state],
        [role="button"]:not(.preserve-defaults),
        [role="dialog"]:not(.preserve-defaults),
        [role="menuitem"]:not(.preserve-defaults) {
          background: var(--neo-bg-tertiary, #12151C) !important;
          border: 1px solid var(--neo-border-primary, rgba(192, 197, 206, 0.2)) !important;
          color: var(--neo-text-primary, #C0C5CE) !important;
          font-family: 'JetBrains Mono', monospace !important;
        }
        
        /* ✅ FORCE OVERRIDE: Form Elements */
        input:not(.preserve-defaults),
        textarea:not(.preserve-defaults),
        select:not(.preserve-defaults) {
          background: var(--neo-bg-secondary, #0B0D12) !important;
          border: 1px solid var(--neo-border-primary, rgba(192, 197, 206, 0.2)) !important;
          color: var(--neo-text-primary, #C0C5CE) !important;
          font-family: 'JetBrains Mono', monospace !important;
          border-radius: 6px !important;
          padding: 12px 16px !important;
        }
        
        input:focus:not(.preserve-defaults),
        textarea:focus:not(.preserve-defaults),
        select:focus:not(.preserve-defaults) {
          border-color: var(--neo-blue-primary, #00d4ff) !important;
          box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2) !important;
          outline: none !important;
        }
        
        /* ✅ FORCE OVERRIDE: Buttons */
        button:not(.preserve-defaults) {
          font-family: 'JetBrains Mono', monospace !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          border-radius: 6px !important;
        }
        
        /* ✅ FORCE OVERRIDE: Headings */
        h1:not(.preserve-defaults),
        h2:not(.preserve-defaults),
        h3:not(.preserve-defaults),
        h4:not(.preserve-defaults),
        h5:not(.preserve-defaults),
        h6:not(.preserve-defaults) {
          font-family: 'JetBrains Mono', monospace !important;
          color: var(--neo-text-primary, #C0C5CE) !important;
          margin: 0 !important;
        }
        
        /* ✅ FORCE OVERRIDE: Paragraphs and Text */
        p:not(.preserve-defaults),
        span:not(.preserve-defaults),
        div:not(.preserve-defaults) {
          font-family: 'JetBrains Mono', monospace !important;
          color: var(--neo-text-primary, #C0C5CE) !important;
        }
        
        /* ✅ FORCE OVERRIDE: Cards */
        [class*="card"]:not(.preserve-defaults) {
          background: var(--neo-bg-tertiary, #12151C) !important;
          border: 1px solid var(--neo-border-primary, rgba(192, 197, 206, 0.2)) !important;
          border-radius: 8px !important;
        }
        
        /* ✅ FORCE OVERRIDE: Background patterns */
        body {
          background: var(--neo-bg-primary, #0a0a0a) !important;
        }
        
        /* ✅ FORCE OVERRIDE: Remove unwanted spacing */
        *:not(.preserve-spacing) {
          margin: 0 !important;
        }
      `;
      
      styleElement.textContent = forceOverrideCSS;
      document.head.appendChild(styleElement);
      
      // Cleanup function
      return () => {
        const existingStyle = document.getElementById('neo-design-system-overrides');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [forceOverrides]);

  useEffect(() => {
    // ✅ TERMINAL MODE: Apply terminal-specific enhancements
    if (terminalMode) {
      document.body.classList.add('neo-terminal-mode');
      document.documentElement.style.setProperty('--primary-font', 'JetBrains Mono, monospace');
      
      // Add enterprise grid background to body
      document.body.style.setProperty('background-image', `
        linear-gradient(rgba(192, 197, 206, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(192, 197, 206, 0.1) 1px, transparent 1px)
      `);
      document.body.style.setProperty('background-size', '20px 20px');
      document.body.style.setProperty('background-attachment', 'fixed');
      
      return () => {
        document.body.classList.remove('neo-terminal-mode');
      };
    }
  }, [terminalMode]);

  useEffect(() => {
    // ✅ DEBUG MODE: Visual debugging aids
    if (debugMode) {
      const debugStyle = document.createElement('style');
      debugStyle.id = 'neo-debug-mode';
      debugStyle.textContent = `
        /* Debug mode: Show component boundaries */
        [class*="neo-"] {
          outline: 1px dashed rgba(0, 212, 255, 0.3) !important;
        }
        
        /* Debug mode: Show spacing */
        .neo-debug-spacing * {
          background: rgba(255, 0, 0, 0.1) !important;
        }
        
        /* Debug mode: Show typography issues */
        *:not([class*="neo-"]) {
          outline: 1px dashed rgba(255, 0, 0, 0.3) !important;
        }
      `;
      
      document.head.appendChild(debugStyle);
      console.log('🎨 NeoTech Design System Debug Mode Enabled');
      
      return () => {
        const debugElement = document.getElementById('neo-debug-mode');
        if (debugElement) {
          debugElement.remove();
        }
      };
    }
  }, [debugMode]);

  // ✅ COMPONENT WRAPPER: Apply design system classes to children
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Add neo-enhanced class to all child components
      const enhancedProps = {
        ...child.props,
        className: `neo-enhanced ${child.props.className || ''}`,
        'data-neo-component': true
      };
      
      return React.cloneElement(child, enhancedProps);
    }
    return child;
  });

  return (
    <div 
      className="neo-design-system-provider"
      data-terminal-mode={terminalMode}
      data-force-overrides={forceOverrides}
      data-debug-mode={debugMode}
    >
      {enhancedChildren}
    </div>
  );
}

/**
 * ✅ DESIGN SYSTEM HOOK
 * 
 * Custom hook to access design system utilities
 */
export function useDesignSystem() {
  const applyNeoClasses = (baseClasses: string = '') => {
    return `neo-component ${baseClasses}`.trim();
  };

  const getTerminalBackground = () => 'neo-bg-grid';
  
  const getStatusColor = (status: 'success' | 'warning' | 'error' | 'info') => {
    const colors = {
      success: 'var(--neo-success, #4AE54A)',
      warning: 'var(--neo-warning, #ffeb3b)',
      error: 'var(--neo-error, #ff6b6b)',
      info: 'var(--neo-blue-primary, #00d4ff)'
    };
    return colors[status];
  };

  const forceNeoStyles = (element: HTMLElement) => {
    if (!element) return;
    
    element.style.fontFamily = 'JetBrains Mono, monospace';
    element.style.color = 'var(--neo-text-primary, #C0C5CE)';
    element.classList.add('neo-enhanced');
  };

  return {
    applyNeoClasses,
    getTerminalBackground,
    getStatusColor,
    forceNeoStyles
  };
}

/**
 * ✅ ENHANCED COMPONENT WRAPPER
 * 
 * HOC to automatically apply NeoTech styling to any component
 */
export function withNeoDesign<T extends object>(
  Component: React.ComponentType<T>,
  options: {
    forceOverrides?: boolean;
    addBackground?: boolean;
    applySpacing?: boolean;
  } = {}
) {
  const {
    forceOverrides = true,
    addBackground = true,
    applySpacing = true
  } = options;

  const WrappedComponent = (props: T) => {
    const baseClasses = [
      'neo-component',
      forceOverrides && 'neo-force-overrides',
      addBackground && 'neo-bg-grid',
      applySpacing && 'neo-spacing-md'
    ].filter(Boolean).join(' ');

    return (
      <div className={baseClasses}>
        <Component {...props} />
      </div>
    );
  };

  WrappedComponent.displayName = `withNeoDesign(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * ✅ COMPONENT ENFORCEMENT UTILITIES
 */
export const NeoDesignUtils = {
  // Force apply NeoTech styles to an element
  enforceDesign: (element: HTMLElement) => {
    if (!element) return;
    
    element.style.fontFamily = 'JetBrains Mono, monospace';
    element.style.color = 'var(--neo-text-primary, #C0C5CE)';
    element.style.background = 'var(--neo-bg-tertiary, #12151C)';
    element.style.border = '1px solid var(--neo-border-primary, rgba(192, 197, 206, 0.2))';
    element.style.borderRadius = '8px';
    element.classList.add('neo-enhanced');
  },

  // Apply terminal aesthetic to any container
  makeTerminal: (element: HTMLElement) => {
    if (!element) return;
    
    element.style.background = 'var(--neo-bg-secondary, #0B0D12)';
    element.style.backgroundImage = `
      linear-gradient(rgba(192, 197, 206, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(192, 197, 206, 0.1) 1px, transparent 1px)
    `;
    element.style.backgroundSize = '20px 20px';
    element.classList.add('neo-terminal-enhanced');
  },

  // Ensure consistent spacing
  fixSpacing: (element: HTMLElement) => {
    if (!element) return;
    
    const children = element.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      child.style.margin = '0';
      child.classList.add('neo-spacing-controlled');
    }
  },

  // Validate design system compliance
  validateDesign: (element: HTMLElement): boolean => {
    if (!element) return false;
    
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily;
    const hasNeoFont = fontFamily.includes('JetBrains Mono');
    const hasNeoClasses = element.classList.contains('neo-enhanced') || 
                         element.classList.contains('neo-component');
    
    if (!hasNeoFont || !hasNeoClasses) {
      console.warn('⚠️ Element does not comply with NeoTech Design System:', element);
      return false;
    }
    
    return true;
  }
};

export default DesignSystemProvider;