const WHATSAPP_NUMBER = "5518996694585";

const products = [
  {
    id: "espresso",
    category: "Bebidas Quentes",
    name: "Espresso da Casa",
    description: "Blend encorpado com notas de caramelo e cacau.",
    price: 7.9,
    extras: [
      { name: "Dose extra de espresso", price: 3.5 },
      { name: "Leite vegetal", price: 2.8 },
      { name: "Chantilly", price: 2.5 },
    ],
  },
  {
    id: "capuccino",
    category: "Bebidas Quentes",
    name: "Capuccino Cremoso",
    description: "Café, leite vaporizado e canela na medida.",
    price: 13.9,
    extras: [
      { name: "Xarope de baunilha", price: 2.9 },
      { name: "Chantilly", price: 2.5 },
      { name: "Chocolate extra", price: 2.2 },
    ],
  },
  {
    id: "cold-brew",
    category: "Bebidas Geladas",
    name: "Cold Brew Cítrico",
    description: "Extraído a frio por 16h, servido com gelo.",
    price: 15.5,
    extras: [
      { name: "Tônica artesanal", price: 4.5 },
      { name: "Laranja desidratada", price: 1.8 },
    ],
  },
  {
    id: "frappe",
    category: "Bebidas Geladas",
    name: "Frappe de Mocha",
    description: "Textura cremosa com toque de chocolate intenso.",
    price: 18.9,
    extras: [
      { name: "Calda de avela", price: 3.3 },
      { name: "Chantilly", price: 2.5 },
      { name: "Cobertura de brownie", price: 4.2 },
    ],
  },
  {
    id: "croissant",
    category: "Salgados",
    name: "Croissant de Queijo",
    description: "Massa folhada crocante com queijo meia cura.",
    price: 14.5,
    extras: [
      { name: "Queijo extra", price: 3.5 },
      { name: "Tomate confit", price: 2.4 },
    ],
  },
  {
    id: "toast",
    category: "Salgados",
    name: "Toast de Avocado",
    description: "Pão artesanal, avocado temperado e sementes.",
    price: 19.9,
    extras: [
      { name: "Ovo pochê", price: 4.8 },
      { name: "Bacon crocante", price: 5.2 },
    ],
  },
  {
    id: "brownie",
    category: "Doces",
    name: "Brownie de Chocolate",
    description: "Fudge de chocolate 70% com casquinha crocante.",
    price: 12.9,
    extras: [
      { name: "Sorvete de creme", price: 5.8 },
      { name: "Calda de doce de leite", price: 2.8 },
    ],
  },
  {
    id: "cheesecake",
    category: "Doces",
    name: "Cheesecake de Frutas Vermelhas",
    description: "Base amanteigada com cobertura artesanal.",
    price: 16.9,
    extras: [
      { name: "Geleia extra", price: 2.6 },
      { name: "Farofa crocante", price: 2.1 },
    ],
  },
  {
    id: "latte",
    category: "Bebidas Quentes",
    name: "Latte Caramelo",
    description: "Espresso suave com leite cremoso e calda de caramelo.",
    price: 15.9,
    extras: [
      { name: "Dose extra de espresso", price: 3.5 },
      { name: "Leite sem lactose", price: 2.8 },
      { name: "Canela", price: 1.5 },
    ],
  },
  {
    id: "chai-latte",
    category: "Bebidas Quentes",
    name: "Chai Latte",
    description: "Mix de especiarias com leite vaporizado.",
    price: 14.9,
    extras: [
      { name: "Leite vegetal", price: 2.8 },
      { name: "Mel", price: 2.2 },
    ],
  },
  {
    id: "pink-lemonade",
    category: "Bebidas Geladas",
    name: "Pink Lemonade",
    description: "Limonada refrescante com toque de frutas vermelhas.",
    price: 12.9,
    extras: [
      { name: "Hortela extra", price: 1.6 },
      { name: "Agua com gas", price: 1.9 },
    ],
  },
  {
    id: "iced-latte",
    category: "Bebidas Geladas",
    name: "Iced Latte",
    description: "Café gelado com leite e gelo triturado.",
    price: 14.9,
    extras: [
      { name: "Xarope de baunilha", price: 2.9 },
      { name: "Caramelo salgado", price: 3.2 },
    ],
  },
  {
    id: "pao-queijo",
    category: "Salgados",
    name: "Porcao de Pao de Queijo",
    description: "8 unidades assadas na hora, crocantes por fora.",
    price: 13.9,
    extras: [
      { name: "Requeijao cremoso", price: 2.5 },
      { name: "Geleia de pimenta", price: 2.2 },
    ],
  },
  {
    id: "quiche",
    category: "Salgados",
    name: "Quiche de Alho-Poro",
    description: "Fatia individual com massa amanteigada.",
    price: 17.9,
    extras: [
      { name: "Salada verde", price: 4.2 },
      { name: "Bebida lata", price: 6.0 },
    ],
  },
  {
    id: "cookie",
    category: "Doces",
    name: "Cookie Triplo Chocolate",
    description: "Cookie macio com gotas de chocolate meio amargo.",
    price: 10.9,
    extras: [
      { name: "Nutella", price: 3.9 },
      { name: "Sorvete de creme", price: 5.8 },
    ],
  },
  {
    id: "bolo-cenoura",
    category: "Doces",
    name: "Bolo de Cenoura com Brigadeiro",
    description: "Fatia alta com cobertura cremosa de chocolate.",
    price: 13.9,
    extras: [
      { name: "Granulado", price: 1.2 },
      { name: "Calda de chocolate", price: 2.8 },
    ],
  },
  {
    id: "combo-cafe-manha",
    category: "Combos",
    name: "Combo Cafe da Manha",
    description: "Cappuccino + pao de queijo + mini brownie.",
    price: 29.9,
    extras: [
      { name: "Suco de laranja", price: 7.5 },
      { name: "Fruta do dia", price: 4.0 },
    ],
  },
  {
    id: "combo-brunch",
    category: "Combos",
    name: "Combo Brunch",
    description: "Toast de avocado + cold brew + cookie.",
    price: 39.9,
    extras: [
      { name: "Ovo pochê extra", price: 4.8 },
      { name: "Iogurte com granola", price: 8.5 },
    ],
  },
];

