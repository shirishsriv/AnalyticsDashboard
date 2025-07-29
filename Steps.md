# How to Run Your React Application Locally

To get your React application up and running on your local machine, follow these steps:

---

## Prerequisites

Before you begin, make sure you have **Node.js** installed. This includes **npm** (Node Package Manager), which we'll use for managing project dependencies.

---

## Step 1: Create a New React Project

We'll use **Vite**, a modern build tool, to set up your React project quickly. Open your terminal and run the following command:

```bash
npm create vite@latest admybrand-dashboard -- --template react
```

This command will create a new folder named `admybrand-dashboard` in your current directory.

---

## Step 2: Navigate and Install Dependencies

First, navigate into your newly created project folder:

```bash
cd admybrand-dashboard
```

Next, install the necessary libraries for the dashboard. These include **recharts** for charts, **lucide-react** for icons, and **tailwindcss**, **postcss**, and **autoprefixer** for styling:

```bash
npm install recharts lucide-react tailwindcss postcss autoprefixer
```

---

## Step 3: Configure Tailwind CSS

Now, let's set up Tailwind CSS:

1. **Generate the Tailwind CSS configuration files by running:**

    ```bash
    npx tailwindcss init -p
    ```

    This will create `tailwind.config.js` and `postcss.config.js` in your project's root directory.

2. **Open `tailwind.config.js` and update the `content` array**. This tells Tailwind which files to scan for class names:

    ```js
    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      darkMode: 'class', // This enables the dark mode toggle
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

3. **Open your main CSS file, typically `src/index.css`**. Clear its existing content and add the following Tailwind directives:

    ```css
    /* src/index.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

---

## Step 4: Add the Dashboard Code

Copy the entire code from your **ADmyBRAND Insights Dashboard** document. Then, open the `src/App.jsx` file in your project and completely replace its existing content with the dashboard code.

---

## Step 5: Run the Application

You're almost there! To start the development server, run this command in your terminal:

```bash
npm run dev
```

The terminal will display a local URL (usually [http://localhost:5173](http://localhost:5173)). Open this URL in your web browser to see the dashboard in action!

---
