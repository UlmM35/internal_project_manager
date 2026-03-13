import axios from "axios";
import { Project } from "../types";
import { BASE_URL } from "../constants/constants";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'}
})

export const getProjects = async (): Promise<Project[]> => {
    const { data } = await api.get<Project[]>('/projects');
    return data;
}
