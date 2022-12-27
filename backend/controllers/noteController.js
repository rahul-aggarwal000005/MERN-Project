const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = expressAsyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  if (!title || !category || !content) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const note = new Note({ user: req.user._id, title, category, content });
    const createdNote = await note.save();
    res.status(200).json(createdNote);
  }
});

const getNoteById = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
  res.json(note);
});

const updateNoteById = expressAsyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }
  if (note) {
    note.title = title;
    note.category = category;
    note.content = content;
    const updateNote = await note.save();
    res.json(updateNote);
  } else {
    throw new Error("Note not found");
  }
});

const deleteNoteById = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }
  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    throw new Error("Note not found");
  }
});
module.exports = {
  getNotes,
  getNoteById,
  createNote,
  deleteNoteById,
  updateNoteById,
};
