import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appWrite/auth";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logoutHandler = ()=>{
    authService.logout()
    .then(()=> dispatch(logout()))
    .catch((Error)=> console.log("LogOut Error :::: ",Error))
  }

  return <button className="inline-block cursor-pointer px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Logout</button>
};


export default LogoutButton