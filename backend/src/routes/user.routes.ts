import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", async function (req, res) {});

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "purchases endpoint",
  });
});

export default userRouter;
