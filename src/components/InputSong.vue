<template>
  <div>
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
</style>