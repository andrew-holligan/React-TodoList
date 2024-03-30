import type {ItemType} from './types.ts';

export class API {
  static async getTodoLists(): Promise<any> {
    return await fetch("http://localhost:5000/", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async getTodoList(id: string): Promise<any> {
    return await fetch("http://localhost:5000/todolist/" + id, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async createTodoList(name: string, items: ItemType[]): Promise<any> {
    await fetch("http://localhost:5000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        items,
      }),
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async deleteItem(id: string, index: number): Promise<any> {
    await fetch("http://localhost:5000/todolist/" + id + "/" + index, {
      method: "DELETE",
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async deleteTodoList(id: string): Promise<any> {
    await fetch("http://localhost:5000/todolist/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async setItemTick(id: string, index: number, tick: boolean): Promise<any> {
    await fetch("http://localhost:5000/todolist/" + id + "/" + index, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tick,
      }),
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
