import Adm from "@/models/Adm";
import { NextResponse } from "next/server";
import connect from "@/core/db";
import bcrypt from "bcrypt";
import { type AdmProps } from "@/types/AdmProps";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connect();
    const { accessCode, email, password }: AdmProps = await req.json();
    const adm: AdmProps | null = await Adm.findOne({ email });

    if (!adm) {
      return NextResponse.json({
        error: true,
        status: 401,
        message: "Credentials Invalid!"
      });
    }

    const validAccessCode = await bcrypt.compare(accessCode, adm.accessCode);
    const validPassword = await bcrypt.compare(password, adm.password);

    if (!validPassword || !validAccessCode) {
      return NextResponse.json({
        error: true,
        status: 401,
        message: "Credentials Invalid!"
      });
    }

    const token = adm.token;
    const hasToken = cookies().has("token");

    if (hasToken)
      return NextResponse.json({
        message: "Sucess!",
        error: false,
        status: 201
      });

    cookies().set("auth-token", token, { httpOnly: true });

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
