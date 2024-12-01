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

export const fetchStudentData = async (id) => {
    const response = await fetch(`${API_URL}/api/students/${id}`);
    if (!response.ok) {
        throw new Error('학생 정보를 가져오는 데 실패했습니다.');
    }
    const data = await response.json(); // JSON 데이터를 변수에 저장
    return data.result; // 저장된 데이터를 반환
};