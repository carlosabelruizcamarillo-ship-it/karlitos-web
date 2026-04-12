document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    const section = document.querySelector(targetId);
    if (!section) {
      return;
    }

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const whatsappNumber = "526242112620";
const EXTRA_SAUCE_PRICE = 20;
const friesSourceKeys = new Set([
  "Papas a la francesa",
  "Salchipapas",
  "Carnipapas",
  "Papas especiales",
]);

const cart = new Map();

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const formatCurrency = (value) => currencyFormatter.format(value || 0);

const cartItemsContainer = document.getElementById("cart-items");
const cartEmptyState = document.getElementById("cart-empty");
const cartTotal = document.getElementById("cart-total");
const sendOrderWhatsapp = document.getElementById("send-order-whatsapp");
const paymentTotalInput = document.getElementById("payment-total");
const customerNameInput = document.getElementById("customer-name");

const bonelessModal = document.getElementById("boneless-modal");
const bonelessModalTitle = document.getElementById("boneless-modal-title");
const bonelessModalCopy = document.getElementById("boneless-modal-copy");
const bonelessSauceSelector = bonelessModal?.querySelector('.sauce-selector[data-sauce-target="boneless-modal"]');
const bonelessSauceStep = bonelessModal?.querySelector("[data-boneless-sauce-step]");
const bonelessExtraSauceToggle = document.getElementById("modal-extra-sauce-toggle");
const bonelessExtraSauceSelect = document.getElementById("modal-extra-sauce-select");
const bonelessExtraSauceControls = document.querySelector("[data-extra-sauce-controls-modal]");
const bonelessConfirmButton = document.getElementById("confirm-boneless-selection");

const friesModal = document.getElementById("fries-modal");
const friesModalTitle = document.getElementById("fries-modal-title");
const friesModalCopy = document.getElementById("fries-modal-copy");
const friesSauceToggle = document.getElementById("fries-sauce-toggle");
const friesSauceSelect = document.getElementById("fries-sauce-select");
const friesSauceControls = document.querySelector("[data-fries-sauce-controls]");
const friesConfirmButton = document.getElementById("confirm-fries-selection");
const friesItemField = document.getElementById("fries-item-field");
const friesItemSelect = document.getElementById("fries-item-select");
const openFriesSauceButton = document.getElementById("open-fries-sauce");

const presentationConfig = {
  sencillos: {
    label: "Sencillos",
    bonelessName: "Boneless sencillos",
    alitasName: "Alitas sencillas",
  },
  "con-papas": {
    label: "Con papas",
    bonelessName: "Boneless con papas",
    alitasName: "Alitas con papas",
  },
  "con-combo": {
    label: "Con combo",
    bonelessName: "Boneless con combo",
    alitasName: "Alitas con combo",
  },
};

const bonelessModalState = {
  presentationKey: "",
  price: 0,
  protein: "",
};

const friesModalState = {
  name: "",
  price: 0,
};

const getCartTotal = () =>
  Array.from(cart.values()).reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

const buildCartKey = (name, details) =>
  `${name}::${details.map((detail) => `${detail.label}:${detail.value}`).join("|")}`;

const getCheckedValues = (container) => {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(
    (input) => input.value
  );
};

const getSelectedSauces = (container) => getCheckedValues(container);

const bindSauceSelectorLimit = (selector) => {
  if (!selector) {
    return;
  }

  const hint = selector.querySelector(".sauce-selector__hint");
  selector.addEventListener("change", (event) => {
    const checked = getSelectedSauces(selector);
    if (checked.length <= 2) {
      if (hint) {
        hint.textContent = "Puedes elegir hasta 2 salsas sin costo extra.";
        hint.classList.remove("is-error");
      }
      return;
    }

    event.target.checked = false;
    if (hint) {
      hint.textContent = "Solo puedes elegir hasta 2 salsas.";
      hint.classList.add("is-error");
    }
  });
};

bindSauceSelectorLimit(bonelessSauceSelector);

