import axios from "axios";
export const API_SERVER_HOST = "https://hotelatelier.shop";
const prefix = `${API_SERVER_HOST}/api/atelier/auth`;

// ID 찾기 (이름 기반)
export const findIdByName = async ({ name, phone }) => {
  const res = await axios.post(`${prefix}/find-id`, { name, phone });
  return res.data;
};

// PW 찾기 (이메일로 임시 비밀번호 발송)
export const findPwByEmail = async (email) => {
  const res = await axios.post(`${prefix}/find-password`, { email });
  return res.data;
};

// PW 변경
export const resetPasswordWithTemp = async ({
  email,
  tempPassword,
  newPassword,
}) => {
  return await axios.post(`${prefix}/reset-password`, {
    email,
    tempPassword,
    newPassword,
  });
};
