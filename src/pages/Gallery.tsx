import React from 'react';
import { Widget } from '../components/Widget';

interface GalleryProps {
  isLightTheme: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ isLightTheme }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
      {[...Array(8)].map((_, i) => (
        <Widget key={i} className="aspect-square p-0 overflow-hidden" isLightTheme={isLightTheme}>
          <img 
            src={`https://picsum.photos/seed/gallery${i}/600/600`} 
            alt="Gallery" 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </Widget>
      ))}
    </div>
  );
};
