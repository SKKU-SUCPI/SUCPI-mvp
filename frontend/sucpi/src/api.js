const API_URL = process.env.REACT_APP_API_URL || "http://localhost";

/**
 * 리더보드 데이터를 가져오는 함수
 */
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

/**
 * 학생 데이터를 가져오는 함수
 * @param {string} id - 학생 ID
 */
export const fetchStudentData = async (id) => {
    const response = await fetch(`${API_URL}/api/students/${id}`);
    if (!response.ok) {
        throw new Error('학생 정보를 가져오는 데 실패했습니다.');
    }
    const data = await response.json(); // JSON 데이터를 변수에 저장
    return data.result; // 저장된 데이터를 반환
};

/**
 * 가중치 데이터를 가져오는 함수
 */
export const fetchWeights = async () => {
    const response = await fetch(`${API_URL}/api/admin/weights`);
    if (!response.ok) {
        throw new Error('가중치를 가져오는 데 실패했습니다.');
    }
    const data = await response.json();
    return data.result; // `result`만 반환
};

/**
 * 특정 학생의 그래프 데이터를 가져오는 함수
 * @param {string} studentId - 학생 ID
 */
export const fetchGraphData = async (studentId) => {
    const response = await fetch(`${API_URL}/api/admin/weights/test/${studentId}`);
    if (!response.ok) {
        throw new Error('그래프 데이터를 가져오는 데 실패했습니다.');
    }
    return response.json();
};

/**
 * 비교 데이터를 서버로 전송하는 함수
 * @param {string} studentId - 학생 ID
 * @param {object} updatedData - 비교 데이터
 */
export const postComparisonData = async (studentId, updatedData) => {
    console.log("JSON -> ", JSON.stringify(updatedData));
    const response = await fetch(`${API_URL}/api/admin/weights/test/${studentId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error('비교 데이터를 서버로 전송하는 데 실패했습니다.');
    }
    return response.json();
};

/**
 * 통계 데이터를 가져오는 함수
 * @param {string} query - 쿼리 스트링 (예: ?filter=value)
 */
export const fetchStatistics = async (query = '') => {
    try {
        const response = await fetch(`${API_URL}/api/admin/statistics${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch statistics data');
        }
        const data = await response.json();
        if (data.status === 200) {
            return data.result;
        } else {
            throw new Error(data.message || 'Error retrieving statistics data');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching statistics data');
    }
};