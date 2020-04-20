<template>
  <footer class="w-full bg-indigo-900">
    <div class="md:w-4/5 md:m-auto w-full flex flex-wrap">
      <div class="xl:w-1/4 md:w-1/2 w-full">
        <div class="p-8">
          <img src="@/assets/img/atium_mark_white@2x.png" class="h-32 m-auto" />
        </div>
      </div>
      <div class="xl:w-1/2 md:w-1/2 w-full">
        <div class="p-8">
          <p class="text-gray-300">
            This product is still in alpha. Feel free to play as many activities
            as you want.
          </p>
          <a href="https://atium.app" class="text-purple-300 font-bold"
            >Leave your email for product updates
            <img src="@/assets/img/chevron-right.svg" class="inline"
          /></a>
        </div>
      </div>
      <div class="xl:w-1/4 w-full">
        <div class="p-8">
          <ul>
            <li class="text-gray-300">© 2020 Atium B.V.</li>
            <li class="text-purple-300">support@atium.app</li>
            <!--<li>
              <a href class="text-purple-300">Privacy Policy</a>
            </li>
            <li>
              <a href class="text-purple-300">Terms of Use</a>
            </li>-->
          </ul>
        </div>
      </div>
    </div>
    <Cookie />
  </footer>
</template>
<script>
import Cookie from "./Cookie";

export default {
  name: "Footer",
  components: { Cookie }
};
</script>
