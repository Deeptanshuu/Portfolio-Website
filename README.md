# Modern Portfolio Website

A modern, interactive portfolio website built with React, Three.js, and TailwindCSS. Features a 3D Earth visualization, smooth animations, and responsive design.

## 🚀 Tech Stack

- **Frontend Framework:** React.js
- **3D Graphics:** Three.js with React Three Fiber
- **Styling:** TailwindCSS
- **Animations:** GSAP
- **Build Tool:** Vite
- **Icons:** HeroIcons, React Icons

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── interface/
│   │   │   ├── Projects.jsx     # Projects showcase section
│   │   │   ├── Hero.jsx        # Hero section with animations
│   │   │   ├── Logo.jsx        # Logo component
│   │   │   ├── Contact.jsx     # Contact section
│   │   │   ├── Interface.jsx   # Main interface wrapper
│   │   │   └── Divider.jsx     # Section divider component
│   │   ├── navigation/
│   │   │   ├── Navigation.jsx    # Main navigation container
│   │   │   ├── SocialLinks.jsx   # Social media links
│   │   │   ├── NavigationLinks.jsx # Navigation menu items
│   │   │   └── MenuButton.jsx     # Mobile menu button
│   │   ├── Earth.jsx            # 3D Earth visualization
│   │   ├── EarthMobile.jsx      # Mobile optimized Earth
│   │   ├── ProjectCard.jsx      # Project showcase cards
│   │   ├── Hero.jsx            # Main hero section
│   │   ├── SkillsCloud.jsx     # Skills visualization
│   │   ├── CustomCursor.jsx    # Custom cursor effects
│   │   └── AnimatedText.jsx    # Text animation component
│   ├── assets/                 # Static assets
│   ├── App.jsx                # Main application component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles
├── public/
│   ├── fonts/               # Custom font files
│   ├── textures/           # 3D textures for Earth
│   ├── projects/           # Project images
│   ├── resume.pdf          # Resume file
│   └── github-icon.png     # GitHub icon
└── package.json           # Project dependencies and scripts
```

## 🔍 Key Components

### Interface Components
1. **Projects.jsx**
   - Showcases portfolio projects in a grid layout
   - Interactive project cards with animations
   - Filtering and sorting capabilities

2. **Hero.jsx**
   - Landing section with animated text
   - Integrated with 3D Earth visualization
   - Responsive design for all devices

3. **Contact.jsx**
   - Contact form with validation
   - Social media links
   - Professional information display

4. **Interface.jsx**
   - Main layout wrapper
   - Handles component organization
   - Manages global UI state

### Navigation Components
1. **Navigation.jsx**
   - Main navigation container
   - Responsive menu system
   - Smooth scroll functionality

2. **SocialLinks.jsx**
   - Social media profile links
   - Icon animations
   - External link handling

3. **NavigationLinks.jsx**
   - Main menu items
   - Section navigation
   - Active state management

### 3D Components
1. **Earth.jsx/EarthMobile.jsx**
   - Interactive 3D Earth visualization using Three.js
   - Optimized versions for desktop and mobile
   - Custom shaders and textures for realistic rendering
   - Performance optimizations for different devices

### Utility Components
1. **AnimatedText.jsx**
   - GSAP powered text animations
   - Split text capabilities
   - Custom animation sequences

2. **CustomCursor.jsx**
   - Interactive cursor effects
   - Context-aware cursor states
   - Smooth animations

## 🛠️ Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Features

- Responsive design that works on all devices
- Interactive 3D Earth visualization
- Smooth scroll animations
- Modern UI with TailwindCSS
- Project showcase with filtering
- Custom cursor effects
- Optimized performance

## 🔧 Development

- Uses Vite for fast development and building
- ESLint configuration for code quality
- PostCSS and TailwindCSS for styling
- Modular component architecture
