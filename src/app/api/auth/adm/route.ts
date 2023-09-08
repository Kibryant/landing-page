import Adm from "@/models/Adm";
import { NextResponse } from "next/server";
import connect from "@/core/db";
import bcrypt from "bcrypt";
import { type AdmProps } from "@/types/AdmProps";

export async function POST(req: Request) {
  try {
    await connect();
    const { accessCode, email, password }: AdmProps = await req.json();
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const hashedAccessCode = await bcrypt.hash(accessCode, saltOrRounds);
    const newAdm = new Adm({
      accessCode: hashedAccessCode,
      email,
      password: hashedPassword
    });

    await newAdm.save();

    return NextResponse.json({
      message: "Sucess!",
      error: false,
      status: 201
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error: ${error}`,
      error: true,
      status: 500
    });
  }
}
