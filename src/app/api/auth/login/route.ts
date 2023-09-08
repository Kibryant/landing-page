import User from "@/models/User";
import connect from "@/core/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { UserProps } from "@/types/UserProps";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();
    await connect();
    const user: UserProps | null = await User.findOne({ email, username });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        return NextResponse.json({
          message: "User Exists!",
          status: 201,
          user
        });
      } else {
        throw new Error(`ERRO: Credentials Invalid!`);
      }
    } else {
      throw new Error(`ERRO: Credentials Invalid!`);
    }
  } catch (error) {
    return NextResponse.json({
      error: `"Error! ${error}`,
      status: 500
    });
  }
}
