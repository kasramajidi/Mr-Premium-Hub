import { NextRequest, NextResponse } from "next/server";
import { listConversations } from "@/lib/support-store";

const ADMIN_COOKIE_NAME = "admin_session";

function isAdmin(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_COOKIE_NAME)?.value === "authenticated";
}

/** لیست مکالمات (فقط ادمین) */
export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const list = listConversations();
  return NextResponse.json(
    list.map((c) => ({
      id: c.id,
      clientId: c.clientId,
      userName: c.userName,
      userPhone: c.userPhone,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      messageCount: c.messages.length,
      lastMessage:
        c.messages.length > 0
          ? {
              text: c.messages[c.messages.length - 1].text.slice(0, 60),
              createdAt: c.messages[c.messages.length - 1].createdAt,
            }
          : null,
    }))
  );
}
