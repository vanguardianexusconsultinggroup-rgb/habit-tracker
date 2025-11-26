# Habit Tracker Design Guidelines

## Design Approach

**System Selected**: Material Design 3 + Modern Dashboard Principles

**Justification**: Productivity-focused application requiring clear information hierarchy, consistent patterns, and data visualization. Material Design provides excellent components for cards, progress indicators, and form controls while maintaining a clean, focused experience.

**Key Design Principles**:
- Information clarity over decoration
- Immediate action visibility
- Progress celebration through visual feedback
- Consistent, predictable navigation

## Typography System

**Font Family**: Inter (via Google Fonts CDN)

**Hierarchy**:
- Display (Page Headers): 2.5rem, weight 700
- H1 (Section Headers): 1.75rem, weight 600  
- H2 (Card Headers): 1.25rem, weight 600
- Body (Primary): 1rem, weight 400
- Body Small (Labels): 0.875rem, weight 500
- Caption (Stats): 0.75rem, weight 600

**Line Height**: 1.5 for body text, 1.2 for headings

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 8, 12, 16, 20, 24, 32
- Consistent padding: p-4, p-8, p-12
- Gaps: gap-4, gap-8
- Margins: m-4, m-8, m-12

**Container Structure**:
- Max width: max-w-7xl for main content
- Padding: px-4 on mobile, px-8 on desktop
- Main content area: min-h-screen with consistent padding

**Grid System**:
- Daily view: Single column on mobile, 2-column on md (habit list + stats sidebar)
- Monthly view: Full-width calendar grid
- Stats cards: grid-cols-1 md:grid-cols-3 with gap-4

## Component Library

### Navigation
**Top Navigation Bar**:
- Fixed header with blur backdrop effect
- Logo/app name on left
- Navigation links center (Daily, Monthly, Manage)
- User profile/logout on right
- Height: h-16, padding: px-8

### Cards
**Habit Card (Daily View)**:
- Rounded corners: rounded-2xl
- Padding: p-6
- Border: 1px subtle outline
- Shadow: Soft elevation
- Layout: Flex with habit name, checkbox, and mini progress indicator

**Stats Cards**:
- Same rounded-2xl corners
- Padding: p-6
- Text center aligned
- Large number display (2rem) above label

**Calendar Card (Monthly View)**:
- Grid layout for calendar days
- Individual day cells: aspect-square, rounded-lg
- Completed days: filled indicator
- Current day: prominent border

### Forms
**Habit Input**:
- Rounded: rounded-xl
- Padding: p-4
- Border: 2px on focus
- Full width input with action button inline

**Buttons**:
- Primary: Gradient treatment, rounded-xl, px-6 py-3
- Secondary: Transparent with border, same dimensions
- Icon buttons: Square, p-2, rounded-lg
- Hover: Subtle scale transform

### Progress Indicators
**Linear Progress Bar**:
- Height: h-2, full width
- Rounded: rounded-full
- Container: Semi-transparent background
- Fill: Animated width transition

**Circular Progress** (for monthly view):
- Ring design showing completion percentage
- Size: 80px diameter
- Stroke width: 8px

### Data Display
**Habit List Table**:
- Row height: h-20
- Borders: Bottom border only between rows
- Checkbox: 36px × 36px, rounded-lg
- Delete button: Icon only, right-aligned

**Statistics Section**:
- Three-column grid on desktop
- Stack on mobile
- Each stat: Large number + descriptive label

## View-Specific Layouts

### Daily View (Primary Dashboard)
**Layout**: Two-column on desktop (70/30 split)

**Left Column**:
- Header: "Today's Habits" + current date
- Habit cards list (vertical stack, gap-4)
- Each card: Checkbox + habit name + quick stats
- Add habit button at bottom

**Right Column (Sidebar)**:
- Today's summary card
- Streak counter
- Quick stats (total completed today)
- Motivational quote/message

### Monthly View
**Layout**: Full-width calendar

**Structure**:
- Month navigation header (prev/next buttons, month name centered)
- Calendar grid: 7 columns (days of week)
- Each cell shows: Date number + completion dots for each habit
- Bottom: Monthly statistics cards (same 3-column grid)

### Habit Management Page
**Layout**: Single column, centered, max-w-4xl

**Sections**:
1. "Your Habits" header with create button
2. Habit list: Each item in card format with:
   - Habit name (editable inline)
   - Icon/emoji picker
   - Frequency settings
   - Archive/delete actions
3. Spacing: gap-6 between habit cards

### Authentication Pages
**Login/Signup**:
- Centered card on gradient background
- Max width: max-w-md
- Padding: p-12
- Logo at top
- Form fields with generous spacing (gap-6)
- Social login buttons below divider
- Footer links for toggle between login/signup

## Animations

**Use Sparingly**:
- Checkbox check: Scale and fade-in checkmark (0.2s)
- Progress bars: Width transition (0.3s ease)
- Card hover: Subtle lift (translate-y-1, shadow increase)
- Page transitions: Fade (0.15s)

**Avoid**: Scroll-triggered animations, complex transitions, decorative motion

## Images

**Hero Image**: None - This is a dashboard app, immediate functionality takes priority

**Icons**: Use Heroicons library via CDN
- Solid variant for primary actions
- Outline variant for secondary elements
- Consistent sizing: w-5 h-5 for inline, w-6 h-6 for buttons

**Illustrations**: Optional success state illustrations when all habits completed (celebratory graphic)