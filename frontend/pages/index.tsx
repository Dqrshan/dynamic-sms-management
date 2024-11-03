import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async () => {
        try {
            const response = await axios.post("http://localhost:5000/login", {
                username,
                password,
            });
            console.log(response);
            localStorage.setItem("token", response.data.access_token);
            window.location.href = "/dashboard";
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Login
                </h2>
                {error && (
                    <div className="mt-4 p-2 text-center text-red-500 bg-red-100 rounded">
                        {error}
                    </div>
                )}
                <div className="mt-6">
                    <label className="block text-sm text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={login}
                    className="w-full mt-6 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Login;
