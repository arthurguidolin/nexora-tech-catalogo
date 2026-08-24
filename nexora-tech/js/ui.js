const UI = (() => {
  const money = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const cat = (id) => {
    return categories.find((category) => category.id === id);
  };

  const art = (product, large = false) => {
    return `
      <div class="product-art ${product.category} ${
        large ? 'large' : ''
      }">
        ${product.image
          ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
          : `<span>${cat(product.category).icon}</span><i></i><b>${product.category}</b>`}
      </div>
    `;
  };

  const stars = (rating) => {
    return `
      <span class="stars">
        ★ ★ ★ ★ ★
        <i>${rating.toFixed(1)}</i>
      </span>
    `;
  };

  function productCard(product) {
    return `
      <article class="product-card" data-product="${product.id}">
        ${art(product)}

        <div class="card-body">
          <div class="card-top">
            <span class="badge">
              ${cat(product.category).name}
            </span>

            <button
              class="favorite ${
                Favorites.has(product.id) ? 'active' : ''
              }"
              data-favorite="${product.id}"
              aria-label="Favoritar ${product.name}"
            >
              ♥
            </button>
          </div>

          <h3>${product.name}</h3>
          <p>${product.description}</p>

          ${stars(product.rating)}

          <div class="price-row">
            <div>
              ${
                product.oldPrice
                  ? `<del>${money(product.oldPrice)}</del>`
                  : ''
              }

              <strong>${money(product.price)}</strong>
            </div>

            ${
              product.discount
                ? `<em class="discount">-${product.discount}%</em>`
                : ''
            }
          </div>

          <button class="add-cart" data-add="${product.id}">
            Adicionar ao carrinho <b>+</b>
          </button>
        </div>
      </article>
    `;
  }

  function renderProducts() {
    const list = Filters.filter();

    document.querySelector('#catalogGrid').innerHTML = list
      .map(productCard)
      .join('');

    document.querySelector('#resultsCount').textContent =
      `${list.length} produto${list.length !== 1 ? 's' : ''}`;

    document.querySelector('#emptyState').hidden = !!list.length;
  }

  function renderCart() {
    const items = Cart.detailed();
    const target = document.querySelector('#cartItems');

    target.innerHTML = items.length
      ? items
          .map(
            (product) => `
              <article class="cart-item">
                ${art(product)}

                <div>
                  <h3>${product.name}</h3>
                  <strong>${money(product.price)}</strong>

                  <div class="quantity">
                    <button
                      data-cart-change="${product.id}"
                      data-delta="-1"
                      aria-label="Diminuir"
                    >
                      −
                    </button>

                    <span>${product.qty}</span>

                    <button
                      data-cart-change="${product.id}"
                      data-delta="1"
                      aria-label="Aumentar"
                    >
                      +
                    </button>

                    <button
                      class="remove"
                      data-cart-remove="${product.id}"
                      aria-label="Remover"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </article>
            `
          )
          .join('')
      : `
          <p class="empty-cart">
            Seu carrinho está vazio.<br>
            <small>Que tal encontrar algo incrível?</small>
          </p>
        `;

    const subtotal = Cart.subtotal();
    const discount = Cart.discount();

    document.querySelector('#cartSummary').innerHTML = items.length
      ? `
          <div>
            <span>Subtotal</span>
            <b>${money(subtotal)}</b>
          </div>

          ${
            discount
              ? `
                <div class="success">
                  <span>Economia</span>
                  <b>− ${money(discount)}</b>
                </div>
              `
              : ''
          }

          <div class="total">
            <span>Total</span>
            <b>${money(subtotal)}</b>
          </div>

          <button class="button primary checkout">
            Finalizar compra →
          </button>
        `
      : '';

    document.querySelector('#cartCount').textContent = Cart.count();
  }

  function open(id) {
    const element = document.querySelector(`#${id}`);

    element.hidden = false;

    requestAnimationFrame(() => {
      element.classList.add('open');
    });

    document.querySelector('#backdrop').classList.add('show');

    if (id === 'cartDrawer') {
      element.classList.add('open');
      element.setAttribute('aria-hidden', 'false');

      renderCart();
    }
  }

  function close(id) {
    const element = document.querySelector(`#${id}`);

    element.classList.remove('open');
    document.querySelector('#backdrop').classList.remove('show');

    setTimeout(() => {
      if (element.classList.contains('modal')) {
        element.hidden = true;
      }
    }, 200);

    if (id === 'cartDrawer') {
      element.setAttribute('aria-hidden', 'true');
    }
  }

  function toast(message, type = '') {
    const element = document.createElement('div');

    element.className = `toast ${type}`;
    element.textContent = message;

    document.querySelector('#toastContainer').append(element);

    setTimeout(() => {
      element.remove();
    }, 3200);
  }

  function openProduct(id) {
    const product = products.find((item) => item.id === id);

    document.querySelector('#productModalContent').innerHTML = `
      <div class="modal-art">
        ${art(product, true)}
      </div>

      <div class="modal-info">
        <span class="badge">
          ${cat(product.category).name}
        </span>

        <h2>${product.name}</h2>
        ${stars(product.rating)}

        <p>${product.description}</p>

        <div class="specs">
          <h4>Especificações</h4>

          <p>
            ${product.specs
              .split(' • ')
              .map((spec) => `<span>✓ ${spec}</span>`)
              .join('')}
          </p>
        </div>

        <strong class="modal-price">
          ${money(product.price)}
        </strong>

        <div class="modal-buy">
          <label>
            Quantidade
            <input
              id="modalQty"
              type="number"
              min="1"
              value="1"
            >
          </label>

          <button
            class="button primary"
            data-modal-add="${product.id}"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    `;

    open('productModal');
  }

  function renderUser() {
    const user = User.current();
    const element = document.querySelector('#userModalContent');

    element.innerHTML = user
      ? `
          <p class="eyebrow">CONTA NEXORA</p>
          <h2>Olá, ${user.name.split(' ')[0]}!</h2>

          <div class="account-email">
            ${user.email}
          </div>

          <button
            class="button secondary full"
            id="showFavorites"
          >
            ♥ Meus favoritos (${Favorites.all().length})
          </button>

          <button class="button danger full" id="logout">
            Sair da conta
          </button>
        `
      : `
          <p class="eyebrow">BEM-VINDO À NEXORA</p>
          <h2>Entre na sua conta</h2>

          <form id="loginForm" class="auth-form">
            <label>
              E-mail
              <input
                required
                type="email"
                name="email"
                placeholder="voce@email.com"
              >
            </label>

            <label>
              Senha
              <input
                required
                type="password"
                name="password"
                placeholder="Sua senha"
              >
            </label>

            <button class="button primary" type="submit">
              Entrar
            </button>
          </form>

          <p class="auth-switch">
            Ainda não possui conta?
            <button id="showRegister">Criar conta</button>
          </p>
        `;
  }

  function renderRegister() {
    document.querySelector('#userModalContent').innerHTML = `
      <p class="eyebrow">CRIAR CONTA</p>
      <h2>Seu setup começa aqui.</h2>

      <form id="registerForm" class="auth-form">
        <label>
          Nome
          <input required name="name" placeholder="Seu nome">
        </label>

        <label>
          E-mail
          <input
            required
            type="email"
            name="email"
            placeholder="voce@email.com"
          >
        </label>

        <label>
          Senha
          <input
            required
            minlength="4"
            type="password"
            name="password"
            placeholder="Mínimo de 4 caracteres"
          >
        </label>

        <button class="button primary" type="submit">
          Criar minha conta
        </button>
      </form>

      <p class="auth-switch">
        Já tem uma conta?
        <button id="showLogin">Entrar</button>
      </p>
    `;
  }

  function renderFavorites() {
    const list = Favorites.all();

    document.querySelector('#favoritesContent').innerHTML = list.length
      ? list
          .map(
            (product) => `
              <article class="favorite-row">
                <div>${art(product)}</div>

                <div>
                  <h3>${product.name}</h3>
                  <strong>${money(product.price)}</strong>
                </div>

                <button
                  data-add="${product.id}"
                  class="icon-btn"
                >
                  +
                </button>
              </article>
            `
          )
          .join('')
      : `
          <p class="empty-cart">
            Você ainda não salvou favoritos.
          </p>
        `;
  }

  return {
    money,
    productCard,
    renderProducts,
    renderCart,
    open,
    close,
    toast,
    openProduct,
    renderUser,
    renderRegister,
    renderFavorites
  };
})();