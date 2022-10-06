import { proxy } from "valtio";

export const state = proxy<{
  userId: string;
  userName: string;
  userEmail: string;
  color: "light" | "dark";
}>({
  userId: "unknownid",
  userName: "unknownuser",
  userEmail: "unknownemail",
  color: "light",
});

export const toggleColor = (color: "light" | "dark") => {
  state.color = color;
};

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
