const isDelivery = document.body.dataset.delivery === "true";
const DELIVERY_ZONES = {
  zone1: { name: "Zona 1 · Santa Anita → San José Viejo", minimum: 100, fee: 50 },
  zone2: { name: "Zona 2 · Zacatal → Santa Rosa", minimum: 300, fee: 100 },
};
let deliveryLocation = "";
let locationRequest = 0;
const WHATSAPP_NUMBER = "526242112620";
const STORAGE_KEY = "karlitos_order_v1";
const STORAGE_TTL_MS = 6 * 60 * 60 * 1000;
const SAUCE_PRICE = 20;
const BURGER_PROMO_ID = "promo-hamburguesas-mv";
const BURGER_EXTRA_ID = "promo-hamburguesas-extra";

const conTodoIngredients = [
  "tomate",
  "lechuga",
  "crema/mayonesa",
  "mostaza",
  "catsup",
  "salsa",
];

const sauceOptions = [
  "Tamarindo",
  "Buffalo",
  "BBQ",
  "BBQ picante",
  "Mango habanero",
  "Piña Hot",
];

const friesToppings = ["Crema", "Cátsup", "Mostaza", "Queso amarillo", "Chipotle"];
const friesMeats = ["Asada", "Adobada", "Deshebrada"];

const categories = [
  { id: "promos", label: "Promos" },
  { id: "hot-dogs", label: "Hot Dogs" },
  { id: "hamburguesas", label: "Hamburguesas" },
  { id: "boneless-alitas", label: "Boneless/Alitas" },
  { id: "burros", label: "Burros" },
  { id: "tortitas", label: "Tortitas", note: "2 panes de hot dog dorados con mantequilla a la plancha." },
  { id: "papas", label: "Papas" },
  { id: "bebidas", label: "Bebidas" },
];

const categoryLabels = {
  promos: "🔥 Promos",
  "hot-dogs": "🌭 Hot Dogs",
  hamburguesas: "🍔 Burgers",
  "boneless-alitas": "🍗 Boneless",
  burros: "🌯 Burros",
  tortitas: "🥪 Tortitas",
  papas: "🍟 Papas",
  bebidas: "🥤 Bebidas",
};

const products = [
  { id: "promo-hotdogs-martes", category: "promos", name: "Promo Martes · 3 Hot Dogs + papas", price: 150, type: "promo", food: true, customizable: true, pieces: 3, pieceLabel: "Hot Dog", promo: true },
  { id: "promo-tortitas-jueves", category: "promos", name: "Promo Jueves · 3 Tortitas", price: 180, type: "promo", food: true, customizable: true, pieces: 3, pieceLabel: "Tortita", promo: true },
  { id: "promo-hamburguesas-mv", category: "promos", name: "Promo Miércoles/Viernes · 3 Hamburguesas", price: 160, type: "promo", food: true, customizable: true, pieces: 3, pieceLabel: "Hamburguesa", promo: true },
  { id: "promo-hamburguesas-extra", category: "promos", name: "Extra para promo hamburguesas: orden de papas + 1 L de agua de Jamaica", price: 90, type: "promo", food: true, customizable: false, promo: true },
  { id: "combo-familiar-domingo", category: "promos", name: "Domingo · Combo Familiar", price: 460, detail: "3 hamburguesas + boneless + papas + 2 refrescos", type: "promo", food: true, customizable: true, pieces: 3, pieceLabel: "Hamburguesa", promo: true },

  { id: "hotdog-clasico", category: "hot-dogs", name: "Hot Dog clásico", price: 35, type: "con-todo", food: true },
  { id: "hotdog-carne", category: "hot-dogs", name: "Hot Dog con carne", price: 55, type: "con-todo", food: true },
  { id: "hotdog-papas", category: "hot-dogs", name: "Hot Dog con papas", price: 60, type: "con-todo", food: true },
  { id: "hotdog-carne-queso", category: "hot-dogs", name: "Hot Dog carne y queso", price: 65, type: "con-todo", food: true },
  { id: "hotdog-super-especial", category: "hot-dogs", name: "Hot Dog súper especial", price: 85, detail: "Carne, queso, tocino y papitas dentro", type: "con-todo", food: true },

  { id: "hamburguesa-sencilla", category: "hamburguesas", name: "Hamburguesa sencilla", price: 95, type: "con-todo", food: true },
  { id: "hamburguesa-papas", category: "hamburguesas", name: "Hamburguesa con papas", price: 125, type: "con-todo", food: true },
  { id: "hamburguesa-especial", category: "hamburguesas", name: "Hamburguesa especial", price: 145, detail: "Doble carne, queso gratinado, tocino, aguacate y papitas dentro", type: "con-todo", food: true },

  { id: "boneless-sencillos", category: "boneless-alitas", name: "Sencillos", price: 180, type: "boneless", food: true, presentation: "sencillos" },
  { id: "boneless-papas", category: "boneless-alitas", name: "Con papas", price: 210, type: "boneless", food: true, presentation: "con-papas" },
  { id: "boneless-combo", category: "boneless-alitas", name: "Con combo", price: 260, detail: "Incluye papas + bebida + dedos de queso", type: "boneless", food: true, presentation: "con-combo" },

  { id: "super-burro", category: "burros", name: "Super burro", displayName: "Sencillo", price: 115, detail: "Asada, deshebrada o adobada", type: "con-todo", food: true },
  { id: "quesaburro", category: "burros", name: "Quesaburro", price: 145, detail: "Asada, deshebrada o adobada", type: "con-todo", food: true },
  { id: "super-burro-papas", category: "burros", name: "Super burro con papas", displayName: "Sencillo con papas", price: 145, detail: "Asada, deshebrada o adobada", type: "con-todo", food: true },
  { id: "quesaburro-papas", category: "burros", name: "Quesaburro con papas", displayName: "Quesaburro con papas", price: 170, detail: "Asada, deshebrada o adobada", type: "con-todo", food: true },

  { id: "tortita-sencilla", category: "tortitas", name: "Tortita sencilla", price: 95, type: "con-todo", food: true },
  { id: "tortita-papas", category: "tortitas", name: "Tortita con papas", price: 125, type: "con-todo", food: true },
  { id: "tortita-especial", category: "tortitas", name: "Tortita especial", price: 145, detail: "Queso gratinado, aguacate, tocino y papitas dentro", type: "con-todo", food: true },

  { id: "papas", category: "papas", name: "Papas", displayName: "Sencillas", price: 70, type: "fries", customizable: true, food: true },
  { id: "salchipapas", category: "papas", name: "Salchipapas", price: 100, type: "fries", customizable: true, food: true },
  { id: "carnipapas", category: "papas", name: "Carnipapas", price: 110, type: "fries", customizable: true, food: true },
  { id: "papas-especiales", category: "papas", name: "Papas especiales", displayName: "Especiales", price: 170, detail: "Carne, salchichas y queso gratinado", type: "fries", customizable: true, food: true },
  { id: "tocino-frito", category: "papas", name: "Tocino frito", price: 30, type: "standard", food: true },

  { id: "agua-fruta-litro", category: "bebidas", name: "Jamaica / Agua de fruta 1 L", price: 60, type: "drink", drink: true },
  { id: "refresco", category: "bebidas", name: "Refresco", price: 40, type: "drink", drink: true },
  { id: "agua-natural", category: "bebidas", name: "Agua Ciel litro", price: 30, type: "drink", drink: true },
];

