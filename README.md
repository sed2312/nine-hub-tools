# Nine Hub Tools 🎨

> Professional design tools for modern web developers

[![Made with Lovable](https://img.shields.io/badge/Made%20with-Lovable-ff69b4)](https://lovable.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Nine Hub Tools is a collection of 9 free, professional-grade design utilities built specifically for web developers. Create stunning visual effects, check accessibility, generate meta tags, and more – all in one place.

## 🚀 Live Demo

**[nineproo.com](https://nineproo.com)**

## ✨ Features

### Design Tools
- **💎 Glassmorphism Generator** - Create stunning frosted glass effects
- **🎨 Color Palette Generator** - Generate harmonious color schemes
- **🌈 Gradient Text Generator** - Design eye-catching text gradients
- **💥 Box Shadow Generator** - Perfect shadows for your UI elements
- **📐 Blob Generator** - Create organic shapes for modern designs

### Utility Tools
- **🔲 CSS Grid Generator** - Visual grid layout builder
- **✅ Contrast Checker** - WCAG compliance testing
- **🏷️ Meta Tags Generator** - SEO-optimized meta tags
- **🤖 AI Prompt Generator** - Enhance your AI assistant prompts

### Platform Features
- ⭐ **Favorites System** - Star your most-used tools
- 💾 **Presets Management** - Save and load configurations
- 📝 **Export History** - Track all your exports
- 🎨 **Dark/Light Mode** - Full theme support
- ⌨️ **Command Palette** - Quick navigation (Cmd/Ctrl+K)
- 📱 **Fully Responsive** - Works on all devices
- 🚀 **SEO Optimized** - Complete meta tags and sitemap

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Animations:** Framer Motion
- **Backend:** Supabase
- **State Management:** TanStack Query
- **Routing:** React Router v6

## 💻 Development

### Prerequisites

- Node.js 18+ (or Bun)
- npm/yarn/pnpm/bun

### Quick Start

```bash
# Clone the repository
git clone https://github.com/proofsed-rgb/nine-hub-tools-ccd97bbf.git
cd nine-hub-tools-ccd97bbf

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev

# Build for production
npm run build
# or  
bun run build
```

The app will be available at `http://localhost:5173`

### Project Structure

```
src/
├── components/
│   ├── hub/              # Homepage sections
│   ├── layout/           # Layout components
│   ├── modals/           # Modal dialogs
│   ├── tools/            # Shared tool components
│   └── ui/               # shadcn/ui components
├── pages/
│   ├── Index.tsx         # Homepage
│   └── tools/            # Individual tool pages
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
│   ├── seo.ts            # SEO utilities
│   ├── storage.ts        # Local storage management
│   └── utils.ts          # General utilities
├── contexts/           # React contexts
└── integrations/       # External service integrations
```

## 📚 Documentation

For detailed implementation instructions, see:
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Complete enhancement guide
- **[Lovable Docs](https://docs.lovable.dev)** - Framework documentation

## ✅ Implementation Status

### Completed
- [x] SEO Foundation (robots.txt, sitemap.xml)
- [x] Meta tags management system
- [x] Favorites system
- [x] Presets management
- [x] Export history tracking
- [x] Custom React hooks
- [x] Storage utilities

### In Progress
- [ ] Footer component with branding
- [ ] Tool page SEO integration
- [ ] Presets modal UI
- [ ] Enhanced copy button
- [ ] Tool templates
- [ ] Open Graph images

### Planned
- [ ] Keyboard shortcuts help
- [ ] Batch export
- [ ] Tool usage analytics
- [ ] Browser extension

## 🌐 Deployment

This project is built with Lovable and can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting
- Lovable
- **VPS with CloudPanel** (recommended for full control)

### Deploy to Lovable

1. Ensure your project is pushed to a GitHub repository
2. Visit [lovable.dev](https://lovable.dev)
3. Connect your GitHub account and select the repository
4. Lovable will automatically configure and deploy your React/Vite project

### VPS Deployment with CloudPanel

For production deployment with full control, see the comprehensive **[VPS Installation Guide](./VPS_INSTALLATION_GUIDE.md)** which covers:

- CloudPanel setup and configuration
- Nginx optimization for SPA routing
- SSL certificate installation
- Automated deployment scripts
- Security hardening
- Monitoring and maintenance

**Quick VPS Deploy:**
```bash
# After following the VPS guide
cd /home/cloudpanel/htdocs/yourdomain.com
./deploy.sh
```

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains your production build
# Upload to your hosting provider
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**NineProo.com**

- Website: [nineproo.com](https://nineproo.com)
- GitHub: [@proofsed-rgb](https://github.com/proofsed-rgb)

## 🚀 About This Project

Nine Hub Tools was created to provide web developers with a comprehensive suite of design utilities that are:
- **Free Forever** - No subscriptions or hidden costs
- **Open Source** - Learn from and contribute to the code
- **Privacy-Focused** - All processing happens in your browser
- **Modern** - Built with the latest web technologies

Made with ❤️ for the web development community.

---

⭐ **Star this repo if you find it useful!** ⭐
