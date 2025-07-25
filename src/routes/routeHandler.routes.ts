import { Router } from "express";
import { publicRoutes } from "./public.routes/public.route.js";
import { parentRoutes } from "./parent.routes/parent.route.js";
import { privateRoutes } from "./private.routes/private.route.js";
import { adminRoutes } from "./admin.routes/admin.route.js";
import { studentRoutes } from "./student.routes/student.route.js";


export function configureRoutes(app: Router) {
  app.use('/api/auth', publicRoutes);
  app.use('/api/users', parentRoutes);
  app.use("/api/users", studentRoutes)
  app.use('/api/private', privateRoutes);
  app.use("/api/admins", adminRoutes)
}
