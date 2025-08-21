export declare function buildBasicToken(username: string, password: string): string;
export declare function setAuthHeader(token: string): void;
export declare function getAuthHeader(): Record<string, string>;
export declare function clearAuthHeader(): void;
