import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
    return (
        <Link to={`/blog/${post.id}`} className="block group relative">
            <div className="relative h-full bg-black-200/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-2">
                {/* Image Container with Overlay */}
                <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black-200 to-transparent opacity-60 z-10" />
                    <img
                        src={post.image || "https://placehold.co/600x400/1a1a1a/cccccc?text=Blog+Image"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs text-white">
                        Article
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <p className="text-gray-400 text-xs uppercase tracking-wider">{post.date}</p>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                        {post.summary}
                    </p>

                    <div className="flex items-center text-blue-400 text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                        Read Article
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
