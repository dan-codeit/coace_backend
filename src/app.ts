import {app, jsonMiddleware} from './base/app.config.js';
import sessionMiddleware from './session/session.config.js';
import corsMiddleware from './cors/cors.config.js';
import { configureRoutes } from './routes/routeHandler.routes.js';
/////////////
//////////////
app.use(jsonMiddleware);
app.use(corsMiddleware);
app.use(sessionMiddleware)
configureRoutes(app)

export {app as connection}


