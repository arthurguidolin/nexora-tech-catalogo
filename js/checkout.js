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

  const finalize = async ({ address, paymentMethod }) => {
    const user = User.current();

    if (!user) {
      throw Error('Você precisa estar logado para finalizar a compra.');
    }

    const subtotal = Cart.subtotal();
    const discount = Cart.discount();
    const total = Math.max(subtotal - discount, 0);
    const detailedItems = Cart.detailed();

    const formattedAddress =
      typeof address === 'string'
        ? address
        : `${address.rua}, ${address.numero} - ${address.bairro}, ${address.cidade} - CEP: ${address.cep}`;

    const orderPayload = {
      userEmail: user.email,
      subtotal,
      discount,
      total,
      address: formattedAddress,
      paymentMethod,
      items: detailedItems.map((item) => ({
        productId: String(item.id),
        productName: item.name || 'Produto',
        price: item.price || 0,
        quantity: item.qty || 1
      }))
    };

    let createdOrder = null;

    try {
      createdOrder = await Api.createOrder(orderPayload);
      console.log(
        '[Checkout] Pedido salvo via Web API no PostgreSQL:',
        createdOrder
      );
    } catch (err) {
      console.warn(
        '[Checkout] Falha ao persistir pedido via API, salvando apenas localmente:',
        err.message
      );
    }

    const order = {
      number: createdOrder
        ? createdOrder.orderNumber || createdOrder.OrderNumber
        : generateOrderNumber(),
      email: user.email,
      items: detailedItems,
      subtotal,
      discount,
      total,
      address,
      paymentMethod,
      createdAt: createdOrder
        ? createdOrder.createdAt || createdOrder.CreatedAt
        : new Date().toISOString()
    };

    saveAddress(address);
    saveOrder(order);
    sendEmail(user.email, order);
    await Cart.clear();

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
