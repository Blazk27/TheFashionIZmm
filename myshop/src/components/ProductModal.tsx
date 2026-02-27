import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/currency';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  if (!isOpen || !product) return null;

  // Build images array from image_url + images[]
  const allImages = [
    product.image_url,
    ...(product.images || [])
  ].filter(Boolean);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => { setIsAdding(false); onClose(); setQuantity(1); setCurrentImg(0); }, 500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl animate-slide-in-up max-h-[90vh] flex flex-col">

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 shadow">
          <X className="w-4 h-4" />
        </button>

        {/* Image Gallery */}
        <div className="relative aspect-square bg-blue-50 flex-shrink-0">
          <img src={allImages[currentImg]} alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400?text=No+Image'; }} />

          {/* Arrow navigation */}
          {allImages.length > 1 && (
            <>
              <button onClick={() => setCurrentImg(i => (i - 1 + allImages.length) % allImages.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              <button onClick={() => setCurrentImg(i => (i + 1) % allImages.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </>
          )}

          {/* Dots */}
          {allImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {allImages.map((_, i) => (
                <button key={i} onClick={() => setCurrentImg(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentImg ? 'bg-blue-600 w-4' : 'bg-white/70'}`} />
              ))}
            </div>
          )}

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => setCurrentImg(i)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === currentImg ? 'border-blue-600 scale-110' : 'border-white/50'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">{product.category}</span>
              <h2 className="text-xl font-bold text-gray-800 mt-0.5">{product.title}</h2>
            </div>
            <span className="text-2xl font-bold text-blue-600 ml-4 flex-shrink-0">{formatPrice(product.price)}</span>
          </div>

          {product.description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.description}</p>
          )}

          {/* Sizes & Colors */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.thc_percent && (
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-xl border border-blue-100 font-medium">
                📐 Sizes: {product.thc_percent}
              </span>
            )}
            {product.cbd_percent && (
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-xl border border-blue-100 font-medium">
                🎨 Colors: {product.cbd_percent}
              </span>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border-2 border-blue-100 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-gray-800">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button onClick={handleAddToCart} disabled={isAdding}
              className="flex-1 btn-primary rounded-xl py-2.5 gap-2">
              <ShoppingBag className="w-4 h-4" />
              {isAdding ? '✓ Added!' : `Add to Cart — ${formatPrice(product.price * quantity)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
