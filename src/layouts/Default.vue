<template>
  <div class="layout">
    <header class="header">
      <div @click="switchMode" class="text-gray-black dark:text-300 hover:text-gray-400 dark-hover:text-white">
        <IconBase v-if="isDarkMode" icon-name="sun" fill="none" stroke="currentColor"><IconSun/></IconBase>
        <IconBase v-else icon-name="moon" fill="none" stroke="currentColor"><IconMoon/></IconBase>
      </div>
    </header>
    <main>
      <slot/>
    </main>
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
      this.setMode()
    },
    setMode() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    switchMode() {
      this.isDarkMode = !this.isDarkMode
      this.setMode()
    },
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap");
:root {
  --primary: #5fb3b3;
  --primary-lightest: #9be2e2;
  --primary-light: #79c2c4;
  --primary-dark: #1a8384;
  --bg: #fff;
  --ink: #0f1c23;
  --ink-subtle: #343d46;
  --timing-l: 5s;
  --timing-s: 0.5s;
}
.dark {
  --primary: #1a8384;
  --primary-dark: #5fb3b3;
  --bg: #0f1c23;
  --ink: #fff;
  --ink-subtle: #c2c7d0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  background-color: var(--bg);
  color: var(--ink-subtle);
  font-family: "IBM Plex Sans", sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

main {
  box-sizing: content-box;
  max-width: 75ch;
  margin-left: auto;
  margin-right: auto;
  padding: max(1rem, 4vw);
}
main > * + * {
  margin-top: var(--spacer, 1.5em);
}

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
}
</style>
