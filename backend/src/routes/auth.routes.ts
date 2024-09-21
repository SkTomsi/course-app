import express from "express";

const authRouter = express.Router();

authRouter.get("/", async function (req, res) {
  res.json({
    message: "auth endpoint",
  });
});

export default authRouter;
