import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "/api";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "", // Plain text for input
    tags: "", // Comma-separated string for input
  });

  // Pagination, Sorting, Searching states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Fixed page size
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("authToken");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Helper to convert content array to plain text
  const contentArrayToText = (contentArray) => {
    if (!Array.isArray(contentArray) || contentArray.length === 0) return "";
    return contentArray
      .filter((block) => block.type === "paragraph")
      .map((block) => block.children?.map((child) => child.text).join("") || "")
      .join("\n");
  };

  // Helper to convert plain text to content array
  const textToContentArray = (text) => {
    if (!text.trim()) return [];
    return [
      {
        type: "paragraph",
        children: [{ text: text.trim(), type: "text" }],
      },
    ];
  };

  // Helper to convert tags array to comma-separated string
  const tagsArrayToString = (tagsArray) => {
    return Array.isArray(tagsArray) ? tagsArray.join(", ") : "";
  };

  // Helper to convert comma-separated string to tags array
  const stringToTagsArray = (tagsString) => {
    return tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
  };

  // Fetch blogs with pagination, sorting, searching
  const fetchBlogs = async (page = currentPage, sort = sortBy, order = sortOrder, search = searchQuery) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        "sort": `${sort}:${order}`,
      });
      if (search) {
        params.append("filters[$or][0][title][$containsi]", search);
        params.append("filters[$or][1][content][children][text][$containsi]", search);
      }
      const res = await axios.get(`${API_BASE}/blogs?${params}`, config);
      const formatted = res.data.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title || "Untitled",
        slug: item.slug || "-",
        excerpt: item.excerpt || "-",
        content: item.content || [],
        tags: item.tags || [],
        image: item.image || "",
        publishedAt: item.publishedAt || "",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
      setBlogs(formatted);
      setTotalPages(res.data.meta.pagination.pageCount);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      alert("Failed to fetch blogs. Check your token or server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, sortBy, sortOrder, searchQuery]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      tags: "",
    });
    setCurrentBlog(null);
    setFormOpen(true);
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: contentArrayToText(blog.content),
      tags: tagsArrayToString(blog.tags),
    });
    setCurrentBlog(blog);
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) return alert("No token found. Please login.");
      const dataToSend = {
        ...formData,
        content: textToContentArray(formData.content),
        tags: stringToTagsArray(formData.tags),
      };
      if (currentBlog) {
        await axios.put(
          `${API_BASE}/blogs/${currentBlog.documentId}`,
          { data: dataToSend },
          config
        );
      } else {
        await axios.post(`${API_BASE}/blogs`, { data: dataToSend }, config);
      }
      setFormOpen(false);
      fetchBlogs(); // Refresh current page
    } catch (err) {
      console.error("Error saving blog:", err);
      const errorMessage = err.response?.data?.error?.message || "Error saving blog. Check your permissions or data.";
      alert(errorMessage);
    }
  };

  const handleDelete = async (documentId) => {
    if (!token) return alert("No token found. Please login.");
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${API_BASE}/blogs/${documentId}`, config);
        fetchBlogs(); // Refresh current page
      } catch (err) {
        console.error("Error deleting blog:", err);
        alert("Failed to delete blog. Check your token or server.");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset to first page on sort
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>

      {/* Controls */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by title or content..."
          value={searchQuery}
          onChange={handleSearch}
          className="flex-1 p-2 border rounded"
        />
        <select
          value={`${sortBy}:${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split(":");
            setSortBy(field);
            setSortOrder(order);
            setCurrentPage(1);
          }}
          className="p-2 border rounded"
        >
          <option value="createdAt:desc">Newest First</option>
          <option value="createdAt:asc">Oldest First</option>
          <option value="title:asc">Title A-Z</option>
          <option value="title:desc">Title Z-A</option>
        </select>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add Blog
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Table for desktop, Cards for mobile */}
          <div className="hidden md:block overflow-x-auto bg-white shadow-md border rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("title")}>
                    Title {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="p-3 text-left">Slug</th>
                  <th className="p-3 text-left">Excerpt</th>
                  <th className="p-3 text-left">Content Preview</th>
                  <th className="p-3 text-left">Tags</th>
                  <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("publishedAt")}>
                    Published {sortBy === "publishedAt" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{blog.id}</td>
                    <td className="p-3 font-medium">{blog.title}</td>
                    <td className="p-3">{blog.slug}</td>
                    <td className="p-3 max-w-xs truncate">{blog.excerpt}</td>
                    <td className="p-3 max-w-xs truncate">
                      {blog.content.length > 0 ? contentArrayToText(blog.content).slice(0, 50) + "..." : "-"}
                    </td>
                    <td className="p-3 max-w-xs truncate">
                      {blog.tags.length > 0 ? blog.tags.join(", ") : "-"}
                    </td>
                    <td className="p-3">
                      {blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.documentId)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-4 shadow-md border rounded-xl">
                <h3 className="font-bold text-lg">{blog.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{blog.excerpt}</p>
                <p className="text-sm mb-2">
                  <strong>Content:</strong> {blog.content.length > 0 ? contentArrayToText(blog.content).slice(0, 100) + "..." : "-"}
                </p>
                <p className="text-sm mb-2">
                  <strong>Tags:</strong> {blog.tags.length > 0 ? blog.tags.join(", ") : "-"}
                </p>
                <p className="text-sm mb-2">
                  <strong>Published:</strong> {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "-"}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.documentId)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Blog Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{currentBlog ? "Edit Blog" : "Add Blog"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="slug"
                placeholder="Slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="excerpt"
                placeholder="Excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="content"
                placeholder="Content (plain text)"
                value={formData.content}
                onChange={handleChange}
                className="w-full p-2 border rounded h-32"
              />
              <input
                type="text"
                name="tags"
                placeholder='Tags (comma-separated, e.g. tech, news)'
                value={formData.tags}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
