import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader"; // ✅ import loader

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // ✅ new loading jtostu thestate
  const blogsPerPage = 6;

  // ✅ Fetch blogs from Strapi
  useEffect(() => {
    setLoading(true);
    axios
      // .get("https://appetizing-vacation-f624a8a99b.strapiapp.com/api/blogs?populate=*")
      .get("/api/blogs?populate=*")
      .then((res) => {
        const data = res.data.data || [];
        setBlogs(data);
        setFilteredBlogs(data);
      })
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoading(false)); // ✅ hide loader after data fetched
  }, []);

  // ✅ Search + Sort
  useEffect(() => {
    let updated = [...blogs];

    if (search.trim()) {
      updated = updated.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOrder === "newest") {
      updated.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sortOrder === "oldest") {
      updated.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    } else if (sortOrder === "title") {
      updated.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredBlogs(updated);
    setCurrentPage(1);
  }, [search, sortOrder, blogs]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  // ✅ Show loader while fetching
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="py-20 bg-stone-100 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center my-10 gap-4">
          <h2 className="text-4xl font-bold text-text-heading text-center md:text-left">
            Travel Blogs & Guides
          </h2>

          {/* Search + Sort Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-end">
            <input
              type="text"
              placeholder="Search blogs..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className="col-span-full text-center text-gray-600 py-10">
              No blogs found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg border transition ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
