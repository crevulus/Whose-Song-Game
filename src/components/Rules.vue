<template>
  <section>
    <button @click="$refs.modal.show()">
      <span class="border-dotted border-b-2 border-gray-500"
        >Whose Song Rules
      </span>
    </button>
    <t-modal ref="modal"
      ><ul class="text-left">
        <li>ACTIVITY_RULES. One <strong>li</strong> element per line</li>
        <li v-for="(item) in 5" v-bind:key="item">
          This is the explanation for this game.
        </li>
      </ul>
    </t-modal>
  </section>
</template>
<script>
export default {
  name: "Rules"
};
</script>
