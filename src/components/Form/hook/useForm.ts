"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const useForm = () => {
  type HandleSubmitProps = (e: FormEvent<HTMLFormElement>) => void;
  type HandleChangeProps = (e: ChangeEvent<HTMLInputElement>) => void;
  const router = useRouter();
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: ""
  });

  const [message, setMessageErro] = useState("");
  const handleError = (msg: string) => {
    setMessageErro(msg);
    setTimeout(() => {
      setMessageErro("");
    }, 3000);
  };
  const handleChangeInputs: HandleChangeProps = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit: HandleSubmitProps = async (e) => {
    e.preventDefault();
    if (form.email.length <= 6) {
      setMessageErro("Email inválido!");
      return;
    }

    if (!form.email.includes("@") || !form.email.includes(".com")) {
      setMessageErro("Email inválido!");
      return;
    }

    if (form.username.length <= 6) {
      setMessageErro("Usuário deve ter mais de 6 caracteres!");
      return;
    }

    if (form.password.length <= 5) {
      setMessageErro("A senha deve ter mais de 5 caracteres!");
      return;
    }
    setMessageErro("");
    try {
      await fetch("api/auth/login", {
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
        if (result.status === 201) {
          alert(result.message);
          localStorage.setItem("arthur-system", form.username);
          router.push("/clients");
        } else {
          handleError(result.error);
        }
        setFormSubmitting(false);
      });
    } catch (error) {
      setFormSubmitting(false);
      handleError(`Error: ${error}`);
    }
  };

  return {
    message,
    handleChangeInputs,
    handleSubmit
  };
};

export { useForm };
