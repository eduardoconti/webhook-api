export interface ICacheManager {
  set<T>(key: string, value: T, ttl?: number): Promise<T>;
  get<T>(key: string): Promise<T | undefined>;

  del(key: string): Promise<any>;

  reset(): Promise<void>;
  reset(cb: () => void): void;

  store: any;
}
