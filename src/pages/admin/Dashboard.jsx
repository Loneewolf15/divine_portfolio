import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPosts, deletePost } from "../../services/api";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getPosts();
        setPosts(data);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure?")) {
            await deletePost(id);
            fetchData();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-black-100 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="space-x-4">
                        <Link to="/admin/new" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Create New Post</Link>
                        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Logout</button>
                    </div>
                </div>

                <div className="bg-black-200 shadow overflow-hidden sm:rounded-md border border-gray-800">
                    <ul className="divide-y divide-gray-800">
                        {posts.map((post) => (
                            <li key={post.id} className="px-6 py-4 flex items-center justify-between hover:bg-black-300">
                                <div>
                                    <h3 className="text-lg font-medium">{post.title}</h3>
                                    <p className="text-sm text-gray-400">{post.date}</p>
                                </div>
                                <div className="flex space-x-3">
                                    <Link to={`/admin/edit/${post.id}`} className="text-blue-400 hover:text-blue-300">Edit</Link>
                                    <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