const presentationNames = {
  sencillos: { Boneless: "Boneless sencillos", Alitas: "Alitas sencillas" },
  "con-papas": { Boneless: "Boneless con papas", Alitas: "Alitas con papas" },
  "con-combo": { Boneless: "Boneless con combo", Alitas: "Alitas con combo" },
};

const state = {
  cart: [],
  mode: isDelivery ? "Domicilio" : "Recoger",
  customerName: "",
  source: new URLSearchParams(window.location.search).get("src") || "",
  skippedUpsell: false,
  view: "menu",
  transferReady: false,
  onsitePayment: "Caja",
};

let activeProduct = null;
let cartEdit = null;

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const formatMoney = (amount) => money.format(amount || 0);
const findProduct = (id) => products.find((product) => product.id === id);
const cartCount = () => state.cart.reduce((sum, line) => sum + line.quantity, 0);
const cartTotal = () => state.cart.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
const hasFood = () => state.cart.some((line) => line.food);
const hasDrink = () => state.cart.some((line) => line.drink);

const lineSignature = (line) =>
  JSON.stringify({
    productId: line.productId,
    name: line.name,
    unitPrice: line.unitPrice,
    customizations: line.customizations,
    note: line.note,
    promo: line.promo,
  });

const removeProductLines = (productId) => {
  state.cart = state.cart.filter((line) => cartEdit ? line !== cartEdit : line.productId !== productId);
};

const saveState = () => {
  if (isDelivery) return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...state, timestamp: Date.now() })
  );
};

const readSavedState = () => {
  if (isDelivery) return null;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!parsed || !parsed.timestamp || Date.now() - parsed.timestamp > STORAGE_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const addLine = (line, quantity = 1) => {
  const nextLine = { ...line, quantity };
  const signature = lineSignature(nextLine);
  const existing = state.cart.find((cartLine) => lineSignature(cartLine) === signature);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push(nextLine);
  }
  state.skippedUpsell = false;
  render();
  saveState();
};

const addStandardProduct = (product) => {
  addLine({
    productId: product.id,
    name: product.name,
    unitPrice: product.price,
    customizations: product.type === "con-todo" ? ["Con todo"] : [],
    note: "",
    food: Boolean(product.food),
    drink: Boolean(product.drink),
    promo: product.promo ? "Promoción" : "",
  });
};

const updateLineQuantity = (index, delta) => {
  const line = state.cart[index];
  if (!line) return;
  line.quantity += delta;
  if (line.quantity <= 0) {
    state.cart.splice(index, 1);
  }
  if (line.productId === BURGER_PROMO_ID) limitBurgerExtras();
  render();
  saveState();
};

const getProductCount = (productId) =>
  state.cart.reduce((sum, line) => (line.productId === productId ? sum + line.quantity : sum), 0);

// Each optional extra belongs to one hamburger promo.
const limitBurgerExtras = () => {
  let remaining = getProductCount(BURGER_PROMO_ID);
  state.cart = state.cart.filter((line) => {
    if (line.productId !== BURGER_EXTRA_ID) return true;
    line.quantity = Math.min(line.quantity, remaining);
    remaining -= line.quantity;
    return line.quantity > 0;
  });
};

const openBurgerExtraOffer = () => {
  const extra = findProduct(BURGER_EXTRA_ID).price;
  $("#burger-extra-add").textContent = `Agregar extra +${formatMoney(extra)}`;
  openModal($("#burger-extra-modal"));
};

const renderMenu = () => {
  const root = $("#menu-root");
  root.innerHTML = categories
    .map((category) => {
      const rows = products
        .filter((product) => product.category === category.id && product.id !== BURGER_EXTRA_ID)
        .map((product) => {
          const canCustomize = product.type === "con-todo" || product.type === "boneless" || product.customizable;
          const cardName = product.displayName || product.name;
          return `
            <article class="product-row" data-product-id="${product.id}">
              <div class="product-title">
                <strong>${cardName}</strong>
                ${product.detail ? `<span>${product.detail}</span>` : ""}
              </div>
              <div class="product-price">${formatMoney(product.price)}</div>
              <div class="row-actions">
                <div class="qty-control" aria-label="Cantidad de ${cardName}">
                  <button type="button" data-action="minus" aria-label="Quitar ${cardName}">−</button>
                  <span data-count="${product.id}">0</span>
                  <button type="button" data-action="plus" aria-label="Agregar ${cardName}">+</button>
                </div>
                ${canCustomize ? `<button class="customize-button" type="button" data-action="customize">Personalizar</button>` : ""}
              </div>
              ${product.id === BURGER_PROMO_ID ? `
                <div id="burger-extra-inline" class="burger-extra-inline" data-product-id="${BURGER_EXTRA_ID}" hidden>
                  <div class="product-title"><strong>Orden de papas + 1 L de agua de Jamaica · +${formatMoney(findProduct(BURGER_EXTRA_ID).price)}</strong><span>Opcional · Un extra por promo</span></div>
                  <div class="qty-control" aria-label="Extras de orden de papas y 1 L de agua de Jamaica">
                    <button type="button" data-action="minus" aria-label="Quitar extra de orden de papas y 1 L de agua de Jamaica">−</button>
                    <span data-count="${BURGER_EXTRA_ID}">0</span>
                    <button id="burger-extra-plus" type="button" data-action="plus" aria-label="Agregar extra de orden de papas y 1 L de agua de Jamaica">+</button>
                  </div>
                </div>` : ""}
            </article>
          `;
        })
        .join("");

      return `
        <section id="${category.id}" class="menu-section">
          <div class="section-head">
            <h2>${categoryLabels[category.id] || category.label}</h2>
            ${category.note ? `<div class="section-note">${category.note}</div>` : ""}
          </div>
          <div class="product-list">${rows}</div>
        </section>
      `;
    })
    .join("");
};

