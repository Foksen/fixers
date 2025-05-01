import { loginUser } from "@/lib/api/auth";
import { parseJwt } from "@/lib/utils/parseJwt";
import nextAuthModule from "next-auth";
import credentialsProviderModule from "next-auth/providers/credentials";

const CredentialsProvider = credentialsProviderModule.default;
const NextAuth = nextAuthModule.default;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await loginUser(
            credentials.email,
            credentials.password
          );

          if (!response || !response.access || !response.refresh) {
            throw new Error(
              "Invalid response from server during authentication"
            );
          }

          return {
            accessToken: response.access,
            refreshToken: response.refresh,
          };
        } catch (error) {
          console.error("Failed to authorize", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        const decoded = parseJwt(user.accessToken);
        token.user = {
          id: decoded?.user_id,
          email: decoded?.email,
          username: decoded?.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...token.user };
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
};

// export const authOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/auth",
//   },
// };

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
