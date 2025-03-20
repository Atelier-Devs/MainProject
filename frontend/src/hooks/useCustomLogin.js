import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "./../slices/loginSlice";

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.loginSlice); //로그인상태
  const isLogin = loginState.email ? true : false; //로그인 여부를 isLogin 변수에 저장
  const doLogin = async (loginParam) => {
    console.log("doLogin 정보 : ", loginParam);
    const action = await dispatch(loginPostAsync(loginParam));
    return action;
  };
  const doLogout = () => {
    dispatch(logout());
  };
  const moveToPath = (path) => navigate({ pathname: path }, { replace: true });
  const moveToLogin = () =>
    navigate({ pathname: "/member/login" }, { replace: true });
  const moveToReturn = () => <Navigate replace to={"/member/login"} />; //로그인 페이지로 이동
  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToReturn,
  };
};

export default useCustomLogin;
