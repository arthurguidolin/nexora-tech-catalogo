const Cart = (() => {
  const key = 'nexora_cart';

  let items = JSON.parse(
    localStorage.getItem(key) || '[]'
  );

  const save = () => {
    localStorage.setItem(key, JSON.stringify(items));
  };

  const syncWithApi = async () => {
    try {
      const user = typeof User !== 'undefined' ? User.current() : null;
      if (!user) return;

      const apiItems = await Api.getCartItems();
      if (Array.isArray(apiItems)) {
        const userItems = apiItems.filter(
          (i) => (i.userEmail || i.UserEmail) === user.email
        );
        items = userItems.map((i) => ({
          apiId: i.id || i.Id,
          id: i.productId || i.ProductId,
          qty: i.quantity || i.Quantity
        }));
        save();
      }
    } catch (err) {
      console.warn('[Cart] Sincronização via API indisponível, utilizando local:', err.message);
    }
  };

  const add = async (id, qty = 1) => {
    const item = items.find((item) => item.id === id);

    if (item) {
      item.qty += qty;
    } else {
      items.push({ id, qty });
    }

    save();

    try {
      const user = typeof User !== 'undefined' ? User.current() : null;
      if (user) {
        const created = await Api.addCartItem({
          userEmail: user.email,
          productId: id,
          quantity: qty
        });
        if (created && created.id) {
          const target = items.find((i) => i.id === id);
          if (target) target.apiId = created.id;
          save();
        }
      }
    } catch (err) {
      console.warn('[Cart] Erro ao sincronizar adição no servidor:', err.message);
    }
  };

  const update = async (id, delta) => {
    const item = items.find((item) => item.id === id);

    if (!item) {
      return;
    }

    const newQty = item.qty + delta;

    if (newQty < 1) {
      await remove(id);
      return;
    } else {
      item.qty = newQty;
    }

    save();

    try {
      if (item.apiId) {
        await Api.updateCartItem(item.apiId, item.qty);
      }
    } catch (err) {
      console.warn('[Cart] Erro ao atualizar item no servidor:', err.message);
    }
  };

  const remove = async (id) => {
    const target = items.find((item) => item.id === id);
    items = items.filter((item) => item.id !== id);
    save();

    try {
      if (target && target.apiId) {
        await Api.deleteCartItem(target.apiId);
      }
    } catch (err) {
      console.warn('[Cart] Erro ao remover item do servidor:', err.message);
    }
  };

  const clear = async () => {
    const itemsToRemove = [...items];
    items = [];
    save();

    try {
      for (const item of itemsToRemove) {
        if (item.apiId) {
          await Api.deleteCartItem(item.apiId);
        }
      }
    } catch (err) {
      console.warn('[Cart] Erro ao limpar itens no servidor:', err.message);
    }
  };

  const detailed = () => {
    return items.map((item) => ({
      ...(products.find((product) => product.id === item.id) || {
        id: item.id,
        name: 'Produto Desconhecido',
        price: 0
      }),
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
    syncWithApi,
    add,
    update,
    remove,
    clear,
    detailed,
    count,
    subtotal,
    discount
  };
})();