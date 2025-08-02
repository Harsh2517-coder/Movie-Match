from flask import Flask, render_template, request, jsonify
import requests
from functools import lru_cache
import os

app = Flask(__name__)

# --- Configuration and API Functions ---
API_KEY = os.environ.get("992e439681dc5b48a5d39995302a08bb") # Reads from the environment

TMDB_API_URL = "https://api.themoviedb.org/3"
mood_genre_map = {
    "Happy": ["Comedy", "Family", "Adventure"], "Sad": ["Drama", "Romance"],
    "Romantic": ["Romance"], "Excited": ["Action", "Thriller"],
    "Scared": ["Horror", "Mystery"], "Thoughtful": ["Documentary", "Science Fiction"]
}

@lru_cache(maxsize=1)
def get_all_genres():
    if not API_KEY: return {}
    try:
        response = requests.get(f"{TMDB_API_URL}/genre/movie/list", params={"api_key": API_KEY})
        response.raise_for_status()
        genres = response.json().get("genres", [])
        return {genre["id"]: genre["name"] for genre in genres}
    except requests.RequestException:
        return {}

# --- Flask Routes ---
@app.route('/')
def index():
    all_genres_map = get_all_genres()
    genre_names = sorted(list(all_genres_map.values()))
    all_genres_options = ["Any"] + genre_names
    mood_options = ["Any"] + list(mood_genre_map.keys())
    return render_template('index.html', genres=all_genres_options, moods=mood_options)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    genre_name = data.get('genre')
    mood = data.get('mood')
    sort_by = data.get('sort_by', 'popularity.desc')
    page = data.get('page', 1)

    params = {"api_key": API_KEY, "page": page, "sort_by": sort_by}
    api_endpoint = f"{TMDB_API_URL}/discover/movie"
    
    genres_to_use = set()
    if genre_name != "Any":
        genres_to_use.add(genre_name)
    if mood != "Any" and mood in mood_genre_map:
        genres_to_use.update(mood_genre_map[mood])
    
    if genres_to_use:
        params['vote_count.gte'] = 100
        all_genres_map = get_all_genres()
        genre_id_map = {name: gid for gid, name in all_genres_map.items()}
        genre_ids = [str(genre_id_map.get(g)) for g in genres_to_use if g in genre_id_map]
        if genre_ids:
             params["with_genres"] = ",".join(genre_ids)
    else: # Default to now_playing if no filters are set
         api_endpoint = f"{TMDB_API_URL}/movie/now_playing"
         params.pop("sort_by", None)

    try:
        response = requests.get(api_endpoint, params=params)
        response.raise_for_status()
        api_response = response.json()
        # Directly return the results, no extra processing needed
        return jsonify({
            "movies": api_response.get("results", []),
            "total_pages": api_response.get("total_pages", 1),
            "current_page": page
        })
    except requests.RequestException:
        return jsonify({"movies": [], "total_pages": 1, "current_page": page})

if __name__ == '__main__':
    app.run(debug=True)
