import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({  //auth: Retrieves the current session in a server-side context.
  providers: [Google],
  callbacks: {
    async jwt({ token, account }) {  //This runs when a JWT is created or updated.
      if (account?.id_token) {   //If account.id_token (Google's ID token) exists, 
        token.idToken = account.id_token; //it attaches it to the JWT as token.idToken
      }

      return token;
    },
    async session({ session, token }) { //This runs when a session is created from a JWT.
      session.idToken = token.idToken; //It adds idToken from the JWT to the session object, so it can be accessed on the client.
      return session;
    },
  },
});
