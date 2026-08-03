import api from "../lib/axios";

interface LoginInput {
  email: string;
  password: string;
}

export const login = async(data:LoginInput) =>{

        const response = await api.post("/auth/login", data);
        return response.data

}