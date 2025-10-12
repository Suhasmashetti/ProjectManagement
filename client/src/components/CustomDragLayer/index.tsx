import React from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
) {
  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    width: '270px', // Standard width for all dragged items
    opacity: 0.85,
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
  };
}

interface CustomDragLayerProps {
  className?: string;
}

const CustomDragLayer: React.FC<CustomDragLayerProps> = ({ className }) => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  // Render lightweight preview of task
  return (
    <div style={layerStyles} className={className}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {itemType === 'task' && (
          <div className="p-2 rounded-md bg-white dark:bg-gray-800">
            <div className="font-bold truncate">{item.title || 'Task'}</div>
            <div className="text-xs text-gray-500">Moving task...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDragLayer;