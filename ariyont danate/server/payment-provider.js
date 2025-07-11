module.exports = {
    processPayment: function(data) {
        // Bu yerda haqiqiy CLICK/PAYME API chaqirsa bo‘ladi
        if (data.cardNumber.length !== 16) {
            return { success: false, message: "Karta raqami noto‘g‘ri!" };
        }
        if (data.cardCVV.length !== 3) {
            return { success: false, message: "CVV noto‘g‘ri!" };
        }

        // Hamma tekshiruvlar o‘tgan bo‘lsa
        return {
            success: true,
            message: `${data.amount} ${data.game} uchun muvaffaqiyatli to‘landi!`
        };
    }
};
