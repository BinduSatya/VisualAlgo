# Visual Algo — Algorithm Visualizer

Visual Algo is an interactive web app for learning and exploring algorithm behavior through real-time visualizations and AI-assisted explanations. It combines sorting visualizers, grid-based graph search visualizers, and AI-powered dry-run / Q&A and code generation features.

Why it matters

- Makes abstract algorithm concepts tangible by visualizing comparisons, swaps, visited nodes and paths.
- Accelerates learning for students and developers by combining step-by-step dry-run traces and an AI assistant.
- Helps educators build demos and engineers prototype algorithm logic and alternative language implementations quickly.

Quick overview

- Frontend: React + Vite app that renders visualizations and UI.
  - Entry: [frontend/src/main.jsx](frontend/src/main.jsx)
  - Router: [frontend/src/App.jsx](frontend/src/App.jsx)
  - Vite config: [frontend/vite.config.js](frontend/vite.config.js)
  - Frontend environment: [frontend/src/.env](frontend/src/.env)
- Backend: Express server using Google GenAI to generate dry-run text, chat responses and translated code snippets.
  - Entry: [backend/index.js](backend/index.js)
  - Backend env: [backend/.env](backend/.env)

Main features

- Sorting visualizer

  - Algorithms list and wiring: [`algorithms`](frontend/src/Sorting/Algos/algorithms.js)
  - Implementations: [`InsertionSort`](frontend/src/Sorting/Algos/InsertionSort.js), [`MergeSort`](frontend/src/Sorting/Algos/MergeSort.js), [`QuickSort`](frontend/src/Sorting/Algos/QuickSort.js), [`BubbleSort`](frontend/src/Sorting/Algos/BubbleSort.js), [`SelectionSort`](frontend/src/Sorting/Algos/SelectionSort.js)
  - UI: [frontend/src/Sorting/SortingPage.jsx](frontend/src/Sorting/SortingPage.jsx), visual bars: [frontend/src/Components/BarsContainer.jsx](frontend/src/Components/BarsContainer.jsx)
  - Dry-run simulation and AI: [`Simulator`](frontend/src/Sorting/Explanations/explanation.js) → backend `/simulate`

- Graph algorithms visualizer

  - Grid and interaction: [frontend/src/Components/Grid.jsx](frontend/src/Components/Grid.jsx)
  - Shared state: [`gridStore`](frontend/src/state/zustand.jsx)
  - Graph algorithms: [`runDijkstra`](frontend/src/Graphs/Algos/DjiksthraAlgo.js), [`runDFS`](frontend/src/Graphs/Algos/DFS.js), [`runBFS`](frontend/src/Graphs/Algos/BFS.js), [`runAStar`](frontend/src/Graphs/Algos/AStar.js), [`runBidirectionalBFS`](frontend/src/Graphs/Algos/BiDirectionalBFS.js)

- AI & tooling
  - Dry-run / chat / code endpoints in [backend/index.js](backend/index.js)
  - Chat UI and code generation containers: [frontend/src/Components/QueryContainer.jsx](frontend/src/Components/QueryContainer.jsx), [frontend/src/Components/CodeGenerationContainer.jsx](frontend/src/Components/CodeGenerationContainer.jsx), [frontend/src/Components/DryRunContainer.jsx](frontend/src/Components/DryRunContainer.jsx)
  - Utility helpers: [`generateRandomArray`, `delay`, `randomizeWalls`, `getTime`] (see [frontend/src/utils/utils.js](frontend/src/utils/utils.js))
  - Simulator client: [`Simulator`](frontend/src/Sorting/Explanations/explanation.js) calls backend `/simulate`
  - Code-from-AI flow: [`fetchCodeForLanguage`](frontend/src/Sorting/Explanations/explanation.js) → backend `/get-code-from-ai`

How to run locally

1. Install dependencies

   - Frontend: open `frontend` and run:
     npm install
   - Backend: open `backend` and run:
     npm install
     Files: [frontend/package.json](frontend/package.json), [backend/package.json](backend/package.json)

2. Start backend (defaults to port 8000)

   - From `backend`:
     npm run dev
   - Ensure your backend env is set: [backend/.env](backend/.env)

3. Start frontend
   - From `frontend`:
     npm run dev
   - Frontend uses Vite and environment: [frontend/src/.env](frontend/src/.env)


Design notes & architecture
- State is centralized for grid/graph interactions in [`gridStore`](frontend/src/state/zustand.jsx) so algorithms and UI components share state without prop-drilling.
- Sorting visualizers use async functions and a shared `delay` helper (`frontend/src/utils/utils.js`) to animate steps.
- Backend acts as an AI middleware proxy using Google GenAI for:
  - dry-run simulation (`/simulate`)
  - chat assistant (`/chat-with-ai`)
  - code translation/generation (`/get-code-from-ai`)
    See implementation: [backend/index.js](backend/index.js)

Impact and use cases
- Education: Demonstrate algorithm internals and complexity intuitively to students.
- Interview prep: Step-through visualizations help candidates reason about code.
- Prototyping: Quickly convert algorithm logic to other languages via the AI code generator.
- Accessibility: Visual + textual explanations cater to different learning styles.

Important files and links
- Frontend app: [frontend/src/main.jsx](frontend/src/main.jsx), [frontend/src/App.jsx](frontend/src/App.jsx)
- Sorting algorithms index: [`algorithms`](frontend/src/Sorting/Algos/algorithms.js)
- Grid store: [`gridStore`](frontend/src/state/zustand.jsx)
- Utils: [frontend/src/utils/utils.js](frontend/src/utils/utils.js)
- Backend server: [backend/index.js](backend/index.js)
- Env examples: [frontend/src/.env](frontend/src/.env), [backend/.env](backend/.env)


- This repository stitches together educational visualization patterns and AI integration.