import type { Course } from './types';

export const HIGH_SCHOOL: Course[] = [
  {
    id: 'algebra-1',
    level: 'high',
    title: 'Algebra I',
    icon: 'git-commit-outline',
    description: 'Multi-step equations, slope, equations of lines, systems, and absolute value.',
    lessons: [
      {
        id: 'multi-step-equations',
        title: 'Multi-Step & Literal Equations',
        minutes: 10,
        summary: 'Clear fractions, distribute, collect like terms, then isolate the variable. Literal equations are solved for one letter in terms of the others.',
        keyPoints: [
          'Clear fractions by multiplying every term by the LCD.',
          'Distribute, combine like terms, then move variables to one side.',
          'For literal equations, treat the other letters like numbers.',
        ],
        examples: [
          { problem: 'x/3 + x/4 = 14', steps: ['Multiply every term by 12: 4x + 3x = 168', '7x = 168', 'x = 24'], answer: 'x = 24' },
          { problem: 'Solve A = ½bh for h.', steps: ['Multiply both sides by 2: 2A = bh', 'Divide by b: h = 2A/b'], answer: 'h = 2A/b' },
        ],
        practice: [
          { question: '0.5(x − 6) = 2x + 3', answer: 'x = −4' },
          { question: 'Solve P = 2l + 2w for w.', answer: 'w = (P − 2l)/2' },
          { question: '3(2x − 1) − 4 = 2(x + 5) + 3', answer: 'x = 5' },
        ],
      },
      {
        id: 'slope-linear-functions',
        title: 'Slope & Linear Functions',
        minutes: 10,
        summary: 'Slope measures steepness: rise over run. A linear function has the form y = mx + b with slope m and y-intercept b.',
        keyPoints: [
          'Positive slope rises left to right; negative falls; zero is horizontal; vertical lines have undefined slope.',
          'Parallel lines have equal slopes.',
          'Perpendicular lines have slopes that are negative reciprocals (m₁ × m₂ = −1).',
        ],
        formulas: [
          { label: 'Slope', value: 'm = (y₂ − y₁) / (x₂ − x₁)' },
          { label: 'Slope-intercept', value: 'y = mx + b' },
        ],
        examples: [
          {
            problem: 'Find the equation of the line through (2, 3) and (6, 11).',
            steps: ['m = (11 − 3)/(6 − 2) = 8/4 = 2', 'Substitute (2, 3): 3 = 2(2) + b', 'b = −1'],
            answer: 'y = 2x − 1',
          },
        ],
        practice: [
          { question: 'Slope through (−1, 4) and (3, −4)?', answer: '−2' },
          { question: 'Slope and y-intercept of 2x + 3y = 12?', answer: 'm = −2/3, b = 4' },
          { question: 'Slope perpendicular to a line with slope 3/4?', answer: '−4/3' },
        ],
      },
      {
        id: 'equations-of-lines',
        title: 'Writing Equations of Lines',
        minutes: 9,
        summary: 'With a point and a slope, point-slope form writes the line immediately. Convert to whichever form you need.',
        keyPoints: [
          'Point-slope: y − y₁ = m(x − x₁).',
          'Standard form: Ax + By = C.',
          'Horizontal line: y = k. Vertical line: x = h.',
        ],
        formulas: [{ label: 'Point-slope', value: 'y − y₁ = m(x − x₁)' }],
        examples: [
          { problem: 'Line through (−2, 5) with slope 3.', steps: ['y − 5 = 3(x + 2)', 'y − 5 = 3x + 6', 'y = 3x + 11'], answer: 'y = 3x + 11' },
          {
            problem: 'Line parallel to y = −2x + 1 through (1, 4).',
            steps: ['Parallel → m = −2', 'y − 4 = −2(x − 1)', 'y = −2x + 6'],
            answer: 'y = −2x + 6',
          },
        ],
        practice: [
          { question: 'Through (0, −3) with slope ½.', answer: 'y = ½x − 3' },
          { question: 'Through (1, 2) and (3, 8).', answer: 'y = 3x − 1' },
          { question: 'Perpendicular to y = 2x through (4, 1).', answer: 'y = −½x + 3' },
        ],
      },
      {
        id: 'systems-of-equations',
        title: 'Systems of Linear Equations',
        minutes: 11,
        summary: 'A system’s solution is the point that satisfies every equation. Solve by substitution, elimination or graphing.',
        keyPoints: [
          'Substitution: solve one equation for a variable, plug into the other.',
          'Elimination: add or subtract equations (after scaling) to cancel a variable.',
          'One solution: lines intersect. No solution: parallel lines. Infinitely many: same line.',
        ],
        examples: [
          { problem: 'x + y = 10 and 2x − y = 5', steps: ['Add the equations: 3x = 15 → x = 5', 'Substitute: 5 + y = 10 → y = 5'], answer: '(5, 5)' },
          {
            problem: 'y = 2x + 1 and 3x + 2y = 16',
            steps: ['Substitute: 3x + 2(2x + 1) = 16', '7x + 2 = 16 → x = 2', 'y = 2(2) + 1 = 5'],
            answer: '(2, 5)',
          },
        ],
        practice: [
          { question: 'x − y = 3 and x + y = 11', answer: '(7, 4)' },
          { question: '2x + 3y = 12 and x − 3y = −3', answer: '(3, 2)' },
          { question: 'y = 3x − 2 and y = 3x + 5', answer: 'No solution (parallel lines)' },
        ],
      },
      {
        id: 'absolute-value-compound',
        title: 'Absolute Value & Compound Inequalities',
        minutes: 9,
        summary: 'An absolute value equation usually has two solutions. Absolute value inequalities become compound inequalities.',
        keyPoints: [
          '|A| = k (k > 0) → A = k or A = −k.',
          '|A| < k → −k < A < k (“and”, between).',
          '|A| > k → A < −k or A > k (“or”, outside).',
          'Isolate the absolute value before splitting.',
        ],
        examples: [
          { problem: '|2x − 3| = 7', steps: ['2x − 3 = 7 → x = 5', '2x − 3 = −7 → x = −2'], answer: 'x = 5 or x = −2' },
          { problem: '|x + 1| ≤ 4', steps: ['−4 ≤ x + 1 ≤ 4', 'Subtract 1 throughout'], answer: '−5 ≤ x ≤ 3' },
        ],
        practice: [
          { question: '|x − 5| = 2', answer: 'x = 3 or x = 7' },
          { question: '|3x| > 12', answer: 'x < −4 or x > 4' },
          { question: '−3 < 2x + 1 ≤ 9', answer: '−2 < x ≤ 4' },
        ],
      },
    ],
  },
  {
    id: 'quadratics',
    level: 'high',
    title: 'Quadratics',
    icon: 'analytics-outline',
    description: 'Factoring, solving quadratic equations, the quadratic formula, and graphing parabolas.',
    lessons: [
      {
        id: 'factoring',
        title: 'Factoring Quadratics',
        minutes: 11,
        summary: 'Factoring rewrites a quadratic as a product. Always pull out a GCF first, then look for patterns.',
        keyPoints: [
          'x² + bx + c: find two numbers that multiply to c and add to b.',
          'ax² + bx + c (AC method): find two numbers multiplying to a·c and adding to b, split the middle term, factor by grouping.',
          'Difference of squares: a² − b² = (a − b)(a + b).',
          'Perfect square trinomial: a² + 2ab + b² = (a + b)².',
        ],
        examples: [
          { problem: 'Factor x² + 5x + 6', steps: ['Need numbers multiplying to 6 and adding to 5: 2 and 3'], answer: '(x + 2)(x + 3)' },
          {
            problem: 'Factor 6x² + 11x − 10',
            steps: ['a·c = −60; numbers multiplying to −60 and adding to 11: 15 and −4', '6x² + 15x − 4x − 10', '3x(2x + 5) − 2(2x + 5)'],
            answer: '(3x − 2)(2x + 5)',
          },
        ],
        practice: [
          { question: 'x² − 9x + 20', answer: '(x − 4)(x − 5)' },
          { question: 'x² − 49', answer: '(x − 7)(x + 7)' },
          { question: '2x² + 7x + 3', answer: '(2x + 1)(x + 3)' },
          { question: 'x² + 10x + 25', answer: '(x + 5)²' },
        ],
      },
      {
        id: 'solving-quadratics',
        title: 'Solving by Factoring & Square Roots',
        minutes: 9,
        summary: 'Set the quadratic equal to zero and factor: if a product is zero, one of its factors must be zero.',
        keyPoints: [
          'Zero product property: if AB = 0 then A = 0 or B = 0.',
          'Always move everything to one side first — never divide by x (you lose the solution x = 0).',
          'If the equation is (something)² = k, take ± square roots.',
        ],
        examples: [
          { problem: 'x² − x − 12 = 0', steps: ['(x − 4)(x + 3) = 0', 'x − 4 = 0 or x + 3 = 0'], answer: 'x = 4 or x = −3' },
          { problem: '(x − 2)² = 25', steps: ['x − 2 = ±5', 'x = 2 + 5 or x = 2 − 5'], answer: 'x = 7 or x = −3' },
        ],
        mistakes: ['Forgetting the negative root: x² = 9 gives x = ±3, not just 3.'],
        practice: [
          { question: 'x² + 7x = 0', answer: 'x = 0 or x = −7' },
          { question: '2x² − 18 = 0', answer: 'x = ±3' },
          { question: 'x² − 6x + 9 = 0', answer: 'x = 3 (double root)' },
        ],
      },
      {
        id: 'quadratic-formula',
        title: 'The Quadratic Formula & Discriminant',
        minutes: 10,
        summary: 'The quadratic formula solves any ax² + bx + c = 0. The discriminant b² − 4ac tells you how many real solutions exist.',
        keyPoints: [
          'Write the equation in standard form ax² + bx + c = 0 first.',
          'Discriminant D = b² − 4ac: D > 0 → two real roots; D = 0 → one repeated root; D < 0 → two complex roots.',
          'Simplify radicals and reduce fractions at the end.',
        ],
        formulas: [
          { label: 'Quadratic formula', value: 'x = (−b ± √(b² − 4ac)) / 2a' },
          { label: 'Discriminant', value: 'D = b² − 4ac' },
        ],
        examples: [
          { problem: '2x² + 3x − 2 = 0', steps: ['a = 2, b = 3, c = −2', 'D = 9 + 16 = 25', 'x = (−3 ± 5)/4'], answer: 'x = 1/2 or x = −2' },
          { problem: 'x² + 2x + 5 = 0', steps: ['D = 4 − 20 = −16', 'x = (−2 ± 4i)/2'], answer: 'x = −1 ± 2i' },
        ],
        practice: [
          { question: 'x² − 4x + 1 = 0', answer: 'x = 2 ± √3' },
          { question: 'How many real solutions does 3x² − 2x + 4 = 0 have?', answer: 'None (D = −44)' },
          { question: 'Discriminant of x² + 6x + 9?', answer: '0 (one repeated root)' },
        ],
      },
      {
        id: 'graphing-parabolas',
        title: 'Vertex Form & Graphing Parabolas',
        minutes: 10,
        summary: 'Every quadratic graphs as a parabola. Vertex form shows the turning point directly; completing the square gets you there.',
        keyPoints: [
          'Vertex form: y = a(x − h)² + k has vertex (h, k).',
          'a > 0 opens up (minimum); a < 0 opens down (maximum).',
          'Axis of symmetry: x = −b/(2a).',
          'Complete the square: add and subtract (b/2)².',
        ],
        formulas: [
          { label: 'Vertex form', value: 'y = a(x − h)² + k' },
          { label: 'Vertex x', value: 'x = −b / 2a' },
        ],
        examples: [
          {
            problem: 'Write y = x² − 6x + 5 in vertex form.',
            steps: ['(b/2)² = (−3)² = 9', 'y = (x² − 6x + 9) − 9 + 5', 'y = (x − 3)² − 4'],
            answer: 'y = (x − 3)² − 4, vertex (3, −4)',
          },
          {
            problem: 'Find the vertex of y = −2x² + 8x − 3.',
            steps: ['x = −8/(2 × −2) = 2', 'y = −2(4) + 16 − 3 = 5', 'a < 0, so it is a maximum'],
            answer: '(2, 5), maximum',
          },
        ],
        practice: [
          { question: 'Vertex form of y = x² + 4x + 7', answer: 'y = (x + 2)² + 3' },
          { question: 'Vertex of y = 3x² − 12x + 1', answer: '(2, −11)' },
          { question: 'Does y = −x² + 2 open up or down? Its max/min?', answer: 'Down; maximum value 2' },
        ],
      },
    ],
  },
  {
    id: 'polynomials',
    level: 'high',
    title: 'Polynomials & Rational Expressions',
    icon: 'layers-outline',
    description: 'Polynomial operations, division and the remainder theorem, and rational expressions.',
    lessons: [
      {
        id: 'polynomial-operations',
        title: 'Polynomial Operations',
        minutes: 9,
        summary: 'Add and subtract by combining like terms. Multiply by distributing every term to every term.',
        keyPoints: [
          'Write polynomials in descending order of degree.',
          'When subtracting, distribute the minus sign to every term.',
          'Special products: (a + b)² = a² + 2ab + b²; (a − b)(a + b) = a² − b².',
        ],
        examples: [
          {
            problem: '(2x + 3)(x² − x + 4)',
            steps: ['2x · (x² − x + 4) = 2x³ − 2x² + 8x', '3 · (x² − x + 4) = 3x² − 3x + 12', 'Combine like terms'],
            answer: '2x³ + x² + 5x + 12',
          },
        ],
        mistakes: ['(a + b)² ≠ a² + b². Don’t forget the middle term 2ab.'],
        practice: [
          { question: '(x + 4)²', answer: 'x² + 8x + 16' },
          { question: '(3x − 2)(3x + 2)', answer: '9x² − 4' },
          { question: '(x² + 3x − 1) − (2x² − x + 5)', answer: '−x² + 4x − 6' },
        ],
      },
      {
        id: 'polynomial-division',
        title: 'Division & the Remainder Theorem',
        minutes: 11,
        summary: 'Divide polynomials with long or synthetic division. The remainder theorem gives remainders instantly.',
        keyPoints: [
          'Synthetic division works for divisors of the form (x − c).',
          'Remainder theorem: dividing P(x) by (x − c) leaves remainder P(c).',
          'Factor theorem: (x − c) is a factor exactly when P(c) = 0.',
          'Rational root theorem: possible rational roots are ±(factors of constant)/(factors of leading coefficient).',
        ],
        examples: [
          {
            problem: 'Factor x³ − 2x² − 5x + 6 given that x = 1 is a root.',
            steps: [
              'Synthetic division by (x − 1) with coefficients 1, −2, −5, 6',
              'Bring down 1 → 1·1 = 1, −2 + 1 = −1 → −1·1 = −1, −5 − 1 = −6 → −6·1 = −6, 6 − 6 = 0',
              'Quotient: x² − x − 6 = (x − 3)(x + 2)',
            ],
            answer: '(x − 1)(x − 3)(x + 2)',
          },
        ],
        practice: [
          { question: 'Remainder when x³ + 2x − 7 is divided by (x − 2)?', answer: '5' },
          { question: 'Is (x + 1) a factor of x³ + 1?', answer: 'Yes, P(−1) = 0' },
          { question: '(x² + 5x + 6) ÷ (x + 2)', answer: 'x + 3' },
        ],
      },
      {
        id: 'rational-expressions',
        title: 'Rational Expressions',
        minutes: 11,
        summary: 'Rational expressions are fractions of polynomials. Factor everything, cancel common factors, and track excluded values.',
        keyPoints: [
          'Excluded values make a denominator zero — state them from the ORIGINAL expression.',
          'Cancel only common factors, never terms.',
          'Add/subtract with a common denominator; multiply straight across; divide by multiplying by the reciprocal.',
        ],
        examples: [
          {
            problem: 'Simplify (x² − 9)/(x² + 5x + 6)',
            steps: ['Factor: (x − 3)(x + 3) / ((x + 2)(x + 3))', 'Cancel (x + 3)'],
            answer: '(x − 3)/(x + 2), x ≠ −3, −2',
          },
          {
            problem: '2/x + 3/(x + 1)',
            steps: ['LCD = x(x + 1)', '(2(x + 1) + 3x) / (x(x + 1))', '= (5x + 2)/(x(x + 1))'],
            answer: '(5x + 2)/(x(x + 1))',
          },
        ],
        mistakes: ['Cancelling terms: (x + 2)/2 is NOT x.'],
        practice: [
          { question: 'Simplify (x² − 4x)/(x² − 16)', answer: 'x/(x + 4), x ≠ ±4' },
          { question: '1/(x − 1) − 1/(x + 1)', answer: '2/(x² − 1)' },
          { question: '(x + 2)/3 × 6/(x² − 4)', answer: '2/(x − 2)' },
        ],
      },
    ],
  },
  {
    id: 'exponentials-logs',
    level: 'high',
    title: 'Exponentials & Logarithms',
    icon: 'trending-up-outline',
    description: 'Growth and decay, compound interest, logarithms, log laws, and solving exponential equations.',
    lessons: [
      {
        id: 'exponential-functions',
        title: 'Exponential Growth & Decay',
        minutes: 10,
        summary: 'Exponential functions change by a constant FACTOR each step, so they grow (or shrink) faster and faster.',
        keyPoints: [
          'y = a·bˣ: a is the starting value, b is the growth factor.',
          'b > 1 → growth; 0 < b < 1 → decay.',
          'Percent rate r: growth factor 1 + r, decay factor 1 − r.',
          'e ≈ 2.71828 is the base for continuous growth.',
        ],
        formulas: [
          { label: 'Growth/decay', value: 'y = a(1 ± r)^t' },
          { label: 'Compound interest', value: 'A = P(1 + r/n)^(nt)' },
          { label: 'Continuous', value: 'A = Pe^(rt)' },
        ],
        examples: [
          { problem: '$1,000 at 6% compounded monthly for 5 years.', steps: ['A = 1000(1 + 0.06/12)^(12·5)', '= 1000(1.005)^60', '≈ 1000 × 1.34885'], answer: '≈ $1,348.85' },
          { problem: 'A population of 2,000 shrinks 3% per year. Size after 10 years?', steps: ['2000(0.97)^10', '≈ 2000 × 0.73742'], answer: '≈ 1,475' },
        ],
        practice: [
          { question: 'Is y = 5(0.8)ˣ growth or decay? By what percent?', answer: 'Decay, 20% per step' },
          { question: '$500 doubles every 8 years. Value after 24 years?', answer: '$4,000' },
          { question: '$2,000 at 5% compounded continuously for 10 years?', answer: '2000e^0.5 ≈ $3,297.44' },
        ],
      },
      {
        id: 'logarithms',
        title: 'Understanding Logarithms',
        minutes: 9,
        summary: 'A logarithm answers “what exponent?”: log_b(x) is the power you raise b to in order to get x.',
        keyPoints: [
          'log_b(x) = y means b^y = x.',
          'log x means log₁₀ x (common log); ln x means log_e x (natural log).',
          'log_b(1) = 0, log_b(b) = 1, log_b(bˣ) = x, b^(log_b x) = x.',
          'You can only take logs of positive numbers.',
        ],
        formulas: [{ label: 'Definition', value: 'log_b(x) = y ⇔ b^y = x' }],
        examples: [
          { problem: 'Evaluate log₂ 32', steps: ['2 to what power is 32?', '2⁵ = 32'], answer: '5' },
          { problem: 'Evaluate log 0.001', steps: ['0.001 = 10⁻³'], answer: '−3' },
          { problem: 'Evaluate ln e⁴', steps: ['ln and e undo each other'], answer: '4' },
        ],
        practice: [
          { question: 'log₃ 81', answer: '4' },
          { question: 'log₅ (1/25)', answer: '−2' },
          { question: 'Rewrite 10^2.5 = x in log form.', answer: 'log x = 2.5' },
          { question: 'log₄ 2', answer: '1/2' },
        ],
      },
      {
        id: 'log-laws',
        title: 'Laws of Logarithms',
        minutes: 9,
        summary: 'Log laws turn multiplication into addition, division into subtraction, and powers into multiplication.',
        keyPoints: [
          'Use these laws to expand or condense log expressions.',
          'Change of base lets a calculator evaluate any base.',
          'log(a + b) does NOT simplify.',
        ],
        formulas: [
          { label: 'Product', value: 'log_b(MN) = log_b M + log_b N' },
          { label: 'Quotient', value: 'log_b(M/N) = log_b M − log_b N' },
          { label: 'Power', value: 'log_b(M^p) = p log_b M' },
          { label: 'Change of base', value: 'log_b x = ln x / ln b' },
        ],
        examples: [
          { problem: 'Expand log(x²y / z)', steps: ['log x² + log y − log z'], answer: '2 log x + log y − log z' },
          { problem: 'Condense 3 ln x − ln 4', steps: ['ln x³ − ln 4'], answer: 'ln(x³/4)' },
          { problem: 'Evaluate log₂ 10', steps: ['ln 10 / ln 2', '≈ 2.302585 / 0.693147'], answer: '≈ 3.3219' },
        ],
        practice: [
          { question: 'log₂ 8 + log₂ 4', answer: '5' },
          { question: 'log 50 + log 2', answer: '2' },
          { question: 'Expand ln(√x / y³)', answer: '½ ln x − 3 ln y' },
        ],
      },
      {
        id: 'exponential-equations',
        title: 'Solving Exponential & Log Equations',
        minutes: 11,
        summary: 'Match bases when you can; otherwise take a log of both sides. For log equations, condense and convert to exponential form.',
        keyPoints: [
          'If b^A = b^B, then A = B.',
          'Otherwise take ln of both sides and use the power rule to bring the exponent down.',
          'Log equations: condense into one log, rewrite as an exponential, solve, then reject answers that make any log argument ≤ 0.',
        ],
        examples: [
          { problem: '3^(x + 1) = 27', steps: ['27 = 3³', 'x + 1 = 3'], answer: 'x = 2' },
          { problem: '5ˣ = 40', steps: ['x ln 5 = ln 40', 'x = ln 40 / ln 5 ≈ 3.6889 / 1.6094'], answer: 'x ≈ 2.292' },
          {
            problem: 'log₂(x − 1) + log₂(x + 1) = 3',
            steps: ['log₂((x − 1)(x + 1)) = 3', 'x² − 1 = 2³ = 8', 'x = ±3', 'x = −3 gives log of a negative → reject'],
            answer: 'x = 3',
          },
        ],
        mistakes: ['Not checking for extraneous solutions in log equations.'],
        practice: [
          { question: '2^(3x) = 64', answer: 'x = 2' },
          { question: 'eˣ = 10', answer: 'x = ln 10 ≈ 2.303' },
          { question: 'log x + log(x − 3) = 1', answer: 'x = 5 (x = −2 rejected)' },
          { question: 'How many years to double money at 7% compounded annually?', answer: 'ln 2 / ln 1.07 ≈ 10.24 years' },
        ],
      },
    ],
  },
  {
    id: 'functions',
    level: 'high',
    title: 'Functions',
    icon: 'git-network-outline',
    description: 'Domain and range, composition, inverses, and transformations of graphs.',
    lessons: [
      {
        id: 'domain-range',
        title: 'Function Notation, Domain & Range',
        minutes: 9,
        summary: 'A function assigns exactly one output to each input. The domain is all allowed inputs; the range is all resulting outputs.',
        keyPoints: [
          'f(3) means “substitute 3 for x”.',
          'Exclude inputs that make a denominator zero.',
          'Even roots need non-negative insides: √(x − 3) requires x ≥ 3.',
          'Vertical line test: a graph is a function if no vertical line hits it twice.',
        ],
        examples: [
          { problem: 'Domain and range of f(x) = √(x − 3)', steps: ['Need x − 3 ≥ 0 → x ≥ 3', 'Square roots give outputs ≥ 0'], answer: 'Domain x ≥ 3, range y ≥ 0' },
          { problem: 'Domain of g(x) = 1/(x + 2)', steps: ['Denominator ≠ 0 → x ≠ −2'], answer: 'All reals except −2' },
          { problem: 'f(x) = 2x² − 1. Find f(−3).', steps: ['2(−3)² − 1 = 2(9) − 1'], answer: '17' },
        ],
        practice: [
          { question: 'Domain of h(x) = 5/(x² − 9)', answer: 'All reals except x = ±3' },
          { question: 'f(x) = 3x − 4. Find f(a + 1).', answer: '3a − 1' },
          { question: 'Range of y = x² + 2', answer: 'y ≥ 2' },
        ],
      },
      {
        id: 'composition-inverses',
        title: 'Composition & Inverse Functions',
        minutes: 10,
        summary: 'Composition chains functions together. An inverse function undoes the original.',
        keyPoints: [
          '(f ∘ g)(x) = f(g(x)): apply g first, then f.',
          'Usually f(g(x)) ≠ g(f(x)).',
          'To find f⁻¹: write y = f(x), swap x and y, solve for y.',
          'A function has an inverse function only if it is one-to-one (passes the horizontal line test).',
        ],
        formulas: [{ label: 'Inverse check', value: 'f(f⁻¹(x)) = f⁻¹(f(x)) = x' }],
        examples: [
          { problem: 'f(x) = 2x + 1, g(x) = x². Find f(g(3)) and g(f(3)).', steps: ['g(3) = 9 → f(9) = 19', 'f(3) = 7 → g(7) = 49'], answer: '19 and 49' },
          {
            problem: 'Find the inverse of f(x) = (3x − 2)/5.',
            steps: ['y = (3x − 2)/5', 'Swap: x = (3y − 2)/5', '5x = 3y − 2 → y = (5x + 2)/3'],
            answer: 'f⁻¹(x) = (5x + 2)/3',
          },
        ],
        practice: [
          { question: 'f(x) = x − 4, g(x) = 3x. Find (f ∘ g)(x).', answer: '3x − 4' },
          { question: 'Inverse of f(x) = x³ + 1', answer: '∛(x − 1)' },
          { question: 'f(x) = 4x − 7. Find f⁻¹(5).', answer: '3' },
        ],
      },
      {
        id: 'transformations',
        title: 'Transformations of Graphs',
        minutes: 9,
        summary: 'Shift, stretch and reflect a parent graph by changing its formula: y = a·f(b(x − h)) + k.',
        keyPoints: [
          'f(x) + k shifts up k; f(x − h) shifts right h (opposite of the sign you see).',
          'a·f(x) stretches vertically by |a|; a < 0 reflects over the x-axis.',
          'f(−x) reflects over the y-axis; f(bx) compresses horizontally by factor 1/b.',
          'Apply stretches/reflections before shifts.',
        ],
        examples: [
          {
            problem: 'Describe y = −2(x − 3)² + 1 compared to y = x².',
            steps: ['(x − 3): right 3', '× 2: vertical stretch by 2', 'negative: reflect over the x-axis', '+1: up 1'],
            answer: 'Right 3, stretch ×2, flip, up 1; vertex (3, 1)',
          },
        ],
        practice: [
          { question: 'Describe y = |x + 4| − 2.', answer: 'Left 4, down 2' },
          { question: 'Shift y = √x up 3 and right 1.', answer: 'y = √(x − 1) + 3' },
          { question: 'What does y = f(−x) do?', answer: 'Reflects over the y-axis' },
        ],
      },
    ],
  },
  {
    id: 'geometry-hs',
    level: 'high',
    title: 'Geometry',
    icon: 'triangle-outline',
    description: 'Pythagorean theorem, similarity, special right triangles, circles and coordinate geometry.',
    lessons: [
      {
        id: 'pythagorean-distance',
        title: 'Pythagorean Theorem & Distance',
        minutes: 9,
        summary: 'In a right triangle, the squares of the legs add to the square of the hypotenuse. The distance formula is the same idea on a grid.',
        keyPoints: [
          'c is always the hypotenuse — the longest side, opposite the right angle.',
          'Converse: if a² + b² = c², the triangle is right.',
          'Common triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25 (and their multiples).',
        ],
        formulas: [
          { label: 'Pythagorean', value: 'a² + b² = c²' },
          { label: 'Distance', value: 'd = √((x₂ − x₁)² + (y₂ − y₁)²)' },
          { label: 'Midpoint', value: '((x₁ + x₂)/2, (y₁ + y₂)/2)' },
        ],
        examples: [
          { problem: 'Legs 9 and 12. Find the hypotenuse.', steps: ['9² + 12² = 81 + 144 = 225', 'c = √225'], answer: '15' },
          { problem: 'Distance and midpoint between (1, 2) and (7, 10).', steps: ['d = √(6² + 8²) = √100 = 10', 'Midpoint = (8/2, 12/2)'], answer: 'd = 10, midpoint (4, 6)' },
        ],
        practice: [
          { question: 'Hypotenuse 13, one leg 5. Other leg?', answer: '12' },
          { question: 'Is a triangle with sides 7, 24, 25 right?', answer: 'Yes: 49 + 576 = 625' },
          { question: 'Distance from (−3, −1) to (2, 11)?', answer: '13' },
        ],
      },
      {
        id: 'congruence-similarity',
        title: 'Congruence & Similarity',
        minutes: 10,
        summary: 'Congruent figures are identical in size and shape. Similar figures have the same shape with proportional sides.',
        keyPoints: [
          'Congruence tests: SSS, SAS, ASA, AAS, HL (right triangles). SSA does not work.',
          'Similarity tests: AA, SSS~, SAS~.',
          'If lengths scale by k, areas scale by k² and volumes by k³.',
        ],
        examples: [
          {
            problem: 'Similar triangles: one has sides 6, 8, 10; the other’s longest side is 25. Find its other sides.',
            steps: ['Scale factor k = 25/10 = 2.5', '6 × 2.5 = 15, 8 × 2.5 = 20'],
            answer: '15, 20, 25',
          },
          {
            problem: 'A 1.8 m person casts a 2.4 m shadow while a tree casts a 16 m shadow. Tree height?',
            steps: ['Similar triangles: h/16 = 1.8/2.4', 'h = 16 × 0.75'],
            answer: '12 m',
          },
        ],
        practice: [
          { question: 'Scale factor 3. Ratio of areas?', answer: '9 : 1' },
          { question: 'Similar triangles have areas 16 and 36. Ratio of sides?', answer: '2 : 3' },
          { question: 'Two sides and the included angle are equal. Which congruence test?', answer: 'SAS' },
        ],
      },
      {
        id: 'special-right-triangles',
        title: 'Special Right Triangles',
        minutes: 8,
        summary: '45-45-90 and 30-60-90 triangles have fixed side ratios, so one side gives you all the others.',
        keyPoints: [
          '45-45-90: legs x and x, hypotenuse x√2.',
          '30-60-90: short leg x (opposite 30°), long leg x√3 (opposite 60°), hypotenuse 2x.',
          'Rationalize: 10/√2 = 5√2.',
        ],
        formulas: [
          { label: '45-45-90', value: 'x : x : x√2' },
          { label: '30-60-90', value: 'x : x√3 : 2x' },
        ],
        examples: [
          { problem: '45-45-90 with hypotenuse 10. Find a leg.', steps: ['x√2 = 10', 'x = 10/√2 = 5√2'], answer: '5√2 ≈ 7.07' },
          { problem: '30-60-90 with short leg 4.', steps: ['Long leg = 4√3', 'Hypotenuse = 8'], answer: '4√3 ≈ 6.93 and 8' },
        ],
        practice: [
          { question: '30-60-90 with hypotenuse 18. Find both legs.', answer: '9 and 9√3' },
          { question: 'Diagonal of a square with side 6?', answer: '6√2' },
          { question: 'Height of an equilateral triangle with side 8?', answer: '4√3' },
        ],
      },
      {
        id: 'circles-hs',
        title: 'Circles: Arcs, Sectors & Equations',
        minutes: 11,
        summary: 'Arcs and sectors are fractions of a whole circle. On the coordinate plane, a circle is all points at distance r from its center.',
        keyPoints: [
          'Arc length and sector area use the fraction θ/360 of the full circle.',
          'An inscribed angle is half its intercepted arc (or central angle).',
          'A tangent is perpendicular to the radius at the point of contact.',
          'Complete the square in x and y to find a circle’s center and radius.',
        ],
        formulas: [
          { label: 'Arc length', value: 'L = (θ/360) × 2πr' },
          { label: 'Sector area', value: 'A = (θ/360) × πr²' },
          { label: 'Circle equation', value: '(x − h)² + (y − k)² = r²' },
        ],
        examples: [
          { problem: 'r = 10, central angle 72°. Arc length and sector area?', steps: ['72/360 = 1/5', 'Arc = (1/5)(20π) = 4π', 'Sector = (1/5)(100π) = 20π'], answer: '4π ≈ 12.57 and 20π ≈ 62.83' },
          {
            problem: 'Center and radius of x² + y² − 6x + 4y − 12 = 0',
            steps: ['(x² − 6x + 9) + (y² + 4y + 4) = 12 + 9 + 4', '(x − 3)² + (y + 2)² = 25'],
            answer: 'Center (3, −2), r = 5',
          },
        ],
        practice: [
          { question: 'An inscribed angle intercepts a 110° arc. Its measure?', answer: '55°' },
          { question: 'Equation of a circle with center (−1, 4) and radius 3', answer: '(x + 1)² + (y − 4)² = 9' },
          { question: 'Arc length for r = 6, θ = 120°', answer: '4π ≈ 12.57' },
        ],
      },
    ],
  },
  {
    id: 'trigonometry',
    level: 'high',
    title: 'Trigonometry',
    icon: 'pulse-outline',
    description: 'SOH-CAH-TOA, radians and the unit circle, trig graphs, identities, and the laws of sines and cosines.',
    lessons: [
      {
        id: 'right-triangle-trig',
        title: 'Right-Triangle Trigonometry',
        minutes: 10,
        summary: 'In a right triangle, sine, cosine and tangent are ratios of sides relative to an acute angle: SOH-CAH-TOA.',
        keyPoints: [
          'sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent.',
          'Reciprocals: csc = 1/sin, sec = 1/cos, cot = 1/tan.',
          'Use inverse trig (sin⁻¹, cos⁻¹, tan⁻¹) to find angles.',
          'Make sure your calculator is in degree mode for degree problems.',
        ],
        formulas: [{ label: 'SOH-CAH-TOA', value: 'sin = O/H, cos = A/H, tan = O/A' }],
        examples: [
          { problem: 'Opposite 5, hypotenuse 13. Find sin, cos, tan.', steps: ['Adjacent = √(169 − 25) = 12', 'sin = 5/13, cos = 12/13, tan = 5/12'], answer: '5/13, 12/13, 5/12' },
          { problem: 'A 6 m ladder makes a 70° angle with the ground. How high does it reach?', steps: ['Height is opposite, ladder is hypotenuse → sine', 'h = 6 sin 70° ≈ 6 × 0.9397'], answer: '≈ 5.64 m' },
        ],
        practice: [
          { question: 'tan θ = 1. Find θ (acute).', answer: '45°' },
          { question: 'Hypotenuse 20, angle 30°. Opposite side?', answer: '10' },
          { question: 'Adjacent 8, hypotenuse 10. Find the angle.', answer: 'cos⁻¹(0.8) ≈ 36.87°' },
        ],
      },
      {
        id: 'unit-circle',
        title: 'Radians & the Unit Circle',
        minutes: 11,
        summary: 'Radians measure angles by arc length. On the unit circle, the point at angle θ is (cos θ, sin θ).',
        keyPoints: [
          '180° = π radians. Degrees → radians: × π/180. Radians → degrees: × 180/π.',
          'Reference angle: the acute angle to the x-axis. Use it with the quadrant’s sign.',
          'Signs: Quadrant I all positive, II sine, III tangent, IV cosine (“All Students Take Calculus”).',
        ],
        formulas: [
          { label: '30° (π/6)', value: 'sin = 1/2, cos = √3/2' },
          { label: '45° (π/4)', value: 'sin = cos = √2/2' },
          { label: '60° (π/3)', value: 'sin = √3/2, cos = 1/2' },
        ],
        examples: [
          { problem: 'Convert 150° to radians.', steps: ['150 × π/180 = 5π/6'], answer: '5π/6' },
          { problem: 'Evaluate cos(2π/3).', steps: ['2π/3 = 120°, in Quadrant II', 'Reference angle π/3: cos = 1/2', 'Cosine is negative in QII'], answer: '−1/2' },
          { problem: 'Evaluate sin(7π/6).', steps: ['7π/6 = 210°, Quadrant III', 'Reference π/6: sin = 1/2', 'Sine is negative in QIII'], answer: '−1/2' },
        ],
        practice: [
          { question: 'Convert 3π/4 to degrees.', answer: '135°' },
          { question: 'sin(5π/3)', answer: '−√3/2' },
          { question: 'tan(π/4)', answer: '1' },
          { question: 'cos(π)', answer: '−1' },
        ],
      },
      {
        id: 'trig-graphs',
        title: 'Graphs of Trig Functions',
        minutes: 9,
        summary: 'Sine and cosine graphs are waves. Amplitude, period, phase shift and midline describe any transformed wave.',
        keyPoints: [
          'y = A sin(B(x − C)) + D.',
          'Amplitude |A|, period 2π/|B|, phase shift C (right if positive), midline y = D.',
          'Range: [D − |A|, D + |A|].',
          'tan x has period π and vertical asymptotes at x = π/2 + kπ.',
        ],
        formulas: [{ label: 'Period', value: 'T = 2π / |B|' }],
        examples: [
          {
            problem: 'Describe y = 3 sin(2x − π) + 1.',
            steps: ['Factor: 3 sin(2(x − π/2)) + 1', 'Amplitude 3, period 2π/2 = π', 'Phase shift π/2 right, midline y = 1', 'Range [1 − 3, 1 + 3]'],
            answer: 'Amp 3, period π, shift π/2 right, range [−2, 4]',
          },
        ],
        practice: [
          { question: 'Period of y = cos(4x)?', answer: 'π/2' },
          { question: 'Amplitude of y = −5 sin x?', answer: '5' },
          { question: 'Maximum of y = 2 cos x + 3?', answer: '5' },
        ],
      },
      {
        id: 'trig-identities',
        title: 'Trig Identities & Equations',
        minutes: 12,
        summary: 'Identities are equations true for every angle. Use them to simplify expressions and solve trig equations.',
        keyPoints: [
          'Pythagorean identities come from x² + y² = 1 on the unit circle.',
          'Double-angle formulas rewrite 2θ in terms of θ.',
          'Trig equations usually have infinitely many solutions — give those in the requested interval.',
        ],
        formulas: [
          { label: 'Pythagorean', value: 'sin²θ + cos²θ = 1;  1 + tan²θ = sec²θ' },
          { label: 'Double angle', value: 'sin 2θ = 2 sin θ cos θ' },
          { label: 'Double angle', value: 'cos 2θ = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1' },
          { label: 'Sum', value: 'sin(A ± B) = sin A cos B ± cos A sin B' },
          { label: 'Sum', value: 'cos(A ± B) = cos A cos B ∓ sin A sin B' },
        ],
        examples: [
          {
            problem: 'sin θ = 3/5 with θ in Quadrant II. Find cos θ, tan θ, sin 2θ.',
            steps: ['cos²θ = 1 − 9/25 = 16/25 → cos θ = −4/5 (negative in QII)', 'tan θ = (3/5)/(−4/5) = −3/4', 'sin 2θ = 2(3/5)(−4/5) = −24/25'],
            answer: 'cos θ = −4/5, tan θ = −3/4, sin 2θ = −24/25',
          },
          { problem: 'Solve 2 sin x − 1 = 0 on [0, 2π).', steps: ['sin x = 1/2', 'Sine is positive in QI and QII', 'x = π/6 or x = π − π/6'], answer: 'x = π/6, 5π/6' },
        ],
        practice: [
          { question: 'Simplify (1 − cos²x)/sin x', answer: 'sin x' },
          { question: 'cos θ = 1/3. Find cos 2θ.', answer: '−7/9' },
          { question: 'Exact value of sin 75°', answer: '(√6 + √2)/4 ≈ 0.9659' },
          { question: 'Solve cos x = 0 on [0, 2π).', answer: 'x = π/2, 3π/2' },
        ],
      },
      {
        id: 'law-sines-cosines',
        title: 'Law of Sines & Law of Cosines',
        minutes: 11,
        summary: 'These laws solve ANY triangle, not just right triangles.',
        keyPoints: [
          'Law of sines: use with two angles and a side (AAS, ASA) or SSA (watch the ambiguous case).',
          'Law of cosines: use with SAS or SSS.',
          'Side a is opposite angle A, and so on.',
        ],
        formulas: [
          { label: 'Law of sines', value: 'a/sin A = b/sin B = c/sin C' },
          { label: 'Law of cosines', value: 'c² = a² + b² − 2ab cos C' },
          { label: 'Area', value: 'Area = ½ ab sin C' },
        ],
        examples: [
          {
            problem: 'a = 7, b = 9, C = 60°. Find c and the area.',
            steps: ['c² = 49 + 81 − 2(7)(9)(0.5) = 130 − 63 = 67', 'c = √67 ≈ 8.19', 'Area = ½(7)(9) sin 60° ≈ 31.5 × 0.8660'],
            answer: 'c ≈ 8.19, area ≈ 27.28',
          },
          { problem: 'A = 40°, B = 60°, a = 10. Find b.', steps: ['b/sin 60° = 10/sin 40°', 'b = 10 × 0.8660 / 0.6428'], answer: 'b ≈ 13.47' },
        ],
        practice: [
          { question: 'Sides 5, 7, 8. Angle opposite the side 7?', answer: '60°' },
          { question: 'Area with a = 4, b = 6, C = 30°', answer: '6' },
          { question: 'A = 50°, B = 70°. Find C.', answer: '60°' },
        ],
      },
    ],
  },
  {
    id: 'precalculus',
    level: 'high',
    title: 'Pre-Calculus',
    icon: 'infinite-outline',
    description: 'Arithmetic and geometric sequences and series, complex numbers, and conic sections.',
    lessons: [
      {
        id: 'arithmetic-sequences',
        title: 'Arithmetic Sequences & Series',
        minutes: 9,
        summary: 'An arithmetic sequence adds the same common difference d each time. Its sum is the average of the first and last terms times the number of terms.',
        keyPoints: [
          'd = any term − the previous term.',
          'nth term: aₙ = a₁ + (n − 1)d.',
          'Sum of n terms: Sₙ = n(a₁ + aₙ)/2.',
        ],
        formulas: [
          { label: 'nth term', value: 'aₙ = a₁ + (n − 1)d' },
          { label: 'Sum', value: 'Sₙ = n(a₁ + aₙ)/2' },
        ],
        examples: [
          { problem: '7, 11, 15, … Find a₂₀ and S₂₀.', steps: ['d = 4', 'a₂₀ = 7 + 19(4) = 83', 'S₂₀ = 20(7 + 83)/2 = 900'], answer: 'a₂₀ = 83, S₂₀ = 900' },
          { problem: 'Sum of 1 + 2 + … + 100', steps: ['S = 100(1 + 100)/2'], answer: '5,050' },
        ],
        practice: [
          { question: '50th term of 3, 8, 13, …', answer: '248' },
          { question: 'Sum of the first 10 odd numbers', answer: '100' },
          { question: 'a₁ = 4, a₆ = 29. Find d.', answer: '5' },
        ],
      },
      {
        id: 'geometric-sequences',
        title: 'Geometric Sequences & Series',
        minutes: 10,
        summary: 'A geometric sequence multiplies by a common ratio r. An infinite geometric series converges when |r| < 1.',
        keyPoints: [
          'r = any term ÷ the previous term.',
          'nth term: aₙ = a₁ r^(n − 1).',
          'Infinite sum exists only if |r| < 1.',
        ],
        formulas: [
          { label: 'nth term', value: 'aₙ = a₁ r^(n−1)' },
          { label: 'Finite sum', value: 'Sₙ = a₁(1 − rⁿ)/(1 − r)' },
          { label: 'Infinite sum', value: 'S = a₁/(1 − r), |r| < 1' },
        ],
        examples: [
          { problem: '3, 6, 12, … Find a₈ and S₈.', steps: ['r = 2', 'a₈ = 3 × 2⁷ = 384', 'S₈ = 3(1 − 2⁸)/(1 − 2) = 3 × 255'], answer: 'a₈ = 384, S₈ = 765' },
          { problem: 'Sum 8 + 4 + 2 + 1 + …', steps: ['a₁ = 8, r = ½', 'S = 8/(1 − ½)'], answer: '16' },
          { problem: 'Write 0.333… as a fraction.', steps: ['0.3 + 0.03 + … with a₁ = 0.3, r = 0.1', 'S = 0.3/0.9'], answer: '1/3' },
        ],
        practice: [
          { question: 'Next term of 81, 27, 9, …', answer: '3' },
          { question: 'Sum of 5 + 15 + 45 + 135 + 405', answer: '605' },
          { question: 'Sum of 12 − 6 + 3 − …', answer: '8' },
        ],
      },
      {
        id: 'complex-numbers',
        title: 'Complex Numbers',
        minutes: 10,
        summary: 'Complex numbers a + bi extend the reals using i = √−1, so every quadratic has solutions.',
        keyPoints: [
          'i² = −1, and powers of i cycle every 4: i, −1, −i, 1.',
          'Add/subtract real and imaginary parts separately.',
          'Multiply like binomials, replacing i² with −1.',
          'Divide by multiplying top and bottom by the conjugate a − bi.',
        ],
        formulas: [
          { label: 'Conjugate product', value: '(a + bi)(a − bi) = a² + b²' },
          { label: 'Modulus', value: '|a + bi| = √(a² + b²)' },
        ],
        examples: [
          { problem: '(3 + 2i)(1 − 4i)', steps: ['3 − 12i + 2i − 8i²', '= 3 − 10i + 8'], answer: '11 − 10i' },
          { problem: '(2 + i)/(1 − i)', steps: ['Multiply by (1 + i)/(1 + i)', '(2 + 3i + i²)/(1 + 1) = (1 + 3i)/2'], answer: '1/2 + (3/2)i' },
        ],
        practice: [
          { question: 'i³⁷', answer: 'i (37 = 4·9 + 1)' },
          { question: '(4 − 3i) + (−1 + 5i)', answer: '3 + 2i' },
          { question: '|3 − 4i|', answer: '5' },
          { question: '√−49', answer: '7i' },
        ],
      },
      {
        id: 'conic-sections',
        title: 'Conic Sections',
        minutes: 11,
        summary: 'Circles, ellipses, parabolas and hyperbolas are the curves you get by slicing a cone. Their standard forms reveal their key features.',
        keyPoints: [
          'Ellipse: both squared terms added, different denominators. Foci: c² = a² − b².',
          'Hyperbola: squared terms subtracted. Foci: c² = a² + b².',
          'Parabola: only one variable is squared.',
          'Circle: both squared terms with equal coefficients.',
        ],
        formulas: [
          { label: 'Ellipse', value: 'x²/a² + y²/b² = 1' },
          { label: 'Hyperbola', value: 'x²/a² − y²/b² = 1, asymptotes y = ±(b/a)x' },
          { label: 'Parabola', value: 'y = a(x − h)² + k  or  x = a(y − k)² + h' },
        ],
        examples: [
          { problem: 'Analyze x²/25 + y²/9 = 1.', steps: ['Ellipse, a = 5, b = 3', 'c² = 25 − 9 = 16 → c = 4'], answer: 'Vertices (±5, 0), foci (±4, 0)' },
          { problem: 'Analyze x²/16 − y²/9 = 1.', steps: ['Hyperbola, a = 4, b = 3', 'c² = 16 + 9 = 25 → c = 5', 'Asymptotes y = ±(3/4)x'], answer: 'Foci (±5, 0), asymptotes y = ±¾x' },
        ],
        practice: [
          { question: 'Identify 4x² + 4y² = 36.', answer: 'Circle, radius 3' },
          { question: 'Foci of x²/9 + y²/25 = 1', answer: '(0, ±4)' },
          { question: 'Asymptotes of y²/4 − x² = 1', answer: 'y = ±2x' },
        ],
      },
    ],
  },
  {
    id: 'statistics-hs',
    level: 'high',
    title: 'Statistics & Probability',
    icon: 'dice-outline',
    description: 'Counting, permutations and combinations, probability rules, standard deviation, the normal curve and regression.',
    lessons: [
      {
        id: 'counting',
        title: 'Counting, Permutations & Combinations',
        minutes: 10,
        summary: 'Count outcomes by multiplying choices. Use permutations when order matters and combinations when it doesn’t.',
        keyPoints: [
          'Fundamental counting principle: multiply the number of choices at each stage.',
          'n! = n × (n − 1) × … × 1, and 0! = 1.',
          'Order matters (rankings, passwords) → permutation. Order doesn’t matter (teams, committees) → combination.',
          'Repeated letters: divide by the factorial of each repeat count.',
        ],
        formulas: [
          { label: 'Permutations', value: 'nPr = n! / (n − r)!' },
          { label: 'Combinations', value: 'nCr = n! / (r!(n − r)!)' },
        ],
        examples: [
          { problem: 'In how many ways can 8 runners win gold, silver and bronze?', steps: ['Order matters: 8P3', '8 × 7 × 6'], answer: '336' },
          { problem: 'How many 3-person committees from 10 people?', steps: ['Order doesn’t matter: 10C3', '(10 × 9 × 8)/(3 × 2 × 1)'], answer: '120' },
          { problem: 'Arrangements of the letters in LETTER', steps: ['6 letters with E twice and T twice', '6!/(2! 2!) = 720/4'], answer: '180' },
        ],
        practice: [
          { question: '4 shirts, 3 pants, 2 pairs of shoes. How many outfits?', answer: '24' },
          { question: '7C2', answer: '21' },
          { question: 'Arrange 5 of 9 books on a shelf.', answer: '9P5 = 15,120' },
        ],
      },
      {
        id: 'probability-rules',
        title: 'Probability Rules & Conditional Probability',
        minutes: 11,
        summary: 'Combine probabilities with the addition and multiplication rules. Conditional probability restricts the sample space.',
        keyPoints: [
          'Addition rule: P(A or B) = P(A) + P(B) − P(A and B).',
          'Mutually exclusive events can’t both happen: P(A and B) = 0.',
          'Independent events: P(A and B) = P(A) × P(B).',
          'Conditional: P(A | B) = P(A and B) / P(B).',
          '“At least one” is easiest as 1 − P(none).',
        ],
        formulas: [
          { label: 'Addition', value: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)' },
          { label: 'Conditional', value: 'P(A | B) = P(A ∩ B) / P(B)' },
        ],
        examples: [
          { problem: 'P(drawing a heart or a king)', steps: ['13/52 + 4/52 − 1/52 (king of hearts counted twice)', '= 16/52'], answer: '4/13' },
          { problem: 'P(two aces in a row without replacement)', steps: ['4/52 × 3/51', '= 12/2652'], answer: '1/221' },
          { problem: '60% take math, 25% take math and art. P(art | math)?', steps: ['0.25 / 0.60'], answer: '≈ 0.417' },
        ],
        practice: [
          { question: 'P(sum of 7 with two dice)', answer: '1/6' },
          { question: 'P(at least one head in 3 flips)', answer: '7/8' },
          { question: 'Independent A, B with P(A) = 0.5, P(B) = 0.4. P(A or B)?', answer: '0.7' },
        ],
      },
      {
        id: 'standard-deviation-normal',
        title: 'Standard Deviation & the Normal Curve',
        minutes: 11,
        summary: 'Standard deviation measures typical distance from the mean. Normal distributions follow the 68–95–99.7 rule.',
        keyPoints: [
          'Population SD: σ = √(Σ(x − μ)² / N). Sample SD divides by n − 1.',
          '68% of data within 1σ, 95% within 2σ, 99.7% within 3σ.',
          'A z-score counts how many SDs a value is from the mean.',
        ],
        formulas: [
          { label: 'z-score', value: 'z = (x − μ) / σ' },
          { label: 'Std. deviation', value: 'σ = √(Σ(x − μ)² / N)' },
        ],
        examples: [
          {
            problem: 'Population SD of 2, 4, 4, 4, 5, 5, 7, 9',
            steps: ['μ = 40/8 = 5', 'Squared deviations: 9, 1, 1, 1, 0, 0, 4, 16 → sum 32', 'σ² = 32/8 = 4'],
            answer: 'σ = 2',
          },
          { problem: 'Scores: mean 70, SD 8. What is the z-score of 86?', steps: ['z = (86 − 70)/8 = 2', 'About 97.5% score lower'], answer: 'z = 2' },
        ],
        practice: [
          { question: 'Mean 100, SD 15. What percent is between 85 and 115?', answer: '≈ 68%' },
          { question: 'z-score of x = 55 when μ = 60, σ = 4', answer: '−1.25' },
          { question: 'Heights: μ = 170, σ = 10. What percent are above 190?', answer: '≈ 2.5%' },
        ],
      },
      {
        id: 'regression',
        title: 'Scatter Plots, Correlation & Regression',
        minutes: 9,
        summary: 'A line of best fit models a linear relationship. The correlation coefficient r measures its strength and direction.',
        keyPoints: [
          'r ranges from −1 to 1. Near ±1 → strong; near 0 → weak.',
          'Correlation does not prove causation.',
          'Residual = observed − predicted. Positive residual → the point is above the line.',
          'Avoid extrapolating far beyond your data.',
        ],
        formulas: [{ label: 'Residual', value: 'e = y − ŷ' }],
        examples: [
          {
            problem: 'ŷ = 2.5x + 40 models test score vs. hours studied. Predict for 6 hours. A student who studied 6 hours scored 60 — residual?',
            steps: ['ŷ = 2.5(6) + 40 = 55', 'Residual = 60 − 55 = 5'],
            answer: 'Prediction 55, residual +5',
          },
        ],
        practice: [
          { question: 'Describe r = −0.92.', answer: 'Strong negative correlation' },
          { question: 'ŷ = 1.2x − 3. Predict at x = 10.', answer: '9' },
          { question: 'Observed 7, predicted 9. Residual?', answer: '−2' },
        ],
      },
    ],
  },
];
