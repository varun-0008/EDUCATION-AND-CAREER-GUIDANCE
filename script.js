const translations = {
  en: {
    appTitle: "EduCareer Guidance",
    appSubtitle: "AI-powered education and career planning for students, parents, and teachers.",
    languageLabel: "Language",
    roleStudent: "Student",
    roleParent: "Parent",
    roleTeacher: "Teacher",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    welcomeBack: "Welcome back,",
    dailyOverview: "Daily Overview",
    suggestionsCardTitle: "Suggestions",
    suggestionsCardText: "Get custom plans based on your goals.",
    coachingCardTitle: "Coaching",
    coachingCardText: "Find local coaching centers and mentors.",
    scholarshipCardTitle: "Scholarships",
    scholarshipCardText: "Explore scholarships that fit your profile.",
    goalSuggestionsTitle: "Goal-Based Suggestions",
    goalEngineering: "Engineering",
    goalBusiness: "Business",
    goalArts: "Arts & Design",
    goalMedicine: "Medicine",
    coachingCentersTitle: "Coaching Centers",
    nearYouBadge: "Near You",
    contactTitle: "Contact Information",
    contactSubtitle: "Reach out any time for support.",
    scholarshipsTitle: "Scholarships",
    collegeOptionsTitle: "College Options",
    companyTitle: "Company Opportunities",
    careerTitle: "Career Opportunities"
  },
  es: {
    appTitle: "Guía EduCarrera",
    appSubtitle: "Planificación educativa y profesional con IA para estudiantes, padres y profesores.",
    languageLabel: "Idioma",
    roleStudent: "Estudiante",
    roleParent: "Padre",
    roleTeacher: "Profesor",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tú@ejemplo.com",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "Introduce tu contraseña",
    welcomeBack: "Bienvenido de nuevo,",
    dailyOverview: "Resumen diario",
    suggestionsCardTitle: "Sugerencias",
    suggestionsCardText: "Obtén planes personalizados según tus metas.",
    coachingCardTitle: "Coaching",
    coachingCardText: "Encuentra centros de coaching y mentores.",
    scholarshipCardTitle: "Becas",
    scholarshipCardText: "Explora becas que se adapten a tu perfil.",
    goalSuggestionsTitle: "Sugerencias por objetivos",
    goalEngineering: "Ingeniería",
    goalBusiness: "Negocios",
    goalArts: "Artes y Diseño",
    goalMedicine: "Medicina",
    coachingCentersTitle: "Centros de Coaching",
    nearYouBadge: "Cerca de ti",
    contactTitle: "Información de contacto",
    contactSubtitle: "Contáctanos en cualquier momento para soporte.",
    scholarshipsTitle: "Becas",
    collegeOptionsTitle: "Opciones de Universidad",
    companyTitle: "Oportunidades empresariales",
    careerTitle: "Oportunidades profesionales"
  }
};

const data = {
  centers: [
    { name: "Future Minds Academy", location: "Downtown", programs: "STEM, Test Prep, Mentoring" },
    { name: "Beyond Boundaries", location: "North Campus", programs: "Career Training, Soft Skills" },
    { name: "Pathway Institute", location: "City Center", programs: "Scholarship Coaching, College Plans" }
  ],
  scholarships: [
    { title: "Future Leaders Scholarship", amount: "$4,000", deadline: "Apr 30" },
    { title: "Tech Innovators Grant", amount: "$3,500", deadline: "May 12" },
    { title: "Creative Scholars Award", amount: "$2,800", deadline: "Jun 10" }
  ],
  colleges: [
    { title: "Global Engineering University", focus: "Engineering & Robotics" },
    { title: "Bright Future Business School", focus: "Commerce & Management" },
    { title: "Artisan Design College", focus: "Design & Media" }
  ],
  companies: [
    { title: "ByteWave", opportunity: "Internships in Software Development" },
    { title: "Nova Health", opportunity: "Graduate programs in Healthcare Analytics" },
    { title: "SparkEd", opportunity: "Career mentorship in EdTech" }
  ],
  careers: [
    { title: "Data Analyst", description: "Use data to build stronger career paths." },
    { title: "Product Designer", description: "Design future-ready learning experiences." },
    { title: "AI Education Specialist", description: "Create intelligent learning systems." }
  ],
  goalSuggestions: {
    engineering: [
      "Build your portfolio with personal robotics or coding projects.",
      "Explore engineering internships and technical bootcamps.",
      "Prepare for SAT/ACT and engineering college admissions."
    ],
    business: [
      "Join entrepreneurship clubs and case competitions.",
      "Study market trends, finance, and leadership programs.",
      "Apply for business scholarships and mentorship opportunities."
    ],
    arts: [
      "Create a portfolio of artwork, digital design, or media projects.",
      "Visit local galleries and attend creative workshops.",
      "Find arts scholarships and collaborative design programs."
    ],
    medicine: [
      "Volunteer in healthcare settings and science labs.",
      "Join biology clubs and medical prep coaching.",
      "Explore medical scholarships and competitive pathways." ]
  }
};

