<script setup lang="ts">
defineProps([
  "id",
  "name",
  "position",
  "company",
  "link",
  "itemsPerRow",
  "image",
]);

const { imageProvider } = useRuntimeConfig().public;
const provider = computed(() => {
  return imageProvider === "hygraph" ? "hygraph" : "cloudinary";
});
</script>

<template>
  <template
    v-if="
      itemsPerRow === 'two' || itemsPerRow === 'three' || itemsPerRow === 'four'
    "
  >
    <div class="mb-10">
      <nuxt-link :to="link" v-if="link">
        <NuxtImg
          v-if="image"
          :provider="provider"
          :src="image.url"
          :width="470"
          :height="470"
          sizes="sm:220px md:500px md:700px"
          :alt="name || ''"
          class="max-w-[470px] object-contain mb-2"
          loading="lazy"
          fit="thumbnail"
        />
        <p class="font-bold mb-4 text-2xl">{{ name }}</p>
        <p class="font-bold">{{ company }}</p>
        <p>{{ position }}</p>
      </nuxt-link>
    </div>
  </template>
</template>
