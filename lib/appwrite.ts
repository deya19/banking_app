"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie || !sessionCookie.value) {
    console.error("No session cookie found");
    throw new Error("No session cookie found. Please log in.");
  }

  try {
    client.setSession(sessionCookie.value);

    return {
      get account() {
        return new Account(client);
      },
    };
  } catch (error) {
    console.error("Error setting session:", error);
    throw new Error("Failed to set session. Please try again.");
  }
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
}
