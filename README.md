# Dynamic SMS Management Web Application

This project is a full-stack SMS management system that monitors and manages SMS processes dynamically. It features:

-   Real-time metrics dashboard with chart representation
-   Control over SMS processes
-   Management of country-operator pairs
-   Alert notifications for failures
-   JWT-based authentication

## Technologies Used

-   **Frontend**: Next.js with TypeScript and TailwindCSS
-   **Backend**: Python with Flask
-   **Databases**: MongoDB and MySQL
-   **Monitoring**: Prometheus and AlertManager with Telegram notifications

## Prerequisites

-   Node.js
-   Python 3
-   MongoDB
-   MySQL

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Dqrshan/dynamic-sms-management.git
cd dynamic-sms-management
```

### 2. Setup the Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
pip install Flask Flask-JWT-Extended pymongo mysql-connector-python
```

3. Configure MySQL and MongoDB connections in `app.py`. (MySQL Queries in `db.sql`)
4. Configure this for Telegram alerts in `app.py`: (I have used Telegram API for the same)

```python
59 | def send_telegram_alert(message):
60 |    requests.post("https://api.telegram.org/bot<token>/sendMessage", data={ # Replace <token> with your Telegram API token
61 |         "chat_id": "<chat_id>", # Replace <chat_id> with your telegram chat_id
62 |         "text": message
63 |    })
```

5. Run the flask server:

```bash
python app.py
```

### 3. Setup the Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install chart.js react-chartjs-2
```

3. Start the Next.js development server:

```bash
npm run dev
```

### 4. Configure Prometheus and AlertManager (Optional)

    1. Install Prometheus and AlertManager.
    2. Configure Prometheus to scrape metrics from Flask.
    3. Set up AlertManager with Telegram for critical alerts.

### Usage

1. Open http://localhost:3000 for the frontend interface.
2. Use the dashboard to monitor SMS performance metrics.
3. Login with the credentials set in the Flask backend to access the application.

---
