import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "No email" }, { status: 400 });

    // Append to local CSV for now — swap for Resend/DB later
    const filePath = path.join(process.cwd(), "waitlist.csv");
    const line = `${email},${new Date().toISOString()}\n`;
    fs.appendFileSync(filePath, line);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
