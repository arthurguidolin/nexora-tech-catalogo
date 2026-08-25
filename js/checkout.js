const Checkout = (() => {
  const ordersKey = 'nexora_orders';
  const addressKey = 'nexora_address';

  const generateOrderNumber = () => {
    const timePart = Date.now().toString().slice(-6);
    const randomPart = Math.floor(
      Math.random() * 900000 + 100000
    );

    return `NEX-${timePart}${randomPart}`;
  };

  const saveAddress = (address) => {
    localStorage.setItem(addressKey, JSON.stringify(address));
  };

  const getSavedAddress = () => {
    return JSON.parse(localStorage.getItem(addressKey) || 'null');
  };

  const sendEmail = (email, order) => {
    const payload = {
      email,
      orderNumber: order.number,
      sentAt: new Date().toISOString(),
      status: 'simulated'
    };

    localStorage.setItem(
      `nexora_email_${order.number}`,
      JSON.stringify(payload)
    );

    console.log('[Checkout] E-mail simulado enviado', payload);

    return payload;
  };

  const saveOrder = (order) => {
    const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');

    orders.push(order);
    localStorage.setItem(ordersKey, JSON.stringify(orders));
  };

  const finalize = ({ address, paymentMethod }) => {
    const user = User.current();

    if (!user) {
      throw Error('Você precisa estar logado para finalizar a compra.');
    }

    const subtotal = Cart.subtotal();
    const discount = Cart.discount();
    const total = Math.max(subtotal - discount, 0);

    const order = {
      number: generateOrderNumber(),
      email: user.email,
      items: Cart.detailed(),
      subtotal,
      discount,
      total,
      address,
      paymentMethod,
      createdAt: new Date().toISOString()
    };

    saveAddress(address);
    saveOrder(order);
    sendEmail(user.email, order);
    Cart.clear();

    return order;
  };

  return {
    generateOrderNumber,
    getSavedAddress,
    saveAddress,
    sendEmail,
    finalize
  };
})();