if (bonelessExtraSauceToggle && bonelessExtraSauceControls) {
  bonelessExtraSauceToggle.addEventListener("change", () => {
    const enabled = bonelessExtraSauceToggle.checked;
    bonelessExtraSauceControls.hidden = !enabled;
    if (!enabled && bonelessExtraSauceSelect) {
      bonelessExtraSauceSelect.value = "";
    }
  });
}

if (friesSauceToggle && friesSauceControls) {
  friesSauceToggle.addEventListener("change", () => {
    const enabled = friesSauceToggle.checked;
    friesSauceControls.hidden = !enabled;
    if (!enabled && friesSauceSelect) {
      friesSauceSelect.value = "";
    }
  });
}

const getDisplayNameForProtein = (protein, presentationKey) => {
  const config = presentationConfig[presentationKey];
  if (!config) {
    return "";
  }

  return protein === "Alitas" ? config.alitasName : config.bonelessName;
};

const closeBonelessModal = () => {
  if (!bonelessModal) {
    return;
  }

  bonelessModal.hidden = true;
  document.body.style.overflow = "";
};

const closeFriesModal = () => {
  if (!friesModal) {
    return;
  }

  friesModal.hidden = true;
  document.body.style.overflow = "";
};

const openBonelessModal = (trigger) => {
  const presentationKey = trigger.dataset.bonelessPresentation;
  const config = presentationConfig[presentationKey];
  if (!config || !bonelessModal) {
    return;
  }

  bonelessModalState.presentationKey = presentationKey;
  bonelessModalState.price = Number(trigger.dataset.productPrice);
  bonelessModalState.protein = "";

  bonelessModalTitle.textContent = `${config.label}: elige si lo quieres en boneless o alitas`;
  bonelessModalCopy.textContent =
    "Primero elige si lo quieres en boneless o alitas. Después se mostrarán las salsas.";

  bonelessModal.querySelectorAll("[data-protein-choice]").forEach((button) => {
    button.classList.remove("is-active");
  });

  if (bonelessSauceStep) {
    bonelessSauceStep.hidden = true;
  }

  bonelessSauceSelector?.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = false;
  });

  const hint = bonelessSauceSelector?.querySelector(".sauce-selector__hint");
  if (hint) {
    hint.textContent = "Puedes elegir hasta 2 salsas sin costo extra.";
    hint.classList.remove("is-error");
  }

  if (bonelessExtraSauceToggle) {
    bonelessExtraSauceToggle.checked = false;
  }
  if (bonelessExtraSauceControls) {
    bonelessExtraSauceControls.hidden = true;
  }
  if (bonelessExtraSauceSelect) {
    bonelessExtraSauceSelect.value = "";
  }
  if (bonelessConfirmButton) {
    bonelessConfirmButton.disabled = true;
  }

  bonelessModal.hidden = false;
  document.body.style.overflow = "hidden";
};

const getFriesCartChoices = () =>
  Array.from(cart.values()).filter((item) => friesSourceKeys.has(item.sourceKey));

const resetFriesModalControls = () => {
  if (friesSauceToggle) {
    friesSauceToggle.checked = false;
  }
  if (friesSauceControls) {
    friesSauceControls.hidden = true;
  }
  if (friesSauceSelect) {
    friesSauceSelect.value = "";
  }
  if (friesConfirmButton) {
    friesConfirmButton.disabled = false;
  }
};

const openFriesModalForCard = (trigger) => {
  if (!friesModal || !friesItemSelect || !friesItemField) {
    return;
  }

  friesModalState.name = trigger.dataset.productName;
  friesModalState.price = Number(trigger.dataset.productPrice);
  friesModalTitle.textContent = trigger.dataset.productName;
  friesModalCopy.textContent = "Si quieres, agrega una salsa a tus papas por +$20 por porción.";

  friesItemField.hidden = true;
  friesItemSelect.innerHTML = "";
  friesItemSelect.append(new Option(trigger.dataset.productName, trigger.dataset.productName));
  friesItemSelect.value = trigger.dataset.productName;

  resetFriesModalControls();
  friesModal.hidden = false;
  document.body.style.overflow = "hidden";
};

