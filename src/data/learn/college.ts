import type { Course } from './types';

export const COLLEGE: Course[] = [
  {
    id: 'calculus-1',
    level: 'college',
    title: 'Calculus I: Limits & Derivatives',
    icon: 'speedometer-outline',
    description: 'Limits, the derivative, differentiation rules, and applications like optimization and curve sketching.',
    lessons: [
      {
        id: 'limits',
        title: 'Limits',
        minutes: 12,
        summary: 'A limit describes the value a function approaches as x approaches a point — even if the function isn’t defined there.',
        keyPoints: [
          'Try direct substitution first. If you get a number, that’s the limit.',
          '0/0 is indeterminate: factor and cancel, rationalize, or use L’Hôpital’s rule.',
          'The limit exists only if the left- and right-hand limits agree.',
          'Limits at infinity of rational functions: compare the degrees of top and bottom.',
        ],
        formulas: [
          { label: 'Special limit', value: 'lim(x→0) sin x / x = 1' },
          { label: 'L’Hôpital (0/0 or ∞/∞)', value: 'lim f/g = lim f′/g′' },
        ],
        examples: [
          { problem: 'lim(x→3) (x² − 9)/(x − 3)', steps: ['Substitution gives 0/0', 'Factor: (x − 3)(x + 3)/(x − 3) = x + 3', 'Substitute: 3 + 3'], answer: '6' },
          { problem: 'lim(x→∞) (3x² + 1)/(2x² − x)', steps: ['Same degree on top and bottom', 'Ratio of leading coefficients: 3/2'], answer: '3/2' },
          { problem: 'lim(x→0) sin(5x)/x', steps: ['Rewrite: 5 · sin(5x)/(5x)', 'sin(5x)/(5x) → 1'], answer: '5' },
        ],
        practice: [
          { question: 'lim(x→2) (x² + 1)', answer: '5' },
          { question: 'lim(x→4) (√x − 2)/(x − 4)', answer: '1/4', hint: 'Multiply by the conjugate, or factor x − 4 = (√x − 2)(√x + 2).' },
          { question: 'lim(x→∞) (5x + 2)/(x² + 1)', answer: '0' },
        ],
      },
      {
        id: 'derivative-definition',
        title: 'The Derivative & Power Rule',
        minutes: 11,
        summary: 'The derivative is the instantaneous rate of change — the slope of the tangent line. The power rule makes computing it fast.',
        keyPoints: [
          'f′(x) is the limit of the slope of secant lines as the gap h shrinks to 0.',
          'Power rule: bring the exponent down, then subtract 1 from it.',
          'Derivatives of sums are sums of derivatives; constants factor out; the derivative of a constant is 0.',
          'Rewrite roots and fractions as powers first: √x = x^(1/2), 1/x² = x^(−2).',
        ],
        formulas: [
          { label: 'Definition', value: 'f′(x) = lim(h→0) [f(x + h) − f(x)] / h' },
          { label: 'Power rule', value: 'd/dx xⁿ = n xⁿ⁻¹' },
        ],
        examples: [
          { problem: 'Use the definition to differentiate f(x) = x².', steps: ['[(x + h)² − x²]/h = (2xh + h²)/h', '= 2x + h', 'As h → 0: 2x'], answer: 'f′(x) = 2x' },
          { problem: 'd/dx (4x³ − 5x² + 7x − 2)', steps: ['Apply the power rule term by term'], answer: '12x² − 10x + 7' },
          { problem: 'd/dx √x', steps: ['√x = x^(1/2)', '(1/2)x^(−1/2)'], answer: '1/(2√x)' },
        ],
        practice: [
          { question: 'd/dx x⁵', answer: '5x⁴' },
          { question: 'd/dx (3/x²)', answer: '−6/x³' },
          { question: 'Slope of y = x² − 4x at x = 3', answer: '2' },
        ],
      },
      {
        id: 'differentiation-rules',
        title: 'Product, Quotient & Chain Rules',
        minutes: 13,
        summary: 'These three rules, plus a short list of basic derivatives, let you differentiate almost any function.',
        keyPoints: [
          'Product rule for f·g, quotient rule for f/g.',
          'Chain rule for compositions: derivative of the outside (keep the inside) × derivative of the inside.',
          'Many problems need several rules together — work from the outside in.',
        ],
        formulas: [
          { label: 'Product', value: '(fg)′ = f′g + fg′' },
          { label: 'Quotient', value: '(f/g)′ = (f′g − fg′) / g²' },
          { label: 'Chain', value: 'd/dx f(g(x)) = f′(g(x)) · g′(x)' },
          { label: 'Basics', value: '(sin x)′ = cos x, (cos x)′ = −sin x, (eˣ)′ = eˣ, (ln x)′ = 1/x' },
        ],
        examples: [
          { problem: 'd/dx [x² sin x]', steps: ['Product rule: (2x)(sin x) + (x²)(cos x)'], answer: '2x sin x + x² cos x' },
          { problem: 'd/dx (3x² + 1)⁵', steps: ['Outside: 5(3x² + 1)⁴', 'Inside derivative: 6x', 'Multiply'], answer: '30x(3x² + 1)⁴' },
          { problem: 'd/dx [x/(x + 1)]', steps: ['Quotient: [(1)(x + 1) − x(1)]/(x + 1)²', '= 1/(x + 1)²'], answer: '1/(x + 1)²' },
        ],
        mistakes: ['Forgetting to multiply by the inner derivative in the chain rule.'],
        practice: [
          { question: 'd/dx e^(2x)', answer: '2e^(2x)' },
          { question: 'd/dx ln(x² + 1)', answer: '2x/(x² + 1)' },
          { question: 'd/dx (x eˣ)', answer: 'eˣ(x + 1)' },
          { question: 'd/dx cos(3x)', answer: '−3 sin(3x)' },
        ],
      },
      {
        id: 'derivative-applications',
        title: 'Applications: Tangents, Rates & Optimization',
        minutes: 14,
        summary: 'Derivatives give tangent line slopes, connect changing quantities (related rates), and find maximum and minimum values.',
        keyPoints: [
          'Tangent line at x = a: y − f(a) = f′(a)(x − a).',
          'Related rates: write an equation linking the quantities, differentiate with respect to time t, then substitute.',
          'Optimization: write the quantity as a function of one variable, set its derivative to 0, and check endpoints/second derivative.',
          'Velocity is the derivative of position; acceleration is the derivative of velocity.',
        ],
        examples: [
          { problem: 'Tangent line to y = x³ − 2x at x = 1', steps: ['y(1) = 1 − 2 = −1', 'y′ = 3x² − 2 → y′(1) = 1', 'y + 1 = 1(x − 1)'], answer: 'y = x − 2' },
          {
            problem: '100 m of fence encloses a rectangle. Maximize the area.',
            steps: ['2x + 2y = 100 → y = 50 − x', 'A = x(50 − x) = 50x − x²', 'A′ = 50 − 2x = 0 → x = 25', 'y = 25, A = 625'],
            answer: '25 m × 25 m, 625 m²',
          },
          {
            problem: 'A circle’s radius grows at 2 cm/s. How fast is the area growing when r = 5 cm?',
            steps: ['A = πr²', 'dA/dt = 2πr · dr/dt', '= 2π(5)(2) = 20π'],
            answer: '20π ≈ 62.83 cm²/s',
          },
        ],
        practice: [
          { question: 'Tangent line to y = x² at x = 3', answer: 'y = 6x − 9' },
          { question: 'Two positive numbers sum to 20. Maximize their product.', answer: '10 and 10, product 100' },
          { question: 's(t) = t³ − 6t² + 9t. Velocity at t = 2?', answer: '−3' },
        ],
      },
      {
        id: 'curve-sketching',
        title: 'Curve Sketching',
        minutes: 12,
        summary: 'The first derivative shows where a function rises and falls; the second derivative shows how it bends.',
        keyPoints: [
          'Critical points: f′(x) = 0 or f′ undefined.',
          'f′ > 0 → increasing; f′ < 0 → decreasing.',
          'First derivative test: f′ changes + to − → local max; − to + → local min.',
          'f″ > 0 → concave up (∪); f″ < 0 → concave down (∩). Inflection points are where concavity changes.',
          'Second derivative test: f′(c) = 0 and f″(c) > 0 → min; f″(c) < 0 → max.',
        ],
        examples: [
          {
            problem: 'Analyze f(x) = x³ − 3x² − 9x + 1.',
            steps: [
              'f′(x) = 3x² − 6x − 9 = 3(x − 3)(x + 1) → critical points x = −1, 3',
              'f″(x) = 6x − 6',
              'f″(−1) = −12 < 0 → local max f(−1) = 6',
              'f″(3) = 12 > 0 → local min f(3) = −26',
              'f″ = 0 at x = 1 → inflection point',
            ],
            answer: 'Max (−1, 6), min (3, −26), inflection at x = 1',
          },
        ],
        practice: [
          { question: 'Critical point of f(x) = x² − 8x. Max or min?', answer: 'x = 4, minimum' },
          { question: 'Where is f(x) = x³ concave up?', answer: 'x > 0' },
          { question: 'Inflection point of f(x) = x³ − 6x²', answer: 'x = 2' },
        ],
      },
    ],
  },
  {
    id: 'calculus-2',
    level: 'college',
    title: 'Calculus II: Integrals & Series',
    icon: 'water-outline',
    description: 'Antiderivatives, definite integrals, integration techniques, areas and volumes, and infinite series.',
    lessons: [
      {
        id: 'antiderivatives',
        title: 'Antiderivatives & Indefinite Integrals',
        minutes: 10,
        summary: 'Integration reverses differentiation. An indefinite integral is a family of antiderivatives, so always add + C.',
        keyPoints: [
          'Reverse power rule: add 1 to the exponent, then divide by the new exponent (n ≠ −1).',
          '∫ 1/x dx = ln|x| + C.',
          'Integrals of sums are sums of integrals; constants factor out.',
          'Check your answer by differentiating it.',
        ],
        formulas: [
          { label: 'Power', value: '∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C' },
          { label: 'Basics', value: '∫ eˣ dx = eˣ + C;  ∫ cos x dx = sin x + C;  ∫ sin x dx = −cos x + C' },
        ],
        examples: [
          { problem: '∫ (6x² − 4x + 3) dx', steps: ['6 · x³/3 − 4 · x²/2 + 3x'], answer: '2x³ − 2x² + 3x + C' },
          { problem: '∫ (1/x + eˣ) dx', steps: ['∫ 1/x dx = ln|x|', '∫ eˣ dx = eˣ'], answer: 'ln|x| + eˣ + C' },
        ],
        mistakes: ['Forgetting + C on indefinite integrals.'],
        practice: [
          { question: '∫ x⁴ dx', answer: 'x⁵/5 + C' },
          { question: '∫ √x dx', answer: '(2/3)x^(3/2) + C' },
          { question: '∫ 3 cos x dx', answer: '3 sin x + C' },
        ],
      },
      {
        id: 'definite-integrals',
        title: 'Definite Integrals & the Fundamental Theorem',
        minutes: 11,
        summary: 'A definite integral gives the net (signed) area under a curve. The Fundamental Theorem of Calculus evaluates it with any antiderivative.',
        keyPoints: [
          'FTC part 2: ∫ₐᵇ f(x) dx = F(b) − F(a), where F′ = f.',
          'FTC part 1: d/dx ∫ₐˣ f(t) dt = f(x).',
          'Area below the x-axis counts as negative.',
          '∫ₐᵃ f = 0 and ∫ₐᵇ f = −∫ᵇₐ f.',
        ],
        formulas: [{ label: 'FTC', value: '∫ₐᵇ f(x) dx = F(b) − F(a)' }],
        examples: [
          { problem: '∫₀² (3x² + 1) dx', steps: ['Antiderivative: x³ + x', '(8 + 2) − (0 + 0)'], answer: '10' },
          { problem: 'Area under y = sin x from 0 to π', steps: ['[−cos x]₀^π', '= −cos π + cos 0 = 1 + 1'], answer: '2' },
        ],
        practice: [
          { question: '∫₁³ 2x dx', answer: '8' },
          { question: '∫₀¹ eˣ dx', answer: 'e − 1 ≈ 1.718' },
          { question: 'd/dx ∫₀ˣ t² dt', answer: 'x²' },
        ],
      },
      {
        id: 'u-substitution',
        title: 'u-Substitution',
        minutes: 11,
        summary: 'u-substitution reverses the chain rule: spot an inner function whose derivative also appears in the integrand.',
        keyPoints: [
          'Choose u = the inner function; compute du = u′ dx.',
          'Rewrite the whole integral in terms of u, integrate, then substitute back.',
          'For definite integrals, change the limits to u-values (or substitute back before evaluating).',
        ],
        examples: [
          { problem: '∫ 2x(x² + 1)⁴ dx', steps: ['u = x² + 1, du = 2x dx', '∫ u⁴ du = u⁵/5 + C', 'Substitute back'], answer: '(x² + 1)⁵/5 + C' },
          { problem: '∫₀¹ x e^(x²) dx', steps: ['u = x², du = 2x dx → x dx = du/2', 'Limits: x = 0 → u = 0; x = 1 → u = 1', '½ ∫₀¹ eᵘ du = ½(e − 1)'], answer: '(e − 1)/2 ≈ 0.859' },
        ],
        practice: [
          { question: '∫ cos(3x) dx', answer: '(1/3) sin(3x) + C' },
          { question: '∫ x/(x² + 4) dx', answer: '½ ln(x² + 4) + C' },
          { question: '∫ (ln x)/x dx', answer: '(ln x)²/2 + C' },
        ],
      },
      {
        id: 'integration-by-parts',
        title: 'Integration by Parts',
        minutes: 11,
        summary: 'Integration by parts reverses the product rule. Pick u to be the part that simplifies when differentiated.',
        keyPoints: [
          'LIATE for choosing u: Logarithmic, Inverse trig, Algebraic, Trig, Exponential.',
          'Sometimes you must apply it twice, or solve for the original integral algebraically.',
        ],
        formulas: [{ label: 'By parts', value: '∫ u dv = uv − ∫ v du' }],
        examples: [
          { problem: '∫ x eˣ dx', steps: ['u = x, dv = eˣ dx → du = dx, v = eˣ', 'x eˣ − ∫ eˣ dx'], answer: 'eˣ(x − 1) + C' },
          { problem: '∫ ln x dx', steps: ['u = ln x, dv = dx → du = dx/x, v = x', 'x ln x − ∫ x · (1/x) dx'], answer: 'x ln x − x + C' },
        ],
        practice: [
          { question: '∫ x cos x dx', answer: 'x sin x + cos x + C' },
          { question: '∫ x ln x dx', answer: '(x²/2) ln x − x²/4 + C' },
          { question: '∫₀¹ x eˣ dx', answer: '1' },
        ],
      },
      {
        id: 'area-volume',
        title: 'Area Between Curves & Volumes',
        minutes: 12,
        summary: 'Integrals add up thin slices: rectangles for area between curves, disks for volumes of revolution.',
        keyPoints: [
          'Area between curves: ∫ (top − bottom) dx over the interval where they’re ordered.',
          'Find intersection points to get the limits.',
          'Disk method (around the x-axis): V = π ∫ [f(x)]² dx.',
          'Washer method: V = π ∫ (R² − r²) dx.',
        ],
        formulas: [
          { label: 'Area', value: 'A = ∫ₐᵇ (f(x) − g(x)) dx' },
          { label: 'Disk', value: 'V = π ∫ₐᵇ [f(x)]² dx' },
        ],
        examples: [
          { problem: 'Area between y = x and y = x² on [0, 1].', steps: ['On [0, 1], x ≥ x²', '∫₀¹ (x − x²) dx = 1/2 − 1/3'], answer: '1/6' },
          { problem: 'Rotate y = √x on [0, 4] about the x-axis. Volume?', steps: ['V = π ∫₀⁴ (√x)² dx = π ∫₀⁴ x dx', '= π · 16/2'], answer: '8π' },
        ],
        practice: [
          { question: 'Area between y = 4 − x² and the x-axis', answer: '32/3' },
          { question: 'Rotate y = x on [0, 3] about the x-axis. Volume?', answer: '9π' },
        ],
      },
      {
        id: 'series',
        title: 'Infinite Series & Taylor Series',
        minutes: 14,
        summary: 'An infinite series converges when its partial sums approach a finite value. Taylor series represent functions as infinite polynomials.',
        keyPoints: [
          'Divergence test: if the terms don’t approach 0, the series diverges.',
          'Geometric series Σ arⁿ converges iff |r| < 1.',
          'p-series Σ 1/nᵖ converges iff p > 1 (the harmonic series p = 1 diverges).',
          'Ratio test: L = lim |aₙ₊₁/aₙ|. L < 1 converges, L > 1 diverges, L = 1 inconclusive.',
        ],
        formulas: [
          { label: 'eˣ', value: '1 + x + x²/2! + x³/3! + …' },
          { label: 'sin x', value: 'x − x³/3! + x⁵/5! − …' },
          { label: 'cos x', value: '1 − x²/2! + x⁴/4! − …' },
          { label: '1/(1 − x)', value: '1 + x + x² + …, |x| < 1' },
        ],
        examples: [
          { problem: 'Does Σ 1/n² converge?', steps: ['p-series with p = 2 > 1'], answer: 'Converges' },
          { problem: 'Does Σ n/(n + 1) converge?', steps: ['Terms → 1, not 0', 'Divergence test'], answer: 'Diverges' },
          { problem: 'Does Σ 2ⁿ/n! converge?', steps: ['Ratio: [2ⁿ⁺¹/(n + 1)!] / [2ⁿ/n!] = 2/(n + 1)', 'Limit = 0 < 1'], answer: 'Converges' },
        ],
        practice: [
          { question: 'Σ (1/3)ⁿ from n = 0 to ∞', answer: '3/2' },
          { question: 'Does Σ 1/√n converge?', answer: 'No — p-series with p = 1/2' },
          { question: 'First three nonzero terms of sin x', answer: 'x − x³/6 + x⁵/120' },
        ],
      },
    ],
  },
  {
    id: 'multivariable',
    level: 'college',
    title: 'Multivariable Calculus',
    icon: 'cube-outline',
    description: 'Partial derivatives, gradients, optimization in two variables, and double integrals.',
    lessons: [
      {
        id: 'partial-derivatives',
        title: 'Partial Derivatives & the Gradient',
        minutes: 11,
        summary: 'A partial derivative differentiates with respect to one variable while holding the others constant.',
        keyPoints: [
          'f_x: treat y as a constant. f_y: treat x as a constant.',
          'Gradient ∇f = ⟨f_x, f_y⟩ points in the direction of steepest increase.',
          'Directional derivative: D_u f = ∇f · u (u a unit vector).',
        ],
        formulas: [
          { label: 'Gradient', value: '∇f = ⟨∂f/∂x, ∂f/∂y⟩' },
          { label: 'Directional', value: 'D_u f = ∇f · u' },
        ],
        examples: [
          {
            problem: 'f(x, y) = x²y + 3xy³. Find f_x, f_y and ∇f(1, 2).',
            steps: ['f_x = 2xy + 3y³', 'f_y = x² + 9xy²', '∇f(1, 2) = ⟨4 + 24, 1 + 36⟩'],
            answer: '⟨28, 37⟩',
          },
        ],
        practice: [
          { question: 'f = x³ + y². Find f_x.', answer: '3x²' },
          { question: 'f = e^(xy). Find f_y.', answer: 'x e^(xy)' },
          { question: '∇(x² + y²) at (3, 4)', answer: '⟨6, 8⟩' },
        ],
      },
      {
        id: 'multivariable-optimization',
        title: 'Optimization in Two Variables',
        minutes: 11,
        summary: 'Critical points occur where the gradient is zero. The second derivative test classifies them.',
        keyPoints: [
          'Solve f_x = 0 and f_y = 0 together.',
          'D = f_xx · f_yy − (f_xy)².',
          'D > 0 and f_xx > 0 → local min; D > 0 and f_xx < 0 → local max; D < 0 → saddle point; D = 0 → inconclusive.',
        ],
        formulas: [{ label: 'Discriminant', value: 'D = f_xx f_yy − (f_xy)²' }],
        examples: [
          {
            problem: 'Classify the critical point of f = x² + y² − 4x + 6y.',
            steps: ['f_x = 2x − 4 = 0 → x = 2', 'f_y = 2y + 6 = 0 → y = −3', 'D = (2)(2) − 0 = 4 > 0, f_xx = 2 > 0', 'f(2, −3) = 4 + 9 − 8 − 18 = −13'],
            answer: 'Local minimum −13 at (2, −3)',
          },
        ],
        practice: [
          { question: 'Classify the critical point of f = x² − y².', answer: 'Saddle point at (0, 0)' },
          { question: 'Classify the critical point of f = x² + xy + y².', answer: 'Local minimum at (0, 0), D = 3' },
        ],
      },
      {
        id: 'double-integrals',
        title: 'Double Integrals',
        minutes: 12,
        summary: 'Double integrals add up a function over a 2D region — giving volume under a surface, or area when the integrand is 1.',
        keyPoints: [
          'Evaluate as iterated integrals: integrate the inside first, treating the other variable as constant.',
          'Fubini: on rectangles you can switch the order of integration.',
          'Polar coordinates for circular regions: dA = r dr dθ.',
        ],
        formulas: [{ label: 'Polar', value: '∬ f dA = ∫∫ f(r cos θ, r sin θ) r dr dθ' }],
        examples: [
          { problem: '∫₀¹ ∫₀² (x + y) dy dx', steps: ['Inner: [xy + y²/2]₀² = 2x + 2', 'Outer: ∫₀¹ (2x + 2) dx = 1 + 2'], answer: '3' },
          { problem: 'Area of a circle of radius R using polar coordinates', steps: ['∫₀^{2π} ∫₀^R r dr dθ', '= 2π · R²/2'], answer: 'πR²' },
        ],
        practice: [
          { question: '∫₀² ∫₀³ 1 dy dx', answer: '6' },
          { question: '∫₀¹ ∫₀¹ xy dy dx', answer: '1/4' },
          { question: '∬ 1 dA over the disk r ≤ 2', answer: '4π' },
        ],
      },
    ],
  },
  {
    id: 'linear-algebra',
    level: 'college',
    title: 'Linear Algebra',
    icon: 'apps-outline',
    description: 'Vectors, matrices, determinants and inverses, Gaussian elimination, and eigenvalues.',
    lessons: [
      {
        id: 'vectors',
        title: 'Vectors & the Dot Product',
        minutes: 11,
        summary: 'Vectors have magnitude and direction. The dot product measures how aligned two vectors are; the cross product gives a perpendicular vector.',
        keyPoints: [
          'Magnitude: |v| = √(v₁² + v₂² + …).',
          'Dot product: u · v = u₁v₁ + u₂v₂ + … = |u||v| cos θ.',
          'u · v = 0 means u and v are orthogonal (perpendicular).',
          'Unit vector: v / |v|.',
        ],
        formulas: [
          { label: 'Angle', value: 'cos θ = (u · v) / (|u||v|)' },
          { label: 'Cross product', value: 'u × v = ⟨u₂v₃ − u₃v₂, u₃v₁ − u₁v₃, u₁v₂ − u₂v₁⟩' },
        ],
        examples: [
          {
            problem: 'u = ⟨1, 2, 2⟩, v = ⟨3, 0, −4⟩. Find u · v, the angle, and u × v.',
            steps: ['u · v = 3 + 0 − 8 = −5', '|u| = 3, |v| = 5 → cos θ = −5/15 = −1/3 → θ ≈ 109.47°', 'u × v = ⟨2(−4) − 2(0), 2(3) − 1(−4), 1(0) − 2(3)⟩ = ⟨−8, 10, −6⟩'],
            answer: 'u · v = −5, θ ≈ 109.47°, u × v = ⟨−8, 10, −6⟩',
          },
        ],
        practice: [
          { question: '|⟨6, 8⟩|', answer: '10' },
          { question: 'Are ⟨2, −1⟩ and ⟨1, 2⟩ orthogonal?', answer: 'Yes, the dot product is 0' },
          { question: 'Unit vector in the direction of ⟨3, 4⟩', answer: '⟨3/5, 4/5⟩' },
        ],
      },
      {
        id: 'matrices',
        title: 'Matrix Operations',
        minutes: 11,
        summary: 'Matrices are rectangular arrays of numbers. Multiplication combines rows of the first with columns of the second.',
        keyPoints: [
          'Add/subtract entry by entry (same dimensions only).',
          'An m×n matrix times an n×p matrix gives an m×p matrix; the inner dimensions must match.',
          'Entry (i, j) of AB = row i of A · column j of B.',
          'Matrix multiplication is NOT commutative: usually AB ≠ BA.',
          'Notation here: [a b; c d] means rows (a, b) and (c, d).',
        ],
        examples: [
          {
            problem: 'A = [1 2; 3 4], B = [0 1; 5 −2]. Find AB.',
            steps: ['Row 1: (1·0 + 2·5, 1·1 + 2·(−2)) = (10, −3)', 'Row 2: (3·0 + 4·5, 3·1 + 4·(−2)) = (20, −5)'],
            answer: '[10 −3; 20 −5]',
          },
        ],
        practice: [
          { question: 'Can you multiply a 2×3 matrix by a 2×3 matrix?', answer: 'No — inner dimensions 3 and 2 don’t match' },
          { question: 'Dimensions of a (3×2)(2×4) product', answer: '3×4' },
          { question: '[2 0; 0 2] × [1 3; −1 4]', answer: '[2 6; −2 8]' },
        ],
      },
      {
        id: 'determinants-inverses',
        title: 'Determinants & Inverses',
        minutes: 12,
        summary: 'The determinant tells whether a square matrix is invertible. A matrix has an inverse exactly when its determinant is nonzero.',
        keyPoints: [
          '2×2: det [a b; c d] = ad − bc.',
          '3×3: expand along a row using cofactors (signs + − +).',
          'A⁻¹ exists ⇔ det A ≠ 0. Then A A⁻¹ = I.',
          'det(AB) = det A · det B.',
        ],
        formulas: [{ label: '2×2 inverse', value: '[a b; c d]⁻¹ = (1/(ad − bc)) [d −b; −c a]' }],
        examples: [
          { problem: 'Find the inverse of A = [4 7; 2 6].', steps: ['det = 24 − 14 = 10', 'A⁻¹ = (1/10)[6 −7; −2 4]'], answer: '[0.6 −0.7; −0.2 0.4]' },
          {
            problem: 'det [1 2 3; 0 1 4; 5 6 0]',
            steps: ['Expand along row 1', '1(1·0 − 4·6) − 2(0·0 − 4·5) + 3(0·6 − 1·5)', '= −24 + 40 − 15'],
            answer: '1',
          },
        ],
        practice: [
          { question: 'det [3 8; 4 6]', answer: '−14' },
          { question: 'Is [2 4; 1 2] invertible?', answer: 'No — det = 0' },
          { question: 'Inverse of [2 1; 5 3]', answer: '[3 −1; −5 2]' },
        ],
      },
      {
        id: 'gaussian-elimination',
        title: 'Solving Systems with Gaussian Elimination',
        minutes: 12,
        summary: 'Write the system as an augmented matrix, use row operations to reach row-echelon form, then back-substitute.',
        keyPoints: [
          'Row operations: swap rows, multiply a row by a nonzero number, add a multiple of one row to another.',
          'Goal: zeros below each leading entry (row-echelon form).',
          'A row [0 0 0 | c] with c ≠ 0 means no solution. A row of all zeros may mean infinitely many solutions.',
        ],
        examples: [
          {
            problem: 'x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2',
            steps: [
              'R2 − 2R1: −3y − z = −9',
              'R3 − R1: y − 2z = −4 → y = 2z − 4',
              'Substitute: −3(2z − 4) − z = −9 → −7z = −21 → z = 3',
              'y = 2(3) − 4 = 2; x = 6 − 2 − 3 = 1',
            ],
            answer: '(x, y, z) = (1, 2, 3)',
          },
        ],
        practice: [
          { question: 'Solve 2x + y = 5, x − y = 1.', answer: 'x = 2, y = 1' },
          { question: 'After elimination, a row reads [0 0 0 | 5]. What does this mean?', answer: 'The system is inconsistent — no solution' },
        ],
      },
      {
        id: 'eigenvalues',
        title: 'Eigenvalues & Eigenvectors',
        minutes: 13,
        summary: 'An eigenvector keeps its direction when the matrix acts on it; it just gets scaled by the eigenvalue λ.',
        keyPoints: [
          'Av = λv with v ≠ 0.',
          'Eigenvalues solve the characteristic equation det(A − λI) = 0.',
          'For each λ, eigenvectors are the nonzero solutions of (A − λI)v = 0.',
          'Sum of eigenvalues = trace; product of eigenvalues = determinant.',
        ],
        formulas: [{ label: 'Characteristic eq.', value: 'det(A − λI) = 0' }],
        examples: [
          {
            problem: 'Eigenvalues and eigenvectors of A = [4 1; 2 3]',
            steps: [
              'det [4 − λ, 1; 2, 3 − λ] = (4 − λ)(3 − λ) − 2 = λ² − 7λ + 10',
              '(λ − 5)(λ − 2) = 0 → λ = 5, 2',
              'λ = 5: [−1 1; 2 −2]v = 0 → v = ⟨1, 1⟩',
              'λ = 2: [2 1; 2 1]v = 0 → v = ⟨1, −2⟩',
            ],
            answer: 'λ = 5 with ⟨1, 1⟩; λ = 2 with ⟨1, −2⟩',
          },
        ],
        practice: [
          { question: 'Eigenvalues of [3 0; 0 −1]', answer: '3 and −1' },
          { question: 'Eigenvalues of [2 1; 1 2]', answer: '1 and 3' },
          { question: 'The sum of a matrix’s eigenvalues equals its…', answer: 'Trace' },
        ],
      },
    ],
  },
  {
    id: 'differential-equations',
    level: 'college',
    title: 'Differential Equations',
    icon: 'repeat-outline',
    description: 'Separable equations, first-order linear equations, and second-order equations with constant coefficients.',
    lessons: [
      {
        id: 'separable',
        title: 'Separable Equations & Exponential Models',
        minutes: 11,
        summary: 'If you can put all the y’s on one side and all the x’s on the other, integrate both sides.',
        keyPoints: [
          'dy/dx = g(x) h(y) → ∫ dy/h(y) = ∫ g(x) dx.',
          'Use an initial condition to find the constant C.',
          'dy/dt = ky gives y = y₀ e^(kt): exponential growth (k > 0) or decay (k < 0).',
        ],
        formulas: [{ label: 'Growth/decay', value: 'dy/dt = ky ⇒ y = y₀ e^(kt)' }],
        examples: [
          {
            problem: 'dy/dx = xy, y(0) = 2',
            steps: ['∫ dy/y = ∫ x dx', 'ln|y| = x²/2 + C → y = C e^(x²/2)', 'y(0) = 2 → C = 2'],
            answer: 'y = 2e^(x²/2)',
          },
          { problem: 'Bacteria double every 3 hours. Find k.', steps: ['2 = e^(3k)', 'k = ln 2 / 3'], answer: 'k ≈ 0.231 per hour' },
        ],
        practice: [
          { question: 'dy/dx = 3x², y(0) = 1', answer: 'y = x³ + 1' },
          { question: 'dy/dt = −0.5y, y(0) = 10', answer: 'y = 10e^(−0.5t)' },
          { question: 'dy/dx = y² (general solution)', answer: 'y = −1/(x + C)' },
        ],
      },
      {
        id: 'first-order-linear',
        title: 'First-Order Linear Equations',
        minutes: 12,
        summary: 'Equations of the form y′ + P(x)y = Q(x) are solved by multiplying through by an integrating factor.',
        keyPoints: [
          'Integrating factor: μ(x) = e^(∫P(x) dx).',
          'Multiplying by μ turns the left side into (μy)′.',
          'Integrate both sides, then divide by μ.',
        ],
        formulas: [
          { label: 'Integrating factor', value: 'μ = e^(∫P dx)' },
          { label: 'Solution', value: 'y = (1/μ) ∫ μQ dx' },
        ],
        examples: [
          {
            problem: 'y′ + 2y = 4',
            steps: ['μ = e^(2x)', '(e^(2x) y)′ = 4e^(2x)', 'e^(2x) y = 2e^(2x) + C'],
            answer: 'y = 2 + Ce^(−2x)',
          },
          {
            problem: 'y′ + y/x = x (x > 0)',
            steps: ['μ = e^(ln x) = x', '(xy)′ = x²', 'xy = x³/3 + C'],
            answer: 'y = x²/3 + C/x',
          },
        ],
        practice: [
          { question: 'y′ − y = 0', answer: 'y = Ceˣ' },
          { question: 'Integrating factor for y′ + 3y = x', answer: 'e^(3x)' },
          { question: 'y′ + y = 1, y(0) = 0', answer: 'y = 1 − e^(−x)' },
        ],
      },
      {
        id: 'second-order',
        title: 'Second-Order Linear (Constant Coefficients)',
        minutes: 13,
        summary: 'For ay″ + by′ + cy = 0, guess y = e^(rx). This turns the ODE into a quadratic — the characteristic equation.',
        keyPoints: [
          'Characteristic equation: ar² + br + c = 0.',
          'Distinct real roots r₁, r₂ → y = C₁e^(r₁x) + C₂e^(r₂x).',
          'Repeated root r → y = (C₁ + C₂x)e^(rx).',
          'Complex roots α ± βi → y = e^(αx)(C₁ cos βx + C₂ sin βx).',
        ],
        examples: [
          { problem: 'y″ − 5y′ + 6y = 0', steps: ['r² − 5r + 6 = 0 → r = 2, 3'], answer: 'y = C₁e^(2x) + C₂e^(3x)' },
          { problem: 'y″ + 4y = 0', steps: ['r² + 4 = 0 → r = ±2i (α = 0, β = 2)'], answer: 'y = C₁ cos 2x + C₂ sin 2x' },
          { problem: 'y″ + 2y′ + y = 0', steps: ['r² + 2r + 1 = 0 → r = −1 (repeated)'], answer: 'y = (C₁ + C₂x)e^(−x)' },
        ],
        practice: [
          { question: 'y″ − y = 0', answer: 'y = C₁eˣ + C₂e^(−x)' },
          { question: 'y″ + 9y = 0', answer: 'y = C₁ cos 3x + C₂ sin 3x' },
          { question: 'y″ − 4y′ + 4y = 0', answer: 'y = (C₁ + C₂x)e^(2x)' },
          { question: 'y″ + 2y′ + 5y = 0', answer: 'y = e^(−x)(C₁ cos 2x + C₂ sin 2x)' },
        ],
      },
    ],
  },
  {
    id: 'discrete-math',
    level: 'college',
    title: 'Discrete Mathematics',
    icon: 'git-branch-outline',
    description: 'Logic, sets, proof techniques including induction, and graph theory.',
    lessons: [
      {
        id: 'logic',
        title: 'Propositional Logic',
        minutes: 11,
        summary: 'Logic studies statements that are true or false and how connectives combine them.',
        keyPoints: [
          'Connectives: ¬ (not), ∧ (and), ∨ (or), → (if…then), ↔ (if and only if).',
          'p → q is false only when p is true and q is false.',
          'A conditional is equivalent to its contrapositive (¬q → ¬p), not its converse (q → p).',
          'De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q and ¬(p ∨ q) ≡ ¬p ∧ ¬q.',
          'Negating quantifiers: ¬(∀x P) ≡ ∃x ¬P.',
        ],
        examples: [
          { problem: 'Negate “All students passed.”', steps: ['¬(∀ students: passed) ≡ ∃ a student: not passed'], answer: '“Some student did not pass.”' },
          { problem: 'Contrapositive of “If it rains, the ground is wet.”', steps: ['p → q becomes ¬q → ¬p'], answer: '“If the ground is not wet, it did not rain.”' },
        ],
        practice: [
          { question: 'Simplify ¬(p ∧ q) using De Morgan’s law.', answer: '¬p ∨ ¬q' },
          { question: 'Is p → q equivalent to its converse q → p?', answer: 'No' },
          { question: 'Truth value of “If 2 + 2 = 5, then the moon is made of cheese.”', answer: 'True — a false hypothesis makes the conditional true' },
        ],
      },
      {
        id: 'sets',
        title: 'Sets & Venn Diagrams',
        minutes: 9,
        summary: 'A set is a collection of distinct objects. Set operations combine and compare collections.',
        keyPoints: [
          'A ∪ B: in A or B. A ∩ B: in both. A − B: in A but not B. Aᶜ: not in A.',
          'Inclusion–exclusion: |A ∪ B| = |A| + |B| − |A ∩ B|.',
          'A set with n elements has 2ⁿ subsets.',
          '|A × B| = |A| · |B|.',
        ],
        formulas: [{ label: 'Inclusion–exclusion', value: '|A ∪ B| = |A| + |B| − |A ∩ B|' }],
        examples: [
          { problem: 'A = {1, 2, 3, 4}, B = {3, 4, 5}. Find A ∪ B, A ∩ B, A − B.', steps: ['Union: everything in either', 'Intersection: shared elements', 'Difference: in A only'], answer: '{1, 2, 3, 4, 5}, {3, 4}, {1, 2}' },
          { problem: '30 like tea, 25 like coffee, 10 like both. How many like at least one?', steps: ['30 + 25 − 10'], answer: '45' },
        ],
        practice: [
          { question: 'How many subsets does {a, b, c} have?', answer: '8' },
          { question: '|A| = 3, |B| = 4. Find |A × B|.', answer: '12' },
          { question: '100 students: 60 math, 50 physics, 20 both. How many take neither?', answer: '10' },
        ],
      },
      {
        id: 'proofs-induction',
        title: 'Proof Techniques & Induction',
        minutes: 13,
        summary: 'Proofs establish statements with certainty. Mathematical induction proves statements for all natural numbers.',
        keyPoints: [
          'Direct proof: assume the hypothesis, reason step by step to the conclusion.',
          'Contrapositive: to prove p → q, prove ¬q → ¬p instead.',
          'Contradiction: assume the statement is false and derive something impossible.',
          'Induction: prove a base case, then show “true for k” implies “true for k + 1”.',
        ],
        examples: [
          {
            problem: 'Prove 1 + 2 + … + n = n(n + 1)/2 for all n ≥ 1.',
            steps: [
              'Base case n = 1: left side 1, right side 1(2)/2 = 1 ✓',
              'Inductive hypothesis: assume 1 + … + k = k(k + 1)/2',
              'Then 1 + … + k + (k + 1) = k(k + 1)/2 + (k + 1)',
              '= (k + 1)(k + 2)/2, the formula for n = k + 1 ✓',
            ],
            answer: 'True for all n ≥ 1 by induction',
          },
          {
            problem: 'Prove the sum of two even numbers is even.',
            steps: ['Let the numbers be 2a and 2b for integers a, b', '2a + 2b = 2(a + b), and a + b is an integer'],
            answer: 'The sum is even',
          },
        ],
        practice: [
          { question: 'What two steps does every induction proof need?', answer: 'A base case and an inductive step' },
          { question: 'To prove “if n² is even then n is even” by contrapositive, what do you prove?', answer: '“If n is odd, then n² is odd.”' },
        ],
      },
      {
        id: 'graph-theory',
        title: 'Graph Theory Basics',
        minutes: 10,
        summary: 'A graph is a set of vertices joined by edges. Graphs model networks, maps, schedules and more.',
        keyPoints: [
          'Degree of a vertex = number of edges touching it.',
          'Handshake lemma: the sum of all degrees = 2 × number of edges (so it’s always even).',
          'A tree with n vertices has exactly n − 1 edges and no cycles.',
          'Euler circuit: all degrees even. Euler path (not circuit): exactly two odd-degree vertices.',
          'The complete graph Kₙ has n(n − 1)/2 edges.',
        ],
        examples: [
          {
            problem: 'A connected graph has vertex degrees 3, 3, 2, 2, 2. How many edges? Euler path or circuit?',
            steps: ['Sum of degrees = 12 → edges = 6', 'Exactly two odd-degree vertices'],
            answer: '6 edges; Euler path but no Euler circuit',
          },
        ],
        practice: [
          { question: 'Edges in a tree with 10 vertices?', answer: '9' },
          { question: 'Can a graph have degrees 3, 3, 3?', answer: 'No — the degree sum 9 is odd' },
          { question: 'Edges in K₅?', answer: '10' },
        ],
      },
    ],
  },
  {
    id: 'statistics-college',
    level: 'college',
    title: 'Probability & Statistics',
    icon: 'podium-outline',
    description: 'Expected value, the binomial distribution, the Central Limit Theorem, confidence intervals and hypothesis tests.',
    lessons: [
      {
        id: 'distributions',
        title: 'Expected Value & the Binomial Distribution',
        minutes: 12,
        summary: 'Expected value is the long-run average of a random variable. The binomial distribution counts successes in n independent trials.',
        keyPoints: [
          'E[X] = Σ x · P(x).',
          'Binomial setting: fixed n trials, two outcomes, constant success probability p, independent trials.',
          'Binomial mean np, variance np(1 − p).',
        ],
        formulas: [
          { label: 'Expected value', value: 'E[X] = Σ x P(x)' },
          { label: 'Binomial', value: 'P(X = k) = C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ' },
          { label: 'Mean & SD', value: 'μ = np,  σ = √(np(1 − p))' },
        ],
        examples: [
          { problem: 'A game pays $10 with probability 0.2 and costs $3 otherwise. Expected value?', steps: ['E = 10(0.2) + (−3)(0.8)', '= 2 − 2.4'], answer: '−$0.40 per game' },
          { problem: 'n = 10, p = 0.3. Find P(X = 2).', steps: ['C(10, 2) = 45', '45 × 0.3² × 0.7⁸', '= 45 × 0.09 × 0.05765'], answer: '≈ 0.2335' },
        ],
        practice: [
          { question: 'Mean and SD of a binomial with n = 100, p = 0.5', answer: 'μ = 50, σ = 5' },
          { question: 'Expected value of a fair six-sided die', answer: '3.5' },
          { question: 'P(exactly 3 heads in 4 fair flips)', answer: '4/16 = 1/4' },
        ],
      },
      {
        id: 'sampling-clt',
        title: 'Sampling Distributions & the CLT',
        minutes: 11,
        summary: 'Sample means vary from sample to sample. The Central Limit Theorem says their distribution is approximately normal for large samples.',
        keyPoints: [
          'The mean of x̄ equals the population mean μ.',
          'Standard error of x̄ = σ/√n: larger samples give less variability.',
          'CLT: for n ≥ 30 (roughly), x̄ is approximately normal regardless of the population’s shape.',
        ],
        formulas: [
          { label: 'Standard error', value: 'SE = σ / √n' },
          { label: 'z for a mean', value: 'z = (x̄ − μ) / (σ/√n)' },
        ],
        examples: [
          {
            problem: 'μ = 50, σ = 12, n = 36. Find P(x̄ > 53).',
            steps: ['SE = 12/√36 = 2', 'z = (53 − 50)/2 = 1.5', 'P(z > 1.5) ≈ 0.0668'],
            answer: '≈ 0.0668',
          },
        ],
        practice: [
          { question: 'SE when σ = 20, n = 100', answer: '2' },
          { question: 'To halve the standard error, multiply n by…', answer: '4' },
        ],
      },
      {
        id: 'confidence-intervals',
        title: 'Confidence Intervals',
        minutes: 12,
        summary: 'A confidence interval gives a range of plausible values for a population parameter: estimate ± margin of error.',
        keyPoints: [
          'Mean (σ known): x̄ ± z* · σ/√n. Use t* with s when σ is unknown.',
          'Proportion: p̂ ± z* · √(p̂(1 − p̂)/n).',
          'Critical values z*: 1.645 (90%), 1.96 (95%), 2.576 (99%).',
          'Higher confidence → wider interval. Larger n → narrower interval.',
          '“95% confident” means 95% of such intervals capture the true parameter.',
        ],
        formulas: [
          { label: 'Mean', value: 'x̄ ± z* σ/√n' },
          { label: 'Proportion', value: 'p̂ ± z* √(p̂(1 − p̂)/n)' },
        ],
        examples: [
          { problem: 'x̄ = 72, σ = 10, n = 25. Find a 95% CI.', steps: ['SE = 10/5 = 2', 'ME = 1.96 × 2 = 3.92', '72 ± 3.92'], answer: '(68.08, 75.92)' },
          {
            problem: '540 of 900 people agree. Find a 95% CI for the proportion.',
            steps: ['p̂ = 0.6', 'SE = √(0.6 × 0.4/900) ≈ 0.0163', 'ME = 1.96 × 0.0163 ≈ 0.032'],
            answer: '(0.568, 0.632)',
          },
        ],
        practice: [
          { question: 'Margin of error with z* = 1.96, σ = 15, n = 100', answer: '2.94' },
          { question: 'Which is wider: a 90% or a 99% interval?', answer: '99%' },
        ],
      },
      {
        id: 'hypothesis-testing',
        title: 'Hypothesis Testing',
        minutes: 13,
        summary: 'A hypothesis test asks whether sample data give convincing evidence against a default claim (the null hypothesis).',
        keyPoints: [
          'H₀: the null (no effect / status quo). H₁: the alternative you want evidence for.',
          'p-value: the probability of results at least this extreme if H₀ were true.',
          'If p < α (often 0.05), reject H₀. Otherwise, fail to reject H₀ (never “accept” it).',
          'Type I error: rejecting a true H₀ (probability α). Type II error: failing to reject a false H₀.',
        ],
        formulas: [{ label: 'Test statistic', value: 'z = (x̄ − μ₀) / (σ/√n)' }],
        examples: [
          {
            problem: 'Claim μ = 500. A sample of n = 64 has x̄ = 510, with σ = 40. Test at α = 0.05 (two-tailed).',
            steps: ['SE = 40/8 = 5', 'z = (510 − 500)/5 = 2.0', 'Two-tailed p ≈ 2 × 0.0228 = 0.0455', '0.0455 < 0.05'],
            answer: 'Reject H₀ — significant evidence that μ ≠ 500',
          },
        ],
        practice: [
          { question: 'p = 0.03 and α = 0.05. Decision?', answer: 'Reject H₀' },
          { question: 'What is a Type I error?', answer: 'Rejecting a null hypothesis that is actually true' },
          { question: 'z = 1.2, two-tailed, α = 0.05. Decision?', answer: 'Fail to reject H₀ (|z| < 1.96)' },
        ],
      },
    ],
  },
];
