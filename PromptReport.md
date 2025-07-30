# 🚀 React Dashboard Webpage Prompt

## 🎯 Objective

Create a **modern**, **responsive**, and **interactive dashboard** using **React.js**. The dashboard should visualize data, display user metrics, support theme switching, and offer export capabilities for both charts and tables.

---

## 🛠️ Core Requirements

### 🎨 Styling & Theming

- **Tailwind CSS** for all styling.
- Implement **light/dark theme toggle**, persisting preference in `localStorage`.
- Layout must include:
  - **Sidebar** (visible on large screens, collapsible on small screens).
  - **Main content area**.
- Include:
  - Smooth transitions
  - Hover effects
  - Skeleton loaders for all major components:
    - Metric Cards
    - Charts
    - Data Table

---

### 📦 Data Handling

- Fetch data from the following APIs:
  - Users: `https://dummyjson.com/users?limit=100`
  - Products: `https://dummyjson.com/products?limit=100`
- Use a **global `isLoading` state**.
- Simulate a **1.5-second loading delay** to showcase skeletons.

---

## 📊 Dashboard Features

### 🔢 KPI Cards

Display 4 top metrics:

| Title            | Icon         | Notes                                 |
|------------------|--------------|----------------------------------------|
| Total Revenue    | `DollarSign` | Format as currency (e.g. `$125,430`)   |
| Users            | `Users`      |                                        |
| Conversions      | `CheckSquare`|                                        |
| Growth           | `BarChart2`  | Percentage change (with up/down arrow) |

- Show loading skeletons while fetching data.

---

### 📈 Charts (via `recharts`)

#### 📉 Monthly Revenue Line Chart
- Title: **Monthly Revenue**
- X-Axis: Month
- Y-Axis: Revenue (e.g. `price * random quantity`)
- Tooltip shows formatted values (`$125k`)
- Based on product data

#### 🥧 Product Categories Pie Chart
- Top 5 product categories
- Display:
  - Name
  - Count
  - Percentage
- Active segment highlight on hover

#### 📊 Users by State Bar Chart
- Top 10 states (from user addresses)
- Display user count by state

#### 📤 Chart Export
- Each chart includes an **Export menu**
  - Export as **PDF** using `html2canvas` and `jsPDF`
  - Disable export during loading
  - Include chart title in PDF
  - Ensure fixed container height

---

## 🧾 Data Table (User List)

### 🔍 Columns:
- ID
- Name (First + Last, with image)
- Email
- Company (company.name)

### 🧩 Features:
- Sorting (ID, Name, Email, Company) with up/down arrows
- Filter/Search by `firstName`, `lastName`, or `email`
- Pagination (10 users per page)
  - Prev/Next buttons
  - Show current range: `Showing X to Y of Z`
- Skeletons during load

### 📤 Table Export
- Export **as PDF** (`jsPDF + autoTable`)
- Export **as CSV** (`papaparse`)
- Use filtered/sorted data
- Disable export during loading

---

## 🧱 Component Structure & Optimization

**Suggested Reusable Components:**
- `App`
- `MetricCard`, `MetricCardSkeleton`
- `ChartContainer`, `ChartSkeleton`
- `ActiveShapePieChart`
- `DataTable`, `DataTableSkeleton`
- `ExportMenu`

### 💡 Optimizations:
- `useMemo` for:
  - `revenueData`
  - `userStateData`
  - `productCategoryData`
  - filtered/sorted table data
- `useRef` for:
  - Capturing chart DOM via `html2canvas`

---

## 📦 Dependencies

- `react`, `react-dom`
- `recharts`
- `lucide-react`
- `jspdf`, `jspdf-autotable`
- `html2canvas`
- `papaparse`

---

## 📂 Deliverables

A single **`App.js`** file that includes:
- All React components and logic
- Reusable hooks (e.g. `useTheme`)
- Clean, readable code
- Well-commented complex sections
- Follow React best practices
