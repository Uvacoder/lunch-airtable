// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/style/style.css'
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com/',
    crossOrigin: 'anonymous'
  })
  head.link.push({
    rel: 'preload',
    href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,700&display=swap',
    as: 'style',
    crossOrigin: 'anonymous'
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,700&display=swap',
    as: 'style',
    crossOrigin: 'anonymous'
  })

  head.meta.push({
    key: 'theme-color',
    name: 'theme-color',
    content: `#0f1c23`,
  })
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
