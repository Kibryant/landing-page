import connect from "@/core/db";
import User from "@/models/User";
import { ResProps } from "@/types/ResProps";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params: { email } }: { params: { email: string } }) {
  await connect();

  const user = await User.findOne({ email });
  const body = await req.json();
  console.log(body);
  const { task, description, date } = body;

  if (!user)
    return NextResponse.json<ResProps>({
      error: true,
      message: "Error!",
      status: 500
    });

  user.tasks = {
    task,
    description,
    date
  };

  await user.save();

  return NextResponse.json({
    message: "Task successfully registered!",
    status: 201,
    error: false,
    data: {
      task,
      description,
      date
    }
  });
}
