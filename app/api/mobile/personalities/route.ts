// app/api/mobile/personalities/route.ts

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getAllPersonalities } from "@/db/personalities";

export async function GET() {
  try {
    const supabase = createClient();
    const personalities = await getAllPersonalities(supabase);

    return NextResponse.json({
      ok: true,
      personalities,
    });
  } catch (error) {
    console.error("Error in /api/mobile/personalities", error);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 },
    );
  }
}
