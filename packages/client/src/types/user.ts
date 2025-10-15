export interface User {
    uid: string;
    email?: string | null;
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
}
