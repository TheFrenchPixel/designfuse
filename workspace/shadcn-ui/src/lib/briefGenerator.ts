// Enhanced brand list with 150 brands including kids and baby brands
const brands = [
  // Tech & Electronics
  'Apple', 'Samsung', 'Google', 'Microsoft', 'Sony', 'Nintendo', 'Tesla', 'Meta', 'Amazon', 'Netflix',
  'Spotify', 'Adobe', 'Intel', 'NVIDIA', 'HP', 'Dell', 'Lenovo', 'Asus', 'Razer', 'Logitech',
  
  // Fashion & Lifestyle
  'Nike', 'Adidas', 'Puma', 'Under Armour', 'Lululemon', 'Patagonia', 'The North Face', 'Supreme', 'Off-White', 'Balenciaga',
  'Gucci', 'Louis Vuitton', 'Chanel', 'Hermès', 'Prada', 'Versace', 'Burberry', 'Calvin Klein', 'Tommy Hilfiger', 'Ralph Lauren',
  'Zara', 'H&M', 'Uniqlo', 'Gap', 'Levi\'s', 'Converse', 'Vans', 'Dr. Martens', 'Timberland', 'Crocs',
  
  // Food & Beverage
  'Coca-Cola', 'Pepsi', 'Starbucks', 'McDonald\'s', 'KFC', 'Subway', 'Domino\'s', 'Pizza Hut', 'Taco Bell', 'Chipotle',
  'Red Bull', 'Monster Energy', 'Gatorade', 'Nestlé', 'Unilever', 'Kraft Heinz', 'General Mills', 'Kellogg\'s', 'Mars', 'Ferrero',
  
  // Automotive
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Porsche', 'Ferrari',
  'Lamborghini', 'McLaren', 'Rolls-Royce', 'Bentley', 'Jaguar', 'Land Rover', 'Volvo', 'Mazda', 'Subaru', 'Hyundai',
  
  // Beauty & Personal Care
  'L\'Oréal', 'Maybelline', 'MAC', 'Sephora', 'Ulta', 'Fenty Beauty', 'Glossier', 'The Ordinary', 'Clinique', 'Estée Lauder',
  'Chanel Beauty', 'Dior', 'YSL Beauty', 'NARS', 'Urban Decay', 'Too Faced', 'Benefit', 'Tarte', 'Rare Beauty', 'Kylie Cosmetics',
  
  // Home & Furniture
  'IKEA', 'West Elm', 'Pottery Barn', 'Crate & Barrel', 'CB2', 'Room & Board', 'Herman Miller', 'Steelcase', 'Knoll', 'Vitra',
  
  // Kids & Baby Brands
  'Fisher-Price', 'LEGO', 'Mattel', 'Hasbro', 'Melissa & Doug', 'VTech', 'LeapFrog', 'Crayola', 'Play-Doh', 'Nerf',
  'Barbie', 'Hot Wheels', 'Thomas & Friends', 'Peppa Pig', 'Disney', 'Nickelodeon', 'Cartoon Network', 'Sesame Street', 'Blue\'s Clues', 'Dora the Explorer',
  'Pampers', 'Huggies', 'Johnson & Johnson Baby', 'Gerber', 'Enfamil', 'Similac', 'Carter\'s', 'OshKosh B\'gosh', 'Gap Kids', 'H&M Kids',
  'Zara Kids', 'Target Cat & Jack', 'Gymboree', 'The Children\'s Place', 'Stride Rite', 'Converse Kids', 'Vans Kids', 'Crocs Kids', 'UGG Kids', 'Patagonia Kids',
  
  // Sports & Outdoor
  'REI', 'Dick\'s Sporting Goods', 'Decathlon', 'Columbia', 'Salomon', 'Merrell', 'Osprey', 'Yeti', 'Hydro Flask', 'Patagonia',
  
  // Entertainment & Media
  'Warner Bros', 'Universal Studios', 'Paramount', '20th Century Studios', 'Marvel', 'DC Comics', 'Pixar', 'DreamWorks', 'Studio Ghibli', 'Funko'
];

