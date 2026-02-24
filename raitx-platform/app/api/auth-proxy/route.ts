import { NextResponse } from "next/server";

const EXTERNAL_API = "https://mrpremiumhub.org/api.ashx";

const CORS_HEADERS: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Cookie",
};

function jsonWithCors(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

/**
 * پروکسی API به mrpremiumhub.org (GET, POST, PATCH, DELETE) برای رفع CORS.
 * مطابق تست API: GetData, PostData, PATCHData, DELETEData
 */
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    if (!queryString) {
      return jsonWithCors({ error: "پارامتر action لازم است" }, 400);
    }
    const url = `${EXTERNAL_API}?${queryString}`;
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const cookie = request.headers.get("cookie");
    if (cookie) headers["Cookie"] = cookie;
    const res = await fetch(url, { method: "GET", headers });
    const data = await res.json().catch(() => ({}));
    return jsonWithCors(data);
  } catch (e) {
    return jsonWithCors(
      { error: "خطا در ارتباط با سرور احراز هویت" },
      502
    );
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    if (!action) {
      return jsonWithCors({ error: "پارامتر action لازم است" }, 400);
    }

    const body = await request.json().catch(() => ({}));
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const cookie = request.headers.get("cookie");
    if (cookie) headers["Cookie"] = cookie;

    const res = await fetch(
      `${EXTERNAL_API}?action=${encodeURIComponent(action)}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await res.json().catch(() => ({}));
    return jsonWithCors(data, res.status);
  } catch (e) {
    return jsonWithCors(
      { error: "خطا در ارتباط با سرور احراز هویت" },
      502
    );
  }
}

/** پروکسی PATCH (مثلاً action=invoice&id=3) */
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    if (!queryString) {
      return NextResponse.json(
        { error: "پارامتر action لازم است" },
        { status: 400 }
      );
    }
    const body = await request.json().catch(() => ({}));
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const cookie = request.headers.get("cookie");
    if (cookie) headers["Cookie"] = cookie;
    const res = await fetch(`${EXTERNAL_API}?${queryString}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "خطا در ارتباط با سرور" },
      { status: 502 }
    );
  }
}

/** پروکسی DELETE (مثلاً ExamRegister&id=2 یا Comment&id=2) */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    if (!queryString) {
      return NextResponse.json(
        { error: "پارامتر action لازم است" },
        { status: 400 }
      );
    }
    const url = `${EXTERNAL_API}?${queryString}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "خطا در ارتباط با سرور" },
      { status: 502 }
    );
  }
}
