import "express-session";
declare module "express-session" {
  interface SessionData {
    user: string;
    user_email: string;
    isAdmin: boolean;
  }
}
