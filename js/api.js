const API_BASE_URL = 'http://localhost:5194/api';

const Api = (() => {
  const request = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        let errorMessage = `Erro HTTP ${response.status}`;
        try {
          const errData = await response.json();
          if (errData.message) errorMessage = errData.message;
        } catch (_) {}
        throw new Error(errorMessage);
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.warn(`[API] Requisição para ${endpoint} falhou:`, error.message);
      throw error;
    }
  };

  return {
    // Products
    getProducts: () => request('/products'),
    getProductById: (id) => request(`/products/${id}`),

    // Users
    getUsers: () => request('/users'),
    getUserById: (id) => request(`/users/${id}`),
    createUser: (data) =>
      request('/users', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    updateUser: (id, data) =>
      request(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),

    // Cart
    getCartItems: () => request('/cart'),
    addCartItem: (data) =>
      request('/cart', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    updateCartItem: (id, quantity) =>
      request(`/cart/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity })
      }),
    deleteCartItem: (id) =>
      request(`/cart/${id}`, {
        method: 'DELETE'
      }),

    // Orders
    getOrders: () => request('/orders'),
    createOrder: (orderData) =>
      request('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      })
  };
})();
