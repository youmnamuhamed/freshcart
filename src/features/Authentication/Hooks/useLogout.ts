
"use client";

import { setAuthInfo } from "@/Store/auth.slice";
import { useDispatch } from "react-redux";
import { deleteToken } from "../server/auth.action";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify"

export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    await deleteToken();

    dispatch(
      setAuthInfo({
        isAuthenticated: false,
        userInfo: null,
      }),
    );

    toast.success("user logged out succefully")

    router.push("/login");
  };

  return { logout };
}
