const express = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateNoteById)
  .delete(protect, deleteNoteById);
module.exports = router;
