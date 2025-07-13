const fetch = require('node-fetch');

module.exports = {
    processPayment: async function(data) {
        if (data.cardNumber.length !== 16) {
            return { success: false, message: "Karta raqami noto‘g‘ri!" };
        }
        if (data.cardCVV.length !== 3) {
            return { success: false, message: "CVV noto‘g‘ri!" };
        }

        // CLICK API so‘rovi (test ma'lumot bilan)
        try {
            const response = await fetch("https://api.click.uz/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Auth": "YOUR_CLICK_API_KEY"
                },
                body: JSON.stringify({
                    amount: data.amount,
                    card_number: data.cardNumber,
                    card_expiry: data.cardExpiry,
                    card_cvv: data.cardCVV,
                    payment_method: data.paymentMethod,
                    service_id: "YOUR_SERVICE_ID",
                    transaction_param: data.playerId,
                    note: `${data.game} donat`
                })
            });

            const result = await response.json();
            if (result.success) {
                return {
                    success: true,
                    message: `${data.amount} ${data.game} uchun muvaffaqiyatli to‘landi!`
                };
            } else {
                return { success: false, message: result.error_message || "To‘lov bajarilmadi!" };
            }

        } catch (error) {
            return { success: false, message: "CLICK API bilan ulanishda xatolik!" };
        }
    }
};
