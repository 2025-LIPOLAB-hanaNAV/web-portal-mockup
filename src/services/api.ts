export interface Post {
	id: string;
	isUnread: boolean;
	isModified: boolean;
	category: string;
	title: string;
	department: string;
	author: string;
	views: number;
	postDate: string;
	endDate: string;
	badges: ("notice" | "emergency")[];
	hasAttachment: boolean;
	content?: string;
}

export interface LoginCredentials {
	username: string;
	password: string;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

const API_BASE_URL = "http://localhost:3001/api";

class ApiService {
	private async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<ApiResponse<T>> {
		try {
			const response = await fetch(`${API_BASE_URL}${endpoint}`, {
				headers: {
					"Content-Type": "application/json",
					...options.headers,
				},
				...options,
			});

			const data = await response.json();
			return data;
		} catch (error) {
			return {
				success: false,
				message: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	async login(
		credentials: LoginCredentials
	): Promise<ApiResponse<{ token: string }>> {
		return this.request("/auth/login", {
			method: "POST",
			body: JSON.stringify(credentials),
		});
	}

	async getPosts(page = 1, limit = 20): Promise<ApiResponse<Post[]>> {
		return this.request(`/posts?page=${page}&limit=${limit}`);
	}

	async getPost(id: string): Promise<ApiResponse<Post>> {
		return this.request(`/posts/${id}`);
	}

	async createPost(
		post: Omit<Post, "id" | "views" | "postDate">
	): Promise<ApiResponse<Post>> {
		return this.request("/posts", {
			method: "POST",
			body: JSON.stringify(post),
		});
	}

	async updatePost(
		id: string,
		post: Partial<Post>
	): Promise<ApiResponse<Post>> {
		return this.request(`/posts/${id}`, {
			method: "PUT",
			body: JSON.stringify(post),
		});
	}

	async deletePost(id: string): Promise<ApiResponse<void>> {
		return this.request(`/posts/${id}`, {
			method: "DELETE",
		});
	}
}

export const apiService = new ApiService();
