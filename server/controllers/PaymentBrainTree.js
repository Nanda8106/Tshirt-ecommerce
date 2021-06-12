const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_KEY,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY
});

exports.getPaymentToken = (req, res) => {   // generate token
    gateway.clientToken.generate({}, function(error, response){
        if(error){
            res.status(500).send(error)
        }else{
            res.send(response)
        }
    })
}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (error, result) => {
          if(error){
            res.status(500).json(error)
          }else{
              res.json(result)
          }
      });
}