# BuilderBootcamp Website Design Specification

## 1. Design Direction

BuilderBootcamp should feel like a **modern technology school built for
ambitious students**: clean, energetic, confident, practical, and
trustworthy.

The supplied BuilderBootcamp logo uses a distinctive **bright orange**
symbol on a very light background. The website should build its visual
identity around that orange rather than introducing unrelated brand
colors.

### Brand personality

-   **Energetic** --- orange communicates action, creativity, and
    momentum.
-   **Modern** --- use clean layouts, generous whitespace, rounded
    cards, and contemporary typography.
-   **Student-friendly** --- avoid an overly corporate or intimidating
    appearance.
-   **Practical** --- emphasize building, projects, skills, and results.
-   **Confident** --- strong headings and clear calls-to-action.
-   **Premium but accessible** --- the interface should look polished
    without feeling expensive or exclusive.

------------------------------------------------------------------------

# 2. Logo & Brand Mark

Use the provided BuilderBootcamp logo as the primary brand mark.

### Logo treatment

-   Keep the original proportions.
-   Never stretch or distort the logo.
-   Do not add unnecessary effects, shadows, outlines, or gradients to
    the logo.
-   Maintain sufficient whitespace around the logo.
-   On light backgrounds, use the supplied orange logo.
-   If a dark hero section is introduced, use an approved light/white
    logo variant only if one becomes available.
-   Do not recreate the logo using a text approximation.

### Recommended logo placement

**Desktop header:** - Logo mark + `BuilderBootcamp` - Height:
approximately 38--46px - Keep the logo visually prominent but not
oversized.

**Mobile header:** - Logo height: approximately 32--38px.

The logo should be clickable and return users to the homepage.

------------------------------------------------------------------------

# 3. Brand Color System

The supplied logo is dominated by approximately **#FF8500**, which
should become the primary BuilderBootcamp brand color.

### Core palette

  Token              Color       Usage
  ------------------ ----------- ---------------------------------
  `--brand-orange`   `#FF8500`   Primary brand, CTAs, highlights
  `--orange-dark`    `#E87500`   Hover/active states
  `--orange-light`   `#FFF3E6`   Soft backgrounds and badges
  `--ink`            `#111827`   Main headings
  `--text`           `#374151`   Body text
  `--muted`          `#6B7280`   Secondary text
  `--surface`        `#FFFFFF`   Cards and main surfaces
  `--surface-soft`   `#FFFDFC`   Alternating sections
  `--border`         `#E5E7EB`   Borders and dividers
  `--success`        `#16A34A`   Successful states
  `--danger`         `#DC2626`   Error states

### Important color rule

Do not turn the entire page orange.

Use orange strategically for: - Primary CTA buttons - Logo - Small
highlights - Icons - Course labels - Important statistics - Hover
states - Decorative shapes

The majority of the interface should remain white, off-white, or very
light neutral tones.

------------------------------------------------------------------------

# 4. Typography

Use a modern sans-serif typeface.

### Recommended font

**Inter** is the preferred choice.

Fallback:

``` text
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

### Typography hierarchy

#### Hero heading

-   Desktop: 64--76px
-   Tablet: 48--60px
-   Mobile: 38--46px
-   Weight: 700--800
-   Line height: 0.98--1.08
-   Letter spacing: slightly negative

Example:

> **Learn. Build. Launch.**

Highlight a short phrase using BuilderBootcamp orange.

#### Section headings

-   Desktop: 42--52px
-   Mobile: 32--38px
-   Weight: 700--800

#### Body text

-   17--19px desktop
-   16px mobile
-   Line height: 1.6--1.75
-   Maximum reading width: approximately 650--720px

Avoid excessive use of uppercase text.

------------------------------------------------------------------------

# 5. Overall Page Structure

The landing page should follow this visual rhythm:

``` text
NAVBAR
   ↓
HERO
   ↓
TRUST / VALUE STRIP
   ↓
ABOUT BUILDERBOOTCAMP
   ↓
COURSES
   ↓
WHY BUILDERS CHOOSE US
   ↓
HOW IT WORKS
   ↓
PROJECT / OUTCOME SHOWCASE
   ↓
TESTIMONIALS
   ↓
FAQ
   ↓
FINAL CTA
   ↓
