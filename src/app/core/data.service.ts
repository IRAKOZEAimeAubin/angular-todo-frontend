import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  filter,
  map,
  of,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { ApiError } from '../shared/ApiError';
import { User } from '../shared/User';
import { Todo } from '../shared/Todo';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private handleError(err: HttpErrorResponse): Observable<never> {
    let error = new ApiError();
    if (err.error instanceof ErrorEvent) {
      error.message = err.error.message;
    } else {
      error.status = err.status;
      error.message = err.message;
    }
    console.error(error);
    return throwError(() => error);
  }

  private todoSelectedSubject = new BehaviorSubject<string>('');
  todoSelectedAction$ = this.todoSelectedSubject.asObservable();

  allUsers$ = this.http.get<User[]>('http://localhost:8000/users/').pipe(
    tap((data) => console.log('All Users:', data)),
    shareReplay(1),
    catchError(this.handleError)
  );

  allTodos$ = this.http.get<Todo[]>('http://localhost:8000/todos/').pipe(
    map((todos) =>
      todos.map((todo) => ({
        ...todo,
        updatedAt: new Intl.DateTimeFormat('en-EN', {
          dateStyle: 'full',
        }).format(new Date(todo.updatedAt!)),
      }))
    ),
    tap((items) => console.log('All Todos: ', items)),
    shareReplay(1),
    catchError(this.handleError)
  );

  allPublishedTodo$ = this.http
    .get<Todo[]>('http://localhost:8000/todos/published')
    .pipe(
      tap((items) => console.log('Published Todos: ', items)),
      shareReplay(1),
      catchError(this.handleError)
    );

  publishedTodosWithUser$ = combineLatest([
    this.allPublishedTodo$,
    this.allUsers$,
  ]).pipe(
    map(([publishedTodos, users]) =>
      publishedTodos.map((todo) => ({
        ...todo,
        updatedAt: new Intl.DateTimeFormat('en-EN', {
          dateStyle: 'full',
        }).format(new Date(todo.updatedAt!)),
        searchKey: [todo.title],
        creator: users.find((user) => todo.creatorId === user.id)?.username,
      }))
    ),
    shareReplay(1)
  );

  selectedPublishedTodo$ = combineLatest([
    this.publishedTodosWithUser$,
    this.todoSelectedAction$,
  ]).pipe(
    map(([todos, selectedTodoId]) =>
      todos.find((todo) => todo.todoId === selectedTodoId)
    ),
    tap((todo) => console.log('Selected Todo:', todo))
  );

  selectedTodoChanged(selectedTodoId: string) {
    this.todoSelectedSubject.next(selectedTodoId);
  }
}
