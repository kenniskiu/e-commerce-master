import { useState,useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import Sidebar from "./Sidebar";
import SellerMain from "./SellerMain"
import { SellersProducts } from "./SellersProducts";
import { AddProduct } from "./AddProduct";
import { UpdateProduct } from "./UpdateProduct";
import { TransactionList } from "./TransactionList";

const fileTypes = ["JPG", "PNG"];

const Seller = () => {
  const [type,setProductType] = useState('')
  const [render,setRender] = useState('1')
  const [file, setFile] = useState(null);
  const [active,setActive] = useState(false)
  const [productName,setProductName] = useState('')
  const [stock,setStock] = useState('')
  const [price,setPrice] = useState('')
  const [description,setProductDescription] = useState('')
  const [list,setList] = useState([])
  const [updateList,setUpdateList] = useState([])
  const [transactionList,setTransaction] = useState([])
  const [collapsed, setCollapsed] = useState(false);
  function updateTransactionList(){
    const id = Cookies.get('userID')
    axios.get(`http://localhost:3001/pending/${id}`)
        .then((response)=>{
            setTransaction(response.data)
            console.log(response.data)
        })
  }
  function updateFunc(test){
    setRender('4')
    fetchUpdateList(test)
  }
  function pending(){
    setRender('5')
  }
  function update(id){
    axios.put(`http://localhost:3001/update/${id}`,{
            productName:productName,
            stock:stock,
            type:type,
            price:price,
            description:description,
            product_id:id
        })
        .then(function(response){
            console.log(response)
            if(response.data == "error"){
                console.log("error occured")
            }
            else{
                toast('Data Updated')
                setRender('2')
            }
        })
        .catch(function(error){
            console.log(error)
        })    
  }
  function fetchUpdateList(id){
    axios.get(`http://localhost:3001/editProduct/${id}`)
        .then((response)=>{
            setUpdateList(response.data)
            console.log(response.data)
            setProductName(response.data[0].name)
            setStock(response.data[0].stock)
            setProductDescription(response.data[0].description)
            setPrice(response.data[0].price)
            setProductType(response.data[0].type)
        })
  }
  function confirmed(test){
    if(test==1){
      return("Confirm")
    }
    else{
      return("Denied")
    }
  }
  function confirm(test,id){
    axios.put(`http://localhost:3001/confirm/${id}`,{
            confirmStatus : test
        })
        .then(function(response){
            console.log(response)
            if(response.data == "error"){
                console.log("error occured")
            }
            else{
                toast('Data Updated')
                updateTransactionList()
            }
        })
        .catch(function(error){
            console.log(error)
        })      
  }
  function remove(id){
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(function(response){
      const id = Cookies.get('userID')
      axios.get(`http://localhost:3001/products/${id}`)
      .then((response)=>{
        setList(response.data)
        console.log(response.data)
    })
        if(response.data == "error"){
            console.log("error occured")
        }
        else{
            toast('Data deleted')
        }
    })
    .catch(function(error){
        console.log(error)
    })      
}   
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
    setActive(!active)
  };
  const handleChange = (file) => {
    setFile(file);
  };
  function submit(){
    const id = Cookies.get('userID')
    axios.post('http://localhost:3001/createProduct',{
            productName:productName,
            stock:stock,
            description:description,
            price:price,
            id:id,
            type:type,
            file:file
        })
        .then(function(response){
            console.log(response)
            if(response.data == "error"){
                console.log("error occured")
            }
            else{
              const id = Cookies.get('userID')
              axios.get(`http://localhost:3001/products/${id}`)
              .then((response)=>{
                  setList(response.data)
                  console.log(response.data)
              })
                toast('Data sent')
                setRender('2')

            }
        })
        .catch(function(error){
            console.log(error)
        })     
  }
  useEffect(() => {
    const id = Cookies.get('userID')
    axios.get(`http://localhost:3001/products/${id}`)
    .then((response)=>{
        setList(response.data)
        console.log(response.data)
    })
    updateTransactionList()
},[]);
  return (
    <div className="d-flex flex-row h-100">
      <Sidebar
        collapsed={collapsed}
        onClickMenuIcon={onClickMenuIcon}
        active={active}
        setRender={setRender}
        />
      <div className="text-black container-fluid background" style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100%",minHeight:"100vh", overflowY:"hidden"}}>
        <div style={{height:"100%"}}>
        <div style={{height:"calc(100% - 20px)"}}>
          {render === '1' && 
            <SellerMain
              />
          }
          {render === '2' && 
            <SellersProducts
              setRender={setRender}
              list={list}
              updateFunc={updateFunc}
              remove={remove}
              pending={pending}
            />
          }
           {render === '3' && 
            <AddProduct
              FileUploader={FileUploader}
              handleChange={handleChange}
              fileTypes={fileTypes}
              setProductDescription={setProductDescription}
              setProductName={setProductName}
              setProductType={setProductType}
              setStock={setStock}
              submit={submit}
              setPrice={setPrice}
              price={price}
              />
            }
          {render === '4' && 
           <UpdateProduct
              FileUploader={FileUploader}
              handleChange={handleChange}
              fileTypes={fileTypes}
              setProductDescription={setProductDescription}
              setProductName={setProductName}
              setProductType={setProductType}
              setStock={setStock}
              submit={submit}
              setPrice={setPrice}
              description={description}
              type={type}
              price={price}
              stock={stock}
              update={update}
              updateList={updateList}
              />
          }
          {
            render == '5' && 
            <TransactionList
              transactionList={transactionList}
              confirm={confirm}
              confirmed={confirmed}
            />
          }
          </div>
        </div>
      </div>
    </div>
  );
};
export default Seller;
