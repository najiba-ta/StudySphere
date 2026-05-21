import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);

await client.connect();

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
    },
  },
  session:{
   cookieCache:{
    enabled:true,
    strategy:"jwt",
    maxAge: 7 * 24 * 60 * 60
   }
  },
  // plugins:[
  //   jwt()
  // ]
});
