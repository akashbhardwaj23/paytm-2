import express from "express"
import db from "@repo/db/client"
import z from "zod"

const app = express();


app.use(express.json());
app.use(express.static("/public"));




// const paymentInformationType = z.object({
//     token : z.string(),
//     userId : z.string(),
//     amount : z.string()
// })



// app.post("/mybank", (req, res) => {
//     const paymentInformation : {
//         token : string,
//         userId : string,
//         amount : string
//     } = {
//         token : req.body.token,
//         userId : req.body.user_identifier,
//         amount : req.body.amount,
//     };
//     console.log(req.body)


//     // const success = paymentInformationType.safeParse(req.body);

//     // console.log(success)


//     // if(!success.success) return res.status(401).json({message : "Invaild Input"});

//     // check the token and userid

//     res.redirect("/hdfcWebhook")


// })



app.post("/hdfcWebhook", async (req, res) => {
    // Add Zod Validation here 
    // Check if this request actually came from HDFC bank
    // TODO Check if this onRamp Txn is Procession or succed
    const paymentInformation : {
        token : string,
        userId : string,
        amount : string
    } = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount,
    };

    // update the balance in db, and txn

    // trannsactions
    // await db.balance.update({
    //     where: {
    //         userId : Number(paymentInformation.userId)
    //     },
    //     data : {
    //         amount : {
    //             increment : Number(paymentInformation.amount)
    //         }
    //     }
    // });

    // await db.onRampTransaction.update({
    //     where : {
    //         token : paymentInformation.token
    //     }, 
    //     data : {
    //         status : "Success"
    //     }
    // });


   // check here 

   
    try {
        const  response = await db.onRampTransaction.findFirst({
            where : {
                token :paymentInformation.token
            }
           })
        
           if(response?.status === "Success"){
            return res.status(403).json({
                message : "This transaction is done Before"
            })
           }
    

        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                } 
            })
        ]);

      return  res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);

        await db.onRampTransaction.update({
            where : {
                token : paymentInformation.token
            }, 
            data : {
                status : "Failure"
            }
        })
      return  res.status(411).json({
            message: "Error while processing webhook"
        })
    }



   
})

// balances
// onRampTransactions



app.listen(3003, () => {
    console.log("Server started at 3003")
})