import 'dotenv/config';

export default {
  expo: {
    name: "x-clone",
    slug: "x-clone",
    version: "1.0.0",
    extra: {
      CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      CONVEX_URL: process.env.EXPO_PUBLIC_CONVEX_URL,
    },
  },
};
