import connect from "@/core/db";
import User from "@/models/User";

export async function POST(req: Request, { params: { email } }: { params: { email: string } }) {
  await connect();

  const user = await User.findOne({ email });

  console.log(req);
}
