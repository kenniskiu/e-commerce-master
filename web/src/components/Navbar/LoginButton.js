import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye , faCartShopping, faDoorOpen, faUser } from '@fortawesome/free-solid-svg-icons'

export const LoginButton = (props) =>{
    const {loggedIn,Cookies,logOut} = props
    const [eyeSymbol, setEyeSymbol] = useState(faEye)
    return(
        <>
            {loggedIn===false &&
                <div className="btn bg-vg-dark-green text-white font-medium flex items-center justify-center px-3 py-2 rounded" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                    Join
                </div>
            }
            {loggedIn==true &&
                <div className=" px-3 py-2 fw-bold">
                    <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {Cookies.get("username")}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="/transaction">Transactions <FontAwesomeIcon className="text-decoration-none" icon={faCartShopping}/></a></li>
                        <li><a className="dropdown-item" href="#">Profile <FontAwesomeIcon className="text-decoration-none" icon={faUser}/></a></li>
                        <li><div className="btn btn-white" onClick={logOut}>Logout <FontAwesomeIcon className="text-decoration-none" icon={faDoorOpen}/></div></li>
                    </ul>
                </div>
            </div>}
        </>
    )
}