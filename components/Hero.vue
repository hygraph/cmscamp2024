<script setup lang="ts">
const props = defineProps([
  "headline",
  "description",
  "backgroundImage",
  "backgroundImageDarkness",
  "logoImage",
  "ctas",
  "small",
]);

const { imageProvider, cloudinaryBaseUrl } = useRuntimeConfig().public;
const provider = computed(() => {
  return imageProvider === "hygraph" ? "hygraph" : "cloudinary";
});

const bgImage = computed(() => {
  if (!props.backgroundImage) {
    return false;
  }

  return imageProvider === "cloudinary"
    ? `${cloudinaryBaseUrl}q_auto,f_auto/${
        props.small ? "w_1440,h_350" : "w_1440,h_732"
      },c_crop,g_auto/${props.backgroundImage.url}`
    : `${props.backgroundImage.image}`;
});
</script>

<template>
  <div
    :style="bgImage ? `background-image: url(${bgImage})` : ''"
    class="mb-10 text-light relative overflow-hidden bg-cover bg-center"
    :class="{
      'aspect-[390/240]': logoImage,
      'aspect-[390/673]': !logoImage,
      'md:aspect-[1440/350]': small,
      'md:aspect-[1440/732]': !small,
    }"
  >
    <div
      class="bg-black absolute top-0 left-0 w-full h-full"
      :style="`opacity: ${backgroundImageDarkness / 100}`"
    ></div>

    <NuxtImg
      v-if="logoImage"
      :provider="provider"
      :src="logoImage.url"
      class="absolute h-auto top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
      :class="small ? 'w-2/3 md:w-1/3' : 'w-2/3'"
      width="712"
      height="175"
      sizes="sm:220px md:500px lg:700px"
      :alt="headline || 'Hero'"
      fit="fit"
    />

    <div
      v-else
      class="p-6 sm:p-12 lg:max-w-screen-lg absolute lg:w-2/3 lg:h-auto top-2/4 lg:left-32 -translate-y-2/4"
    >
      <h1
        v-if="headline"
        class="text-4xl text-light mb-6 font-bold leading-none"
        :class="small ? 'lg:text-5xl' : 'lg:text-6xl'"
      >
        {{ headline }}
      </h1>
      <p v-if="description" class="text-light text-xl mb-6">
        {{ description }}
      </p>
      <div
        class="flex space-y-2 sm:space-x-2 sm:space-y-0 flex-col sm:flex-row"
      >
        <cta v-for="cta in ctas" :cta="cta" :key="cta.id" />
      </div>
    </div>
  </div>
</template>
