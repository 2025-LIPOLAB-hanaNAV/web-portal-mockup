export interface Attachment {
	id: string;
	name: string;
	size: string;
	downloadUrl: string;
	original_filename?: string;
}

export interface UploadedImage {
	id: string;
	filename: string;
	url: string;
	original_filename?: string;
}

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
	attachments?: Attachment[];
	uploaded_images?: UploadedImage[];
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

	async getPosts(_page = 1, _limit = 20): Promise<ApiResponse<Post[]>> {
		try {
			console.log("Fetching posts from:", `${API_BASE_URL}/posts`);

			const response = await fetch(`${API_BASE_URL}/posts`, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
				cache: "no-cache",
			});

			console.log("Response status:", response.status);
			console.log("Response headers:", response.headers.get("content-type"));

			if (!response.ok) {
				const errorText = await response.text();
				console.error("Response error:", errorText);
				throw new Error(
					`HTTP error! status: ${response.status}, message: ${errorText}`
				);
			}

			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				const responseText = await response.text();
				console.error("Non-JSON response:", responseText.substring(0, 200));
				throw new Error(`Expected JSON response, got: ${contentType}`);
			}

			const data = await response.json();
			console.log("Received data:", data);

			// FastAPI 응답을 프론트엔드 형식으로 변환
			const convertedPosts = data.map((post: any) => ({
				id: post.id,
				isUnread: true,
				isModified: false,
				category: post.category,
				title: post.title,
				department: post.department,
				author: post.author,
				views: post.views,
				postDate: post.postDate,
				endDate: post.endDate || "",
				badges: post.badges as ("notice" | "emergency")[],
				hasAttachment: post.attachments && post.attachments.length > 0,
				content: post.content,
				attachments: post.attachments || [],
				uploaded_images: post.uploaded_images || [],
			}));

			return {
				success: true,
				data: convertedPosts,
			};
		} catch (error) {
			console.error("API getPosts error:", error);
			return {
				success: false,
				message: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	async getPost(id: string): Promise<ApiResponse<Post>> {
		try {
			const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
				cache: "no-cache",
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const post = await response.json();

			// FastAPI 응답을 프론트엔드 형식으로 변환
			const convertedPost = {
				id: post.id,
				isUnread: true,
				isModified: false,
				category: post.category,
				title: post.title,
				department: post.department,
				author: post.author,
				views: post.views,
				postDate: post.postDate,
				endDate: post.endDate || "",
				badges: post.badges as ("notice" | "emergency")[],
				hasAttachment: post.attachments && post.attachments.length > 0,
				content: post.content,
				attachments: post.attachments || [],
				uploaded_images: post.uploaded_images || [],
			};

			return {
				success: true,
				data: convertedPost,
			};
		} catch (error) {
			return {
				success: false,
				message: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	async createPost(formData: FormData): Promise<ApiResponse<Post>> {
		try {
			const response = await fetch(`${API_BASE_URL}/posts`, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return {
				success: true,
				data: data,
			};
		} catch (error) {
			return {
				success: false,
				message: error instanceof Error ? error.message : "Unknown error",
			};
		}
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
