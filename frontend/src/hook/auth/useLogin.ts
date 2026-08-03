import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../api/auth.api";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data.data);
      toast.success("Login sucessful");
    },

    onError: () => {
      toast.error("Login Failed");
    },
  });
};
