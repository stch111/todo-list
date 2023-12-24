export interface Todo {
  id: number; //Incremented Integer
  todoListId: number;
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: number; //Incremented Integer
  name: string;
  todos: Todo[];
}

export interface TodoDbSchema {
  id?: number;
  todoListId: number;
  text: string;
  completed: boolean;
}

export interface TodoListDbSchema {
  id?: number;
  name: string;
}
