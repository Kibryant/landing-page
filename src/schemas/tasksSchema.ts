import { z } from "zod";

const tasksSchema = z.object({
  task: z.string().min(1, "Task must hava ate least 1 character."),
  date: z.date().min(new Date(), "Date must be in the future!"),
  description: z.string().min(8, "Invalid Description!").nonempty("Description is necessary!")
});

type TasksSchemaProps = z.infer<typeof tasksSchema>;

export type { TasksSchemaProps };
export { tasksSchema };
