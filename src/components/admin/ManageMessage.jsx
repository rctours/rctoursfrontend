import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Search, SortAsc, SortDesc, RefreshCw, Eye, Phone, MessageSquare, Calendar, MapPin, Clock } from "lucide-react";

const API_BASE = "/api";

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // DEFAULT SORT: Created At, Descending (Newest First)
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("authToken");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Helper to format Date AND Time
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const fetchMessages = async (page = currentPage, sort = sortBy, order = sortOrder, search = searchQuery) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        "sort": `${sort}:${order}`,
      });
      if (search) {
        params.append("filters[$or][0][name][$containsi]", search);
        params.append("filters[$or][1][message][$containsi]", search);
      }
      const res = await axios.get(`${API_BASE}/messages?${params}`, config);
      const formatted = res.data.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        name: item.name || "Unknown",
        phoneNumber: item.phoneNumber || "",
        message: item.message || "",
        date: item.date || "",
        destination: item.destination || "",
        leadStatus: item.leadStatus || "lead created",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
      setMessages(formatted);
      setTotalPages(res.data.meta.pagination.pageCount);
    } catch (err) {
      console.error("Error fetching messages:", err);
      alert("Failed to fetch messages. Check your token or server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentPage, sortBy, sortOrder, searchQuery]);

  const handleDelete = async (documentId) => {
    if (!token) return alert("No token found. Please login.");
    if (window.confirm("Are you sure you want to delete this message?")) {
      setDeleting(documentId);
      try {
        await axios.delete(`${API_BASE}/messages/${documentId}`, config);
        fetchMessages();
      } catch (err) {
        console.error("Error deleting message:", err);
        alert("Failed to delete message.");
      } finally {
        setDeleting(null);
      }
    }
  };

  const handleStatusUpdate = async (documentId, newStatus) => {
    setUpdating(documentId);
    try {
      await axios.put(
        `${API_BASE}/messages/${documentId}`,
        { data: { leadStatus: newStatus } },
        config
      );
      fetchMessages();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    } finally {
      setUpdating(null);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "lead created":
        return "bg-red-100 text-red-800 border-red-200";
      case "viewed":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "contacted":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
          <MessageSquare className="h-8 w-8 mr-3 text-blue-600" />
          Manage Messages
        </h1>

        {/* Controls */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name or message..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={`${sortBy}:${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split(":");
              setSortBy(field);
              setSortOrder(order);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="createdAt:desc">Newest First</option>
            <option value="createdAt:asc">Oldest First</option>
            <option value="name:asc">Name A-Z</option>
            <option value="name:desc">Name Z-A</option>
            <option value="leadStatus:asc">Status A-Z</option>
            <option value="leadStatus:desc">Status Z-A</option>
          </select>
          <button
            onClick={() => fetchMessages()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <RefreshCw className="animate-spin h-8 w-8 text-blue-600 mr-3" />
            <p className="text-lg text-gray-700">Loading messages...</p>
          </div>
        ) : (
          <>
            {/* Table for desktop */}
            <div className="hidden md:block bg-white shadow-sm border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Phone className="inline h-4 w-4 mr-1" />
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <MessageSquare className="inline h-4 w-4 mr-1" />
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Travel Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        Destination
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("leadStatus")}>
                        Status {sortBy === "leadStatus" && (sortOrder === "asc" ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("createdAt")}>
                        Created {sortBy === "createdAt" && (sortOrder === "asc" ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("updatedAt")}>
                        Updated {sortBy === "updatedAt" && (sortOrder === "asc" ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {messages.map((msg, index) => (
                      <tr key={msg.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {msg.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {msg.phoneNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={msg.message}>
                          {msg.message}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {msg.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {msg.destination}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={msg.leadStatus}
                            onChange={(e) => handleStatusUpdate(msg.documentId, e.target.value)}
                            disabled={updating === msg.documentId}
                            className={`px-2 py-1 border rounded-full text-xs font-medium ${getStatusColor(msg.leadStatus)} ${updating === msg.documentId ? 'opacity-50' : ''}`}
                          >
                            <option value="lead created">Lead Created</option>
                            <option value="viewed">Viewed</option>
                            <option value="contacted">Contacted</option>
                          </select>
                        </td>
                        {/* Displaying Date AND Time */}
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                          {formatDateTime(msg.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                          {formatDateTime(msg.updatedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDelete(msg.documentId)}
                            disabled={deleting === msg.documentId}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            {deleting === msg.documentId ? "..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-white p-4 shadow-sm border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-900">{msg.name}</h3>
                    <span className={`px-2 py-1 border rounded-full text-xs font-medium ${getStatusColor(msg.leadStatus)}`}>
                      {msg.leadStatus}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><Phone className="inline h-4 w-4 mr-1" /> {msg.phoneNumber}</p>
                    <p><MessageSquare className="inline h-4 w-4 mr-1" /> {msg.message}</p>
                    <p><Calendar className="inline h-4 w-4 mr-1" /> {msg.date}</p>
                    <p><MapPin className="inline h-4 w-4 mr-1" /> {msg.destination}</p>
                    {/* Showing Time in Cards */}
                    <p className="text-xs text-gray-500 mt-2">
                      <Clock className="inline h-3.5 w-3.5 mr-1" /> 
                      Created: {formatDateTime(msg.createdAt)}
                    </p>
                    <p className="text-xs text-gray-500">
                      <Clock className="inline h-3.5 w-3.5 mr-1" /> 
                      Updated: {formatDateTime(msg.updatedAt)}
                    </p>
                  </div>
                  <div className="mt-3 flex justify-between items-center border-t pt-3">
                    <select
                      value={msg.leadStatus}
                      onChange={(e) => handleStatusUpdate(msg.documentId, e.target.value)}
                      disabled={updating === msg.documentId}
                      className={`px-3 py-1 border rounded-lg text-sm ${getStatusColor(msg.leadStatus)} ${updating === msg.documentId ? 'opacity-50' : ''}`}
                    >
                      <option value="lead created">Lead Created</option>
                      <option value="viewed">Viewed</option>
                      <option value="contacted">Contacted</option>
                    </select>
                    <button
                      onClick={() => handleDelete(msg.documentId)}
                      disabled={deleting === msg.documentId}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {deleting === msg.documentId ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageMessages;