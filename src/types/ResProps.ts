interface ResProps<T = undefined> {
  status: number;
  error: boolean;
  message: string;
  data?: T;
}

export type { ResProps };
