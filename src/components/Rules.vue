<template>
  <section>
    <button @click="$refs.modal.show()">
      <span class="border-dotted border-b-2 border-gray-500"
        >ACTIVITY_NAME rules
      </span>
    </button>
    <t-modal ref="modal"
      ><ul class="text-left">
        <li>ACTIVITY_RULES. One <strong>li</strong> element per line</li>
        <li>Like this</li>
      </ul>
    </t-modal>
  </section>
</template>
<script>
export default {
  name: "Rules"
};
</script>
