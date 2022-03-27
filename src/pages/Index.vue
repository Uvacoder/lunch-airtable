<template>
  <Layout>

    <h1>Lunch Time<span v-if="selectedRestaurant"> at {{ selectedRestaurant.name }}!</span></h1>

    <p class="mb-6">
      Makint decisions is hard. Like really hard. If the team can't decide where to lunch, just let the lunch time slot machine do it.
    </p>

    <div class="bg-green-100 h-32 overflow-hidden w-full border-teal-500 border-2 relative">
      <component is="ul" ref="slotz" class="slot-list absolute top-0 w-full" :class="{'running': isRunning}">
        <li v-for="(r, index) in slots" :key="`${r.id}-${index}`" class="flex items-center justify-center bg-white p-4 h-32">
          <p class="text-6xl font-bold leading-none">{{ r.name }}</p>
        </li>
      </component>
      <div v-if="!slots.length" class="flex items-center justify-center bg-white p-4 h-32 relative">
        <p class="text-6xl font-bold leading-none text-teal-200 cursor-pointer" @click="runSlots">What's for Lunch?</p>
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
      const lastSelected = this.selectedRestaurant
      let slotsArray = this.inflatedRestaurants
      if (lastSelected) slotsArray.splice(slotsArray.indexOf(lastSelected), 1)
      const length = slotsArray.length
      const selectedIndex = Math.floor(Math.random() * length + 1)
      const trimmedSlotsArray = slotsArray.slice(0, selectedIndex + 1)
      let scrollSlotsArray = [...slotsArray, ...slotsArray]
      if (lastSelected) scrollSlotsArray = [lastSelected, ...scrollSlotsArray]
      this.slots = [...scrollSlotsArray, ...trimmedSlotsArray]
      this.selectedRestaurant = null
      this.isRunning = true
      setTimeout(() => {
        this.selectedRestaurant = this.inflatedRestaurants[selectedIndex]
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
.running {
  transform: translateY(calc(-100% + 8rem));
  transition: 5s ease-out;
}
:disabled {
  background: #e1e3e8;
}
</style>
