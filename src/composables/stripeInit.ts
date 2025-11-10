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
// Cache for publishable key
let cachedPublicKey: string | null = null;

/**
 * Get or initialize Stripe instance
 * This fetches the publishable key from your backend config endpoint
 */

export const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const res = await axios.get("/api/v1/config");

    // 3. For extra safety, you could define an interface for the config response
    // interface ConfigResponse { publicKey: string }
    // const { publicKey } = res.data as ConfigResponse;
    const { publicKey } = res.data; // You have a check below, so this is fine for now

    if (!publicKey) {
      throw new Error("Stripe public key is missing from config endpoint.");
    }

    // Cache the key for other uses
    cachedPublicKey = publicKey;

    // loadStripe returns a Promise<Stripe | null>, which is now correctly typed
    stripePromise = loadStripe(publicKey);
  }

  // Await the promise before returning
  return stripePromise;
};

/**
 * Get just the publishable key without loading Stripe
 * Useful when you need the key for other Stripe libraries
 */
export const getStripePublishableKey = async (): Promise<string> => {
  // If we already have it cached, return it
  if (cachedPublicKey) {
    return cachedPublicKey;
  }

  // Otherwise fetch from backend
  const res = await axios.get("/api/v1/config");
  const { publicKey } = res.data;

  if (!publicKey) {
    throw new Error("Stripe public key is missing from config endpoint.");
  }

  cachedPublicKey = publicKey;
  return publicKey;
};

/**
 * Reset the Stripe instance (useful for testing or account switching)
 */
export const resetStripe = () => {
  stripePromise = null;
  cachedPublicKey = null;
};