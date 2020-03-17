<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <div @click="switchMode" class="text-gray-500 hover:text-black dark-hover:text-white">
        <IconBase v-if="isDarkMode" icon-name="sun" fill="none" stroke="currentColor"><IconSun/></IconBase>
        <IconBase v-else icon-name="moon"><IconMoon/></IconBase>
      </div>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import IconBase from '~/components/IconBase.vue'
import IconMoon from '~/components/icons/IconMoon.vue'
import IconSun from '~/components/icons/IconSun.vue'

export default {
  components: {
    IconBase,
    IconMoon,
    IconSun,
  },
  data() {
    return {
      isDarkMode: false,
    }
  },
  mounted() {
    this.checkDarkMode()
  },
  methods: {
    checkDarkMode() {
      this.isDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      this.setDarkMode()
    },
    setDarkMode() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }
    },
    switchMode() {
      this.isDarkMode = !this.isDarkMode
      this.setDarkMode()
    },
  },
}
</script>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  color: theme('colors.gray.700');
  margin:0;
  padding:0;
  line-height: 1.5;
}
.dark-mode body{
  background: theme('colors.gray.900');
  color: theme('colors.gray.400');
}

.layout {
  max-width: 900px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
