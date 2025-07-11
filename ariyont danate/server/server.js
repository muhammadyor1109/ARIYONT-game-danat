const express = require('express');
const cors = require('cors');
const app = express();
const payment = require('./payment-provider');

app.use(cors());
app.use(express.json());

app.post('/api/payment', (req, res) => {
    const { game, amount, playerId, paymentMethod, cardNumber, cardExpiry, cardCVV } = req.body;

    if(!game || !amount || !playerId || !paymentMethod || !cardNumber || !cardExpiry || !cardCVV){
        return res.status(400).json({ success: false, message: "Barcha maydonlar to‘ldirilishi shart!" });
    }

    const result = payment.processPayment({
        game, amount, playerId, paymentMethod, cardNumber, cardExpiry, cardCVV
    });

    if(result.success){
        res.json({ success: true, message: result.message });
    } else {
        res.status(500).json({ success: false, message: result.message });
    }
});

app.listen(5000, () => console.log("✅ Server 5000-portda ishga tushdi"));