FOOTER
```

Sections should alternate subtly between white and very light
warm-neutral backgrounds to create depth without making the page
visually busy.

------------------------------------------------------------------------

# 6. Navigation Design

Create a clean floating or semi-floating navbar.

### Desktop

Left:

**\[Logo\] BuilderBootcamp**

Center/right:

-   Home
-   About
-   Courses
-   How It Works
-   FAQ

Right:

**Join Now**

### Navbar appearance

-   White or slightly translucent surface
-   Thin border
-   Subtle shadow
-   Rounded corners if using a floating navbar
-   Maximum width around 1180--1280px
-   Sticky on scroll

Example:

``` text
┌─────────────────────────────────────────────────────────────┐
│  [BB] BuilderBootcamp   About  Courses  How It Works  FAQ   │
│                                                   [Join Now] │
└─────────────────────────────────────────────────────────────┘
```

### Mobile

Show:

``` text
[Logo]                              [☰]
```

Open a clean full-width mobile navigation panel.

------------------------------------------------------------------------

# 7. Hero Section

The hero is the most important visual section.

### Desired impression

Within 3 seconds, visitors should understand:

**BuilderBootcamp helps students learn practical software skills by
building real things.**

### Layout

Use a two-column desktop layout:

``` text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  BUILD YOUR FUTURE                                           │
│                                                              │
│  Learn. Build.                                                │
│  Launch.                                                      │
│                                                              │
│  Practical software training for students who want to        │
│  move from watching tutorials to actually building.          │
│                                                              │
│  [ Start Learning ]  [ Explore Courses ]                     │
│                                                              │
│  ✓ Beginner friendly   ✓ Project based   ✓ Practical skills │
│                                      ┌─────────────────────┐ │
│                                      │   Tech visual /     │ │
│                                      │   student builder   │ │
│                                      │   illustration      │ │
│                                      └─────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Hero background

Use mostly white with subtle orange visual elements:

-   Soft orange glow
-   Very subtle grid
-   Small floating dots
-   Abstract rounded shapes
-   Light orange gradient blob

Do not use a heavy background image that competes with the headline.

### Hero CTA

Primary:

**Start Learning →**

Orange background, white text.

Secondary:

**Explore Courses**

White background, dark text, orange border.

### Hero microcopy

Use a small orange badge above the headline:

> `PRACTICAL SOFTWARE TRAINING`

------------------------------------------------------------------------

# 8. Trust / Value Strip

Immediately below the hero, create a compact trust strip.

Example:

``` text
✓ Hands-on learning     ✓ Real projects     ✓ Beginner friendly
✓ Practical tutorials   ✓ Student focused
```

Use simple icons and short labels.

This section should not claim unsupported numbers such as "10,000+
students" unless official data is provided.

------------------------------------------------------------------------

# 9. About Section

Create an editorial-style section rather than a generic centered text
block.

### Layout

Left: - Small orange eyebrow - Large heading - 2 short paragraphs - CTA

Right: - Layered visual/card composition - Code editor illustration -
Laptop mockup - Course/project preview - Orange accent shapes

### Heading example

> **Stop Just Watching. Start Building.**

### Design idea

Show a visual transformation:

``` text
LEARN
   ↓
PRACTICE
   ↓
BUILD
   ↓
GROW
```

Use orange for the progression line.

------------------------------------------------------------------------

# 10. Courses Section

This should be one of the strongest sections.

### Header

Eyebrow:

`WHAT YOU CAN LEARN`

Heading:

> **Skills That Turn Ideas Into Projects.**

Supporting copy should be concise.

### Course card design

Use clean white cards with:

-   Rounded corners: 18--24px
-   Thin border
-   Small icon area
-   Course title
-   Short description
-   Skill level
-   Duration placeholder
-   "View Course →"

Example:

``` text
┌──────────────────────────────┐
│  ◉  WEB DEVELOPMENT          │
│                              │
│  Build modern websites       │
│  from the ground up.         │
│                              │
│  Beginner • 8 Weeks          │
│                              │
│  View Course →               │
└──────────────────────────────┘
```

### Card hover

On hover: - Slight upward movement: 4--6px - Border becomes orange -
Small shadow appears - Arrow moves slightly right

Keep the animation under approximately 250ms.

------------------------------------------------------------------------

# 11. Why BuilderBootcamp

Avoid generic feature grids that look like every other SaaS website.

Use a bold visual composition.

### Suggested heading

> **Built Around How You Actually Learn.**

Create 4--6 feature blocks:

1.  **Learn by Building**
2.  **Simple Explanations**
3.  **Real Project Practice**
4.  **Support When You're Stuck**
5.  **Modern Tools**
6.  **Community & Growth**

