import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { AuthComponent } from './auth/auth.component';
import { MyTodosComponent } from './my-todos/my-todos.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addTodo', component: AddTodoComponent },
  { path: 'myTodos', component: MyTodosComponent },
  { path: 'editTodo/:id', component: EditTodoComponent },
  { path: 'login', component: AuthComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
