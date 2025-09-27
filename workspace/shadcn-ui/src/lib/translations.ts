export interface Translation {
  // Navigation
  dailyBrief: string;
  profileTitle: string;
  login: string;
  
  // Brief Generation
  generateChallenge: string;
  createBrief: string;
  creativeSpark: string;
  updateDesign: string;
  
  // Upload
  chooseFromComputer: string;
  chooseImage: string;
  takePhoto: string;
  browseFiles: string;
  selectFiles: string;
  useCamera: string;
  uploaded: string;
  
  // Sharing
  share: string;
  email: string;
  whatsapp: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  
  // Profile
  managePortfolio: string;
  achievements: string;
  badgesEarned: string;
  noBadgesYet: string;
  completeChallenges: string;
  aboutYou: string;
  shareStory: string;
  biography: string;
  tellUsAbout: string;
  portfolioLink: string;
  save: string;
  briefHistory: string;
  briefsGenerated: string;
  noBriefsYet: string;
  generateFirst: string;
  showing: string;
  latest: string;
  briefs: string;
  uploadDesigns: string;
  shareCreative: string;
  yourDesigns: string;
  designsUploaded: string;
  noDesignsYet: string;
  uploadFirst: string;
  
  // Language
  language: string;
  selectLanguage: string;
}

