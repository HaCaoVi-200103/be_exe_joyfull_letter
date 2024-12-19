import express, { Request, Response, NextFunction } from "express";
import path from "path";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "dotenv/config";
import initApiRoutes from "../routes";
import connectionDB from "../config/mongodb";
import cors from "cors";

const app = express();

connectionDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

initApiRoutes(app);

app.get('/', (req, res) => {
  res.json({
    name:"Joyfull Letter",
    author:"ICao"
  })
})

app.all("*", (req: Request, res: Response) => {
  return res.status(404).send("API endpoint not found");
});



app.use((__, _, next: NextFunction) => {
  next(createError(404));
});

app.use((err: any, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
