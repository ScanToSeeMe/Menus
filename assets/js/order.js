function addToCart(templateId, plan) {
  sessionStorage.setItem('selectedTemplate', templateId);
  if (plan) {
    sessionStorage.setItem('selectedPlan', plan);
  } else {
    sessionStorage.removeItem('selectedPlan');
  }

  const displayField = document.getElementById("selectedDisplay");
  const planDisplay = document.getElementById("selectedPlanDisplay");
  const summary = document.getElementById("formSelectionSummary");

  const templateNames = {
    template1: "το πρώτο σχέδιο",
    template2: "το δεύτερο σχέδιο",
    template3: "το τρίτο σχέδιο"
  };

  const planNames = {
    BASIC: "το πακέτο BASIC",
    STANDARD: "το πακέτο STANDARD"
  };

  const userFriendlyName = templateNames[templateId] || "κάποιο σχέδιο";
  const planFriendlyName = plan ? (planNames[plan] || "") : "";

  // Ενημέρωση εμφανιζόμενων πεδίων
  if (displayField) {
    if (!templateId) {
      displayField.textContent = "Δεν έχει επιλεχθεί ακόμα template.";
    } else {
      displayField.textContent = `✔️ Έχεις επιλέξει ${userFriendlyName}.`;
    }
  }
  if (planDisplay) {
    if (plan) {
      planDisplay.textContent = `✔️ Έχεις επιλέξει ${planFriendlyName}.`;
    } else {
      planDisplay.textContent = "Επίλεξε πακέτο.";
    }
  }
  if (summary) {
    if (!templateId) {
      summary.textContent = "Δεν έχεις επιλέξει ακόμα template ή πακέτο.";
    } else if (plan) {
      summary.textContent = `Έχεις επιλέξει: ${userFriendlyName} και ${planFriendlyName}.`;
    } else {
      summary.textContent = `Έχεις επιλέξει: ${userFriendlyName}. Επίλεξε πακέτο.`;
    }
  }

  // Ενημέρωση hidden inputs για τη φόρμα (βάλε τα ids, όχι τα user-friendly)
  const hiddenInput = document.getElementById("selected_template");
  if (hiddenInput) hiddenInput.value = templateId || "";

  const hiddenPlanInput = document.getElementById("selected_plan");
  if (hiddenPlanInput) hiddenPlanInput.value = plan || "";

  // Καθάρισε τα κουμπιά από προηγούμενη επιλογή
  document.querySelectorAll('.choose-btn, .order-button').forEach(btn => {
    btn.classList.remove('selected');
  });

  // Δώσε "selected" class στο ενεργό κουμπί
  document.querySelectorAll('.choose-btn, .order-button').forEach(btn => {
    if (btn.onclick && btn.onclick.toString().includes(`'${templateId}'`)) {
      btn.classList.add('selected');
    }
  });

  // Ενημέρωσε το καλάθι (popup)
  const popup = document.getElementById("cartPopup");
  const badge = document.getElementById("cartBadge");

  if (popup && badge) {
    const popupTemplate = document.getElementById("popupTemplate");
    const popupPlan = document.getElementById("popupPlan");
    if (popupTemplate) popupTemplate.textContent = userFriendlyName;
    if (popupPlan) popupPlan.textContent = planFriendlyName || "-";
    badge.style.display = "inline-block";
  }
}

function selectPlan(plan) {
  const selectedTemplate = sessionStorage.getItem('selectedTemplate');

  if (!selectedTemplate) {
    showCustomPopup('Παρακαλώ επίλεξε πρώτα template.');
    return;
  }

  // Μόνο το template1 υποστηρίζει STANDARD
  if ((selectedTemplate === 'template2' || selectedTemplate === 'template3') && plan === 'STANDARD') {
    showCustomPopup('Το συγκεκριμένο template δεν είναι διαθέσιμο στο πακέτο STANDARD. Παρακαλώ επίλεξε το BASIC ή άλλαξε template.');
    return;
  }

  // Αν όλα είναι εντάξει, κάνε addToCart με το σωστό template και plan
  addToCart(selectedTemplate, plan);
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").addEventListener("submit", function () {
    const selectedTemplate = sessionStorage.getItem('selectedTemplate');
    const selectedPlan = sessionStorage.getItem('selectedPlan');
    if (selectedTemplate) {
      document.getElementById("selected_template").value = selectedTemplate;
    }
    if (selectedPlan) {
      document.getElementById("selected_plan").value = selectedPlan;
    }
  });

  document.querySelectorAll(".template-card").forEach(card => {
    card.addEventListener("click", function (e) {
      if (e.target.tagName === "BUTTON") return;
      const url = card.getAttribute("data-template-url");
      if (url) window.open(url, "_blank");
    });
  });

  // Αν έχει προηγούμενη επιλογή, εμφάνισε την στο καλάθι
  const saved = sessionStorage.getItem('selectedTemplate');
  const savedPlan = sessionStorage.getItem('selectedPlan');
  if (saved) {
    addToCart(saved, savedPlan);
  }
});

// ✅ Λειτουργία καθαρισμού επιλογών
function clearCart() {
  sessionStorage.removeItem("selectedTemplate");
  sessionStorage.removeItem("selectedPlan");

  document.getElementById("selectedDisplay").textContent = "Δεν έχει επιλεχθεί ακόμα template.";
  document.getElementById("selectedPlanDisplay").textContent = "";
  const summary = document.getElementById("formSelectionSummary");
  if (summary) summary.textContent = "Δεν έχεις επιλέξει ακόμα template ή πακέτο.";

  const hiddenInput = document.getElementById("selected_template");
  if (hiddenInput) hiddenInput.value = "";

  const hiddenPlanInput = document.getElementById("selected_plan");
  if (hiddenPlanInput) hiddenPlanInput.value = "";

  const popup = document.getElementById("cartPopup");
  const badge = document.getElementById("cartBadge");
  if (popup && badge) {
    document.getElementById("popupTemplate").textContent = "–";
    document.getElementById("popupPlan").textContent = "–";
    badge.style.display = "none";
    popup.style.display = "none";
  }

  // Καθαρισμός κουμπιών
  document.querySelectorAll('.choose-btn, .order-button').forEach(btn => {
    btn.classList.remove('selected');
  });
}



function showCustomPopup(message) {
  const overlay = document.getElementById('customPopupOverlay');
  const content = document.getElementById('customPopupContent');
  if (content) content.innerHTML = message;
  if (overlay) overlay.style.display = 'flex';
}

function hideCustomPopup() {
  const overlay = document.getElementById('customPopupOverlay');
  if (overlay) overlay.style.display = 'none';
}

// Κλείσιμο με το Χ
document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.getElementById('customPopupClose');
  if (closeBtn) closeBtn.onclick = hideCustomPopup;
  // Κλείσιμο με κλικ έξω από το popup
  const overlay = document.getElementById('customPopupOverlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) hideCustomPopup();
    });
  }
});


document.querySelectorAll('.preview-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation(); // Για να μην γίνει διπλό click αν είναι μέσα στην κάρτα
    this.closest('.template-card').click();
  });
});