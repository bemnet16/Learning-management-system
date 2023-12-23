import mongoose from "mongoose";

const StripeCustomerSchema = mongoose.Schema(
  {
    userId: String,
    stripeCustomerId: String,
    email: String,
  },
  { timestapes: true }
);

const StripeCustomerModel = mongoose.model(
  "stripe-customer",
  StripeCustomerSchema
);

export default StripeCustomerModel;
