/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'rosemary-hair-shampoo',
    name: 'Rosemary Infused Hair Shampoo',
    price: 0,
    rating: 0,
    reviewsCount: 0,
    image: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg',
    images: [
      'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg'
    ],
    category: 'haircare',
    shortDescription: 'Cleanses the hair and the scalp gently whilst stimulating hair growth.',
    description: 'Contains Rosemary extracts which induce and stimulate hair growth whilst cleansing. Soft and mild cleansing agents that cleanses the hair and the scalp gently whilst stimulating hair growth.',
    ingredients: [
      'Rosemary extracts'
    ],
    benefits: [
      'Cleanses the hair and the scalp gently',
      'Induces and stimulates hair growth'
    ],
    usage: [
      'Begin by preparing the hair for shampooing.',
      'Cleanse the hair with Rosemary infused Shampoo, repeating the process two to three times as needed to ensure a thorough yet mild cleanse.',
      'Carefully blot the hair with a clean towel to remove excess water. This should be done softly and slowly to minimize friction and prevent unnecessary breakage.'
    ],
    sizes: [],
    stock: 0,
    keyIngredients: ['Rosemary extracts'],
    suitableFor: ['Natural hair', 'Permed hair', 'Dreadlocks'],
    featured: true,
    bestSeller: true,
    relatedIds: ['avocado-hair-conditioner', 'leave-in-conditioner', 'hair-protein'],
    reviews: []
  },
  {
    id: 'avocado-hair-conditioner',
    name: 'Avocado Infused Hair Conditioner',
    price: 0,
    rating: 0,
    reviewsCount: 0,
    image: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg',
    images: [
      'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg'
    ],
    category: 'haircare',
    shortDescription: 'Restores and retains moisture after hair cleansing while supplying the hair with healthy fats and proteins.',
    description: 'Restores and retains moisture after hair cleansing (Shampooing). Softens hair and makes it easier to comb. Contains avocado extracts which is high in healthy fats and proteins which strengthens the hair strands. Naturally derived ingredients were combines to soften and supply the hair with healthy fats and proteins.',
    ingredients: [
      'Avocado extracts'
    ],
    benefits: [
      'Restores and retains moisture after hair cleansing',
      'Softens hair and makes it easier to comb',
      'Strengthens the hair strands with healthy fats and proteins'
    ],
    usage: [
      'Apply conditioner evenly through the hair, taking time to gently massage the scalp for a few minutes to promote relaxation and improve circulation.',
      'After rinsing, gently pat the hair with a towel to absorb excess moisture, ensuring minimal friction against the hair strands.',
      'NB: On days designated for deep conditioning treatments, kindly avoid using avocado Infused Hair Conditioner to allow the treatment to work effectively.'
    ],
    sizes: [],
    stock: 0,
    keyIngredients: ['Avocado extracts'],
    suitableFor: ['Natural hair', 'Permed hair'],
    featured: true,
    bestSeller: false,
    relatedIds: ['rosemary-hair-shampoo', 'leave-in-conditioner', 'almond-hair-mayonnaise'],
    reviews: []
  },
  {
    id: 'leave-in-conditioner',
    name: 'Leave In Conditioner',
    price: 0,
    rating: 0,
    reviewsCount: 0,
    image: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg',
    images: [
      'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg'
    ],
    category: 'haircare',
    shortDescription: 'Retains moisture, tightens hair shaft and conditions the hair for a healthy look.',
    description: 'It is used right after conditioning the hair to initiate styling. Repairs hair and leaves it with sheen and softness fro style and control. It can be used on daily bases for hair grooming. Perfect for blow drying or thermal styling. Defines curls and waves when used in hair or hair extensions. Eliminates dryness or brittleness by restoring and maintaining moisture in hair. Uniquely formulated to retain moisture, tighten hair shaft and condition the hair. A moisturized hair is a healthy hair.',
    ingredients: [],
    benefits: [
      'Repairs hair and leaves it with sheen and softness',
      'Perfect for blow drying or thermal styling',
      'Defines curls and waves',
      'Eliminates dryness or brittleness by restoring moisture',
      'Retains moisture and tightens hair shaft'
    ],
    usage: [
      'Used right after conditioning the hair to initiate styling.',
      'Can be used on daily bases for hair grooming.'
    ],
    sizes: [],
    stock: 0,
    keyIngredients: [],
    suitableFor: ['Natural hair', 'Permed hair', 'Hair extensions'],
    featured: false,
    bestSeller: true,
    relatedIds: ['rosemary-hair-shampoo', 'hair-protein', 'scalp-itching-growth-therapy'],
    reviews: []
  },
  {
    id: 'hair-protein',
    name: 'Hair Protein',
    price: 0,
    rating: 0,
    reviewsCount: 0,
    image: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg',
    images: [
      'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg'
    ],
    category: 'haircare',
    shortDescription: 'Combats hair brittleness, stimulates sheen, and protects the hair strands.',
    description: 'Combats hair brittleness and stimulates sheen whilst protecting the hair strands. Enriched with nutrients, which strengthens hair, stimulates hair growth and reduce the rate of breakages drastically. The balance formula helps prevent hair breakages. Makes hair easy to comb, thereby reducing breakages whist restoring it with nutrients such as healthy fats and proteins to strengthen the strands.',
    ingredients: [],
    benefits: [
      'Combats hair brittleness and stimulates sheen',
      'Strengthens hair and stimulates hair growth',
      'Reduces the rate of breakages drastically',
      'Restores hair with healthy fats and proteins'
    ],
    usage: [
      'Proceed by applying Vicesh Hair Protein along with a suitable leave-in conditioner to prepare the hair for styling.',
      'This creates a smooth foundation for blow-drying, tonging, or roller setting.'
    ],
    sizes: [],
    stock: 0,
    keyIngredients: [],
    suitableFor: ['Permed hair', 'Natural hair', 'Dread locks', 'All forms of hair extensions'],
    featured: false,
    bestSeller: false,
    relatedIds: ['rosemary-hair-shampoo', 'leave-in-conditioner', 'almond-hair-mayonnaise'],
    reviews: []
  },
  {
    id: 'almond-hair-mayonnaise',
    name: 'Almond Hair Mayonnaise',
    price: 0,
    rating: 0,
    reviewsCount: 0,
    image: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg',
    images: [
      'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg'
    ],
    category: 'haircare',
    shortDescription: 'Rich in proteins and nutrients necessary for retaining moisture and strengthening hair strands.',
    description: 'Very rich in natural Oleic acid which promotes hair growth and nourishment. Helps retain moisture into the hair which makes it an excellent formula for deep conditioning. Rich is proteins and nutrients necessary for retaining moisture and strengthening hair strands. Reduces the rate of breakages and frizz. Making it an essential requirement before and after perming hair. Also, before and after braiding hair, it is essential to undergo deep conditioning to help protect and restore the hair. This process strengthens the hair and improves it elasticity before braiding. Also, providing the hair with intense hydration prior to braiding the hair. It sooths the scalp and reduces the rate of flaking and itches. Thereby, calming the scalp and restoring moisture.',
    ingredients: [
      'Natural Oleic acid'
    ],
    benefits: [
      'Promotes hair growth and nourishment',
      'Helps retain moisture and acts as an excellent deep conditioner',
      'Strengthens the hair and improves its elasticity',
      'Soothes the scalp and reduces the rate of flaking and itches'
    ],
    usage: [
      'For a damaged or brittle hair, deep conditioning could be done once in two weeks. For a healthy hair, it could be done once in 3 to 4 weeks.',
      'Deep conditioning should be a constant ritual before and after perming the hair.',
      'Also, before and after braiding hair, it is essential to undergo deep conditioning.'
    ],
    sizes: [],
    stock: 0,
    keyIngredients: ['Natural Oleic acid'],
    suitableFor: ['Natural hair', 'Permed hair', 'Hair extensions'],
    featured: true,
    bestSeller: true,
    relatedIds: ['rosemary-hair-shampoo', 'avocado-hair-conditioner', 'scalp-itching-growth-therapy'],
    reviews: []
  },
  {
    id: 'scalp-itching-growth-therapy',
    name: 'Scalp Itching and Hair Growth Therapy',
    price: 0,
    rating: 0,
    reviewsCount: 0,
    image: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg',
    images: [
      'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg'
    ],
    category: 'haircare',
    shortDescription: 'Contains Jojoba oil which stimulate hair growth and repairs the barriers of the scalp.',
    description: 'Apply directly to scalp and massage it itchy areas. The rate of itchiness will reduce drastically. It can be used after braids to relieve pains and tightness whilst stimulating hair growth. Contains Jojoba oil which stimulate hair growth and repairs the barriers of the scalp.',
    ingredients: [
      'Jojoba oil'
    ],
    benefits: [
      'Stimulates hair growth and repairs the barriers of the scalp',
      'Reduces the rate of itchiness drastically',
      'Relieves pains and tightness after braids'
    ],
    usage: [
      'Apply directly to scalp and massage it itchy areas.',
      'It can be used after braids to relieve pains and tightness whilst stimulating hair growth.'
    ],
    sizes: [],
    stock: 0,
    keyIngredients: ['Jojoba oil'],
    suitableFor: ['All types of hair'],
    featured: false,
    bestSeller: false,
    relatedIds: ['rosemary-hair-shampoo', 'almond-hair-mayonnaise', 'leave-in-conditioner'],
    reviews: []
  },
  {
    id: 'vicesh-skin-talk-green-pedicure-set',
    name: 'Vicesh Skin Talk Pedicure Set (Green Set)',
    price: 65.00,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg',
    images: [
      'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg'
    ],
    category: 'pedicure',
    shortDescription: 'An authentic 6-step numbered pedicure kit with 2 additional gift products for a comprehensive, professional foot spa treatment.',
    description: 'The Vicesh Skin Talk Pedicure Set (Green Set) is a complete professional foot care system designed to relax, soften, exfoliate, and refresh tired feet. The sequential numbering system of this product is essential for its correct identification and application. The kit includes six full-sized numbered products and two crucial gift products (Pedicure Salt and Antiseptic) that ease muscle tension, release body pains, prevent bacterial infections, and leave your feet feeling incredibly soft, healthy, and revitalized.',
    ingredients: [
      'Mineral Sea Salts',
      'Volcanic Pumice',
      'Eucalyptus Leaf Oil',
      'Tea Tree Oil',
      'Peppermint Leaf Extract',
      'Organic Avocado Oil',
      'Bentonite Clay',
      'Antiseptic Agent'
    ],
    benefits: [
      'Includes 6 full-sized numbered products and 2 essential gifts (Pedicure Salt & Antiseptic)',
      'Relaxation of leg muscles and calming of tired feet via therapeutic Pedicure Salt',
      'Prevents fungal and bacterial infections while maintaining absolute hygiene',
      'Numbered system guides you seamlessly through an authentic salon-grade pedicure at home'
    ],
    usage: [
      'Step 1 (Sanitize): Spray the Hygiene Spray (No. 2) evenly over the feet to cleanse and prepare them for treatment.',
      'Step 2 (Soak): Add the Foot Soak (No. 1) together with a substantial amount of the Pedicure Salt into warm water. Soak feet for about 15 minutes to relax and soften the skin.',
      'Step 3 (Exfoliate): Apply the Foot Scrub (No. 3) to the feet, focusing on areas with hard skin. Gently rub in circular motions, then rinse thoroughly.',
      'Step 4 (Masque): Apply the Foot Masque (No. 4) liberally over the feet. Wrap in a towel or foot liner, leave for about 15 minutes, then rinse off.',
      'Step 5 (Moisturize): Massage the Foot & Leg Lotion (No. 5) into the feet and legs to deeply hydrate and revitalize with a cooling effect.',
      'Step 6 (Refresh): Finish by spraying the Revitalizing Spray (No. 6) over the feet for a cooling, refreshing, and deodorizing effect.',
      'Antiseptic: Use during the procedure to ensure absolute hygiene and prevent infections.'
    ],
    sizes: ['Complete 8-Piece Set'],
    stock: 25,
    keyIngredients: ['Eucalyptus Oil', 'Tea Tree Extract', 'Mineral Sea Salt', 'Antiseptic'],
    suitableFor: ['Tired, Sore Feet', 'Rough & Dry Soles', 'Professional Home Pedicures'],
    featured: true,
    bestSeller: true,
    relatedIds: ['vicesh-pedicure-red-set', 'vicesh-skin-talk-manicure-set'],
    reviews: [
      {
        id: 'rev-pg1',
        name: 'Mavis Asante',
        rating: 5,
        title: 'Authentic spa at home',
        comment: 'This green set is outstanding. The numbering makes it so easy to follow. My feet feel incredibly soft, and the pedicure salt totally relieved my muscle fatigue after standing all day.',
        date: '2026-05-25'
      }
    ]
  },
  {
    id: 'vicesh-pedicure-red-set',
    name: 'Orange & Cocoa Butter Pedicure Set (Red Set)',
    price: 75.00,
    rating: 4.9,
    reviewsCount: 71,
    image: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg',
    images: [
      'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg'
    ],
    category: 'pedicure',
    shortDescription: 'An elite 5-step numbered pedicure restoration system with 4 professional-grade gifts for tough calluses and nail care.',
    description: 'Vicesh Pedicure Set (Red Set) is an elite, salon-grade pedicure system engineered for deep therapeutic foot restoration and intensive skin renewal. The sequential numbering system of this product is crucial for its identification and correct application. It features five full-sized numbered products (Antibacterial Shampoo, Foot Soak, Pedicure Salt, Pedicure Scrub, and Pedicure Mask) and four high-performance gifts: Cuticle Softener, Cuticle Oil, Antiseptic, and a specialized Pedicure Cream that targets and eliminates tough calluses to restore smooth, healthy skin.',
    ingredients: [
      'Antibacterial Cleansing Agents',
      'Bentonite & Kaolin Clay',
      'Organic Cocoa Butter',
      'Natural Essential Oils',
      'Cuticle Softening Formula',
      'Vitamin-Rich Cuticle Oils',
      'Salicylic-infused Pedicure Cream'
    ],
    benefits: [
      'Includes 5 full-sized numbered products and 4 beautiful gifts for advanced foot therapy',
      'Specialized salon-grade Pedicure Cream removes tough calluses for a smoother appearance',
      'Mineral-infused Pedicure Salt detoxifies the body, reduces stress, and calms muscles',
      'Cuticle Softener and Cuticle Oil provide comprehensive, damage-free nail and cuticle grooming'
    ],
    usage: [
      'Step 1 (Prepare): Prepare a warm or cold-water bath. Add appropriate amounts of Antibacterial Pedicure Shampoo (No. 1), Pedicure Soak (No. 2), Pedicure Salt (No. 3), and Antiseptic.',
      'Step 2 (Cuticles): Apply Vicesh Cuticle Softener to the nail plate and spread evenly.',
      'Step 3 (Calluses): Apply a generous amount of Pedicure Cream to the soles of the feet, avoiding contact with surrounding skin.',
      'Step 4 (Soak): Soak the feet in the prepared water bath for about 10 minutes, depending on the skin type.',
      'Step 5 (Dead Skin): Gently remove dead skin cells and tough calluses.',
      'Step 6 (Exfoliate): Apply Pedicure Scrub (No. 4) to the feet, focusing on hard skin. Massage gently in circular motions, then rinse thoroughly.',
      'Step 7 (Masque): Apply Pedicure Mask (No. 5) generously over the feet. Wrap with a towel or foot liner, leave for about 15 minutes, then rinse off.',
      'Step 8 (Nail Finish): Finish by massaging the nail plate and cuticles with Vicesh Cuticle Oil to hydrate and protect.'
    ],
    sizes: ['Complete 9-Piece Set'],
    stock: 20,
    keyIngredients: ['Antibacterial Shampoo', 'Cuticle Softener', 'Cuticle Oil', 'Pedicure Cream'],
    suitableFor: ['Stubborn Calluses', 'Cracked Heels', 'Comprehensive Nail Grooming'],
    featured: true,
    bestSeller: false,
    relatedIds: ['vicesh-skin-talk-green-pedicure-set', 'vicesh-skin-talk-manicure-set'],
    reviews: [
      {
        id: 'rev-pr1',
        name: 'Naa Adjeley',
        rating: 5,
        title: 'Amazing Callus Cream!',
        comment: 'The Red Set is an absolute miracle. The specialized pedicure cream completely softened my dry, stubborn calluses in minutes. Cuticle oil smells divine and nail plates look so healthy.',
        date: '2026-06-08'
      }
    ]
  },
  {
    id: 'vicesh-skin-talk-manicure-set',
    name: 'Vicesh Skin Talk Manicure Set',
    price: 60.00,
    rating: 4.8,
    reviewsCount: 54,
    image: 'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg',
    images: [
      'https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg'
    ],
    category: 'manicure',
    shortDescription: 'An authentic 6-step numbered manicure kit with 3 professional-grade gifts to hydrate hands, soften cuticles, and promote nail health.',
    description: 'Keep your hands feeling soft, youthful, and beautifully groomed with the Vicesh Skin Talk Manicure Set. The sequential numbering system of this product is vital for its correct identification and therapeutic application. This luxurious kit features six full-sized numbered products designed to soothe, sanitize, exfoliate, and deeply rehydrate dry hands. It also contains three high-grade gifts: Pedicure Salt for muscle relaxation, Antiseptic for absolute hygiene, and a professional-grade Cuticle Softener that loosens cuticles for easy, damage-free grooming.',
    ingredients: [
      'Sweet Almond Oil',
      'Cold-Pressed Jojoba Oil',
      'Cold-Distilled Lemon Peel Oil',
      'Organic Shea Butter',
      'Cuticle Softening Complex',
      'Anti-aging Botanical Extracts',
      'Antiseptic Shield'
    ],
    benefits: [
      'Includes 6 full-sized numbered products and 3 elite gifts (Pedicure Salt, Antiseptic & Cuticle Softener)',
      'Anti-aging hand soak and rehydrating masque deep-moisturize and soften dry skin',
      'Cuticle Softener loosens cuticles for safe, damage-free trimming and grooming',
      'Provides an elegant, professional nail-salon finish from the comfort of home'
    ],
    usage: [
      'Step 1 (Cuticles): Apply Vicesh Cuticle Softener to the nail plate and spread evenly.',
      'Step 2 (Sanitize): Spray the Hygiene Spray (No. 2) evenly over the hands to cleanse and prepare them.',
      'Step 3 (Soak): Add the Anti-aging Hand Soak (No. 1) together with a substantial amount of the Pedicure Salt into warm water. Soak hands for 15 minutes to relax muscles and soften skin.',
      'Step 4 (Exfoliate): Apply the Hand Scrub (No. 3) to the hands, focusing on rough, dry skin. Gently massage in a circular motion, then rinse thoroughly.',
      'Step 5 (Masque): Apply the Rehydrating Hand Masque (No. 4) generously over the hands. Wrap in a towel or liner, leave for 15 minutes, then rinse off.',
      'Step 6 (Moisturize & Refresh): Massage the Foot & Leg Lotion (No. 5) into the hands and arms to cool and calm. Finish by spraying the Revitalizing Spray (No. 6) over the hands for refreshing comfort.'
    ],
    sizes: ['Complete 9-Piece Set'],
    stock: 30,
    keyIngredients: ['Sweet Almond Oil', 'Cuticle Softener', 'Shea Butter', 'Lemon Peel Oil'],
    suitableFor: ['Dry, Rough Hands', 'Fragile Nails', 'Nail Bed Nourishment'],
    featured: true,
    bestSeller: true,
    relatedIds: ['vicesh-skin-talk-green-pedicure-set', 'vicesh-pedicure-red-set'],
    reviews: [
      {
        id: 'rev-mn1',
        name: 'Efua Taylor',
        rating: 5,
        title: 'Nail Salon Results!',
        comment: 'My hands were so dry and my cuticles were constantly tearing. This manicure set completely restored them in one treatment! The cuticle softener makes push back so easy and painless.',
        date: '2026-06-01'
      }
    ]
  }
];
