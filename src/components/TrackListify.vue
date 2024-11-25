<template>
    <main>
        <pre class="title">{{ this.title }}</pre>
        
        <div v-if="!isLoggedIn()">
            <p>Ok so I made this thing to make playlists from text.</p>
            <p>Each letter in the text will be the first letter of a song's title.</p>
            <hr>
            <div style="max-width: fit-content;">
              <button class="login-button" @click="loginWithSpotify">Login with Spotify</button>
            </div>
        </div>

        <span class="card" v-if="this.userData && !this.loading && !this.playlistId">
            <div class="welcome">
                Hi
                <img class="profile-img" height="32" width="32" :src="this.imgSrc">
                  {{ this.username }}.
            </div>
            <p class="description">Select the genre of your playlist, type something and send it!</p>
            <select v-model="this.selectedGenre">
                <option value="" disabled selected>Genres</option>
                <option v-for="option in this.genres" :value="option">{{option}}</option>
            </select>
            <input class="userInput" maxlength="100" type="text" v-on:keyup.enter="submit" v-model="this.userText" placeholder="Type anything...">
            <button class="login-button" @click="submit">Tracklistify</button>
        </span>

        <span class="inthemiddle" v-if="this.loading">
            <h1>LOADING...</h1>
            <br>
            <img src="https://c.tenor.com/qiU8k19Bmr4AAAAj/cat-vibing-cat.gif" alt="">
            <br>
        </span>

        <span class="inthemiddle" v-if="this.playlistId">
            <h2>Here you go!</h2>
            <div class="playlistlink">
                <img style="vertical-align: middle;" height="150px" src="https://i.imgur.com/YCd4zBq.png">
                <a style="color:rgb(30, 215, 96) ;" :href="'https://open.spotify.com/playlist/'+this.playlistId" target="_blank">https://open.spotify.com/playlist/...</a>
            </div>
        </span>
        
        <button v-if="this.loading || this.playlistId" style="background-color: rgb(195, 76, 65);" class="inthemiddle login-button" @click="newplaylist()">Go Back</button>
    </main>
</template>
  
