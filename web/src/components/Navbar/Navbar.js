import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState,useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { faEye ,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios'
import { Register } from "./Register";
import { Login } from "./Login"
import { LoginButton } from "./LoginButton"

toast.configure()
function Navbar() {
  const navigate = useNavigate()
  const [error,setError] = useState("")
  const [disabled,setDisabled] = useState(true)
  const [category, setCategory] = useState("Grocery");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [loggedIn,setLoggedIn] = useState(false)
  const [active,setActive] = useState('1')
  const [passwordShown, setPasswordShown] = useState(false);
  const [eyeSymbol, setEyeSymbol] = useState(faEye)
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [address,setAddress] = useState('')
  function logOut(){
    navigate('/')
    Cookies.remove('userID')
    Cookies.remove('username')
  }
  useEffect(() => {
    const id = Cookies.get('userID')
    if(id?.length!=null){
      setLoggedIn(true)
      setDisabled(false)
    }
    else{
      setLoggedIn(false)
      setDisabled(true)
    }
  })
  function handleSubmit(){
    Axios.post('http://localhost:3001/login',{
      username : username,
      password : password
    }).then((response)=>{
      if(response.data.error == false){
        Cookies.set("userID",response.data.data.user_id)
        Cookies.set("username",response.data.data.username)
        setLoggedIn(true)
        setError(response.data.message)
        setDisabled(false)
      }
      else{
        setError(response.data.message)
      }
    })
  }
  function handleRegister(){
    Axios.post('http://localhost:3001/register',{
      username : username,
      password : password,
      address : address,
    }).then((response)=>{
      if(response.data.error==true){
        setError(response.data.message)
      }
      else{
        toast('Account made')
        setActive('1')
      }
    })
  }
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    if(eyeSymbol == faEye){
      setEyeSymbol(faEyeSlash)
    }
    else if(eyeSymbol == faEyeSlash){
      setEyeSymbol(faEye)
    }
  };
  return (
    <div className="font-Roboto flex justify-around pt-6 pb-3 top-0">
      <div className="flex gap-4">
        <div className="flex font-bold text-3xl items-center justify-center btn" onClick={()=>navigate("/")}>
          Pick<span className="text-vg-green">Veggies</span>
        </div>
        <FormControl sx={{ width: 150 }}>
          <Select value={category} onChange={handleChange}>
            <MenuItem value={"Grocery"}>Grocery</MenuItem>
            <MenuItem value={"Bakery"}>Bakery</MenuItem>
            <MenuItem value={"Makeup"}>Makeup</MenuItem>
            <MenuItem value={"Bags"}>Bags</MenuItem>
            <MenuItem value={"Clothing"}>Clothing</MenuItem>
            <MenuItem value={"Furniture"}>Furniture</MenuItem>
            <MenuItem value={"Daily Needs"}>Daily Needs</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex justify-evenly items-center gap-4 font-light text-gray-500">
        <div>Shops</div>
        <div>Offers</div>
        <div>FAQ</div>
        <div>Contact</div>
        <div className="flex gap-2">
          <button className="btn bg-vg-dark-green text-white font-medium flex items-center justify-center px-3 py-2 rounded" onClick={()=>navigate("/seller")} disabled={disabled}>
            Become a seller
          </button>
          <LoginButton
            loggedIn={loggedIn}
            Cookies={Cookies}
            logOut={logOut}
            />
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            <div className="offcanvas-header">
              <div className="h2" id="offcanvasTopLabel">Pick<span className="text-vg-green">Veggies</span></div>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><AiOutlineClose/></button>
              </div>
              <div className="offcanvas-body">
              {active === '1' && 
                <Login
                  setUsername={setUsername}
                  setPassword={setPassword}
                  setActive={setActive}
                  passwordShown={passwordShown}
                  togglePassword={togglePassword}
                  error={error}
                  handleSubmit={handleSubmit}
                  />
              }
              {active==='2'&&
                <Register 
                  setUsername={setUsername} 
                  setPassword={setPassword} 
                  setAddress={setAddress} 
                  handleRegister={handleRegister} 
                  setActive={setActive}
                  togglePassword={togglePassword}
                  passwordShown={passwordShown}/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
