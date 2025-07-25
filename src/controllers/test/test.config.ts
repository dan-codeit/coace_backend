import { RequestHandler } from "express";

export const helloFromCoAce: RequestHandler = (_req, res)=>{
    res.send('Hello from CoAce_Backend!');
}
