import Adm from "@/models/Adm";
import { NextResponse } from "next/server";
import connect from "@/core/db";
import bcrypt from "bcrypt";
import { type AdmProps } from "@/types/AdmProps";
import { sign } from "jsonwebtoken";
import * as jose from "jose";
import { cookies } from "next/dist/client/components/headers";

export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const { accessCode, email, password }: AdmProps = body;
    console.log(body);
    const SECRET_KEY = process.env.SECRET_KEY || "";
    const adm: AdmProps | null = await Adm.findOne({ email });
    console.log(adm);

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

    adm.token = "";
    const expirationTime = Math.floor(Date.now() / 1000) + 5 * 60 * 60;
    // const token = sign({ email }, SECRET_KEY, { expiresIn: MAX_AGE });
    const token = await new jose.SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .sign(new TextEncoder().encode(SECRET_KEY));

    adm.token = token;
    console.log(token);

    await adm.save();
    // const hasToken = cookies().has("auth-token");

    // if (hasToken)
    //   return NextResponse.json({
    //     message: "Sucess!",
    //     error: false,
    //     status: 201
    //   });
    // cookies().set("auth-token", token, { httpOnly: false, expires: MAX_AGE });
    // NextResponse.next().cookies.set({
    //   name: "auth-token",
    //   value: token,
    //   httpOnly: false,
    //   maxAge: MAX_AGE
    // });

    const cookiesValue = NextResponse.next().cookies.set("auth_token", token, {
      expires: 5 * 60 * 60,
      httpOnly: false,
      maxAge: 5 * 60 * 60,
      path: "/"
    });

    return NextResponse.json(
      {
        message: "Sucess!",
        error: false,
        status: 201
      },
      { headers: { "Set-Cookie": `${cookiesValue}` } }
    );
  } catch (error) {
    return NextResponse.json({
      message: `Error: ${error}`,
      error: true,
      status: 500
    });
  }
}
