const WHATSAPP_NUMBER = "526242112620";
const STORAGE_KEY = "karlitos_order_v1";
const STORAGE_TTL_MS = 6 * 60 * 60 * 1000;
const SAUCE_PRICE = 20;

const conTodoIngredients = [
  "tomate",
  "cebolla",
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
  { id: "promo-hotdogs-martes", category: "promos", name: "Promo Martes · 3 Hot Dogs + papas", price: 150, type: "promo", food: true, customizable: false, promo: true },
  { id: "promo-tortitas-jueves", category: "promos", name: "Promo Jueves · 3 Tortitas", price: 180, type: "promo", food: true, customizable: false, promo: true },
  { id: "promo-hamburguesas-mv", category: "promos", name: "Promo Miércoles/Viernes · 3 Hamburguesas", price: 160, type: "promo", food: true, customizable: false, promo: true },
  { id: "promo-hamburguesas-extra", category: "promos", name: "Extra papas y agua para promo hamburguesas", price: 90, type: "promo", food: true, customizable: false, promo: true },
  { id: "combo-familiar-domingo", category: "promos", name: "Domingo · Combo Familiar", price: 460, detail: "3 hamburguesas + boneless + papas + 2 refrescos", type: "promo", food: true, customizable: false, promo: true },

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

  { id: "papas", category: "papas", name: "Papas", displayName: "Sencillas", price: 70, type: "standard", food: true },
  { id: "salchipapas", category: "papas", name: "Salchipapas", price: 100, type: "standard", food: true },
  { id: "carnipapas", category: "papas", name: "Carnipapas", price: 110, type: "standard", food: true },
  { id: "papas-especiales", category: "papas", name: "Papas especiales", displayName: "Especiales", price: 170, detail: "Carne, salchichas y queso gratinado", type: "standard", food: true },
  { id: "tocino-frito", category: "papas", name: "Tocino frito", price: 30, type: "standard", food: true },

  { id: "agua-fruta-litro", category: "bebidas", name: "Jamaica / Agua de fruta 1 L", price: 60, type: "drink", drink: true },
  { id: "refresco", category: "bebidas", name: "Refresco", price: 40, type: "drink", drink: true },
  { id: "agua-natural", category: "bebidas", name: "Agua natural", price: 30, type: "drink", drink: true },
];

const presentationNames = {
  sencillos: { Boneless: "Boneless sencillos", Alitas: "Alitas sencillas" },
  "con-papas": { Boneless: "Boneless con papas", Alitas: "Alitas con papas" },
  "con-combo": { Boneless: "Boneless con combo", Alitas: "Alitas con combo" },
};

const state = {
  cart: [],
  mode: "Recoger",
  customerName: "",
  source: new URLSearchParams(window.location.search).get("src") || "",
  skippedUpsell: false,
  view: "menu",
  transferReady: false,
  onsitePayment: "Caja",
};

let activeProduct = null;

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
  state.cart = state.cart.filter((line) => line.productId !== productId);
};

const saveState = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...state, timestamp: Date.now() })
  );
};

const readSavedState = () => {
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
  render();
  saveState();
};

const getProductCount = (productId) =>
  state.cart.reduce((sum, line) => (line.productId === productId ? sum + line.quantity : sum), 0);

const renderMenu = () => {
  const root = $("#menu-root");
  root.innerHTML = categories
    .map((category) => {
      const rows = products
        .filter((product) => product.category === category.id)
        .map((product) => {
          const canCustomize = product.type === "con-todo" || product.type === "boneless";
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
  $$("[data-count]").forEach((node) => {
    node.textContent = String(getProductCount(node.dataset.count));
  });
};

const renderCheckout = () => {
  const checkout = $("#checkout");
  const items = $("#checkout-items");
  const total = $("#checkout-total");
  const upsell = $("#drink-upsell");
  const hasItems = state.cart.length > 0;

  checkout.hidden = !hasItems || state.view !== "checkout";
  if (!hasItems) return;

  items.innerHTML = state.cart
    .map((line, index) => {
      const details = [
        ...(line.customizations || []),
        line.note ? `Nota: ${line.note}` : "",
        line.promo || "",
      ].filter(Boolean);
      return `
        <article class="cart-line">
          <div>
            <strong>${line.name} ×${line.quantity} — ${formatMoney(line.unitPrice * line.quantity)}</strong>
            ${details.map((detail) => `<small>• ${detail}</small>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");

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
  const link = $("#send-whatsapp");
  if (!state.cart.length) {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    return;
  }
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
};

const render = () => {
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
};

const openCustomModal = (product) => {
  activeProduct = product;
  $("#custom-title").textContent = product.name;
  $("#custom-price").textContent = formatMoney(product.price);
  $("#custom-note").value = "";
  $("#with-everything").checked = true;
  $("#bulk-choice").hidden = getProductCount(product.id) < 2;
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
    <h3>Unidad ${unitNumber}</h3>
    <div class="sheet-section">
      <p>Quitar ingredientes</p>
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
      <p>Cebolla</p>
      <div class="segmented">
        <label><input type="radio" name="unit-onion-${unitNumber}" value="asada" checked /> Asada</label>
        <label><input type="radio" name="unit-onion-${unitNumber}" value="cruda" /> Cruda</label>
        <label><input type="radio" name="unit-onion-${unitNumber}" value="sin cebolla" /> Sin cebolla</label>
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
  const quantity = getProductCount(activeProduct?.id);
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
      if (product.type === "boneless") {
        openBonelessModal(product);
      } else {
        addStandardProduct(product);
      }
    }

    if (action === "minus") {
      const index = state.cart.findIndex((line) => line.productId === product.id);
      if (index >= 0) updateLineQuantity(index, -1);
    }

    if (action === "customize") {
      if (product.type === "boneless") {
        openBonelessModal(product);
      } else {
        openCustomModal(product);
      }
    }
  });

  $("#custom-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const quantity = getProductCount(activeProduct.id);
    const bulkMode = $('input[name="bulk-mode"]:checked')?.value || "same";

    if (quantity > 1 && bulkMode === "split") {
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
    addLine(line);
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

  $("#continue-order").addEventListener("click", () => {
    state.view = "checkout";
    saveState();
    render();
    $("#checkout").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("#modify-order").addEventListener("click", () => {
    state.view = "menu";
    saveState();
    render();
    $("#menu-root").scrollIntoView({ behavior: "smooth", block: "start" });
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
    if (state.mode === "Recoger" && !state.transferReady) {
      event.preventDefault();
      $("#pickup-payment").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    saveState();
  });

  $("#resume-clear").addEventListener("click", () => {
    state.cart = [];
    state.customerName = "";
    state.mode = "Recoger";
    state.skippedUpsell = false;
    state.view = "menu";
    state.transferReady = false;
    state.onsitePayment = "Caja";
    $("#customer-name").value = "";
    $('input[name="order-mode"][value="Recoger"]').checked = true;
    localStorage.removeItem(STORAGE_KEY);
    render();
  });

  $("#resume-order").addEventListener("click", () => {
    $("#resume-panel").hidden = true;
  });

  $("#start-fresh").addEventListener("click", () => {
    state.cart = [];
    state.customerName = "";
    state.mode = "Recoger";
    state.skippedUpsell = false;
    state.view = "menu";
    state.transferReady = false;
    state.onsitePayment = "Caja";
    $("#customer-name").value = "";
    $('input[name="order-mode"][value="Recoger"]').checked = true;
    localStorage.removeItem(STORAGE_KEY);
    $("#resume-panel").hidden = true;
    render();
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

renderMenu();
initEvents();
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
