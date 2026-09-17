import { NextResponse } from "next/server";

interface LoginBody {
  username?: string;
  password?: string;
  remember?: boolean;
}

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBody;

  if (!body.username || !body.password) {
    return NextResponse.json({ message: "请输入账号和密码。" }, { status: 400 });
  }

  // Replace the demo value with the token returned by the real authentication service.
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set("cwa_token", "demo-token", {
    httpOnly: true,
    maxAge: body.remember ? 60 * 60 * 24 * 30 : undefined,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
