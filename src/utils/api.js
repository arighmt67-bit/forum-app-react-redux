const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';
  const ACCESS_TOKEN_KEY = 'forum-app-token';

  function putAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  function removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  async function fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function request(url, options = {}, withAuth = false) {
    const fetcher = withAuth ? fetchWithAuth : fetch;
    const response = await fetcher(url, options);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data;
  }

  async function register({ name, email, password }) {
    const { user } = await request(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    return user;
  }

  async function login({ email, password }) {
    const { token } = await request(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    return token;
  }

  async function getOwnProfile() {
    const { user } = await request(`${BASE_URL}/users/me`, {}, true);
    return user;
  }

  async function getAllUsers() {
    const { users } = await request(`${BASE_URL}/users`);
    return users;
  }

  async function getAllThreads() {
    const { threads } = await request(`${BASE_URL}/threads`);
    return threads;
  }

  async function getThreadDetail(id) {
    const { detailThread } = await request(`${BASE_URL}/threads/${id}`);
    return detailThread;
  }

  async function createThread({ title, body, category }) {
    const { thread } = await request(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category }),
    }, true);

    return thread;
  }

  async function createComment({ threadId, content }) {
    const { comment } = await request(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    }, true);

    return comment;
  }

  async function voteThread({ threadId, voteType }) {
    const { vote } = await request(`${BASE_URL}/threads/${threadId}/${voteType}`, {
      method: 'POST',
    }, true);

    return vote;
  }

  async function voteComment({ threadId, commentId, voteType }) {
    const { vote } = await request(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/${voteType}`,
      { method: 'POST' },
      true,
    );

    return vote;
  }

  async function getLeaderboards() {
    const { leaderboards } = await request(`${BASE_URL}/leaderboards`);
    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    removeAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getThreadDetail,
    createThread,
    createComment,
    voteThread,
    voteComment,
    getLeaderboards,
  };
})();

export default api;
