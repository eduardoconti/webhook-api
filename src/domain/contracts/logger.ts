export interface ILogger {
  info<T>(message: T): void;
  error<T>(message: T): void;
}
