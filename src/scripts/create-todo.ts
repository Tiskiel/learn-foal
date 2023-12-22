import { Todo } from "../app/entities";
import { dataSource } from "../db";

export const schema = {
  additionalProperties: false,
  properties: {
    text: {
      type: "string",
    },
  },
  required: ["text"],
  type: "object",
};

export async function main(args: any) {
  await dataSource.initialize();

  try {
    const todo = new Todo();
    todo.text = args.text;

    console.log(await todo.save());
  } catch (error) {
    console.error(error);
  } finally {
    await dataSource.destroy();
  }
}
