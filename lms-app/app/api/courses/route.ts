import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await axios.post(`${process.env.BACK_END_URL}/api/courses`, {
      userId,
      title,
    });

    return NextResponse.json(course.data);
  } catch (error) {
    console.log("[courses]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
