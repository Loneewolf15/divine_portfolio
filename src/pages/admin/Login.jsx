import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { token } = await login(email, password);
            localStorage.setItem("authToken", token);
            navigate("/admin");
        } catch (err) {
            setError("Invalid credentials (try admin@example.com / password)");
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-black-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-black-200 rounded-xl border border-black-300">
                <h2 className="text-3xl font-bold text-center text-white">Admin Login</h2>
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-black-300 text-white placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-black-300 text-white placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
