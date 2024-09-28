export interface User {
  id: string;
  email?: string;
  googleId?: string;
}

declare global {
  namespace Express {
    interface User {
      id: string;
      email?: string;
      googleId?: string;
    }
  }
}
