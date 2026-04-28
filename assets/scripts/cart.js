/**
 * cart.js
 * Responsável por toda a lógica de estado do carrinho:
 * adicionar, remover, calcular totais e persistir no localStorage.
 */

const CART_STORAGE_KEY = "dgusta_cart";

/** Carrega o carrinho salvo no localStorage (ou retorna vazio). */
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/** Persiste o carrinho no localStorage. */
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/** Gera um ID único para cada item do carrinho. */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Adiciona um item ao carrinho.
 * @param {object[]} cart  - Estado atual do carrinho.
 * @param {object}   product  - Produto a adicionar.
 * @param {number}   quantity - Quantidade.
 * @param {object[]} extras   - Adicionais selecionados.
 * @param {string}   note     - Observação do item.
 * @returns {object[]} Novo array de carrinho.
 */
export function addItem(cart, product, quantity, extras, note) {
  const newCart = [
    ...cart,
    { id: generateId(), product, quantity, extras, note },
  ];
  saveCart(newCart);
  return newCart;
}

/**
 * Remove um item do carrinho pelo seu ID.
 * @param {object[]} cart - Estado atual do carrinho.
 * @param {string}   id   - ID do item a remover.
 * @returns {object[]} Novo array de carrinho.
 */
export function removeItem(cart, id) {
  const newCart = cart.filter((item) => item.id !== id);
  saveCart(newCart);
  return newCart;
}

/**
 * Calcula o subtotal do carrinho (sem taxa de entrega).
 * @param {object[]} cart
 * @returns {number}
 */
export function getSubtotal(cart) {
  return cart.reduce((acc, item) => {
    const extrasTotal = item.extras.reduce((sum, e) => sum + e.price, 0);
    return acc + (item.product.price + extrasTotal) * item.quantity;
  }, 0);
}

/**
 * Calcula o total do carrinho (subtotal + taxa de entrega).
 * @param {object[]} cart
 * @param {number}   deliveryFee
 * @returns {number}
 */
export function getTotal(cart, deliveryFee = 0) {
  return getSubtotal(cart) + deliveryFee;
}

/**
 * Retorna o total de itens no carrinho (somando quantidades).
 * @param {object[]} cart
 * @returns {number}
 */
export function getItemCount(cart) {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}

/**
 * Limpa todo o carrinho.
 * @returns {object[]} Array vazio.
 */
export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  return [];
}

/** Inicializa o carrinho a partir do localStorage. */
export { loadCart };
