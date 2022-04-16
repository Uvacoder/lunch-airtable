<template>
  <Layout>
    <h1>
      It's lunch time!
    </h1>

    <p class="description">
      Making decisions is hard, like really hard. So, if the team can't decide
      where to go to lunch then just let the lunch time slot machine do it. It's
      time for lunch, where are we going?
    </p>

    <div class="slot-machine">
      <ul class="slot-list" :class="{'running': isRunning}">
        <li
          v-for="(r, index) in slots"
          :key="`${r.id}-${index}`"
        >
          <p class="slot-text">
            {{ r.name }}
          </p>
        </li>
      </ul>
      <button v-if="selectedRestaurant && !decisionMade" class="select-btn" @click="handleDecision">
        Let's go here!
      </button>
      <button v-if="!slots.length" class="slot-text starter" @click="runSlots">
        What's for Lunch?
      </button>
    </div>

    <div class="selected-info">
      <p v-if="selectedRestaurant && selectedRestaurant.lastVisited">Visited: {{ selectedRestaurant.lastVisited }}</p>
      <ul v-if="selectedRestaurant && selectedRestaurant.foodTypes" role="list">
        <li v-for="style in selectedRestaurant.foodTypes">{{ style.name }}</li>
      </ul>
    </div>

    <button v-if="!decisionMade" class="trigger" @click="runSlots" :disabled="isRunning">
      {{ actionText }}
    </button>
    <div v-else class="flow restaurant-info">
      <h2>Wonderful</h2>
      <p>You're going to {{ selectedRestaurant.name }}! You should be proud of yourself for making a decision.</p>
      <a v-if="selectedRestaurant && selectedRestaurant.menuLink" :href="selectedRestaurant.menuLink" target="_blank">
        Check out the menu
      </a>
    </div>
  </Layout>
</template>

<page-query>
query LunchTime {
  restaurants: allRestaurants {
    edges {
      node {
        id
        name
        lastVisited(format: "MMMM DD, YYYY")
        menuLink
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
import JSConfetti from 'js-confetti'
let jsConfetti
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
      decisionMade: false,
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
          menuLink: it.node.menuLink,
          type: it.node.type,
          foodTypes: it.node.type.map(it => {
            return this.typeList.find(item => item.id === it)
          })
        }
      })
    }
  },
  mounted() {
    jsConfetti = new JSConfetti()
  },
  methods: {
    runSlots() {
      // clear the selected restaurant
      this.selectedRestaurant = null;
      // get the last item in past selections
      const lastSelected = this.pastSelections[this.pastSelections.length - 1];
      // filter out any items from the restaurant array that are in the past selections array
      let slotsArray = this.inflatedRestaurants.filter(it => !this.pastSelections.find(past => past.id === it.id));
      // get a random index from the slots array
      const selectedIndex = Math.floor(Math.random() * slotsArray.length);
      // get a version of the slots array trimmed to the selected restaurant
      const trimmedSlotsArray = slotsArray.slice(0, selectedIndex + 1);
      // build out the scrolling list
      let scrollSlotsArray = [...slotsArray, ...slotsArray];
      // if there is a last selected item, add it to the beginning of the list so the animation doesn't jump
      if (lastSelected) scrollSlotsArray = [lastSelected, ...scrollSlotsArray];
      // set the slots array for the UI
      this.slots = [...scrollSlotsArray, ...trimmedSlotsArray];
      // run the animation
      this.isRunning = true;
      // after the animation is done, set the selected restaurant, push to past selections, reset the slots array, and stop the animation
      setTimeout(() => {
        this.selectedRestaurant = slotsArray[selectedIndex];
        this.pastSelections.push(this.selectedRestaurant);
        this.slots = [this.selectedRestaurant];
        this.actionText = "Nah, Something Else";
        this.isRunning = false;
      }, 5000);
    },
    async handleDecision() {
      try {
        const today = new Date().toISOString().slice(0, 10);
        await fetch('/api/updateRestaurant', {
          method: 'PUT',
          body: JSON.stringify({ "id": this.selectedRestaurant.id, "Last Visited": today }),
        });
        this.decisionMade = true;
        this.throwConfetti();
      } catch (err) {
        console.error(err);
      }
    },
    throwConfetti() {
      jsConfetti.addConfetti({
        emojis: ['🍕', '🍔', '🌭', '🌮', '🥨', '🍟', '🥞', '🥦', '🍓', '🍉', '🥐', '🌶', '🍫', '🍩', '🧁', '🍭', '🍬', '🥩', '🧇', '🥖', '🧀', '🍗', '🥕', '🥑', '🍢', '🍡', '🍦', '🍰', '🍪', '🍎', '🍋', '🍒', '🍇', '🍍', '🍠', '🌽'],
        confettiNumber: 150,
      });
    }
  }
}
</script>

<style>
h1 {
  color: var(--ink);
  font-size: 2.5rem;
  font-weight: 700;
}
.description {
  --spacer: 0.5rem;
}
.slot-machine {
  --spacer: 3.5rem;
  box-sizing: content-box;
  height: 8rem;
  border: 2px solid var(--primary);
  overflow: hidden;
  position: relative;
}

.slot-list {
  list-style: none;
  margin: 0;
  padding: 0;
  transition: 0s;
  will-change: transform;
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
.starter:hover, .starter:focus-visible {
  background: hsl(182deg 39% 62% / 0.2);
  color: var(--primary-dark);
  outline-offset: -6px;
}
.trigger {
  --spacer: 1rem;
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

.select-btn {
  background-color: rgb(26 131 132 / 0.7);
  backdrop-filter: blur(4px);
  border: none;
  color: white;
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  inset: 0;
  margin: 0 auto;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  padding: 1rem;
  transition: opacity var(--timing-s);
  will-change: opacity;
}

@media screen and (max-width: 560px) {
  .select-btn {
    background-color: rgb(26 131 132 / 0.7);
    opacity: 1;
    padding: 0.325rem;
    top: auto;
  }
}

.slot-machine:hover .select-btn,
.select-btn:focus-visible {
  opacity: 1;
  pointer-events: auto;
}

.selected-info {
  --spacer: 0.5rem;
  color: var(--ink-3);
  display: flex;
  gap: 1.25rem;
  height: 30px;
}
.selected-info ul {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  margin-left: auto;
  padding: 0;
}
.selected-info li {
  background-color: var(--bg-subtle);
  border-radius: 0.325rem;
  padding: 0.125rem 0.325rem;
}

.restaurant-info {
  --spacer: 0.5rem;
}
</style>
