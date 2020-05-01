<template>
  <section>
    <t-button variant="primary" v-clipboard:copy="url" v-clipboard:success="onCopy">
      <i class="far fa-share-square mr-2"></i>
      {{ copyLinkText }}
    </t-button>
  </section>
</template>
<script>
export default {
  name: "Share",
  props: ["activityInstanceId"],
  data() {
    return {
      copyLinkText: "Copy link"
    };
  },
  computed: {
    url() {
      const href = this.$router.resolve({
        name: "join",
        params: { activityInstanceId: this.activityInstanceId }
      }).href;
      const url = window.location.origin + "/" + href;
      return url;
    }
  },
  methods: {
    onCopy: function() {
      this.copyLinkText = "Copied!";
      setTimeout(() => {
        this.copyLinkText = "Copy link";
      }, 3000);
    }
  }
};
</script>
