# Mario Game - Canvas Platform Game

A classic 2D platform game inspired by Mario Bros and Sonic, built with HTML5 Canvas, JavaScript, and Webpack.

## 🎮 Features

- **Smooth character animations** - Running and standing sprites
- **Physics system** - Gravity and collision detection
- **Parallax scrolling** - Multi-layer background effects
- **Collectibles** - Ring collection system inspired by Sonic
- **Platform variety** - Multiple platform types and heights
- **Responsive controls** - Keyboard-based movement and jumping

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.x or higher recommended)
- npm (v10.x or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mario-game-server
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

The game will automatically reload when you make changes to the source files.

## 🎯 Controls

- **Arrow Left** (←) - Move left
- **Arrow Right** (→) - Move right  
- **Arrow Up** (↑) - Jump

## 🛠️ Built With

- **HTML5 Canvas** - Rendering engine
- **Webpack 5** - Module bundler
- **Babel** - JavaScript compiler
- **BrowserSync** - Live reloading development server

## 📁 Project Structure

```
mario-game-server/
├── src/
│   ├── img/           # Game sprites and images
│   ├── js/            # JavaScript source files
│   │   ├── canvas.js  # Main game loop
│   │   ├── player.js  # Player character class
│   │   ├── platform.js # Platform class
│   │   └── utils.js   # Utility functions
│   └── index.html     # Entry HTML file
├── dist/              # Built files (generated)
├── webpack.config.js  # Webpack configuration
└── package.json       # Project dependencies
```

## 🎨 Development

### Available Scripts

- `npm start` - Start development server with hot reload
- `npm run dev` - Same as start (alias)

### Adding New Features

1. Sprites and images go in `src/img/`
2. Game logic goes in `src/js/`
3. Webpack automatically bundles changes

## 🐛 Known Issues

- Game requires Node.js v25+ or configure with `--openssl-legacy-provider` for older Node versions

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Rubens Rudio

---

**Enjoy the game! 🎮**
