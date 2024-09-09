<template>
    <div>
        <h3>{{ requeststate }}</h3>
    </div>
</template>
  
<script>

export default {
    methods: {
        async exchangeCodeForToken(code) {
            try {
                const response = await fetch('https://us-central1-landing-page-2b6f5.cloudfunctions.net/exchangeSpotifyToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code }),
                });
                const data = await response.json();

                window.localStorage.setItem('token', data.access_token);
                window.localStorage.setItem('token_expiration', Date.now());

                this.$router.push({ path: '/tracklistify'});
            
            } catch (error) {
                console.error('Error exchanging code for token:', error);
            }
        }
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        this.requeststate = "Processing Request...";

        if (code && state) {
            // You can now send the code to your backend to exchange for an access token
            console.log("Access token recieved");
            this.requeststate = "Authorization successful.";
            // Fetching authToken from Firebase
            this.exchangeCodeForToken(code);

        } else {
            // Handle error or missing parameters
            console.error('Authorization failed or was cancelled.');
            this.requeststate = "Authorization failed or was cancelled.";
        }
    }
}
</script>