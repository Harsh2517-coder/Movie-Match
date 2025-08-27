# 🎬 MovieMatch
A dynamic and responsive web application for discovering movies. Filter by genre and mood, sort the results, and find your next favorite film with a clean, modern interface. Each movie card links directly to its IMDb page for more details.

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Live Demo / Screenshots](#live-demo--screenshots)
3. [Key Features](#key-features)
4. [Technology Stack](#technology-stack)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation & Setup](#installation--setup)
6. [Project Structure](#project-structure)
7. [Usage](#usage)
8. [License](#license)
9. [Contact](#contact)
10. [Acknowledgements](#acknowledgements)

---

## 🌟 Project Overview

**MovieMatch** is a movie recommendation web app built with a Flask backend and a vanilla JavaScript frontend. It leverages The Movie Database (TMDb) API to provide users with a seamless way to discover films. Users can select a genre, a mood (which maps to a combination of genres), and a sorting preference to get a curated list of movies. The application features dynamic content loading, pagination, and a visually appealing, responsive design.

---

## 📸 Live Demo / Screenshots

https://movie-match-fl3q.onrender.com/
*Above: The main interface showing the filter options and movie results.*

---

## ✨ Key Features

* **Mood-Based Discovery:** Select a mood like "Happy," "Sad," or "Excited" to get recommendations from relevant genres.
* **Advanced Filtering:** Combine genre, mood, and sorting options (Popularity, Release Date, Top Rated) for precise results.
* **Dynamic Content:** Results are fetched and displayed asynchronously without page reloads.
* **IMDb Integration:** Each movie card is a clickable link that opens the corresponding IMDb page in a new tab.
* **Efficient Caching:** The Flask backend uses `@lru_cache` to cache API responses for genres and movie details, reducing redundant API calls and speeding up responses.
* **Smart Defaults:** If no filters are selected, the app shows a list of movies currently playing in theaters.
* **Clean UI & Pagination:** A modern, responsive interface with easy-to-use pagination to browse through thousands of movies.

---

## 🛠️ Technology Stack

* **Backend:**
    * [Flask](https://flask.palletsprojects.com/): A lightweight Python web framework.
    * [Requests](https://requests.readthedocs.io/): For making HTTP requests to the TMDb API.
    * [python-dotenv](https://pypi.org/project/python-dotenv/): For managing environment variables.
* **Frontend:**
    * **HTML5**
    * **CSS3:** Custom properties (variables), Flexbox, and Grid for a modern, responsive layout.
    * **Vanilla JavaScript (ES6+):** For DOM manipulation, event handling, and asynchronous API calls (`fetch`).
* **API:**
    * [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* **Python 3.x**
* **pip** (Python package installer)
* A free **API Key** from [The Movie Database (TMDb)](https://www.themoviedb.org/signup).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/](https://github.com/)[your-github-username]/[repository-name].git
    cd [repository-name]
    ```

2.  **Set up a Python virtual environment:**
    ```sh
    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install the required packages:**
    Create a file named `requirements.txt` in the root directory and add the following lines:
    ```txt
    Flask
    requests
    python-dotenv
    ```
    Then, install them using pip:
    ```sh
    pip install -r requirements.txt
    ```

4.  **Create an environment file:**
    Create a file named `.env` in the root directory and add your TMDb API key:
    ```env
    TMDB_API_KEY='YOUR_TMDB_API_KEY_HERE'
    ```

5.  **Run the Flask application:**
    ```sh
    flask run
    ```
    Or alternatively:
    ```sh
    python app.py
    ```

6.  Open your browser and navigate to `http://127.0.0.1:5000` or `http://localhost:5000`.

---

## 📂 Project Structure

Your project files should be organized as follows for the application to work correctly:

.
├── .env                  # Stores environment variables (API key)
├── app.py                # The main Flask application file
├── requirements.txt      # Python dependencies
├── static/
│   ├── script.js         # Frontend JavaScript logic
│   └── style.css         # All CSS styles
└── templates/
└── index.html        # The main HTML file


---

## 📖 Usage

Once the server is running, you can use the application:
1.  Use the dropdown menus to select your desired **Genre** and **Mood**.
2.  Choose how you want the results to be **sorted**.
3.  Click the **"Discover Movies"** button to fetch and display the results.
4.  Click on any movie poster to be taken to its official IMDb page.
5.  Use the pagination buttons at the bottom to navigate through more pages of results.

---

## 📜 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

## 📧 Contact

Your Name - `your.email@example.com`

Project Link: [https://github.com/[your-github-username]/[repository-name]](https://github.com/[your-github-username]/[repository-name])

---

## 🙏 Acknowledgements

* This project is powered by the [TMDb API](https://www.themoviedb.org/).
* Font used: [Poppins](https://fonts.google.com/specimen/Poppins) from Google Fonts.
* Inspiration from various movie discovery platforms.
