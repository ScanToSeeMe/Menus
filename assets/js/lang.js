let currentLang = 'el';

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function safeSetPlaceholder(id, text) {
  const el = document.getElementById(id);
  if (el) el.placeholder = text;
}

async function setLanguage(lang) {
  currentLang = lang;

  try {
    const res = await fetch('lang.json');
    const translations = await res.json();
    const t = translations[lang];

    // Ενημέρωση περιεχομένου (με έλεγχο ασφαλείας)
    document.querySelector('header h1').textContent = t.title;
    document.querySelector('header p').textContent = t.subtitle;
    document.querySelector('#how-it-works h2').textContent = t.how_it_works;
    document.querySelector('#how-it-works p').textContent = t.how_it_works_desc;
    document.querySelector('#templates h2').textContent = t.select_template;
    document.querySelector('#selectedDisplay').textContent = t.no_template;
    document.querySelector('#form h2').textContent = t.form_title;
    document.querySelector('#orderForm button').textContent = t.submit;
    // Τίτλος FAQ
    document.querySelector('#faq h2').textContent = t.faq_title;

    // Ερωτήσεις
    document.querySelectorAll('.faq-question')[0].innerHTML = "❓ <strong>" + t.faq_q1 + "</strong>";
    document.querySelectorAll('.faq-question')[1].innerHTML = "❓ <strong>" + t.faq_q2 + "</strong>";
    document.querySelectorAll('.faq-question')[2].innerHTML = "❓ <strong>" + t.faq_q3 + "</strong>";
    document.querySelectorAll('.faq-question')[3].innerHTML = "❓ <strong>" + t.faq_q4 + "</strong>";
    document.querySelectorAll('.faq-question')[4].innerHTML = "❓ <strong>" + t.faq_q5 + "</strong>";
    document.querySelectorAll('.faq-question')[5].innerHTML = "❓ <strong>" + t.faq_q6 + "</strong>";
    document.querySelectorAll('.faq-question')[6].innerHTML = "❓ <strong>" + t.faq_q7 + "</strong>";
    document.querySelectorAll('.faq-question')[7].innerHTML = "❓ <strong>" + t.faq_q8 + "</strong>";

    // Απαντήσεις
    document.querySelectorAll('.faq-answer p')[0].textContent = t.faq_a1;
    document.querySelectorAll('.faq-answer p')[1].textContent = t.faq_a2;
    document.querySelectorAll('.faq-answer p')[2].textContent = t.faq_a3;
    document.querySelectorAll('.faq-answer p')[3].textContent = t.faq_a4;
    document.querySelectorAll('.faq-answer p')[4].textContent = t.faq_a5;
    document.querySelectorAll('.faq-answer p')[5].textContent = t.faq_a6;
    document.querySelectorAll('.faq-answer p')[6].textContent = t.faq_a7;
    document.querySelectorAll('.faq-answer p')[7].textContent = t.faq_a8;

    
    safeSetText("pricing-title", t.plans);
    safeSetText("chatbot-header", t.chatbot_header);
    safeSetText("chatbot-title", t.chatbot_title);
    safeSetText("chatbot-msg", t.chatbot_msg);
    safeSetText("chatbot-open", t.chatbot_open);
    safeSetText("chatbot-yes", t.chatbot_yes);
    safeSetText("nav-templates", t.nav_templates);
    safeSetText("nav_pricing", t.nav_pricing);
    safeSetText("nav-form", t.nav_form);
    safeSetText("nav-faq", t.nav_faq);
    safeSetText("availableboth", t.availableboth);
    safeSetText("availablebasic", t.availablebasic);
    safeSetText("availablebasic2", t.availablebasic2);
    safeSetPlaceholder("form-name", t.form_name);
    safeSetPlaceholder("form-email", t.form_email);
    safeSetPlaceholder("form-age", t.form_age);
    safeSetPlaceholder("form-bio", t.form_bio);
    safeSetPlaceholder("form-purpose", t.form_purpose);
    safeSetText("form-submit", t.form_submit);
    safeSetText("step1", t.step1);
    safeSetText("step2", t.step2);
    safeSetText("step3", t.step3);
    safeSetText("footer-desc", t.footer_desc);
    safeSetText("footer-quicklinks-title", t.footer_quicklinks);
    safeSetText("footer-link-templates", t.footer_link_templates);
    safeSetText("footer-link-pricing", t.footer_link_pricing);
    safeSetText("footer-link-form", t.footer_link_form);
    safeSetText("footer-link-faq", t.footer_link_faq);
    safeSetText("footer-social-title", t.footer_social);
    safeSetText("footer-link-terms", t.footer_terms);
    safeSetText("footer-link-contact", t.footer_contact);
    safeSetText("footer-copyright", t.footer_copyright);

    // Όλα τα buttons επιλογής
    document.querySelectorAll(".choose-btn").forEach(btn => {
      btn.textContent = t.choose;
    });

  } catch (err) {
    console.error("⚠️ Σφάλμα στη φόρτωση μεταφράσεων:", err);
  }
}



function toggleLanguage() {
  currentLang = currentLang === 'el' ? 'en' : 'el';
  document.getElementById('flagIcon').textContent = currentLang === 'el' ? '🇬🇷' : '🇬🇧';

  const btn = document.getElementById('langBtn');
  btn.classList.toggle('active-el', currentLang === 'el');
  btn.classList.toggle('active-en', currentLang === 'en');

  setLanguage(currentLang); // Η δική σου συνάρτηση
}