import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

/**
 * ✅ ENHANCED NEOTECHNOLOGY COMPONENTS
 * 
 * These components ensure perfect application of the NeoTech design system
 * by force-overriding default styles and providing consistent terminal aesthetics.
 */

// ========================================================================
// ENHANCED BUTTON COMPONENT
// ========================================================================

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const NeoButton = forwardRef<HTMLButtonElement, NeoButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    icon,
    fullWidth = false,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = 'neo-btn';
    const variantClasses = `neo-btn-${variant}`;
    const sizeClasses = `neo-btn-${size}`;
    const widthClasses = fullWidth ? 'w-full' : '';
    const loadingClasses = isLoading ? 'opacity-70 cursor-not-allowed' : '';

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses,
          sizeClasses,
          widthClasses,
          loadingClasses,
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <div className="neo-animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
        )}
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

NeoButton.displayName = 'NeoButton';

// ========================================================================
// ENHANCED CARD COMPONENT
// ========================================================================

interface NeoCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'terminal' | 'widget';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glowEffect?: boolean;
}

export const NeoCard = forwardRef<HTMLDivElement, NeoCardProps>(
  ({ 
    className, 
    variant = 'default',
    padding = 'md',
    hover = false,
    glowEffect = false,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'neo-card';
    const variantClasses = variant === 'interactive' ? 'neo-card-interactive' :
                          variant === 'terminal' ? 'neo-terminal-enhanced' :
                          variant === 'widget' ? 'neo-dashboard-widget' : '';
    const paddingClasses = padding === 'none' ? '' :
                          padding === 'sm' ? 'neo-padding-sm' :
                          padding === 'lg' ? 'neo-padding-lg' :
                          padding === 'xl' ? 'neo-padding-xl' :
                          'neo-padding-md';
    const hoverClasses = hover ? 'neo-hover-lift' : '';
    const glowClasses = glowEffect ? 'neo-glow' : '';

    return (
      <div
        className={cn(
          baseClasses,
          variantClasses,
          paddingClasses,
          hoverClasses,
          glowClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeoCard.displayName = 'NeoCard';

// ========================================================================
// ENHANCED INPUT COMPONENT
// ========================================================================

interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'terminal' | 'transparent';
  error?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  helperText?: string;
  label?: string;
  required?: boolean;
}

export const NeoInput = forwardRef<HTMLInputElement, NeoInputProps>(
  ({ 
    className, 
    variant = 'default',
    error = false,
    success = false,
    icon,
    helperText,
    label,
    required = false,
    ...props 
  }, ref) => {
    const baseClasses = 'neo-input';
    const variantClasses = variant === 'terminal' ? 'neo-terminal-input' :
                          variant === 'transparent' ? 'bg-transparent' : '';
    const stateClasses = error ? 'neo-border-error' :
                        success ? 'neo-border-success' : '';

    return (
      <div className="neo-form-group">
        {label && (
          <label className={cn('neo-form-label', required && 'required')}>
            {label}
          </label>
        )}
        <div className="neo-relative">
          {icon && (
            <div className="neo-absolute neo-left-0 neo-top-0 h-full neo-flex neo-items-center neo-justify-center w-10 text-neo-text-muted">
              {icon}
            </div>
          )}
          <input
            className={cn(
              baseClasses,
              variantClasses,
              stateClasses,
              icon && 'pl-10',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {helperText && (
          <div className={cn(
            'neo-form-help',
            error && 'neo-form-error',
            success && 'neo-text-success'
          )}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

NeoInput.displayName = 'NeoInput';

// ========================================================================
// ENHANCED TEXTAREA COMPONENT
// ========================================================================

interface NeoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const NeoTextarea = forwardRef<HTMLTextAreaElement, NeoTextareaProps>(
  ({ 
    className, 
    error = false,
    success = false,
    helperText,
    label,
    required = false,
    resize = 'vertical',
    ...props 
  }, ref) => {
    const baseClasses = 'neo-input neo-textarea';
    const stateClasses = error ? 'neo-border-error' :
                        success ? 'neo-border-success' : '';
    const resizeClasses = `resize-${resize}`;

    return (
      <div className="neo-form-group">
        {label && (
          <label className={cn('neo-form-label', required && 'required')}>
            {label}
          </label>
        )}
        <textarea
          className={cn(
            baseClasses,
            stateClasses,
            resizeClasses,
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <div className={cn(
            'neo-form-help',
            error && 'neo-form-error',
            success && 'neo-text-success'
          )}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

NeoTextarea.displayName = 'NeoTextarea';

// ========================================================================
// ENHANCED SELECT COMPONENT
// ========================================================================

interface NeoSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  success?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
}

export const NeoSelect = forwardRef<HTMLSelectElement, NeoSelectProps>(
  ({ 
    className, 
    error = false,
    success = false,
    helperText,
    label,
    required = false,
    options,
    placeholder,
    ...props 
  }, ref) => {
    const baseClasses = 'neo-select';
    const stateClasses = error ? 'neo-border-error' :
                        success ? 'neo-border-success' : '';

    return (
      <div className="neo-form-group">
        {label && (
          <label className={cn('neo-form-label', required && 'required')}>
            {label}
          </label>
        )}
        <select
          className={cn(
            baseClasses,
            stateClasses,
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {helperText && (
          <div className={cn(
            'neo-form-help',
            error && 'neo-form-error',
            success && 'neo-text-success'
          )}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

NeoSelect.displayName = 'NeoSelect';

// ========================================================================
// ENHANCED BADGE COMPONENT
// ========================================================================

interface NeoBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  icon?: React.ReactNode;
}

export const NeoBadge = forwardRef<HTMLSpanElement, NeoBadgeProps>(
  ({ 
    className, 
    variant = 'primary',
    size = 'md',
    pulse = false,
    icon,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'neo-badge';
    const variantClasses = `neo-badge-${variant}`;
    const sizeClasses = size === 'sm' ? 'text-xs px-2 py-1' :
                       size === 'lg' ? 'text-sm px-3 py-2' :
                       'text-xs px-2 py-1';
    const pulseClasses = pulse ? 'neo-animate-pulse-glow' : '';

    return (
      <span
        className={cn(
          baseClasses,
          variantClasses,
          sizeClasses,
          pulseClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </span>
    );
  }
);

NeoBadge.displayName = 'NeoBadge';

// ========================================================================
// ENHANCED TYPOGRAPHY COMPONENTS
// ========================================================================

interface NeoHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  gradient?: boolean;
  glow?: boolean;
  center?: boolean;
}

export const NeoHeading = forwardRef<HTMLHeadingElement, NeoHeadingProps>(
  ({ 
    className, 
    level,
    gradient = false,
    glow = false,
    center = false,
    children, 
    ...props 
  }, ref) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;
    const baseClasses = `neo-heading-${level}`;
    const gradientClasses = gradient ? 'neo-text-gradient' : '';
    const glowClasses = glow ? 'holographic-text' : '';
    const centerClasses = center ? 'text-center' : '';

    return React.createElement(
      Component,
      {
        className: cn(
          baseClasses,
          gradientClasses,
          glowClasses,
          centerClasses,
          className
        ),
        ref,
        ...props
      },
      children
    );
  }
);

NeoHeading.displayName = 'NeoHeading';

interface NeoTextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'body-sm' | 'body-xs' | 'caption';
  muted?: boolean;
  center?: boolean;
  gradient?: boolean;
}

export const NeoText = forwardRef<HTMLParagraphElement, NeoTextProps>(
  ({ 
    className, 
    variant = 'body',
    muted = false,
    center = false,
    gradient = false,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = `neo-${variant}`;
    const mutedClasses = muted ? 'neo-text-muted' : '';
    const centerClasses = center ? 'text-center' : '';
    const gradientClasses = gradient ? 'neo-text-gradient' : '';

    return (
      <p
        className={cn(
          baseClasses,
          mutedClasses,
          centerClasses,
          gradientClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    );
  }
);

NeoText.displayName = 'NeoText';

// ========================================================================
// ENHANCED CONTAINER COMPONENTS
// ========================================================================

interface NeoContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
  padding?: boolean;
}

export const NeoContainer = forwardRef<HTMLDivElement, NeoContainerProps>(
  ({ 
    className, 
    size = 'lg',
    center = true,
    padding = true,
    children, 
    ...props 
  }, ref) => {
    const maxWidthClasses = size === 'sm' ? 'max-w-2xl' :
                           size === 'md' ? 'max-w-4xl' :
                           size === 'lg' ? 'max-w-6xl' :
                           size === 'xl' ? 'max-w-7xl' :
                           'max-w-full';
    const centerClasses = center ? 'mx-auto' : '';
    const paddingClasses = padding ? 'neo-padding-lg' : '';

    return (
      <div
        className={cn(
          'neo-container',
          maxWidthClasses,
          centerClasses,
          paddingClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeoContainer.displayName = 'NeoContainer';

interface NeoSectionProps extends HTMLAttributes<HTMLElement> {
  background?: 'primary' | 'secondary' | 'grid' | 'neural';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  fullHeight?: boolean;
}

export const NeoSection = forwardRef<HTMLElement, NeoSectionProps>(
  ({ 
    className, 
    background = 'primary',
    padding = 'xl',
    fullHeight = false,
    children, 
    ...props 
  }, ref) => {
    const backgroundClasses = background === 'secondary' ? 'neo-bg-secondary' :
                             background === 'grid' ? 'neo-bg-grid' :
                             background === 'neural' ? 'neo-bg-neural' :
                             'neo-bg-primary';
    const paddingClasses = padding === 'none' ? '' :
                          padding === 'sm' ? 'py-8' :
                          padding === 'md' ? 'py-16' :
                          padding === 'lg' ? 'py-24' :
                          'py-32';
    const heightClasses = fullHeight ? 'min-h-screen' : '';

    return (
      <section
        className={cn(
          'neo-section',
          backgroundClasses,
          paddingClasses,
          heightClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    );
  }
);

NeoSection.displayName = 'NeoSection';

// ========================================================================
// ENHANCED LAYOUT COMPONENTS
// ========================================================================

interface NeoFlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const NeoFlex = forwardRef<HTMLDivElement, NeoFlexProps>(
  ({ 
    className, 
    direction = 'row',
    align = 'start',
    justify = 'start',
    wrap = false,
    gap = 'md',
    children, 
    ...props 
  }, ref) => {
    const directionClasses = `neo-flex-${direction}`;
    const alignClasses = `neo-items-${align}`;
    const justifyClasses = `neo-justify-${justify}`;
    const wrapClasses = wrap ? 'neo-flex-wrap' : 'neo-flex-nowrap';
    const gapClasses = `neo-gap-${gap}`;

    return (
      <div
        className={cn(
          'neo-flex',
          directionClasses,
          alignClasses,
          justifyClasses,
          wrapClasses,
          gapClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeoFlex.displayName = 'NeoFlex';

interface NeoGridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12 | 'auto';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

export const NeoGrid = forwardRef<HTMLDivElement, NeoGridProps>(
  ({ 
    className, 
    cols = 'auto',
    gap = 'md',
    responsive = true,
    children, 
    ...props 
  }, ref) => {
    const colsClasses = cols === 'auto' ? 'neo-grid-auto' :
                       responsive ? `grid-cols-1 md:grid-cols-${cols}` :
                       `neo-grid-cols-${cols}`;
    const gapClasses = `neo-gap-${gap}`;

    return (
      <div
        className={cn(
          'neo-grid',
          colsClasses,
          gapClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeoGrid.displayName = 'NeoGrid';

// ========================================================================
// ENHANCED TERMINAL COMPONENTS
// ========================================================================

interface NeoTerminalProps extends HTMLAttributes<HTMLDivElement> {
  header?: boolean;
  title?: string;
  animated?: boolean;
  glowEffect?: boolean;
}

export const NeoTerminal = forwardRef<HTMLDivElement, NeoTerminalProps>(
  ({ 
    className, 
    header = true,
    title = 'neo@technology:~$',
    animated = false,
    glowEffect = false,
    children, 
    ...props 
  }, ref) => {
    const glowClasses = glowEffect ? 'neo-glow' : '';
    const animatedClasses = animated ? 'neo-animate-terminal-scan' : '';

    return (
      <div
        className={cn(
          'neo-card',
          'overflow-hidden',
          glowClasses,
          animatedClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {header && (
          <div className="neo-flex neo-items-center neo-justify-between neo-padding-md neo-bg-secondary neo-border-b">
            <div className="neo-flex neo-gap-sm">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="neo-body-xs neo-text-blue">
              {title}
            </div>
          </div>
        )}
        <div className="neo-padding-lg neo-bg-secondary">
          {children}
        </div>
      </div>
    );
  }
);

NeoTerminal.displayName = 'NeoTerminal';

// ========================================================================
// ENHANCED LOADING COMPONENT
// ========================================================================

interface NeoLoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse' | 'matrix';
  text?: string;
  fullScreen?: boolean;
}

export const NeoLoading = forwardRef<HTMLDivElement, NeoLoadingProps>(
  ({ 
    className, 
    size = 'md',
    variant = 'spinner',
    text,
    fullScreen = false,
    ...props 
  }, ref) => {
    const sizeClasses = size === 'sm' ? 'w-4 h-4' :
                       size === 'lg' ? 'w-12 h-12' :
                       'w-8 h-8';
    
    const containerClasses = fullScreen ? 
      'neo-fixed neo-inset-0 neo-flex-center neo-bg-primary neo-z-modal' :
      'neo-flex-center neo-padding-lg';

    const LoadingElement = () => {
      switch (variant) {
        case 'dots':
          return (
            <div className="neo-flex neo-gap-sm">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-full neo-bg-blue',
                    sizeClasses,
                    'neo-animate-pulse'
                  )}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          );
        case 'pulse':
          return (
            <div className={cn(
              'rounded-full neo-bg-blue neo-animate-pulse-glow',
              sizeClasses
            )} />
          );
        case 'matrix':
          return (
            <div className="neo-flex neo-gap-xs">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-8 neo-bg-green neo-animate-matrix-rain"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          );
        default:
          return (
            <div className={cn(
              'border-4 border-neo-blue border-t-transparent rounded-full neo-animate-spin',
              sizeClasses
            )} />
          );
      }
    };

    return (
      <div
        className={cn(containerClasses, className)}
        ref={ref}
        {...props}
      >
        <div className="neo-flex neo-flex-col neo-items-center neo-gap-md">
          <LoadingElement />
          {text && (
            <NeoText variant="body-sm" muted>
              {text}
            </NeoText>
          )}
        </div>
      </div>
    );
  }
);

NeoLoading.displayName = 'NeoLoading';

// ========================================================================
// EXPORTS
// ========================================================================

export {
  NeoButton,
  NeoCard,
  NeoInput,
  NeoTextarea,
  NeoSelect,
  NeoBadge,
  NeoHeading,
  NeoText,
  NeoContainer,
  NeoSection,
  NeoFlex,
  NeoGrid,
  NeoTerminal,
  NeoLoading
};

export default {
  Button: NeoButton,
  Card: NeoCard,
  Input: NeoInput,
  Textarea: NeoTextarea,
  Select: NeoSelect,
  Badge: NeoBadge,
  Heading: NeoHeading,
  Text: NeoText,
  Container: NeoContainer,
  Section: NeoSection,
  Flex: NeoFlex,
  Grid: NeoGrid,
  Terminal: NeoTerminal,
  Loading: NeoLoading
};