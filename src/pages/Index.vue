<template>
  <Layout>

    <h1>Lunch Time<span v-if="selectedRestaurant"> at {{ selectedRestaurant.name }}!</span></h1>

    <p class="mb-6">
      Making decisions is hard. Like really hard. If the team can't decide where to lunch, just let the lunch time slot machine do it.
    </p>

    <div class="slot-machine h-32 overflow-hidden w-full border-teal-500 border-2 relative">
      <ul class="slot-list absolute top-0 w-full" :class="{'running': isRunning}">
        <li v-for="(r, index) in slots" :key="`${r.id}-${index}`" class="flex items-center justify-center p-4 h-32">
          <p class="slot-text font-bold leading-none text-center">{{ r.name }}</p>
        </li>
      </ul>
      <div v-if="!slots.length" class="flex items-center justify-center p-4 h-32 relative">
        <p class="slot-text font-bold leading-none text-teal-500 cursor-pointer" @click="runSlots">What's for Lunch?</p>
      </div>
    </div>

    <button @click="runSlots" :disabled="isRunning">I'm Hungry</button>

  </Layout>
</template>

<page-query>
query LunchTime {
  restaurants: allRestaurants {
    edges {
      node {
        id
        name
        lastVisited
        type
        foodType {
          id
          name
        }
      }
    }
  }
  types: allTypes {
    edges {
      node {
        id
        name
      }
    }
  }
}
</page-query>

<script>
export default {
  name: "Landing",
  metaInfo: {
    title: 'It\'s Lunch Time!'
  },
  data() {
    return {
      isRunning: false,
      selectedIndex: 0,
      selectedRestaurant: null,
      pastSelections: [],
      slots: [],
    }
  },
  computed: {
    typeList() {
      return this.$page.types.edges.map((it) => {
        return {
          id: it.node.id,
          name: it.node.name,
        }
      })
    },
    inflatedRestaurants() {
      return this.$page.restaurants.edges.map((it) => {
        return {
          id: it.node.id,
          name: it.node.name,
          lastVisited: it.node.lastVisited,
          type: it.node.type,
          foodTypes: it.node.type.map(it => {
            return this.typeList.find(item => item.id === it)
          })
        }
      })
    }
  },
  methods: {
    runSlots() {
      // clear the selected restaurant
      this.selectedRestaurant = null
      // get the last item in past selections
      const lastSelected = this.pastSelections[this.pastSelections.length - 1]
      // filter out any items from the restaurant array that are in the past selections array
      let slotsArray = this.inflatedRestaurants.filter(it => !this.pastSelections.find(past => past.id === it.id))
      // get a randowm index from the slots array
      const selectedIndex = Math.floor(Math.random() * slotsArray.length + 1)
      // get a version of the slots array trimmed to the selected restaurant
      const trimmedSlotsArray = slotsArray.slice(0, selectedIndex + 1)
      // build out the scrolling list
      let scrollSlotsArray = [...slotsArray, ...slotsArray]
      // if there is a last selected item, add it to the beginning of the list so the animation doesn't jump
      if (lastSelected) scrollSlotsArray = [lastSelected, ...scrollSlotsArray]
      // set the slots array for the UI
      this.slots = [...scrollSlotsArray, ...trimmedSlotsArray]
      // run the animation
      this.isRunning = true
      // after the animation is done, set the selected restaurant, push to past selections, reset the slots array, and stop the animation
      setTimeout(() => {
        this.selectedRestaurant = slotsArray[selectedIndex]
        this.pastSelections.push(this.selectedRestaurant)
        this.slots = [this.selectedRestaurant]
        this.isRunning = false
      }, 5000)
    }
  }
}
</script>

<style>
.slot-list {
  transition: 0s;
}
.slot-text {
  font-size: clamp(1.75rem, 2.25vw + 1rem, 4rem);
}
.running {
  transform: translateY(calc(-100% + 8rem));
  transition: 5s ease-out;
}
:disabled {
  background: theme('colors.gray.100');
}
.dark :disabled {
  background: theme('colors.gray.600');
  color: theme('colors.gray.200');
}
.dark .slot-machine {
  background: theme('colors.gray.800');
}
</style>
