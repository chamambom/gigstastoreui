// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
//
// let stripePromise;
//
// export const getStripe = async () => {
//   if (!stripePromise) {
//     const res = await axios.get("/api/v1/config");
//     const { publicKey } = res.data; // ✅ FIXED HERE
//
//     if (!publicKey) {
//       throw new Error("Stripe public key is missing from config endpoint.");
//     }
//
//     stripePromise = await loadStripe(publicKey);
//   }
//   return stripePromise;
// };


import { loadStripe, type Stripe } from "@stripe/stripe-js"; // 1. Import the Stripe type
import axios from "axios";

// 2. Explicitly type stripePromise as Promise<Stripe | null> | null
// It will hold a Promise that resolves to a Stripe object, or null before it's loaded.
let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = async () => {
  if (!stripePromise) {
    const res = await axios.get("/api/v1/config");

    // 3. For extra safety, you could define an interface for the config response
    // interface ConfigResponse { publicKey: string }
    // const { publicKey } = res.data as ConfigResponse;
    const { publicKey } = res.data; // You have a check below, so this is fine for now

    if (!publicKey) {
      throw new Error("Stripe public key is missing from config endpoint.");
    }

    // loadStripe returns a Promise<Stripe | null>, which is now correctly typed
    stripePromise = loadStripe(publicKey);
  }

  // Await the promise before returning
  return stripePromise;
};