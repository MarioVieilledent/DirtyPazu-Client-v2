<script lang="ts">
    function exchangeCodeForToken(code: string): Promise<Response> {
        const clientId = "YOUR_CLIENT_ID";
        const clientSecret = "YOUR_CLIENT_SECRET";
        const redirectUri = encodeURIComponent(
            "http://localhost:5000/auth/callback"
        );

        const tokenEndpoint = "https://discord.com/api/oauth2/token";
        const data = new URLSearchParams();
        data.append("client_id", clientId);
        data.append("client_secret", clientSecret);
        data.append("grant_type", "authorization_code");
        data.append("code", code);
        data.append("redirect_uri", redirectUri);

        return fetch(tokenEndpoint, {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                const accessToken = data.access_token;
                const refreshToken = data.refresh_token;
                // Handle access token and refresh token as needed
                return accessToken;
            });
    }

    // After receiving the callback with the authorization code
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
        exchangeCodeForToken(code)
            .then((accessToken) => {
                // Use the access token to make requests to the Discord API
                fetch("https://discord.com/api/v13/users/@me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then((response) => response.json())
                    .then((user) => {
                        const username = user.username;
                        const profilePicture = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
                        // Handle user information as needed
                    })
                    .catch((error) => {
                        // Handle error from fetching user information
                    });
            })
            .catch((error) => {
                // Handle error from exchanging code for access token
            });
    }
</script>
