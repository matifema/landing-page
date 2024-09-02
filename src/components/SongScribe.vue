<template>
    <h1>Hey kid, want some playlists?</h1>
    <p>Ok so I made this thing to make playlists from text.</p>
    <p>Each word in the text will be a song's title.</p>
    <hr>
    <div style="max-width: fit-content;">
      <button class="login-button" @click="loginWithSpotify">Login with Spotify</button>
    </div>
</template>
  
<script>
    export default {
        methods: {
            loginWithSpotify() {
            const client_id = '4fdb1905b11d41a98f93cb2174d065f9'; // Replace with your Spotify client ID
            const redirect_uri = 'http://localhost:5173/songscribe/callback'; // Replace with your redirect URI
            const scope = 'user-read-private user-read-email';
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
            }
        }
    }
</script>

<style scoped>
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
</style>