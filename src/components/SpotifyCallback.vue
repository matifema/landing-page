<template>
    <div>
      <h3>{{ requeststate }}</h3>
    </div>
  </template>
  
  <script>
  
  export default {
      created() {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get('code');
          const state = urlParams.get('state');
          this.requeststate = "Processing Request...";

          if (code && state) {
              // You can now send the code to your backend to exchange for an access token
              console.log(code);
              console.log(state);
              this.requeststate = "Authorization successful.";

            } else {
                // Handle error or missing parameters
                console.error('Authorization failed or was cancelled.');
                this.requeststate = "Authorization failed or was cancelled.";
            }
    }
  }
  </script>