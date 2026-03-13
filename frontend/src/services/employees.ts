import axios from "axios";
import { CreateEmployee, EmployeeResponse } from "../types";
import { BASE_URL } from "../constants";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

export const getEmployee = async (email: string): Promise<EmployeeResponse | null> => {
    try {
        const { data } = await api.get<EmployeeResponse>(`/profile/${encodeURIComponent(email)}`);
        return data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) return null;
        throw err;
    }
}

export const saveEmployee = async (info: CreateEmployee): Promise<EmployeeResponse> => {
    const { data } = await api.post<EmployeeResponse>('/profile', info);
    return data;
}
