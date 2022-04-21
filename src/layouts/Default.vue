<template>
  <div class="layout">
    <header class="header">
      <button @click="switchMode" aria-label="Color Mode Toggle" :aria-pressed="isDarkMode ? 'true' : 'false'" class="dark-toggle">
        <IconBase v-if="isDarkMode" icon-name="sun" fill="none" stroke="currentColor" width="24" height="24"><IconSun/></IconBase>
        <IconBase v-else icon-name="moon" fill="none" stroke="currentColor" width="24" height="24"><IconMoon/></IconBase>
      </button>
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
  --secondary: #a78bfa;
  --error: #b3545e;
  --bg: #fff;
  --bg-subtle: #f4f6f9;
  --ink: #0f1c23;
  --ink-2: #343d46;
  --ink-3: #65737e;
  --timing-l: 5s;
  --timing-s: 0.5s;
}
.dark {
  --primary: #1a8384;
  --primary-dark: #5fb3b3;
  --secondary: #fac863;
  --error: #ed6f7d;
  --bg: #0f1c23;
  --bg-subtle: #1b2b34;
  --ink: #fff;
  --ink-2: #c2c7d0;
  --ink-3: #9bafbe;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  background-color: var(--bg);
  color: var(--ink-2);
  font-family: "IBM Plex Sans", sans-serif;
  font-size: clamp(1.13rem, calc(1.02rem + 0.52vw), 1.31rem);
  margin:0;
  padding:0;
  line-height: 1.5;
}

a:not([class]) {
  color: var(--primary-dark);
  text-decoration-color: var(--secondary);
  text-underline-offset: 0.25em;
}
a:not([class]):hover {
  text-decoration-style: wavy;
}

main {
  box-sizing: content-box;
  max-width: 75ch;
  margin-left: auto;
  margin-right: auto;
  padding: max(1rem, 4vw);
}
main > * + *, .flow > * + * {
  margin-top: var(--spacer, 1.5em);
}

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
}
button:focus-visible, a:focus-visible {
  outline-color: var(--primary);
  outline-offset: 0.25rem;
  outline-style: solid;
  outline-width: 2px;
}
.dark-toggle {
  align-items: center;
  background: none;
  border: none;
  color: var(--ink-3);
  display: flex;
  padding: 0.125rem;
}
.dark-toggle:hover {
  color: var(--ink);
}
</style>
