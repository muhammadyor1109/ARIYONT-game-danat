window.onload = function () {
    setTimeout(() => document.getElementById('splash').style.display = 'none', 1000);
    loadGames();
};

async function loadGames() {
    const res = await fetch('data/games.json');
    const games = await res.json();

    let cardsDiv = document.getElementById('cards');
    games.forEach(game => {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${game.name}</h3>
            <button class="btn" onclick="openModal('${game.name}', '${game.currency}')">Donat</button>`;
        cardsDiv.appendChild(card);
    });
}

function openModal(gameName, currency) {
    document.getElementById('gameTitle').innerText = `${gameName} Donat`;
    let select = document.getElementById('amountSelect');
    select.innerHTML = '';
    [60, 325, 660, 1800, 2460, 3850].forEach(amount => {
        let option = document.createElement('option');
        option.text = `${amount} ${currency}`;
        select.add(option);
    });
    document.getElementById('donateModal').style.display = 'flex';
}

function showPayment() {
    let playerId = document.getElementById('playerId').value;
    if (playerId.trim().length < 5) {
        alert("O‘yin ID kamida 5 ta belgidan iborat bo‘lishi kerak!");
        return;
    }
    document.getElementById('donateModal').style.display = 'none';
    document.getElementById('paymentModal').style.display = 'flex';
}

function confirmPayment() {
    let cardNum = document.getElementById('cardNumber').value;
    if (cardNum.trim().length !== 16) {
        alert("Karta raqami 16 ta raqam bo‘lishi kerak!");
        return;
    }
    alert("To‘lov muvaffaqiyatli bajarildi!");
    closeModal();
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
}
