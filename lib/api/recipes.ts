import { searchTheMealDBByName, getTheMealDBRecipeById, NormalizedRecipe, fetchDummyJsonRecipes } from "./themealdb";
import { searchSpoonacular, getSpoonacularRecipeById, FALLBACK_JOLLOF_RECIPES } from "./spoonacular";
import { searchEdamam, getEdamamRecipeById } from "./edamam";

export const NIGERIAN_LOCAL_DISHES: NormalizedRecipe[] = [
  // 1. SOUPS & SWALLOWS (Accurate Cultural Origins & Distinct Soups)
  {
    id: "ng-egusi-soup",
    source: "user",
    title: "Authentic Nigerian Egusi Soup (Melon Seed Soup)",
    description: "Rich ground melon seed soup with spinach, bitterleaf, smoked catfish, stockfish, and tender beef in seasoned red palm oil.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Soups",
    area: "Nigerian",
    instructions: [
      "Blend ground egusi seeds with onion and small warm water into a thick paste.",
      "Heat red palm oil in a pot, add sliced onions, and gently fry egusi balls until golden and fragrant.",
      "Pour in rich beef broth, ground crayfish, smoked catfish, stockfish, and ground pepper. Simmer for 20 minutes.",
      "Stir in chopped spinach or ugu leaves and washed bitterleaf.",
      "Simmer for 5 minutes until vegetables are tender. Serve hot with Pounded Yam or Eba."
    ],
    ingredients: [
      { name: "Ground Egusi (Melon Seeds)", amount: "2 cups" },
      { name: "Red Palm Oil", amount: "1/2 cup" },
      { name: "Chopped Spinach / Ugu Leaves", amount: "3 cups" },
      { name: "Smoked Catfish", amount: "1 cup" },
      { name: "Stockfish", amount: "1 cup" },
      { name: "Seasoned Beef", amount: "500g" },
      { name: "Beef Stock", amount: "3 cups" },
      { name: "Ground Crayfish", amount: "3 tbsp" },
      { name: "Scotch Bonnet Peppers (Rodo)", amount: "2" }
    ],
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    servings: 6,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 720,
  },
  {
    id: "ng-oha-soup",
    source: "user",
    title: "Traditional Igbo Oha Soup (Ofe Oha)",
    description: "Authentic Igbo heritage delicacy soup made with fresh Oha leaves, cocoyam paste thickener, ogiri Igbo, smoked fish, stockfish, and tender shaki.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Soups",
    area: "Nigerian",
    instructions: [
      "Boil cocoyam tubers until soft, peel, and pound into a smooth thickener paste.",
      "Boil beef, shaki, stockfish, and smoked fish with onions, seasoning cubes, and salt until tender.",
      "Stir red palm oil, ground crayfish, yellow pepper, and ogiri into the meat broth.",
      "Add scoops of cocoyam paste and allow to dissolve completely to thicken the soup.",
      "Shred fresh Oha leaves by hand (do not cut with knife) and add to the pot. Simmer for 3 minutes and serve with Pounded Yam."
    ],
    ingredients: [
      { name: "Fresh Oha Leaves", amount: "2 bunches" },
      { name: "Cocoyam Paste (Thickener)", amount: "8 medium tubers" },
      { name: "Red Palm Oil", amount: "1/2 cup" },
      { name: "Ogiri Igbo (Fermented castor seed)", amount: "1 tsp" },
      { name: "Smoked Catfish", amount: "1 cup" },
      { name: "Stockfish", amount: "1 cup" },
      { name: "Yellow Habanero Peppers", amount: "2" },
      { name: "Ground Crayfish", amount: "3 tbsp" }
    ],
    prepTimeMinutes: 25,
    cookTimeMinutes: 40,
    servings: 5,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 610,
  },
  {
    id: "ng-ogbono-soup",
    source: "user",
    title: "Traditional Nigerian Ogbono Draw Soup (Ofe Ogbono)",
    description: "Iconic Nigerian draw soup made from finely ground wild mango seeds (ogbono), smoked catfish, dried prawns, and red palm oil.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Soups",
    area: "Nigerian",
    instructions: [
      "Dissolve finely ground ogbono powder in warm palm oil off the heat.",
      "Pour rich meat stock into a pot, bring to boil, and stir in dissolved ogbono mixture.",
      "Whisk constantly on medium-low heat for 15 minutes as it draws and thickens.",
      "Add smoked catfish, prawns, ground crayfish, scotch bonnet pepper, and seasoning cubes.",
      "Simmer for 10 minutes without covering pot to maintain draw. Serve with Pounded Yam or Eba."
    ],
    ingredients: [
      { name: "Ground Ogbono Powder", amount: "1/2 cup" },
      { name: "Red Palm Oil", amount: "1/3 cup" },
      { name: "Smoked Catfish", amount: "1 cup" },
      { name: "Dried Prawns", amount: "1/2 cup" },
      { name: "Meat Stock", amount: "3 cups" },
      { name: "Ground Crayfish", amount: "2 tbsp" },
      { name: "Scotch Bonnet Peppers (Rodo)", amount: "2" },
      { name: "Salt", amount: "1 tsp" }
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    servings: 6,
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 540,
  },
  {
    id: "ng-okra-soup",
    source: "user",
    title: "Authentic Nigerian Fresh Okra Soup (Ofe Okwuru)",
    description: "Freshly chopped green okra stew simmered with scotch bonnets, red palm oil, smoked catfish, ground crayfish, and tender beef.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Soups",
    area: "Nigerian",
    instructions: [
      "Finely chop fresh green okra pods (or grate half for extra draw).",
      "Boil beef, cow tripe (shaki), and stockfish in seasoned broth until tender.",
      "Add red palm oil, ground crayfish, blended scotch bonnets, and smoked fish to the broth.",
      "Stir in chopped okra and simmer on medium heat for 5 minutes (do not overcook or cover).",
      "Serve steaming hot alongside Pounded Yam, Eba, or Amala."
    ],
    ingredients: [
      { name: "Fresh Green Okra", amount: "400g" },
      { name: "Red Palm Oil", amount: "1/3 cup" },
      { name: "Smoked Catfish", amount: "1 cup" },
      { name: "Stockfish", amount: "1 cup" },
      { name: "Assorted Beef", amount: "300g" },
      { name: "Cow Tripe (Shaki)", amount: "200g" },
      { name: "Ground Crayfish", amount: "3 tbsp" },
      { name: "Scotch Bonnet Peppers (Rodo)", amount: "2" }
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servings: 5,
    difficulty: "Easy",
    rating: 5.0,
    reviewsCount: 490,
  },
  {
    id: "ng-pounded-yam",
    source: "user",
    title: "Pounded Yam (Iyan)",
    description: "Classic Nigerian swallow made from boiled white puna yam pounded into a smooth, soft, stretchy golden dough.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Swallows",
    area: "Nigerian",
    instructions: [
      "Peel white puna yam tuber, slice into thick rounded pieces, and wash thoroughly.",
      "Boil yam slices in water for 20-25 minutes until fork-tender.",
      "Pound hot cooked yam in a mortar (or food processor) until completely smooth and lump-free.",
      "Add small splashes of hot yam water if needed to reach desired stretchy softness.",
      "Serve warm with Egusi, Oha, Ogbono, or Okra soup."
    ],
    ingredients: [
      { name: "White Puna Yam Tuber", amount: "1 medium tuber (1.5kg)" },
      { name: "Water for boiling", amount: "As needed" }
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    servings: 4,
    difficulty: "Easy",
    rating: 5.0,
    reviewsCount: 510,
  },

  // 2. RICE & STEWS
  {
    id: "ng-jollof",
    source: "user",
    title: "Smoky Nigerian Party Jollof Rice",
    description: "Authentic party-style smoky parboiled rice cooked in a rich blend of tatashe red bell peppers, scotch bonnets, tomato paste, and chicken broth.",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Rice & Stews",
    area: "Nigerian",
    instructions: [
      "Blend tatashe red bell peppers, scotch bonnets, fresh tomatoes, and onions.",
      "Fry sliced onions and tomato paste in vegetable oil for 5 minutes.",
      "Add blended pepper mixture and cook until oil separates.",
      "Add seasoned chicken broth, curry, thyme, bay leaves, and salt. Bring to a boil.",
      "Stir in washed parboiled long-grain rice, cover tightly with foil and lid.",
      "Cook on low heat for 35-40 minutes so steam cooks rice with signature smoky flavor."
    ],
    ingredients: [
      { name: "Long-Grain Parboiled Rice", amount: "4 cups" },
      { name: "Tatashe Red Bell Peppers", amount: "5 large" },
      { name: "Scotch Bonnet Peppers (Rodo)", amount: "3 medium" },
      { name: "Tomato Paste", amount: "100g" },
      { name: "Seasoned Chicken Stock", amount: "3.5 cups" },
      { name: "Curry Powder", amount: "1 tbsp" },
      { name: "Dried Thyme", amount: "1 tbsp" },
      { name: "Bay Leaves", amount: "3" }
    ],
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    servings: 6,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 890,
  },
  {
    id: "ng-ofada-rice",
    source: "user",
    title: "Special Ofada Rice & Ayamase Stew",
    description: "Unpolished short-grain Ofada rice paired with bleached palm oil green pepper stew packed with boiled eggs, shaki, and ponmo.",
    image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Rice & Stews",
    area: "Nigerian",
    instructions: [
      "Wash Ofada rice thoroughly and boil with leaf infusion until tender.",
      "Bleach palm oil in a covered pot on medium heat for 12-15 minutes until dark clear.",
      "Sauté chopped onions and iru (fermented locust beans) in bleached palm oil.",
      "Add coarse blended green bell peppers and scotch bonnets; fry down until thick.",
      "Stir in diced fried beef, ponmo, shaki, and boiled eggs. Simmer for 15 minutes."
    ],
    ingredients: [
      { name: "Local Ofada Rice", amount: "3 cups" },
      { name: "Green Bell Peppers", amount: "6" },
      { name: "Green Scotch Bonnet Peppers (Rodo)", amount: "3" },
      { name: "Red Palm Oil (Bleached)", amount: "1 cup" },
      { name: "Iru (Locust Beans)", amount: "2 tbsp" },
      { name: "Boiled Eggs", amount: "4" },
      { name: "Cow Skin (Ponmo)", amount: "200g" },
      { name: "Cow Tripe (Shaki)", amount: "200g" }
    ],
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    servings: 5,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 670,
  },

  // 3. GRILLS, SUYA & NIGHT MARKET CHOPS
  {
    id: "ng-beef-suya",
    source: "user",
    title: "Spicy Beef Suya (Night Market Style)",
    description: "Thinly sliced flank steak marinated in peanut yaji spice mix, grilled over open flames, served with sliced onions and tomatoes.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Grills & Small Chops",
    area: "Nigerian",
    instructions: [
      "Slice lean beef thinly into long ribbons.",
      "Thread beef onto wooden skewers soaked in water.",
      "Generously coat beef skewers with authentic Suya Yaji spice mix.",
      "Drizzle with vegetable oil and grill over charcoal or in oven at 220°C for 12-15 minutes.",
      "Serve piping hot dusted with extra yaji, sliced onions, and tomatoes."
    ],
    ingredients: [
      { name: "Flank Steak / Beef Sirloin", amount: "600g" },
      { name: "Suya Yaji Spice Mix", amount: "1/2 cup" },
      { name: "Vegetable Oil", amount: "3 tbsp" },
      { name: "Red Onions", amount: "2" },
      { name: "Fresh Tomatoes", amount: "2" }
    ],
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 5.0,
    reviewsCount: 940,
  },
  {
    id: "ng-asun",
    source: "user",
    title: "Peppered Goat Meat (Asun)",
    description: "Smoky grilled goat meat tossed in spicy coarse habanero peppers, scotch bonnets, and sautéed onions.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Grills & Small Chops",
    area: "Nigerian",
    instructions: [
      "Season goat meat pieces with garlic, ginger, thyme, onions, and stock cubes.",
      "Boil until tender, then roast in oven at 200°C for 20 minutes to crisp outer edges.",
      "Coarsely crush scotch bonnet peppers and bell peppers.",
      "Sauté peppers and sliced onions in vegetable oil, toss roasted goat meat in pepper sauce for 5 minutes."
    ],
    ingredients: [
      { name: "Goat Meat (Bone-in)", amount: "1kg" },
      { name: "Scotch Bonnet Peppers (Rodo)", amount: "6" },
      { name: "Red Onions", amount: "2" },
      { name: "Garlic Cloves", amount: "4 cloves" },
      { name: "Vegetable Oil", amount: "3 tbsp" },
      { name: "Seasoning Cubes", amount: "2 cubes" }
    ],
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    servings: 5,
    difficulty: "Medium",
    rating: 4.9,
    reviewsCount: 780,
  },

  // 4. BAKERY, SNACKS & BREAKFAST
  {
    id: "ng-corn-moimoi",
    source: "user",
    title: "Steamed Corn Moi Moi (Ekoki / Nni Oka)",
    description: "Authentic Nigerian steamed fresh corn pudding made from blended sweet yellow corn, red palm oil, habaneros, ground crayfish, and smoked fish.",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Bakery & Snacks",
    area: "Nigerian",
    instructions: [
      "Blend fresh corn with red bell peppers (tatashe), scotch bonnets, and onions into a coarse batter.",
      "Stir warm red palm oil, ground crayfish, seasoning cubes, and salt into corn batter.",
      "Ladle batter into banana leaves or foil containers, add flaked smoked catfish.",
      "Steam over medium heat for 40-45 minutes until set and fragrant."
    ],
    ingredients: [
      { name: "Fresh Yellow Corn / Sweetcorn", amount: "4 cups" },
      { name: "Red Palm Oil", amount: "1/2 cup" },
      { name: "Tatashe Red Bell Peppers", amount: "3" },
      { name: "Scotch Bonnet Peppers (Rodo)", amount: "2" },
      { name: "Ground Crayfish", amount: "3 tbsp" },
      { name: "Smoked Catfish", amount: "1 cup" }
    ],
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    servings: 5,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 380,
  },
  {
    id: "ng-puff-puff",
    source: "user",
    title: "Golden Nigerian Puff-Puff",
    description: "Soft, spongy, deep-fried Nigerian yeast dough balls scented with nutmeg and sugar, golden crisp on the outside and airy inside.",
    image: "https://images.unsplash.com/photo-1621510456681-2330135e8874?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Bakery & Snacks",
    area: "Nigerian",
    instructions: [
      "Dissolve yeast and sugar in warm water; let sit for 5 minutes.",
      "Mix flour, sugar, nutmeg, and salt; pour in yeast water and whisk into smooth batter.",
      "Cover and let rise for 45-60 minutes until doubled.",
      "Deep fry scoops in hot oil for 4-5 minutes until golden brown."
    ],
    ingredients: [
      { name: "All-Purpose Flour", amount: "3 cups" },
      { name: "Granulated Sugar", amount: "1/2 cup" },
      { name: "Active Dry Yeast", amount: "2.5 tsp" },
      { name: "Ground Nutmeg", amount: "1 tsp" },
      { name: "Vegetable Oil for deep frying", amount: "4 cups" }
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 6,
    difficulty: "Easy",
    rating: 5.0,
    reviewsCount: 650,
  },
  {
    id: "ng-chin-chin",
    source: "user",
    title: "Crunchy Nigerian Chin Chin",
    description: "Iconic crunchy fried pastry cubes made with rich butter, evaporated milk, nutmeg, sugar, and fried golden crunchy.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Bakery & Snacks",
    area: "Nigerian",
    instructions: [
      "Sift flour, sugar, baking powder, nutmeg, and salt into a bowl.",
      "Rub cold butter into flour until it resembles fine breadcrumbs.",
      "Whisk egg and evaporated milk together; pour into flour and knead into a smooth stiff dough.",
      "Roll out dough on a floured surface to 1/6-inch thickness.",
      "Cut into small uniform crunchy squares using a pizza cutter.",
      "Deep fry in medium-hot oil for 3-4 minutes until golden brown and crunchy. Cool completely to crunch up."
    ],
    ingredients: [
      { name: "All-Purpose Flour", amount: "4 cups" },
      { name: "Cold Unsalted Butter", amount: "100g" },
      { name: "Granulated Sugar", amount: "1/2 cup" },
      { name: "Ground Nutmeg", amount: "1 tsp" },
      { name: "Evaporated Milk", amount: "1/2 cup" },
      { name: "Egg", amount: "1" },
      { name: "Vegetable Oil for frying", amount: "4 cups" }
    ],
    prepTimeMinutes: 25,
    cookTimeMinutes: 20,
    servings: 8,
    difficulty: "Medium",
    rating: 4.9,
    reviewsCount: 520,
  },
  {
    id: "ng-meat-pie",
    source: "user",
    title: "Classic Nigerian Beef Meat Pie",
    description: "Flaky golden butter shortcrust pastry stuffed with seasoned minced beef, diced potatoes, carrots, and rich savory gravy.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Bakery & Snacks",
    area: "Nigerian",
    instructions: [
      "Sift flour and salt into a bowl, rub in cold butter until fine breadcrumb consistency.",
      "Add ice cold water gradually and gently bring together into a smooth pastry dough; wrap and chill for 30 minutes.",
      "Sauté diced onions, minced beef, diced potatoes, and carrots with garlic, thyme, curry powder, and stock cubes until tender.",
      "Stir in a flour-water slurry to bind filling into a thick glossy savory gravy; cool completely.",
      "Roll dough to 3mm thickness, cut out rounds, spoon filling onto center, brush edges with egg wash, and fold into half-moons.",
      "Crimp edges firmly with a fork, prick top for steam, brush with egg wash, and bake at 180°C (350°F) for 30-35 minutes until deep golden."
    ],
    ingredients: [
      { name: "All-Purpose Flour", amount: "500g" },
      { name: "Cold Unsalted Butter", amount: "250g" },
      { name: "Minced Beef (Ground Sirloin)", amount: "400g" },
      { name: "Irish Potatoes", amount: "1 large" },
      { name: "Carrots", amount: "1 large" },
      { name: "Curry Powder", amount: "1 tbsp" },
      { name: "Dried Thyme", amount: "1 tsp" },
      { name: "Garlic Cloves", amount: "2 cloves" },
      { name: "Egg Wash (for glazing)", amount: "1 egg beaten" }
    ],
    prepTimeMinutes: 35,
    cookTimeMinutes: 30,
    servings: 6,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 590,
  },
  {
    id: "ng-moimoi",
    source: "user",
    title: "Steamed Nigerian Beans Moi Moi",
    description: "Steamed savory bean pudding made from peeled black-eyed beans blended with red bell peppers, habaneros, crayfish, boiled eggs, and smoked fish.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Snacks & Breakfast",
    area: "Nigerian",
    instructions: [
      "Blend peeled black-eyed beans with tatashe peppers and onions into a smooth batter.",
      "Whisk in vegetable oil, crayfish, seasoning cubes, and warm water.",
      "Ladle into containers with boiled eggs and smoked fish; steam for 45 minutes."
    ],
    ingredients: [
      { name: "Peeled Black-Eyed Beans", amount: "3 cups" },
      { name: "Tatashe Red Bell Peppers", amount: "4" },
      { name: "Ground Crayfish", amount: "3 tbsp" },
      { name: "Vegetable Oil", amount: "3/4 cup" },
      { name: "Boiled Eggs", amount: "3" }
    ],
    prepTimeMinutes: 30,
    cookTimeMinutes: 50,
    servings: 6,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 480,
  },

  // 5. INTERNATIONAL CUISINES (Global Classics)
  {
    id: "int-spaghetti-carbonara",
    source: "user",
    title: "Classic Italian Spaghetti Carbonara",
    description: "Traditional Roman pasta with crispy guanciale, creamy egg yolks, freshly grated Pecorino Romano cheese, and black pepper.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
    category: "International",
    area: "Italian",
    instructions: [
      "Boil spaghetti in salted water until al dente.",
      "Crisp diced guanciale or pancetta in a pan over medium heat until golden.",
      "Whisk egg yolks, Pecorino Romano, and black pepper together in a bowl.",
      "Toss hot drained pasta with pancetta and remove from heat.",
      "Quickly pour egg mixture into pasta, tossing vigorously with pasta water to create a creamy sauce."
    ],
    ingredients: [
      { name: "Spaghetti Pasta", amount: "400g" },
      { name: "Pancetta / Guanciale", amount: "150g" },
      { name: "Egg Yolks", amount: "4" },
      { name: "Pecorino Romano Cheese", amount: "1/2 cup" },
      { name: "Freshly Cracked Black Pepper", amount: "1 tsp" }
    ],
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 410,
  },
  {
    id: "int-chicken-teriyaki",
    source: "user",
    title: "Japanese Chicken Teriyaki Rice Bowl",
    description: "Tender chicken thighs glazed in sweet soy mirin teriyaki sauce, served over fluffy steamed rice with sesame seeds.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    category: "International",
    area: "Japanese",
    instructions: [
      "Pan-sear boneless chicken thighs skin-side down until golden crisp.",
      "Whisk soy sauce, mirin, sake, and brown sugar into a glaze.",
      "Pour glaze over chicken and simmer until sauce thickens to a rich syrup.",
      "Slice chicken and serve over warm steamed rice, garnished with sesame seeds and spring onions."
    ],
    ingredients: [
      { name: "Chicken Thighs (Boneless)", amount: "500g" },
      { name: "Soy Sauce", amount: "3 tbsp" },
      { name: "Mirin Rice Wine", amount: "2 tbsp" },
      { name: "Brown Sugar", amount: "1 tbsp" },
      { name: "Steamed Jasmine Rice", amount: "3 cups" },
      { name: "Sesame Seeds", amount: "1 tbsp" },
      { name: "Spring Onions", amount: "2 stalks" }
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 3,
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 350,
  },
  {
    id: "int-beef-tacos",
    source: "user",
    title: "Authentic Mexican Street Beef Tacos",
    description: "Seasoned ground beef tucked into warm corn tortillas with shredded cheese, fresh pico de gallo salsa, and lime.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    category: "International",
    area: "Mexican",
    instructions: [
      "Brown ground beef in a skillet over medium heat and drain excess fat.",
      "Stir in taco seasoning and water; simmer for 5 minutes until rich and thick.",
      "Warm corn tortilla shells on a dry skillet for 30 seconds per side.",
      "Fill tortillas with seasoned beef, topped with cheddar, pico de gallo, and sour cream."
    ],
    ingredients: [
      { name: "Ground Beef Sirloin", amount: "500g" },
      { name: "Taco Seasoning Mix", amount: "2 tbsp" },
      { name: "Corn Tortilla Shells", amount: "8" },
      { name: "Shredded Cheddar Cheese", amount: "1 cup" },
      { name: "Fresh Pico de Gallo Salsa", amount: "1/2 cup" },
      { name: "Sour Cream", amount: "1/4 cup" }
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 5.0,
    reviewsCount: 520,
  }
];

/**
 * Unified multi-source recipe aggregator
 * Queries Nigerian Local Dishes, TheMealDB, Spoonacular, Edamam, and DummyJSON concurrently
 */
export async function searchAllRecipeAPIs(query: string = ""): Promise<NormalizedRecipe[]> {
  const q = query.toLowerCase().trim();

  const nigerianMatches = NIGERIAN_LOCAL_DISHES.filter((r) => {
    if (q === "") return true;
    return (
      r.title.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.area?.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.ingredients.some((ing) => ing.name.toLowerCase().includes(q))
    );
  });

  try {
    const [mealDbResults, spoonacularResults, edamamResults, dummyJsonResults] = await Promise.allSettled([
      searchTheMealDBByName(query),
      searchSpoonacular(query),
      searchEdamam(query),
      query === "" ? fetchDummyJsonRecipes() : Promise.resolve([]),
    ]);

    const mDb = mealDbResults.status === "fulfilled" ? mealDbResults.value : [];
    const sp = spoonacularResults.status === "fulfilled" ? spoonacularResults.value : [];
    const ed = edamamResults.status === "fulfilled" ? edamamResults.value : [];
    const dj = dummyJsonResults.status === "fulfilled" ? dummyJsonResults.value : [];

    const combined = [
      ...nigerianMatches,
      ...sp,
      ...ed,
      ...mDb,
      ...dj,
    ];

    const seenTitles = new Set<string>();

    return combined.filter((recipe) => {
      const key = recipe.title.toLowerCase().trim();
      if (seenTitles.has(key)) return false;
      seenTitles.add(key);
      return true;
    });
  } catch (err) {
    console.error("searchAllRecipeAPIs error fallback:", err);
    return nigerianMatches;
  }
}

/**
 * Unified recipe detail fetcher supporting all sources:
 * Nigerian Local Dishes, Edamam, Spoonacular, TheMealDB, and DummyJSON
 */
export async function getUnifiedRecipeById(source: string, id: string): Promise<NormalizedRecipe | null> {
  const localMatch = NIGERIAN_LOCAL_DISHES.find((r) => r.id === id);
  if (localMatch) return localMatch;

  try {
    // Check Edamam IDs or Edamam source
    if (source === "edamam" || id.startsWith("edamam-")) {
      const edamamCached = getEdamamRecipeById(id);
      if (edamamCached) return edamamCached;

      const keywords = decodeURIComponent(id.replace(/^edamam-\d+-/, "")).replace(/-/g, " ");
      const fetched = await searchEdamam(keywords);
      const reFound = fetched.find((r) => r.id === id) || fetched[0];
      if (reFound) return reFound;
    }

    // Check Spoonacular / fallback Jollof IDs
    if (source === "spoonacular" || id.startsWith("sp-") || FALLBACK_JOLLOF_RECIPES[id]) {
      const spoonacularRecipe = await getSpoonacularRecipeById(id);
      if (spoonacularRecipe) return spoonacularRecipe;
    }

    // Check TheMealDB IDs
    if (source === "themealdb" || !isNaN(Number(id))) {
      const mealDbRecipe = await getTheMealDBRecipeById(id);
      if (mealDbRecipe) return mealDbRecipe;
    }

    // Check DummyJSON IDs
    if (source === "dummyjson" || id.startsWith("dummy-")) {
      const dummyRecipes = await fetchDummyJsonRecipes();
      const found = dummyRecipes.find((r) => r.id === id);
      if (found) return found;
    }
  } catch (err) {
    console.error("getUnifiedRecipeById error fallback:", err);
  }

  return NIGERIAN_LOCAL_DISHES[0];
}
