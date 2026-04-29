/**
 * main.js
 * Ponto de entrada da aplicação.
 * Orquestra os módulos: products, cart, ui e schedule.
 */

import { PRODUCTS } from "./products.js";
import { loadCart, addItem, removeItem, getTotal } from "./cart.js";
import {
  renderMenu,
  renderCart,
  filterProducts,
  openCustomizeModal,
  showToast,
  formatCurrency,
  renderScheduleBadge,
} from "./ui.js";
import { getScheduleStatus } from "./schedule.js";

// Configuração

const WHATSAPP_NUMBER = "55991999999"; // Substitua pelo número real (somente dígitos, sem espaços ou símbolos)
const MIN_DELIVERY_VALUE = 20;

// Estado da aplicação

let cart          = loadCart();
let activeProduct = null;
let currentFilter = "all";
let searchTerm    = "";

// Seletores DOM

const orderType        = document.getElementById("orderType");
const deliveryLocation = document.getElementById("deliveryLocation");
const addressWrap      = document.getElementById("addressWrap");
const customerAddress  = document.getElementById("customerAddress");
const orderForm        = document.getElementById("orderForm");
const customerPhone    = document.getElementById("customerPhone");
const customizeDialog  = document.getElementById("customizeDialog");
const customizeForm    = document.getElementById("customizeForm");
const heroCta          = document.querySelector(".hero__cta");

// Helpers

function getDeliveryFee() {
  if (orderType.value !== "Entrega") return 0;
  const selected = deliveryLocation.options[deliveryLocation.selectedIndex];
  return parseFloat(selected?.getAttribute("data-taxa") || 0);
}

function refreshUI() {
  const visibleProducts = filterProducts(PRODUCTS, searchTerm, currentFilter);
  renderMenu(visibleProducts, handleAddButtonClick);
  renderCart(cart, getDeliveryFee(), handleRemoveItem);
}

if (heroCta) {
  heroCta.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Carrinho

function handleRemoveItem(id) {
  cart = removeItem(cart, id);
  renderCart(cart, getDeliveryFee(), handleRemoveItem);
}

function handleAddToCart(product, quantity, extras, note) {
  cart = addItem(cart, product, quantity, extras, note);
  renderCart(cart, getDeliveryFee(), handleRemoveItem);
}

// Modal de customização

function handleAddButtonClick(productId) {
  activeProduct = PRODUCTS.find((p) => p.id === productId);
  if (!activeProduct) return;
  openCustomizeModal(activeProduct, PRODUCTS, handleUpsellAdd);
}

function handleUpsellAdd(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  handleAddToCart(product, 1, [], "Sugestão da casa");
  showToast(`${product.name} adicionado ao pedido!`);
}

customizeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!activeProduct) return;

  const quantity = parseInt(document.getElementById("itemQty").value, 10);
  const checkedExtras = Array.from(
    document.querySelectorAll("input[name='extra']:checked")
  ).map((el) => activeProduct.extras[Number(el.value)]);
  const note = document.getElementById("itemNote").value.trim();

  handleAddToCart(activeProduct, quantity, checkedExtras, note);
  showToast(`${activeProduct.name} adicionado ao pedido!`);
  customizeDialog.close();
});

document
  .getElementById("cancelCustomize")
  .addEventListener("click", () => customizeDialog.close());

// Filtros de categoria

const categoryFilters = document.getElementById("categoryFilters");

categoryFilters.addEventListener("click", (event) => {
  const btn = event.target.closest(".filter-btn");
  if (!btn || !categoryFilters.contains(btn)) return;

  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.getAttribute("data-category");
  refreshUI();
});

// Busca de produtos

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  refreshUI();
});

// Entrega

orderType.addEventListener("change", () => {
  const isDelivery = orderType.value === "Entrega";
  addressWrap.classList.toggle("is-hidden", !isDelivery);
  if (!isDelivery) deliveryLocation.value = "";
  renderCart(cart, getDeliveryFee(), handleRemoveItem);
});

deliveryLocation.addEventListener("change", () => {
  renderCart(cart, getDeliveryFee(), handleRemoveItem);
});

// Máscara de telefone

customerPhone.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "").slice(0, 11);
  if (value.length > 6) {
    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  } else if (value.length > 2) {
    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else if (value.length > 0) {
    value = `(${value}`;
  }
  e.target.value = value;
});

// WhatsApp

