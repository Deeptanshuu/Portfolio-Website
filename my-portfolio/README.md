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
│   │   ├── interface/       # UI interface components
│   │   ├── navigation/      # Navigation related components
│   │   ├── Earth.jsx        # 3D Earth visualization
│   │   ├── EarthMobile.jsx  # Mobile optimized Earth component
│   │   ├── ProjectCard.jsx  # Project showcase component
│   │   ├── Hero.jsx        # Hero section component
│   │   ├── SkillsCloud.jsx # Skills visualization
│   │   ├── CustomCursor.jsx # Custom cursor implementation
│   │   └── AnimatedText.jsx # Text animation component
│   ├── assets/             # Static assets
│   ├── App.jsx            # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── public/               # Public assets
└── package.json         # Project dependencies and scripts
```

## 🔍 Key Components

1. **Earth.jsx/EarthMobile.jsx**
   - Interactive 3D Earth visualization using Three.js
   - Optimized versions for desktop and mobile
   - Custom shaders and textures for realistic rendering

2. **ProjectCard.jsx**
   - Showcases portfolio projects
   - Interactive cards with hover effects
   - Links to live projects and repositories

3. **Interface Components**
   - Hero section with animated text
   - Projects showcase
   - Contact section
   - Navigation elements

4. **Animations**
   - GSAP powered smooth animations
   - Custom text animations
   - Interactive cursor effects

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
