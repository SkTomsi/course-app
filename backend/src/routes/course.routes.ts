import express from "express";

const courseRouter = express.Router();

courseRouter.post("/purchase", function (req, res) {
  // you would expect the user to pay you money
  res.json({
    message: "signup endpoint",
  });
});

courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "course preview endpoint",
  });
});

export default courseRouter;
