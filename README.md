# MoovieyTimey

A Nuxt.js app using the TMDB API to create a simple web app for exploring movies.

---

## How to Run the Project

1. **Install Dependencies**
   Ensure you have **Bun** installed on your system. If you prefer not to use Bun, you can use any package manager of your choice. Simply install the dependencies using your chosen package manager.

2. **Get an API Key**
   Obtain an API key from [TMDB API Key](https://developer.themoviedb.org/login?redirect_uri=/reference/intro/authentication).
   This project uses **Access Token Authentication** instead of the standard API key, so make sure to acquire an **Access Token**.

3. **Update the Environment File**
   Update the `.env` file with your TMDB credentials.

4. **Run the Project**
   Using Bun:
   ```bash
   bun dev
or using any other package manager

    (your-package-manager) dev
