import StripeCustomerModel from "../models/stripeCustomer-model.js";

export const getStripeCustomer = async (req, res) => {
  try {
    const { userId } = req.params;
    const stripeCustomer = await StripeCustomerModel.findOne({
      userId: userId,
    });

    res.status(200).json(stripeCustomer);
  } catch (error) {
    return res.status(500).json({ msg: "get stripe customer", error });
  }
};

export const addStripeCustomer = async (req, res) => {
  try {
    const { email, userId, stripeCustomerId } = req.body;
    const stripeCustomer = await StripeCustomerModel.create({
      email: email,
      userId: userId,
      stripeCustomerId: stripeCustomerId,
    });

    res.status(201).json(stripeCustomer);
  } catch (error) {
    return res.status(500).json({ msg: "add stripe customer", error });
  }
};
