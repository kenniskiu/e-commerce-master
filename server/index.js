const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors")

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user : "root",
    host : "8.tcp.ngrok.io",
    password : "root",
    database: "crud",
    port: 17248
})
app.post("/login",(req,res)=>{
    const username = req.body.username
    const password =  req.body.password
    db.query(
        "SELECT * from user WHERE username = ?", [username],
        (err,result)=>{
            if(result == undefined){
                console.log(err,"result is undefined")
                res.send({
                    error:true,
                    message:"User not found"
                })
            }
            else if(result.length==0){
                console.log(err,"error1")
                res.send({
                    error:true,
                    message:"User not found"
                })
            }
            else{
                if(result[0].password!=password){
                    console.log(err,"error2")
                        res.send({
                            error:true,
                            message:"Wrong Password"
                        })
                }
                else{
                console.log("success")
                    res.send({
                        error:false,
                        message:"Logged In",
                        data: {
                            user_id :result[0].user_ID,
                            username:result[0].username
                        }
                    })
                }
            }
        }
    )
})
app.post("/checkout",(req,res)=>{
    const cart = req.body.cart
    const id = parseInt(req.body.id)
    for(let i = 0; i < cart.length;i++){
        db.query(
            "INSERT INTO transaction_records(amount,product_ID,buyer_ID,date) VALUES(?,?,?,CURDATE())",
            [cart[i].qty,cart[i].product_ID,id]
        )
    }
    res.send("asd")
})
app.post("/register",(req,res)=>{
    const username = req.body.username
    const password =  req.body.password
    const address = req.body.address;
    db.query(
        "SELECT username FROM user WHERE username=?",[username],
        (err,result)=>{
            if (result == undefined){
                console.log(err,"undefined")
                res.send({
                    error:true,
                    message:"something wrong happened"
                })
            }
            else if(result.length==0){
                db.query(
                "INSERT INTO user(username,password,address) VALUES(?,?,?)",[username,password,address],
                (err,result)=>{
                    if(err){
                        console.log(err,"error")
                        res.send({
                            error:true,
                            message:"something wrong happened"
                        })
                    }
                    else{
                        console.log("success")
                        res.send({
                            error:false,
                            message:"Registered"
                        })
                    }
                })}
            else{
                console.log(err,"error4")
                res.send({
                    error:true,
                    message:"Account name taken"
                })
            }
                })})
app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id
    db.query(
        `DELETE FROM product WHERE product_ID = ${id}`,
        (err,result)=>{
            if(err){
                console.log(err)
                res.send("error")
            }
            else{
                res.send("Values deleted")
            }
        }
    )
})
app.get("/products/:id",(req,res)=>{
    const id = req.params.id
    console.log(req.params.id)
    db.query("SELECT * FROM product where seller_ID = ? ",[id],
    (err,result)=>{
        if(err){
            console.log(err)
            res.send("error")
        }
        else{
            res.send(result)
            console.log("sent")
        }
    })
})
app.get("/transaction/:id",(req,res)=>{
    const id = req.params.id
    db.query(" SELECT name,CURRENT_DATE,price,amount,buyer_ID,delivery_status FROM transaction_records INNER JOIN product on transaction_records.product_ID = product.product_ID where buyer_ID = (?)",[id],
    (err,result)=>{
        if(err){
            console.log(err)
            res.send("error")
        }
        else{
            res.send(result)
            console.log("sent")
        }
    })
})

app.get("/pending/:id",(req,res)=>{
    const id = req.params.id
    db.query("SELECT * FROM transaction_records INNER JOIN product on transaction_records.product_ID = product.product_ID INNER JOIN user on product.seller_ID = user.user_ID where user_ID = (?)",[id],
    (err,result)=>{
        if(err){
            console.log(err)
            res.send("error")
        }
        else{
            res.send(result)
            console.log("sent")
        }
    })
})
app.get("/editProduct/:id",(req,res)=>{
    const id = req.params.id
    console.log(req.params.id)
    db.query("SELECT * FROM product where product_ID = ? ",[id],
    (err,result)=>{
        if(err){
            console.log(err)
            res.send("error")
        }
        else{
            res.send(result)
            console.log("sent")
        }
    })
})
app.get(`/productsFiltered/:id`,(req,res)=>{
    const id = req.params.id
    console.log(id)
    if(id=='vegetables' || id=='meat' || id =='fruit'){
        db.query(`SELECT * FROM product WHERE type = ?`, [id],
        (err,result)=>{
            if(err){
                console.log(err)
                res.send("error")
            }
            else{
                console.log(result)
                res.send(result)
                console.log("sent")
            }
        })
    }
    else{
    db.query(`SELECT * FROM product WHERE name like '%${id}%'`,
    (err,result)=>{
        if(err){
            console.log(err)
            res.send("error")
        }
        else{
            console.log(result)
            res.send(result)
            console.log("sent")
        }
    })
    }

})
app.get(`/productsFilteredType/:type`,(req,res)=>{
    const type = req.params.type
    console.log(type)
    db.query(`SELECT * FROM product WHERE type = ?`, [type],
    (err,result)=>{
        if(err){
            console.log(err)
            res.send("error")
        }
        else{
            console.log(result)
            res.send(result)
            console.log("sent")
        }
    })
})
app.put(`/update/:id`,(req,res)=>{
    const productName = req.body.productName
    const stock =  req.body.stock
    const type = req.body.type
    const price = req.body.price
    const id = req.params.id
    const description = req.body.description
    db.query(`UPDATE product SET name = ?,stock = ?,type = ?,price = ?,description =? WHERE product_ID = ${id} `,
    [productName,stock,type,price,description],
    (err,result)=>{
        if(err){
        console.log(err)
            res.send("error")
        }
        else{
            console.log("updated")
            res.send("updated")
        }
    })
})
app.put(`/confirm/:id`,(req,res)=>{
    const confirmStatus = req.body.confirmStatus
    const id = req.params.id
    console.log(confirmStatus,"asd")
    console.log(id)
    db.query(`UPDATE transaction_records SET delivery_status = ? WHERE transaction_id = ${id} `,
    [confirmStatus],
    (err,result)=>{
        if(err){
            console.log(err)
            res.send("error")
        }
        else{
            console.log("updated")
            res.send("updated")
        }
    })
})
app.get("/",(req,res)=>{
    res.send("It's working")
})
app.listen(3001,() => {
    console.log("listening to port 3001")
})