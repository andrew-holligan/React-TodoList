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

  static async createTodoList(name: string, items: string[]): Promise<any> {
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
}
