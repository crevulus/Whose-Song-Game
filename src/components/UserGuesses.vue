<template>
  <div>
    <h4 class="font-semibold">Shhh! The others are voting on your song</h4>
    <ul>
      <li
        class="flex bg-white p-3 rounded-md items-center border-2"
        :class="{'border-transparent': !u.hasGuessed, 'border-green-300': u.isCorrect, 'border-red-300': u.hasGuessed && !u.isCorrect}"
        v-for="u in users.filter(user => user.userId !== userId)"
        :key="u.name"
      >
        <p class="my-0 text-indigo-600">{{u.name}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "UserGuesses",
  props: ["users", "userId"]
};
</script>
<style>
</style>