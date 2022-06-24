import { proxy } from "valtio";

export const state = proxy<{
  todoList: string[];
  name: string;
  userId: string;
}>({
  todoList: [],
  name: "initName",
  userId: "aaa",
});

export const saveUserId = (id: string) => {
  state.userId = id;
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
