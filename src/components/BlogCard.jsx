import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, documentId, slug, excerpt, coverImage } = blog;
  
  // ✅ Fix image URL handling: In your API response, coverImage is either null or an object with a direct 'url' property.
  // If no image, set to a placeholder URL for "No Image".
  const imageUrl = coverImage?.url || "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <Link
      to={`/blog/${documentId}`}
      className="block" // ✅ Added 'block' to make the Link behave as a block element for full card clickability
    >
      <div className="bg-emerald-100 shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-52 object-cover"
        />
        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          {/* ✅ Removed the extra <h3> displaying documentId, as it seems unintended */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
          <span className="text-blue-600 font-semibold hover:underline">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
