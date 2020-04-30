<template>
  <t-table
    :headers="headers"
    :data="users"
    :thead-class="{
        thead: '',
        th: 'text-left text-gray-700 bg-transparent p-3'
      }"
    class="bg-gray-100"
    style="border-width: 0"
  >
    <template v-slot:row="props">
      <tr class="bg-purple-600 mb-2 text-white">
        <td :class="[props.tdClass, 'rounded-l-lg']">
          <strong>{{ props.row.name }}</strong>
        </td>

        <td :class="props.tdClass">
          <strong>{{ props.row.song.trackTitle }}</strong>
          <br />
          {{ props.row.song.trackArtists }}
        </td>
        <td :class="props.tdClass">
          <strong>{{ props.row.obscurity }}</strong>
        </td>
        <td :class="[props.tdClass, 'rounded-r-lg']">
          <strong>{{ props.row.score }}</strong>
        </td>
      </tr>
      <tr class="h-2">
        <!-- Row as a divider between the player cells-->
        <td></td>
        <td></td>
        <td></td>
        <td></td>
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
        text: `Participant`
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