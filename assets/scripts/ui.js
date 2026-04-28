/**
 * ui.js
 * Responsável por toda manipulação do DOM:
 * renderizar menu, carrinho, toasts e animações visuais.
 */

import { getTotal, getItemCount } from "./cart.js";

// ── Formatação de moeda ──────────────────────────────────────────────────────

/**
 * Formata um número para o padrão de moeda brasileiro.
 * @param {number} value
 * @returns {string} Ex: "R$ 12,90"
 */
export function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ── Toast (substitui alert()) ────────────────────────────────────────────────

let toastTimeout = null;

/**
 * Exibe uma notificação toast na tela.
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 */
export function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;

  const icons = { success: "fa-circle-check", error: "fa-circle-xmark", info: "fa-circle-info" };
  toast.innerHTML = `
    <i class="fa-solid ${icons[type]}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("toast--visible"));

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("toast--visible");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, 3000);
}

// ── Renderização do Menu ─────────────────────────────────────────────────────

/**
 * Renderiza os cards de produto no grid do menu.
 * @param {object[]} products
 * @param {Function} onAddClick
 */
export function renderMenu(products, onAddClick) {
  const menuGrid = document.getElementById("menuGrid");

  if (products.length === 0) {
    menuGrid.innerHTML = `
      <div class="menu-empty">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>Nenhum produto encontrado.</p>
      </div>`;
    return;
  }

  const grouped = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  let animationIndex = 0;

  menuGrid.innerHTML = Object.entries(grouped)
    .map(([category, items]) => {
      const cards = items
        .map((product) => {
          animationIndex++;
          return buildProductCard(product, animationIndex);
        })
        .join("");

      return `
        <section class="menu-category">
          <div class="menu-category__head">
            <h3>${category}</h3>
            <span>${items.length} opção${items.length > 1 ? "ões" : ""}</span>
          </div>
          <div class="menu-category__items">${cards}</div>
        </section>`;
    })
    .join("");

  menuGrid.querySelectorAll(".btn-add").forEach((btn) => {
    btn.addEventListener("click", () => onAddClick(btn.dataset.productId));
  });
}

/**
 * Cria o HTML de um card de produto.
 * @param {object} product
 * @param {number} animationIndex
 * @returns {string}
 */
function buildProductCard(product, animationIndex) {
  return `
    <article class="menu-card" style="animation-delay: ${animationIndex * 0.05}s">
      <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
      <div class="product-info">
        <span class="tag">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="card-bottom">
          <strong>${formatCurrency(product.price)}</strong>
          <button
            class="btn-add"
            data-product-id="${product.id}"
            aria-label="Adicionar ${product.name} ao pedido"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </article>`;
}

// ── Renderização do Carrinho ─────────────────────────────────────────────────

/**
 * Atualiza toda a UI do carrinho.
 * @param {object[]} cart
 * @param {number}   deliveryFee
 * @param {Function} onRemove
 */
export function renderCart(cart, deliveryFee, onRemove) {
  const cartList    = document.getElementById("cartList");
  const cartTotal   = document.getElementById("cartTotal");
  const cartHelp    = document.querySelector(".cart-help");
  const mobileCount = document.getElementById("mobileCartCount");
  const mobileTotal = document.getElementById("mobileCartTotal");
  const mobileBadge = document.getElementById("mobileCartBadge");

  const total     = getTotal(cart, deliveryFee);
  const itemCount = getItemCount(cart);

  if (cart.length === 0) {
    cartList.innerHTML = `
      <li class="cart-empty">
        <i class="fa-solid fa-mug-hot"></i>
        <p>Seu pedido está vazio.<br>Adicione itens do cardápio!</p>
      </li>`;
  } else {
    cartList.innerHTML = cart.map((item) => buildCartItem(item)).join("");

    cartList.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => onRemove(btn.dataset.itemId));
    });
  }

  cartTotal.textContent   = formatCurrency(total);
  mobileTotal.textContent = formatCurrency(total);
  mobileCount.textContent = `${itemCount} ${itemCount === 1 ? "item" : "itens"}`;

  if (mobileBadge) {
    mobileBadge.textContent   = itemCount;
    mobileBadge.style.display = itemCount > 0 ? "flex" : "none";
  }

  if (cartHelp) cartHelp.style.display = "none";
}

/**
 * Cria o HTML de um item do carrinho.
 * @param {object} item
 * @returns {string}
 */
function buildCartItem(item) {
  const itemTotal =
    (item.product.price + item.extras.reduce((s, e) => s + e.price, 0)) *
    item.quantity;

  const extrasHtml =
    item.extras.length > 0
      ? `<p class="extras-note">${item.extras.map((e) => e.name).join(", ")}</p>`
      : "";

  const noteHtml = item.note
    ? `<p class="extras-note"><em>Obs: ${item.note}</em></p>`
    : "";

  return `
    <li class="cart-item">
      <div class="cart-item-head">
        <h4>${item.quantity}x ${item.product.name}</h4>
        <button
          type="button"
          class="remove-btn"
          data-item-id="${item.id}"
          aria-label="Remover ${item.product.name}"
        >Remover</button>
      </div>
      ${extrasHtml}
      ${noteHtml}
      <strong>${formatCurrency(itemTotal)}</strong>
    </li>`;
}

// ── Busca ────────────────────────────────────────────────────────────────────

/**
 * Filtra produtos pelo termo de busca e/ou categoria ativa.
 * @param {object[]} allProducts
 * @param {string}   searchTerm
 * @param {string}   activeCategory
 * @returns {object[]}
 */
export function filterProducts(allProducts, searchTerm, activeCategory) {
  const term = searchTerm.toLowerCase().trim();

  return allProducts.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
}

// ── Modal de customização ─────────────────────────────────────────────────────

/**
 * Calcula e atualiza o preço total exibido no modal em tempo real.
 * Leva em conta: preço base do produto × quantidade + extras marcados.
 * @param {object} product - Produto ativo no modal.
 */
function updateModalPrice(product) {
  const quantity = parseInt(document.getElementById("itemQty").value, 10) || 1;

  const checkedExtras = Array.from(
    document.querySelectorAll("input[name='extra']:checked")
  ).map((el) => product.extras[Number(el.value)]);

  const extrasTotal = checkedExtras.reduce((sum, e) => sum + e.price, 0);
  const total       = (product.price + extrasTotal) * quantity;

  const priceEl = document.getElementById("customizePrice");
  priceEl.textContent = `Total: ${formatCurrency(total)}`;

  // Destaque visual quando o preço muda
  priceEl.classList.remove("price-bump");
  requestAnimationFrame(() => priceEl.classList.add("price-bump"));
}

/**
 * Preenche e abre o modal de customização de um produto.
 * @param {object}   product
 * @param {object[]} allProducts
 * @param {Function} onUpsellAdd
 */
export function openCustomizeModal(product, allProducts, onUpsellAdd) {
  document.getElementById("customizeTitle").textContent = product.name;
  document.getElementById("itemQty").value  = 1;
  document.getElementById("itemNote").value = "";

  // Extras com checkboxes
  const extrasList = document.getElementById("extrasList");
  extrasList.innerHTML = (product.extras || [])
    .map(
      (extra, index) => `
      <label class="extra-option">
        <input type="checkbox" name="extra" value="${index}">
        <span class="extra-option__name">${extra.name}</span>
        <span class="extra-option__price">+ ${formatCurrency(extra.price)}</span>
      </label>`
    )
    .join("");

  // Inicializa o preço (sem extras, quantidade 1)
  updateModalPrice(product);

  // Atualiza preço ao mudar quantidade ou extras
  document.getElementById("itemQty").addEventListener("input", () =>
    updateModalPrice(product)
  );
  extrasList.addEventListener("change", () => updateModalPrice(product));

  // Upsell
  const upsellSection = document.getElementById("upsellSection");
  const relatedItems  = allProducts.filter((p) =>
    product.related?.includes(p.id)
  );

  if (relatedItems.length > 0) {
    upsellSection.innerHTML = `
      <p>Aproveite e peça também:</p>
      ${relatedItems
        .map(
          (p) => `
        <div class="upsell-item">
          <span>${p.name} (+${formatCurrency(p.price)})</span>
          <button type="button" class="upsell-btn" data-product-id="${p.id}">
            Adicionar
          </button>
        </div>`
        )
        .join("")}`;

    upsellSection.querySelectorAll(".upsell-btn").forEach((btn) => {
      btn.addEventListener("click", () => onUpsellAdd(btn.dataset.productId));
    });
  } else {
    upsellSection.innerHTML = "";
  }

  document.getElementById("customizeDialog").showModal();
}

// ── Badge de horário de funcionamento ────────────────────────────────────────

/**
 * Atualiza o badge de horário na hero com base no status retornado pelo schedule.js.
 * @param {{ isOpen: boolean|null, label: string, todayHours: string }} status
 */
export function renderScheduleBadge(status) {
  const badge = document.querySelector(".hero__badge");
  if (!badge) return;

  if (status.isOpen === null) {
    badge.textContent = status.label;
    return;
  }

  const dot  = status.isOpen ? "🟢" : "🔴";
  badge.innerHTML = `
    <span class="badge-dot ${status.isOpen ? "badge-dot--open" : "badge-dot--closed"}"></span>
    ${status.label}
  `;

  badge.classList.toggle("hero__badge--open",   status.isOpen);
  badge.classList.toggle("hero__badge--closed", !status.isOpen);
}
