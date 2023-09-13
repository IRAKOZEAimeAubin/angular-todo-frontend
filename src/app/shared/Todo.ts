export interface Todo {
  todoId?: string;
  title: string;
  description: string;
  status: string;
  published?: boolean;
  creatorId?: string;
  createdAt?: string;
  updatedAt?: string;
  searchKey?: string[];
  creator?: string;
}
