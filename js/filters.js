const Filters = (() => {
  const state = {
    query: '',
    category: 'all',
    price: 'all',
    sort: 'relevant'
  };

  const filter = () => {
    let list = products.filter((product) => {
      const matchesSearch = `${product.name} ${product.description}`
        .toLowerCase()
        .includes(state.query);

      const matchesCategory =
        state.category === 'all' ||
        product.category === state.category;

      return matchesSearch && matchesCategory;
    });

    if (state.price !== 'all') {
      const [minPrice, maxPrice] = state.price
        .split('-')
        .map(Number);

      list = list.filter((product) => {
        return (
          product.price >= minPrice &&
          product.price <= maxPrice
        );
      });
    }

    const sorters = {
      'price-asc': (a, b) => a.price - b.price,

      'price-desc': (a, b) => b.price - a.price,

      'name-asc': (a, b) => a.name.localeCompare(b.name),

      'name-desc': (a, b) => b.name.localeCompare(a.name),

      relevant: (a, b) => {
        return b.rating - a.rating || a.price - b.price;
      }
    };

    return list.sort(sorters[state.sort]);
  };

  return {
    state,
    filter
  };
})();