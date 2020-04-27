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
        <td :class="props.tdClass">
          <strong>{{ props.row.song.trackTitle }}</strong>
          - {{ props.row.song.trackArtists }}
        </td>
        <td :class="props.tdClass">{{ props.row.obscurity }}</td>
        <td :class="props.tdClass">{{ props.row.score }}</td>
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
        value: "participant",
        id: "participant",
        text: "Participant"
      },
      {
        value: "song",
        id: "song",
        text: "Song"
      },
      {
        value: "obscurity",
        id: "obscurity",
        text: "Obscurity"
      },
      {
        value: "score",
        id: "familiarity",
        text: "Familiarity"
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
