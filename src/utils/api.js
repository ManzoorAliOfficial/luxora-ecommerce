// Mock API functions
export const api = {
  // Products
  getProducts: async (filters = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: [] };
  },

  getProduct: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, data: {} };
  },

  // Orders
  createOrder: async (orderData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, orderId: "LX-" + Date.now().toString().slice(-6) };
  },

  getOrders: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: [] };
  },

  // Auth
  login: async (credentials) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true, user: { email: credentials.email, name: "User" } };
  },

  register: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true, user: userData };
  },
};
