import session from "express-session";

//rolling:true

const sessionMiddleware = session({
  secret: "your-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set true in production (HTTPS)
    maxAge: 1000 * 60 * 60, // 1 hour
  },
});

export default sessionMiddleware;

//app.use(
  //session({
    //secret: "supersecret-key", // should be stored in env
   // resave: false,
   // saveUninitialized: false,
   // cookie: {
   //   httpOnly: true,
    //  secure: false, // set to true in production with HTTPS
   //   maxAge: 1000 * 60 * 60, // 1 hour
  //  },
  //})
//);