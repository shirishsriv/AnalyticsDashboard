import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Sector } from 'recharts';
import { ChevronDown, ChevronUp, Search, Sun, Moon, Users, DollarSign, BarChart2, CheckSquare } from 'lucide-react';

// --- MOCK DATA FETCHING ---
const fetchUsers = () => {
    return fetch('https://dummyjson.com/users?limit=100')
        .then(res => res.json())
        .then(data => data.users);
};

const fetchProducts = () => {
    return fetch('https://dummyjson.com/products?limit=100')
        .then(res => res.json())
        .then(data => data.products);
};

// --- HELPER FUNCTIONS ---
const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

// --- THEME TOGGLE HOOK ---
const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return [theme, toggleTheme];
};


// --- UI COMPONENTS ---

const MetricCard = ({ title, value, change, icon: Icon, isLoading }) => {
    if (isLoading) {
        return <MetricCardSkeleton />;
    }
    const isPositive = change >= 0;
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
                    <span className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</span>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                    <Icon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                </div>
            </div>
            <div className={`mt-4 text-sm flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="ml-1">{Math.abs(change)}% vs last month</span>
            </div>
        </div>
    );
};

const MetricCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
        <div className="flex justify-between items-start">
            <div className="flex flex-col w-3/4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
            <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full h-12 w-12"></div>
        </div>
        <div className="mt-4 h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
    </div>
);


const ChartContainer = ({ title, children, isLoading }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
        <div style={{ height: '300px' }}>
            {isLoading ? <ChartSkeleton /> : children}
        </div>
    </div>
);

const ChartSkeleton = () => (
    <div className="w-full h-full flex items-end justify-between animate-pulse px-4">
        <div className="w-1/12 h-1/3 bg-gray-200 dark:bg-gray-700 rounded-t-md"></div>
        <div className="w-1/12 h-2/3 bg-gray-200 dark:bg-gray-700 rounded-t-md"></div>
        <div className="w-1/12 h-1/2 bg-gray-200 dark:bg-gray-700 rounded-t-md"></div>
        <div className="w-1/12 h-3/4 bg-gray-200 dark:bg-gray-700 rounded-t-md"></div>
        <div className="w-1/12 h-1/3 bg-gray-200 dark:bg-gray-700 rounded-t-md"></div>
        <div className="w-1/12 h-2/4 bg-gray-200 dark:bg-gray-700 rounded-t-md"></div>
        <div className="w-1/12 h-1/2 bg-gray-200 dark:bg-gray-700 rounded-t-md"></div>
    </div>
);

const ActiveShapePieChart = ({ data, isLoading }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const renderActiveShape = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-midAngle * (Math.PI / 180));
        const cos = Math.cos(-midAngle * (Math.PI / 180));
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg dark:fill-white">
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="dark:fill-gray-300">{`Count ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    if (isLoading) return <ChartSkeleton />;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

const DataTable = ({ data, isLoading }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const itemsPerPage = 10;

    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.firstName.toLowerCase().includes(filter.toLowerCase()) ||
            item.lastName.toLowerCase().includes(filter.toLowerCase()) ||
            item.email.toLowerCase().includes(filter.toLowerCase())
        );
    }, [data, filter]);

    const sortedData = useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredData, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        if (sortConfig.direction === 'ascending') return <ChevronUp className="h-4 w-4 inline ml-1" />;
        return <ChevronDown className="h-4 w-4 inline ml-1" />;
    };
    
    if (isLoading) {
        return <DataTableSkeleton />;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">User List</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Filter users..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700/50">
                            {['ID', 'Name', 'Email', 'Company'].map((head, i) => {
                                const key = i === 0 ? 'id' : i === 1 ? 'firstName' : i === 2 ? 'email' : 'company.name';
                                return (
                                <th key={head} className="p-4 font-semibold text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => requestSort(key)}>
                                    {head} {getSortIcon(key)}
                                </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map(user => (
                            <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-4 text-gray-800 dark:text-gray-200">{user.id}</td>
                                <td className="p-4 text-gray-800 dark:text-gray-200 flex items-center">
                                  <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="h-8 w-8 rounded-full mr-3" />
                                  {user.firstName} {user.lastName}
                                </td>
                                <td className="p-4 text-gray-800 dark:text-gray-200">{user.email}</td>
                                <td className="p-4 text-gray-800 dark:text-gray-200">{user.company.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} users
                </span>
                <div className="flex items-center">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded-md bg-white dark:bg-gray-700 disabled:opacity-50">Prev</button>
                    <span className="px-3 text-gray-700 dark:text-gray-300">{currentPage} / {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md bg-white dark:bg-gray-700 disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    );
};

const DataTableSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
        <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
        </div>
        <div className="overflow-x-auto">
            <div className="w-full">
                <div className="bg-gray-50 dark:bg-gray-700/50 flex justify-between p-4">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-1/5"></div>)}
                </div>
                <div>
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                            <div className="flex items-center w-1/4">
                                <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
                                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            </div>
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);


// --- MAIN APP COMPONENT ---
export default function App() {
    const [theme, toggleTheme] = useTheme();
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [usersData, productsData] = await Promise.all([fetchUsers(), fetchProducts()]);
                // Simulate a longer load time to see skeletons
                setTimeout(() => {
                    setUsers(usersData);
                    setProducts(productsData);
                    setIsLoading(false);
                }, 1500);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const revenueData = useMemo(() => {
        if (products.length === 0) return [];
        // Create some fake monthly revenue data for the line chart
        return Array.from({ length: 12 }, (_, i) => {
            const month = new Date(0, i).toLocaleString('default', { month: 'short' });
            const revenue = products.slice(i * 8, (i + 1) * 8).reduce((acc, p) => acc + p.price * (p.stock > 0 ? Math.floor(Math.random() * 10) + 1 : 0), 0) * 100;
            return { name: month, revenue: Math.floor(revenue) };
        });
    }, [products]);

    const userStateData = useMemo(() => {
        if (users.length === 0) return [];
        const states = users.reduce((acc, user) => {
            const state = user.address.state;
            acc[state] = (acc[state] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(states).map(([name, count]) => ({ name, count })).slice(0, 10);
    }, [users]);

    const productCategoryData = useMemo(() => {
        if (products.length === 0) return [];
        const categories = products.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    }, [products]);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg hidden lg:block">
                    <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">ADmyBRAND</h1>
                    <nav className="mt-10">
                        <a href="#" className="flex items-center py-2 px-4 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-lg font-semibold">
                            <BarChart2 className="h-5 w-5 mr-3" />
                            Dashboard
                        </a>
                        {/* Add other nav links here */}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-10">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
                            <p className="text-gray-500 dark:text-gray-400">Welcome back, here's your performance overview.</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
                            </button>
                            <div className="relative">
                                <img src="https://dummyjson.com/icon/emilys/128" alt="User" className="h-10 w-10 rounded-full" />
                            </div>
                        </div>
                    </header>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <MetricCard title="Total Revenue" value={formatCurrency(125430)} change={12.5} icon={DollarSign} isLoading={isLoading} />
                        <MetricCard title="Active Users" value="1,240" change={-2.1} icon={Users} isLoading={isLoading} />
                        <MetricCard title="Conversions" value="876" change={8.3} icon={CheckSquare} isLoading={isLoading} />
                        <MetricCard title="Growth" value="+15.2%" change={15.2} icon={BarChart2} isLoading={isLoading} />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
                        <div className="lg:col-span-3">
                            <ChartContainer title="Monthly Revenue" isLoading={isLoading}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128,128, 0.2)" />
                                        <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                                        <YAxis tickFormatter={val => formatCurrency(val).slice(0, -3)+'k'} stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                                        <Tooltip
                                            contentStyle={{ 
                                                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                                                borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb'
                                            }}
                                            formatter={(value) => [formatCurrency(value), 'Revenue']}
                                        />
                                        <Legend />
                                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                        <div className="lg:col-span-2">
                             <ChartContainer title="Product Categories" isLoading={isLoading}>
                                <ActiveShapePieChart data={productCategoryData.slice(0, 5)} isLoading={isLoading} />
                             </ChartContainer>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 mb-8">
                        <ChartContainer title="Users by State" isLoading={isLoading}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={userStateData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128,128, 0.2)" />
                                    <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                                    <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                                    <Tooltip
                                         contentStyle={{ 
                                            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                                            borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb'
                                        }}
                                        formatter={(value) => [value, 'Users']}
                                    />
                                    <Legend />
                                    <Bar dataKey="count" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>

                    {/* Data Table */}
                    <DataTable data={users} isLoading={isLoading} />
                </main>
            </div>
        </div>
    );
}

