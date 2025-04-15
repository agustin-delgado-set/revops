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
  accessTokenExpires: number; // Timestamp en milisegundos
  refreshToken: string;
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  error?: string;
}

/**
 * Función auxiliar para refrescar el token con Google
 */
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

    // Devuelve el nuevo token con los datos actualizados
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // 1 hora aprox
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Reemplaza sólo si el refresh token vino en la respuesta
    };
  } catch (error) {
    console.error("Error al refrescar el token: ", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
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
    /**
     * Controla si el usuario puede loguearse.
     * Ejemplo: sólo permitir usuarios de un dominio específico.
     */
    async signIn({ user }) {
      const email = user.email || "";
      if (email.endsWith("@setandforget.io")) {
        return true;
      }
      return false;
    },

    /**
     * jwt callback:
     * - Se llama la primera vez cuando el usuario se loguea (recibe `account`, `user`).
     * - En subsiguientes llamadas, solo recibe el token (podemos chequear expiración).
     */
    async jwt({ token, account, user }) {
      // Caso 1: Primer inicio de sesión
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (Number(account.expires_in) || 3600) * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Caso 2: El token ya existe y no ha expirado
      if ((token as unknown as Token).accessTokenExpires && Date.now() < (token as unknown as Token).accessTokenExpires) {
        // Todavía es válido
        return token;
      }

      // Caso 3: El token expiró, se intenta refrescar
      const refreshedToken = await refreshAccessToken(token as unknown as Token);
      return {
        ...token,
        ...refreshedToken,
      };
    },

    /**
     * session callback:
     * - Cada vez que llamemos a useSession() o getSession(), pasa por aquí.
     */
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