const openFriesSaucePicker = () => {
  if (!friesModal || !friesItemSelect || !friesItemField) {
    return;
  }

  const friesChoices = getFriesCartChoices();
  friesModal.hidden = false;
  document.body.style.overflow = "hidden";
  friesModalTitle.textContent = "Agrega salsa a tus papas";

  if (!friesChoices.length) {
    friesModalCopy.textContent = "Primero agrega unas papas al pedido para poder elegir la salsa.";
    friesItemField.hidden = true;
    friesItemSelect.innerHTML = "";
    resetFriesModalControls();
    if (friesConfirmButton) {
      friesConfirmButton.disabled = true;
    }
    return;
  }

  friesModalCopy.textContent = "Selecciona a qué papas quieres agregarles salsa por +$20.";
  friesItemField.hidden = false;
  friesItemSelect.innerHTML = "";
  friesChoices.forEach((item) => {
    friesItemSelect.append(new Option(item.name, item.sourceKey));
  });

  friesItemSelect.value = friesChoices[0].sourceKey;
  friesModalState.name = friesChoices[0].name;
  friesModalState.price = friesChoices[0].sourceKey === friesChoices[0].name
    ? getBasePriceByName(friesChoices[0].sourceKey)
    : friesChoices[0].unitPrice;

  resetFriesModalControls();
};

const getBasePriceByName = (name) => {
  const card = document.querySelector(`#menu .product-card[data-product-name="${CSS.escape(name)}"]`);
  return card ? Number(card.dataset.productPrice) : 0;
};

bonelessModal?.querySelectorAll("[data-close-boneless-modal]").forEach((element) => {
  element.addEventListener("click", closeBonelessModal);
});

friesModal?.querySelectorAll("[data-close-fries-modal]").forEach((element) => {
  element.addEventListener("click", closeFriesModal);
});

bonelessModal?.querySelectorAll("[data-protein-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    bonelessModalState.protein = button.dataset.proteinChoice;
    bonelessModal?.querySelectorAll("[data-protein-choice]").forEach((choice) => {
      choice.classList.toggle("is-active", choice === button);
    });
    if (bonelessSauceStep) {
      bonelessSauceStep.hidden = false;
    }
    if (bonelessConfirmButton) {
      bonelessConfirmButton.disabled = false;
    }
  });
});

friesItemSelect?.addEventListener("change", () => {
  const item = getFriesCartChoices().find((entry) => entry.sourceKey === friesItemSelect.value);
  if (!item) {
    return;
  }

  friesModalState.name = item.sourceKey;
  friesModalState.price = getBasePriceByName(item.sourceKey);
});

const getStandardProductConfig = (element) => ({
  key: buildCartKey(element.dataset.productName, []),
  name: element.dataset.productName,
  unitPrice: Number(element.dataset.productPrice),
  details: [],
  sourceKey: element.dataset.productName,
});

const getBonelessProductConfig = () => {
  if (!bonelessModalState.protein) {
    return null;
  }

  const selectedSauces = getSelectedSauces(bonelessSauceSelector);
  const hint = bonelessSauceSelector?.querySelector(".sauce-selector__hint");
  if (!selectedSauces.length) {
    if (hint) {
      hint.textContent = "Elige al menos 1 salsa para continuar.";
      hint.classList.add("is-error");
    }
    return null;
  }

  const details = [
    {
      label: "Salsas",
      value: selectedSauces.join(" + "),
    },
  ];

  let unitPrice = bonelessModalState.price;

  if (bonelessExtraSauceToggle?.checked && !bonelessExtraSauceSelect?.value) {
    if (hint) {
      hint.textContent = "Elige la salsa extra o desactiva la opción adicional.";
      hint.classList.add("is-error");
    }
    return null;
  }

  if (bonelessExtraSauceToggle?.checked && bonelessExtraSauceSelect?.value) {
    details.push({
      label: "Salsa extra",
      value: bonelessExtraSauceSelect.value,
    });
    details.push({
      label: "Extra",
      value: "+$20",
    });
    unitPrice += EXTRA_SAUCE_PRICE;
  }

  const name = getDisplayNameForProtein(
    bonelessModalState.protein,
    bonelessModalState.presentationKey
  );

  return {
    key: buildCartKey(name, details),
    name,
    unitPrice,
    details,
    sourceKey: `boneless:${bonelessModalState.presentationKey}`,
  };
};

