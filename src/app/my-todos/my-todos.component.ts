import { Component } from '@angular/core';
import { DataService } from '../core/data.service';
import { EMPTY, Subject, catchError, map, tap } from 'rxjs';
import { ErrorInterface } from '../shared/ApiError';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'td-my-todos',
  templateUrl: './my-todos.component.html',
  styleUrls: ['./my-todos.component.css'],
})
export class MyTodosComponent {
  constructor(
    private dataService: DataService,
    private storageService: StorageService
  ) {}

  private errorMessageSubject = new Subject<ErrorInterface>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  userTodos$ = this.dataService.allTodos$.pipe(
    map((todos) =>
      todos.filter(
        (todo) => todo.creatorId === this.storageService.getUser().id
      )
    ),
    tap((todos) => console.log('User Todos:', todos)),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
}
