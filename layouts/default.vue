<script setup lang="ts">
import Footer from '~/components/generics/Footer.vue'
import NavigationBar from '~/components/generics/NavigationBar.vue'
</script>

<template>
  <div class="w-full bg-[#1E232A] h-full">
    <NavigationBar />
    <slot />
    <Footer />
  </div>
</template>
