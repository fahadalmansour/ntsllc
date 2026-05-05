import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Image, Video, FileText, Download, Zap, AlertCircle } from 'lucide-react';

// Image optimization hook with WebP support
export function useOptimizedImage(src: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
} = {}) {
  const [optimizedSrc, setOptimizedSrc] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { width, height, quality = 85, format = 'webp' } = options;

  useEffect(() => {
    const optimizeImage = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if WebP is supported
        const supportsWebP = await checkWebPSupport();
        const targetFormat = supportsWebP ? format : 'jpeg';

        // Create optimized image URL (this would typically be done by a CDN)
        let optimizedUrl = src;
        
        // Add optimization parameters
        const params = new URLSearchParams();
        if (width) params.append('w', width.toString());
        if (height) params.append('h', height.toString());
        params.append('q', quality.toString());
        params.append('f', targetFormat);

        // For demo purposes, we'll use the original src
        // In production, you'd integrate with services like Cloudinary, ImageKit, etc.
        setOptimizedSrc(src);
      } catch (err) {
        setError('Failed to optimize image');
        setOptimizedSrc(src); // Fallback to original
      } finally {
        setLoading(false);
      }
    };

    if (src) {
      optimizeImage();
    }
  }, [src, width, height, quality, format]);

  return { src: optimizedSrc, loading, error };
}

// WebP support detection
async function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => resolve(webP.height === 2);
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Optimized Image Component with lazy loading
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  quality = 85,
  onLoad,
  onError
}) => {
  const { src: optimizedSrc, loading: isOptimizing, error } = useOptimizedImage(src, {
    width,
    height,
    quality
  });

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  if (isOptimizing) {
    return (
      <div className={`bg-[#12151C] animate-pulse flex items-center justify-center ${className}`}>
        <div className="text-[#C0C5CE] opacity-50">
          <Image className="w-8 h-8" />
        </div>
      </div>
    );
  }

  if (error || imageError) {
    return (
      <div className={`bg-[#12151C] flex items-center justify-center ${className}`}>
        <div className="text-red-400 text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm">Failed to load image</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-[#12151C] animate-pulse flex items-center justify-center">
          <div className="text-[#C0C5CE] opacity-50">
            <Image className="w-8 h-8" />
          </div>
        </div>
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        decoding="async"
      />
    </div>
  );
};

// Asset preloader for critical resources
export class AssetPreloader {
  private static instance: AssetPreloader;
  private preloadedAssets = new Set<string>();

  static getInstance(): AssetPreloader {
    if (!AssetPreloader.instance) {
      AssetPreloader.instance = new AssetPreloader();
    }
    return AssetPreloader.instance;
  }

  async preloadImage(src: string): Promise<void> {
    if (this.preloadedAssets.has(src)) {
      return;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedAssets.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  async preloadImages(srcs: string[]): Promise<void> {
    const promises = srcs.map(src => this.preloadImage(src));
    await Promise.allSettled(promises);
  }

  preloadCSS(href: string): void {
    if (this.preloadedAssets.has(href)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      this.preloadedAssets.add(href);
      // Convert to stylesheet
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }

  preloadScript(src: string): Promise<void> {
    if (this.preloadedAssets.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        this.preloadedAssets.add(src);
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}

// Critical resource preloader hook
export function useCriticalResourcePreloader(resources: {
  images?: string[];
  styles?: string[];
  scripts?: string[];
}) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preloader = AssetPreloader.getInstance();
    const totalResources = (resources.images?.length || 0) + 
                          (resources.styles?.length || 0) + 
                          (resources.scripts?.length || 0);
    
    if (totalResources === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const updateProgress = () => {
      loadedCount++;
      setProgress((loadedCount / totalResources) * 100);
      if (loadedCount === totalResources) {
        setLoaded(true);
      }
    };

    // Preload images
    if (resources.images) {
      resources.images.forEach(async (src) => {
        try {
          await preloader.preloadImage(src);
        } catch (error) {
          console.warn('Failed to preload image:', src);
        } finally {
          updateProgress();
        }
      });
    }

    // Preload styles
    if (resources.styles) {
      resources.styles.forEach((href) => {
        try {
          preloader.preloadCSS(href);
          updateProgress();
        } catch (error) {
          console.warn('Failed to preload CSS:', href);
          updateProgress();
        }
      });
    }

    // Preload scripts
    if (resources.scripts) {
      resources.scripts.forEach(async (src) => {
        try {
          await preloader.preloadScript(src);
        } catch (error) {
          console.warn('Failed to preload script:', src);
        } finally {
          updateProgress();
        }
      });
    }
  }, [resources]);

  return { loaded, progress };
}

// Asset compression utilities
export const AssetOptimizer = {
  // Compress image before upload
  async compressImage(file: File, maxWidth: number = 1920, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Draw and compress
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  },

  // Generate responsive image sizes
  generateResponsiveSizes(baseUrl: string): string[] {
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes.map(size => `${baseUrl}?w=${size}`);
  },

  // Get optimal format based on browser support
  async getOptimalFormat(): Promise<'webp' | 'jpeg'> {
    const supportsWebP = await checkWebPSupport();
    return supportsWebP ? 'webp' : 'jpeg';
  }
};

// Performance-aware image gallery
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
}

export const PerformantImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className = ''
}) => {
  const [visibleImages, setVisibleImages] = useState(new Set<number>());
  
  const handleImageVisible = useCallback((index: number) => {
    setVisibleImages(prev => new Set([...prev, index]));
  }, []);

  const memoizedImages = useMemo(() => {
    return images.map((image, index) => ({
      ...image,
      index,
      shouldLoad: visibleImages.has(index)
    }));
  }, [images, visibleImages]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {memoizedImages.map(({ src, alt, width, height, index, shouldLoad }) => (
        <ImageIntersectionWrapper
          key={index}
          onVisible={() => handleImageVisible(index)}
        >
          {shouldLoad ? (
            <OptimizedImage
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-48 object-cover rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-48 bg-[#12151C] rounded-lg animate-pulse" />
          )}
        </ImageIntersectionWrapper>
      ))}
    </div>
  );
};

// Intersection wrapper for lazy loading
interface ImageIntersectionWrapperProps {
  children: React.ReactNode;
  onVisible: () => void;
}

const ImageIntersectionWrapper: React.FC<ImageIntersectionWrapperProps> = ({
  children,
  onVisible
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [onVisible]);

  return <div ref={ref}>{children}</div>;
};

export default OptimizedImage;