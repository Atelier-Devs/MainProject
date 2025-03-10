import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/products`;
//p253
export const postAdd = async (productObj) => {
  const header = { Headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${prefix}/`, productObj, header);
  return res.data;
};

export const getList = async (pageParam) => {
  console.log(pageParam);
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, { params: { page, size } });
  return res.data;
};

export const getOne = async (pno) => {
  console.log("getOne:", pno);
  const res = await jwtAxios.get(`${prefix}/${pno}`);
  return res.data;
};

export const deleteOne = async (pno) => {
  const res = await jwtAxios.delete(`${prefix}/${pno}`);
  return res.data;
};

export const putOne = async (pno, product) => {
  console.log("putOne api product:", product);
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${prefix}/${pno}`, product, header);
  return res.data;
};
