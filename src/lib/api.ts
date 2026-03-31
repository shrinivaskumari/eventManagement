const API_URL = "/api";

export const api = {
  async get(endpoint: string, token?: string) {
    const headers: any = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_URL}${endpoint}`, { headers });
    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        throw new Error(json.error || json.message || text);
      } catch {
        throw new Error(text);
      }
    }
    return res.json();
  },

  async post(endpoint: string, body: any, token?: string) {
    const headers: any = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    
    const isFormData = body instanceof FormData;
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        throw new Error(json.error || json.message || text);
      } catch {
        throw new Error(text);
      }
    }
    return res.json();
  },

  async put(endpoint: string, body: any, token?: string) {
    const headers: any = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    
    const isFormData = body instanceof FormData;
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        throw new Error(json.error || json.message || text);
      } catch {
        throw new Error(text);
      }
    }
    return res.json();
  },

  async delete(endpoint: string, token?: string) {
    const headers: any = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        throw new Error(json.error || json.message || text);
      } catch {
        throw new Error(text);
      }
    }
    return res.json();
  },
};
