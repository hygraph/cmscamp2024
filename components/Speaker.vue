<script setup lang="ts">
defineProps(["name", "url", "description", "image"]);

const { imageProvider } = useRuntimeConfig().public;
const provider = computed(() => {
  return imageProvider === "hygraph" ? "hygraph" : "cloudinary";
});
</script>

<template>
  <div class="mb-10">
    <nuxt-link :to="url">
      <NuxtImg
        v-if="image"
        :provider="provider"
        :src="image.url"
        :width="469"
        :height="469"
        sizes="sm:220px md:500px md:700px"
        :alt="name || ''"
        class="mb-4"
        fit="crop"
        loading="lazy"
      />
    </nuxt-link>
    <p class="font-bold text-xl mb-4" v-if="name">{{ name }}</p>
    <div v-if="description" v-html="description" />
  </div>
</template>
