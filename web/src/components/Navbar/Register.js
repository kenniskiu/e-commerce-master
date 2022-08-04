import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export const Register= (props) =>{
    const {setUsername,setPassword,setAddress,handleRegister,setActive,passwordShown,togglePassword,error} = props
    const [eyeSymbol, setEyeSymbol] = useState(faEye)
    return(
        <div>
            <div className="h4 mb-3">
                Register
            </div>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} className="form-control ms-1 mb-1 w-75" placeholder="Username"/>
            <div className="input-group  ms-1 mb-2 w-75">
                <input type={passwordShown ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} className="form-control"
                    placeholder="Password" />
                <button className="btn btn-outline-secondary" type="button" onClick={togglePassword}>
                    <FontAwesomeIcon icon={eyeSymbol} />
                </button>
            </div>
            <input type="text" onChange={(e)=>setAddress(e.target.value)} className="form-control ms-1 mb-1 w-75" placeholder="Address"/>
            <div className="text-danger text-center">
                {error}
            </div>
            <div className="d-flex flex-row mt-4 justify-content-between pe-5 me-5">
                <button className="btn btn-outline-secondary shadow bg-success text-white" onClick={handleRegister}>
                    Register
                </button>
                <div className="mt-2">
                    or <button className="btn btn-link p-0 text-black" onClick={()=>setActive('1')}>Login</button>
                </div>
            </div>
        </div>
    )
}