const cart = [];
let activeProduct = null;

const menuGrid = document.getElementById("menuGrid");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");
const mobileCartTotal = document.getElementById("mobileCartTotal");
const mobileCartCount = document.getElementById("mobileCartCount");
const mobileCartToggle = document.getElementById("mobileCartToggle");
const mobileCartClose = document.getElementById("mobileCartClose");
const mobileCartBackdrop = document.getElementById("mobileCartBackdrop");
const orderForm = document.getElementById("orderForm");
const orderType = document.getElementById("orderType");
const addressWrap = document.getElementById("addressWrap");
const customerAddress = document.getElementById("customerAddress");

const customizeDialog = document.getElementById("customizeDialog");
const customizeForm = document.getElementById("customizeForm");
const customizeTitle = document.getElementById("customizeTitle");
const customizePrice = document.getElementById("customizePrice");
const itemQty = document.getElementById("itemQty");
const extrasList = document.getElementById("extrasList");
const itemNote = document.getElementById("itemNote");
const cancelCustomize = document.getElementById("cancelCustomize");

function formatMoney(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }

    acc[item.category].push(item);
    return acc;
  }, {});
}

function renderMenu() {
  const grouped = groupByCategory(products);
  const categoryOrder = [
    "Bebidas Quentes",
    "Bebidas Geladas",
    "Salgados",
    "Doces",
    "Combos",
  ];

  const orderedCategories = [
    ...categoryOrder.filter((category) => grouped[category]),
    ...Object.keys(grouped).filter((category) => !categoryOrder.includes(category)),
  ];

  let animationIndex = 0;
  const sections = orderedCategories.map((category) => {
    const cards = grouped[category]
      .map((product) => {
        animationIndex += 1;
        return `
                <article class="menu-card" style="animation-delay:${animationIndex * 0.04}s">
                    <span class="tag">${category}</span>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="card-bottom">
                        <strong>${formatMoney(product.price)}</strong>
                        <button class="btn-add" data-product-id="${product.id}" type="button">Adicionar</button>
                    </div>
                </article>
            `;
      })
      .join("");

    return `
            <section class="menu-category" aria-label="Categoria ${category}">
                <div class="menu-category__head">
                    <h3>${category}</h3>
                    <span>${grouped[category].length} opcoes</span>
                </div>
                <div class="menu-category__items">
                    ${cards}
                </div>
            </section>
        `;
  });

  menuGrid.innerHTML = sections.join("");

  const addButtons = menuGrid.querySelectorAll(".btn-add");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      const product = products.find((item) => item.id === productId);
      openCustomizeDialog(product);
    });
  });
}