// 30 diverse product categories
const productTypes = [
  'Smartphone', 'Laptop', 'Smartwatch', 'Headphones', 'Gaming Console', 'Electric Scooter',
  'Running Shoes', 'Backpack', 'Water Bottle', 'Coffee Mug', 'Desk Chair', 'Table Lamp',
  'Wireless Charger', 'Bluetooth Speaker', 'Fitness Tracker', 'Sunglasses', 'Wallet', 'Handbag',
  'Baby Stroller', 'Children\'s Toy', 'Board Game', 'Art Supplies', 'Kitchen Appliance', 'Home Security Camera',
  'Electric Toothbrush', 'Skincare Product', 'Perfume Bottle', 'Travel Luggage', 'Bicycle', 'Yoga Mat'
];

const targetAudiences = [
  'Tech-savvy millennials',
  'Busy working professionals',
  'Eco-conscious consumers',
  'Budget-minded students',
  'Luxury lifestyle enthusiasts',
  'Health and fitness enthusiasts',
  'Creative professionals',
  'Remote workers',
  'Urban commuters',
  'Outdoor adventure seekers',
  'New parents',
  'Children aged 3-8',
  'Teenagers',
  'Senior citizens',
  'Small business owners',
  'Fashion-forward individuals',
  'Minimalist lifestyle followers',
  'Gaming enthusiasts',
  'Travel enthusiasts',
  'Home cooking enthusiasts'
];

const creativeSparks = [
  'Inspired by Japanese minimalism',
  'Retro-futuristic aesthetic',
  'Biomimetic design principles',
  'Scandinavian hygge philosophy',
  'Memphis design movement',
  'Art Deco elegance',
  'Cyberpunk visual language',
  'Bauhaus functional beauty',
  'Wabi-sabi imperfection',
  'Steampunk mechanical aesthetics',
  'Mid-century modern revival',
  'Brutalist architectural forms',
  'Organic flowing shapes',
  'Geometric pattern play',
  'Neon-lit urban nights',
  'Desert landscape textures',
  'Ocean wave dynamics',
  'Forest canopy patterns',
  'Crystal formation structures',
  'Vintage space age design',
  'Handcrafted artisan quality',
  'Digital glitch aesthetics',
  'Sustainable material focus',
  'Modular system thinking',
  'Emotional storytelling approach'
];

// Enhanced overview templates for more randomization
const overviewTemplates = [
  {
    template: "Design a revolutionary {productType} that transforms how {audience} interact with technology in their daily lives.",
    contexts: ["busy professionals", "tech enthusiasts", "students", "remote workers"]
  },
  {
    template: "Create an innovative {productType} that seamlessly blends functionality with aesthetic appeal for the modern {audience}.",
    contexts: ["urban dweller", "minimalist", "creative professional", "lifestyle enthusiast"]
  },
  {
    template: "Develop a sustainable {productType} that addresses the environmental concerns of {audience} while maintaining premium quality.",
    contexts: ["eco-conscious consumers", "environmentally aware families", "green lifestyle advocates", "sustainability-focused individuals"]
  },
  {
    template: "Reimagine the traditional {productType} with cutting-edge features that cater to the unique needs of {audience}.",
    contexts: ["digital natives", "early adopters", "innovation seekers", "tech-forward consumers"]
  },
  {
    template: "Design a user-centric {productType} that simplifies complex tasks and enhances the productivity of {audience}.",
    contexts: ["busy professionals", "multitasking parents", "efficiency-focused individuals", "time-conscious users"]
  },
  {
    template: "Create a premium {productType} that embodies luxury and sophistication for discerning {audience}.",
    contexts: ["luxury consumers", "high-end market", "affluent professionals", "premium lifestyle seekers"]
  },
  {
    template: "Develop an accessible {productType} that breaks down barriers and creates inclusive experiences for {audience}.",
    contexts: ["diverse communities", "users with disabilities", "multi-generational families", "inclusive design advocates"]
  },
  {
    template: "Design a smart {productType} that leverages AI and IoT to create intelligent solutions for {audience}.",
    contexts: ["smart home enthusiasts", "connected lifestyle users", "automation lovers", "future-forward consumers"]
  },
  {
    template: "Create a modular {productType} system that adapts and grows with the evolving needs of {audience}.",
    contexts: ["growing families", "changing lifestyles", "flexible living situations", "adaptive users"]
  },
  {
    template: "Reimagine the {productType} experience through emotional design that resonates deeply with {audience}.",
    contexts: ["emotional consumers", "experience seekers", "story-driven users", "connection-focused individuals"]
  },
  {
    template: "Design a collaborative {productType} that brings {audience} together and fosters community connections.",
    contexts: ["social groups", "community builders", "team-oriented users", "connection seekers"]
  },
  {
    template: "Create a wellness-focused {productType} that promotes mental and physical health for {audience}.",
    contexts: ["health-conscious individuals", "wellness enthusiasts", "stress-management seekers", "mindful living advocates"]
  }
];

