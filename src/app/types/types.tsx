export interface User {
  avatar_url: string;
  name: string;
  username: string;
}
export interface UserContextType {
  user: User | null;
  logout: () => void;
  login: (username:string)=> void;
}