const renderCounts = () => {
  $("#burger-extra-inline").hidden = getProductCount(BURGER_PROMO_ID) === 0;
  $("#burger-extra-plus").disabled = getProductCount(BURGER_EXTRA_ID) >= getProductCount(BURGER_PROMO_ID);
  $$("[data-count]").forEach((node) => {
    node.textContent = String(getProductCount(node.dataset.count));
  });
};

const escapeText = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

const cartLinesMarkup = (editable = false) => state.cart
    .map((line, index) => {
      const product = findProduct(line.productId);
      const canCustomize = product && (product.customizable || ["con-todo", "boneless"].includes(product.type));
      const details = [
        ...(line.customizations || []),
        line.note ? `Nota: ${line.note}` : "",
        line.promo || "",
      ].filter(Boolean);
      return `
        <article class="cart-line">
          <div>
            <strong>${escapeText(line.name)} ×${line.quantity} — ${formatMoney(line.unitPrice * line.quantity)}</strong>
            ${details.map((detail) => `<small>• ${escapeText(detail)}</small>`).join("")}
          </div>
          ${editable && canCustomize ? `<button type="button" class="customize-button" data-edit-cart="${index}">Personalizar</button>` : ""}
        </article>
      `;
    })
    .join("");

const renderCheckout = () => {
  const checkout = $("#checkout");
  const items = $("#checkout-items");
  const total = $("#checkout-total");
  const upsell = $("#drink-upsell");
  const hasItems = state.cart.length > 0;

  checkout.hidden = (!isDelivery && !hasItems) || state.view !== "checkout";
  if (!hasItems) { items.innerHTML = ""; upsell.hidden = true; total.textContent = formatMoney(0); return; }

  items.innerHTML = cartLinesMarkup();

  total.textContent = formatMoney(cartTotal());
  upsell.hidden = !(hasFood() && !hasDrink() && !state.skippedUpsell);
  renderPaymentRules();
};

const renderCartBar = () => {
  const bar = $("#cart-bar");
  const summary = $("#cart-bar-summary");
  const count = cartCount();
  bar.hidden = count === 0 || state.view === "checkout";
  summary.textContent = `${count} ${count === 1 ? "producto" : "productos"} · ${formatMoney(cartTotal())}`;
};

const renderPaymentRules = () => {
  if (isDelivery) return;
  const pickup = $("#pickup-payment");
  const onsite = $("#onsite-payment");
  const transfer = $("#transfer-ready");
  const link = $("#send-whatsapp");
  const isPickup = state.mode === "Recoger";

  pickup.hidden = !isPickup;
  onsite.hidden = isPickup;
  transfer.checked = Boolean(state.transferReady);
  link.classList.toggle("is-disabled", isPickup && !state.transferReady);
  link.setAttribute("aria-disabled", String(isPickup && !state.transferReady));
};

const buildWhatsAppMessage = () => {
  const lines = ["PEDIDO KARLITOS", ""];
  if (state.customerName) {
    lines.push(`Nombre: ${state.customerName}`, "");
  }

  state.cart.forEach((line) => {
    lines.push(`${line.quantity}x ${line.name} — ${formatMoney(line.unitPrice * line.quantity)}`);
    const details = [
      ...(line.customizations || []),
      line.note ? `Nota: ${line.note}` : "",
    ].filter(Boolean);
    if (details.length) {
      details.forEach((detail) => lines.push(`• ${detail}`));
    } else {
      lines.push("• Normal");
    }
    lines.push("");
  });

  lines.push(`Modalidad: ${state.mode}`);
  if (state.mode === "Recoger") {
    lines.push("Pago indicado por cliente: Transferencia pendiente de verificación por Karlitos");
  } else {
    lines.push(`Pago indicado por cliente: ${state.onsitePayment}`);
  }
  lines.push(`Total estimado: ${formatMoney(cartTotal())}`);
  return lines.join("\n");
};

const updateWhatsapp = () => {
  if (isDelivery) { renderDelivery(); return; }
  const link = $("#send-whatsapp");
  if (!state.cart.length) {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    return;
  }
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
};

const render = () => {
  $("#resume-clear").hidden = state.cart.length === 0;
  renderCounts();
  renderCartBar();
  renderCheckout();
  updateWhatsapp();
};

const openModal = (modal) => {
  modal.hidden = false;
  document.body.style.overflow = "hidden";
};

const closeModal = (modal) => {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (cartEdit && ["custom-modal", "fries-modal", "boneless-modal"].includes(modal.id)) {
    cartEdit = null;
    openCartPreview();
  }
};

const openCartPreview = () => {
  $("#cart-preview-items").innerHTML = cartLinesMarkup(true);
  $("#cart-preview-total").textContent = formatMoney(cartTotal());
  openModal($("#cart-preview-modal"));
  $("#keep-shopping").focus();
};

const customizationCount = (product) =>
  Math.max(1, cartEdit?.quantity || getProductCount(product.id)) * (product.pieces || 1);

const pieceTitle = (index) => activeProduct.pieces
  ? `Promo ${Math.floor(index / activeProduct.pieces) + 1} · ${activeProduct.pieceLabel} ${index % activeProduct.pieces + 1}`
  : `Unidad ${index + 1}`;

