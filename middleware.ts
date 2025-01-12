import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in", // Redirigir a esta página si no está autenticado
  },
});

export const config = {
  matcher: ["/onboarding/:path*"],
};