const getFriesProductConfig = () => {
  const details = [];
  let unitPrice = friesModalState.price;

  if (friesSauceToggle?.checked && !friesSauceSelect?.value) {
    friesModalCopy.textContent = "Elige una salsa para tus papas o desactiva la opción extra.";
    return null;
  }

  if (friesSauceToggle?.checked && friesSauceSelect?.value) {
    details.push({
      label: "Salsa para papas",
      value: friesSauceSelect.value,
    });
    details.push({
      label: "Extra",
      value: "+$20",
    });
    unitPrice += EXTRA_SAUCE_PRICE;
  }

  return {
    key: buildCartKey(friesModalState.name, details),
    name: friesModalState.name,
    unitPrice,
    details,
    sourceKey: friesModalState.name,
  };
};

const addToCart = (itemConfig) => {
  if (!itemConfig) {
    return;
  }

  const existing = cart.get(itemConfig.key);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.set(itemConfig.key, { ...itemConfig, quantity: 1 });
  }
  renderCart();
};

const getCountForSourceKey = (sourceKey) =>
  Array.from(cart.values()).reduce((sum, item) => {
    return item.sourceKey === sourceKey ? sum + item.quantity : sum;
  }, 0);

const removeOneBySourceKey = (sourceKey) => {
  const entries = Array.from(cart.entries()).reverse();
  const match = entries.find(([, item]) => item.sourceKey === sourceKey);
  if (!match) {
    return;
  }

  const [key, item] = match;
  item.quantity -= 1;
  if (item.quantity <= 0) {
    cart.delete(key);
  }
  renderCart();
};

const ensureProductQuantityControls = () => {
  document.querySelectorAll("#menu .product-card").forEach((card) => {
    if (card.querySelector(".product-quantity")) {
      return;
    }

    const controls = document.createElement("div");
    controls.className = "product-quantity";
    controls.innerHTML = `
      <button type="button" data-qty-action="decrease" aria-label="Quitar uno">-</button>
      <span>0</span>
      <button type="button" data-qty-action="increase" aria-label="Agregar uno">+</button>
    `;
    card.appendChild(controls);
  });
};

const updateProductQuantityControls = () => {
  document.querySelectorAll("#menu .product-card").forEach((card) => {
    const valueNode = card.querySelector(".product-quantity span");
    if (!valueNode) {
      return;
    }

    const sourceKey = card.dataset.bonelessPresentation
      ? `boneless:${card.dataset.bonelessPresentation}`
      : card.dataset.productName;

    valueNode.textContent = String(getCountForSourceKey(sourceKey));
  });
};

