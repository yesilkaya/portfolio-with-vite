import { FormData } from "../../shared/types/user.js";
export declare function getAllContacts(): Promise<import("mysql2/promise").QueryResult>;
export declare function createContact(data: FormData): Promise<{
    id: number;
}>;
export declare function updateContact(id: number, first_name: string, last_name: string, email: string): Promise<number>;
export declare function deleteContact(id: number): Promise<number>;