const translations: Record<string, Translation> = {
  en: {
    // Navigation
    dailyBrief: "Daily Brief",
    profileTitle: "Profile",
    login: "Login",
    
    // Brief Generation
    generateChallenge: "Generate Challenge",
    createBrief: "Create Brief",
    creativeSpark: "Creative Spark",
    updateDesign: "Update Design",
    
    // Upload
    chooseFromComputer: "Choose from Computer",
    chooseImage: "Choose Image",
    takePhoto: "Take Photo",
    browseFiles: "Browse Files",
    selectFiles: "Select Files",
    useCamera: "Use Camera",
    uploaded: "Uploaded",
    
    // Sharing
    share: "Share",
    email: "Email",
    whatsapp: "WhatsApp",
    twitter: "Twitter",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    
    // Profile
    managePortfolio: "Manage your creative portfolio and track progress",
    achievements: "Achievements",
    badgesEarned: "badges earned",
    noBadgesYet: "No badges yet",
    completeChallenges: "Complete challenges to earn your first badge!",
    aboutYou: "About You",
    shareStory: "Share your story and connect your portfolio",
    biography: "Biography",
    tellUsAbout: "Tell us about yourself, your design style, and what inspires you...",
    portfolioLink: "Portfolio Link",
    save: "Save",
    briefHistory: "Brief History",
    briefsGenerated: "briefs generated",
    noBriefsYet: "No briefs yet",
    generateFirst: "Generate your first creative challenge to get started!",
    showing: "Showing",
    latest: "latest",
    briefs: "briefs",
    uploadDesigns: "Upload Designs",
    shareCreative: "Share your creative work and build your portfolio",
    yourDesigns: "Your Designs",
    designsUploaded: "designs uploaded",
    noDesignsYet: "No designs yet",
    uploadFirst: "Upload your first design to start building your portfolio!",
    
    // Language
    language: "Language",
    selectLanguage: "Select Language"
  },
  es: {
    // Navigation
    dailyBrief: "Brief Diario",
    profileTitle: "Perfil",
    login: "Iniciar Sesión",
    
    // Brief Generation
    generateChallenge: "Generar Desafío",
    createBrief: "Crear Brief",
    creativeSpark: "Chispa Creativa",
    updateDesign: "Actualizar Diseño",
    
    // Upload
    chooseFromComputer: "Elegir del Ordenador",
    chooseImage: "Elegir Imagen",
    takePhoto: "Tomar Foto",
    browseFiles: "Explorar Archivos",
    selectFiles: "Seleccionar Archivos",
    useCamera: "Usar Cámara",
    uploaded: "Subido",
    
    // Sharing
    share: "Compartir",
    email: "Correo",
    whatsapp: "WhatsApp",
    twitter: "Twitter",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    
    // Profile
    managePortfolio: "Gestiona tu portafolio creativo y sigue tu progreso",
    achievements: "Logros",
    badgesEarned: "insignias obtenidas",
    noBadgesYet: "Aún no hay insignias",
    completeChallenges: "¡Completa desafíos para ganar tu primera insignia!",
    aboutYou: "Acerca de Ti",
    shareStory: "Comparte tu historia y conecta tu portafolio",
    biography: "Biografía",
    tellUsAbout: "Cuéntanos sobre ti, tu estilo de diseño y qué te inspira...",
    portfolioLink: "Enlace del Portafolio",
    save: "Guardar",
    briefHistory: "Historial de Briefs",
    briefsGenerated: "briefs generados",
    noBriefsYet: "Aún no hay briefs",
    generateFirst: "¡Genera tu primer desafío creativo para comenzar!",
    showing: "Mostrando",
    latest: "últimos",
    briefs: "briefs",
    uploadDesigns: "Subir Diseños",
    shareCreative: "Comparte tu trabajo creativo y construye tu portafolio",
    yourDesigns: "Tus Diseños",
    designsUploaded: "diseños subidos",
    noDesignsYet: "Aún no hay diseños",
    uploadFirst: "¡Sube tu primer diseño para comenzar a construir tu portafolio!",
    
    // Language
    language: "Idioma",
    selectLanguage: "Seleccionar Idioma"
  },
  fr: {
    // Navigation
    dailyBrief: "Brief Quotidien",
    profileTitle: "Profil",
    login: "Connexion",
    
    // Brief Generation
    generateChallenge: "Générer Défi",
    createBrief: "Créer Brief",
    creativeSpark: "Étincelle Créative",
    updateDesign: "Mettre à Jour le Design",
    
    // Upload
    chooseFromComputer: "Choisir de l'Ordinateur",
    chooseImage: "Choisir Image",
    takePhoto: "Prendre Photo",
    browseFiles: "Parcourir Fichiers",
    selectFiles: "Sélectionner Fichiers",
    useCamera: "Utiliser Caméra",
    uploaded: "Téléchargé",
    
    // Sharing
    share: "Partager",
    email: "Email",
    whatsapp: "WhatsApp",
    twitter: "Twitter",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    
    // Profile
    managePortfolio: "Gérez votre portfolio créatif et suivez vos progrès",
    achievements: "Réalisations",
    badgesEarned: "badges obtenus",
    noBadgesYet: "Pas encore de badges",
    completeChallenges: "Complétez des défis pour gagner votre premier badge!",
    aboutYou: "À Propos de Vous",
    shareStory: "Partagez votre histoire et connectez votre portfolio",
    biography: "Biographie",
    tellUsAbout: "Parlez-nous de vous, de votre style de design et de ce qui vous inspire...",
    portfolioLink: "Lien du Portfolio",
    save: "Sauvegarder",
    briefHistory: "Historique des Briefs",
    briefsGenerated: "briefs générés",
    noBriefsYet: "Pas encore de briefs",
    generateFirst: "Générez votre premier défi créatif pour commencer!",
    showing: "Affichage",
    latest: "derniers",
    briefs: "briefs",
    uploadDesigns: "Télécharger Designs",
    shareCreative: "Partagez votre travail créatif et construisez votre portfolio",
    yourDesigns: "Vos Designs",
    designsUploaded: "designs téléchargés",
    noDesignsYet: "Pas encore de designs",
    uploadFirst: "Téléchargez votre premier design pour commencer à construire votre portfolio!",
    
    // Language
    language: "Langue",
    selectLanguage: "Sélectionner Langue"
  }
};

export function getTranslation(key: keyof Translation, language: string): string {
  return translations[language]?.[key] || translations.en[key] || key;
}

export function getCurrentLanguage(): string {
  return localStorage.getItem('selectedLanguage') || 'en';
}

export function setCurrentLanguage(language: string): void {
  localStorage.setItem('selectedLanguage', language);
}