import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MainCard = (props) =>{
    return(
        <div className="card border-0" style={{width:'23%'}}>
            <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                    <div>
                        <h5 className="card-title">{props.cardTitle}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{props.period}</h6>
                        </div>
                        <div className="ms-3">
                        <FontAwesomeIcon icon={props.logo} color={props.color} size="3x"/>
                    </div>
                </div>
                <div className="h4 ms-1 my-3">
                    0
                </div>
            </div>
        </div>
    )
}