import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { account } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const data = await db
    .select({
      id: account.id,
      name: account.name,
    })
    .from(account)
    .where(eq(account.userId, auth.userId));

  return c.json({ data });
});
// read -> Using RPC with larger applications
// app.get("/", (c) => {
//   return c.json({ accounts: [] });
// });

export default app;
