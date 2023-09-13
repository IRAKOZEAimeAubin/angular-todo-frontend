import { Component } from '@angular/core';
import { DataService } from '../core/data.service';
import {
  BehaviorSubject,
  EMPTY,
  Subject,
  catchError,
  combineLatest,
  map,
} from 'rxjs';
import { ErrorInterface } from '../shared/ApiError';

@Component({
  selector: 'td-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private dataService: DataService) {}

  private errorMessageSubject = new Subject<ErrorInterface>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  private userSelectedSubject = new BehaviorSubject<string>('');
  userSelectedActions$ = this.userSelectedSubject.asObservable();

  allPublishedTodo$ = combineLatest([
    this.dataService.publishedTodosWithUser$,
    this.userSelectedActions$,
  ]).pipe(
    map(([todos, userId]) =>
      todos.filter((todo) => (userId ? todo.creatorId === userId : true))
    ),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  allUsers$ = this.dataService.allUsers$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  onUserSelected(id: string) {
    this.userSelectedSubject.next(id);
  }
}
