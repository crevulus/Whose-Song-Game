<template>
  <div>
    <h4 class="font-semibold">What is an app? And see who guessed what</h4>
    <ul>
      <li
        class="flex bg-white p-3 rounded-md items-center border-2"
        :class="{'border-transparent': !u.hasGuessed, 'border-red-500': !u.isCorrect, 'border-green-500': u.isCorrect}"
        v-for="u in users"
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
  props: ["users"]
};
</script>
<style>
</style>