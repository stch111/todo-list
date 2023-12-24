import Dexie from 'dexie';
import { Todo, TodoDbSchema, TodoList, TodoListDbSchema } from './interfaces';

class TodoDb extends Dexie {
  todos!: Dexie.Table<TodoDbSchema, number>;
  todoLists!: Dexie.Table<TodoListDbSchema, number>;

  constructor() {
    super('TodoDb');
    this.version(1).stores({
      todoLists: '++id, name',
      todos: '++id, text, completed, todoListId',
    });
  }
}

export const db = new TodoDb();

export const getAll = async () => {
  const todos = await db.todos.toArray();
  const todoLists = await db.todoLists.toArray();

  // We can assert that an id will come back in all objects
  // The id is only missing when adding new items to the db
  const todosMapped: Todo[] = todos.map((todo) => {
    return {
      ...todo,
      id: todo.id!,
    };
  });

  const todoListsMapped: TodoList[] = todoLists.map((list) => {
    return {
      ...list,
      id: list.id!,
      todos: todosMapped.filter((todo) => todo.todoListId === list.id),
    };
  });

  return todoListsMapped;
};
