import { proxy } from "valtio";

export const state = proxy<{
  userId: string;
  userName: string;
  userEmail: string;
}>({
  userId: "initId",
  userName: "unknownUser",
  userEmail: "unknownEmail",
});

export const saveUserId = (id: string) => {
  state.userId = id;
};

export const saveUserInfo = (name: string) => {
  state.userName = name;
};

export const saveUserEmail = (email: string) => {
  state.userEmail = email;
};
