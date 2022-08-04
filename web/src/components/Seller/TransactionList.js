import React from "react"

export const TransactionList = (props) =>{
    const {transactionList,confirm,confirmed} = props
    return(
        <div className="container p-5 text-center">
            <div className='row bg-secondary'>
                <div className='col-3 border py-2'>
                    Date of Transaction
                </div>
                <div className='col border p-2'>
                    Item Bought
                </div>
                <div className='col border p-2'>
                    Quantity
                </div>
                <div className='col border p-2'>
                    Total Price
                </div>
                <div className='col border p-2'>
                    Delivery Status
                </div>
            </div>
            {transactionList.map((transaction)=>
                <div className='row'>
                    <div className='col-3 p-2 border'>
                        {transaction.date}
                    </div>
                    <div className='col border'>
                        {transaction.name}
                    </div>
                    <div className='col border'>
                        {transaction.amount}
                    </div>
                    <div className='col border'>
                        Rp. {transaction.amount*transaction.price}
                    </div>
                    <div className='col border'>
                        <div className="d-flex flex-row justify-content-evenly">
                        {transaction.delivery_status==0 &&
                        <>
                            <div className="btn btn-success p-0 my-2" onClick={()=>confirm(1,transaction.transaction_id)}>
                            Confirm
                            </div>
                            <div className="btn btn-danger p-0 my-2" onClick={()=>confirm(2,transaction.transaction_id)}>
                            Deny
                            </div>
                        </>
                        }
                        {transaction.delivery_status!=0 &&
                        <>
                            {confirmed(transaction.delivery_status)}
                        </>
                        }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}