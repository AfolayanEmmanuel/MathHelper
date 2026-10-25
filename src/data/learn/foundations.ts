import type { Course } from './types';

export const FOUNDATIONS: Course[] = [
  {
    id: 'number-sense',
    level: 'foundations',
    title: 'Number Sense & Place Value',
    icon: 'grid-outline',
    description: 'Understand how our base-10 number system works, compare numbers, and round with confidence.',
    lessons: [
      {
        id: 'place-value',
        title: 'Place Value',
        minutes: 8,
        summary:
          'Each digit’s value depends on its position. Our number system is base 10: every place is worth 10 times the place to its right.',
        keyPoints: [
          'Places from the right: ones, tens, hundreds, thousands, ten-thousands, hundred-thousands, millions.',
          'A digit’s value = digit × its place value. In 4,582 the 5 is worth 500.',
          'Expanded form writes a number as the sum of each digit’s value.',
          'Zero is a placeholder: 405 has 0 tens.',
        ],
        formulas: [{ label: 'Places', value: '… 1,000 | 100 | 10 | 1' }],
        examples: [
          {
            problem: 'What is the value of the 7 in 372,915?',
            steps: [
              'Label places from the right: 5 ones, 1 ten, 9 hundreds, 2 thousands, 7 ten-thousands, 3 hundred-thousands.',
              'The 7 is in the ten-thousands place.',
              'Value = 7 × 10,000 = 70,000',
            ],
            answer: '70,000',
          },
          {
            problem: 'Write 6,048 in expanded form.',
            steps: ['6 thousands = 6,000', '0 hundreds = 0 (skip it)', '4 tens = 40', '8 ones = 8'],
            answer: '6,000 + 40 + 8',
          },
        ],
        mistakes: ['Forgetting zero placeholders, e.g. writing “five thousand twenty” as 520 instead of 5,020.'],
        practice: [
          { question: 'What digit is in the hundreds place of 58,316?', answer: '3' },
          { question: 'Write 90,000 + 400 + 7 in standard form.', answer: '90,407' },
          { question: 'How many tens are in 1,000?', answer: '100', hint: '1,000 ÷ 10' },
        ],
      },
      {
        id: 'comparing-ordering',
        title: 'Comparing & Ordering Numbers',
        minutes: 7,
        summary: 'Compare numbers by counting digits first, then comparing place by place from the left.',
        keyPoints: [
          'A whole number with more digits is greater (12,000 > 9,999).',
          'With the same number of digits, compare from the leftmost place until the digits differ.',
          'Symbols: > greater than, < less than, = equal to. The open side faces the bigger number.',
        ],
        examples: [
          {
            problem: 'Order from least to greatest: 4,503; 4,350; 4,530; 4,305',
            steps: [
              'All have 4 thousands, so compare hundreds: 5, 3, 5, 3.',
              'The two with 3 hundreds are smaller: compare their tens — 4,305 (0 tens) < 4,350 (5 tens).',
              'The two with 5 hundreds: 4,503 (0 tens) < 4,530 (3 tens).',
            ],
            answer: '4,305 < 4,350 < 4,503 < 4,530',
          },
        ],
        practice: [
          { question: 'Fill in < or >: 7,089 ___ 7,098', answer: '<' },
          { question: 'Order from greatest to least: 802, 820, 280', answer: '820, 802, 280' },
          { question: 'Which is greater: 12,000 or 9,999?', answer: '12,000 (it has more digits)' },
        ],
      },
      {
        id: 'rounding-estimation',
        title: 'Rounding & Estimation',
        minutes: 8,
        summary: 'Rounding replaces a number with a nearby “friendlier” one. Estimation uses rounding to check answers quickly.',
        keyPoints: [
          'Find the digit in the place you are rounding to, then look at the digit to its right.',
          'If that digit is 5 or more, round up. If it is 4 or less, keep the digit the same.',
          'All digits to the right of the rounding place become zeros.',
          'Estimate by rounding first, then calculating.',
        ],
        examples: [
          {
            problem: 'Round 3,846 to the nearest hundred.',
            steps: ['The hundreds digit is 8.', 'Look right: the tens digit is 4, which is less than 5.', 'Keep 8 and replace the rest with zeros.'],
            answer: '3,800',
          },
          {
            problem: 'Estimate 487 + 312.',
            steps: ['Round to the nearest hundred: 487 → 500, 312 → 300.', '500 + 300 = 800', 'The exact answer is 799, very close.'],
            answer: '≈ 800',
          },
        ],
        mistakes: ['Rounding digit by digit from the right (e.g. 3,846 → 3,850 → 3,900). Only look at the one digit to the right.'],
        practice: [
          { question: 'Round 6,750 to the nearest thousand.', answer: '7,000' },
          { question: 'Round 2,349 to the nearest ten.', answer: '2,350' },
          { question: 'Estimate 61 × 29.', answer: '60 × 30 = 1,800' },
        ],
      },
    ],
  },
  {
    id: 'add-subtract',
    level: 'foundations',
    title: 'Addition & Subtraction',
    icon: 'add-circle-outline',
    description: 'Add and subtract multi-digit numbers with regrouping, and solve word problems.',
    lessons: [
      {
        id: 'addition-regrouping',
        title: 'Addition with Regrouping',
        minutes: 8,
        summary: 'Line numbers up by place value and add from right to left, carrying whenever a column adds to 10 or more.',
        keyPoints: [
          'Always line up ones under ones, tens under tens, and so on.',
          'If a column’s sum is 10 or more, write the ones digit and carry the tens digit to the next column.',
          'Order doesn’t matter: a + b = b + a (commutative property).',
          'Grouping doesn’t matter: (a + b) + c = a + (b + c) (associative property).',
        ],
        examples: [
          {
            problem: '3,476 + 2,859',
            steps: [
              'Ones: 6 + 9 = 15 → write 5, carry 1',
              'Tens: 7 + 5 + 1 = 13 → write 3, carry 1',
              'Hundreds: 4 + 8 + 1 = 13 → write 3, carry 1',
              'Thousands: 3 + 2 + 1 = 6',
            ],
            answer: '6,335',
          },
        ],
        mistakes: ['Forgetting to add the carried digit in the next column.'],
        practice: [
          { question: '568 + 274', answer: '842' },
          { question: '4,095 + 3,906', answer: '8,001' },
          { question: '27 + 48 + 73', answer: '148', hint: 'Add 27 + 73 first to make 100.' },
        ],
      },
      {
        id: 'subtraction-borrowing',
        title: 'Subtraction with Borrowing',
        minutes: 9,
        summary: 'When the top digit is smaller than the bottom digit, borrow 1 from the next place to the left (worth 10 in this place).',
        keyPoints: [
          'Subtract column by column from right to left.',
          'Borrowing turns 1 of the next place into 10 of the current place.',
          'Across zeros, keep borrowing left until you reach a non-zero digit.',
          'Check by adding: difference + number subtracted = original number.',
        ],
        examples: [
          {
            problem: '5,003 − 1,478',
            steps: [
              'Ones: 3 − 8 is not possible, and tens and hundreds are 0, so borrow from the thousands.',
              '5,003 becomes 4 thousands, 9 hundreds, 9 tens, 13 ones.',
              'Ones: 13 − 8 = 5; tens: 9 − 7 = 2; hundreds: 9 − 4 = 5; thousands: 4 − 1 = 3',
              'Check: 3,525 + 1,478 = 5,003 ✓',
            ],
            answer: '3,525',
          },
        ],
        mistakes: ['Subtracting the smaller digit from the larger regardless of position, e.g. 52 − 38 → 26. The correct answer is 14.'],
        practice: [
          { question: '912 − 357', answer: '555' },
          { question: '7,000 − 2,846', answer: '4,154' },
          { question: '600 − 238', answer: '362' },
        ],
      },
      {
        id: 'word-problems-mental-math',
        title: 'Word Problems & Mental Math',
        minutes: 8,
        summary: 'Translate words into operations, and use friendly numbers to compute quickly in your head.',
        keyPoints: [
          '“Total”, “altogether”, “in all”, “more” (when combining) → add.',
          '“Difference”, “how many more”, “left”, “fewer” → subtract.',
          'Compensation: 49 + 27 = 50 + 27 − 1 = 76.',
          'Make tens: 8 + 7 = 8 + 2 + 5 = 15.',
        ],
        examples: [
          {
            problem: 'A library had 1,250 books. It received 375 more, then lent out 480. How many books are on the shelves?',
            steps: ['Received more → add: 1,250 + 375 = 1,625', 'Lent out → subtract: 1,625 − 480 = 1,145'],
            answer: '1,145 books',
          },
        ],
        practice: [
          { question: 'Compute 198 + 245 mentally.', answer: '443', hint: '200 + 245 − 2' },
          { question: 'Sam has 63 stickers. Ana has 28 more than Sam. How many do they have together?', answer: 'Ana has 91, so together 154' },
          { question: 'A bus had 52 people. 17 got off and 9 got on. How many are on the bus now?', answer: '44' },
        ],
      },
    ],
  },
  {
    id: 'multiply-divide',
    level: 'foundations',
    title: 'Multiplication & Division',
    icon: 'close-circle-outline',
    description: 'Master times tables, multi-digit multiplication, long division, factors and primes.',
    lessons: [
      {
        id: 'multiplication-properties',
        title: 'Times Tables & Properties',
        minutes: 8,
        summary: 'Multiplication is repeated addition. Its properties let you break hard problems into easy ones.',
        keyPoints: [
          'Commutative: a × b = b × a.',
          'Associative: (a × b) × c = a × (b × c).',
          'Distributive: a × (b + c) = a × b + a × c.',
          'Identity: a × 1 = a. Zero: a × 0 = 0.',
        ],
        examples: [
          {
            problem: 'Use the distributive property to find 7 × 16.',
            steps: ['Split 16 = 10 + 6', '7 × 10 = 70', '7 × 6 = 42', '70 + 42 = 112'],
            answer: '112',
          },
        ],
        practice: [
          { question: '8 × 25', answer: '200' },
          { question: '9 × 13', answer: '117' },
          { question: 'Use the distributive property: 4 × 23', answer: '4 × 20 + 4 × 3 = 80 + 12 = 92' },
        ],
      },
      {
        id: 'multi-digit-multiplication',
        title: 'Multi-Digit Multiplication',
        minutes: 10,
        summary: 'Multiply by each digit of the bottom number separately (partial products), shifting by place value, then add.',
        keyPoints: [
          'Multiply by the ones digit first, then the tens digit (add a 0 placeholder), and so on.',
          'Add all the partial products together.',
          'Estimate first to check if your answer is reasonable.',
        ],
        examples: [
          {
            problem: '347 × 26',
            steps: ['347 × 6 = 2,082', '347 × 20 = 6,940', '2,082 + 6,940 = 9,022', 'Estimate: 350 × 25 ≈ 8,750 ✓ close'],
            answer: '9,022',
          },
        ],
        mistakes: ['Forgetting the 0 placeholder when multiplying by the tens digit.'],
        practice: [
          { question: '58 × 34', answer: '1,972' },
          { question: '125 × 48', answer: '6,000' },
          { question: '204 × 15', answer: '3,060' },
        ],
      },
      {
        id: 'long-division',
        title: 'Long Division',
        minutes: 10,
        summary: 'Long division repeats four steps — Divide, Multiply, Subtract, Bring down — until no digits remain.',
        keyPoints: [
          'Divide → Multiply → Subtract → Bring down. Repeat.',
          'The remainder must always be smaller than the divisor.',
          'Check: quotient × divisor + remainder = dividend.',
        ],
        formulas: [{ label: 'Check', value: 'dividend = divisor × quotient + remainder' }],
        examples: [
          {
            problem: '1,573 ÷ 6',
            steps: [
              '15 ÷ 6 = 2 → 2 × 6 = 12 → 15 − 12 = 3',
              'Bring down 7 → 37 ÷ 6 = 6 → 36 → remainder 1',
              'Bring down 3 → 13 ÷ 6 = 2 → 12 → remainder 1',
              'Check: 262 × 6 + 1 = 1,573 ✓',
            ],
            answer: '262 R1',
          },
        ],
        practice: [
          { question: '846 ÷ 3', answer: '282' },
          { question: '1,000 ÷ 7', answer: '142 R6' },
          { question: '2,436 ÷ 12', answer: '203' },
        ],
      },
      {
        id: 'factors-multiples-primes',
        title: 'Factors, Multiples & Primes',
        minutes: 10,
        summary: 'Factors divide a number evenly; multiples are what you get when you multiply it. Primes have exactly two factors.',
        keyPoints: [
          'A prime number has exactly two factors: 1 and itself (2, 3, 5, 7, 11, 13, …). 1 is not prime.',
          'Every whole number above 1 has a unique prime factorization.',
          'GCF (greatest common factor): product of shared primes with the smallest powers.',
          'LCM (least common multiple): product of all primes with the largest powers.',
          'Divisibility: 2 (even), 3 (digit sum ÷ 3), 5 (ends 0 or 5), 9 (digit sum ÷ 9), 10 (ends 0).',
        ],
        formulas: [{ label: 'Shortcut', value: 'GCF(a, b) × LCM(a, b) = a × b' }],
        examples: [
          {
            problem: 'Find the GCF and LCM of 24 and 36.',
            steps: ['24 = 2³ × 3', '36 = 2² × 3²', 'GCF: smallest powers → 2² × 3 = 12', 'LCM: largest powers → 2³ × 3² = 72'],
            answer: 'GCF = 12, LCM = 72',
          },
        ],
        practice: [
          { question: 'Prime factorization of 60', answer: '2² × 3 × 5' },
          { question: 'Is 51 prime?', answer: 'No — 51 = 3 × 17', hint: 'Digit sum 5 + 1 = 6' },
          { question: 'LCM of 4 and 6', answer: '12' },
          { question: 'GCF of 18 and 45', answer: '9' },
        ],
      },
    ],
  },
  {
    id: 'fractions',
    level: 'foundations',
    title: 'Fractions',
    icon: 'pie-chart-outline',
    description: 'Equivalent fractions, all four operations, and mixed numbers.',
    lessons: [
      {
        id: 'fraction-basics',
        title: 'Understanding & Equivalent Fractions',
        minutes: 9,
        summary: 'A fraction a/b means a parts out of b equal parts. Multiplying or dividing top and bottom by the same number gives an equivalent fraction.',
        keyPoints: [
          'Numerator (top) counts parts; denominator (bottom) is how many equal parts make a whole.',
          'Equivalent: a/b = (a × k)/(b × k).',
          'Simplest form: divide top and bottom by their GCF.',
          'Compare fractions with a common denominator or by cross-multiplying.',
        ],
        examples: [
          { problem: 'Simplify 18/24.', steps: ['GCF of 18 and 24 is 6', '18 ÷ 6 = 3, 24 ÷ 6 = 4'], answer: '3/4' },
          {
            problem: 'Which is larger: 2/3 or 3/5?',
            steps: ['Cross-multiply: 2 × 5 = 10 and 3 × 3 = 9', '10 > 9, so the first fraction is larger'],
            answer: '2/3',
          },
        ],
        practice: [
          { question: 'Simplify 15/35.', answer: '3/7' },
          { question: '3/8 = ?/40', answer: '15' },
          { question: 'Which is larger: 5/6 or 7/9?', answer: '5/6 (45/54 vs 42/54)' },
        ],
      },
      {
        id: 'adding-subtracting-fractions',
        title: 'Adding & Subtracting Fractions',
        minutes: 10,
        summary: 'Fractions can only be added or subtracted when they have the same denominator, so rewrite them over a common denominator first.',
        keyPoints: [
          'Find the least common denominator (LCD) — the LCM of the denominators.',
          'Rewrite each fraction with the LCD, then add or subtract the numerators.',
          'Keep the denominator; simplify the result.',
        ],
        formulas: [{ label: 'Rule', value: 'a/c + b/c = (a + b)/c' }],
        examples: [
          {
            problem: '3/4 + 5/6',
            steps: ['LCD of 4 and 6 is 12', '3/4 = 9/12, 5/6 = 10/12', '9/12 + 10/12 = 19/12', '19/12 = 1 7/12'],
            answer: '19/12 = 1 7/12',
          },
          { problem: '7/8 − 1/3', steps: ['LCD = 24', '7/8 = 21/24, 1/3 = 8/24', '21/24 − 8/24 = 13/24'], answer: '13/24' },
        ],
        mistakes: ['Adding denominators: 1/2 + 1/3 is NOT 2/5. It is 3/6 + 2/6 = 5/6.'],
        practice: [
          { question: '1/2 + 1/3', answer: '5/6' },
          { question: '5/6 − 1/4', answer: '7/12' },
          { question: '2/5 + 3/10', answer: '7/10' },
        ],
      },
      {
        id: 'multiplying-dividing-fractions',
        title: 'Multiplying & Dividing Fractions',
        minutes: 9,
        summary: 'Multiply straight across. To divide, multiply by the reciprocal of the second fraction.',
        keyPoints: [
          'Multiply: (a/b) × (c/d) = (a × c)/(b × d).',
          'Cross-cancel common factors before multiplying to keep numbers small.',
          'Divide: keep the first, change ÷ to ×, flip the second (“keep, change, flip”).',
          'A whole number n can be written as n/1.',
        ],
        examples: [
          { problem: '4/9 × 3/8', steps: ['Cancel 4 with 8 → 1 and 2', 'Cancel 3 with 9 → 1 and 3', '1/3 × 1/2 = 1/6'], answer: '1/6' },
          { problem: '2/3 ÷ 4/5', steps: ['Keep, change, flip: 2/3 × 5/4', '= 10/12', 'Simplify: 5/6'], answer: '5/6' },
        ],
        practice: [
          { question: '3/5 × 10/21', answer: '2/7' },
          { question: '7/8 ÷ 7/4', answer: '1/2' },
          { question: '6 × 2/3', answer: '4' },
        ],
      },
      {
        id: 'mixed-numbers',
        title: 'Mixed Numbers',
        minutes: 9,
        summary: 'A mixed number combines a whole number and a fraction. Convert to an improper fraction before multiplying or dividing.',
        keyPoints: [
          'Mixed → improper: (whole × denominator + numerator) / denominator.',
          'Improper → mixed: divide; the quotient is the whole, the remainder is the new numerator.',
          'For adding/subtracting you can work with improper fractions or handle wholes and fractions separately.',
        ],
        formulas: [{ label: 'Convert', value: 'a b/c = (a × c + b)/c' }],
        examples: [
          { problem: '2 1/3 × 1 1/2', steps: ['2 1/3 = 7/3, 1 1/2 = 3/2', '7/3 × 3/2 = 21/6 = 7/2', '7/2 = 3 1/2'], answer: '3 1/2' },
          {
            problem: '3 1/4 − 1 2/3',
            steps: ['13/4 − 5/3', 'LCD 12: 39/12 − 20/12', '= 19/12 = 1 7/12'],
            answer: '1 7/12',
          },
        ],
        practice: [
          { question: 'Write 17/5 as a mixed number.', answer: '3 2/5' },
          { question: '1 3/4 + 2 1/2', answer: '4 1/4' },
          { question: '4 1/2 ÷ 1 1/2', answer: '3' },
        ],
      },
    ],
  },
  {
    id: 'decimals',
    level: 'foundations',
    title: 'Decimals',
    icon: 'ellipsis-horizontal-circle-outline',
    description: 'Decimal place value, operations with decimals, and converting between fractions and decimals.',
    lessons: [
      {
        id: 'decimal-place-value',
        title: 'Decimal Place Value',
        minutes: 7,
        summary: 'Places to the right of the decimal point are tenths, hundredths, thousandths — each 10 times smaller than the last.',
        keyPoints: [
          '0.1 = one tenth, 0.01 = one hundredth, 0.001 = one thousandth.',
          'Adding zeros to the end doesn’t change the value: 0.5 = 0.50 = 0.500.',
          'Compare decimals by lining up the decimal points and comparing place by place.',
        ],
        examples: [
          {
            problem: 'Order from least to greatest: 0.6, 0.58, 0.605',
            steps: ['Write with the same number of places: 0.600, 0.580, 0.605', 'Compare: 580 < 600 < 605'],
            answer: '0.58 < 0.6 < 0.605',
          },
        ],
        mistakes: ['Thinking longer decimals are bigger: 0.58 is less than 0.6.'],
        practice: [
          { question: 'What is the value of the 4 in 3.146?', answer: '4 hundredths (0.04)' },
          { question: 'Round 7.3862 to the nearest hundredth.', answer: '7.39' },
          { question: 'Which is larger: 0.7 or 0.69?', answer: '0.7' },
        ],
      },
      {
        id: 'decimal-operations',
        title: 'Operations with Decimals',
        minutes: 10,
        summary: 'Line up decimal points to add and subtract; count decimal places to multiply; shift decimals to divide.',
        keyPoints: [
          'Add/subtract: line up the decimal points, fill gaps with zeros.',
          'Multiply: ignore decimals, multiply, then place the point so the answer has as many decimal places as both factors combined.',
          'Divide: move the divisor’s decimal to make it whole, and move the dividend’s decimal the same number of places.',
        ],
        examples: [
          { problem: '2.4 × 0.35', steps: ['24 × 35 = 840', '1 + 2 = 3 decimal places', '0.840'], answer: '0.84' },
          { problem: '7.2 ÷ 0.08', steps: ['Move both decimals 2 places: 720 ÷ 8', '720 ÷ 8 = 90'], answer: '90' },
        ],
        practice: [
          { question: '12.5 + 3.75', answer: '16.25' },
          { question: '6 − 2.47', answer: '3.53' },
          { question: '1.2 × 1.2', answer: '1.44' },
          { question: '4.5 ÷ 0.9', answer: '5' },
        ],
      },
      {
        id: 'fractions-decimals',
        title: 'Converting Fractions & Decimals',
        minutes: 8,
        summary: 'A fraction is a division problem. A decimal can be written as a fraction over a power of 10.',
        keyPoints: [
          'Fraction → decimal: divide the numerator by the denominator.',
          'Decimal → fraction: write over 10, 100, 1000, … then simplify.',
          'Some fractions repeat forever: 1/3 = 0.333…',
        ],
        formulas: [
          { label: 'Halves/quarters', value: '1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75' },
          { label: 'Fifths/eighths', value: '1/5 = 0.2, 1/8 = 0.125' },
          { label: 'Thirds', value: '1/3 = 0.333…, 2/3 = 0.666…' },
        ],
        examples: [
          { problem: 'Write 3/8 as a decimal.', steps: ['3 ÷ 8 = 0.375'], answer: '0.375' },
          { problem: 'Write 0.45 as a fraction.', steps: ['0.45 = 45/100', 'GCF is 5: 9/20'], answer: '9/20' },
        ],
        practice: [
          { question: 'Write 7/20 as a decimal.', answer: '0.35' },
          { question: 'Write 0.125 as a fraction.', answer: '1/8' },
          { question: 'Write 2/3 as a decimal.', answer: '0.666… (6 repeating)' },
        ],
      },
    ],
  },
  {
    id: 'measurement',
    level: 'foundations',
    title: 'Measurement, Time & Money',
    icon: 'resize-outline',
    description: 'Unit conversions, perimeter and area of rectangles, elapsed time and money.',
    lessons: [
      {
        id: 'units-conversions',
        title: 'Units & Conversions',
        minutes: 9,
        summary: 'Convert between units by multiplying (big → small unit) or dividing (small → big unit) by the conversion factor.',
        keyPoints: [
          'Big unit → small unit: multiply (there will be more of them).',
          'Small unit → big unit: divide (there will be fewer of them).',
          'Metric units change by powers of 10, so you just shift the decimal point.',
        ],
        formulas: [
          { label: 'Length (metric)', value: '1 km = 1,000 m; 1 m = 100 cm; 1 cm = 10 mm' },
          { label: 'Mass & volume', value: '1 kg = 1,000 g; 1 L = 1,000 mL' },
          { label: 'Length (US)', value: '1 ft = 12 in; 1 yd = 3 ft; 1 mi = 5,280 ft' },
          { label: 'Weight & capacity (US)', value: '1 lb = 16 oz; 1 gal = 4 qt; 1 qt = 2 pt; 1 pt = 2 c' },
        ],
        examples: [
          { problem: 'Convert 3.5 km to meters.', steps: ['Big → small: multiply', '3.5 × 1,000 = 3,500'], answer: '3,500 m' },
          { problem: 'Convert 78 inches to feet.', steps: ['Small → big: divide', '78 ÷ 12 = 6 R6'], answer: '6 ft 6 in (6.5 ft)' },
        ],
        practice: [
          { question: 'Convert 2.4 L to mL.', answer: '2,400 mL' },
          { question: 'Convert 5 yd to feet.', answer: '15 ft' },
          { question: 'Convert 48 oz to pounds.', answer: '3 lb' },
        ],
      },
      {
        id: 'perimeter-area-rectangles',
        title: 'Perimeter & Area of Rectangles',
        minutes: 8,
        summary: 'Perimeter is the distance around a shape; area is the space inside it, measured in square units.',
        keyPoints: [
          'Perimeter: add all side lengths.',
          'Area of a rectangle: length × width.',
          'For L-shapes, split into rectangles or subtract a missing piece.',
          'Area units are squared: cm², m², ft².',
        ],
        formulas: [
          { label: 'Rectangle', value: 'P = 2(l + w), A = l × w' },
          { label: 'Square', value: 'P = 4s, A = s²' },
        ],
        examples: [
          { problem: 'A rectangle is 8 cm by 5 cm. Find the perimeter and area.', steps: ['P = 2(8 + 5) = 26 cm', 'A = 8 × 5 = 40 cm²'], answer: 'P = 26 cm, A = 40 cm²' },
          {
            problem: 'A 12 ft × 10 ft room has a 4 ft × 3 ft closet cut out of one corner. What is the floor area?',
            steps: ['Whole rectangle: 12 × 10 = 120 ft²', 'Closet: 4 × 3 = 12 ft²', '120 − 12 = 108 ft²'],
            answer: '108 ft²',
          },
        ],
        practice: [
          { question: 'A square has side 7 m. Find its perimeter and area.', answer: 'P = 28 m, A = 49 m²' },
          { question: 'A rectangle has area 54 cm² and length 9 cm. Find the width.', answer: '6 cm' },
          { question: 'A rectangle has perimeter 30 in and width 5 in. Find the length.', answer: '10 in' },
        ],
      },
      {
        id: 'time-money',
        title: 'Time & Money',
        minutes: 8,
        summary: 'Work with elapsed time by counting hours first, then minutes. Handle money like decimals with two places.',
        keyPoints: [
          '60 seconds = 1 minute, 60 minutes = 1 hour, 24 hours = 1 day.',
          'Elapsed time: jump to the next full hour, then count hours, then remaining minutes.',
          '24-hour time: add 12 to PM hours (except 12 PM).',
          'Money: line up decimal points; change = amount paid − cost.',
        ],
        examples: [
          {
            problem: 'A movie starts at 2:45 PM and lasts 1 h 50 min. When does it end?',
            steps: ['2:45 + 1 h = 3:45', '3:45 + 15 min = 4:00', '4:00 + remaining 35 min = 4:35'],
            answer: '4:35 PM',
          },
          { problem: 'You buy items costing $3.75 and $2.60 and pay with $10. What is your change?', steps: ['3.75 + 2.60 = 6.35', '10.00 − 6.35 = 3.65'], answer: '$3.65' },
        ],
        practice: [
          { question: 'How long is it from 9:20 AM to 1:05 PM?', answer: '3 h 45 min' },
          { question: 'Convert 150 minutes to hours and minutes.', answer: '2 h 30 min' },
          { question: 'Write 5:30 PM in 24-hour time.', answer: '17:30' },
        ],
      },
    ],
  },
];
