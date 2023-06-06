<script lang="ts">
  function login() {
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=1115564047048392754&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth&response_type=code&scope=identify`;
  }
</script>

<h1>Dictionnaire Dibi</h1>
<button on:click={() => login()}>Login</button>