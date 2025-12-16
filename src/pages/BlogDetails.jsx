import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader";

const BlogDetails = () => {
  const { documentId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://appetizing-vacation-f624a8a99b.strapiapp.com/api/blogs/${documentId}?populate=*`
        );
        setBlog(res.data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [documentId]);

  if (loading) return <Loader />;

  if (!blog)
    return (
      <p className="text-center py-20 text-gray-600 text-lg">
        Blog not found 😔
      </p>
    );

  const { title, excerpt, content, tags, publishedAt, coverImage } = blog;

  // ✅ Fix image URL handling: Based on your API response structure, coverImage is either null or an object with a direct 'url' property.
  // Removed the incorrect localhost prepend and nesting assumption. If no image, set to a placeholder for "No Image".
  const imageUrl = coverImage?.url || "https://via.placeholder.com/800x400?text=No+Image";

  // Function to render structured content
  const renderContent = (blocks) => {
    if (!Array.isArray(blocks)) return null;
    return blocks.map((block, i) => {
      if (block.type === "paragraph") {
        return (
          <p key={i} className="mb-5 text-gray-700 leading-relaxed text-lg">
            {block.children.map((child) => child.text).join(" ")}
          </p>
        );
      }
      if (block.type === "heading") {
        return (
          <h2
            key={i}
            className="text-2xl font-semibold text-blue-700 mt-8 mb-4"
          >
            {block.children.map((child) => child.text).join(" ")}
          </h2>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Helmet>
        <title>{title} | RCTours</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={imageUrl} />
      </Helmet>

      <section className="py-25 bg-green-50 min-h-screen">
        <div className="container mx-auto max-w-7xl px-6">
          {/* ✅ Redesigned Layout: Image on left, content on right in a responsive grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Blog Image - Left Side */}
            <div className="relative">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
            </div>

            {/* Blog Content - Right Side */}
            <div className="space-y-6">
              {/* Blog Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>

              {/* Publish Date */}
              <p className="text-sm text-gray-500">
                🗓️ Published on {new Date(publishedAt).toDateString()}
              </p>

              {/* Tags */}
              {Array.isArray(tags) && (
                <div className="flex flex-wrap">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Excerpt */}
              {excerpt && (
                <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600">
                  {excerpt}
                </blockquote>
              )}

              {/* Content */}
<article className="prose prose-lg max-w-none text-gray-800 text-justify prose-p:text-justify">
                {renderContent(content)}
              </article>
            </div>
          </div>

     
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
