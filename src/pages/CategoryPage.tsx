import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, Search, X } from 'lucide-react';

interface CategoryPageProps {
  categoryId: string;
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ 
  categoryId, 
  setCurrentPage, 
  setSelectedProductId 
}) => {
  const { products } = useStore();

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);

  const itemsPerPage = 6;

  // Filter & Sort Logic
  const filteredProducts = products.filter((product) => {
    const categoryMatch = 
      categoryId === 'all' || product.category === categoryId || product.mood === categoryId || product.tags?.includes(categoryId) || product.category?.includes(categoryId) || product.name.toLowerCase().includes(categoryId.toLowerCase());
    const priceMatch = 
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const searchMatch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.keyIngredients.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && priceMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low-high') return a.price - b.price;
    if (sortOption === 'price-high-low') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPageNum - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerFilterChange = (updater: () => void) => {
    setIsFiltering(true);
    updater();
    setTimeout(() => setIsFiltering(false), 450);
  };

  const handleResetFilters = () => {
    triggerFilterChange(() => {
      setPriceRange([0, 50]);
      setSortOption('featured');
      setSearchQuery('');
      setCurrentPageNum(1);
    });
  };

  return (
    <div className="w-full relative text-brand-cream pb-10 min-h-[60vh] bg-brand-purple-dark overflow-hidden">
      {/* Top Background Image (Carrots) */}
      <div 
        className="absolute inset-0 bg-[length:250%_auto] sm:bg-[length:100%_auto] bg-top bg-no-repeat z-0 opacity-80"
        style={{ backgroundImage: `url('https://res.cloudinary.com/dja3u7oha/image/upload/v1783594375/Carrots_herbs_water_splashes_bac__202607091044_ulstv1.jpg')` }}
      />
      
      {/* Bottom Background Image (Lemons) - Visible to continue the background downwards */}
      <div 
        className="absolute inset-0 bg-[length:100%_auto] bg-[center_bottom_10%] sm:bg-bottom bg-no-repeat z-0 opacity-80"
        style={{ backgroundImage: `url('https://res.cloudinary.com/dja3u7oha/image/upload/v1783594374/Lemons_bursting_through_water_2K_202607091044_djff1h.jpg')` }}
      />

      {/* Overlay to ensure readability */}
      <div className="absolute inset-0 bg-brand-purple-dark/80 mix-blend-multiply z-0" />
      
      <div className="relative z-10 w-full">
        {/* ─── Thin top banner ─── */}
        <div className="w-full bg-brand-forest text-brand-cream text-center text-xs tracking-widest uppercase font-bold py-2.5">
          🌿 Free standard delivery on orders over $50+
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Back Button */}
        <button 
          onClick={() => setCurrentPage('shop')}
          className="flex items-center gap-2 text-xs font-bold text-brand-cream/70 hover:text-brand-cream uppercase tracking-wider transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Apothecary
        </button>

        {/* Section header + sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black text-brand-cream tracking-tight capitalize drop-shadow-md">
              {categoryId.replace(/-/g, ' ')}
            </h2>
            <p className="text-sm text-brand-cream/80 font-medium mt-1">
              {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortOption}
              onChange={(e) => triggerFilterChange(() => setSortOption(e.target.value))}
              className="bg-transparent border border-brand-cream/30 rounded-md text-brand-cream text-xs focus:outline-none focus:border-brand-cream font-bold uppercase tracking-wider cursor-pointer px-3 py-2"
            >
              <option className="text-brand-purple-dark bg-brand-cream" value="featured">Featured</option>
              <option className="text-brand-purple-dark bg-brand-cream" value="price-low-high">Price: Low–High</option>
              <option className="text-brand-purple-dark bg-brand-cream" value="price-high-low">Price: High–Low</option>
              <option className="text-brand-purple-dark bg-brand-cream" value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {isFiltering ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {[...Array(itemsPerPage)].map((_, idx) => (
              <div key={idx} className="bg-neutral-50 rounded-lg overflow-hidden animate-pulse flex flex-col h-[400px]">
                <div className="aspect-[4/5] bg-neutral-100"></div>
                <div className="p-4 flex-1 space-y-3">
                  <div className="h-2 w-1/4 bg-neutral-200 rounded-full"></div>
                  <div className="h-4 w-3/4 bg-neutral-200 rounded-full"></div>
                  <div className="h-10 w-full bg-neutral-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="bg-brand-purple-dark border border-brand-cream/20 rounded-md py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-offwhite border border-brand-cream/20 flex items-center justify-center mx-auto shadow-sm">
              <Search className="w-8 h-8 text-brand-purple" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-brand-cream">No matching products</h3>
            <p className="text-sm text-brand-cream/80 max-w-sm mx-auto leading-relaxed">
              We couldn't find any products in this category matching your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-colors text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer shadow-xs"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {paginatedProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                setCurrentPage={setCurrentPage}
                setSelectedProductId={setSelectedProductId}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !isFiltering && (
          <div className="flex justify-center items-center gap-2 pt-8">
            <button
              disabled={currentPageNum === 1}
              onClick={() => handlePageChange(currentPageNum - 1)}
              className="px-4 py-2 border border-neutral-200 text-xs font-bold rounded-md hover:border-neutral-400 disabled:opacity-40 text-[#222222] cursor-pointer"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const pageIdx = i + 1;
              return (
                <button
                  key={pageIdx}
                  onClick={() => handlePageChange(pageIdx)}
                  className={`w-9 h-9 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    currentPageNum === pageIdx
                      ? 'bg-[#222222] text-brand-purple'
                      : 'border border-neutral-200 text-[#222222] hover:border-neutral-400'
                  }`}
                >
                  {pageIdx}
                </button>
              );
            })}

            <button
              disabled={currentPageNum === totalPages}
              onClick={() => handlePageChange(currentPageNum + 1)}
              className="px-4 py-2 border border-neutral-200 text-xs font-bold rounded-md hover:border-neutral-400 disabled:opacity-40 text-[#222222] cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
