import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/todo`;
//p390
export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${prefix}/${tno}`);
  return res.data;
};

export const getList = async (pageParam) => {
  console.log(pageParam);
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, { params: { page, size } });
  return res.data;
};

export const postAdd = async (todoObj) => {
  const res = await jwtAxios.post(`${prefix}/`, todoObj);
  return res.data;
};

export const deletOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}`);
  return res.data;
};

export const putOne = async (todo) => {
  console.log("putOne api todo:", todo);
  const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo);
  return res.data;
};

// AddComponent에서 postAdd 를 호출하면 성공하면  then(  성공 함수 호출 )