const state = {
  language: "en",
  role: "student",
  name: "Learner"
};

const elements = {
  dashboardPage: document.getElementById("dashboardPage"),
  languageSelectDesktop: document.getElementById("languageSelectDesktop"),
  goalSelect: document.getElementById("goalSelect"),
  suggestionsList: document.getElementById("suggestionsList"),
  centersList: document.getElementById("centersList"),
  scholarshipsList: document.getElementById("scholarshipsList"),
  collegesList: document.getElementById("collegesList"),
  companiesList: document.getElementById("companiesList"),
  careersList: document.getElementById("careersList"),
  userNameDisplay: document.getElementById("userNameDisplay"),
  roleBadge: document.getElementById("roleBadge"),
  dashboardMessage: document.getElementById("dashboardMessage")
};

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    const translation = translations[state.language][key];
    if (translation) {
      element.textContent = translation;
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    const translation = translations[state.language][key];
    if (translation) {
      element.placeholder = translation;
    }
  });

  elements.languageSelectDesktop.value = state.language;
  updateDashboard();
}

function getGoalTitle(goal) {
  return translations[state.language][`goal${goal.charAt(0).toUpperCase() + goal.slice(1)}`] || goal;
}

function updateSuggestions() {
  const goal = elements.goalSelect.value;
  const suggestions = data.goalSuggestions[goal] || [];
  elements.suggestionsList.innerHTML = suggestions.map(item => `
    <div class="goal-item">
      <h3>${getGoalTitle(goal)}</h3>
      <p>${item}</p>
    </div>
  `).join("");
}

function renderCards(container, items, callback) {
  container.innerHTML = items.map(callback).join("");
}

function updateDashboard() {
  elements.userNameDisplay.textContent = state.name;
  elements.roleBadge.textContent = translations[state.language][`role${state.role.charAt(0).toUpperCase() + state.role.slice(1)}`] || state.role;
  elements.dashboardMessage.textContent = state.role === "student"
    ? "Your personalized student roadmap is active now."
    : state.role === "parent"
      ? "Support your student with the best college and scholarship choices."
      : "Guide learners with career coaching and classroom insights.";

  renderCards(elements.centersList, data.centers, center => `
    <div class="card-item">
      <h3>${center.name}</h3>
      <p><strong>Location:</strong> ${center.location}</p>
      <p>${center.programs}</p>
    </div>
  `);

  renderCards(elements.scholarshipsList, data.scholarships, scholarship => `
    <div class="card-item">
      <h3>${scholarship.title}</h3>
      <p><strong>Amount:</strong> ${scholarship.amount}</p>
      <p><strong>Deadline:</strong> ${scholarship.deadline}</p>
    </div>
  `);

  renderCards(elements.collegesList, data.colleges, college => `
    <div class="card-item">
      <h3>${college.title}</h3>
      <p>${college.focus}</p>
    </div>
  `);

  renderCards(elements.companiesList, data.companies, company => `
    <div class="card-item">
      <h3>${company.title}</h3>
      <p>${company.opportunity}</p>
    </div>
  `);

  renderCards(elements.careersList, data.careers, career => `
    <div class="card-item">
      <h3>${career.title}</h3>
      <p>${career.description}</p>
    </div>
  `);

  updateSuggestions();
}

function setLanguage(value) {
  state.language = value;
  translatePage();
}

function updateLanguageDropdowns() {
  const desktopSelect = elements.languageSelectDesktop;
  desktopSelect.innerHTML = `
    <option value="en">English</option>
    <option value="es">Español</option>
  `;
  desktopSelect.value = state.language;
}

updateLanguageDropdowns();

elements.languageSelectDesktop.addEventListener("change", event => setLanguage(event.target.value));
elements.goalSelect.addEventListener("change", updateSuggestions);

translatePage();
updateSuggestions();

document.getElementById("aiHelpBtn").addEventListener("click", () => {
  const existing = document.querySelector(".ai-message");
  if (existing) {
    existing.remove();
    return;
  }

  const message = document.createElement("div");
  message.className = "ai-message";
  message.innerHTML = `
    <strong>AI Guidance</strong>
    <p>Ask me to suggest scholarships, career paths, college choices, or coaching centers.</p>
  `;

  document.body.appendChild(message);
  setTimeout(() => {
    message.remove();
  }, 6000);
});
