import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import GlobalContext from "./Context/Textcontext";

const Div = styled.div`
  position: absolute;
  top: 40%;
  left: 1%;
  width: 300px;
  height: 300px;
  background: #e1e1e1;
  z-index: 99;
  border-radius: 5px;
  margin-top: -160px;
  margin-left: 500px;
`;
const Div1 = styled.div`
  background-color: var(--bg-2);
  max-width: 500px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 8px;
`;
const Div2 = styled.div`
  position: absolute;
  top: -10px;
  right: 0;
  transform: translateY(-100%);
  font-size: 0.8rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: var(--gray-1);
  color: var(--black-2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease all;
  z-index: -1;
  &:hover {
    background-color: #e32525;
    color: white;
  }
`;
const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  margin-top: 5px;
  width: 100%;
  border: none;
  background-color: white;
  height: 35px;
  border-radius: 5px;
  margin-bottom: 1rem;
`;
const H3 = styled.h3`
  margin-top: -2px;
  padding-top: 5px;
`;
const Inputcontainer = styled.input`
  margin-bottom: 0.8rem;
  border: none;
  background-color: white;
  font-size: 1rem;
  height: 35px;
  border-radius: 5px;
  margin-top: 5px;
  width: 210px;
`;
const Button1 = styled.button`
  height: 20px;
  background-color: grey;
`;
export default function Popup({ handlePopup, editdata }: any) {
  const gContext = useContext(GlobalContext);
  const [todoInput, setTodoInput] = useState(editdata.todoItem);
  const [description, setDescription] = useState(editdata.description);

  const onClickAdd = () => {
    let newDate = new Date();
    let dateAndTime = newDate.toLocaleString();
    const newTodoObj = {
      id: dateAndTime,
      todoItem: todoInput,
      isSelected: false,
      description: description,
    };
    gContext?.addTodo(newTodoObj);
    handlePopup(false);
    setTodoInput("");
    setDescription("");
  };
  const onClickUpdate = () => {
    const editedObj = {
      id: editdata.id,
      todoItem: todoInput,
      isSelected: editdata.isSelected,
      description: description,
    };
    gContext?.UPDATE_TODO(editedObj);
    handlePopup(false);
    setTodoInput("");
  };

  const changeHandler = (event: any) => {
    setTodoInput(event.target.value);
  };
  const changeHandlers = (event: any) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <Div>
        <Div1>
          <Div2>
            <label onClick={() => handlePopup(false)}>X</label>
          </Div2>
          <Form>
            <H3>Add TODO</H3>
            <label>
              {" "}
              Title
              <Input value={todoInput} onChange={changeHandler} />
            </label>
            <label>
              {" "}
              Description
              <Inputcontainer
                type="text"
                value={description}
                onChange={changeHandlers}
              />
            </label>

            {Object.keys(editdata).length === 0 ? (
              <Button1 type="button" onClick={onClickAdd}>
                Add Task
              </Button1>
            ) : (
              <Button
                variant="contained"
                color="inherit"
                type="button"
                onClick={onClickUpdate}
              >
                Update
              </Button>
            )}
          </Form>
        </Div1>
      </Div>
    </>
  );
}