function openCustomizeDialog(product) {
  if (!product) {
    return;
  }

  activeProduct = product;
  customizeTitle.textContent = product.name;
  customizePrice.textContent = `Valor base: ${formatMoney(product.price)}`;
  itemQty.value = "1";
  itemNote.value = "";

  if (product.extras.length === 0) {
    extrasList.innerHTML =
      '<p class="no-extras">Sem adicionais para este item.</p>';
  } else {
    extrasList.innerHTML = product.extras
      .map((extra, index) => {
        return `
                    <label class="extra-option">
                        <input type="checkbox" name="extra" value="${index}">
                        <span class="extra-option__name">${extra.name}</span>
                        <span class="extra-option__price">+${formatMoney(extra.price)}</span>
                    </label>
                `;
      })
      .join("");
  }

  customizeDialog.showModal();
}

function addToCart(product, quantity, selectedExtras, note) {
  cart.push({
    id: crypto.randomUUID(),
    product,
    quantity,
    extras: selectedExtras,
    note,
  });

  renderCart();
}

function getItemTotal(item) {
  const extrasTotal = item.extras.reduce((sum, extra) => sum + extra.price, 0);
  return (item.product.price + extrasTotal) * item.quantity;
}

function renderCart() {
  const total = cart.reduce((sum, item) => sum + getItemTotal(item), 0);

  if (cart.length === 0) {
    cartList.innerHTML = '<li class="cart-item">Seu carrinho está vazio.</li>';
    cartTotal.textContent = formatMoney(0);
    if (mobileCartTotal) {
      mobileCartTotal.textContent = formatMoney(0);
    }
    if (mobileCartCount) {
      mobileCartCount.textContent = "0 itens";
    }
    return;
  }

  cartList.innerHTML = cart
    .map((item) => {
      const extrasText =
        item.extras.length > 0
          ? `Adicionais: ${item.extras.map((extra) => extra.name).join(", ")}`
          : "Sem adicionais";

      const noteText = item.note ? ` | Obs.: ${item.note}` : "";

      return `
                <li class="cart-item">
                    <div class="cart-item-head">
                        <h4>${item.quantity}x ${item.product.name}</h4>
                        <button type="button" class="remove-btn" data-remove-id="${item.id}">Remover</button>
                    </div>
                    <p class="extras-note">${extrasText}${noteText}</p>
                    <strong>${formatMoney(getItemTotal(item))}</strong>
                </li>
            `;
    })
    .join("");

  cartTotal.textContent = formatMoney(total);
  if (mobileCartTotal) {
    mobileCartTotal.textContent = formatMoney(total);
  }
  if (mobileCartCount) {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    mobileCartCount.textContent = `${itemCount} ${itemCount === 1 ? "item" : "itens"}`;
  }

  const removeButtons = cartList.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const removeId = button.getAttribute("data-remove-id");
      const itemIndex = cart.findIndex((item) => item.id === removeId);
      if (itemIndex >= 0) {
        cart.splice(itemIndex, 1);
        renderCart();
      }
    });
  });
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 940px)").matches;
}

