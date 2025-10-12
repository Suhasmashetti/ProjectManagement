// Drag and drop performance optimizations
export const DRAG_THROTTLE_MS = 8; // ~120fps for smoother drag experience

// Lightweight optimized drag preview
export const optimizedDragPreview = (element: HTMLElement) => {
  // Create a simplified drag preview for better performance
  const rect = element.getBoundingClientRect();
  const preview = document.createElement('div');
  
  // Use minimal styling for performance
  preview.style.width = `${rect.width}px`;
  preview.style.height = `${rect.height}px`;
  preview.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  preview.style.border = '1px solid #ddd';
  preview.style.borderRadius = '4px';
  preview.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.2)';
  preview.style.transform = 'rotate(3deg)';
  preview.style.pointerEvents = 'none';
  
  // Add minimal content indication
  const title = document.createElement('div');
  title.textContent = (element.querySelector('h4') as HTMLElement)?.textContent || 'Task';
  title.style.padding = '12px';
  title.style.fontWeight = 'bold';
  
  preview.appendChild(title);
  return preview;
};

// Super-optimized throttle function for drag operations
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastExecTime = 0;
  let requestId: number | null = null;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      // Execute immediately if enough time has passed
      func(...args);
      lastExecTime = currentTime;
    } else if (!requestId) {
      // Use requestAnimationFrame for smoother performance
      requestId = requestAnimationFrame(() => {
        func(...args);
        lastExecTime = Date.now();
        requestId = null;
      });
    }
  };
};

// Use optimistic updates for drag operations
export const optimisticUpdate = <T extends { id: number; status?: string }>(
  items: T[],
  itemId: number,
  newStatus: string
): T[] => {
  return items.map(item => 
    item.id === itemId 
      ? { ...item, status: newStatus }
      : item
  );
};

// Track position during drag for better performance
export interface DragPosition {
  clientX: number;
  clientY: number;
}

export const getEmptyImage = (): HTMLImageElement => {
  const img = new Image();
  img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  return img;
};