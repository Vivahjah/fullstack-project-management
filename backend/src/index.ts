import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "cookie-session"
import { config } from "./config/app-config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";


import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.route";

const app = express()
const BASE_PATH = config.BASE_PATH;
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        name: "session",
        keys: [config.SESSION_SECRET],
        maxAge: 21 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
}))




app.get("/", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({ message: "Hello World" })
}))

app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(errorHandler)

app.listen(config.PORT, async () => {
    await connectDatabase();
    console.log(`Server is running on port ${config.PORT}`)

})

