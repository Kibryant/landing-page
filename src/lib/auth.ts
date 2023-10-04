import { verify } from "jsonwebtoken";
import * as jose from "jose";

interface AdmJwtPayload {
  jti: string;
  lat: string;
}

export const fiveHoursInSeconds = 5 * 60 * 60;
export const getSecretKey: () => string = () => {
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY || SECRET_KEY.length === 0) throw new Error("The enviroment variable SECRET_KEY is not set!");

  return SECRET_KEY;
};

export const verifyAuth = async (token: string) => {
  try {
    console.log("oie");
    // console.log(verify(token, getSecretKey(), (err, decoded) => console.log(decoded)));
    const verified = await jose.jwtVerify(token, new TextEncoder().encode(getSecretKey()));

    // if (!!verified.payload.exp && verified.payload.exp < Math.floor(Date.now() / 1000) + fiveHoursInSeconds) {
    //   console.log("expirou")
    //   return null;
    // }
    console.log(verified);
    return verified.payload;
  } catch (error) {
    throw new Error(`Your token has expired ${error}`);
  }

  // const verified = verify(token, getSecretKey(),);

  // console.log("VERIFIED: " + verified);
  // return false;
};
