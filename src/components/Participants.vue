<template>
  <div>
    <ul>
      <li v-for="user in users"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Participants",
  props: ["users", "userId", "guesses", "currentSong"],
  computed: {
    participants() {
      return this.users.map(user => ({
        name: user.name,
        hasVoted: userHasVoted(user.userId)
      }));
    },
    hasVoted() {
      return this.userHasVoted(this.userId);
    },
    isSongOwner() {
      return this.userId === this.currentSong.userId;
    }
  },
  methods: {
    userHasVoted(userId) {
      return !!this.guesses.find(
        guess =>
          guess.userId === userId && guess.trackId === this.currentSong.trackId
      );
    }
  }
};
</script>