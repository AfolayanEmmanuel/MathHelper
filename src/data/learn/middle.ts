import type { Course } from './types';

export const MIDDLE: Course[] = [
  {
    id: 'integers',
    level: 'middle',
    title: 'Integers & Order of Operations',
    icon: 'swap-horizontal-outline',
    description: 'Negative numbers, absolute value, operations with signed numbers and PEMDAS.',
    lessons: [
      {
        id: 'integers-absolute-value',
        title: 'Integers & Absolute Value',
        minutes: 7,
        summary: 'Integers are whole numbers and their opposites. Absolute value is a number’s distance from 0.',
        keyPoints: [
          'On a number line, numbers increase to the right: −3 > −7.',
          'Opposites are the same distance from 0 on opposite sides: 5 and −5.',
          '|x| is always ≥ 0: |−9| = 9, |9| = 9.',
        ],
        examples: [
          { problem: 'Order from least to greatest: −4, 2, −1, 0, −6', steps: ['Place on a number line; the farthest left is least.'], answer: '−6, −4, −1, 0, 2' },
          { problem: 'Evaluate |−9| + |3|', steps: ['|−9| = 9', '|3| = 3', '9 + 3 = 12'], answer: '12' },
        ],
        practice: [
          { question: 'Which is greater: −12 or −8?', answer: '−8' },
          { question: '|−15| − |6|', answer: '9' },
          { question: 'What is the opposite of −23?', answer: '23' },
        ],
      },
      {
        id: 'adding-subtracting-integers',
        title: 'Adding & Subtracting Integers',
        minutes: 9,
        summary: 'Same signs: add and keep the sign. Different signs: subtract absolute values and keep the sign of the larger. Subtracting means adding the opposite.',
        keyPoints: [
          'Same signs → add absolute values, keep the common sign.',
          'Different signs → subtract absolute values, keep the sign of the one with larger absolute value.',
          'a − b = a + (−b). Subtracting a negative is adding a positive.',
        ],
        formulas: [{ label: 'Key rule', value: 'a − (−b) = a + b' }],
        examples: [
          { problem: '−8 + 5', steps: ['Different signs: 8 − 5 = 3', 'The larger absolute value (8) is negative'], answer: '−3' },
          { problem: '6 − (−9)', steps: ['Add the opposite: 6 + 9'], answer: '15' },
          { problem: '−4 − 7', steps: ['Add the opposite: −4 + (−7)', 'Same signs: 4 + 7 = 11, keep negative'], answer: '−11' },
        ],
        practice: [
          { question: '−13 + (−6)', answer: '−19' },
          { question: '7 − 12', answer: '−5' },
          { question: '−5 − (−11)', answer: '6' },
        ],
      },
      {
        id: 'multiplying-dividing-integers',
        title: 'Multiplying & Dividing Integers',
        minutes: 7,
        summary: 'Same signs give a positive result; different signs give a negative result.',
        keyPoints: [
          '(+)(+) = +, (−)(−) = +, (+)(−) = −, (−)(+) = −. The same rules apply to division.',
          'An even number of negative factors → positive. Odd → negative.',
          '(−2)³ = −8 but (−2)⁴ = 16.',
        ],
        examples: [
          { problem: '(−6)(−4)', steps: ['Same signs → positive', '6 × 4 = 24'], answer: '24' },
          { problem: '−36 ÷ 9', steps: ['Different signs → negative', '36 ÷ 9 = 4'], answer: '−4' },
          { problem: '(−2)³', steps: ['(−2)(−2)(−2)', 'Three negatives (odd) → negative', '2³ = 8'], answer: '−8' },
        ],
        practice: [
          { question: '(−7)(3)', answer: '−21' },
          { question: '(−48) ÷ (−6)', answer: '8' },
          { question: '(−1)¹⁰', answer: '1' },
          { question: '(−3)(−2)(−5)', answer: '−30' },
        ],
      },
      {
        id: 'order-of-operations',
        title: 'Order of Operations',
        minutes: 8,
        summary: 'PEMDAS: Parentheses, Exponents, Multiplication & Division (left to right), Addition & Subtraction (left to right).',
        keyPoints: [
          'Grouping symbols first: ( ), [ ], fraction bars, absolute value bars.',
          'Exponents next.',
          'Multiplication and division are on the same level — work left to right.',
          'Addition and subtraction are on the same level — work left to right.',
        ],
        formulas: [{ label: 'Order', value: '( ) → exponents → × ÷ → + −' }],
        examples: [
          { problem: '3 + 4 × (2 + 1)²', steps: ['Parentheses: 2 + 1 = 3', 'Exponent: 3² = 9', 'Multiply: 4 × 9 = 36', 'Add: 3 + 36 = 39'], answer: '39' },
          { problem: '20 − 12 ÷ 4 × 2', steps: ['Left to right: 12 ÷ 4 = 3', '3 × 2 = 6', '20 − 6 = 14'], answer: '14' },
        ],
        mistakes: [
          'Always multiplying before dividing. They share a level — go left to right.',
          '−3² = −9 (the exponent applies to 3 only), but (−3)² = 9.',
        ],
        practice: [
          { question: '8 + 2 × 5', answer: '18' },
          { question: '(8 + 2) × 5', answer: '50' },
          { question: '18 ÷ 3 × 2', answer: '12' },
          { question: '5 − 3² + 4', answer: '0' },
        ],
      },
    ],
  },
  {
    id: 'ratios-proportions',
    level: 'middle',
    title: 'Ratios, Rates & Proportions',
    icon: 'git-compare-outline',
    description: 'Compare quantities, find unit rates and best buys, and solve proportions and scale problems.',
    lessons: [
      {
        id: 'ratios',
        title: 'Ratios',
        minutes: 7,
        summary: 'A ratio compares two quantities. It can be written a:b, a to b, or a/b, and simplified like a fraction.',
        keyPoints: [
          'Part-to-part compares two groups (boys : girls). Part-to-whole compares a group to the total.',
          'Equivalent ratios: multiply or divide both terms by the same number.',
          'With a ratio a:b and a total T, each “share” is T ÷ (a + b).',
        ],
        examples: [
          {
            problem: 'A class has 12 boys and 18 girls. Find boys:girls and girls:total.',
            steps: ['Boys:girls = 12:18 = 2:3 (divide by 6)', 'Total = 30, so girls:total = 18:30 = 3:5'],
            answer: '2:3 and 3:5',
          },
          {
            problem: 'Red and blue marbles are in the ratio 5:3. There are 40 marbles. How many are red?',
            steps: ['Total parts = 5 + 3 = 8', 'One part = 40 ÷ 8 = 5', 'Red = 5 × 5 = 25'],
            answer: '25',
          },
        ],
        practice: [
          { question: 'Simplify 45:60.', answer: '3:4' },
          { question: 'A recipe uses 2 cups flour to 3 cups milk. How much milk for 8 cups flour?', answer: '12 cups' },
          { question: 'Split $72 in the ratio 1:2:3.', answer: '$12, $24, $36' },
        ],
      },
      {
        id: 'unit-rates',
        title: 'Rates & Unit Rates',
        minutes: 7,
        summary: 'A rate compares quantities with different units. A unit rate is the amount per 1 unit — great for comparing prices.',
        keyPoints: [
          'Unit rate = first quantity ÷ second quantity.',
          'Speed = distance ÷ time.',
          'Best buy: the lowest price per unit.',
        ],
        examples: [
          {
            problem: 'Which is the better buy: $4.80 for 12 oz or $6.50 for 20 oz?',
            steps: ['4.80 ÷ 12 = $0.40 per oz', '6.50 ÷ 20 = $0.325 per oz', '$0.325 < $0.40'],
            answer: '$6.50 for 20 oz',
          },
          { problem: 'A car travels 270 miles in 4.5 hours. Find its speed.', steps: ['270 ÷ 4.5 = 60'], answer: '60 mph' },
        ],
        practice: [
          { question: 'You type 150 words in 3 minutes. Words per minute?', answer: '50' },
          { question: '6 apples cost $3.90. Price per apple?', answer: '$0.65' },
          { question: 'Better buy: 3 for $5.40 or 5 for $8.75?', answer: '5 for $8.75 ($1.75 each vs $1.80)' },
        ],
      },
      {
        id: 'proportions',
        title: 'Proportions & Scale',
        minutes: 9,
        summary: 'A proportion says two ratios are equal. Solve with cross products.',
        keyPoints: [
          'If a/b = c/d, then a × d = b × c (cross products).',
          'Keep units consistent: set up both ratios in the same order.',
          'Scale drawings: actual = drawing length × scale factor.',
        ],
        formulas: [{ label: 'Cross products', value: 'a/b = c/d ⇒ ad = bc' }],
        examples: [
          { problem: 'Solve x/15 = 4/6.', steps: ['Cross-multiply: 6x = 60', 'x = 10'], answer: 'x = 10' },
          { problem: 'A map scale is 1 cm : 25 km. Two towns are 7.4 cm apart. Real distance?', steps: ['7.4 × 25 = 185'], answer: '185 km' },
        ],
        practice: [
          { question: 'Solve 3/7 = 12/x.', answer: 'x = 28' },
          { question: '5 notebooks cost $8.75. How much do 8 cost?', answer: '$14.00' },
          { question: 'Scale 1 in : 4 ft. A wall is 6.5 in on the plan. Actual length?', answer: '26 ft' },
        ],
      },
    ],
  },
  {
    id: 'percents',
    level: 'middle',
    title: 'Percentages',
    icon: 'stats-chart-outline',
    description: 'Percent conversions, percent of a number, percent change, discounts, tax and simple interest.',
    lessons: [
      {
        id: 'percent-basics',
        title: 'Percent, Decimal & Fraction',
        minutes: 7,
        summary: 'Percent means “per hundred”. Every percent is a fraction over 100 and a decimal.',
        keyPoints: [
          'Percent → decimal: divide by 100 (move the point 2 left). 35% = 0.35.',
          'Decimal → percent: multiply by 100. 0.375 = 37.5%.',
          'Fraction → percent: divide, then × 100. 3/8 = 0.375 = 37.5%.',
        ],
        examples: [
          { problem: 'Write 35% as a decimal and a fraction.', steps: ['35 ÷ 100 = 0.35', '35/100 = 7/20'], answer: '0.35 = 7/20' },
          { problem: 'Write 3/8 as a percent.', steps: ['3 ÷ 8 = 0.375', '0.375 × 100 = 37.5'], answer: '37.5%' },
        ],
        practice: [
          { question: 'Write 0.08 as a percent.', answer: '8%' },
          { question: 'Write 125% as a decimal.', answer: '1.25' },
          { question: 'Write 4/5 as a percent.', answer: '80%' },
        ],
      },
      {
        id: 'percent-problems',
        title: 'Percent of a Number',
        minutes: 9,
        summary: 'Every percent problem is part = percent × whole. Decide which of the three is missing.',
        keyPoints: [
          'Find the part: part = percent × whole.',
          'Find the whole: whole = part ÷ percent.',
          'Find the percent: percent = part ÷ whole × 100.',
        ],
        formulas: [{ label: 'Percent equation', value: 'part = percent × whole' }],
        examples: [
          { problem: 'What is 15% of 80?', steps: ['0.15 × 80 = 12'], answer: '12' },
          { problem: '18 is 24% of what number?', steps: ['whole = 18 ÷ 0.24', '= 75'], answer: '75' },
          { problem: 'What percent of 50 is 7?', steps: ['7 ÷ 50 = 0.14', '0.14 × 100 = 14'], answer: '14%' },
        ],
        practice: [
          { question: '30% of 250', answer: '75' },
          { question: '45 is 60% of what number?', answer: '75' },
          { question: '9 out of 36 is what percent?', answer: '25%' },
        ],
      },
      {
        id: 'percent-change',
        title: 'Percent Increase & Decrease',
        minutes: 8,
        summary: 'Percent change compares the change to the ORIGINAL amount.',
        keyPoints: [
          'Percent change = (new − old) ÷ old × 100.',
          'Increase by r%: multiply by (1 + r). Decrease by r%: multiply by (1 − r).',
          'Successive percent changes multiply — they don’t add.',
        ],
        formulas: [{ label: 'Percent change', value: '(new − old) / old × 100%' }],
        examples: [
          { problem: 'A price rises from $40 to $52. Percent increase?', steps: ['Change = 52 − 40 = 12', '12 ÷ 40 = 0.30'], answer: '30% increase' },
          { problem: 'Decrease $80 by 25%.', steps: ['Multiplier = 1 − 0.25 = 0.75', '80 × 0.75 = 60'], answer: '$60' },
        ],
        mistakes: [
          'Dividing by the new value instead of the original.',
          '+20% then −20% is not 0%: 1.2 × 0.8 = 0.96, a 4% decrease.',
        ],
        practice: [
          { question: '200 → 170. Percent change?', answer: '−15% (15% decrease)' },
          { question: 'Increase 60 by 35%.', answer: '81' },
          { question: 'A price rises 20% then falls 20%. Net change?', answer: '−4%' },
        ],
      },
      {
        id: 'discounts-tax-interest',
        title: 'Discounts, Tax, Tips & Simple Interest',
        minutes: 9,
        summary: 'Real-world percent problems use multipliers. Simple interest grows by the same amount each year.',
        keyPoints: [
          'Sale price = price × (1 − discount).',
          'Total with tax or tip = price × (1 + rate).',
          'Simple interest: I = P × r × t (P = principal, r = yearly rate as a decimal, t = years).',
        ],
        formulas: [
          { label: 'Simple interest', value: 'I = P r t' },
          { label: 'Total amount', value: 'A = P + I = P(1 + r t)' },
        ],
        examples: [
          {
            problem: 'A $64 jacket is 30% off, then 8% sales tax is added. Final cost?',
            steps: ['Sale price: 64 × 0.70 = 44.80', 'With tax: 44.80 × 1.08 = 48.384'],
            answer: '$48.38',
          },
          { problem: '$1,500 is invested at 4% simple interest for 3 years. Interest and total?', steps: ['I = 1500 × 0.04 × 3 = 180', 'Total = 1500 + 180 = 1680'], answer: '$180 interest, $1,680 total' },
        ],
        practice: [
          { question: 'A 20% tip on a $45 bill?', answer: '$9' },
          { question: 'Simple interest on $2,000 at 5% for 4 years?', answer: '$400' },
          { question: 'A $120 item is 15% off. Sale price?', answer: '$102' },
        ],
      },
    ],
  },
  {
    id: 'exponents-roots',
    level: 'middle',
    title: 'Exponents, Roots & Scientific Notation',
    icon: 'flash-outline',
    description: 'Laws of exponents, square and cube roots, simplifying radicals, and very large or small numbers.',
    lessons: [
      {
        id: 'exponent-laws',
        title: 'Laws of Exponents',
        minutes: 10,
        summary: 'An exponent counts repeated multiplication. A few rules let you simplify any exponent expression.',
        keyPoints: [
          'aⁿ means a multiplied by itself n times: 2⁴ = 2 × 2 × 2 × 2 = 16.',
          'Same base when multiplying → add exponents. Dividing → subtract exponents.',
          'Power of a power → multiply exponents.',
          'Any nonzero number to the 0 power is 1. A negative exponent means reciprocal.',
        ],
        formulas: [
          { label: 'Product', value: 'a^m × a^n = a^(m+n)' },
          { label: 'Quotient', value: 'a^m ÷ a^n = a^(m−n)' },
          { label: 'Power', value: '(a^m)^n = a^(mn);  (ab)^n = a^n b^n' },
          { label: 'Zero & negative', value: 'a⁰ = 1;  a^(−n) = 1/a^n' },
        ],
        examples: [
          { problem: 'Simplify (2x³)² · x⁴', steps: ['(2x³)² = 2² · x⁶ = 4x⁶', '4x⁶ · x⁴ = 4x¹⁰'], answer: '4x¹⁰' },
          { problem: 'Evaluate 5^(−2)', steps: ['5^(−2) = 1/5²', '= 1/25'], answer: '1/25' },
        ],
        mistakes: ['Multiplying exponents when you should add: x² · x³ = x⁵, not x⁶.'],
        practice: [
          { question: '3⁴', answer: '81' },
          { question: 'x⁷ ÷ x³', answer: 'x⁴' },
          { question: '(y²)⁵', answer: 'y¹⁰' },
          { question: '2^(−3)', answer: '1/8' },
        ],
      },
      {
        id: 'square-cube-roots',
        title: 'Square & Cube Roots',
        minutes: 9,
        summary: 'A square root undoes squaring; a cube root undoes cubing. Simplify roots by pulling out perfect-square factors.',
        keyPoints: [
          '√49 = 7 because 7² = 49. ∛64 = 4 because 4³ = 64.',
          'Perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144.',
          'Simplify: √(ab) = √a · √b. Pull out the largest perfect-square factor.',
          'Cube roots of negatives are negative: ∛(−8) = −2.',
        ],
        formulas: [{ label: 'Product rule', value: '√(ab) = √a × √b' }],
        examples: [
          { problem: 'Simplify √72', steps: ['72 = 36 × 2', '√72 = √36 × √2', '= 6√2'], answer: '6√2' },
          { problem: 'Estimate √50', steps: ['49 < 50 < 64, so 7 < √50 < 8', '50 is very close to 49'], answer: '≈ 7.07' },
        ],
        practice: [
          { question: '√144', answer: '12' },
          { question: 'Simplify √45', answer: '3√5' },
          { question: '√30 lies between which two whole numbers?', answer: '5 and 6' },
          { question: '∛125', answer: '5' },
        ],
      },
      {
        id: 'scientific-notation',
        title: 'Scientific Notation',
        minutes: 8,
        summary: 'Scientific notation writes a number as a × 10ⁿ where 1 ≤ a < 10. It makes very large and very small numbers easy to handle.',
        keyPoints: [
          'Big numbers have positive exponents; small numbers (less than 1) have negative exponents.',
          'Multiply: multiply the coefficients and add the exponents.',
          'Divide: divide the coefficients and subtract the exponents.',
          'Adjust so the coefficient is between 1 and 10.',
        ],
        formulas: [{ label: 'Form', value: 'a × 10ⁿ, 1 ≤ a < 10' }],
        examples: [
          { problem: 'Write 45,000,000 and 0.00036 in scientific notation.', steps: ['45,000,000: move the point 7 left → 4.5 × 10⁷', '0.00036: move the point 4 right → 3.6 × 10⁻⁴'], answer: '4.5 × 10⁷ and 3.6 × 10⁻⁴' },
          { problem: '(3 × 10⁵)(4 × 10³)', steps: ['3 × 4 = 12', '10⁵ × 10³ = 10⁸', '12 × 10⁸ = 1.2 × 10⁹'], answer: '1.2 × 10⁹' },
        ],
        practice: [
          { question: 'Write 602,000 in scientific notation.', answer: '6.02 × 10⁵' },
          { question: 'Write 7.1 × 10⁻³ in standard form.', answer: '0.0071' },
          { question: '(8 × 10⁶) ÷ (2 × 10²)', answer: '4 × 10⁴' },
        ],
      },
    ],
  },
  {
    id: 'pre-algebra',
    level: 'middle',
    title: 'Pre-Algebra: Expressions & Equations',
    icon: 'code-working-outline',
    description: 'Variables, simplifying expressions, solving equations and inequalities.',
    lessons: [
      {
        id: 'expressions',
        title: 'Variables & Expressions',
        minutes: 8,
        summary: 'A variable stands for an unknown number. An expression combines numbers, variables and operations — evaluate it by substituting values.',
        keyPoints: [
          'In 3x² − 2x + 5: terms are 3x², −2x, 5; coefficients are 3 and −2; the constant is 5.',
          'Substitute using parentheses, especially for negatives: x = −2 → 3(−2)².',
          'Translate words: “sum” +, “difference” −, “product” ×, “quotient” ÷, “less than” reverses order.',
        ],
        examples: [
          { problem: 'Evaluate 3x² − 2x + 5 when x = −2.', steps: ['3(−2)² − 2(−2) + 5', '= 3(4) + 4 + 5', '= 12 + 4 + 5'], answer: '21' },
          { problem: 'Write “7 less than twice a number n”.', steps: ['Twice a number: 2n', '7 less than it: subtract 7 from 2n'], answer: '2n − 7' },
        ],
        practice: [
          { question: 'Evaluate 5a + 2b when a = 3, b = −4.', answer: '7' },
          { question: 'Write “the quotient of a number and 4, increased by 9”.', answer: 'n/4 + 9' },
          { question: 'Evaluate (x + y)² when x = 2, y = −5.', answer: '9' },
        ],
      },
      {
        id: 'simplifying-expressions',
        title: 'Simplifying Expressions',
        minutes: 8,
        summary: 'Simplify by distributing and then combining like terms (same variable, same exponent).',
        keyPoints: [
          'Like terms: 3x and −5x are like; 3x and 3x² are not.',
          'Distributive property: a(b + c) = ab + ac.',
          'A minus sign before parentheses changes every sign inside: −(x − 5) = −x + 5.',
        ],
        examples: [
          {
            problem: 'Simplify 4(2x − 3) − (x − 5)',
            steps: ['Distribute: 8x − 12 − x + 5', 'Combine x terms: 8x − x = 7x', 'Combine constants: −12 + 5 = −7'],
            answer: '7x − 7',
          },
        ],
        mistakes: ['Only distributing to the first term: −2(x + 4) is −2x − 8, not −2x + 4.'],
        practice: [
          { question: '3y + 5 − y + 2', answer: '2y + 7' },
          { question: '−2(3m + 4)', answer: '−6m − 8' },
          { question: '5(x + 2) + 3(x − 1)', answer: '8x + 7' },
        ],
      },
      {
        id: 'solving-equations',
        title: 'One- & Two-Step Equations',
        minutes: 9,
        summary: 'An equation is a balance. Undo operations in reverse order, doing the same thing to both sides.',
        keyPoints: [
          'Use inverse operations: + ↔ −, × ↔ ÷.',
          'Two-step equations: undo addition/subtraction first, then multiplication/division.',
          'Check by substituting your answer into the original equation.',
        ],
        examples: [
          { problem: '3x − 7 = 14', steps: ['Add 7: 3x = 21', 'Divide by 3: x = 7', 'Check: 3(7) − 7 = 14 ✓'], answer: 'x = 7' },
          { problem: 'x/4 + 6 = 10', steps: ['Subtract 6: x/4 = 4', 'Multiply by 4: x = 16'], answer: 'x = 16' },
        ],
        practice: [
          { question: 'x + 9 = 4', answer: 'x = −5' },
          { question: '5x = −35', answer: 'x = −7' },
          { question: '2x + 3 = 17', answer: 'x = 7' },
          { question: '(x − 4)/3 = 5', answer: 'x = 19' },
        ],
      },
      {
        id: 'variables-both-sides',
        title: 'Variables on Both Sides',
        minutes: 9,
        summary: 'Simplify each side, collect variable terms on one side and constants on the other, then solve.',
        keyPoints: [
          'Distribute and combine like terms on each side first.',
          'Move the smaller variable term to avoid negative coefficients.',
          'If variables cancel: a true statement (5 = 5) means infinitely many solutions; a false one (0 = 3) means no solution.',
        ],
        examples: [
          {
            problem: '5(x − 2) = 3x + 4',
            steps: ['Distribute: 5x − 10 = 3x + 4', 'Subtract 3x: 2x − 10 = 4', 'Add 10: 2x = 14', 'Divide: x = 7'],
            answer: 'x = 7',
          },
        ],
        practice: [
          { question: '7x + 2 = 4x + 17', answer: 'x = 5' },
          { question: '4(x − 1) = 2x + 10', answer: 'x = 7' },
          { question: '2(x + 3) = 2x + 6', answer: 'Infinitely many solutions' },
        ],
      },
      {
        id: 'inequalities',
        title: 'Inequalities',
        minutes: 8,
        summary: 'Solve inequalities like equations — but flip the inequality sign whenever you multiply or divide by a negative.',
        keyPoints: [
          'Symbols: < less than, > greater than, ≤ at most, ≥ at least.',
          'Multiplying or dividing both sides by a negative reverses the sign.',
          'Graph: open circle for < or >, closed circle for ≤ or ≥.',
        ],
        examples: [
          { problem: '−3x + 4 > 19', steps: ['Subtract 4: −3x > 15', 'Divide by −3 and flip: x < −5'], answer: 'x < −5' },
        ],
        mistakes: ['Forgetting to flip the sign when dividing by a negative.'],
        practice: [
          { question: '2x − 5 ≤ 9', answer: 'x ≤ 7' },
          { question: '−4x ≥ 20', answer: 'x ≤ −5' },
          { question: 'x/3 + 1 < 5', answer: 'x < 12' },
        ],
      },
    ],
  },
  {
    id: 'geometry-basics',
    level: 'middle',
    title: 'Geometry Basics',
    icon: 'shapes-outline',
    description: 'Angles, triangles and polygons, area, circles, volume and surface area.',
    lessons: [
      {
        id: 'angles',
        title: 'Angles & Angle Relationships',
        minutes: 8,
        summary: 'Angles are measured in degrees. Special pairs of angles add to 90° or 180°, and vertical angles are equal.',
        keyPoints: [
          'Acute < 90°, right = 90°, obtuse between 90° and 180°, straight = 180°.',
          'Complementary angles add to 90°; supplementary angles add to 180°.',
          'Vertical angles (opposite at an intersection) are equal.',
          'Angles around a point add to 360°.',
        ],
        examples: [
          { problem: 'Find the supplement of 47°.', steps: ['180° − 47°'], answer: '133°' },
          {
            problem: 'Two complementary angles measure 2x and 3x + 15. Find them.',
            steps: ['2x + 3x + 15 = 90', '5x = 75 → x = 15', '2(15) = 30°, 3(15) + 15 = 60°'],
            answer: '30° and 60°',
          },
        ],
        practice: [
          { question: 'Complement of 38°?', answer: '52°' },
          { question: 'An angle is 115°. Its vertical angle?', answer: '115°' },
          { question: 'Angles x and 3x form a straight line. Find x.', answer: '45°' },
        ],
      },
      {
        id: 'triangles-polygons',
        title: 'Triangles & Polygons',
        minutes: 9,
        summary: 'A triangle’s angles add to 180°. A polygon with n sides has interior angles adding to (n − 2) × 180°.',
        keyPoints: [
          'Triangle angle sum: 180°.',
          'Isosceles triangle: two equal sides and two equal base angles. Equilateral: all angles 60°.',
          'Interior angle sum of an n-gon: (n − 2) × 180°.',
          'Each angle of a regular n-gon: (n − 2) × 180° ÷ n. Exterior angles always sum to 360°.',
        ],
        formulas: [{ label: 'Polygon sum', value: 'S = (n − 2) × 180°' }],
        examples: [
          { problem: 'A triangle has angles 50° and 65°. Find the third.', steps: ['180 − 50 − 65 = 65', 'Two equal angles → isosceles'], answer: '65°' },
          { problem: 'Interior angle sum and each angle of a regular hexagon.', steps: ['(6 − 2) × 180 = 720°', '720 ÷ 6 = 120°'], answer: '720°, 120° each' },
        ],
        practice: [
          { question: 'Interior angle sum of a pentagon?', answer: '540°' },
          { question: 'Each angle of a regular octagon?', answer: '135°' },
          { question: 'A triangle has angles x, 2x, 3x. Find them.', answer: '30°, 60°, 90°' },
        ],
      },
      {
        id: 'area-2d',
        title: 'Area of 2D Shapes',
        minutes: 9,
        summary: 'Most area formulas come from the rectangle: base × height, adjusted for the shape.',
        keyPoints: [
          'Height is always perpendicular to the base.',
          'A triangle is half a parallelogram.',
          'A trapezoid’s area uses the average of its two parallel bases.',
        ],
        formulas: [
          { label: 'Parallelogram', value: 'A = b h' },
          { label: 'Triangle', value: 'A = ½ b h' },
          { label: 'Trapezoid', value: 'A = ½ (a + b) h' },
        ],
        examples: [
          { problem: 'Trapezoid with bases 8 and 12, height 5.', steps: ['½ × (8 + 12) × 5', '= ½ × 20 × 5'], answer: '50 square units' },
          { problem: 'Triangle with base 10 and height 7.', steps: ['½ × 10 × 7'], answer: '35 square units' },
        ],
        mistakes: ['Using a slanted side instead of the perpendicular height.'],
        practice: [
          { question: 'Parallelogram: b = 9, h = 4', answer: '36' },
          { question: 'Triangle: b = 6, h = 11', answer: '33' },
          { question: 'Trapezoid: bases 3 and 7, h = 6', answer: '30' },
        ],
      },
      {
        id: 'circles-basic',
        title: 'Circles',
        minutes: 8,
        summary: 'Circumference is the distance around a circle; area is the space inside. Both use π ≈ 3.14159.',
        keyPoints: [
          'Diameter = 2 × radius.',
          'π is the ratio of circumference to diameter for every circle.',
          'Leave answers “in terms of π” for exact values, or multiply out for approximations.',
        ],
        formulas: [
          { label: 'Circumference', value: 'C = 2πr = πd' },
          { label: 'Area', value: 'A = πr²' },
        ],
        examples: [
          { problem: 'A circle has radius 6 cm. Find C and A.', steps: ['C = 2π(6) = 12π ≈ 37.70 cm', 'A = π(6²) = 36π ≈ 113.10 cm²'], answer: '12π cm and 36π cm²' },
          { problem: 'A circle has circumference 31.4 m. Find its radius.', steps: ['d = C ÷ π ≈ 31.4 ÷ 3.14 = 10', 'r = d ÷ 2'], answer: '≈ 5 m' },
        ],
        mistakes: ['Using the diameter in A = πr². Halve it first.'],
        practice: [
          { question: 'Area of a circle with diameter 10 m?', answer: '25π ≈ 78.54 m²' },
          { question: 'Circumference with radius 3?', answer: '6π ≈ 18.85' },
          { question: 'A circle has area 49π. Find r.', answer: '7' },
        ],
      },
      {
        id: 'volume-surface-area',
        title: 'Volume & Surface Area',
        minutes: 10,
        summary: 'Volume measures space inside a 3D shape (cubic units). Surface area is the total area of all faces (square units).',
        keyPoints: [
          'Prisms and cylinders: V = base area × height.',
          'Pyramids and cones hold exactly ⅓ of the matching prism or cylinder.',
          'Surface area: add the area of every face (draw a net to help).',
        ],
        formulas: [
          { label: 'Rectangular prism', value: 'V = lwh,  SA = 2(lw + lh + wh)' },
          { label: 'Cylinder', value: 'V = πr²h,  SA = 2πr² + 2πrh' },
          { label: 'Cone / pyramid', value: 'V = ⅓πr²h,  V = ⅓Bh' },
          { label: 'Sphere', value: 'V = (4/3)πr³,  SA = 4πr²' },
        ],
        examples: [
          { problem: 'A box is 4 × 3 × 5. Find V and SA.', steps: ['V = 4 × 3 × 5 = 60', 'SA = 2(12 + 20 + 15) = 2(47) = 94'], answer: 'V = 60, SA = 94' },
          { problem: 'Cylinder with r = 3, h = 10. Find V.', steps: ['V = π(3²)(10)', '= 90π'], answer: '90π ≈ 282.74' },
        ],
        practice: [
          { question: 'A cube has side 4. Volume and surface area?', answer: 'V = 64, SA = 96' },
          { question: 'Cone with r = 3, h = 4. Volume?', answer: '12π ≈ 37.70' },
          { question: 'Sphere with r = 3. Volume?', answer: '36π ≈ 113.10' },
        ],
      },
    ],
  },
  {
    id: 'data-probability',
    level: 'middle',
    title: 'Data & Probability',
    icon: 'bar-chart-outline',
    description: 'Mean, median and mode, box plots and spread, and the basics of probability.',
    lessons: [
      {
        id: 'measures-center',
        title: 'Mean, Median, Mode & Range',
        minutes: 8,
        summary: 'Measures of center describe a typical value; the range describes how spread out the data is.',
        keyPoints: [
          'Mean: sum ÷ count. Sensitive to outliers.',
          'Median: the middle value when sorted (average the two middle values if the count is even).',
          'Mode: the most frequent value (there can be none or several).',
          'Range: maximum − minimum.',
        ],
        examples: [
          {
            problem: 'Data: 4, 8, 6, 5, 3, 8, 9. Find mean, median, mode, range.',
            steps: ['Sorted: 3, 4, 5, 6, 8, 8, 9', 'Mean = 43 ÷ 7 ≈ 6.14', 'Median = 6 (4th of 7)', 'Mode = 8; Range = 9 − 3 = 6'],
            answer: 'Mean ≈ 6.14, median 6, mode 8, range 6',
          },
        ],
        practice: [
          { question: 'Mean of 10, 12, 15, 15, 18', answer: '14' },
          { question: 'Median of 2, 7, 9, 11', answer: '8' },
          { question: 'Scores 80, 85, 90. What 4th score gives a mean of 88?', answer: '97' },
        ],
      },
      {
        id: 'displaying-data',
        title: 'Box Plots & Spread',
        minutes: 9,
        summary: 'A box plot shows the five-number summary. The interquartile range (IQR) measures the spread of the middle 50%.',
        keyPoints: [
          'Five-number summary: minimum, Q1, median, Q3, maximum.',
          'Q1 is the median of the lower half; Q3 is the median of the upper half.',
          'IQR = Q3 − Q1.',
          'Outliers: below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR.',
          'Use the median and IQR when data are skewed or have outliers.',
        ],
        examples: [
          {
            problem: 'Five-number summary of 2, 4, 5, 7, 8, 10, 12, 15',
            steps: ['Min = 2, Max = 15', 'Median = (7 + 8) ÷ 2 = 7.5', 'Lower half 2, 4, 5, 7 → Q1 = 4.5', 'Upper half 8, 10, 12, 15 → Q3 = 11', 'IQR = 11 − 4.5 = 6.5'],
            answer: '2, 4.5, 7.5, 11, 15 (IQR 6.5)',
          },
        ],
        practice: [
          { question: 'Q1 = 12, Q3 = 20. Find the IQR.', answer: '8' },
          { question: 'Using Q1 = 12, Q3 = 20, what is the upper outlier fence?', answer: '20 + 1.5 × 8 = 32' },
          { question: 'Is 35 an outlier in that data set?', answer: 'Yes, 35 > 32' },
        ],
      },
      {
        id: 'basic-probability',
        title: 'Basic Probability',
        minutes: 9,
        summary: 'Probability measures how likely an event is, from 0 (impossible) to 1 (certain).',
        keyPoints: [
          'P(event) = favorable outcomes ÷ total equally likely outcomes.',
          'Complement: P(not A) = 1 − P(A).',
          'Independent events: P(A and B) = P(A) × P(B).',
          'List the sample space (all outcomes) with a table or tree diagram.',
        ],
        formulas: [
          { label: 'Probability', value: 'P(A) = favorable / total' },
          { label: 'Complement', value: 'P(not A) = 1 − P(A)' },
        ],
        examples: [
          { problem: 'P(rolling a number greater than 4 on a die)', steps: ['Favorable: 5, 6 → 2 outcomes', 'Total: 6', '2/6 = 1/3'], answer: '1/3' },
          { problem: 'P(two heads when flipping two coins)', steps: ['Independent: ½ × ½'], answer: '1/4' },
        ],
        practice: [
          { question: 'A bag has 3 red, 5 blue, 2 green. P(blue)?', answer: '1/2' },
          { question: 'Same bag: P(not green)?', answer: '4/5' },
          { question: 'Roll a die twice. P(two 6s)?', answer: '1/36' },
        ],
      },
    ],
  },
];
