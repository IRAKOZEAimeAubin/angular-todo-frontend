import { Component } from '@angular/core';
import { Todo } from '../shared/Todo';
import { Subscription } from 'rxjs';
import { DataService } from '../core/data.service';

@Component({
  selector: 'td-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  sub!: Subscription;

  constructor(private dataService: DataService) {}

  saveTodo(formValues: any) {
    let newTodo: Todo = <Todo>formValues;
    this.sub = this.dataService.addTodo(newTodo).subscribe({
      next: (todo) => console.log(todo),
      error: (err) => console.log(err),
    });
  }
}
