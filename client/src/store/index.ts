import { atom } from "recoil";

export const TokenAtom = atom({
  key: "Token",
  default: localStorage.getItem("token") || "",
});
