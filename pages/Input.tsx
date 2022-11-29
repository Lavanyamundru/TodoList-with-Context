import React, { useContext, useState } from "react";
import styled from "styled-components";
import GlobalContext from "./Context/Textcontext";
import Popup from "./Popup";

const Input = styled.input`
  height: 30px;
  margin-left: 400px;
  width: 350px;
  margin-top: 50px;
`;
const H3 = styled.h3`
  height: 35px;
  margin-left: 40px;
  color: black;
  font-family: "Poppins";
  font-weight: 700;
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
  margin: 0 auto;
  margin-top: 2rem;
`;
const Div = styled.div`
  margin-left: 400px;
  margin-top: 40px;
  font-size: 20px;
  border: 1px solid black;
  width: 480px;
  height: 35px;
  border-radius: 5px;
  height: 70px;
  font-size: 20px;
`;
const Input1 = styled.input`
  margin-top: 10px;
  margin-left: 20px;
  padding-top: 50px;
`;
const Divcontainer = styled.div`
  background-color: rgb(255, 245, 238);
  width: 100%;
  height: 100%;
  margin-top: -32px;
`;
const Button1 = styled.button`
  float: right;
  margin-top: -30px;
  height: 25px;
  color: black;
  border: black;
  background-color: #dad8d7;
  margin-right: 65px;
`;
const Button2 = styled.button`
  float: right;
  margin-top: -30px;
  height: 25px;
  color: black;
  border: black;
  margin-right: 4px;
  background-color: #dad8d7;
`;
const Button3 = styled.button`
  width: 480px;
  background: rgb(255, 245, 238);
  margin-top: 10px;
  margin-left: 400px;
  height: 30px;
  color: black;
  border: 1px solid black;
`;
const Div1 = styled.div`
  margin-left: 40px;
  margin-top: -15px;
`;
const Button4 = styled.button`
  width: 130px;
  background: grey;
  height: 30px;
`;

const Todolis = () => {
  const gContext = useContext(GlobalContext);
  const todo_list = gContext?.todoList;

  const [modalOpen, setModalOpen] = useState(false);
  const [editdata, setEditdata] = useState({});
  const [checked, setChecked] = useState(false);

  const handleEditClick = (todo: any) => {
    setEditdata(todo);
    setModalOpen(true);
  };

  const handlePopup = (isOpen: any) => {
    setModalOpen(isOpen);
    setEditdata("");
  };

  const OnCheckboxClicked = (todo: any) => {
    gContext.UPDATE_CHECKBOX({ ...todo, isSelected: !todo.isSelected });
    setChecked(!checked);
  };

  const onClickDelete = (id: any) => {
    gContext.removeTodo(id);
  };
  return (
    <>
      <Divcontainer>
        <div>
          <H3>Todo List</H3>
          <Input type="text" placeholder="click on Button to fill the data" />
          <Button4 type="button" onClick={() => setModalOpen(true)}>
            Add Task
          </Button4>

          <div>
            {todo_list?.map((each: any) => (
              <Div
                key={each.id}
                style={{
                  background: each.isSelected ? "#817c7c" : " ",
                }}
              >
                <Input1
                  type="checkbox"
                  value={each.isSelected}
                  onChange={() => OnCheckboxClicked(each)}
                />
                <Div1>
                  {each.todoItem}
                  <div>{each.description}</div>
                </Div1>

                <Button1
                  type="button"
                  onClick={() => handleEditClick(each)}
                 
                >
                  Edit
                </Button1>
                <Button2
                  type="button"
                  onClick={() => onClickDelete(each.id)}
                  
                >
                  Delete
                </Button2>
              </Div>
            ))}
            <Button3 type="button" onClick={() => gContext.DELETE_ALL()}>
              Delete All
            </Button3>
            {modalOpen ? (
              <Popup handlePopup={handlePopup} editdata={editdata} />
            ) : (
              ""
            )}
          </div>
        </div>
      </Divcontainer>
    </>
  );
};

export default Todolis;
