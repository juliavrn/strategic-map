# MAPA

**MAPA** is an interactive strategic data visualization application designed to provide a clear and intuitive overview of complex datasets.

The application uses an interactive **Sunburst chart** to organize information into main themes and sub-themes, making it easier to explore relationships between different areas of a dataset.

## Overview

MAPA is designed around a hierarchical data structure:

```text
MAPA
├── Environment
│   ├── ...
│   └── ...
├── Health
│   ├── ...
│   └── ...
├── Education
│   ├── ...
│   └── ...
├── Economy
│   ├── ...
│   └── ...
├── Technology
│   ├── ...
│   └── ...
├── Society
│   ├── ...
│   └── ...
├── Governance
│   ├── ...
│   └── ...
└── Infrastructure
    ├── ...
    └── ...
```

The current prototype contains **8 main themes**, with a variable number of sub-themes depending on the theme.

Each main theme has its own color, while its sub-themes use variations of the same color.

## Features

* Interactive Sunburst visualization
* 8 equally sized main themes
* Variable number of sub-themes
* Color-coded themes and sub-themes
* Interactive navigation through the hierarchy
* Clickable main themes
* Clickable sub-themes
* Central navigation element
* Multi-line labels for longer names
* Responsive SVG-based visualization *(in progress)*

## Tech Stack

### Frontend

* **React**
* **TypeScript**
* **D3.js**
* **CSS / Tailwind CSS**

### Development Tools

* **Vite**
* **Git**
* **GitHub**

## Project Structure

```text
MAPA/
├── src/
│   ├── components/
│   │   ├── Sunburst.tsx
│   │   ├── Breadcrumb.tsx
│   │   └── DetailPanel.tsx
│   │
│   ├── data/
│   │   ├── themes.ts
│   │   └── types.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

Clone the repository:

```bash
git clone https://github.com/juliavrn/strategic-map.git
```

Navigate to the project:

```bash
cd strategic-map
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available through the local development URL provided by Vite.

## Data Structure

MAPA uses a hierarchical data model.

A simplified example:

```ts
const themes: Theme = {
  name: "Atlas",
  description: "Overview of the dataset",
  children: [
    {
      name: "Environment",
      children: [
        {
          name: "Climate Change",
          value: 10,
        },
        {
          name: "Biodiversity",
          value: 8,
        },
      ],
    },
  ],
}
```

The `value` of each sub-theme is used to determine its relative size within its parent theme.

The 8 main themes are intentionally distributed equally around the Sunburst.

## Architecture

The application is organized into reusable React components.

### `Sunburst.tsx`

Responsible for:

* Building the D3 hierarchy
* Creating the Sunburst layout
* Rendering arcs
* Applying theme colors
* Rendering labels
* Managing interactions and navigation

### `Breadcrumb.tsx`

Handles the navigation context of the current view.

### `DetailPanel.tsx`

Displays additional information when a sub-theme is selected.

### `themes.ts`

Contains the application's hierarchical dataset.

### `types.ts`

Defines the TypeScript types used by the application.

## Development Philosophy

MAPA is being developed with a focus on:

* **Component-based architecture**
* **Separation of data and presentation**
* **Type safety with TypeScript**
* **Reusable and maintainable code**
* **Clear data visualization**
* **Progressive enhancement**
* **Responsive design**

The goal is to keep the codebase as simple and lightweight as possible while maintaining a structure that can scale as the application grows.

## Roadmap

### Current

* [x] React application setup
* [x] TypeScript integration
* [x] D3 Sunburst visualization
* [x] Hierarchical data structure
* [x] 8 main themes
* [x] Equal-sized main themes
* [x] Theme-based colors
* [x] Interactive navigation
* [x] Sub-theme selection
* [x] Detail panel
* [ ] Responsive design

### Future

* [ ] Connect the frontend to the backend
* [ ] Replace demo data with real data
* [ ] Improve label rendering
* [ ] Refine animations and interactions
* [ ] Improve accessibility
* [ ] Production deployment
* [ ] Additional data exploration features

## Status

**MAPA is currently under active development.**

The current version is an interactive frontend prototype focused on exploring hierarchical data through a Sunburst visualization.

## License

This project is currently intended for development and demonstration purposes.
