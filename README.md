# To run the project from Git, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shirishsriv/AnalyticsDashboard.git
   cd AnalyticsDashboard
   ```

2. **Install dependencies:**
   Ensure you have **Node.js** (which includes npm) installed. Then run:
   ```bash
   npm install
   ```

3. **(If not already configured) Configure Tailwind CSS:**
   - Generate Tailwind config files:
     ```bash
     npx tailwindcss init -p
     ```
   - Update the `tailwind.config.js` content array and `src/index.css` as described in `Steps.md`.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   This will output a local URL (e.g., http://localhost:5173). Open it in your browser to view the dashboard.

**Note:** All details and additional setup instructions can be found in [`Steps.md`](https://github.com/shirishsriv/AnalyticsDashboard/blob/main/Steps.md).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
