import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import axios, { AxiosError } from "axios";
// import { JWT } from "next-auth/jwt";

const ISSUER_URL = `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`;

// interface RefreshTokenResponse {
//   access_token: string;
//   expires_in: number;
//   refresh_token: string;
// }

// async function refreshKeycloakToken(token: JWT) {
//   const { data } = await axios.post<
//     unknown,
//     AxiosResponse<RefreshTokenResponse, unknown>
//   >(
//     `${ISSUER_URL}/protocol/openid-connect/token`,
//     {
//       grant_type: "refresh_token",
//       client_id: process.env.KEYCLOAK_CLIENT as string,
//       refresh_token: token.refreshToken,
//       client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
//     },
//     { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//   );

//   return {
//     ...token,
//     accessToken: data.access_token,
//     refreshToken: data.refresh_token,
//     expiresAt: Date.now() + data.expires_in,
//   };
// }

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: ISSUER_URL,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      token.id = profile?.sub;

      // if (token?.expiresAt && Date.now() < token.expiresAt) {
      //   return token;
      // }

      // return refreshKeycloakToken(token);

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      try {
        const params = new URLSearchParams();
        params.append("id_token_hint", token.idToken ?? "");
        const { status, statusText } = await axios.get(
          `${ISSUER_URL}/protocol/openid-connect/logout?${params.toString()}`
        );
        console.log(`Logged out: ${status} ${statusText}`);
      } catch (error) {
        console.error(
          "Error logging out:",
          (error as AxiosError)?.code || error
        );
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
