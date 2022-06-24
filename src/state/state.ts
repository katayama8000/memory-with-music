import { proxy } from "valtio";

export const state = proxy<{
  todoList: string[];
  name: string;
  loginId: string;
}>({
  todoList: [],
  name: "initName",
  loginId: "aaa",
});

export const saveLoginId = (id: string) => {
  state.loginId = id;
};

export const changeName = (name: string) => {
  state.name = name;
};

export const addItem = (item: string) => {
  if (!item) {
    return;
  }
  state.todoList.push(item);
};
