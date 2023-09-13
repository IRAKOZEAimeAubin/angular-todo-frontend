export class ApiError {
  status!: number;
  message!: string;
}

export interface ErrorInterface {
  status: number;
  message: string;
}
