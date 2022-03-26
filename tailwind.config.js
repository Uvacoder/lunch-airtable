const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    darkSelector: 'dark-mode',
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-focus', 'dark-focus-within', 'dark-active'],
    borderColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-focus', 'dark-focus-within', 'dark-active'],
    textColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-focus', 'dark-focus-within', 'dark-active']
  },
  plugins: [
    plugin(function({ addVariant, theme, e }) {
      const darkSelector = theme('darkSelector');

      addVariant('dark', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.${darkSelector} .${e(`dark${separator}${className}`)}`
        })
      })

      addVariant('dark-hover', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.${darkSelector} .${e(`dark-hover${separator}${className}`)}:hover`
        })
      })

      addVariant('dark-focus', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.${darkSelector} .${e(`dark-focus${separator}${className}`)}:focus`
        })
      })

      addVariant('dark-active', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.${darkSelector} .${e(`dark-active${separator}${className}`)}:active`
        })
      })

      addVariant('dark-group-hover', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.${darkSelector} .group:hover .${e(`dark-group-hover${separator}${className}`)}`
        })
      })

      addVariant('dark-focus-within', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.${darkSelector} .${e(`dark-focus-within${separator}${className}`)}:focus-within`
        })
      })
    })
  ],
}
