// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
require('dotenv').config()

module.exports = {
  siteName: 'LunchTime',
  plugins: [
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY, // required
        baseId: process.env.AIRTABLE_BASE, // required
        tableName: 'Restaurants', // required
        typeName: 'Restaurants', // required
      },
    },
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY, // required
        baseId: process.env.AIRTABLE_BASE, // required
        tableName: 'Types', // required
        typeName: 'Types', // required
      },
    },
    {
      use: 'gridsome-plugin-tailwind',
        options: {
          config: './tailwind.config.js'
        }
    },
    {
      use: 'gridsome-plugin-purgecss',
      // default options, the following will be included if you don't provide anything
      options: {
        content: [
          './src/**/*.vue',
          './src/**/*.js',
          './src/**/*.md'
        ],
        whitelist: ['dark-mode'],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }
    }
  ],
}
