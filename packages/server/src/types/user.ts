export interface User {
    uid: string;
    email?: string;
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
}
