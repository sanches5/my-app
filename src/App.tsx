import React, { useEffect, useState } from "react";
import "./App.css";
import ListAs from "./Components/list";
import DateComponent from "./Components/UserName";
import { ThemeContext } from "./context";
import fetchTodos from "./api/index";
import Authenticate from "./Components/Authenticate";

function App() {
  const [state, setState] = useState<
    {
      id: number;
      title: string;
      description: string;
      completed: boolean;
      user: { id: number; name: string; password: string };
    }[]
  >([]);

  const [title, setTitle] = useState("title");
  const [description, setDescription] = useState("");
  const [todoTitle, setTitleTodo] = useState("");

  const todo = {
    title: todoTitle,
    description: description,
    completed: false,
  };

  const [user, setUser] = useState<{
    id: number;
    name: string;
  }>({
    id: 0,
    name: "",
  });

  const getUser: (user: any) => void = (user) => {
    fetchTodos("users", "GET", {}, user).then((res) => {
      try {
        res && setUser(res);
      } catch (e) {
        console.log(e);
      }
    });
  };

  const createUser: (user: any) => void = (user) => {
    fetchTodos("users/create", "POST", user).then((res) => {
      try {
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    });
  };

  const createTodo: (task: any) => void = (task) => {
    fetchTodos("todos/create", "POST", task, { userId: user.id }).then(
      (res) => {
        try {
          res && setState([...state, res]);
        } catch (e) {
          console.log(e);
        }
      }
    );
  };

  const deleteTodo: (todoId: number) => void = (todoId) => {
    fetchTodos("todos/delete", "DELETE", {}, { todoId }).then((res) => {
      try {
        res && setState(state.filter((todos) => todos.id !== todoId));
      } catch (e) {
        console.log(e);
      }
    });
  };

  const updateTodo: (task: any) => void = (task) => {
    fetchTodos("todos/update", "PUT", task, { todoId: task.id }).then((res) => {
      try {
        res &&
          setState(
            state.filter((item) => {
              if (item.id === res.id) {
                item = res;
                return item;
              }
              return item;
            })
          );
      } catch (e) {
        console.log(e);
      }
    });
  };

  useEffect(() => {
    if (user.id) {
      fetchTodos("todos", "GET", {}, { userId: user.id }).then((res) => {
        try {
          res && setState(res);
        } catch (e) {
          console.log(e);
        }
      });
    }
  }, [user]);

  return (
    <div>
      <ThemeContext.Provider
        value={{
          user: user,
          setUser: (s) => {
            setUser(s);
            return undefined;
          },
          title: title,
          setTitle: (s) => {
            setTitle(s);
            return undefined;
          },
        }}
      >
        <Authenticate getUser={getUser} createUser={createUser} />

        <DateComponent />
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ marginLeft: "5px" }}>Todo title</h3>
          <input
            type="text"
            style={{ height: "15px" }}
            onChange={(e) => setTitleTodo(e.target.value)}
          />
          <h3 style={{ marginLeft: "5px" }}>Todo description</h3>
          <input
            type="text"
            style={{ height: "15px" }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {user.id && (
          <div>
            <ListAs
              setState={setState}
              list={state}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
            <button onClick={() => createTodo(todo)}>add</button>
          </div>
        )}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
