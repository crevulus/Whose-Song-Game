<template>
  <div>
    <ul style="overflow-y: auto">
      <li
        class="flex bg-purple-600 p-3 rounded-md relative items-center border-transparent border-2"
        v-for="p in participants"
        :key="p.name"
      >
        <p class="m-0 text-white">{{p.name}}</p>
        <div
          class="rounded-full bg-white h-3 w-3 absolute"
          :class="{'hidden': !p.hasGuessed && songOwner !== p.userId}"
          style="top: 50%; right: 20px; transform: translateY(-50%)"
          v-if="showGuess"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Participants",
  props: ["participants", "hasGuessed", "isSongOwner", "songOwner"],
  computed: {
    showGuess() {
      if (!this.hasGuessed && !this.isSongOwner) {
        return false;
      }
      return true;
    }
  }
};
</script>
