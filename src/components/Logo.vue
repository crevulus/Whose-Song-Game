<template>
  <section>
    <router-link :to="{ name: 'home' }">
      <div class="flex">
        <div></div>

        <div
          class="bg-purple-300 text-white text-center rounded-lg m-auto items-center flex pr-6 pl-2 py-1 mb-8"
        >
          <img src="@/assets/img/atium_mark_white@2x.png" class="-mt-1 h-12" />
          <h2 class="text-3xl font-bold mb-0 leading-none">Whose Favourite Song is That?</h2>
        </div>
        <div></div>
      </div>
    </router-link>
  </section>
</template>
<style></style>
