import { z } from "zod";

// Define schema for environment variables
const environmentSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string(),
});

// Destructure environment variables
const {
  DATABASE_URL,
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} = process.env;

// Parse environment variables against the schema
const parsedResults = environmentSchema.safeParse({
  DATABASE_URL,
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

// Throw error if environment variables don't match schema
if (!parsedResults.success) {
  throw new Error("Environment doesn't match the schema");
}

// Infer the type from the schema
type EnvVarSchemaType = z.infer<typeof environmentSchema>;

// Augment the ProcessEnv interface with the inferred type
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVarSchemaType {}
  }
}
