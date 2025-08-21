export declare function doLoginRequest(username: string, password: string): Promise<{
    success: boolean;
    message: string;
} | {
    success: boolean;
    message?: undefined;
}>;
