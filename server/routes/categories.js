const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser").json();
const Category = require("../models/category");
const authorize = require("../config/authorize");

router
  .route("/")
  .get(async (request, response) => {
    try {
      if (request.query._id === "new") {
        const newCategory = new Category();
        return response.status(200).json([newCategory]);
      }
      const categories = await Category.find(request.query);
      return response.status(200).json(categories);
    } catch (error) {
      return response.status(400).send(error);
    }
  })
  .post(authorize, bodyParser, async (request, response) => {
    try {
      const category = new Category(request.body);
      await category.save();
      return response.status(200).json({ message: "New category saved!" });
    } catch (error) {
      return response.status(400).send(error);
    }
  });

router
  .route("/:id")
  .put(authorize, bodyParser, async (request, response) => {
    try {
      const category = await Category.findById(request.params.id);
      Object.assign(category, request.body);
      await category.save();
      return response.status(200).json({ message: "Category updated" });
    } catch (error) {
      return response.status(400).send(error);
    }
  })
  .delete(authorize, async (request, response) => {
    try {
      await Category.remove({ _id: request.params.id });
      return response.status(200).json({ message: "Category removed" });
    } catch (error) {
      return response.status(400).send(error);
    }
  });

module.exports = router;
