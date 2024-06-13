export interface SWRHook<T> {
  data: T;
  isLoading: boolean;
  error: string;
  mutate?: (data?: unknown, shouldRevalidate?: boolean) => Promise<unknown | undefined>;
}
