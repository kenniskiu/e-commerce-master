import React from "react";

export const UpdateProduct = (props) =>{
    const {fileTypes,setProductName,setProductDescription,
            description,setProductType,type,setPrice,price,
            setStock,stock,update,updateList,
            FileUploader,handleChange,productName} = props
    return(
        <div className="px-5 pt-5">
            <div className="h3">
                Update Product
            </div>
            <hr/>
            <div className="container p-0">
                <div className="row">
                    <div className="col-4">
                        <div className="h5 pt-2">Upload Product Image</div>
                            <div className="h6 text-muted">
                                Upload the image of your product
                            </div>
                        </div>
                    <div className="col">
                        <div className="card mt-4 px-5 pt-5" style={{width:"100%",height:""}}>
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes}/>
                            <div className="mt-5 pb-5 h6">
                                Image Added:
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="row mt-4">
                        <div className="col-4">
                            <div className="h5">Description</div>
                                <div className="h6 text-muted">
                                    Add your product description and necessary information from here                    
                                </div>
                            </div>
                        <div className="col">
                            <div className="card mt-4 px-5 pt-4" style={{width:"100%"}}>
                                <div className="container">
                                    <div className="row" onChange={(e)=>setProductName(e.target.value)} >
                                            Name
                                        <input type="text" className="form-control mt-1" placeholder={productName}/>
                                    </div>
                                    <div className="row pt-2 mt-3" onChange={(e)=>setProductDescription(e.target.value)}>
                                    Description
                                    <textarea className="form-control" rows="5" id="comment" name="text"
                                    placeholder={description}></textarea>
                                </div>
                                <div className="row pt-2 mt-3 mb-5" onChange={(e)=>setProductType(e.target.value)}>
                                    Type
                                    <select className="form-select me-2 mt-3 flex" 
                                    id="inputGroupSelect03" 
                                    aria-label="Example select with button addon"
                                    onChange={(e)=>{
                                    const selectedType = e.target.value;
                                    setProductType(selectedType)
                                    }}>
                                        <option selected>{type}</option>
                                        <option value='Vegetable'>Vegetable</option>
                                        <option value='Fruits'>Fruits</option>
                                        <option value='Gym Equipments'>Gym Equipments</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="h5">Product Information</div>
                            <div className="h6 text-muted">
                                Add your simple product description and necessary information from here                    
                            </div>
                        </div>
                    <div className="col">
                        <div className="card mt-4 px-5 pt-4" style={{width:"100%"}}>
                            <div className="container pb-5">
                                <div className="row" onChange={(e)=>setPrice(e.target.value)}>
                                    Price (Rp)
                                    <input type="range"  min="0" max="250000" step="1000" id="customRange3" className="form-range mt-1"/>
                                    Rp {price}
                                </div>
                                <div className="row pt-2 mt-3" onChange={(e)=>setStock(e.target.value)}>
                                    Unit
                                    <input type="number" className="form-control mt-1" placeholder={stock} min='0'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end my-5"> 
                <button className="btn btn-success px-4 py-3" onClick={()=>update(updateList[0].product_ID)}>
                Update Product
                </button>
            </div>
        </div>
    )
}