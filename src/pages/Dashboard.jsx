import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
  Loader2, 
  Newspaper, 
  Car, 
  Mail, 
  RefreshCcw, 
  TrendingUp, 
  LayoutDashboard 
} from "lucide-react";
import BlogList from "../components/admin/BlogList";
import CarListCard from "../components/admin/CarList";
import MessageList from "../components/admin/MessageList"; 
import { useNavigate } from "react-router-dom";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const STRAPI_BASE_URL = "http://72.61.240.241:1337/api";

// --- UI Components ---

const DataCard = ({ label, count, icon: Icon, colorClass, trend }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex items-center justify-between group">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-gray-800">{count}</h3>
        {trend && (
          <div className="flex items-center mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
             <TrendingUp className="w-3 h-3 mr-1" /> {trend}
          </div>
        )}
      </div>
      <div className={`p-4 rounded-xl ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-8 h-8 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
  );
};

const SectionWrapper = ({ title, children, icon: Icon }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
    <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
      {Icon && <Icon className="w-5 h-5 text-gray-500" />}
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 shadow-xl">
        <p className="font-bold mb-1">{payload[0].name}</p>
        <p>Count: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// --- Main Dashboard ---

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ blogs: [], cars: [], messages: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("authToken");

  const fetchData = useCallback(async (isRefresh = false) => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (isRefresh) setRefreshing(true);
    
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [blogsRes, carsRes, msgRes] = await Promise.all([
        axios.get(`${STRAPI_BASE_URL}/blogs`, config),
        axios.get(`${STRAPI_BASE_URL}/cars`, config),
        axios.get(`${STRAPI_BASE_URL}/messages`, config),
      ]);

      setData({
        blogs: blogsRes.data.data,
        cars: carsRes.data.data,
        messages: msgRes.data.data,
      });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate Chart Data safely
  const processChartData = () => {
    const counts = {};
    if (!data.messages.length) return [];

    data.messages.forEach((msg) => {
      // Fallback to 'New' if leadStatus is missing
      const status = msg?.attributes?.leadStatus || msg?.leadStatus || "New";
      counts[status] = (counts[status] || 0) + 1;
    });

    return Object.keys(counts).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize
      value: counts[key],
    }));
  };

  const pieData = processChartData();
  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]; // Blue, Green, Amber, Red

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-500 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white shadow-lg rounded-xl">
          <p className="text-red-500 font-bold text-xl mb-2">Oops!</p>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => fetchData()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Welcome back, here is your daily overview.</p>
        </div>
        
        <button 
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 hover:text-blue-600 transition-colors disabled:opacity-50"
        >
          <RefreshCcw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {/* Summary Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DataCard 
          label="Total Articles" 
          count={data.blogs.length} 
          icon={Newspaper} 
          colorClass="bg-lime-500 text-white"
          trend="Active"
        />
        <DataCard 
          label="Available Cars" 
          count={data.cars.length} 
          icon={Car} 
          colorClass="bg-indigo-500 text-white"
          trend="In Stock"
        />
        <DataCard 
          label="Total Leads" 
          count={data.messages.length} 
          icon={Mail} 
          colorClass="bg-amber-500 text-white"
          trend="+2 today"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Lists (Takes up 2/3 space) */}
        <div className="lg:col-span-2 space-y-8">
          <SectionWrapper title="Latest Messages" icon={Mail}>
            {data.messages.length > 0 ? (
              <MessageList messages={data.messages.slice(0, 5)} /> // Limit to recent 5?
            ) : (
              <p className="text-gray-400 italic text-center py-4">No messages yet.</p>
            )}
          </SectionWrapper>

          <SectionWrapper title="Car Inventory" icon={Car}>
             <CarListCard cars={data.cars} />
          </SectionWrapper>

          <SectionWrapper title="Blog Posts" icon={Newspaper}>
            <BlogList blogs={data.blogs} />
          </SectionWrapper>
        </div>

        {/* Right Column: Analytics (Takes up 1/3 space) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Lead Analytics</h2>
            <p className="text-sm text-gray-500 mb-6">Distribution of message statuses</p>
            
            <div className="h-[300px] w-full flex items-center justify-center relative">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60} // Makes it a Donut Chart
                      outerRadius={80}
                      paddingAngle={5}
                      fill="#8884d8"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-gray-400">
                  <p>No data to display</p>
                </div>
              )}
              
              {/* Center Text for Donut Chart */}
              {pieData.length > 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-4 text-center pointer-events-none">
                  <span className="text-2xl font-bold text-gray-800">{data.messages.length}</span>
                  <p className="text-xs text-gray-400 uppercase">Total</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;