function buildWhatsAppMessage(data) {
  const deliveryFee = getDeliveryFee();
  const total       = getTotal(cart, deliveryFee);
  const isDelivery  = data.orderType === "Entrega";

  let msg = `*Novo Pedido - D'Gusta Café*\n`;
  msg += `------------------------------\n`;
  msg += `*Cliente:* ${data.customerName}\n`;
  msg += `*Telefone:* ${data.customerPhone}\n`;
  msg += `*Tipo:* ${data.orderType}\n`;

  if (isDelivery) {
    msg += `*Bairro:* ${deliveryLocation.value}\n`;
    msg += `*Endereço:* ${data.customerAddress}\n`;
    msg += `*Taxa de entrega:* ${formatCurrency(deliveryFee)}\n`;
  }

  msg += `------------------------------\n`;

  cart.forEach((item) => {
    msg += `*${item.quantity}x ${item.product.name}*\n`;
    if (item.extras.length > 0) {
      msg += ` _Extras: ${item.extras.map((e) => e.name).join(", ")}_\n`;
    }
    if (item.note) msg += ` _Obs: ${item.note}_\n`;
    msg += "\n";
  });

  msg += `------------------------------\n`;
  msg += `*Pagamento:* ${data.paymentMethod}\n`;
  msg += `*TOTAL: ${formatCurrency(total)}*`;

  return msg;
}

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    showToast("Adicione itens ao pedido antes de enviar!", "error");
    return;
  }

  const isDelivery = orderType.value === "Entrega";
  if (isDelivery) {
    const totalWithFee = getTotal(cart, getDeliveryFee());
    if (totalWithFee < MIN_DELIVERY_VALUE) {
      showToast(
        `Pedido mínimo para entrega: ${formatCurrency(MIN_DELIVERY_VALUE)}`,
        "error"
      );
      return;
    }
    if (!deliveryLocation.value || !customerAddress.value.trim()) {
      showToast("Selecione o bairro e informe o endereço.", "error");
      return;
    }
  }

  const data = {
    customerName:    document.getElementById("customerName").value.trim(),
    customerPhone:   customerPhone.value.trim(),
    orderType:       orderType.value,
    customerAddress: customerAddress.value.trim(),
    paymentMethod:   document.getElementById("paymentMethod").value,
  };

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(data)
  )}`;
  window.open(url, "_blank");
});

// Carrinho mobile

const mobileToggle   = document.getElementById("mobileCartToggle");
const mobileClose    = document.getElementById("mobileCartClose");
const mobileBackdrop = document.getElementById("mobileCartBackdrop");

mobileToggle.addEventListener("click",   () => document.body.classList.add("mobile-cart-open"));
mobileClose.addEventListener("click",    () => document.body.classList.remove("mobile-cart-open"));
mobileBackdrop.addEventListener("click", () => document.body.classList.remove("mobile-cart-open"));

// Horário de funcionamento

async function initSchedule() {
  const status = await getScheduleStatus();
  renderScheduleBadge(status);
}

// Inicialização

refreshUI();
initSchedule();

// Habilitar arrastar horizontal para filtros de categoria (mouse/toque)
(function enableHorizontalDragging(){
  const dragTargets = document.querySelectorAll('.category-filters, .menu-category__items');
  const dragState = new WeakMap();

  dragTargets.forEach((target) => {
    let pointerDown = false;
    let dragStarted = false;
    let capturedPointerId = null;

    target.style.cursor = 'grab';

    target.addEventListener('pointerdown', (event) => {
      pointerDown = true;
      dragStarted = false;
      capturedPointerId = null;
      dragState.set(target, {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        scrollLeft: target.scrollLeft,
      });
    });

    target.addEventListener('pointermove', (event) => {
      if (!pointerDown) return;
      const state = dragState.get(target);
      if (!state) return;

      const deltaX = Math.abs(event.clientX - state.startX);
      const deltaY = Math.abs(event.clientY - state.startY);
      if (!dragStarted && deltaX < 8 && deltaY < 8) return;

      if (!dragStarted) {
        dragStarted = true;
        capturedPointerId = event.pointerId;
        try { target.setPointerCapture(event.pointerId); } catch (err) {}
      }

      target.classList.add('is-dragging');
      const walk = state.startX - event.clientX;
      target.scrollLeft = state.scrollLeft + walk;
    });

    const stop = (event) => {
      pointerDown = false;
      target.classList.remove('is-dragging');
      if (capturedPointerId !== null) {
        try { target.releasePointerCapture(capturedPointerId); } catch (err) {}
      }
      capturedPointerId = null;
      dragState.delete(target);
    };

    target.addEventListener('pointerup', stop);
    target.addEventListener('pointercancel', stop);
    target.addEventListener('pointerleave', stop);
  });
})();
