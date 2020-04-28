<template>
  <section>
    <button @click="$refs.modal.show()">
      <span class="border-dotted border-b-2 border-gray-500"
        >Rules
      </span>
    </button>
    <t-modal ref="modal"
      ><ul class="text-left">
        <li>Each player chooses a song they like. The songs are stored and will be used during the game.</li>
        <li>Each round one of the songs will appear on screen. Listen to it and choose which of your colleagues you think selected that song.</li>
        <li>You can only press "Confirm Selection" once, so be sure of your choice before you submit it!</li>
        <li>The rounds repeat until all players have made their choices.</li>
        <li>The host (the person who started the game) can skip any of the songs at any time by pressing "Skip song". You may want to do this if team mmbers are unexpectedly called away, for instance.</li>
        <li>You can also end the game at any time by pressing "End Game".</li>
      </ul>
    </t-modal>
  </section>
</template>
<script>
export default {
  name: "Rules"
};
</script>

<style>
li {
  margin-bottom: 0.9em;
}
</style>