function closeMobileCart() {
  document.body.classList.remove("mobile-cart-open");
}

function openMobileCart() {
  document.body.classList.add("mobile-cart-open");
}

function getOrderMessage(data) {
  const lines = [
    "*Novo pedido - D'Gusta Cafe*",
    "",
    `*Cliente:* ${data.customerName}`,
    `*Telefone:* ${data.customerPhone}`,
    `*Tipo:* ${data.orderType}`,
    data.customerAddress ? `*Endereco:* ${data.customerAddress}` : null,
    `*Pagamento:* ${data.paymentMethod}`,
    "",
    "*Itens:*",
  ];

  cart.forEach((item) => {
    const extras =
      item.extras.length > 0
        ? ` | adicionais: ${item.extras.map((extra) => extra.name).join(", ")}`
        : "";
    const note = item.note ? ` | obs: ${item.note}` : "";
    lines.push(
      `- ${item.quantity}x ${item.product.name}${extras}${note} (${formatMoney(getItemTotal(item))})`,
    );
  });

  const total = cart.reduce((sum, item) => sum + getItemTotal(item), 0);

  lines.push("");
  lines.push(`*Total:* ${formatMoney(total)}`);

  if (data.notes) {
    lines.push(`*Observacoes gerais:* ${data.notes}`);
  }

  return lines.filter(Boolean).join("\n");
}

orderType.addEventListener("change", () => {
  const isDelivery = orderType.value === "Entrega";
  addressWrap.classList.toggle("is-hidden", !isDelivery);
  customerAddress.required = isDelivery;
});

cancelCustomize.addEventListener("click", () => {
  customizeDialog.close();
});

if (mobileCartToggle) {
  mobileCartToggle.addEventListener("click", () => {
    openMobileCart();
  });
}

if (mobileCartClose) {
  mobileCartClose.addEventListener("click", () => {
    closeMobileCart();
  });
}

if (mobileCartBackdrop) {
  mobileCartBackdrop.addEventListener("click", () => {
    closeMobileCart();
  });
}

window.addEventListener("resize", () => {
  if (!isMobileViewport()) {
    closeMobileCart();
  }
});

customizeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!activeProduct) {
    return;
  }

  const quantity = Number(itemQty.value);
  if (Number.isNaN(quantity) || quantity < 1) {
    alert("Informe uma quantidade valida.");
    return;
  }

  const checkedExtras = Array.from(
    extrasList.querySelectorAll("input[name='extra']:checked"),
  );
  const selectedExtras = checkedExtras.map((extraInput) => {
    const extraIndex = Number(extraInput.value);
    return activeProduct.extras[extraIndex];
  });

  addToCart(activeProduct, quantity, selectedExtras, itemNote.value.trim());
  customizeDialog.close();
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Seu carrinho esta vazio. Adicione ao menos um item.");
    return;
  }

  const data = {
    customerName: document.getElementById("customerName").value.trim(),
    customerPhone: document.getElementById("customerPhone").value.trim(),
    orderType: orderType.value,
    customerAddress: customerAddress.value.trim(),
    paymentMethod: document.getElementById("paymentMethod").value,
    notes: document.getElementById("notes").value.trim(),
  };

  if (!data.customerName || !data.customerPhone) {
    alert("Preencha nome e telefone antes de enviar.");
    return;
  }

  if (data.orderType === "Entrega" && !data.customerAddress) {
    alert("Informe o endereco para entrega.");
    return;
  }

  const message = getOrderMessage(data);
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappLink, "_blank");

  if (isMobileViewport()) {
    closeMobileCart();
  }
});

renderMenu();
renderCart();
