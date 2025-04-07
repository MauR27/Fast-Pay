import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      req.nextUrl.pathname === "/signup" &&
      session.email !== process.env.ADMIN_ROLE
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
export default handler;

export const config = {
  matcher: ["/signup"],
};
