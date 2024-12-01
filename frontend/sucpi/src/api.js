const API_URL = process.env.REACT_APP_API_URL || "http://localhost";

export const fetchLeaderboardData = async () => {
    try {
        const response = await fetch(`${API_URL}/api/admin/leaderboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.result || [];
    } catch (error) {
        throw new Error(error.message || "Something went wrong");
    }
};
