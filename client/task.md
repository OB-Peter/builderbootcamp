# BuilderBootcamp Landing Page --- Development Task

## Project Overview

Create a modern, responsive, conversion-focused landing page for
**BuilderBootcamp**, a software tutorial and practical technology
training platform for students and beginners.

The landing page should clearly communicate what BuilderBootcamp offers,
build trust, and guide visitors toward registering for a tutorial or
joining the bootcamp.

## Primary Goal

The main goal is to turn website visitors into registered students. The
page should make the value of BuilderBootcamp immediately clear and
provide strong calls-to-action such as **Join the Bootcamp**, **View
Courses**, and **Register Now**.

## Target Audience

-   University and college students
-   Secondary-school graduates
-   Beginners learning software development
-   Students interested in technology and digital skills
-   Young people looking for practical software skills
-   Beginners interested in freelancing or technology careers

## Required Sections

### 1. Navigation Bar

Include: - BuilderBootcamp logo/name - Home - About - Courses - Why
BuilderBootcamp - FAQ - Contact - Primary CTA: **Join Now**

The navigation should become mobile-friendly with a hamburger menu on
smaller screens.

### 2. Hero Section

Create a strong headline such as:

> **Build Real Software Skills. Create Real Projects.**

Supporting text should explain that BuilderBootcamp provides practical
software tutorials designed to help students learn, practice, and build
useful digital skills.

Include: - Primary CTA: **Start Learning** - Secondary CTA: **Explore
Courses** - A modern visual showing students, coding, software
development, or technology - Short trust/value indicators such as: -
Practical Training - Beginner Friendly - Project Based - Student Focused

### 3. About BuilderBootcamp

Explain what BuilderBootcamp is, why it exists, and how it helps
students develop practical software skills.

Emphasize: - Hands-on learning - Real-world projects - Beginner-friendly
teaching - Career and digital-skill development - Learning by building

### 4. Courses / Programs

Create course cards with examples such as: - Web Development - Frontend
Development - Backend Development - JavaScript - Python Programming -
UI/UX Design - Git & GitHub - Software Tools & Productivity

Each course card should include: - Course name - Short description -
Skill level - Duration placeholder - CTA such as **View Course**

Do not invent final prices. Use placeholders such as `₦XX,XXX` until
official pricing is supplied.

### 5. Why Choose BuilderBootcamp

Create feature cards explaining: - Practical projects - Easy-to-follow
tutorials - Beginner-friendly approach - Experienced
instructors/mentors - Community and support - Certificate or completion
recognition, only if officially offered

### 6. How It Works

Show a simple 4-step process:

1.  Choose a course
2.  Register
3.  Complete payment
4.  Start learning

Make the process visually simple and easy to understand.

### 7. Student Outcomes

Explain what students can expect to gain: - Software development
knowledge - Practical project experience - Portfolio projects -
Problem-solving skills - Confidence using development tools - A
foundation for internships, freelancing, further study, or technology
careers

Avoid promising guaranteed jobs or income.

### 8. Testimonials

Create a testimonial section with placeholder content only.

Clearly structure the section so real student testimonials can be added
later.

### 9. FAQ

Include questions such as: - Who can join BuilderBootcamp? - Do I need
previous programming experience? - What courses are available? - How
long does a course take? - How do I register? - What payment methods are
available? - Can I learn from my phone or laptop? - Will I receive a
certificate?

Use expandable accordion components.

### 10. Final CTA

Create a strong final section:

> **Ready to Start Building?**

Supporting text should encourage visitors to begin learning practical
software skills.

CTA: **Join BuilderBootcamp**

### 11. Footer

Include: - BuilderBootcamp logo/name - Short description - Navigation
links - Courses - Contact information placeholders - Social media
placeholders - Privacy Policy - Terms of Service - Copyright notice

## Design Requirements

-   Modern technology/education aesthetic
-   Clean and professional layout
-   Mobile-first responsive design
-   Strong visual hierarchy
-   Excellent spacing and typography
-   Accessible contrast
-   Smooth hover states
-   Subtle animations that do not distract from the content
-   Clear CTA buttons
-   Consistent border radius and component styling
-   Avoid excessive gradients, clutter, or unnecessary animations

## Color Direction

Use a professional technology-focused palette. BuilderBootcamp branding
should feel energetic, trustworthy, modern, and student-friendly.

Keep the color system centralized so brand colors can easily be changed
later.

## Responsive Requirements

The page must work properly on: - Mobile phones - Tablets - Laptops -
Desktop monitors

Pay particular attention to: - Navigation - Hero layout - Course cards -
CTA buttons - Typography - Images - Footer

## Functional Requirements

-   Navigation links should scroll to the appropriate sections.
-   CTA buttons should point to registration/course pages or use
    placeholders until those pages exist.
-   FAQ items should open and close.
-   Mobile navigation should open and close correctly.
-   Forms, if included, must have validation and clear error/success
    states.
-   Do not expose payment secret keys or other private credentials in
    frontend code.

## Payment Preparation

The landing page should be prepared for future **Paystack** integration.

The main CTA should eventually connect to a registration/payment flow:

`Landing Page → Course Selection → Registration → Paystack Checkout → Payment Verification → Registration Confirmation`

For the landing page task, do not hard-code Paystack secret keys or
implement insecure client-side payment verification.

## SEO Requirements

Add: - Page title - Meta description - Open Graph metadata - Descriptive
headings - Proper semantic HTML - Image alt text - Clean URLs where
applicable

Suggested title:

**BuilderBootcamp \| Practical Software Training for Students**

Suggested description:

**Learn practical software development and digital skills with
BuilderBootcamp. Build real projects, improve your technical skills, and
grow your confidence through hands-on learning.**

## Performance Requirements

-   Optimize images
-   Lazy-load non-critical images
-   Avoid unnecessary JavaScript
-   Keep animations lightweight
-   Maintain fast page loading
-   Use reusable components
-   Keep the code organized and maintainable

## Accessibility

The page should: - Support keyboard navigation - Use semantic HTML -
Include accessible button labels - Include alt text for meaningful
images - Maintain readable color contrast - Provide visible focus
states - Avoid relying on color alone to communicate information

## Content Rules

Do not invent: - Instructor names - Student numbers - Reviews -
Accreditation - Partnerships - Certificates - Guaranteed employment -
Guaranteed income - Course prices

Use clearly marked placeholders where official information is
unavailable.

## Suggested Technical Structure

If using a modern frontend framework, organize the page into reusable
components:

``` text
components/
  Navbar
  Hero
  About
  CourseCard
  Courses
  Features
  HowItWorks
  Outcomes
  Testimonials
  FAQ
  FinalCTA
  Footer
```

Keep content/data separate from presentation where practical so courses
and testimonials can be updated easily.

## Definition of Done

The landing page is complete when:

-   [ ] All required sections are implemented.
-   [ ] The page is fully responsive.
-   [ ] Navigation works on desktop and mobile.
-   [ ] CTAs are clearly visible.
-   [ ] Course cards are reusable.
-   [ ] FAQ accordion works.
-   [ ] Accessibility basics are implemented.
-   [ ] SEO metadata is included.
-   [ ] Images have appropriate alt text.
-   [ ] No secret API keys are exposed.
-   [ ] The page is ready to connect to registration and Paystack
    payment flow.
-   [ ] Placeholder content is clearly identifiable.
-   [ ] The final design looks professional and suitable for a
    student-focused technology bootcamp.
