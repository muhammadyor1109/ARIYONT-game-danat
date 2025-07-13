function confirmPayment() {
    let cardNum = document.getElementById('cardNumber').value;
    let cardExpiry = document.getElementById('cardExpiry').value;
    let cardCVV = document.getElementById('cardCVV').value;
    let paymentMethod = document.getElementById('paymentMethod').value;
    let playerId = document.getElementById('playerId').value;
    let gameTitle = document.getElementById('gameTitle').innerText.replace(" Donat", "");
    let amountText = document.getElementById('amountSelect').value;
    let amount = parseInt(amountText);

    if (cardNum.length !== 16) {
        alert("Karta raqami 16 ta raqam bo‘lishi kerak!");
        return;
    }
    if (cardCVV.length !== 3) {
        alert("CVV noto‘g‘ri!");
        return;
    }
    if (playerId.trim().length < 5) {
        alert("O‘yin ID kamida 5 ta belgidan iborat bo‘lishi kerak!");
        return;
    }

    // To‘lovni serverga yuborish
    fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: gameTitle,
            amount: amount,
            playerId: playerId,
            paymentMethod: paymentMethod,
            cardNumber: cardNum,
            cardExpiry: cardExpiry,
            cardCVV: cardCVV
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        closeModal();
    })
    .catch(err => {
        alert("Xatolik: " + err);
        closeModal();
    });
}
