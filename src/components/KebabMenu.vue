<template>
  <div @click="showMenu = true" v-click-outside="hide" class="relative">
    <img class="w-4 h-4" src="../assets/img/menu.svg" alt="menu" />

    <transition name="fade-shrink-in" appear>
      <div
        v-show="showMenu"
        class="absolute bg-white rounded shadow-mdTopBottom top-0 right-0 w-32 p-2"
      >
        <ul>
          <li @click="editExercise()" class="p-2">Edit</li>
          <li @click="deleteExercise()" class="p-2">Delete</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside
  },

  data() {
    return {
      showMenu: false
    };
  },

  methods: {
    hide() {
      this.showMenu = false;
    },

    editExercise() {
      this.showMenu = false;
      this.$emit('edit');
    },

    deleteExercise() {
      this.showMenu = false;
      this.$emit('delete');
    }
  }
};
</script>