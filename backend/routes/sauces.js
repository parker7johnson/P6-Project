const express = require("express");
const auth = require("../middleware/auth");
const saucesRouter = express.Router();
const multer = require("../middleware/multer-config");

const {
  getAllSauces,
  getOneSauce,
  createSauce,
  updateSauce,
  updateSauceLikeStatus,
  deleteSauce,
} = require("../controllers/sauces");

saucesRouter.get("/", auth, getAllSauces);
saucesRouter.get("/:id", auth, getOneSauce);
saucesRouter.post("/", auth, multer, createSauce);
saucesRouter.put("/:id", auth, multer, updateSauce);
saucesRouter.post("/:id/like", auth, updateSauceLikeStatus);
saucesRouter.delete("/:id", auth, deleteSauce);

module.exports = saucesRouter;