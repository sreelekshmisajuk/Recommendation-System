import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onCheckoutSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckoutSuccess
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (acc, cur) => acc + (cur.item.price || 0) * cur.quantity,
    0
  );

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onCheckoutSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 p-6 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-base text-slate-900">
              {step === 'cart' && `Shopping Cart (${cartItems.length})`}
              {step === 'checkout' && 'Secure Checkout'}
              {step === 'success' && 'Order Placed!'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {step === 'cart' && (
            cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-sm text-slate-700">Your cart is empty</h4>
                <p className="text-xs text-slate-400">Explore recommendations and add items to your cart.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(({ item, quantity }) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{item.title}</h4>
                      <p className="text-[11px] text-slate-400">${item.price?.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, quantity - 1))}
                          className="w-5 h-5 rounded bg-white border border-slate-200 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                          className="w-5 h-5 rounded bg-white border border-slate-200 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} className="text-slate-400 hover:text-rose-600 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )
          )}

          {step === 'checkout' && (
            <form onSubmit={handlePay} className="space-y-4">
              <div className="p-3 bg-blue-50 text-blue-800 rounded-xl text-xs font-medium">
                Order Total: <strong>${total.toFixed(2)}</strong>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Shipping Address</label>
                <input required placeholder="123 Innovation Dr, Suite 400" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Card Details</label>
                <input required placeholder="•••• •••• •••• 4242" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isProcessing ? 'Processing Payment...' : `Confirm & Pay $${total.toFixed(2)}`}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base text-slate-900">Thank you for your order!</h4>
              <p className="text-xs text-slate-500">Your recommendation order has been placed successfully.</p>
              <button
                onClick={() => {
                  setStep('cart');
                  onClose();
                }}
                className="mt-4 px-4 py-2 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl"
              >
                Back to Workspace
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'cart' && cartItems.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-900">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setStep('checkout')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5"
            >
              Proceed to Checkout <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
