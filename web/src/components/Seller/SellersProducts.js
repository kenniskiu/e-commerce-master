import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faX} from '@fortawesome/free-solid-svg-icons'

export const SellersProducts = (props) =>{
    const {pending,setRender,list,updateFunc,remove} = props
    return(
        <div className="d-flex flex-column">
            <div className="pt-4 mb-4">
                <div className="card border-1 shadow rounded" style={{width:'100%'}}>
                    <div className="card-body">
                        <div className="d-flex flex-row justify-content-between px-5 py-4">
                            <div className="card-title h3">
                            Your Products
                            </div>
                            <div className="ms-3">
                                <button className="btn btn-success" onClick={()=>setRender('3')}>
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 bg-white shadow border rounded">
                <div className="text-center">
                    <div className="row mb-4 pt-3 bg-secondary rounded m-0 pb-2">
                        <div className="col">
                            Image
                        </div>
                        <div className="col-4">
                            Name
                        </div>
                        <div className="col">
                            Stock
                        </div>
                        <div className="col">
                            In Order
                        </div>
                        <div className="col">
                            Action
                        </div>
                    </div>
                {list.map((product)=>
                    <div className="row">
                        <div className="col mt-1">
                        </div>
                        <div className="col-4 mt-1">
                            {product.name}
                        </div>
                        <div className="col mt-1">
                            {product.stock}
                        </div>
                        <div className="col mt-1">
                            0
                        </div>
                        <div className="col mb-2">
                            <div className="d-flex flex-row justify-content-center">
                                <button className="btn btn-primary mx-2" onClick={()=>updateFunc(product.product_ID)}>
                                <FontAwesomeIcon icon={faWrench}/>
                                </button>
                                <button className="btn btn-danger mx-2" onClick={()=>remove(product.product_ID)}>
                                <FontAwesomeIcon icon={faX}/>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
            <div className="btn btn-link text-black text-start" onClick={pending}>
                1 Order Pending 
            </div>
        </div>
    )
}