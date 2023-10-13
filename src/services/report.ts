import axios, { AxiosResponse } from "axios";
import { IParamsReport, ResponeCategory, ResponeSummary } from "./type";

export const getSummary = async (params?: IParamsReport): Promise<AxiosResponse<ResponeSummary[]>> => {
  return await axios({
    method: "get",
    url: "https://randomuser.me/api",
    params,
  });
};

export const getCategory = async (params?: IParamsReport): Promise<AxiosResponse<ResponeCategory[]>> => {
  return await axios({
    method: "get",
    url: "https://randomuser.me/api",
    params,
  });
};
