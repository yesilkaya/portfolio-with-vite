import { ContactUser, FormData } from "../../shared/types/user.js";
export declare function getAllContacts(): Promise<ContactUser[]>;
export declare function createContact(data: FormData): Promise<{
    id: number;
}>;
export declare function updateContact(id: number, contact: ContactUser): Promise<boolean>;
export declare function deleteContact(id: number): Promise<boolean>;
