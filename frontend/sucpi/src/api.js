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

/**
 * 가중치 설정을 저장하는 함수
 * @param {object} payload - 저장할 가중치 데이터
 */
export const saveWeights = async (payload) => {
    try {
        const response = await fetch(`${API_URL}/api/admin/weights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to save weights');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'An error occurred while saving weights');
    }
};

/**
 * 비교 요청을 서버에 전송하고 결과를 가져오는 함수
 * @param {object} payload - 비교 요청 데이터
 */
export const compareWeights = async (payload) => {
    try {
        const response = await fetch(`${API_URL}/api/admin/settings/weights/test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to perform comparison');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'An error occurred while comparing weights');
    }
};

/**
 * 설정 데이터를 가져오는 함수
 * @returns {Promise<object>} - 설정 데이터
 */
export const fetchSettings = async () => {
    try {
        const response = await fetch(`${API_URL}/api/admin/settings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '설정을 가져오는 데 실패했습니다.');
        }

        const data = await response.json();

        if (!data.result) {
            throw new Error('API 응답에서 result 속성을 찾을 수 없습니다.');
        }

        return data.result; // result만 반환
    } catch (error) {
        console.error('Error fetching settings:', error.message);
        throw error;
    }
};

/**
 * 비교 요청을 서버에 전송하고 결과를 반환하는 함수
 * @param {object} payload - 비교 비율 데이터
 * @returns {Promise<object>} - 서버 응답 데이터
 */
export const compareRatios = async (payload) => {
    try {
        const response = await fetch(`${API_URL}/api/admin/settings/test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('비교를 수행하는 데 실패했습니다.');
        }

        const data = await response.json();
        if (data.status !== 200) {
            throw new Error(data.message || '비교를 수행하는 데 실패했습니다.');
        }

        return data.result;
    } catch (error) {
        console.error('Error during compareRatios:', error.message);
        throw error;
    }
};

/**
 * 비율 설정 데이터를 서버에 저장하는 함수
 * @param {object} payload - 저장할 비율 데이터
 * @returns {Promise<object>} - 서버 응답 데이터
 */
export const saveRatios = async (payload) => {
    try {
        const response = await fetch(`${API_URL}/api/admin/settings/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('비율 설정을 저장하는 데 실패했습니다.');
        }

        const data = await response.json();
        if (data.status !== 200) {
            throw new Error(data.message || '비율 설정을 저장하는 데 실패했습니다.');
        }

        return data.result;
    } catch (error) {
        console.error('Error during saveRatios:', error.message);
        throw error;
    }
};
