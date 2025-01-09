interface ApiError {
  status: number;
  statusText: string;
  message: string;
  url: string;
}

/**
 * This Api class represents a reusable service layer that I use in my personal SPA applications
 * to handle HTTP requests. It simplifies API interaction, ensures consistent error handling,
 * and promotes clean separation of concerns.
 */
class Api {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get<T>(url: string, config: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...config,
      method: "GET",
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(
    url: string,
    data: unknown = {},
    config: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...config,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(
    url: string,
    data: unknown = {},
    config: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...config,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(url: string, config: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...config,
      method: "DELETE",
    });
    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let errorDetail: any;
      try {
        errorDetail = await response.json();
      } catch {
        errorDetail = await response.text();
      }

      const apiError: ApiError = {
        status: response.status,
        statusText: response.statusText,
        message:
          errorDetail?.message || errorDetail || "An unknown error occurred",
        url: response.url,
      };

      throw apiError;
    }

    return response.json();
  }
}

const api = new Api(import.meta.env.VITE_BACKEND_URL);

export default api;
