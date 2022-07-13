const functions = require("firebase-functions");
//C:\Users\pc\Desktop\amazon-project\amazon-clone\functions>npm i cors ve npm i stripe
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")("sk_test_51LGMptLX8pgv5PhT6dTuK9H1g5NHjGVFaHtMv8vxaWwj4N1z7WZZHsuKzlgjbuS4ezStCE8lWazZl09gLAwkpDeq00H6X7uoJI"); //secret key


//http://localhost:5001/clone-2d089/us-central1/api

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

app.get("/",(request, response) => response.status(200).send("Hello From Cloud"));

app.post("payments/create", async(request, response) =>{
    const total = request.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
        amount : total, 
        currency: 'INR'
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.api = functions.https.onRequest(app);
//C:\Users\pc\Desktop\amazon-project\amazon-clone\functions>firebase emulators:start  buradan api linkini aldıktan sonra post işlevini yazıyoruz