const openCustomModal = (product) => {
  activeProduct = product;
  $("#custom-title").textContent = product.name;
  $("#custom-price").textContent = formatMoney(product.price);
  $("#custom-note").value = "";
  $("#with-everything").checked = true;
  $("#bulk-choice").hidden = customizationCount(product) < 2;
  $("#bulk-choice > p").textContent = product.pieces
    ? `${customizationCount(product)} piezas · ¿Todas iguales?`
    : "¿Todas iguales?";
  const bulkSame = $('input[name="bulk-mode"][value="same"]');
  if (bulkSame) bulkSame.checked = true;
  $("#unit-customizations").hidden = true;
  $("#unit-customizations").innerHTML = "";
  $$("[data-global-custom]").forEach((node) => {
    node.hidden = false;
  });

  $("#ingredient-options").innerHTML = conTodoIngredients
    .map(
      (ingredient) => `
        <label>
          <input type="checkbox" name="remove-ingredient" value="${ingredient}" />
          ${ingredient}
        </label>
      `
    )
    .join("");

  $$('input[name="free-option"]').forEach((input) => {
    input.checked = false;
  });
  const onionAsada = $('input[name="onion"][value="asada"]');
  if (onionAsada) onionAsada.checked = true;
  openModal($("#custom-modal"));
};

const getUnitEditorMarkup = (unitNumber) => `
  <article class="unit-card" data-unit-card="${unitNumber}">
    <h3>${pieceTitle(unitNumber - 1)}</h3>
    <div class="sheet-section">
      <p>¿Cómo quieres la cebolla?</p>
      <div class="segmented" role="radiogroup" aria-label="¿Cómo quieres la cebolla?">
        <label><input type="radio" name="unit-onion-${unitNumber}" value="asada" checked /> Cebolla asada</label>
        <label><input type="radio" name="unit-onion-${unitNumber}" value="cruda" /> Cebolla cruda</label>
        <label><input type="radio" name="unit-onion-${unitNumber}" value="sin cebolla" /> Sin cebolla</label>
      </div>
    </div>
    <div class="sheet-section">
      <p>Quitar otros ingredientes</p>
      <div class="chip-grid">
        ${conTodoIngredients
          .map(
            (ingredient) => `
              <label>
                <input type="checkbox" name="unit-remove-${unitNumber}" value="${ingredient}" />
                ${ingredient}
              </label>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="sheet-section">
      <p>Opciones gratis</p>
      <div class="chip-grid">
        <label><input type="checkbox" name="unit-free-${unitNumber}" value="chipotle" /> Chipotle</label>
        <label><input type="checkbox" name="unit-free-${unitNumber}" value="queso amarillo tipo nachos" /> Queso amarillo</label>
      </div>
    </div>
    <label class="note-field">
      <span>Nota especial opcional</span>
      <textarea name="unit-note-${unitNumber}" rows="2" maxlength="120" placeholder="Ej. salsa aparte"></textarea>
    </label>
  </article>
