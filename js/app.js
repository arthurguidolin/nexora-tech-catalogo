document.addEventListener('DOMContentLoaded', async () => {
  const $ = (selector) => {
    return document.querySelector(selector);
  };

  const animateCollection = (selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.style.setProperty('--animation-order', index);
      element.classList.add('js-enter');
    });
  };

  const animateRenderedContent = () => {
    animateCollection('#categoryGrid > *, #featuredGrid > *, #catalogGrid > *');
  };

  if (typeof loadProductsFromApi === 'function') {
    await loadProductsFromApi();
  }

  if (typeof Cart !== 'undefined' && Cart.syncWithApi) {
    await Cart.syncWithApi();
  }

  $('#categoryGrid').innerHTML = categories
    .map(
      (category) => `
        <a
          class="category-card"
          href="#produtos"
          data-category-link="${category.id}"
        >
          <span>${category.icon}</span>

          <div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>

            <small>
              ${
                products.filter(
                  (product) => product.category === category.id
                ).length
              }
              produtos <b>→</b>
            </small>
          </div>
        </a>
      `
    )
    .join('');

  $('#featuredGrid').innerHTML = [
    products[1],
    products[6],
    products[9],
    products[19]
  ]
    .map(UI.productCard)
    .join('');

  $('#categoryFilter').insertAdjacentHTML(
    'beforeend',
    categories
      .map(
        (category) => `
          <option value="${category.id}">
            ${category.name}
          </option>
        `
      )
      .join('')
  );

  UI.renderProducts();
  animateRenderedContent();

  [
    '#productSearch',
    '#categoryFilter',
    '#priceFilter',
    '#sortFilter'
  ].forEach((selector) => {
    const eventName =
      selector === '#productSearch' ? 'input' : 'change';

    $(selector).addEventListener(eventName, (event) => {
      const properties = {
        '#productSearch': 'query',
        '#categoryFilter': 'category',
        '#priceFilter': 'price',
        '#sortFilter': 'sort'
      };

      const property = properties[selector];

      Filters.state[property] = event.target.value.toLowerCase();

      UI.renderProducts();
      animateRenderedContent();
    });
  });

  document.addEventListener('click', (event) => {
    const card = event.target.closest('[data-product]');

    if (card && !event.target.closest('button')) {
      UI.openProduct(card.dataset.product);
      return;
    }

    const button = event.target.closest('button, a');

    if (!button) {
      return;
    }

    if (button.matches('[data-add]')) {
      const user = User.current();

      if (!user) {
        UI.toast(
          'Você precisa estar logado para adicionar produtos ao carrinho.',
          'error'
        );
        UI.renderUser();
        UI.open('userModal');
        return;
      }

      button.classList.add('is-clicked');
      setTimeout(() => button.classList.remove('is-clicked'), 280);

      Cart.add(button.dataset.add);

      UI.renderCart();
      UI.toast(
        'Produto adicionado ao carrinho.',
        'success'
      );
    }

    if (button.matches('[data-modal-add]')) {
      const user = User.current();

      if (!user) {
        UI.toast(
          'Você precisa estar logado para adicionar produtos ao carrinho.',
          'error'
        );
        UI.renderUser();
        UI.open('userModal');
        return;
      }

      const quantity = Number($('#modalQty').value);

      Cart.add(button.dataset.modalAdd, quantity);

      UI.renderCart();
      UI.close('productModal');

      UI.toast(
        'Produto adicionado ao carrinho.',
        'success'
      );
    }

    if (button.matches('[data-favorite]')) {
      const added = Favorites.toggle(
        button.dataset.favorite
      );

      button.classList.toggle('active', added);

      UI.toast(
        added
          ? 'Produto adicionado aos favoritos.'
          : 'Produto removido dos favoritos.'
      );
    }

    if (button.matches('[data-cart-change]')) {
      Cart.update(
        button.dataset.cartChange,
        Number(button.dataset.delta)
      );

      UI.renderCart();
    }

    if (button.matches('[data-cart-remove]')) {
      Cart.remove(button.dataset.cartRemove);

      UI.renderCart();
      UI.toast('Produto removido do carrinho.');
    }

    if (button.matches('[data-close]')) {
      UI.close(button.dataset.close);
    }

    if (button.matches('[data-open-checkout]') || button.matches('#confirmPurchaseButton')) {
      if (!Cart.count()) {
        UI.toast('Seu carrinho está vazio.', 'error');
        return;
      }

      if (!User.current()) {
        UI.toast(
          'Você precisa estar logado para finalizar a compra.',
          'error'
        );
        UI.renderUser();
        UI.open('userModal');
        return;
      }

      UI.renderCheckout();
      UI.open('checkoutModal');
    }

    if (button.matches('[data-finish-checkout]')) {
      const form = document.querySelector('#checkoutForm');

      if (!form) {
        return;
      }

      const savedAddress =
        typeof Checkout !== 'undefined'
          ? Checkout.getSavedAddress()
          : null;
      const addressMode =
        document.querySelector(
          'input[name="checkoutAddressMode"]:checked'
        )?.value || 'new';

      const address =
        savedAddress && addressMode === 'saved'
          ? savedAddress
          : {
              rua: form.rua.value.trim(),
              numero: form.numero.value.trim(),
              bairro: form.bairro.value.trim(),
              cidade: form.cidade.value.trim(),
              cep: form.cep.value.trim()
            };

      const paymentMethod = form.querySelector(
        'input[name="paymentMethod"]:checked'
      )?.value;

      if (
        !address.rua ||
        !address.numero ||
        !address.bairro ||
        !address.cidade ||
        !address.cep
      ) {
        UI.toast('Preencha o endereço completo antes de finalizar.', 'error');
        return;
      }

      if (!paymentMethod) {
        UI.toast('Selecione uma forma de pagamento.', 'error');
        return;
      }

      button.disabled = true;
      (async () => {
        try {
          const order = await Checkout.finalize({
            address,
            paymentMethod
          });

          UI.close('checkoutModal');
          UI.close('cartDrawer');
          UI.renderCart();
          UI.renderOrderSuccess(order);
          UI.open('orderConfirmedModal');
          UI.toast('Compra confirmada com sucesso!', 'success');
        } catch (err) {
          UI.toast(err.message || 'Erro ao finalizar compra.', 'error');
        } finally {
          button.disabled = false;
        }
      })();
    }

    if (button.matches('#cartButton')) {
      UI.open('cartDrawer');
    }

    if (button.matches('#userButton')) {
      UI.renderUser();
      UI.open('userModal');
    }

    if (button.matches('#showFavorites')) {
      UI.close('userModal');
      UI.renderFavorites();
      UI.open('favoritesModal');
    }

    if (button.matches('#showRegister')) {
      UI.renderRegister();
    }

    if (button.matches('#showLogin')) {
      UI.renderUser();
    }

    if (button.matches('#logout')) {
      User.logout();
      UI.renderUser();

      UI.toast('Você saiu da sua conta.');
    }

    if (button.matches('#menuButton')) {
      $('#mainNav').classList.toggle('mobile-open');

      button.setAttribute(
        'aria-expanded',
        $('#mainNav').classList.contains('mobile-open')
      );
    }

    if (button.matches('[data-category-link]')) {
      $('#categoryFilter').value = button.dataset.categoryLink;

      Filters.state.category = button.dataset.categoryLink;

      UI.renderProducts();
      animateRenderedContent();
    }

    if (button.matches('#searchToggle')) {
      $('#produtos').scrollIntoView({
        behavior: 'smooth'
      });

      setTimeout(() => {
        $('#productSearch').focus();
      }, 500);
    }
  });

  document.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      if (event.target.id === 'loginForm') {
        await User.login(
          event.target.email.value,
          event.target.password.value
        );

        UI.renderUser();

        UI.toast(
          'Login realizado com sucesso!',
          'success'
        );
      }

      if (event.target.id === 'registerForm') {
        const formData = Object.fromEntries(
          new FormData(event.target)
        );

        await User.register(formData);

        UI.renderUser();

        UI.toast(
          'Conta criada. Boas-vindas à Nexora!',
          'success'
        );
      }
    } catch (error) {
      UI.toast(error.message, 'error');
    }
  });

  document.addEventListener('change', (event) => {
    if (event.target.name === 'checkoutAddressMode') {
      const form = document.querySelector('#checkoutForm');

      if (!form) {
        return;
      }

      const useSaved = event.target.value === 'saved';

      Object.entries({
        rua: form.rua,
        numero: form.numero,
        bairro: form.bairro,
        cidade: form.cidade,
        cep: form.cep
      }).forEach(([key, input]) => {
        const address =
          typeof Checkout !== 'undefined'
            ? Checkout.getSavedAddress()
            : null;

        input.disabled = useSaved && !!address;
        input.value = useSaved && address ? address[key] || '' : input.value;
      });
    }
  });

  $('#backdrop').addEventListener('click', () => {
    [
      'cartDrawer',
      'productModal',
      'userModal',
      'favoritesModal',
      'checkoutModal',
      'orderConfirmedModal'
    ].forEach((id) => UI.close(id));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      [
        'cartDrawer',
        'productModal',
        'userModal',
        'favoritesModal',
        'checkoutModal',
        'orderConfirmedModal'
      ].forEach((id) => UI.close(id));
    }
  });
});