const updateOrderWhatsappLink = () => {
  if (!sendOrderWhatsapp) {
    return;
  }

  if (!cart.size) {
    sendOrderWhatsapp.href = `https://wa.me/${whatsappNumber}`;
    return;
  }

  const customerName = customerNameInput?.value.trim();
  const selectedPayment = document.querySelector('input[name="payment-method"]:checked')?.value;
  const paymentLabels = {
    pickup: "Pagar al recoger",
    transfer: "Transferencia / QR",
    cash: "Efectivo al recoger",
  };

  const lines = Array.from(cart.values()).flatMap((item) => [
    `- ${item.name} x${item.quantity}`,
    ...item.details.map((detail) => `${detail.label}: ${detail.value}`),
    "",
  ]);

  const message = [
    "Hola, quiero hacer este pedido:",
    "",
    ...(customerName ? [`Nombre: ${customerName}`, ""] : []),
    ...lines,
    `Total: ${formatCurrency(getCartTotal())}`,
    `Método de pago: ${paymentLabels[selectedPayment] || "Por confirmar"}`,
  ].join("\n");

  sendOrderWhatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const syncPaymentTotal = () => {
  if (paymentTotalInput) {
    paymentTotalInput.value = getCartTotal() || "";
    paymentTotalInput.dispatchEvent(new Event("input"));
  }
};

const renderCart = () => {
  if (!cartItemsContainer || !cartEmptyState || !cartTotal) {
    return;
  }

  const items = Array.from(cart.values());

  cartItemsContainer.innerHTML = items
    .map((item) => {
      const detailsMarkup = item.details.length
        ? `<div class="cart-row-details">${item.details
            .map((detail) => `<small>${detail.label}: ${detail.value}</small>`)
            .join("")}</div>`
        : "";

      return `
        <div class="cart-row">
          <div>
            <div class="cart-row-name">${item.name}</div>
            ${detailsMarkup}
          </div>
          <div class="cart-qty">
            <button type="button" data-action="decrease" data-key="${item.key}">-</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="increase" data-key="${item.key}">+</button>
          </div>
          <strong>${formatCurrency(item.unitPrice * item.quantity)}</strong>
          <button type="button" class="cart-remove" data-action="remove" data-key="${item.key}">Quitar</button>
        </div>
      `;
    })
    .join("");

  const hasItems = items.length > 0;
  cartItemsContainer.hidden = !hasItems;
  cartEmptyState.hidden = hasItems;
  cartTotal.textContent = formatCurrency(getCartTotal());
  updateProductQuantityControls();
  updateOrderWhatsappLink();
  syncPaymentTotal();
};

document.querySelectorAll("#menu .product-card[data-product-name]").forEach((card) => {
  if (card.dataset.friesItem === "true") {
    return;
  }

  card.addEventListener("click", (event) => {
    if (event.target.closest("[data-qty-action]")) {
      return;
    }
    addToCart(getStandardProductConfig(card));
  });
});

document.querySelectorAll('#menu .product-card[data-fries-item="true"]').forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("[data-qty-action]")) {
      return;
    }
    openFriesModalForCard(card);
  });
});

document.querySelectorAll("[data-boneless-presentation]").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("[data-qty-action]")) {
      return;
    }
    openBonelessModal(card);
  });
});

document.querySelectorAll("#promociones [data-product-name][data-product-price]").forEach((element) => {
  element.addEventListener("click", (event) => {
    const actionButton = event.target.closest(".add-to-cart");
    if (!actionButton) {
      return;
    }

    event.preventDefault();
    addToCart({
      key: buildCartKey(element.dataset.productName, []),
      name: element.dataset.productName,
      unitPrice: Number(element.dataset.productPrice),
      details: [],
      sourceKey: element.dataset.productName,
    });
  });
});

document.querySelector("#menu")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-qty-action]");
  if (!button) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const card = button.closest(".product-card");
  if (!card) {
    return;
  }

  const sourceKey = card.dataset.bonelessPresentation
    ? `boneless:${card.dataset.bonelessPresentation}`
    : card.dataset.productName;

  if (button.dataset.qtyAction === "decrease") {
    removeOneBySourceKey(sourceKey);
    return;
  }

  if (card.dataset.bonelessPresentation) {
    openBonelessModal(card);
    return;
  }

  if (card.dataset.friesItem === "true") {
    openFriesModalForCard(card);
    return;
  }

  addToCart(getStandardProductConfig(card));
});

bonelessConfirmButton?.addEventListener("click", () => {
  const config = getBonelessProductConfig();
  if (!config) {
    return;
  }

  addToCart(config);
  closeBonelessModal();
});

friesConfirmButton?.addEventListener("click", () => {
  const config = getFriesProductConfig();
  if (!config) {
    return;
  }

  addToCart(config);
  closeFriesModal();
});

openFriesSauceButton?.addEventListener("click", () => {
  openFriesSaucePicker();
});

cartItemsContainer?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const key = button.dataset.key;
  const item = cart.get(key);
  if (!item) {
    return;
  }

  const action = button.dataset.action;
  if (action === "increase") {
    item.quantity += 1;
  }

  if (action === "decrease") {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart.delete(key);
    }
  }

  if (action === "remove") {
    cart.delete(key);
  }

  renderCart();
});

customerNameInput?.addEventListener("input", updateOrderWhatsappLink);

ensureProductQuantityControls();
renderCart();

