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