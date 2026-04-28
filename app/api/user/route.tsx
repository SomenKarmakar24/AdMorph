import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

export async function POST(req: NextRequest) {
  try {
    const { userEmail, userName } = await req.json();

    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (result?.length == 0) {
      const insertResult: any = await db
        .insert(usersTable)
        .values({
          name: userName,
          email: userEmail,
          credits: 0,
        })
        .returning(usersTable);

      return NextResponse.json(insertResult[0]);
    }
    return NextResponse.json(result[0]);
  } catch (e: any) {
    console.error("API /api/user error:", e);
    return NextResponse.json(
      { error: "Failed to process user", message: e?.message },
      { status: 500 },
    );
  }
}
