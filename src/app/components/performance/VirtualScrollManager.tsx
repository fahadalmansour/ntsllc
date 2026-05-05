import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

interface VirtualScrollProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

export function VirtualScrollManager<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 3,
  className = ''
}: VirtualScrollProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const { startIndex, endIndex, offsetY } = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    const offsetY = startIndex * itemHeight;

    return {
      startIndex,
      endIndex,
      offsetY
    };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  const totalHeight = items.length * itemHeight;

  return (
    <div
      ref={scrollElementRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Optimized List Component for large datasets
interface OptimizedListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  className?: string;
  onItemClick?: (item: T, index: number) => void;
}

export function OptimizedList<T>({
  data,
  renderItem,
  itemHeight = 60,
  className = '',
  onItemClick
}: OptimizedListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(400);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerHeight(rect.height || 400);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const optimizedRenderItem = useCallback((item: T, index: number) => {
    return (
      <div
        className="flex items-center p-3 hover:bg-[#12151C] transition-colors cursor-pointer"
        onClick={() => onItemClick?.(item, index)}
      >
        {renderItem(item, index)}
      </div>
    );
  }, [renderItem, onItemClick]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-[#C0C5CE] bg-[#0B0D12] rounded-lg border border-[#00d4ff]/20">
        <div className="text-center">
          <div className="text-lg font-mono">No data available</div>
          <div className="text-sm opacity-70 mt-1">Items will appear here when loaded</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`bg-[#0B0D12] rounded-lg border border-[#00d4ff]/20 ${className}`}
      style={{ height: '100%' }}
    >
      <VirtualScrollManager
        items={data}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={optimizedRenderItem}
        overscan={5}
        className="scrollbar-thin scrollbar-thumb-[#00d4ff] scrollbar-track-transparent"
      />
    </div>
  );
}

// Infinite Scroll Hook for progressive loading
export function useInfiniteScroll<T>(
  initialData: T[],
  loadMore: (page: number) => Promise<T[]>,
  hasMore: boolean = true
) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(hasMore);

  const loadMoreData = useCallback(async () => {
    if (loading || !hasMoreData) return;

    setLoading(true);
    try {
      const newData = await loadMore(page);
      if (newData.length === 0) {
        setHasMoreData(false);
      } else {
        setData(prevData => [...prevData, ...newData]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMoreData, page, loadMore]);

  const reset = useCallback(() => {
    setData(initialData);
    setPage(1);
    setHasMoreData(true);
    setLoading(false);
  }, [initialData]);

  return {
    data,
    loading,
    hasMore: hasMoreData,
    loadMore: loadMoreData,
    reset
  };
}

// Intersection Observer Hook for lazy loading
export function useIntersectionObserver(
  targetRef: React.RefObject<Element>,
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
        ...options
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [targetRef, callback, options]);
}

export default VirtualScrollManager;