import axios, { AxiosResponse } from "axios";
import {
  IParamsReport,
  ResponeCategory,
  ResponeCategoryAndProductGroup,
  ResponeProductGroup,
  ResponeSummary,
} from "./type";

const url = "http://10.10.31.78:3000/v1/reports";

export const getSummary = async (params?: IParamsReport): Promise<AxiosResponse<ResponeSummary[]>> => {
  return await axios({
    method: "get",
    url: url + "/sales-summary",
    params,
  });
};

export const getCategory = async (params?: IParamsReport): Promise<AxiosResponse<ResponeCategory>> => {
  return await axios({
    method: "get",
    url: url + "/sales-by-category",
    params,
  });
};

export const getProductGroup = async (params?: IParamsReport): Promise<AxiosResponse<ResponeProductGroup>> => {
  return await axios({
    method: "get",
    url: url + "/sale-by-product-group",
    params,
  });
};

export const getCategoryAndProductGroup = async (
  params?: IParamsReport
): Promise<AxiosResponse<ResponeCategoryAndProductGroup>> => {
  return await axios({
    method: "get",
    url: url + "/sale-by-category-by-product-group",
    params,
  });
};
