// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/style/style.css'
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.meta.push({
    key: 'og:title',
    name: 'og:title',
    content: `Lunch Time Slots`,
  })
  head.meta.push({
    key: 'og:url',
    name: 'og:url',
    content: `https://lunch-time.netlify.app`,
  })
  head.meta.push({
    key: 'og:description',
    name: 'og:description',
    content: `Lunch time Slot Machine for picking team lunches`,
  })
  head.meta.push({
    key: 'og:image',
    name: 'og:image',
    content: `https://lunch-time.netlify.app/lunchtime-og-img.jpg`,
  })

  head.meta.push({
    key: 'twitter:card',
    name: 'twitter:card',
    content: `summary_large_image`,
  })
  head.meta.push({
    key: 'twitter:title',
    name: 'twitter:title',
    content: `Lunch Time Slots`,
  })
  head.meta.push({
    key: 'twitter:description',
    name: 'twitter:description',
    content: `Lunch time Slot Machine for picking team lunches`,
  })
  head.meta.push({
    key: 'twitter:image',
    name: 'twitter:image',
    content: `https://lunch-time.netlify.app/lunchtime-og-img.jpg`,
  })
}
