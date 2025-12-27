import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost } from "../services/api";

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(id);
                setPost(data);
            } catch (error) {
                console.error("Failed to fetch post", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center items-center text-white">
                Loading...
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen pt-32 flex flex-col justify-center items-center text-white">
                <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                <Link to="/blog" className="text-blue-400 hover:underline">Back to Blog</Link>
            </div>
        );
    }

    return (
        <article className="c-space pt-32 pb-20 min-h-screen relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="max-w-4xl mx-auto relative z-10 px-4">
                <Link to="/blog" className="group inline-flex items-center text-white-500 hover:text-white mb-8 transition-colors">
                    <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </span>
                    Back to Blog
                </Link>

                <div className="relative w-full h-80 md:h-[500px] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black-100 via-transparent to-transparent opacity-60 z-10" />
                    <img
                        src={post.image || "https://placehold.co/800x400/1a1a1a/cccccc?text=Blog+Header"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-sm text-white mb-4">
                            Article
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">{post.title}</h1>
                        <p className="text-white-500 text-lg">{post.date}</p>
                    </div>
                </div>

                <div className="prose prose-xl prose-invert max-w-none text-white-600">
                    <div className="bg-black-200/30 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12">
                        <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
