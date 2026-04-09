import { ArrowRight } from "lucide-react";

const BlogCard = ({ post }) => {
  return (
    <div>
      <div className="relative h-48 w-full">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">
          {post.title}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs text-slate-400 mb-4">
            <span>{post.author}</span>
            <span>{post.readTime}</span>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-xs text-slate-400">{post.date}</span>
            <a
              href={post.link}
              target="_blank"
              className="cursor-pointer text-orange-600 font-bold text-sm flex items-center hover:text-orange-700 transition-colors"
            >
              Read more <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
