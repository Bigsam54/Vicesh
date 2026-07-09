import React from 'react';
import { motion } from 'motion/react';

const images: Record<string, string> = {
  carrot: '/images/carrot_realistic_1783525228347.png',
  banana: '/images/banana_realistic_1783525237512.png',
  orange: '/images/orange_slice_realistic_1783525246266.png',
  water: '/images/water_drop_realistic_1783525254959.png',
  almonds: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1783540750/Almonds__leaves__cream__particle__2K_202607081956-removebg-preview_uungvt.png',
  avocado: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1783540750/Avocado_ingredients_with_water_s__202607081955-removebg-preview_qwl5lm.png',
  botanical: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1783540749/Botanical_background_for_beauty___202607081950-removebg-preview_w90ea4.png',
};

interface FloatingBotanicalsProps {
  selectedProductId?: string;
}

export const FloatingBotanicals: React.FC<FloatingBotanicalsProps> = ({ selectedProductId }) => {
  // Determine which images to show based on product
  let activeImages: { src: string; type: string }[] = [];

  if (!selectedProductId) {
    // Show just one image for home/shop
    activeImages = [
      { src: images.almonds, type: 'almonds' }
    ];
  } else {
    // Specific product mapping based on our updated names
    if (selectedProductId.includes('hair-protein')) {
      activeImages = [
        { src: images.almonds, type: 'almonds' }
      ];
    } else if (selectedProductId.includes('leave-in-conditioner')) {
      activeImages = [
        { src: images.almonds, type: 'almonds' }
      ];
    } else if (selectedProductId.includes('shampoo') || selectedProductId.includes('red-set') || selectedProductId.includes('manicure-set')) {
      activeImages = [
        { src: images.avocado, type: 'avocado' }
      ];
    } else {
      // Fallback
      activeImages = [
        { src: images.almonds, type: 'almonds' }
      ];
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {activeImages.map((img, i) => {
        // Position them statically and very large in the corners/sides
        let positioning = {};
        let size = '80vw'; // Very large
        let opacity = 1; // Fully visible
        
        // With only one image, position it beautifully on the bottom right or left
        if (i === 0) {
          positioning = { bottom: '-20%', right: '-15%' };
          size = '70vw';
        }

        const isSvg = img.type === 'leaf';

        return isSvg ? (
          <motion.div
            key={`${selectedProductId}-svg-${i}`}
            className="absolute opacity-20 pointer-events-none drop-shadow-[0_0_15px_rgba(223,175,55,0.3)]"
            style={{
              ...positioning,
              width: size,
              height: size,
              color: 'rgba(255, 255, 238, 0.15)' // brand-cream subtle
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, rotate: i * 15 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M50 0C50 0 10 30 10 70C10 90 30 100 50 100C70 100 90 90 90 70C90 30 50 0 50 0ZM50 90C35 90 20 80 20 65C20 40 40 20 50 10C60 20 80 40 80 65C80 80 65 90 50 90Z" />
              <path d="M50 10V90" stroke="currentColor" strokeWidth="2" />
              <path d="M50 40L35 30M50 55L35 45M50 70L35 60M50 40L65 30M50 55L65 45M50 70L65 60" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </motion.div>
        ) : (
          <motion.img
            key={`${selectedProductId}-${i}`}
            src={img.src}
            className="absolute drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            style={{
              ...positioning,
              width: size,
              height: size,
              objectFit: 'contain',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: opacity, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};
