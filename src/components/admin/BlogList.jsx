// src/components/BlogList.jsx
import React from "react";
import { Newspaper } from "lucide-react";

const BlogList = ({ blogs }) => {
  // Sort blogs by createdAt in descending order (most recent first) and limit to 3
  const displayedBlogs = blogs
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <section className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Newspaper className="h-6 w-6 mr-3 text-green-600" />
        Latest Blog Posts
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Excerpt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Published
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {displayedBlogs.map((blog) => (
              <tr key={blog.id}>
                {/* Title */}
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                  {blog.title || "Untitled"}
                </td>

                {/* Slug */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {blog.slug}
                </td>

                {/* Excerpt */}
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                  {blog.excerpt || "No description"}
                </td>

                {/* Published Date */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </td>

                {/* Created Date */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>

                {/* Updated Date */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BlogList;
