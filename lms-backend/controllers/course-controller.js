import courseModel from "../models/course-model.js";

export const createCourse = async (req, res) => {
  try {
    const { title, userId } = req.body;
    const response = await courseModel.create({ title, userId });
    res.status(201).json(response);
  } catch (err) {
    return res.status(401).json({ err });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    let query = {};
    const { title, categoryId } = req.query;
    if (title) {
      query = { title: { $regex: title, $options: "i" } };
    }
    if (categoryId) {
      query = { ...query, categoryId: categoryId };
    }

    const response = await courseModel.find(query);
    res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({ error, ms: "get all courses" });
  }
};

export const getPurchasedCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchasedCourses = await courseModel.find({
      [`purchased.${userId}`]: true,
    });

    res.status(200).json(purchasedCourses);
  } catch (error) {
    return res.status(400).json({ msg: "get purchased courses", error });
  }
};

export const getOneCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await courseModel.findById(courseId);

    res.status(200).json(course);
  } catch (error) {
    return res.status(400).json({ msg: "getOneCourse", error });
  }
};

export const updataTitle = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.body; // must be compare req,userId and userId in course

    const course = await courseModel.findByIdAndUpdate(courseId, req.body);
    res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ msg: "updateTitle", error });
  }
};

export const addAttachments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { url, userId } = req.body;

    const course = await courseModel.findOne({ _id: courseId, userId });
    course.attachments.push(url);

    course.save();

    res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ msg: "add attachments", error });
  }
};

export const purchaseCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.params;
    const course = await courseModel.findById(courseId);
    await course.purchased.set(userId, true);
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ msg: "purchase course", error });
  }
};

export const deleteAttachments = async (req, res) => {
  try {
    const { courseId, attachmentIdx } = req.params;
    // const { url } = req.body;

    const course = await courseModel.findById(courseId);
    course.attachments = await course.attachments.filter(
      (attachment, idx) => idx !== parseInt(attachmentIdx)
    );

    course.save();

    res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ msg: "delete attachments", error });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    await courseModel.findByIdAndDelete(courseId);

    res.status(204).json("course deleted!!");
  } catch (error) {
    return res.status(500).json({ msg: "delete course", error });
  }
};
