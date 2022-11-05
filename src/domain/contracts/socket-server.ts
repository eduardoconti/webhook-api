export interface ISocketServer {
  emit: (event: string, ...data: any[]) => void;
}
