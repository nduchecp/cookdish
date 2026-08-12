import { searchTheMealDBByName, getTheMealDBRecipeById, NormalizedRecipe, fetchDummyJsonRecipes } from "./themealdb";
import { searchSpoonacular, getSpoonacularRecipeById, FALLBACK_JOLLOF_RECIPES } from "./spoonacular";
import { searchEdamam, getEdamamRecipeById } from "./edamam";

export const NIGERIAN_LOCAL_DISHES: NormalizedRecipe[] = [
  // 1. SOUPS & SWALLOWS (Accurate Cultural Origins & Detailed Culinary Methods)
  {
    id: "ng-egusi-soup",
    source: "user",
    title: "Authentic Nigerian Egusi Soup (Melon Seed Soup)",
    description: "Rich ground melon seed soup with spinach, bitterleaf, smoked catfish, stockfish, and tender beef in seasoned red palm oil.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    category: "Nigerian Soups",
    area: "Nigerian",
    instructions: [
      "Prep Meat & Stock (20 mins): Place 500g seasoned beef, stockfish, and 1 chopped onion in a pot. Add 3 cups of water, 2 seasoning cubes, and 1 tsp salt. Boil over medium-high heat for 20 minutes until meat is fork-tender. Separate meat and reserve rich broth.",
      "Form Egusi Paste (5 mins): In a bowl, mix 2 cups of ground egusi seeds with 1 finely diced onion and 4 tbsp of warm water until a smooth, thick paste forms. Set aside.",
      "Fry Egusi Balls (8-10 mins): Heat 1/2 cup of red palm oil in a heavy-bottomed pot over medium heat for 3 minutes. Scoop small spoonfuls of egusi paste into the warm oil. Fry gently without stirring for 5 minutes to form firm balls, then turn gently and fry for another 4 minutes until golden and fragrant.",
      "Simmer Broth & Fish (15 mins): Pour reserved beef stock into the pot. Add cooked beef, 1 cup smoked catfish, 3 tbsp ground crayfish, and 2 crushed scotch bonnet peppers. Reduce heat to medium-low, cover, and simmer for 15 minutes to allow egusi to absorb rich flavors.",
      "Add Greens & Serve (5 mins): Stir in 3 cups chopped fresh spinach (or ugu leaves) and 1/2 cup washed bitterleaf. Simmer uncovered for 5 minutes until greens are tender and vibrant. Serve steaming hot with smooth Pounded Yam or Eba."
    ],
    ingredients: [
      { name: "Ground Egusi (Melon Seeds)", amount: "2 cups" },
      { name: "Red Palm Oil", amount: "1/2 cup" },
      { name: "Chopped Spinach / Ugu Leaves", amount: "3 cups" },
      { name: "Washed Bitterleaf", amount: "1/2 cup" },
      { name: "Smoked Catfish", amount: "1 cup" },
      { name: "Stockfish", amount: "1 cup" },
      { name: "Seasoned Beef", amount: "500g" },
      { name: "Beef Stock", amount: "3 cups" },
      { name: "Ground Crayfish", amount: "3 tbsp" },
      { name: "Scotch Bonnet Peppers (Rodo)", amount: "2" }
    ],
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
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
      "Boil & Pound Cocoyam (25 mins): Wash 8 medium cocoyam tubers thoroughly. Boil in a covered pot with water over high heat for 20 minutes until tender when pierced with a fork. Peel off skins while hot and pound in a mortar (or food processor) until smooth and elastic. Set paste aside.",
      "Season & Cook Protein Stock (20 mins): In a large pot, combine 500g beef, 200g shaki (cow tripe), 1 cup stockfish, and 1 cup smoked catfish with 1 sliced onion, 2 seasoning cubes, and 4 cups water. Boil on medium-high heat for 20 minutes.",
      "Flavor Broth (8 mins): Add 1/2 cup red palm oil, 3 tbsp ground crayfish, 2 blended yellow habanero peppers, and 1 tsp ogiri Igbo (fermented castor seed paste). Stir well and boil for 8 minutes until oil blends seamlessly into broth.",
      "Dissolve Thickener (10 mins): Add small scoops of prepared cocoyam paste into the bubbling broth. Lower heat to medium and allow scoops to dissolve completely into a silky, thick soup consistency (about 10 minutes).",
      "Hand-Shred Oha Leaves (3 mins): Tear fresh Oha leaves by hand into medium pieces (do NOT use a metal knife to prevent leaves from turning dark and bitter). Add shredded Oha leaves to pot, stir gently, and simmer for just 3 minutes. Serve hot with Pounded Yam."
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
    cookTimeMinutes: 45,
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
      "Prepare Rich Stock (15 mins): Simmer 3 cups of meat stock with 1 cup smoked catfish, 1/2 cup dried prawns, and 2 crushed scotch bonnet peppers over medium heat for 15 minutes until broth is intensely fragrant.",
      "Dissolve Ogbono (3 mins): In a small bowl, mix 1/2 cup finely ground ogbono powder with 1/3 cup warm red palm oil off heat until completely smooth and lump-free.",
      "Develop Draw Consistency (15 mins): Pour dissolved ogbono mixture into the simmering meat stock. Immediately turn heat to medium-low and whisk continuously for 15 minutes. The soup will begin to draw and thicken noticeably. DO NOT cover pot during this step to preserve draw quality.",
      "Season & Simmer (8 mins): Stir in 2 tbsp ground crayfish, 2 seasoning cubes, and 1 tsp salt. Simmer gently for 8 minutes, stirring occasionally from bottom to prevent scorching.",
      "Finish & Serve (2 mins): Add optional chopped spinach or ugu if desired. Simmer for 2 minutes and serve warm with hot Pounded Yam or Eba."
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
    cookTimeMinutes: 30,
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
      "Cook Assorted Meats (20 mins): Boil 300g assorted beef, 200g cow tripe (shaki), and 1 cup stockfish with 1 diced onion and seasoning cubes in 3 cups water over medium-high heat for 20 minutes until tender.",
      "Prep Fresh Okra (10 mins): Wash 400g fresh green okra pods. Dice 3/4 finely into small rounds and grate remaining 1/4 on a box grater for maximum natural viscosity.",
      "Add Seasonings & Oil (8 mins): Add 1/3 cup red palm oil, 3 tbsp ground crayfish, 2 blended scotch bonnet peppers, and 1 cup smoked catfish to meat stock. Simmer over medium heat for 8 minutes.",
      "Cook Okra (5 mins): Stir chopped and grated okra into the bubbling soup. Simmer on medium-low heat uncovered for exactly 5 minutes so okra retains vibrant green color and fresh crunch.",
      "Serve (2 mins): Remove from heat immediately to prevent overcooking. Serve hot with Pounded Yam or Amala."
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
    cookTimeMinutes: 25,
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
      "Peel & Slice Yam (10 mins): Peel 1 medium white puna yam tuber (1.5kg), trimming off dark spots. Cut into thick rounded slices and rinse twice in cold water to remove starch.",
      "Boil Yam Tender (20-25 mins): Place yam slices in a large pot, cover completely with water, and boil over high heat for 20-25 minutes until yam is fork-tender and breaks easily.",
      "Pound Hot Yam (10 mins): Transfer hot boiled yam slices immediately into a mortar (or heavy-duty food processor). Pound rhythmically with a wooden pestle until chunks dissolve into a cohesive dough.",
      "Add Hot Water & Stretch (5 mins): Add small 2 tbsp splashes of hot yam boiling water as you pound to achieve a stretchy, soft, velvety swallow texture.",
      "Mold & Serve (2 mins): Mold hot Pounded Yam into smooth round portions using wet hands. Serve alongside Egusi, Oha, or Ogbono soup."
    ],
    ingredients: [
      { name: "White Puna Yam Tuber", amount: "1 medium tuber (1.5kg)" },
      { name: "Water for boiling", amount: "As needed" }
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
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
      "Blend Pepper Base (5 mins): In a blender, combine 5 large tatashe (red bell peppers), 3 scotch bonnets, 4 fresh tomatoes, and 1 onion. Blend until smooth paste.",
      "Fry Stew Base (12 mins): Heat 1/2 cup vegetable oil in a heavy-bottomed pot over medium heat. Fry 1 sliced onion and 100g tomato paste for 6 minutes until darkened. Add blended pepper mixture and fry for 6 minutes until oil separates.",
      "Season Stock (5 mins): Pour in 3.5 cups seasoned chicken stock, 1 tbsp curry powder, 1 tbsp dried thyme, 3 bay leaves, 2 stock cubes, and 1 tsp salt. Bring to a rolling boil over high heat.",
      "Add Parboiled Rice & Seal (5 mins): Wash 4 cups long-grain parboiled rice until water runs clear. Add rice to boiling stew. Cover pot tightly with double layer aluminum foil, then seal with pot lid.",
      "Steam & Smoke (35 mins): Turn heat to low. Steam rice undisturbed for 30 minutes. Turn heat to medium-high for final 5 minutes so bottom rice gently charrs, infusing signature smoky party flavor."
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
    cookTimeMinutes: 50,
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
      "Wash & Cook Ofada Rice (25 mins): Wash 3 cups local unpolished Ofada rice thoroughly. Boil in a pot with 4.5 cups water and 1 tsp salt over medium heat for 25 minutes until tender. Drain excess water and keep warm.",
      "Bleach Palm Oil Safely (12-15 mins): Pour 1 cup red palm oil into a dry pot. Cover with lid and heat on medium for 12-15 minutes until oil turns dark clear. Turn off heat and allow pot to cool completely BEFORE opening lid to avoid smoke.",
      "Sauté Iru & Onions (5 mins): Reheat bleached oil on medium, add 2 sliced onions and 2 tbsp iru (locust beans). Sauté for 5 minutes until aromatic.",
      "Fry Green Pepper Sauce (15 mins): Add coarsely blended green bell peppers (6) and green rodo (3). Fry uncovered for 15 minutes, stirring frequently until water evaporates and oil rises to top.",
      "Add Proteins & Simmer (10 mins): Add 200g cooked diced ponmo, 200g shaki, and 4 peeled boiled eggs. Simmer on medium-low for 10 minutes. Serve with hot Ofada rice in banana leaves."
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
    cookTimeMinutes: 50,
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
      "Slice Beef Ribbon-Thin (15 mins): Slice 600g lean flank steak thinly against grain into long flat ribbons (1/8-inch thick).",
      "Coat in Suya Yaji (10 mins): Thread sliced beef onto wooden skewers soaked in water. Rub 1/2 cup authentic Suya Yaji spice mix liberally onto both sides of beef ribbons until thoroughly coated.",
      "Preheat & Oil (5 mins): Preheat oven to 220°C (425°F) or ignite charcoal grill to high heat. Drizzle beef skewers with 3 tbsp vegetable oil.",
      "Grill & Flip (12-15 mins): Grill skewers for 6 minutes, flip over, brush with oil, and grill for another 6 minutes until edges are crisp and charred.",
      "Serve Hot (3 mins): Dust piping hot Suya skewers with extra yaji powder. Serve with thinly sliced red onions and ripe tomatoes."
    ],
    ingredients: [
      { name: "Flank Steak / Beef Sirloin", amount: "600g" },
      { name: "Suya Yaji Spice Mix", amount: "1/2 cup" },
      { name: "Vegetable Oil", amount: "3 tbsp" },
      { name: "Red Onions", amount: "2" },
      { name: "Fresh Tomatoes", amount: "2" }
    ],
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
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
      "Season & Boil Goat Meat (25 mins): Season 1kg bone-in goat meat pieces with 4 crushed garlic cloves, 1 tsp thyme, 2 stock cubes, 1 sliced onion, and 2 cups water. Boil over medium heat for 25 minutes until tender.",
      "Roast Crisp Edges (20 mins): Transfer drained goat meat onto a baking tray. Roast at 200°C (400°F) for 20 minutes until meat is smoky and browned on edges.",
      "Coarsely Crush Peppers (5 mins): Coarsely pulse 6 scotch bonnet peppers (rodo) and 1 red onion in a food processor (do NOT blend smooth).",
      "Sauté & Toss (5 mins): Heat 3 tbsp oil in a wok over medium-high heat. Sauté crushed pepper mixture for 3 minutes, then toss roasted goat meat into spicy sauce for 2 minutes until glossy and coated."
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
    cookTimeMinutes: 50,
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
      "Blend Corn Batter (10 mins): Slice fresh corn kernels off 4 cups yellow sweetcorn ears. Blend coarsely with 3 tatashe, 2 rodo, and 1 onion using minimal water.",
      "Season Batter (5 mins): Stir 1/2 cup warm red palm oil, 3 tbsp ground crayfish, 2 stock cubes, and 1 tsp salt into batter until smooth orange color.",
      "Wrap & Layer (10 mins): Ladle batter into clean banana leaves (or foil containers). Add pieces of 1 cup smoked catfish in center and seal tightly.",
      "Steam Set (45 mins): Place wraps on a steam rack over boiling water in a large pot. Cover and steam over medium heat for 45 minutes until firm."
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
    cookTimeMinutes: 50,
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
      "Proof Yeast (5-10 mins): In a bowl, dissolve 2.5 tsp active dry yeast and 1 tbsp sugar in 1.5 cups warm water (40°C/105°F). Let sit for 8 minutes until frothy.",
      "Mix Batter (5 mins): Sift 3 cups flour, 1/2 cup sugar, 1 tsp nutmeg, and 1/2 tsp salt into yeast water. Whisk for 3 minutes into a thick smooth batter.",
      "Rise Dough (45-60 mins): Cover bowl tightly with plastic wrap and place in a warm spot for 50 minutes until batter doubles in size and shows bubbles.",
      "Deep Fry Golden (5 mins per batch): Heat 4 cups vegetable oil to 170°C (340°F) in a deep pot. Drop rounded scoops of batter using wet hands. Fry for 4-5 minutes, turning constantly until golden brown."
    ],
    ingredients: [
      { name: "All-Purpose Flour", amount: "3 cups" },
      { name: "Granulated Sugar", amount: "1/2 cup" },
      { name: "Active Dry Yeast", amount: "2.5 tsp" },
      { name: "Ground Nutmeg", amount: "1 tsp" },
      { name: "Vegetable Oil for deep frying", amount: "4 cups" }
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
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
      "Mix Dry Ingredients (5 mins): Sift 4 cups flour, 1/2 cup sugar, 1 tsp nutmeg, 1 tsp baking powder, and 1/2 tsp salt into a large bowl.",
      "Rub Butter (5 mins): Rub 100g cold unsalted butter into flour mixture using fingertips until fine breadcrumb consistency forms.",
      "Form Stiff Dough (5 mins): Whisk 1/2 cup evaporated milk and 1 egg together. Pour into flour and knead gently into a smooth stiff dough.",
      "Roll & Cut Squares (10 mins): Roll dough out on floured surface to 1/6-inch thickness. Cut into tiny uniform 1cm squares using a pizza cutter.",
      "Fry Crunchy (4 mins per batch): Fry squares in medium-hot oil (165°C) for 3-4 minutes until golden brown. Cool completely on paper towels to crunch up."
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
      "Make Shortcrust Pastry (15 mins + 30 mins chill): Sift 500g flour and 1 tsp salt. Rub in 250g cold butter until breadcrumbs form. Add 1/2 cup ice water gradually to form smooth pastry dough; wrap and chill for 30 minutes.",
      "Cook Meat Filling (20 mins): Sauté 1 diced onion, 400g minced beef, 1 diced potato, and 1 diced carrot with 1 tbsp curry, 1 tsp thyme, 2 garlic cloves, and stock cubes for 12 minutes. Stir in flour slurry to form thick gravy; cool completely.",
      "Assemble Half-Moons (15 mins): Roll pastry to 3mm thickness, cut out 15cm rounds, spoon filling onto center, brush edges with egg wash, fold over into half-moons, and crimp edges with a fork.",
      "Bake Golden (30-35 mins): Prick tops for steam, brush with egg wash, and bake at 180°C (350°F) for 30-35 minutes until rich golden brown."
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
    cookTimeMinutes: 35,
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
      "Peel & Blend Beans (20 mins): Soak 3 cups black-eyed beans for 10 mins, rub off skins, and wash clean. Blend peeled beans with 4 tatashe peppers and 1 onion until silky smooth.",
      "Season Batter (5 mins): Whisk 3/4 cup vegetable oil, 3 tbsp ground crayfish, 2 stock cubes, and 1.5 cups warm water into batter until light and fluffy.",
      "Ladle & Add Eggs (10 mins): Ladle batter into leaf cones or containers. Insert slices of 3 boiled eggs and flaked smoked fish into center; seal tightly.",
      "Steam Firm (45-50 mins): Steam over medium heat in a covered pot for 45-50 minutes until toothpick inserted in center comes out clean."
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
      "Boil Pasta Al Dente (9 mins): Bring 4 liters salted water to boil. Cook 400g spaghetti pasta for 8-9 minutes until al dente. Reserve 1 cup pasta water before draining.",
      "Crisp Pancetta (6 mins): In a large skillet, sauté 150g diced pancetta or guanciale over medium heat for 6 minutes until crispy and fat renders.",
      "Whisk Egg Cheese Sauce (3 mins): In a bowl, whisk 4 egg yolks, 1/2 cup grated Pecorino Romano cheese, and 1 tsp freshly cracked black pepper until thick paste.",
      "Combine & Emulsify Off Heat (3 mins): Toss hot drained spaghetti directly into skillet with pancetta off heat. Pour in egg mixture immediately, tossing rapidly while splashing 1/4 cup hot pasta water to create a silky glossy sauce without scrambling eggs. Serve warm."
    ],
    ingredients: [
      { name: "Spaghetti Pasta", amount: "400g" },
      { name: "Pancetta / Guanciale", amount: "150g" },
      { name: "Egg Yolks", amount: "4" },
      { name: "Pecorino Romano Cheese", amount: "1/2 cup" },
      { name: "Freshly Cracked Black Pepper", amount: "1 tsp" }
    ],
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
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
      "Sear Chicken Thighs (8 mins): Heat 1 tbsp oil in a skillet on medium-high. Sear 500g boneless skin-on chicken thighs skin-side down for 5 minutes until crispy golden, flip and cook for 3 minutes.",
      "Simmer Teriyaki Sauce (5 mins): Mix 3 tbsp soy sauce, 2 tbsp mirin, and 1 tbsp brown sugar. Pour into skillet with chicken.",
      "Glaze & Reduce (4 mins): Simmer sauce over medium heat for 4 minutes, turning chicken repeatedly until sauce thickens into a glossy syrupy glaze.",
      "Assemble Bowl (3 mins): Slice teriyaki chicken into strips. Serve over bowls of warm steamed jasmine rice, garnished with toasted sesame seeds and sliced spring onions."
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
    cookTimeMinutes: 20,
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
      "Brown Ground Beef (7 mins): Brown 500g ground beef sirloin in a skillet over medium-high heat for 7 minutes, breaking apart with a wooden spoon until cooked through. Drain excess fat.",
      "Simmer Taco Seasoning (5 mins): Add 2 tbsp taco seasoning mix and 1/3 cup water. Simmer on medium-low for 5 minutes until sauce coats beef thick and juicy.",
      "Warm Tortilla Shells (3 mins): Heat 8 corn tortilla shells on a dry skillet over medium heat for 30 seconds per side until pliable and warm.",
      "Assemble Tacos (3 mins): Spoon seasoned beef into warm tortillas, topped with shredded cheddar, fresh pico de gallo salsa, sour cream, and fresh lime juice."
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
    cookTimeMinutes: 18,
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
