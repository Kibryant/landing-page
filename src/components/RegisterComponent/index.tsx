"use client";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const RegisterComponent = () => {
  type HandleSubmitProps = (e: FormEvent<HTMLFormElement>) => void;
  type HandleChangeProps = (e: ChangeEvent<HTMLInputElement>) => void;
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: ""
  });

  const [message, setMessageErro] = useState("");
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const handleChangeInputs: HandleChangeProps = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit: HandleSubmitProps = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    if (form.email.length <= 6) {
      setMessageErro("Invalid Email!");
      return;
    }

    if (!form.email.includes("@") || !form.email.includes(".com")) {
      setMessageErro("Invalid Email!");
      return;
    }

    if (form.username.length <= 6) {
      setMessageErro("The user must have more than 6 characters!");
      return;
    }

    if (form.password.length <= 5) {
      setMessageErro("The password must haver more than 5 characters!");
      return;
    }

    setMessageErro("");
    console.log(form.username, form.email, form.password);
    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password
        })
      }).then(async (res) => {
        const result = await res.json();
        console.log(result);

        if (result.status === 201) {
          localStorage.setItem("client-system", JSON.stringify(result.data));
          router.push("/clients");
        } else {
          handleError(result.message);
        }
        setFormSubmitting(false);
      });
    } catch (error) {
      setFormSubmitting(false);
      handleError(`Error: ${error}`);
    }
  };

  const handleError = (msg: string) => {
    setMessageErro(msg);
    setTimeout(() => {
      setMessageErro("");
    }, 3000);
  };

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
        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 rounded-md uppercase hover:bg-emerald-600 disabled:bg-emerald-900"
            disabled={isFormSubmitting}
          >
            {isFormSubmitting ? "Loading..." : "Register"}
          </button>
          <span className="text-zinc-300 text-xs">
            <Link href="/signin" className="uppercase text-zinc-700">
              Sign-In
            </Link>{" "}
          </span>
        </div>
      </form>
    </>
  );
};

export { RegisterComponent };
