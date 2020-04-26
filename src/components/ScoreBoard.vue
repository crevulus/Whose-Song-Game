<template>
  <t-table :headers="headers" :data="users"></t-table>
</template>

<script>
export default {
  name: "ScoreBoard",
  props: ["users"],
  data() {
    const headers = [
      {
        value: "name",
        id: "name",
        text: "Name"
      },
      {
        value: "score",
        id: "score",
        text: "Score"
      },
      {
        value: "song.trackTitle",
        id: "song",
        text: "Song"
      },
      {
        value: "song.trackArtists",
        id: "artist",
        text: "Artist(s)"
      }
    ];
    return {
      headers: headers
    };
  }
};
</script>

<style>
</style>
