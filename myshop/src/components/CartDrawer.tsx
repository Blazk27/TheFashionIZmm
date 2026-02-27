import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (!isCartOpen) return null;
  const total = getTotalPrice();

  return (
    <>
      <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm z-[60] animate-fade-in" onClick={() => setIsCartOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l border-blue-100 z-[70] animate-slide-in-right flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-blue-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-800">My Cart</h2>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{items.length}</span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-14 h-14 text-blue-100 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <p className="text-gray-300 text-sm mt-1">Add some products!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 bg-blue-50/50 rounded-2xl p-3">
                <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-blue-100">
                  <img src={item.product.image_url} alt={item.product.title} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100?text=?'; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-semibold text-sm truncate">{item.product.title}</p>
                  <p className="text-blue-600 font-bold">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 bg-white border border-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-gray-800 font-bold text-sm w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 bg-white border border-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button onClick={() => removeFromCart(item.product.id)}
                      className="ml-auto w-6 h-6 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-blue-50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total</span>
              <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" onClick={() => setIsCartOpen(false)}
              className="w-full btn-primary rounded-xl py-3.5 gap-2 text-base">
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={clearCart}
              className="w-full py-2.5 text-sm text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