Each feature should have: - Small orange icon - Short title - 1--2
sentence explanation

------------------------------------------------------------------------

# 12. How It Works

Use a horizontal process on desktop and vertical timeline on mobile.

``` text
01                02                 03                 04
CHOOSE      →     REGISTER     →     PAY           →     START
A COURSE          YOUR SPOT          SECURELY            BUILDING
```

Use large step numbers.

Orange should connect the steps with a subtle line.

------------------------------------------------------------------------

# 13. Project Showcase

Add a visually impressive section showing what students can build.

### Heading

> **Don't Just Finish a Course. Build Something.**

Show 3 project cards:

-   Portfolio Website
-   Business Website
-   Web Application

Each card can contain: - Project preview image - Technology tags - Short
description - "See Project" action

This section should visually communicate the practical nature of
BuilderBootcamp.

------------------------------------------------------------------------

# 14. Testimonials

Use a clean testimonial carousel/grid.

### Card

``` text
"BuilderBootcamp helped me understand how to
actually build instead of just following tutorials."

Student Name
Course / Institution
```

Use real testimonials only when available.

Until then, use clearly marked placeholder content during development.

Do not fabricate student names, schools, ratings, or statistics.

------------------------------------------------------------------------

# 15. FAQ

Use accordion cards.

Questions:

-   Who can join BuilderBootcamp?
-   Do I need previous programming experience?
-   What courses are available?
-   How does registration work?
-   What payment methods are available?
-   Can I learn with a phone or laptop?
-   How long does each course take?
-   Will I receive a certificate?

### Accordion design

White card with: - Question on left - `+` icon on right - Smooth
expansion - Orange active state

------------------------------------------------------------------------

# 16. Final CTA

Create a visually stronger orange section near the bottom.

### Example

> **Your Next Project Starts Here.**

Supporting text:

> Learn practical software skills, build real projects, and take the
> next step in your technology journey.

Button:

**Join BuilderBootcamp →**

### CTA styling

Use a deepened orange/orange brand surface with white text.

Add subtle decorative outlines or abstract BuilderBootcamp-inspired
shapes.

Do not overwhelm the CTA with multiple buttons.

------------------------------------------------------------------------

# 17. Footer

Use a dark neutral footer for contrast.

Recommended background:

`#111827`

Footer text should be soft white/gray.

Include:

``` text
BuilderBootcamp

Practical software training for
students and aspiring builders.

Explore
About
Courses
How It Works
FAQ

Contact
Email
Phone
Social links

Legal
Privacy Policy
Terms of Service
```

Use the orange brand color for small accents and hover states.

------------------------------------------------------------------------

# 18. UI Components

All reusable components should share the same design language.

### Border radius

-   Buttons: 10--14px
-   Cards: 18--24px
-   Large feature panels: 24--32px
-   Pills/badges: 999px

### Shadows

Use subtle shadows only.

Preferred style:

``` text
0 10px 30px rgba(17, 24, 39, 0.06)
```

Avoid large, dark, blurry shadows.

### Borders

Use:

``` text
1px solid #E5E7EB
```

Orange should be reserved for interaction and emphasis.

------------------------------------------------------------------------

# 19. Buttons

### Primary

``` text
Background: #FF8500
Text: white
Border: none
Radius: 12px
Padding: 13px 20px
Font weight: 650
```

Hover:

-   Slightly darker orange
-   Translate Y by -1px
-   Small shadow

### Secondary

``` text
Background: white
Text: #111827
Border: 1px solid #E5E7EB
Radius: 12px
```

Hover:

-   Border becomes orange
-   Text becomes orange

### Button rule

Every major section should not contain several competing CTAs.

Use one clear primary action.

------------------------------------------------------------------------

# 20. Icons

Use a consistent icon library such as **Lucide**.

Icons should be: - Simple - Outline-based - Consistent stroke width -
Approximately 20--24px

Avoid mixing multiple icon styles.

------------------------------------------------------------------------

# 21. Imagery

Use imagery that represents:

-   Students learning
-   Coding
-   Laptops
-   Software development
-   Collaboration
-   Projects

Images should feel authentic and modern.

Avoid generic corporate stock photography with overly staged
expressions.

Where possible, use screenshots/mockups of actual BuilderBootcamp
projects and courses.

------------------------------------------------------------------------

# 22. Decorative Visual Language

Create a subtle visual identity around the BuilderBootcamp logo.

