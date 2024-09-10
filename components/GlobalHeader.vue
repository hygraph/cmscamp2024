<script lang="ts" setup>
const { $preview } = useNuxtApp();
const stage = $preview ? "DRAFT" : "PUBLISHED";
const { navigation } = await GqlNavigation({ stage });

const navigationItems = computed(() => {
  return navigation?.navigationItem;
});

function getUrl(item: any) {
  if (!item) {
    return false;
  }

  if (item.externalLink) {
    return item.externalLink;
  } else {
    if (item.page && item.page.slug === "home") {
      return "/";
    } else {
      return item.page?.slug || "";
    }
  }
}

const open = ref(false);
const openSubNavs = ref<Set<string>>(new Set());

function toggle() {
  open.value = !open.value;
}

function toggleSubNav(itemId: string, event: Event) {
  event.preventDefault();
  event.stopPropagation();
  if (openSubNavs.value.has(itemId)) {
    openSubNavs.value.delete(itemId);
  } else {
    openSubNavs.value.add(itemId);
  }
}
</script>
<template>
  <header
    class="px-6 xl:px-0 h-[120px] md:h-[160]px md:items- flex justify-between py-10 items-center relative z-10"
  >
    <nuxt-link to="/" aria-label="Home" class="block w-[330px] h-[80px]">
      <Logo class="hidden md:block w-[331px] h-[81px]" />
      <LogoMobile class="md:hidden w-[108px] mt-2" />
    </nuxt-link>

    <div class="flex items-center xl:w-full xl:justify-between">
      <ul
        v-if="navigationItems"
        class="absolute top-[120px] justify-around xl:items-center	 text-center left-0 w-full z-20 bg-white xl:static xl:w-full xl:bg-none xl:flex xl:text-left"
        :class="{ hidden: !open }"
      >
        <li>
          <LogoWords class="xl:hidden w-[215px] h-[36px] mx-auto mb-2" />
        </li>
        <li v-for="item in navigationItems" :key="item.id" class="py-3 xl:py-0 relative">
          <div class="flex  items-center justify-center">
            <nuxt-link
              v-if="item?.page || item?.externalLink"
              :to="getUrl(item)"
              :target="item.externalLink ? '_blank' : '_self'"
              class="font-bold text-xl leading-7 tracking-wide inline-block"
              :class="item.highlighted ? 'cta xl:mr-2' : 'xl:mr-2'"
            >
              {{ item.label }}
            </nuxt-link>
            
            <button 
              v-if="item.nestedItems && item.nestedItems.length" 
              @click="toggleSubNav(item.id, $event)"
              class="px-2 py-1 text-xl focus:outline-none"
              :aria-expanded="openSubNavs.has(item.id)"
              aria-label="Toggle submenu"
            >
              <svg v-if="openSubNavs.has(item.id)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>
          </div>
          
          <!-- Nested items dropdown -->
          <ul v-if="item.nestedItems && item.nestedItems.length" 
              :class="{
                'hidden': !openSubNavs.has(item.id),
                'block': openSubNavs.has(item.id)
              }"
              class="mt-2 bg-white xl:shadow-md z-10 min-w-[200px] transition-all duration-300 ease-in-out xl:absolute xl:left-0 xl:top-full">
            <li v-for="nestedItem in item.nestedItems" :key="nestedItem.id" class="hover:bg-gray-100">
              <nuxt-link
                v-if="nestedItem?.page || nestedItem?.externalLink"
                :to="getUrl(nestedItem)"
                :target="nestedItem.externalLink ? '_blank' : '_self'"
                class="text-base leading-6 block w-full py-4 px-4 text-center xl:text-left"
                :class="nestedItem.highlighted ? 'font-bold' : ''"
              >
                {{ nestedItem.label }}
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
      <nuxt-link
        target="_blank"
        class="cta"
        v-if="navigation?.ticketsUrl"
        :to="navigation?.ticketsUrl"
      >
        {{ navigation?.ticketsLabel }}
      </nuxt-link>

      <button
        class="ml-8 nav-toggle relative w-16 h-[50px] bg-white xl:hidden transform transition duration-500 ease-in-out"
        :class="open ? 'open' : ''"
        @click="toggle()"
      >
        <span class="sr-only">Open main menu</span>
        <div class="block w-16 h-[50px]">
          <span
            class="line-1 translate-y-0 absolute block h-1 w-16 transform bg-primary transition duration-500 ease-in-out"
          ></span>
          <span
            class="line-2 translate-y-6 absolute block h-1 w-16 transform bg-primary transition duration-500 ease-in-out"
          ></span>
          <span
            class="line-3 translate-y-12 absolute block h-1 w-16 transform bg-primary transition duration-500 ease-in-out"
          ></span>
        </div>
      </button>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.nav-toggle.open {
  transform: translateY(18px);
}
.nav-toggle.open .line-1 {
  transform: rotate(45deg) translateY(0px);
}

.nav-toggle.open .line-2 {
  opacity: 0;
}

.nav-toggle.open .line-3 {
  transform: rotate(-45deg) translateY(0px);
}

a.router-link-active.router-link-exact-active {
  @apply !text-secondary !underline;
}
</style>