<script>
    export default {
        methods: {
            randomInt(max) {
                return Math.floor(Math.random() * max);
            },
            loginWithSpotify() {
                const client_id = '4fdb1905b11d41a98f93cb2174d065f9'; // 90eb9703676b439eb1481321bb9f9687
                const redirect_uri = 'https://matifema.com/tracklistify/callback'; // http://localhost:5173/tracklistify/callback
                const scope = 'user-read-private playlist-modify-public playlist-modify-private';
                const state = this.generateRandomString(16);

                const authUrl = `https://accounts.spotify.com/authorize?` + 
                                `response_type=code&` + 
                                `client_id=${encodeURIComponent(client_id)}&` + 
                                `scope=${encodeURIComponent(scope)}&` + 
                                `redirect_uri=${encodeURIComponent(redirect_uri)}&` + 
                                `state=${encodeURIComponent(state)}`;

                window.location.href = authUrl;
            },
            generateRandomString(length) {
                let text = '';
                const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                for (let i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            },
            newplaylist() {
                this.playlistId = null;
                this.loading = false;
            },
            isLoggedIn() {
                const token = this.getCookie('spotify_token');
                return token !== undefined && token !== null;
            },
            getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            },
            deleteCookie(name) {
                document.cookie = name + '=; Max-Age=-99999999; path=/';
            },
            async getUserData() {
                try {
                    const token = this.getCookie('spotify_token');
                    if (!token) {
                        console.error('No token found in cookies.');
                        return;
                    }
                    const response = await fetch('https://api.spotify.com/v1/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        }
                    });
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Failed to get user data:', error);
                }
            },
            async getUserGenres() {
                try {
                    const token = this.getCookie('spotify_token');
                    if (!token) {
                        console.error('No token found in cookies.');
                        return;
                    }
                    const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        }
                    });
                    const data = await response.json();
                    return data.genres;
                } catch (error) {
                    console.error('Failed to get genres data:', error);
                }
            },
            async getTrack(query) {
                const uri = '?q=' + query + '*&type=track&offset=' + this.randomInt(10) + '&limit=1';

                try {
                    const token = this.getCookie('spotify_token');
                    if (!token) {
                        console.error('No token found in cookies.');
                        return;
                    }
                    const response = await fetch('https://api.spotify.com/v1/search' + uri, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        }
                    });
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Failed to get track data:', error);
                }
            },
            async getTracksStartingWith(letter) {
                let query = `${letter}`;
                
                if (this.selectedGenre) {
                    query += ` genre:${encodeURIComponent(this.selectedGenre)}`;
                }
                
                const limit = 20;
                const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`;

                try {
                    const token = this.getCookie('spotify_token');
                    if (!token) {
                        console.error('No token found in cookies.');
                        return;
                    }
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer `+ token,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();

                    const filteredTracks = data.tracks.items.filter(track => {
                        return track.name.toLowerCase().startsWith(letter.toLowerCase()) && 
                            !this.trackIds.includes(track.id);
                    });

                    return filteredTracks;
                } catch (error) {
                    console.error('Error fetching tracks:', error);
                    return [];
                }
            },
            async getAllTracks() {
                const chars = Array.from(this.userText.replace(/\s/g,''));
                this.trackIds = [];

                const token = this.getCookie('spotify_token');
                if (!token) {
                    console.error('No token found in cookies.');
                    return;
                }
                for (const element of chars) {
                    try {
                        const response = await this.getTracksStartingWith(element);
                        if (response && response.length > 0) {
                            this.trackIds.push('spotify:track:' + response[this.randomInt(response.length)].id);
                        }
                    } catch (error) {
                        console.error(`Failed to fetch track for element ${element}:`, error);
                    }
                }

                console.log('All track URIs fetched:', this.trackIds);
            },
            async createPlaylist(name) {
                try {
                    const token = this.getCookie('spotify_token');
                    if (!token) {
                        console.error('No token found in cookies.');
                        return;
                    }
                    const response = await fetch('https://api.spotify.com/v1/users/' + this.userData.id + '/playlists', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "name": name,
                            "description": "Made with TrackListify by matifema.",
                            "public": false
                        }),
                    });
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error creating playlist:', error);
                }
            },
            async addTracksToPlaylist() {
                try {
                    const token = this.getCookie('spotify_token');
                    if (!token) {
                        console.error('No token found in cookies.');
                        return;
                    }
                    const response = await fetch('https://api.spotify.com/v1/playlists/' + this.playlistId + '/tracks', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            uris: this.trackIds,
                            position: 0
                        })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        console.log('Tracks added successfully:', data);
                    } else {
                        console.error('Error adding tracks:', data);
                    }
                    return data;
                } catch (error) {
                    console.error('Failed to add tracks to playlist:', error);
                }
            },  
            async submit() {
                this.loading = true;
                try {
                    if (this.userText.length === 0) {
                        console.error("Input text is empty");
                        return;
                    }

                    console.log('Fetching tracks based on user input...');
                    await this.getAllTracks();

                    if (!this.trackIds || this.trackIds.length === 0) {
                        console.error("No track IDs were found");
                        return;
                    }

                    console.log('Track IDs:', this.trackIds);

                    const first5Words = this.userText.split(' ').slice(0, 5).join(' ');

                    console.log('Creating playlist...');
                    const playlistResponse = await this.createPlaylist(first5Words + "...");
                    this.playlistId = playlistResponse.id;

                    if (!this.playlistId) {
                        console.error("Failed to create playlist");
                        return;
                    }

                    console.log('Playlist created with ID:', this.playlistId);

                    await this.addTracksToPlaylist();
                    console.log("DONE");
                } catch (error) {
                    console.error('An error occurred during tracklistify:', error);
                }
                this.loading = false;
            }

        },
        data() {
            return {
                userData: null,
                username: null,
                imgSrc: null,
                loading: false,
                playlistId: null,
                title:
`███████████                              █████      █████        ███           █████                ███     ██████            
░█░░░███░░░█                             ░░███      ░░███        ░░░           ░░███                ░░░     ███░░███           
░   ░███  ░  ████████   ██████    ██████  ░███ █████ ░███        ████   █████  ███████              ████   ░███ ░░░  █████ ████
    ░███    ░░███░░███ ░░░░░███  ███░░███ ░███░░███  ░███       ░░███  ███░░  ░░░███░    ██████████░░███  ███████   ░░███ ░███ 
    ░███     ░███ ░░░   ███████ ░███ ░░░  ░██████░   ░███        ░███ ░░█████   ░███    ░░░░░░░░░░  ░███ ░░░███░     ░███ ░███ 
    ░███     ░███      ███░░███ ░███  ███ ░███░░███  ░███      █ ░███  ░░░░███  ░███ ███            ░███   ░███      ░███ ░███ 
    █████    █████    ░░████████░░██████  ████ █████ ███████████ █████ ██████   ░░█████             █████  █████     ░░███████ 
   ░░░░░    ░░░░░      ░░░░░░░░  ░░░░░░  ░░░░ ░░░░░ ░░░░░░░░░░░ ░░░░░ ░░░░░░     ░░░░░             ░░░░░  ░░░░░       ░░░░░███ 
                                                                                                                      ███ ░███ 
                                                                                                                     ░░██████  
                                                                                                                      ░░░░░░`,
                userText: "",
                trackIds: [],
                genres: [],
                selectedGenre: null
            };
        },
        mounted() {
            const token = this.getCookie('spotify_token');

            if (token) {
                console.log("Token found in cookies!");

                this.getUserData().then((usrData) => {
                    this.userData = usrData;

                    if (usrData.display_name == "nadiafleur"){
                        this.username = "hotdog <3";
                    }else{
                        this.username = usrData.display_name;
                    }

                    if (usrData.images.length > 0) {
                        this.imgSrc = usrData.images[0].url;
                    }
                });

                this.getUserGenres().then((genres) => {
                    this.genres = genres;
                });

            } else {
                console.error("Token not found in cookies!");
                this.$router.push({ path: '/tracklistify' });
            }
        }
    }
</script>
<style scoped>
    .userInput{
        font-size: 1rem;
        margin: 20px;
    }
    .login-button {
        background-color: rgb(30, 215, 96);
        color: #000000;
        font-size: 16px;
        font-weight: bold;
        padding: 14px 30px;
        border: 0px;
        border-radius: 40px;
        cursor: pointer;
    }
    .welcome{
        font-size: 2rem;
        justify-content: center;
    }
    .description{
        font-size: 1rem;
    }
    .profile-img{
        border-radius: 40px;
        vertical-align: middle;
    }

    .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 300px;
        padding: 35px;

        border: 1px solid rgba(35, 35, 35, 0.25);
        border-radius: 20px;
        background-color: rgba(36, 36, 36, 0.45);
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

        backdrop-filter: blur(15px);
    }

    .title{
        font-size: 0.7rem;
    }

    .inthemiddle{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .playlistlink{
        justify-content: center;
    }
    @media (max-width: 500px) 
    {
        .title{
            font-size: 0.25rem;
        }
        .welcome{
            font-size: 1.5rem;
        }
    }
</style>