const paymentSection = document.getElementById("pago");

if (paymentSection) {
  const paymentQrPanel = document.getElementById("payment-qr-panel");
  const totalDisplay = document.getElementById("payment-total-display");
  const accountHolderDisplay = document.getElementById("account-holder-display");
  const bankNameDisplay = document.getElementById("bank-name-display");
  const cardNumberDisplay = document.getElementById("card-number-display");
  const proofLink = document.getElementById("payment-proof-link");
  const qrImage = document.getElementById("payment-qr-image");
  const qrFallback = document.getElementById("payment-qr-fallback");
  const copyCardButton = document.getElementById("copy-card-button");
  const copyFeedback = document.getElementById("payment-copy-feedback");
  const paymentCardBlock = document.getElementById("payment-card-block");

  const qrImageSrc = paymentSection.dataset.qrImage || "";
  const bankName = paymentSection.dataset.bankName || "Banco por definir";
  const accountHolder = paymentSection.dataset.accountHolder || "Beneficiario por definir";
  const cardNumber = paymentSection.dataset.cardNumber || "";
  const paymentWhatsappNumber = paymentSection.dataset.whatsappNumber || whatsappNumber;

  accountHolderDisplay.textContent = accountHolder;
  bankNameDisplay.textContent = bankName;
  if (cardNumberDisplay) {
    cardNumberDisplay.textContent = cardNumber || "Dato por definir";
  }

  if (!cardNumber) {
    paymentCardBlock?.setAttribute("hidden", "hidden");
    copyCardButton?.setAttribute("hidden", "hidden");
  }

  const copyText = async (value, successMessage) => {
    if (!value) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const tempInput = document.createElement("textarea");
        tempInput.value = value;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        tempInput.remove();
      }

      if (copyFeedback) {
        copyFeedback.textContent = successMessage;
      }
    } catch {
      if (copyFeedback) {
        copyFeedback.textContent = "No se pudo copiar automáticamente. Intenta copiarlo manualmente.";
      }
    }
  };

  const updateProofLink = () => {
    const total = formatCurrency(paymentTotalInput?.value);
    const customerName = customerNameInput?.value.trim() || "sin nombre";
    const message =
      `Hola, ya realicé el pago de mi pedido. Adjunto comprobante. ` +
      `Nombre: ${customerName}, Total: ${total}.`;

    proofLink.href = `https://wa.me/${paymentWhatsappNumber}?text=${encodeURIComponent(message)}`;
    totalDisplay.textContent = total;
    updateOrderWhatsappLink();
  };

  const updatePaymentVisibility = () => {
    const selected = document.querySelector('input[name="payment-method"]:checked')?.value;
    paymentQrPanel.hidden = selected !== "transfer";
    updateOrderWhatsappLink();
  };

  if (qrImageSrc) {
    qrImage.src = qrImageSrc;
  } else {
    qrImage.hidden = true;
    qrFallback.hidden = false;
  }

  qrImage?.addEventListener("error", () => {
    qrImage.hidden = true;
    qrFallback.hidden = false;
  });

  copyCardButton?.addEventListener("click", () => {
    copyText(cardNumber.replace(/\s+/g, ""), "Tarjeta copiada.");
  });

  paymentTotalInput?.addEventListener("input", updateProofLink);
  customerNameInput?.addEventListener("input", updateProofLink);
  document.querySelectorAll('input[name="payment-method"]').forEach((input) => {
    input.addEventListener("change", updatePaymentVisibility);
  });

  updateProofLink();
  updatePaymentVisibility();
}

document.addEventListener("DOMContentLoaded", async () => {
  const counterEl = document.getElementById("visitCounter");
  if (!counterEl) {
    console.error("No existe #visitCounter en el DOM");
    return;
  }

  try {
    const response = await fetch("https://api.countapi.xyz/hit/karlitoshotdogscom/home_visits");
    const data = await response.json();
    counterEl.textContent = data && typeof data.value === "number"
      ? data.value.toLocaleString()
      : "—";
  } catch (error) {
    console.error("Falló CountAPI:", error);
    counterEl.textContent = "—";
  }
});
