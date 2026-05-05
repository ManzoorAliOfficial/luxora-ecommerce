export const formatPrice   = (n)         => `$${Number(n).toFixed(2)}`;
export const formatNumber  = (n)         => Number(n).toLocaleString();
export const calcDiscount  = (p, old)    => Math.round((1 - p / old) * 100);
export const calcTotal     = (cart)      => cart.reduce((s, x) => s + x.price * x.qty, 0);