app.post('/api/payment', async (req, res) => {
    const { game, amount, playerId, paymentMethod, cardNumber, cardExpiry, cardCVV } = req.body;

    if(!game || !amount || !playerId || !paymentMethod || !cardNumber || !cardExpiry || !cardCVV){
        return res.status(400).json({ success: false, message: "Barcha maydonlar to‘ldirilishi shart!" });
    }

    const result = await payment.processPayment({
        game, amount, playerId, paymentMethod, cardNumber, cardExpiry, cardCVV
    });

    if(result.success){
        res.json({ success: true, message: result.message });
    } else {
        res.status(500).json({ success: false, message: result.message });
    }
});