const designRequirementSets = [
  [
    'Intuitive user interface with minimal learning curve',
    'Durable materials suitable for daily use',
    'Ergonomic design for extended comfort',
    'Sustainable packaging and materials'
  ],
  [
    'Seamless integration with existing ecosystems',
    'Premium finish with attention to detail',
    'Customizable features for personal preferences',
    'Energy-efficient operation'
  ],
  [
    'Compact form factor for portability',
    'Weather-resistant construction',
    'Quick setup and easy maintenance',
    'Universal compatibility standards'
  ],
  [
    'Accessible design for all abilities',
    'Modular components for flexibility',
    'Smart connectivity features',
    'Recyclable end-of-life materials'
  ],
  [
    'Emotional connection through design language',
    'Multi-functional capabilities',
    'Premium materials and craftsmanship',
    'Distinctive brand identity integration'
  ],
  [
    'Child-safe materials and construction',
    'Educational value integration',
    'Bright, engaging color palette',
    'Easy-to-clean surfaces'
  ],
  [
    'Professional-grade performance',
    'Sleek, modern aesthetic',
    'Advanced security features',
    'Scalable functionality'
  ]
];

const timelines = [
  '2-3 weeks concept development',
  '4-6 weeks full design cycle',
  '1-2 weeks rapid prototype',
  '6-8 weeks comprehensive design',
  '3-4 weeks iterative design',
  '2-4 weeks agile development',
  '5-7 weeks detailed design phase',
  '1-3 weeks sprint design challenge'
];

export interface Brief {
  id: string;
  title: string;
  overview: string;
  productType: string;
  brand: string;
  targetAudience: string;
  designRequirements: string[];
  timeline: string;
  creativeSpark: string;
  createdAt: Date;
}

export function generateRandomBrief() {
  const productType = productTypes[Math.floor(Math.random() * productTypes.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const targetAudience = targetAudiences[Math.floor(Math.random() * targetAudiences.length)];
  const creativeSpark = creativeSparks[Math.floor(Math.random() * creativeSparks.length)];

  return {
    productType,
    brand,
    targetAudience,
    creativeSpark
  };
}

export function generateBriefContent(productType: string, brand: string, targetAudience: string, creativeSpark: string) {
  // Select random overview template
  const overviewTemplate = overviewTemplates[Math.floor(Math.random() * overviewTemplates.length)];
  const audienceContext = overviewTemplate.contexts[Math.floor(Math.random() * overviewTemplate.contexts.length)];
  
  // Generate dynamic overview
  const overview = overviewTemplate.template
    .replace('{productType}', productType.toLowerCase())
    .replace('{audience}', audienceContext);

  // Select random design requirements
  const designRequirements = designRequirementSets[Math.floor(Math.random() * designRequirementSets.length)];
  
  // Select random timeline
  const timeline = timelines[Math.floor(Math.random() * timelines.length)];

  return {
    title: `${brand} ${productType} Design Challenge`,
    overview,
    designRequirements,
    timeline
  };
}

// Notification functionality
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export function setupDailyNotifications() {
  // Clear any existing notifications
  const existingTimeout = localStorage.getItem('notificationTimeout');
  if (existingTimeout) {
    clearTimeout(parseInt(existingTimeout));
  }

  // Set up notification for 24 hours from now
  const timeoutId = setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification('DesignFuse Daily Brief', {
        body: 'Ready for your next creative challenge? Generate your daily brief now!',
        icon: '/favicon.svg',
        tag: 'daily-brief'
      });
    }
    setupDailyNotifications(); // Schedule next notification
  }, 24 * 60 * 60 * 1000); // 24 hours

  localStorage.setItem('notificationTimeout', timeoutId.toString());
}

export function updateLastActivity() {
  localStorage.setItem('lastActivity', new Date().toISOString());
}

export function checkInactivity() {
  const lastActivity = localStorage.getItem('lastActivity');
  if (!lastActivity) return false;

  const lastDate = new Date(lastActivity);
  const now = new Date();
  const hoursDiff = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60);

  return hoursDiff >= 24; // Inactive for 24+ hours
}