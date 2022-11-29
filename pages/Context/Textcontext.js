import React, { useState } from "react";

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  console.log(todoList, "todoList");

  const addTodo = (newObj) => {
    console.log(newObj, "newObj");
    console.log(todoList);
    setTodoList((prevstate) => [...prevstate, newObj]);
  };
  const removeTodo = (id) => {
    const filteredTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodos);
  };
  const UPDATE_TODO = (updateObj) => {
    let data = updateObj;
    const result = todoList.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          todoItem: data.todoItem,
          description: data.description,
        };
      }
      return item;
    });
    setTodoList(result);
  };
  const UPDATE_CHECKBOX = (updatecheckbox) => {
    let dataa = updatecheckbox;
    const res = todoList.map((item) => {
      if (item.id === dataa.id) {
        return { ...item, isSelected: dataa.isSelected };
      }
      return item;
    });
    setTodoList(res);
  };

  const DELETE_ALL = () => {
    setTodoList([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        addTodo,
        DELETE_ALL,
        todoList,
        setTodoList,
        removeTodo,
        UPDATE_TODO,
        UPDATE_CHECKBOX,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
