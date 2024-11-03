import "chart.js/auto";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const Dashboard = () => {
    const [metrics, setMetrics] = useState([] as any[]);

    useEffect(() => {
        const fetchMetrics = async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/metrics", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMetrics(response.data);
        };
        fetchMetrics();
    }, []);
    const chartData = {
        labels: metrics.map((m) => `${m.country}-${m.operator}`),
        datasets: [
            {
                label: "Success Rate",
                data: metrics.map((m) => m.success_rate),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <Line data={chartData} />
            </div>
            <table className="mt-8 w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Country</th>
                        <th className="px-4 py-2 border">Operator</th>
                        <th className="px-4 py-2 border">SMS Sent</th>
                        <th className="px-4 py-2 border">Success Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.map((metric, idx) => (
                        <tr key={idx} className="text-center border-b">
                            <td className="px-4 py-2 border">
                                {metric.country}
                            </td>
                            <td className="px-4 py-2 border">
                                {metric.operator}
                            </td>
                            <td className="px-4 py-2 border">
                                {metric.sms_sent}
                            </td>
                            <td className="px-4 py-2 border">
                                {metric.success_rate}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
