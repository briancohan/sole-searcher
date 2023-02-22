tw:
    npx tailwindcss -i ./src/static/css/input.css -o ./src/static/css/style.css --watch

serve:
    python3 -m http.server --bind 0.0.0.0 --directory ./src
