import { authConfig } from "@/auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // Example for GitHub login
import GoogleProvider from "next-auth/providers/google"; // Example for Google login // We'll create this next!

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
