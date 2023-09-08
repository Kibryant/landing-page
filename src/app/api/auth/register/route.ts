import User from "@/models/User";
import { NextResponse } from "next/server";
import connect from "@/core/db";
import bcrypt from "bcrypt";
import { type UserProps } from "@/types/UserProps";

// type UserProps = {
//   email: string;
//   username: string;
//   password: string;
// };

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();
    await connect();
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists)
      return NextResponse.json({
        message: "E-mail already registered. Try again!",
        status: 409
      });

    if (usernameExists)
      return NextResponse.json({
        message: "Username already exits. Try again!",
        status: 409
      });
    const saltOrRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser: UserProps = new User({
      email,
      username,
      password: hashedPassword
    });

    await newUser.save();

    return NextResponse.json({
      message: "User created!",
      status: 201
    });
  } catch (error) {
    return NextResponse.json({
      error: `"Error! ${error}`,
      status: 500
    });
  }
}
