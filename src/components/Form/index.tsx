"use client";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import { useForm } from "./hook/useForm";
import Link from "next/link";
const Form = () => {
  const { message, handleChangeInputs, handleSubmit } = useForm();
  return (
    <>
      <form
        className="flex flex-col justify-center items-center gap-4 w-full rounded max-w-lg p-4 border border-brandPink"
        onSubmit={handleSubmit}
      >
        {message && <span className="text-red-500">{message}</span>}
        <div className="w-full flex gap-1 justify-between">
          <label htmlFor="email">
            <EnvelopeIcon className="h-10 w-10 text-brandPink" />
          </label>
          <input
            type="email"
            onChange={handleChangeInputs}
            name="email"
            id="email"
            placeholder="Your email..."
            className="text-zinc-300 bg-transparent border border-brandPink w-full rounded-md p-2 outline-none focus:border-brandCyan-400"
            autoComplete="off"
            required
          />
        </div>
        <div className="w-full flex gap-1 justify-between">
          <label htmlFor="username">
            <UserIcon className="h-10 w-10 text-brandPink" />
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChangeInputs}
            placeholder="Your username..."
            className="text-zinc-300 bg-transparent border border-brandPink w-full rounded-md p-2"
            autoComplete="off"
            required
          />
        </div>
        <div className="w-full flex gap-1 justify-between">
          <label htmlFor="password">
            <LockClosedIcon className="h-10 w-10 text-brandPink" />
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChangeInputs}
            id="password"
            placeholder="Your password..."
            className="text-zinc-300 bg-transparent border border-brandPink w-full rounded-md p-2"
            autoComplete="off"
            required
          />
        </div>
        <div className="w-full flex gap-1 justify-between">
          <label htmlFor="repeatPassword">
            <LockClosedIcon className="h-10 w-10 text-brandPink" />
          </label>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 rounded-md uppercase hover:bg-emerald-600"
          >
            Sign-in
          </button>
        </div>
        <span className="text-zinc-300 text-xs">
          Don´t have a account?{" "}
          <Link href="/register" className="uppercase text-zinc-700 font-bold">
            Register
          </Link>{" "}
        </span>
      </form>
    </>
  );
};

export { Form };
