const chatbotButton = document.getElementById("chatbot-button");
const chatbotBox = document.getElementById("chatbot-box");
const chatbotContent = document.getElementById("chatbot-content");

chatbotButton.addEventListener("click", () => {
  chatbotBox.classList.toggle("hidden");
});

function nextStep(step) {
  if (step === 1) {
    chatbotContent.innerHTML = `
      <p>Για ποιο σκοπό χρειάζεσαι το site σου;</p>
      <button onclick="selectPurpose('linkedin')">LinkedIn</button>
      <button onclick="selectPurpose('job')">Εύρεση Εργασίας</button>
      <button onclick="selectPurpose('portfolio')">Portfolio / Προσωπικό Blog</button>
    `;
  }
}

function selectPurpose(purpose) {
  chatbotContent.innerHTML = `
    <p>Τι στυλ προτιμάς;</p>
    <button onclick="finalChoice('${purpose}', 'classic')">Κλασικό</button>
    <button onclick="finalChoice('${purpose}', 'modern')">Μοντέρνο</button>
    <button onclick="finalChoice('${purpose}', 'colorful')">Με χρώματα</button>
  `;
}

function finalChoice(purpose, style) {
  let suggestion = "πρώτο σχέδιο";

  if (purpose === "job" && style === "modern") suggestion = "δεύτερο σχέδιο";
  else if (purpose === "portfolio" || style === "colorful") suggestion = "τρίτο σχέδιο";

  // Show result
  chatbotContent.innerHTML = `
    <p>💡 Σου προτείνουμε το: <strong>${suggestion.toUpperCase()}</strong></p>
    <button onclick="chatbotBox.classList.add('hidden')">Ευχαριστώ!</button>
  `;

  // Update hidden field & display
  document.getElementById("selected_template").value = suggestion;
  document.getElementById("selectedDisplay").innerText = `✔️ Έχεις επιλέξει το: ${suggestion.toUpperCase()}`;
}