`;

const updateBulkModeUI = () => {
  const quantity = customizationCount(activeProduct);
  const split = $('input[name="bulk-mode"]:checked')?.value === "split";
  const unitWrap = $("#unit-customizations");

  $$("[data-global-custom]").forEach((node) => {
    node.hidden = split;
  });

  unitWrap.hidden = !split;
  unitWrap.innerHTML = split
    ? Array.from({ length: quantity }, (_, index) => getUnitEditorMarkup(index + 1)).join("")
    : "";
};

const buildCustomDetails = (removed, onion, freeOptions) => {
  const normalizedRemoved = onion === "sin cebolla"
    ? Array.from(new Set([...removed, "cebolla"]))
    : removed;
  const details = [];

  if (normalizedRemoved.length) {
    details.push(...normalizedRemoved.map((ingredient) => `Sin ${ingredient}`));
  } else {
    details.push("Con todo");
  }

  if (onion !== "sin cebolla") {
    details.push(`Cebolla ${onion}`);
  }
  details.push(...freeOptions.map((option) => `Con ${option}`));
  return details;
};

const customLineFromValues = ({ removed, onion, freeOptions, note }) => {
  const details = buildCustomDetails(removed, onion, freeOptions);

  return {
    productId: activeProduct.id,
    name: activeProduct.name,
    unitPrice: activeProduct.price,
    customizations: details,
    note,
    food: true,
    drink: false,
    promo: "",
  };
};

const customLineFromForm = () =>
  customLineFromValues({
    removed: $$('input[name="remove-ingredient"]:checked').map((input) => input.value),
    onion: $('input[name="onion"]:checked')?.value || "asada",
    freeOptions: $$('input[name="free-option"]:checked').map((input) => input.value),
    note: $("#custom-note").value.trim(),
  });

const customLinesByUnit = () =>
  $$("[data-unit-card]").map((card) => {
    const unit = card.dataset.unitCard;
    return customLineFromValues({
      removed: $$(`input[name="unit-remove-${unit}"]:checked`).map((input) => input.value),
      onion: $(`input[name="unit-onion-${unit}"]:checked`)?.value || "asada",
      freeOptions: $$(`input[name="unit-free-${unit}"]:checked`).map((input) => input.value),
      note: card.querySelector(`textarea[name="unit-note-${unit}"]`)?.value.trim() || "",
    });
  });

const friesLineFromCard = (card) => {
  const selected = (name) => Array.from(card.querySelectorAll(`input[data-fries="${name}"]:checked`)).map((input) => input.value);
  const meat = selected("meat")[0];
  const toppings = selected("topping");
  const sauces = selected("sauce");
  const ranch = selected("ranch").length > 0;
  return {
    productId: activeProduct.id,
    name: activeProduct.name,
    unitPrice: activeProduct.price + SAUCE_PRICE * (sauces.length + Number(ranch)),
    customizations: [
      ...(meat ? [`Carne: ${meat}`] : []),
      ...(toppings.length ? [`Al gusto: ${toppings.join(", ")}`] : []),
      ...sauces.map((sauce) => `Salsa de la casa: ${sauce} +${formatMoney(SAUCE_PRICE)}`),
      ...(ranch ? [`Ranch +${formatMoney(SAUCE_PRICE)}`] : []),
    ],
    note: "", food: true, drink: false, promo: "",
  };
};

const updateFriesPrice = () => {
  const total = $$("[data-fries-card]").reduce((sum, card) => sum + friesLineFromCard(card).unitPrice, 0);
  const base = activeProduct.price * $$("[data-fries-card]").length;
  $("#fries-price").textContent = `Base: ${formatMoney(base)} · Extras: +${formatMoney(total - base)} · Total: ${formatMoney(total)}`;
  $("#fries-save").textContent = `Guardar · ${formatMoney(total)}`;
};

const openFriesModal = (product) => {
  activeProduct = product;
  const quantity = Math.max(1, cartEdit?.quantity || getProductCount(product.id));
  const existing = (cartEdit ? [cartEdit] : state.cart.filter((line) => line.productId === product.id))
    .flatMap((line) => Array.from({ length: line.quantity }, () => line));
  const hasMeat = ["carnipapas", "papas-especiales"].includes(product.id);
  $("#fries-title").textContent = product.name;
  $("#fries-options").innerHTML = Array.from({ length: quantity }, (_, index) => {
    const options = (values, kind, type = "checkbox") => values.map((value) => `
      <label><input type="${type}" data-fries="${kind}" name="fries-${kind}-${index}" value="${value}" />
      ${value}${kind === "sauce" ? ` +${formatMoney(SAUCE_PRICE)}` : ""}</label>`).join("");
    return `<article data-fries-card class="unit-card">
      ${quantity > 1 ? `<h3>Unidad ${index + 1}</h3>` : ""}
      ${hasMeat ? `<div class="sheet-section"><p>Elige tu carne</p>
        <div class="chip-grid">${options(["Sin preferencia", ...friesMeats], "meat", "radio")}</div>
        <small>Sujeto a disponibilidad. Te confirmamos por WhatsApp.</small></div>` : ""}
      <div class="sheet-section"><p>Agrégalas a tu gusto</p><small>Opcionales y sin costo. No se incluyen por defecto.</small>
        <div class="chip-grid">${options(friesToppings, "topping")}</div></div>
      <div class="sheet-section"><p>Salsas de la casa · +$20 por salsa</p>
        <div class="chip-grid">${options(sauceOptions, "sauce")}</div></div>
      <label class="all-in"><input type="checkbox" data-fries="ranch" value="Ranch" /> Ranch +$20</label>
    </article>`;
  }).join("");
  $$("[data-fries-card]").forEach((card, index) => {
    const details = existing[index]?.customizations || [];
    card.querySelectorAll("[data-fries]").forEach((input) => {
      const value = input.value;
      input.checked = input.dataset.fries === "meat" ? details.includes(`Carne: ${value}`)
        : input.dataset.fries === "topping" ? details.some((detail) => detail.startsWith("Al gusto: ") && detail.slice(10).split(", ").includes(value))
        : input.dataset.fries === "sauce" ? details.includes(`Salsa de la casa: ${value} +${formatMoney(SAUCE_PRICE)}`)
        : details.includes(`Ranch +${formatMoney(SAUCE_PRICE)}`);
      if (value === "Sin preferencia") input.value = "";
    });
  });
  updateFriesPrice();
  openModal($("#fries-modal"));
};

const openBonelessModal = (product) => {
  activeProduct = product;
  $("#boneless-title").textContent = product.name;
  $("#boneless-price").textContent = formatMoney(product.price);
  $("#sauce-options").innerHTML = sauceOptions
    .map(
      (sauce) => `
        <label>
          <input type="checkbox" name="sauce" value="${sauce}" />
          ${sauce}
        </label>
      `
    )
    .join("");
  $("#extra-sauce").innerHTML = `<option value="">Elige salsa extra</option>${sauceOptions
    .map((sauce) => `<option value="${sauce}">${sauce}</option>`)
    .join("")}`;
  $("#extra-sauce-enabled").checked = false;
  $("#extra-sauce-wrap").hidden = true;
  $$('input[name="protein"]').forEach((input) => {
    input.checked = false;
  });
  $("#sauce-count").textContent = "0 / 2";
  openModal($("#boneless-modal"));
};

const enforceSauceLimit = (changedInput) => {
  const checked = $$('input[name="sauce"]:checked');
  if (checked.length > 2) {
    changedInput.checked = false;
  }
  $("#sauce-count").textContent = `${$$('input[name="sauce"]:checked').length} / 2`;
};

const bonelessLineFromForm = () => {
  const protein = $('input[name="protein"]:checked')?.value;
  const sauces = $$('input[name="sauce"]:checked').map((input) => input.value);
  const extraEnabled = $("#extra-sauce-enabled").checked;
  const extraSauce = $("#extra-sauce").value;

  if (!protein) {
    alert("Elige Boneless o Alitas.");
    return null;
  }
  if (!sauces.length) {
    alert("Elige al menos 1 salsa.");
    return null;
  }
  if (extraEnabled && !extraSauce) {
    alert("Elige la salsa extra o desactiva la opción.");
    return null;
  }

  const details = [`Salsas: ${sauces.join(" + ")}`];
  let unitPrice = activeProduct.price;
  if (extraEnabled) {
    details.push(`Salsa extra: ${extraSauce}`);
    details.push("Extra: +$20");
    unitPrice += SAUCE_PRICE;
  }

  return {
    productId: activeProduct.id,
    name: presentationNames[activeProduct.presentation][protein],
    unitPrice,
    customizations: details,
    note: "",
    food: true,
    drink: false,
    promo: "",
  };
};

const restoreSavedState = (saved) => {
  state.cart = Array.isArray(saved.cart) ? saved.cart : [];
  limitBurgerExtras();
  state.mode = saved.mode || "Recoger";
  state.customerName = saved.customerName || "";
  state.source = state.source || saved.source || "";
  state.skippedUpsell = Boolean(saved.skippedUpsell);
  state.view = "menu";
  state.transferReady = Boolean(saved.transferReady);
  state.onsitePayment = saved.onsitePayment || "Caja";
  $("#customer-name").value = state.customerName;
  const modeInput = $(`input[name="order-mode"][value="${CSS.escape(state.mode)}"]`);
  if (modeInput) modeInput.checked = true;
  const onsitePayment = $(`input[name="onsite-payment"][value="${CSS.escape(state.onsitePayment)}"]`);
  if (onsitePayment) onsitePayment.checked = true;
  render();
};

const initEvents = () => {
  $("#menu-root").addEventListener("click", (event) => {
    const row = event.target.closest("[data-product-id]");
    if (!row) return;
    const product = findProduct(row.dataset.productId);
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!product || !action) return;

    if (action === "plus") {
      if (product.id === BURGER_EXTRA_ID && getProductCount(BURGER_EXTRA_ID) >= getProductCount(BURGER_PROMO_ID)) return;
      if (product.type === "boneless") {
        openBonelessModal(product);
      } else {
        addStandardProduct(product);
        if (product.id === BURGER_PROMO_ID) openBurgerExtraOffer();
      }
    }

    if (action === "minus") {
      const index = state.cart.findIndex((line) => line.productId === product.id);
      if (index >= 0) updateLineQuantity(index, -1);
    }

    if (action === "customize") {
      if (product.type === "fries") {
        openFriesModal(product);
      } else if (product.type === "boneless") {
        openBonelessModal(product);
      } else {
        openCustomModal(product);
      }
    }
  });

  $("#burger-extra-add").addEventListener("click", () => {
    if (!$("#burger-extra-modal").hidden && getProductCount(BURGER_EXTRA_ID) < getProductCount(BURGER_PROMO_ID)) {
      addStandardProduct(findProduct(BURGER_EXTRA_ID));
    }
    closeModal($("#burger-extra-modal"));
  });
  $$("[data-close-burger-extra]").forEach((node) => {
    node.addEventListener("click", () => closeModal($("#burger-extra-modal")));
  });

  $("#fries-form").addEventListener("change", updateFriesPrice);
  $("#fries-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const lines = $$("[data-fries-card]").map(friesLineFromCard);
    removeProductLines(activeProduct.id);
    lines.forEach((line) => addLine(line));
    closeModal($("#fries-modal"));
  });
  $$("[data-close-fries]").forEach((node) => {
    node.addEventListener("click", () => closeModal($("#fries-modal")));
  });
  $("#cart-location").href = $(".location-fab").href;

  $("#custom-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const quantity = cartEdit?.quantity || getProductCount(activeProduct.id);
    const bulkMode = $('input[name="bulk-mode"]:checked')?.value || "same";

    if (activeProduct.pieces) {
      const promoCount = Math.max(1, quantity);
      const pieces = bulkMode === "split" ? customLinesByUnit() : [];
      const common = bulkMode === "split" ? null : customLineFromForm();
      removeProductLines(activeProduct.id);
      for (let promo = 0; promo < promoCount; promo += 1) {
        const details = [];
        for (let piece = 0; piece < activeProduct.pieces; piece += 1) {
          const line = common || pieces[promo * activeProduct.pieces + piece];
          details.push(`${activeProduct.pieceLabel} ${piece + 1}: ${line.customizations.join(", ")}${line.note ? ` · Nota: ${line.note}` : ""}`);
        }
        addLine({
          productId: activeProduct.id,
          name: activeProduct.name,
          unitPrice: activeProduct.price,
          customizations: details,
          note: "",
          food: true,
          drink: false,
          promo: "Promoción",
        });
      }
    } else if (quantity > 1 && bulkMode === "split") {
      removeProductLines(activeProduct.id);
      customLinesByUnit().forEach((line, index) => {
        addLine({ ...line, customizations: [`Unidad ${index + 1}`, ...line.customizations] }, 1);
      });
    } else {
      const line = customLineFromForm();
      removeProductLines(activeProduct.id);
      addLine(line, Math.max(1, quantity || 1));
    }

    closeModal($("#custom-modal"));
    if (activeProduct.id === BURGER_PROMO_ID && quantity === 0) openBurgerExtraOffer();
  });

  $$('input[name="bulk-mode"]').forEach((input) => {
    input.addEventListener("change", updateBulkModeUI);
  });

  $("#with-everything").addEventListener("change", (event) => {
    if (event.target.checked) {
      $$('input[name="remove-ingredient"]').forEach((input) => {
        input.checked = false;
      });
    }
  });

  $("#ingredient-options").addEventListener("change", () => {
    $("#with-everything").checked = $$('input[name="remove-ingredient"]:checked').length === 0;
  });

  $("#boneless-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const line = bonelessLineFromForm();
    if (!line) return;
    const quantity = cartEdit?.quantity || 1;
    if (cartEdit) removeProductLines(activeProduct.id);
    addLine(line, quantity);
    closeModal($("#boneless-modal"));
  });

  $("#sauce-options").addEventListener("change", (event) => {
    if (event.target.matches('input[name="sauce"]')) {
      enforceSauceLimit(event.target);
    }
  });

  $("#extra-sauce-enabled").addEventListener("change", (event) => {
    $("#extra-sauce-wrap").hidden = !event.target.checked;
  });

  $$("[data-close-modal]").forEach((node) => {
    node.addEventListener("click", () => closeModal($("#custom-modal")));
  });

  $$("[data-close-boneless]").forEach((node) => {
    node.addEventListener("click", () => closeModal($("#boneless-modal")));
  });

  $("#checkout-items").addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-index]");
    if (!button) return;
    updateLineQuantity(Number(button.dataset.cartIndex), Number(button.dataset.cartDelta));
  });

  const cartPreview = $("#cart-preview-modal");
  const closeCartPreview = () => {
    closeModal(cartPreview);
    $("#view-cart").focus();
  };
  $("#view-cart").addEventListener("click", () => {
    openCartPreview();
  });
  $("#cart-preview-items").addEventListener("click", (event) => {
    const button = event.target.closest("[data-edit-cart]");
    if (!button) return;
    const line = state.cart[Number(button.dataset.editCart)];
    const product = findProduct(line?.productId);
    if (!product) return;
    closeModal(cartPreview);
    cartEdit = line;
    if (product.type === "fries") {
      openFriesModal(product);
    } else if (product.type === "boneless") {
      openBonelessModal(product);
      $$('input[name="protein"]').forEach((input) => {
        input.checked = presentationNames[product.presentation][input.value] === line.name;
      });
      const sauces = line.customizations.find((detail) => detail.startsWith("Salsas: "))?.slice(8).split(" + ") || [];
      $$('input[name="sauce"]').forEach((input) => { input.checked = sauces.includes(input.value); });
      $("#sauce-count").textContent = `${sauces.length} / 2`;
      const extra = line.customizations.find((detail) => detail.startsWith("Salsa extra: "))?.slice(13);
      $("#extra-sauce-enabled").checked = Boolean(extra);
      $("#extra-sauce-wrap").hidden = !extra;
      $("#extra-sauce").value = extra || "";
    } else {
      openCustomModal(product);
      const fillOptions = (details, note, unit) => {
        const prefix = unit ? `unit-` : "";
        const suffix = unit ? `-${unit}` : "";
        const onion = details.find((detail) => detail.startsWith("Cebolla "))?.slice(8) || (details.includes("Sin cebolla") ? "sin cebolla" : "asada");
        $$(`input[name="${prefix}onion${suffix}"]`).forEach((input) => { input.checked = input.value === onion; });
        $$(`input[name="${unit ? `unit-remove-${unit}` : "remove-ingredient"}"]`).forEach((input) => { input.checked = details.includes(`Sin ${input.value}`); });
        $$(`input[name="${unit ? `unit-free-${unit}` : "free-option"}"]`).forEach((input) => { input.checked = details.includes(`Con ${input.value}`); });
        const noteInput = unit ? $(`textarea[name="unit-note-${unit}"]`) : $("#custom-note");
        noteInput.value = note || "";
      };
      if (product.pieces && line.customizations.some((detail) => detail.startsWith(`${product.pieceLabel} 1:`))) {
        $('input[name="bulk-mode"][value="split"]').checked = true;
        updateBulkModeUI();
        for (let unit = 1; unit <= customizationCount(product); unit += 1) {
          const piece = (unit - 1) % product.pieces + 1;
          const detail = line.customizations.find((value) => value.startsWith(`${product.pieceLabel} ${piece}: `)) || "";
          const [options, note] = detail.slice(detail.indexOf(": ") + 2).split(" · Nota: ");
          fillOptions(options.split(", "), note, unit);
        }
      } else {
        fillOptions(line.customizations || [], line.note);
        $("#with-everything").checked = !line.customizations?.some((detail) => detail.startsWith("Sin "));
      }
    }
  });
  $$("[data-close-cart-preview]").forEach((node) => {
    node.addEventListener("click", closeCartPreview);
  });
  cartPreview.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCartPreview();
    if (event.key === "Tab") {
      const buttons = Array.from(cartPreview.querySelectorAll("button"));
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  $("#continue-order").addEventListener("click", () => {
    if (isDelivery && $("#continue-order").disabled) return;
    state.view = "checkout";
    saveState();
    render();
    $("#checkout").scrollIntoView({ behavior: isDelivery ? "instant" : "smooth", block: "start" });
  });

  $("#modify-order").addEventListener("click", () => {
    state.view = "menu";
    saveState();
    render();
    $("#menu-root").scrollIntoView({ behavior: isDelivery ? "instant" : "smooth", block: "start" });
  });

  $("#customer-name").addEventListener("input", (event) => {
    state.customerName = event.target.value.trim();
    saveState();
    updateWhatsapp();
  });

  $$('input[name="order-mode"]').forEach((input) => {
    input.addEventListener("change", () => {
      state.mode = $('input[name="order-mode"]:checked')?.value || "Recoger";
      if (state.mode !== "Recoger") {
        state.transferReady = false;
      }
      saveState();
      renderPaymentRules();
      updateWhatsapp();
    });
  });

  $("#transfer-ready").addEventListener("change", (event) => {
    state.transferReady = event.target.checked;
    saveState();
    renderPaymentRules();
    updateWhatsapp();
  });

  $$('input[name="onsite-payment"]').forEach((input) => {
    input.addEventListener("change", () => {
      state.onsitePayment = $('input[name="onsite-payment"]:checked')?.value || "Caja";
      saveState();
      updateWhatsapp();
    });
  });

  $("#drink-upsell").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.upsellSkip !== undefined) {
      state.skippedUpsell = true;
      render();
      saveState();
      return;
    }
    const product = findProduct(button.dataset.upsellId);
    if (product) addStandardProduct(product);
  });

  $("#send-whatsapp").addEventListener("click", (event) => {
    if (isDelivery) return;
    if (state.mode === "Recoger" && !state.transferReady) {
      event.preventDefault();
      $("#pickup-payment").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    saveState();
  });

  const startFresh = () => {
    state.cart = [];
    state.customerName = "";
    state.mode = isDelivery ? "Domicilio" : "Recoger";
    state.skippedUpsell = false;
    state.view = "menu";
    state.transferReady = false;
    state.onsitePayment = "Caja";
    $("#customer-name").value = "";
    $('input[name="order-mode"][value="Recoger"]').checked = true;
    $('input[name="onsite-payment"][value="Caja"]').checked = true;
    $("#transfer-ready").checked = false;
    $("#resume-panel").hidden = true;
    if (!isDelivery) localStorage.removeItem(STORAGE_KEY);
    if (isDelivery) {
      $("#delivery-form").reset();
      $("#delivery-coverage").value = "";
      ["customer-name", "delivery-phone", "delivery-address"].forEach(id => document.getElementById(id).setCustomValidity(""));
      clearDeliveryLocation();
    }
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  $("#resume-clear").addEventListener("click", startFresh);
  $("#start-fresh").addEventListener("click", startFresh);
  $("#resume-order").addEventListener("click", () => {
    $("#resume-panel").hidden = true;
  });

};

const setActiveNav = (sectionId) => {
  $$("[data-nav-section]").forEach((link) => {
    const isActive = link.dataset.navSection === sectionId;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

const initCategoryTracking = () => {
  $(".category-nav").scrollLeft = 0;
  setActiveNav("promos");

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) {
        setActiveNav(visible.target.id);
      }
    },
    {
      root: null,
      rootMargin: "-116px 0px -62% 0px",
      threshold: [0.12, 0.28, 0.45],
    }
  );

  categories.forEach((category) => {
    const section = document.getElementById(category.id);
    if (section) observer.observe(section);
  });
};

// Delivery shares the existing catalog and cart; personal data never enters storage.
const deliveryValue = (id) => document.getElementById(id).value.trim();
const renderDelivery = () => {
  const subtotal = cartTotal();
  const coverage = deliveryValue("delivery-coverage");
  const zone = DELIVERY_ZONES[coverage];
  const selected = Boolean(zone) || coverage === "unsure";
  const shortage = zone ? Math.max(0, zone.minimum - subtotal) : 0;
  const minimumMessage = shortage ? `Agrega ${formatMoney(shortage)} más para solicitar servicio a domicilio en esta zona.` : "";
  $("#consult-coverage").hidden = coverage !== "unsure";
  $("#menu-root").hidden = !selected;
  $(".category-nav").hidden = !selected;
  $("#delivery-subtotal").textContent = formatMoney(subtotal);
  $("#delivery-fee-label").textContent = zone ? `Envío ${coverage === "zone1" ? "Zona 1" : "Zona 2"}` : "Envío";
  $("#delivery-fee").textContent = zone ? formatMoney(zone.fee) : "Envío por confirmar";
  $("#checkout-total").textContent = zone ? formatMoney(subtotal + zone.fee) : "Total pendiente";
  $("#coverage-note").textContent = zone
    ? `Mínimo ${formatMoney(zone.minimum)} · Envío ${formatMoney(zone.fee)}`
    : coverage === "unsure" ? "Envío por confirmar · Total pendiente. Consulta cobertura por WhatsApp." : "";
  $("#delivery-minimum").textContent = minimumMessage;
  $("#delivery-order-guide").hidden = !selected;
  $("#delivery-progress").textContent = subtotal > 0 ? minimumMessage : "";
  $("#delivery-progress").hidden = subtotal === 0 || !minimumMessage;
  $("#send-whatsapp").disabled = !selected || shortage > 0;
  $("#continue-order").disabled = !selected || shortage > 0;
  $("#checkout").hidden = !selected || state.view !== "checkout";
};

const buildDeliveryMessage = () => {
  const zone = DELIVERY_ZONES[deliveryValue("delivery-coverage")];
  const lines = ["Nueva solicitud de pedido a domicilio", "",
    `Zona: ${zone ? zone.name : "Cobertura por confirmar"}`,
    `Nombre: ${deliveryValue("customer-name")}`,
    `Teléfono: ${deliveryValue("delivery-phone")}`];
  if (deliveryValue("delivery-address")) lines.push(`Dirección: ${deliveryValue("delivery-address")}`);
  if (deliveryLocation) lines.push(`Ubicación: ${deliveryLocation}`);
  if (deliveryValue("delivery-reference")) lines.push(`Referencias: ${deliveryValue("delivery-reference")}`);
  lines.push("", "Productos:");
  state.cart.forEach((line) => {
    lines.push(`${line.quantity}x ${line.name} · ${formatMoney(line.unitPrice)} c/u · Subtotal: ${formatMoney(line.quantity * line.unitPrice)}`);
    (line.customizations || []).forEach((detail) => lines.push(`• ${detail}`));
    if (line.note) lines.push(`Nota: ${line.note}`);
  });
  lines.push("", `Subtotal de productos: ${formatMoney(cartTotal())}`,
    zone ? `Envío: ${formatMoney(zone.fee)}` : "Envío por confirmar",
    zone ? `Total: ${formatMoney(cartTotal() + zone.fee)}` : "Total pendiente");
  lines.push("Pedido y entrega pendientes de confirmación por Karlitos.");
  return lines.join("\n");
};

const syncDeliveryAddress = () => {
  const located = Boolean(deliveryLocation);
  $("#written-address-field").hidden = located;
  $("#delivery-address").required = !located;
  $("#delivery-address").disabled = located;
  $("#delivery-address").setCustomValidity("");
  $("#delivery-reference").required = false;
  $("#delivery-reference").setCustomValidity("");
  $("#delivery-reference-label").textContent = "Referencias (opcional)";
};

const clearDeliveryLocation = () => {
  locationRequest += 1;
  deliveryLocation = "";
  syncDeliveryAddress();
  $("#location-status").textContent = "";
  $("#clear-location").hidden = true;
  $("#use-location").disabled = false;
};

const initDelivery = () => {
  if (!isDelivery) return;
  $("#delivery-coverage").addEventListener("change", renderDelivery);
  $("#consult-coverage").addEventListener("click", () => {
    state.view = "checkout";
    render();
    $("#checkout").scrollIntoView({ behavior: "instant", block: "start" });
  });
  $("#clear-location").addEventListener("click", clearDeliveryLocation);
  $("#write-address").addEventListener("click", clearDeliveryLocation);
  $("#use-location").addEventListener("click", () => {
    clearDeliveryLocation();
    const request = locationRequest;
    const failed = () => {
      if (request !== locationRequest) return;
      $("#use-location").disabled = false;
      $("#location-status").textContent = "No pudimos obtener tu ubicación. Puedes escribir tu dirección.";
    };
    if (!navigator.geolocation || !window.isSecureContext) { failed(); return; }
    $("#use-location").disabled = true;
    $("#location-status").textContent = "Esperando permiso y ubicación…";
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      if (request !== locationRequest) return;
      if (!Number.isFinite(coords.latitude) || !Number.isFinite(coords.longitude)) { failed(); return; }
      deliveryLocation = `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`;
      syncDeliveryAddress();
      $("#location-status").textContent = "Ubicación actual agregada a la solicitud. Comprueba que corresponde al lugar de entrega.";
      $("#clear-location").hidden = false;
      $("#use-location").disabled = false;
    }, failed, { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 });
  });
  $("#delivery-form").addEventListener("submit", (event) => {
    event.preventDefault();
    renderDelivery();
    if ($("#send-whatsapp").disabled) return;
    const name = $("#customer-name");
    const address = $("#delivery-address");
    const phone = $("#delivery-phone");
    name.setCustomValidity(name.value.trim() ? "" : "Escribe tu nombre.");
    address.setCustomValidity(deliveryLocation || address.value.trim() ? "" : "Escribe tu dirección de entrega.");
    const digits = phone.value.replace(/\D/g, "");
    phone.setCustomValidity(digits.length >= 10 && digits.length <= 15 ? "" : "Escribe de 10 a 15 dígitos, incluyendo lada.");
    if (!event.currentTarget.reportValidity()) return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildDeliveryMessage())}`, "_blank", "noopener,noreferrer");
  });
  $("#delivery-form").addEventListener("input", (event) => event.target.setCustomValidity?.(""));
};

renderMenu();
initEvents();
initDelivery();
initCategoryTracking();

const saved = readSavedState();
if (saved && saved.cart?.length) {
  $("#resume-panel").hidden = false;
  $("#resume-clear").hidden = false;
  restoreSavedState(saved);
} else {
  render();
  saveState();
}
