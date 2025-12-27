import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getPost, savePost } from "../../services/api";

const PostEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            getPost(id).then(post => {
                if (post) {
                    setValue("title", post.title);
                    setValue("summary", post.summary);
                    setValue("content", post.content);
                    setValue("image", post.image);
                    setValue("id", post.id);
                }
            });
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        await savePost(data);
        setLoading(false);
        navigate("/admin");
    };

    return (
        <div className="min-h-screen pt-24 px-4 bg-black-100 text-white">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">{id ? "Edit Post" : "Create Post"}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-black-200 p-8 rounded-xl border border-gray-800">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input {...register("title", { required: true })} className="w-full bg-black-300 border border-gray-700 rounded-md p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Summary</label>
                        <textarea {...register("summary")} className="w-full bg-black-300 border border-gray-700 rounded-md p-2 text-white" rows="3" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input {...register("image")} className="w-full bg-black-300 border border-gray-700 rounded-md p-2 text-white" placeholder="/images/blog/..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Content</label>
                        <textarea {...register("content", { required: true })} className="w-full bg-black-300 border border-gray-700 rounded-md p-2 text-white font-mono" rows="10" />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={() => navigate("/admin")} className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800">Cancel</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50">
                            {loading ? "Saving..." : "Save Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostEditor;
