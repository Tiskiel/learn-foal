import {
  Delete,
  Get,
  HttpResponseNotFound,
  HttpResponseOK,
  Post,
} from "@foal/core";
import { Todo } from "../entities";
import { Context } from "mocha";

export class ApiController {
  @Get("/todos")
  async getTodos() {
    const todos = await Todo.find();
    return new HttpResponseOK(todos);
  }

  @Post("/todos/:id")
  async postTodos(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;
    await todo.save();

    return new HttpResponseOK(todo);
  }

  @Delete("/todos/:id")
  async deleteTodos(ctx: Context) {
    const todo = await Todo.findOneBy({ id: ctx.request.params.id });

    if (!todo) {
      return new HttpResponseNotFound();
    }

    await todo.remove();

    return new HttpResponseOK(todo);
  }
}
