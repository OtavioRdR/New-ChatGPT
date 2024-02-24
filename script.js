const chatContainer = document.getElementById('chatContainer');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const WIT_API_TOKEN = '2023308141378257';  // Substitua pelo seu token do Wit.ai

function sendMessage() {
    const message = userInput.value.trim();
    
    if (message === '') {
        return;
    }

    displayMessage('User', message);
    userInput.value = '';

    // Simular resposta do ChatBot
    setTimeout(() => {
        getWitAiResponse(message)
            .then(response => displayMessage('ChatBot', response))
            .catch(error => console.error('Error fetching Wit.ai:', error));
    }, 500);
}

function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getWitAiResponse(userMessage) {
    const witApiUrl = `https://api.wit.ai/message?v=20211129&q=${encodeURIComponent(userMessage)}`;

    return fetch(witApiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${WIT_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const entities = data.entities;

        // Adapte conforme necessário com base nas intenções do seu Wit.ai
        if (entities.greetings) {
            return 'Hello! How can I assist you today?';
        } else if (entities.how_are_you) {
            return 'I\'m doing well, thank you! How about you?';
        } else if (entities.name) {
            return 'I am ChatBot, your virtual assistant.';
        } else if (entities.bye) {
            return 'Goodbye! Have a great day!';
        } else {
            return 'I\'m not sure how to respond to that.';
        }
    })
    .catch(error => {
        console.error('Error fetching Wit.ai:', error);
        return 'I\'m having trouble understanding right now. Please try again.';
    });
}
