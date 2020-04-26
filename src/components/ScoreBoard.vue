<template>
  <t-table :headers="headers" :data="users">
    <template v-slot:row="props">
      <tr
        :class="[
            props.trClass,
            props.rowIndex % 2 === 0 ? 'bg-gray-100' : ''
          ]"
      >
        <td :class="props.tdClass">{{ props.row.name }}</td>
        <td :class="props.tdClass">{{ props.row.score }}</td>
        <td :class="props.tdClass">
          <strong>{{ props.row.song.trackTitle }}</strong>
          - {{ props.row.song.trackArtists }}
        </td>
      </tr>
    </template>
  </t-table>
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
        value: "song",
        id: "song",
        text: "Song"
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
