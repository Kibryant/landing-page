"use client";

import { useFetch } from "@/hooks/useFetch";
import { TasksSchemaProps, tasksSchema } from "@/schemas/tasksSchema";
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

  const handleSubmitTasks: SubmitHandler<TasksSchemaProps> = ({ task, description, date }) => {
    const { data, isLoading, error } = useFetch({
      url: `/api/clients/tasks/${email}`,
      method: "POST",
      bodyContent: {
        task,
        description,
        date
      }
    });
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
        </div>
        <div>
          <button type="submit">Save Task</button>
        </div>
      </form>
    </main>
  );
};

export default Tasks;
