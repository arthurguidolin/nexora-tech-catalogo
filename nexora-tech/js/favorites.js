const Favorites = (() => {
  const key = 'nexora_favorites';

  let ids = JSON.parse(
    localStorage.getItem(key) || '[]'
  );

  const save = () => {
    localStorage.setItem(key, JSON.stringify(ids));
  };

  return {
    has: (id) => {
      return ids.includes(id);
    },

    toggle: (id) => {
      const isFavorite = ids.includes(id);

      ids = isFavorite
        ? ids.filter((favoriteId) => favoriteId !== id)
        : [...ids, id];

      save();

      return ids.includes(id);
    },

    all: () => {
      return products.filter((product) => {
        return ids.includes(product.id);
      });
    }
  };
})();