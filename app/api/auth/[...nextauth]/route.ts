import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    error?: string;
    accessToken?: string;
    user?: {
      name?: string;
      email?: string;
      image?: string;
    };
  }
}

interface Token {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  error?: string;
}

async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error al refrescar el token: ", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile " +
            "https://www.googleapis.com/auth/admin.directory.user " +
            "https://www.googleapis.com/auth/gmail.send",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      const email = user.email || "";
      if (email.endsWith("@revopsautomated.com")) {
        return true;
      }
      return false;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (Number(account.expires_in) || 3600) * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if ((token as unknown as Token).accessTokenExpires && Date.now() < (token as unknown as Token).accessTokenExpires) {
        return token;
      }

      const refreshedToken = await refreshAccessToken(token as unknown as Token);
      return {
        ...token,
        ...refreshedToken,
      };
    },

    async session({ session, token }) {
      const t = token as unknown as Token;
      session.user = t.user;
      session.error = t.error;
      session.accessToken = t.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
