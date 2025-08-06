export interface User {
  name: string;
  email: string;
}

export interface Message {
  id: number;
  content: string;
  created_at: string;
}
export interface ContactUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  messages?: Message[];
}

export interface FormData {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  message?: string;
}

interface ContactsWithMessages {
  contact_id: number;
  first_name: string | null;
  last_name: string;
  email: string;
  message_id: number | null;
  content: string | null;
  created_at: string | null;
}