Use: - Rounded orange shapes - Small circles - Thin line patterns - Grid
backgrounds - Orange outline shapes - Soft orange glows

Avoid: - Excessive glassmorphism - Excessive gradients - Neon effects -
Heavy 3D elements - Visual clutter

The logo itself should remain the strongest brand symbol.

------------------------------------------------------------------------

# 23. Motion & Animation

Animations should communicate interaction, not distract.

### Page entrance

Use subtle: - Fade - Slide-up - Scale from 0.98 → 1

### Hover

Cards: - `translateY(-4px)`

Buttons: - `translateY(-1px)`

Images: - Very subtle scale, around `1.02`

### Duration

Use approximately:

``` text
150ms – 300ms
```

Respect `prefers-reduced-motion`.

------------------------------------------------------------------------

# 24. Responsive Design

### Desktop

-   Maximum content width: 1180--1280px
-   Large whitespace
-   Two-column hero
-   Multi-column course grid

### Tablet

-   Reduce heading sizes
-   Maintain comfortable spacing
-   Course grid can become 2 columns

### Mobile

-   Single-column layout
-   Hero centered or left-aligned depending on visual
-   Full-width CTA buttons where appropriate
-   Course cards stacked
-   Vertical "How It Works" timeline
-   Compact navigation
-   Smaller decorative elements

The website must feel intentionally designed for mobile, not merely
squeezed into a smaller screen.

------------------------------------------------------------------------

# 25. Accessibility

Ensure: - WCAG-conscious color contrast - Keyboard navigation - Visible
focus states - Semantic headings - Proper button elements - Accessible
accordion controls - Alt text for meaningful images - Decorative images
marked appropriately - Reduced-motion support

Do not use orange text on white for long paragraphs because it can have
insufficient readability.

------------------------------------------------------------------------

# 26. Conversion Strategy

The page should repeatedly but naturally lead visitors toward
registration.

Primary conversion path:

``` text
HERO
  ↓
START LEARNING
  ↓
COURSES
  ↓
COURSE DETAILS
  ↓
REGISTER
  ↓
PAYMENT
```

Use contextual CTAs rather than placing "Buy Now" everywhere.

Recommended CTA wording: - Start Learning - Explore Courses - View
Course - Join BuilderBootcamp - Register Now

------------------------------------------------------------------------

# 27. Paystack-Ready UI

The design should accommodate a future payment flow without exposing
payment credentials.

Example:

``` text
Course
  ↓
Course Details
  ↓
Register
  ↓
Student Information
  ↓
Paystack Checkout
  ↓
Payment Confirmation
```

The landing page itself should not request card information.

Payment should be handled through the secure Paystack
checkout/integration.

Never place a Paystack secret key in frontend code.

------------------------------------------------------------------------

# 28. SEO / Metadata

Suggested title:

**BuilderBootcamp \| Learn. Build. Launch.**

Suggested meta description:

**BuilderBootcamp helps students learn practical software skills, build
real projects, and develop confidence through hands-on technology
training.**

Use: - One H1 - Logical H2 sections - Descriptive image alt text - Open
Graph metadata - Favicon using the BuilderBootcamp brand mark

------------------------------------------------------------------------

# 29. Visual Quality Checklist

Before considering the page finished:

-   [ ] Logo looks correct and is not distorted.
-   [ ] Orange brand color is consistent.
-   [ ] Typography has a clear hierarchy.
-   [ ] Hero immediately communicates the value proposition.
-   [ ] Primary CTA is visually obvious.
-   [ ] Navigation is clean.
-   [ ] Cards have consistent spacing.
-   [ ] Mobile design feels intentional.
-   [ ] No section feels overcrowded.
-   [ ] Animations are subtle.
-   [ ] Images are optimized.
-   [ ] Footer provides a strong visual ending.
-   [ ] All placeholder content is clearly identifiable.
-   [ ] No unsupported claims or fake statistics are displayed.
-   [ ] Payment UI is prepared for Paystack without exposing secrets.

------------------------------------------------------------------------

# 30. Overall Design Goal

The finished BuilderBootcamp website should make a visitor think:

> **"This is a serious place to learn practical software skills, and I
> know exactly what I should do next."**

The design should combine:

**BuilderBootcamp orange + clean typography + generous whitespace +
practical visuals + strong CTA hierarchy + modern student-focused UI.**

The final result should feel closer to a polished modern technology
education platform than a generic tutorial blog.
