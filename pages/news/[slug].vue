<script lang="ts" setup>
const route = useRoute();
const { slug } = route.params;
const page = await useGetContentForType({ slug: slug as string, type: "News" });
useOGTags(page);
</script>

<template>
  <RenderPage :data="page" />
</template>
