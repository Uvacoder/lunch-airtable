<template>
  <div class="layout">
    <header class="header">
      <button @click="changeMode" aria-label="Color Mode Toggle" :aria-pressed="isDarkMode ? 'true' : 'false'" class="dark-toggle">
        <IconBase v-if="isDarkMode" icon-name="sun" fill="none" stroke="currentColor" width="24" height="24"><IconSun/></IconBase>
        <IconBase v-else icon-name="moon" fill="none" stroke="currentColor" width="24" height="24"><IconMoon/></IconBase>
      </button>
    </header>
    <main class="flow">
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
      isDarkMode: null,
    }
  },
  mounted() {
    this.isDarkMode = JSON.parse(localStorage.getItem('isDark', this.isDark))
  },
  methods: {
    changeMode() {
      this.isDarkMode = !this.isDarkMode
      if (this.isDarkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      localStorage.setItem('isDark', this.isDarkMode)
    },
  },
}
</script>

<style>
/* ---
 Layout
--- */
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
}
main {
  box-sizing: content-box;
  max-width: 75ch;
  margin-left: auto;
  margin-right: auto;
  padding: max(1rem, 4vw);
}

/* ---
 Dark Mode Toggle
--- */
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
