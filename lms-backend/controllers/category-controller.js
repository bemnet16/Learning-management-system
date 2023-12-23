import categoryModel from "../models/category-model.js";

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await categoryModel.create({ name });

    res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ msg: "add category error", error });
  }
};

export const getAllCategorys = async (req, res) => {
  try {
    const categorys = await categoryModel.find().sort({ name: 1 });

    res.status(200).json(categorys);
  } catch (error) {
    return res.status(500).json({ msg: "get all categorys error", error });
  }
};
