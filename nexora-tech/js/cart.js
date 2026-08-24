const Cart = (() => {
  const key = 'nexora_cart';

  let items = JSON.parse(
    localStorage.getItem(key) || '[]'
  );

  const save = () => {
    localStorage.setItem(key, JSON.stringify(items));
  };

  const add = (id, qty = 1) => {
    const item = items.find((item) => item.id === id);

    if (item) {
      item.qty += qty;
    } else {
      items.push({ id, qty });
    }

    save();
  };

  const update = (id, delta) => {
    const item = items.find((item) => item.id === id);

    if (!item) {
      return;
    }

    if (item.qty + delta < 1) {
      items = items.filter((item) => item.id !== id);
    } else {
      item.qty += delta;
    }

    save();
  };

  const remove = (id) => {
    items = items.filter((item) => item.id !== id);

    save();
  };

  const detailed = () => {
    return items.map((item) => ({
      ...products.find((product) => product.id === item.id),
      qty: item.qty
    }));
  };

  const count = () => {
    return items.reduce((total, item) => {
      return total + item.qty;
    }, 0);
  };

  const subtotal = () => {
    return detailed().reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0);
  };

  const discount = () => {
    return detailed().reduce((total, product) => {
      const originalPrice = product.oldPrice || product.price;

      return total + (originalPrice - product.price) * product.qty;
    }, 0);
  };

  return {
    add,
    update,
    remove,
    detailed,
    count,
    subtotal,
    discount
  };
})();