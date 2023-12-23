import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized access denied", { status: 401 });
    }

    const { courseId } = params;
    const values = await req.json();

    const chapter = await axios.post(`${process.env.BACK_END_URL}/api/chapters`, {
      ...values,
      courseId,
      userId,
    });

    return new NextResponse(chapter.data);
  } catch (error) {
    console.log("/api/courses/chapters", error);
    return new NextResponse("Internal sever error api/courses/courseId/chapters", {
      status: 500,
    });
  }
}
