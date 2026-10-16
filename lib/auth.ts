import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "admin_session";

function token() {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) return null;
  return createHmac("sha256", pwd).update("portfolio-admin").digest("hex");
}

export function checkPassword(input: string) {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(pwd);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
  const t = token();
  const c = (await cookies()).get(COOKIE)?.value;
  return Boolean(t && c && c.length === t.length && timingSafeEqual(Buffer.from(c), Buffer.from(t)));
}

export async function startSession() {
  (await cookies()).set(COOKIE, token()!, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}
