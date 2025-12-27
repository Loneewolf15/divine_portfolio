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

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                if (field === "image") {
                    setValue("image", base64String);
                } else if (field === "content") {
                    const currentContent = document.querySelector('textarea[name="content"]').value;
                    const markdownImage = `\n![Uploaded Image](${base64String})\n`;
                    setValue("content", currentContent + markdownImage);
                }
            };
            reader.readAsDataURL(file);
        }
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

                    {/* Cover Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Cover Image</label>
                        <div className="flex gap-4 items-center">
                            <input
                                type="text"
                                {...register("image")}
                                className="flex-1 bg-black-300 border border-gray-700 rounded-md p-2 text-white"
                                placeholder="Image URL or Base64..."
                            />
                            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                                <span className="text-sm">Upload</span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, "image")} />
                            </label>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium">Content (Markdown)</label>
                            <label className="cursor-pointer text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-white transition-colors">
                                + Insert Image
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, "content")} />
                            </label>
                        </div>
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
