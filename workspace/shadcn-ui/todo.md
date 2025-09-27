# Brand Collab Brief Generator - MVP Todo

## Core Files to Create/Modify:

1. **index.html** - Update title and meta tags
2. **src/pages/Login.tsx** - Clean login page with dark theme and teal accents
3. **src/pages/CreateBrief.tsx** - Random brief generator with "What should I design today?" button
4. **src/pages/History.tsx** - Display previously generated briefs
5. **src/pages/Profile.tsx** - File upload and design management
6. **src/components/Navbar.tsx** - Navigation between pages
7. **src/App.tsx** - Update routing for all pages
8. **src/lib/briefGenerator.ts** - Logic for generating random briefs
9. **src/lib/storage.ts** - localStorage utilities for briefs and designs

## Key Features:
- Dark theme (#0f172a background, #1e293b cards)
- Teal accents (#2dd4bf for buttons, titles, highlights)
- Random brief generation (products + brands)
- Social sharing via Web Share API
- File upload for design portfolios
- Responsive design for mobile/desktop
- localStorage for demo data persistence

## Implementation Strategy:
- Start with authentication state management
- Build core brief generation logic
- Implement social sharing functionality
- Add file upload capabilities
- Style with dark theme and teal accents
- Ensure responsive design