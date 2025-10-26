import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

let stripePromise;

export const getStripe = async () => {
  if (!stripePromise) {
    const res = await axios.get("/api/v1/config");
    const { publicKey } = res.data; // ✅ FIXED HERE

    if (!publicKey) {
      throw new Error("Stripe public key is missing from config endpoint.");
    }

    stripePromise = await loadStripe(publicKey);
  }
  return stripePromise;
};
