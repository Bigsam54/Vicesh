/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'rosemary-hair-shampoo',
    name: 'Rosemary Infused Hair Shampoo',
    price: 24.00,
    rating: 4.8,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'haircare',
    shortDescription: 'A gentle, stimulating hair shampoo infused with natural rosemary extracts to cleanse and promote robust hair growth.',
    description: 'Vicesh Rosemary Infused Hair Shampoo is formulated with soft, mild cleansing agents that gently wash away impurities from the hair and scalp without stripping natural moisture. Enriched with pure rosemary leaf extracts, it works to naturally stimulate circulation within the scalp, fortifying hair follicles to induce healthy growth, prevent hair fall, and soothe dryness at the roots. It leaves your scalp refreshed and your hair beautifully clean and primed for conditioning.',
    ingredients: [
      'Purified Water',
      'Rosemary Leaf Extract (Rosmarinus Officinalis)',
      'Decyl Glucoside (Gentle Coconut-derived Cleanser)',
      'Vegetable Glycerin',
      'Cocamidopropyl Betaine',
      'Pro-Vitamin B5 (Panthenol)',
      'Rosemary Essential Oil',
      'Tocopherol (Vitamin E)',
      'Citric Acid (Natural pH Balancer)'
    ],
    benefits: [
      'Cleanse the hair and the scalp gently with soft and mild cleansing agents',
      'Contains Rosemary extracts which induce and stimulate healthy hair growth',
      'Prevents hair fall by strengthening hair roots and follicles',
      'Maintains healthy scalp moisture, reducing dryness and flaking'
    ],
    usage: [
      'Begin by preparing the hair for shampooing.',
      'Cleanse the hair with Rosemary Infused Shampoo, massage the scalp gently with fingertips in circular motions.',
      'Repeat the cleansing process two to three times as needed to ensure a thorough yet mild cleanse.',
      'Rinse out completely with lukewarm water, then blot excess water with a clean towel softly and slowly to minimize friction.'
    ],
    sizes: ['250ml', '500ml'],
    stock: 45,
    keyIngredients: ['Rosemary Extract', 'Pro-Vitamin B5', 'Vegetable Glycerin'],
    suitableFor: ['Natural Hair', 'Permed Hair', 'Dreadlocks'],
    featured: true,
    bestSeller: true,
    relatedIds: ['avocado-hair-conditioner', 'leave-in-conditioner', 'hair-protein'],
    reviews: [
      {
        id: 'rev-r1',
        name: 'Abena Mensah',
        rating: 5,
        title: 'Miracle Cleanse!',
        comment: 'This shampoo is so gentle and doesn’t dry out my natural dreadlocks. I have noticed less shedding since using it, and my scalp feels amazing.',
        date: '2026-05-12'
      },
      {
        id: 'rev-r2',
        name: 'Sarah Coleman',
        rating: 5,
        title: 'Wonderful Rosemary Aroma',
        comment: 'Absolutely love the natural rosemary scent. It lathers nicely for a sulfate-free shampoo and leaves my scalp feeling thoroughly clean and refreshed.',
        date: '2026-06-02'
      }
    ]
  },
  {
    id: 'avocado-hair-conditioner',
    name: 'Avocado Infused Hair Conditioner',
    price: 26.00,
    rating: 4.9,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'haircare',
    shortDescription: 'A deep softening conditioner enriched with avocado extracts, high in healthy fats and proteins, to restore and retain moisture.',
    description: 'Vicesh Avocado Infused Hair Conditioner is meticulously crafted to restore and retain moisture in the hair after cleansing. Formulated with premium avocado extracts rich in healthy fats, essential amino acids, and structural proteins, it nourishes and strengthens weak hair strands. This conditioner melts tangles, softens the hair shaft, and makes combing effortless. NB: On designated days for deep conditioning treatments, kindly avoid using Avocado Infused Hair Conditioner to allow the treatment to work effectively.',
    ingredients: [
      'Purified Water',
      'Avocado Fruit Extract (Persea Gratissima)',
      'Cold-Pressed Avocado Oil',
      'Shea Butter (Butyrospermum Parkii)',
      'Cetyl Alcohol (Naturally derived emollient)',
      'Hydrolyzed Wheat Protein',
      'Behentrimonium Methosulfate',
      'Tocopheryl Acetate (Vitamin E)',
      'Organic Essential Oils'
    ],
    benefits: [
      'Restores and retains deep moisture in the hair after shampooing',
      'Softens hair texture and makes it significantly easier to comb',
      'Nourishes and strengthens hair strands with healthy fats and rich proteins',
      'Reduces friction and prevents unnecessary mechanical hair breakage during detangling'
    ],
    usage: [
      'After shampooing, carefully blot the hair with a clean towel softly and slowly to remove excess water and minimize friction.',
      'Apply Avocado Infused Hair Conditioner evenly through the hair from mid-lengths to ends.',
      'Take time to gently massage the scalp for a few minutes to promote relaxation and improve blood circulation.',
      'Rinse thoroughly with cold or lukewarm water to seal the cuticles.',
      'NB: On designated days for deep conditioning treatments, kindly avoid using Avocado Infused Hair Conditioner to let the deep treatment work effectively.'
    ],
    sizes: ['250ml', '500ml'],
    stock: 35,
    keyIngredients: ['Avocado Extract', 'Cold-Pressed Avocado Oil', 'Hydrolyzed Wheat Protein'],
    suitableFor: ['Natural Hair', 'Permed Hair'],
    featured: true,
    bestSeller: false,
    relatedIds: ['rosemary-hair-shampoo', 'leave-in-conditioner', 'almond-hair-mayonnaise'],
    reviews: [
      {
        id: 'rev-a1',
        name: 'Grace Osei',
        rating: 5,
        title: 'Instant softness!',
        comment: 'I love how my permed hair feels after using this. It restores moisture immediately and makes my hair so smooth and easy to detangle.',
        date: '2026-04-20'
      },
      {
        id: 'rev-a2',
        name: 'Ama Serwaa',
        rating: 4,
        title: 'Very rich and nourishing',
        comment: 'Extremely rich conditioner that penetrates my thick natural hair. Combing is a breeze. Great avocado smell.',
        date: '2026-05-30'
      }
    ]
  },
  {
    id: 'leave-in-conditioner',
    name: 'Leave-In Conditioner',
    price: 22.00,
    rating: 4.7,
    reviewsCount: 85,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'haircare',
    shortDescription: 'A multi-action styling leave-in cream designed to retain moisture, tighten hair shafts, and restore sheen.',
    description: 'Vicesh Leave-In Conditioner is uniquely formulated to retain moisture, tighten the hair shaft, and condition the hair. It is used right after washing and conditioning to repair dry strands and prepare them for styling. It delivers outstanding sheen and softness, making it perfect for blow drying, thermal styling, or defining beautiful curls and waves in natural hair and hair extensions. Regular daily use eliminates dryness and brittleness, maintaining optimum hair hydration.',
    ingredients: [
      'Organic Aloe Vera Juice',
      'Shea Butter Ester',
      'Vegetable Glycerin',
      'Cold-Pressed Jojoba Seed Oil',
      'Centrimonium Chloride (anti-static)',
      'Argan Kernel Oil',
      'Pro-Vitamin B5 (Panthenol)',
      'Lavender Essential Oil',
      'Phenoxyethanol (Gentle preservative)'
    ],
    benefits: [
      'Uniquely formulated to retain moisture, tighten hair shaft, and condition the hair',
      'Repairs hair structure and leaves it with beautiful sheen and softness for style and control',
      'Eliminates dryness or brittleness by restoring and maintaining moisture in hair',
      'Provides thermal protection for blow drying or styling, and defines curls and waves'
    ],
    usage: [
      'Use right after washing and conditioning the hair to initiate styling.',
      'Smooth a generous amount evenly onto damp hair from roots to ends.',
      'Perfect for use before blow drying, thermal styling, or roller setting to create a smooth foundation.',
      'Can be used on a daily basis for hair grooming and to define curls in natural hair or hair extensions.'
    ],
    sizes: ['250ml', '500ml'],
    stock: 50,
    keyIngredients: ['Aloe Vera', 'Jojoba Oil', 'Pro-Vitamin B5'],
    suitableFor: ['Natural Hair', 'Permed Hair', 'Hair Extensions'],
    featured: false,
    bestSeller: true,
    relatedIds: ['rosemary-hair-shampoo', 'hair-protein', 'scalp-itching-growth-therapy'],
    reviews: [
      {
        id: 'rev-l1',
        name: 'Esi Ampah',
        rating: 5,
        title: 'Perfect Curl Definer',
        comment: 'This leave-in is excellent for my hair extensions and natural hair. It keeps dry and brittle ends moisturized all day long. Curls stay defined without crunch.',
        date: '2026-05-15'
      }
    ]
  },
  {
    id: 'hair-protein',
    name: 'Hair Protein',
    price: 28.00,
    rating: 4.8,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'haircare',
    shortDescription: 'An intensive, nutrient-enriched protein treatment that prevents hair breakage, combats brittleness, and restores sheen.',
    description: 'Vicesh Hair Protein is a high-performance balancing treatment formulated to combat hair brittleness and drastically reduce breakages. Enriched with structural proteins, vitamins, and nourishing fats, it strengthens hair strands, restores vitality, and stimulates a beautiful natural sheen. This protein-infused formula makes the hair remarkably easy to comb, ensuring healthy strands and protective barrier restoration against thermal and physical styling.',
    ingredients: [
      'Purified Water',
      'Hydrolyzed Soy Protein',
      'Hydrolyzed Wheat Protein',
      'Cold-Pressed Sweet Almond Oil',
      'Raw Avocado Lipids',
      'Glycerin',
      'Centrimonium Bromide',
      'Vitamin B7 (Biotin)',
      'Citrus Essential Oil'
    ],
    benefits: [
      'Balanced formula helps prevent hair breakages and combats brittleness',
      'Stimulates a beautiful natural sheen while protecting hair strands',
      'Restores the hair with vital nutrients such as healthy fats and proteins to strengthen strands',
      'Makes hair highly cooperative and easy to comb, reducing physical damage'
    ],
    usage: [
      'After shampooing and conditioning, gently pat the hair with a clean towel to absorb excess moisture.',
      'Apply Vicesh Hair Protein evenly through the hair from roots to ends.',
      'Pair it along with a suitable leave-in conditioner to prepare the hair for styling.',
      'Provides a smooth, fortified foundation perfect for blow-drying, tonging, or roller setting.'
    ],
    sizes: ['150ml', '300ml'],
    stock: 40,
    keyIngredients: ['Hydrolyzed Wheat Protein', 'Soy Protein', 'Biotin'],
    suitableFor: ['Permed Hair', 'Natural Hair', 'Dreadlocks', 'All forms of Hair Extensions'],
    featured: false,
    bestSeller: false,
    relatedIds: ['rosemary-hair-shampoo', 'leave-in-conditioner', 'almond-hair-mayonnaise'],
    reviews: [
      {
        id: 'rev-p1',
        name: 'Kofi Boateng',
        rating: 5,
        title: 'Reduced shedding completely',
        comment: 'My permed hair was breaking badly from heat styling. This hair protein has strengthened my hair strands and restored a healthy shine. Absolute staple!',
        date: '2026-06-11'
      }
    ]
  },
  {
    id: 'almond-hair-mayonnaise',
    name: 'Almond Hair Mayonnaise',
    price: 34.00,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'haircare',
    shortDescription: 'An intense, deep-conditioning treatment rich in Oleic acid to promote hair growth, nourishment, and scalp protection.',
    description: 'Vicesh Almond Hair Mayonnaise is a luxurious deep conditioner rich in natural Oleic acid and vital nutrients that promote hair growth and deep strand nourishment. It acts as an exceptional formula for restoring moisture, preventing damage before and after chemical perming, and protecting hair during braiding. By providing intense hydration and soothing the scalp, it prevents flaking, eases itchiness, and improves hair elasticity to reduce frizz and split ends.',
    ingredients: [
      'Cold-Pressed Sweet Almond Oil (Prunus Amygdalus Dulcis)',
      'Natural Oleic Acid',
      'Egg Protein Extract',
      'Unrefined Shea Butter',
      'Olive Fruit Oil',
      'Hydrolyzed Soy Protein',
      'Vegetable Glycerin',
      'Vitamin E (Tocopherol)',
      'Lavender and Bergamot Essential Oils'
    ],
    benefits: [
      'Rich in natural Oleic acid which promotes robust hair growth and deep nourishment',
      'Highly effective formula for deep conditioning to retain intense moisture',
      'Protects and restores hair elasticity before and after braiding or perming hair',
      'Soothes and calms the scalp, reducing the rate of flaking and itchiness'
    ],
    usage: [
      'For damaged or brittle hair, perform a deep conditioning treatment once every two weeks.',
      'For healthy hair maintenance, deep condition once every 3 to 4 weeks.',
      'Always undergo deep conditioning before and after perming hair to reduce chemical damage and frizz.',
      'Always deep condition before braiding hair to strengthen strands, improve elasticity, and provide intense hydration.',
      'Apply a generous amount of Almond Hair Mayonnaise to clean, damp hair. Distribute evenly, cover with a shower cap, leave on for 15-20 minutes, then rinse thoroughly.'
    ],
    sizes: ['250g', '500g'],
    stock: 30,
    keyIngredients: ['Sweet Almond Oil', 'Oleic Acid', 'Egg Protein', 'Raw Shea Butter'],
    suitableFor: ['Natural Hair', 'Permed Hair', 'Hair Extensions'],
    featured: true,
    bestSeller: true,
    relatedIds: ['rosemary-hair-shampoo', 'avocado-hair-conditioner', 'scalp-itching-growth-therapy'],
    reviews: [
      {
        id: 'rev-m1',
        name: 'Kezia Ofori',
        rating: 5,
        title: 'Deep hydration savior',
        comment: 'I deep condition with this before getting my braids. My scalp does not flake or itch at all while braided, and when I take them down, my hair is still strong and healthy!',
        date: '2026-05-18'
      }
    ]
  },
  {
    id: 'scalp-itching-growth-therapy',
    name: 'Scalp Itching & Hair Growth Therapy',
    price: 20.00,
    rating: 4.8,
    reviewsCount: 68,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'haircare',
    shortDescription: 'A direct-to-scalp targeted therapy containing Jojoba oil to relieve itching, soothe braid tightness, and stimulate hair growth.',
    description: 'Vicesh Scalp Itching and Hair Growth Therapy is a specialized botanical treatment formulated to target scalp discomfort directly. Infused with cold-pressed Jojoba oil and soothing therapeutic essential oils, it heals the scalp barrier, neutralizes dry flakes, and reduces itchiness immediately. This lightweight oil absorbs quickly and is highly recommended to relieve pain, tension, and tightness after braiding, while continuously stimulating active hair growth.',
    ingredients: [
      'Cold-Pressed Jojoba Seed Oil (Simmondsia Chinensis)',
      'Tea Tree Essential Oil (Melaleuca Alternifolia)',
      'Peppermint Essential Oil (Mentha Piperita)',
      'Rosemary Leaf Extract',
      'Castor Seed Oil',
      'Coconut Oil',
      'Tocopherol (Vitamin E)'
    ],
    benefits: [
      'Contains Jojoba oil which stimulates hair growth and repairs the skin barrier of the scalp',
      'Drastically reduces scalp itchiness and flaking on contact',
      'Relieves tension, tightness, and post-styling pains after braids',
      'Lightweight oil blend that does not clog pores or weigh down hair roots'
    ],
    usage: [
      'Apply the therapy directly to the scalp using the targeted nozzle.',
      'Gently massage into the scalp with your fingertips, focusing on itchy or irritated areas.',
      'To relieve pain and tightness after braiding, apply along braid lines and hairline.',
      'Use 2-3 times a week or as often as needed for soothing scalp comfort.'
    ],
    sizes: ['100ml', '200ml'],
    stock: 55,
    keyIngredients: ['Jojoba Oil', 'Tea Tree Oil', 'Peppermint Oil'],
    suitableFor: ['All Hair Types', 'Dry Itchy Scalps', 'Post-Braid Relief'],
    featured: false,
    bestSeller: false,
    relatedIds: ['rosemary-hair-shampoo', 'almond-hair-mayonnaise', 'leave-in-conditioner'],
    reviews: [
      {
        id: 'rev-s1',
        name: 'Derrick Kwakye',
        rating: 5,
        title: 'Instant relief from itching',
        comment: 'This product is a lifesaver. My scalp used to itch terribly two days after getting braids. This oil stops the itch immediately and feels so cool and tingly.',
        date: '2026-06-10'
      }
    ]
  },
  {
    id: 'vicesh-skin-talk-green-pedicure-set',
    name: 'Vicesh Skin Talk Pedicure Set (Green Set)',
    price: 65.00,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519735052327-2b992f8c0444?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'pedicure',
    shortDescription: 'A premium 6-step numbered pedicure kit with 2 additional gift products for a comprehensive, professional foot spa treatment.',
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
      'Numbered system guides you seamlessly through a premium salon-grade pedicure at home'
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
        title: 'Luxury spa at home',
        comment: 'This green set is outstanding. The numbering makes it so easy to follow. My feet feel incredibly soft, and the pedicure salt totally relieved my muscle fatigue after standing all day.',
        date: '2026-05-25'
      }
    ]
  },
  {
    id: 'vicesh-pedicure-red-set',
    name: 'Vicesh Pedicure Set (Red Set)',
    price: 75.00,
    rating: 4.9,
    reviewsCount: 71,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519735052327-2b992f8c0444?auto=format&fit=crop&q=80&w=800'
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
      'Includes 5 full-sized numbered products and 4 premium gifts for advanced foot therapy',
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
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'manicure',
    shortDescription: 'A premium 6-step numbered manicure kit with 3 professional-grade gifts to hydrate hands, soften cuticles, and promote nail health.',
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
