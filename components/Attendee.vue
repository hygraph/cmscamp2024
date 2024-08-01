<script setup lang="ts">
defineProps([
  "id",
  "attendee_name",
  "attendee_name_link",
  "attendee_role",
  "attendee_role_link",
  "attendee_company",
  "attendee_company_link",
  "itemsPerRow",
  "attendee_image",
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
      <NuxtImg
        v-if="attendee_image"
        :provider="provider"
        :src="attendee_image.url"
        :width="470"
        :height="470"
        sizes="sm:220px md:500px md:700px"
        :alt="attendee_name || ''"
        class="max-w-[470px] object-contain mb-2"
        loading="lazy"
        fit="thumbnail"
      />
      <p class="font-bold mb-4 text-2xl">
        <template v-if="attendee_name_link">
          <nuxt-link :to="attendee_name_link">{{ attendee_name }}</nuxt-link>
        </template>
        <template v-else>
          {{ attendee_name }}
        </template>
      </p>
      <p class="font-bold">
        <template v-if="attendee_company_link">
          <nuxt-link :to="attendee_company_link">{{
            attendee_company
          }}</nuxt-link>
        </template>
        <template v-else>
          {{ attendee_company }}
        </template>
      </p>
      <p>
        <template v-if="attendee_role_link">
          <nuxt-link :to="attendee_role_link">{{ attendee_role }}</nuxt-link>
        </template>
        <template v-else>
          {{ attendee_role }}
        </template>
      </p>
    </div>
  </template>
</template>
