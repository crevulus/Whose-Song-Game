<template>
  <div>
    <h1 class="title">Search for your favourite song!</h1>
    <p class="warning-msg"><em>You might want to put on headphones or turn down your volume if you are on a call!</em></p>
    <SearchSong />
  </div>
</template>

<script>
import SearchSong from "@/components/SearchSong";

export default {
  components: { SearchSong }
};
</script>

<style>
h1 {
  @apply text-2xl;
  text-align: center;
}

.warning-msg {
  text-align: center;
}
</style>