<template>
  <Layout>
    <h1>
      It's lunch time
      <span v-if="selectedRestaurant">at {{ selectedRestaurant.name }}!</span>
    </h1>

    <p>
      Making decisions is hard, like really hard. So, if the team can't decide
      where to go to lunch then just let the lunch time slot machine do it. It's
      time for lunch, where are we going?
    </p>

    <div class="slot-machine">
      <ul class="slot-list" :class="{ running: isRunning }">
        <li
          v-for="(r, index) in slots"
          :key="`${r.id}-${index}`"
        >
          <p class="slot-text">
            {{ r.name }}
          </p>
        </li>
      </ul>
      <button v-if="!slots.length" class="slot-text starter" @click="runSlots">
        What's for Lunch?
      </button>
    </div>

    <button class="trigger" @click="runSlots" :disabled="isRunning">
      {{ actionText }}
    </button>
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
      actionText: "I'm Hungry",
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
        this.actionText = "Nah, Something Else";
        this.isRunning = false
      }, 5000)
    }
  }
}
</script>

<style>
h1 {
  color: var(--ink);
  font-size: 1.75rem;
  font-weight: 700;
}
.slot-machine {
  height: 8rem;
  overflow: hidden;
  border: 2px solid var(--primary);
  position: relative;
}
.slot-list {
  list-style: none;
  margin: 0;
  padding: 0;
  transition: 0s;
}
.slot-text {
  background: transparent;
  border: none;
  display: grid;
  font-size: clamp(1.75rem, 2.25vw + 1rem, 4rem);
  font-weight: 700;
  height: 8rem;
  margin: 0;
  place-content: center;
  padding: 0;
  text-align: center;
  width: 100%;
}
.running {
  transform: translateY(calc(-100% + 8rem));
  transition: var(--timing-l) cubic-bezier(0.19, 0.97, 0.5, 1.005);
}
.starter {
  color: var(--primary-light);
}
.trigger {
  background-color: var(--primary);
  backface-visibility: hidden;
  border: none;
  color: white;
  display: flex;
  font-size: 1.25rem;
  font-weight: 700;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  perspective: 10000px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform var(--timing-s);
  width: 15rem;
}
.trigger::before,
.trigger::after {
  background-color: var(--primary);
  backface-visibility: hidden;
  content: "";
  display: block;
  height: 1rem;
  position: absolute;
  top: 100%;
  transform: rotateX(-90deg);
  transform-origin: 50% 0%;
  width: 100%;
}
.trigger::after {
  background-color: var(--primary-dark);
  transform: rotateX(-90deg) scaleX(0);
  transition-delay: var(--timing-s);
}
.trigger:hover {
  background-color: var(--primary-dark);
}
.trigger:disabled {
  background-color: var(--primary-light);
  transform: rotateX(90deg);
}
.trigger:disabled::after {
  transform: rotateX(-90deg) scaleX(1);
  transform-origin: 0 0;
  transition: transform 4s linear var(--timing-s);
}
</style>
