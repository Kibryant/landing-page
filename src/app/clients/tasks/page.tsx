"use client";

import { useFetch } from "@/hooks/useFetch";
import { TasksSchemaProps, tasksSchema } from "@/schemas/tasksSchema";
import { ResProps } from "@/types/ResProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const Tasks = () => {
  const getLocalStorageItem = window.localStorage.getItem("client-system");
  const email = JSON.parse(getLocalStorageItem!).email;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TasksSchemaProps>({
    resolver: zodResolver(tasksSchema)
  });

  const handleSubmitTasks: SubmitHandler<TasksSchemaProps> = async ({ task, description, date }) => {
    const formatedDate = new Date(date);
    console.log(formatedDate);
    // const { data, isLoading, error } = useFetch({
    //   url: `/api/clients/tasks/${email}`,
    //   method: "POST",
    //   bodyContent: {
    //     task,
    //     description,
    //     date: formatedDate
    //   }
    // });

    try {
      await fetch(`/api/clients/tasks/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          task,
          description,
          date: formatedDate
        })
      }).then(async (response) => {
        const res: ResProps = await response.json();

        if (res.status !== 201) {
          // setMessageErro(res.message);
          return;
        }

        console.log("sucesso");

        // setSuccessMessage(res.message);
        return;
      });
    } catch (err) {
      // handleError(`Error: ${error}`);
      console.log(err);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit(handleSubmitTasks)}>
        <div>
          <label htmlFor=""></label>
          <input {...register("task")} type="text" />
        </div>
        <div>
          <label htmlFor=""></label>
          <input {...register("description")} type="text" />
        </div>
        <div>
          <label htmlFor=""></label>
          <input {...register("date")} type="date" />
          {!!errors.date?.message && <span className="text-sm text-red-500">{errors.date.message}</span>}
        </div>
        <div>
          <button type="submit">Save Task</button>
        </div>
      </form>
    </main>
  );
};

export default Tasks;
