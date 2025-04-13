import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    user: {
      id: string;
    };
  }

  interface JWT {
    accessToken?: string;
    idToken?: string;
  }
}
