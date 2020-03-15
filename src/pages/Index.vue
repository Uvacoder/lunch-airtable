<template>
  <Layout>

    <h1>Lunch Time!</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
    </p>

    <div class="bg-green-100 h-32 overflow-hidden w-full border-teal-500 border-2 relative">
      <ul class="slot-list absolute top-0 w-full" :class="{'running': isRunning}">
        <li class="flex items-center justify-center bg-white p-4 h-32">
          <h2 class="text-6xl font-bold leading-none text-teal-200 cursor-pointer" @click="selectRestaurant">What's for Lunch?</h2>
        </li>
        <li v-for="(r, index) in slots" :key="`${r.id}-${index}`" class="flex items-center justify-center bg-white p-4 h-32">
          <h2 class="text-6xl font-bold leading-none">{{ r.name }}</h2>
        </li>
      </ul>
    </div>

    <button @click="selectRestaurant">I'm Hungry</button>

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
    },
    slots() {
      return [...this.inflatedRestaurants, ...this.inflatedRestaurants]
    }
  },
  methods: {
    selectRestaurant() {
      const length = this.inflatedRestaurants.length
      const selected = Math.floor(Math.random() * (length - length*2 + 1) + length)
      this.isRunning = !this.isRunning
      return selected
    },
    runSlots() {
      const selected = selectRestaurant()
    }
  }
}
</script>

<style>
.slot-list {
  transition: 15s ease;
}
.running {
  transform: translateY(calc(-100% + 16rem));
}
</style>
