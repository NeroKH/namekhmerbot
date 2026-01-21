# Khmer Name Selector Bot 🇰🇭

A Telegram Bot that helps parents choose beautiful and meaningful Khmer names for their children.

## Features
*   **Dual Language Support**: Fully localized in **Khmer** (ភាសាខ្មែរ) and **English**.
*   **Smart Suggestions**: Suggests names based on Gender and Date of Birth (calculating the "Lucky Day" based on traditional Khmer beliefs).
*   **Interactive Wizard**: Easy step-by-step form to collect details (Father Name, Mother Name, DOB, Time, Sex, Remarks).
*   **Beautiful Output**: Provides a clean summary card with name meanings.

## How to Run Locally

1.  **Clone the repository**
    ```bash
    git clone https://github.com/NeroKH/namekhmerbot.git
    cd namekhmerbot
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    *   Create a `.env` file in the root directory.
    *   Add your Telegram Bot Token:
        ```env
        BOT_TOKEN=your_token_here
        ```

4.  **Run the Bot**
    ```bash
    npm start
    ```

## Deployment

This bot is ready to be deployed on platforms like **Railway**, **Render**, or **Heroku**.

1.  Connect your GitHub repository to the hosting service.
2.  Add the `BOT_TOKEN` environment variable in the host's dashboard.
3.  Deploy! The `start` script will handle the rest.

## Technologies
*   [Node.js](https://nodejs.org/)
*   [Telegraf.js](https://telegraf.js.org/) (Telegram Bot Framework)
*   [Day.js](https://day.js.org/) (Date manipulation)

---
*Created with ❤️ for Khmer Culture*
