
import { useEffect, useState, useRef } from "react";
import { getPosts } from "../services/api";
import BlogCard from "../components/BlogCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useGSAP(() => {
        if (!loading && posts.length > 0) {
            gsap.from(".blog-title", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(".blog-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                delay: 0.3
            });
        }
    }, [loading, posts]);

    return (
        <section className="c-space my-20 pt-20" ref={containerRef}>
            <div className="w-full text-white-600">
                <div className="relative mb-20 flex flex-col items-center text-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
                    <h1 className="head-text blog-title relative z-10">
                        Insights & <span className="text-blue_gradient">Thoughts</span>
                    </h1>
                    <p className="mt-4 text-white-500 text-lg max-w-2xl mx-auto blog-title relative z-10">
                        Exploring the intersection of design, code, and creativity.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-white text-xl animate-pulse">Loading amazing content...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {posts.map((post, index) => (
                            <div key={post.id} className="blog-card">
                                <BlogCard post={post} index={index} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blog;
