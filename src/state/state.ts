import { proxy } from "valtio";

export const state = proxy<{
  userId: string;
  userName: string;
  userEmail: string;
}>({
  userId: "unknownid",
  userName: "unknownuser",
  userEmail: "unknownemail",
});

export const saveUserId = (userId: string) => {
  state.userId = userId;
  localStorage.setItem("userId", userId);
};

export const saveUserName = (name: string) => {
  state.userName = name;
};

export const saveUserEmail = (email: string) => {
  state.userEmail = email;
};

//ログアウトしたときに使う
export const resetUserInfo = () => {
  state.userId = "unknownid";
  state.userName = "unknownuser";
  state.userEmail = "unknownemail";
};
