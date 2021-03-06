import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    //   async fns to control when an action is performed
    async session({ session, token }) {
      session.user.tag = session.user.name
        .split(" ")
        .join("").toLocaleLowerCase;

      session.user.uid = token.sub;
      return session;
    },
  },
  secret: process.env.SECRET,
});
