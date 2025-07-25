import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    role?: "admin" | "student" | "parent" | "teacher";
    email?: string;
  }
}
