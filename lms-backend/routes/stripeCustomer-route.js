import Express from "express";
import {
  addStripeCustomer,
  getStripeCustomer,
} from "../controllers/stripeCustomer-controller.js";
const StripeCustomerRouter = Express.Router();

StripeCustomerRouter.get("/:userId", getStripeCustomer);
StripeCustomerRouter.post("/", addStripeCustomer);

export default StripeCustomerRouter;
