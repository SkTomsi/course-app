import express from "express";
import userRouter from "./routes/auth.routes.js";
import courseRouter from "./routes/course.routes.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ message: "Okay" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

app
  .listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
