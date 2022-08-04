import React from "react";
import {AiOutlineShop,AiOutlineShoppingCart,AiFillDollarCircle,AiFillMoneyCollect} from "react-icons/ai";
import { faCoins, faMoneyBill ,faShop,faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import LineChart from "./LineChart";
import { MainCard } from "./MainCard";

export default function SellerMain() {
  return (
    <div>   
        <div className="d-flex flex-row justify-content-between mx-2 pt-4 mb-4">
            <MainCard cardTitle="Total Revenue" period="(Last 30 Days)" logo={faMoneyBill} color="green"/>
            <MainCard cardTitle="Total Order" period="(Last 30 Days)" logo={faShoppingCart} color="black"/>
            <MainCard cardTitle="Total Order" period="(Today)" logo={faCoins} color="yellow"/>
            <MainCard cardTitle="Todays Order" period="(Today)" logo={faShop} color="grey"/>
        </div>
            <div className="mx-2">
                <div className="card">
                    <LineChart/>
                </div>
            </div>
    </div>
  )
}
