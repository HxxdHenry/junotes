document.addEventListener("DOMContentLoaded", () => {
    // Add any JavaScript needed for the contributions page here
    const startBotButton = document.getElementById("start-bot-button");

    // Example of handling button click to open Telegram bot
    startBotButton.addEventListener("click", (event) => {
        event.preventDefault();
        // You could add more functionality here if needed
        window.open("https://t.me/YourBotUsername", "_blank");
    });
});
