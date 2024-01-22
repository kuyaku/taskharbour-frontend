import { API_BASE_URL } from "../utils/constants";

function createAPIClient(baseURL) {
  const apiClient = {
    getAccessToken() {
      return localStorage.getItem("accessToken");
    },
    setAccessToken(token) {
      localStorage.setItem("accessToken", token);
      //   return token;
    },
    getRefreshToken() {
      return localStorage.getItem("refreshToken");
    },
    setRefreshToken(token) {
      localStorage.setItem("refreshToken", token);
      //   return token;
    },
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
    },

    login: async function (email, password) {
      const loginResponse = await fetch(`${baseURL}auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        throw new Error("Authentication failed");
      }

      const data = await loginResponse.json();
      //   console.log(data);
      this.setAccessToken(data.access);
      this.setRefreshToken(data.refresh);
      this.setUser(data.user);

      return data;
    },

    register: async function (data) {
      const registerResponse = await fetch(`${baseURL}auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!registerResponse.ok) {
        if (registerResponse.status === 400) {
          // bad request
          const data = await registerResponse.json();
          data.status = registerResponse.status;
          return data;
        }

        throw new Error("Signup failed");
      }
      return await registerResponse.json();
    },

    logout: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },

    refreshToken: async function () {
      // console.log("refreshing token!");
      const refreshToken = this.getRefreshToken();

      if (!refreshToken) {
        throw new Error(`Refresh token is missing`);
      }

      const refreshResponse = await fetch(`${baseURL}auth/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!refreshResponse.ok) {
        throw new Error("Token refresh failed");
      }

      const { access } = await refreshResponse.json();
      this.setAccessToken(access);
    },

    get: async function (url) {
      try {
        const response = await fetch(`${baseURL}${url}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getAccessToken()}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            await this.refreshToken();
            return this.get(url);
          }
          throw new Error(`GET request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`GET request failed: ${error.message}`);
      }
    },

    post: async function (url, data) {
      try {
        const response = await fetch(`${baseURL}${url}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAccessToken()}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          if (response.status === 401) {
            await this.refreshToken();
            return this.post(url, data);
          }
          if (response.status === 400) {
            // bad request
            const responseData = await response.json();
            responseData.status = 400;
            return responseData;
          }
          throw new Error(`POST request failed: ${response.statusText}`);
        }
        const responseData = response.json();
        responseData.status = 200;
        return responseData;
      } catch (error) {
        throw new Error(`POST request failed: ${error.message}`);
      }
    },
  };
  return apiClient;
}

const client = createAPIClient(API_BASE_URL);

export default client;
