# Mapa Estratégico

Mapa Estratégico is an interactive strategic visualization application designed to explore hierarchical data in a clear and intuitive way.

It uses a Sunburst chart to represent major themes, their sub-themes, and associated content, making it easier to understand the relationships between different strategic axes.

## Overview

The project displays a strategic map structured across multiple levels of hierarchy, including:

- a primary level: major themes
- a secondary level: sub-themes
- detailed content associated with each selected node

The current application is focused on demonstration and exploration of sectoral data, particularly in a context of industrial and strategic planning.

## Features

- Interactive Sun- Hierarchical data structure
burst visualization
- Color coding by main theme
- Sub-themes with color variations
- Click-based navigation through nodes
- Dynamic detail panel
- Data structured in a JSON file
- React + TypeScript interface
- Light animation for panels and interactions

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- D3.js
- Framer Motion
- Custom CSS

### Development tools

- ESLint
- Git / GitHub

## Project structure

```text
MAPA/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── DetailPanel.css
│   │   ├── DetailPanel.tsx
│   │   └── Sunburst.tsx
│   ├── data/
│   │   └── themes.json
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md
└── .gitignore
```

## Quick start

### Prerequisites

Make sure you have installed:

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run the project in development mode

```bash
npm run dev
```

Then open the local URL displayed by Vite in your browser.

### Build for production

```bash
npm run build
```

## Data model

The data is loaded from [src/data/themes.json](src/data/themes.json) and follows a hierarchical structure:

```json
{
  "id": "mapa",
  "name": "MAPA",
  "children": [
    {
      "id": "01",
      "name": "Ambiente de Negócios",
      "children": [
        {
          "id": "01-01",
          "name": "Ambiente Regulatório",
          "value": 1,
          "sections": [
            {
              "title": "Melhorar a qualidade regulatória",
              "items": [
                {
                  "title": "Articulação institucional e integração regulatória",
                  "description": "..."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

Each node can contain:

- a name
- a value used to calculate size in the Sunburst chart
- children for the hierarchy
- detailed sections displayed in the side panel

## Architecture

### App

The main component in [src/App.tsx](src/App.tsx) initializes the selected state and renders:

- the Sunburst chart
- the detail panel

### Sunburst

The component in [src/components/Sunburst.tsx](src/components/Sunburst.tsx) handles:

- D3 hierarchy construction
- partition layout
- arc rendering
- color generation
- click interactions
- visual centering and navigation between levels

### DetailPanel

The component in [src/components/DetailPanel.tsx](src/components/DetailPanel.tsx) displays detailed information related to the selected node, including:

- title
- sections
- items and associated descriptions

### Types

TypeScript structures are defined in [src/types.ts](src/types.ts) to ensure data consistency across the hierarchy.

## Project status

The project is currently under active development and corresponds to a first functional version of a strategic data visualization prototype.

The features already present focus on:

- hierarchical visualization
- user interaction
- contextual detail for each theme
- structured data in JSON format

## License

This project is currently intended for development, demonstration, and prototyping use.
