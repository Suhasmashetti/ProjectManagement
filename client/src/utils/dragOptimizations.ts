// Drag and drop performance optimizations
export const DRAG_THROTTLE_MS = 16; // ~60fps

export const optimizedDragPreview = (element: HTMLElement) => {
  // Create a lightweight drag preview
  const preview = element.cloneNode(true) as HTMLElement;
  preview.style.transform = 'rotate(5deg)';
  preview.style.opacity = '0.8';
  preview.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
  return preview;
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};