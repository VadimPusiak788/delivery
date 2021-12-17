import SearchGroup from "./components/SearchGroup";
import AvatarGroup from "./../../common/AvatarGroup";
import { useEffect } from 'react'
import axiosInstance from "../../common/axios";
import userReducer from "../../store/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import Suppliers from './components/Suppliers'

const Main = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    axiosInstance.get("/users/me/").then(response => {
      dispatch({ type: "SET_USER", payload: response.data }); localStorage.setItem('user', JSON.stringify(response.data));
    }).catch(err => console.log(err))
  }, [])

  return (
    <>
      <AvatarGroup marginTop="2rem" marginRight="2rem" size={64} />
      <Suppliers />
    </>
  );
};

export default Main;
