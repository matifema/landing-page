<template>
    <main>
        <pre class="title">{{ this.title }}</pre>
        
        <div v-if="isLoggedIn()">
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
                <a style="color:rgb(30, 215, 96) ;" :href="'https://open.spotify.com/playlist/'+this.playlistId">https://open.spotify.com/playlist/...</a>
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
            const client_id = '4fdb1905b11d41a98f93cb2174d065f9'; //90eb9703676b439eb1481321bb9f9687 
            const redirect_uri = 'https://matifema.com/tracklistify/callback'; //http://localhost:5173/tracklistify/callback
            const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
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
                this.token = window.localStorage.getItem('token');
                return this.token == 'undefined';
            },
            async getUserData() {
                try {
                    const response = await fetch('https://api.spotify.com/v1/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
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
                    const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        }
                    });
                    const data = await response.json();
                    
                    return data.genres;
                } catch (error) {
                    console.error('Failed to get user data:', error);
                }
            },
            async getTrack(query) { 

                const uri = '?q=' + query + '*&type=track&offset=' + this.randomInt(10) + '&limit=1'

                try {
                    const response = await fetch('https://api.spotify.com/v1/search' + uri , {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        }
                    });
                    const data = await response.json();
                    
                    return data;
                } catch (error) {
                    console.error('Failed to get user data:', error);
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
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${this.token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    // Check if the response is successful (status 200-299)
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();

                    // Filter tracks that start with the letter and are not in this.trackIds
                    const filteredTracks = data.tracks.items.filter(track => {
                        return track.name.toLowerCase().startsWith(letter.toLowerCase()) && 
                            !this.trackIds.includes(track.id);  // Filter out tracks whose ID is in this.trackIds
                    });

                    return filteredTracks;
                } catch (error) {
                    console.error('Error fetching tracks:', error);
                    return []; // Return an empty array in case of an error
                }
            },
            async getAllTracks() {
                const chars = Array.from(this.userText.replace(/\s/g,''));
                this.trackIds = [];

                // Use `for...of` to allow `await` inside the loop
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
                    const response = await fetch('https://api.spotify.com/v1/users/' + this.userData.id + '/playlists', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
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
                    const response = await fetch('https://api.spotify.com/v1/playlists/' + this.playlistId + '/tracks', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            uris: this.trackIds,  // Ensure this is populated correctly
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
                    // 1. Ensure input text exists
                    if (this.userText.length === 0) {
                        console.error("Input text is empty!!!");
                        return;
                    }

                    // 2. Get tracks based on user input
                    console.log('Fetching tracks based on user input...');
                    const allTracks = await this.getAllTracks();

                    // Verify that `allTracks` has data and `this.trackIds` is populated correctly
                    if (!this.trackIds || this.trackIds.length === 0) {
                        console.error("No track IDs were found!");
                        return;
                    }

                    console.log('Track IDs:', this.trackIds);

                    // 3. Extract first 3 words of user input
                    const first3Words = this.userText.split(' ').slice(0, 3).join(' ');

                    // 4. Create a new playlist
                    console.log('Creating playlist...');
                    const playlistResponse = await this.createPlaylist(first3Words + "...");
                    this.playlistId = playlistResponse.id;

                    if (!this.playlistId) {
                        console.error("Failed to create playlist!");
                        return;
                    }

                    console.log('Playlist created with ID:', this.playlistId);

                    // 5. Add tracks to playlist
                    const addTracksResponse = await this.addTracksToPlaylist();
                    console.log('Tracks added to playlist response:', addTracksResponse);

                    // Handle success (optional)
                    console.log("DONE!!!!!!!!!!");
                    
                } catch (error) {
                    console.error('An error occurred during tracklistify:', error);
                }
                this.loading = false;
            }

        },
        data() {
            return {
                token: 'undefined', // the access token is stored here
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
            this.token = window.localStorage.getItem('token');
            
            console.log(this.token);

            const tokenExpiration = window.localStorage.getItem('token_expiration');
            const isTokenExpired = (Date.now() - tokenExpiration)/ (1000 * 60 * 60) > 1;
 
            if (this.token != 'undefined' && !isTokenExpired) {
                console.log("token found!");

                this.getUserData().then((usrData) =>{
                    
                    this.userData = usrData;
                    this.username = usrData.display_name;

                    if (this.username == "nadiafleur") {
                        this.username = "hotdog <3"
                    }
                    
                    if (usrData.images.length > 0) {
                        this.imgSrc = usrData.images[0].url;
                    }
                })


                this.getUserGenres().then((genres) =>{
                    this.genres = genres;
                })

            }else{
                // if not logged in, remove eventual previous playlists ids
                console.error("token not found!!");
                this.playlistId = null;

                window.localStorage.setItem('token', 'undefined');
                this.$router.push({ path: '/tracklistify'});
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

        border: 1px solid rgba(255, 255, 255, .25);
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.45);
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