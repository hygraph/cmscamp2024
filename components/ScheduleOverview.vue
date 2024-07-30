<script setup lang="ts">
defineProps(["title", "schedules"]);
</script>

<template>
  <div class="mb-10 px-6 2xl:px-0">
    <h3
      v-if="title"
      class="max-w-screen-md mx-auto text-center text-primary text-3xl font-light uppercase leading-[56px] tracking-wider mb-10"
    >
      {{ title }}
    </h3>
    <tabs>
      <tab v-for="day in schedules" :key="day.day" :name="day.day">
        <div class="grid-cols-2 px-4 leading-10 font-bold hidden sm:grid">
          <p>Time</p>
          <p>Slot</p>
        </div>
        <div
          v-for="slot in day.slots"
          :key="slot.time"
          class="sm:grid grid-cols-2 bg-zinc-100 mb-4 sm:leading-10 p-4 sm:py-0"
        >
          <p>{{ slot.time }}</p>
          <p class="font-bold">
            <nuxt-link
              v-if="slot.externalUrl || slot.relatedPage?.slug"
              :to="slot.externalUrl || slot.relatedPage?.slug"
              >{{ slot.slot }}</nuxt-link
            >
            <span v-else>{{ slot.slot }}</span>
          </p>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<style lang="postcss">
.tabs-component-tabs {
  @apply flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-2 mb-8;
}

.tabs-component-tab-a {
  @apply bg-opacity-30 text-primary border-opacity-30;
}

.tabs-component-tab-a.is-active {
  @apply bg-opacity-100 text-light;
}
</style>
