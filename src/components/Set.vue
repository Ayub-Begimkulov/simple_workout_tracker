<template>
  <div @click="selected = !selected">
    <span
      :class="{ 'border-indigo-500' : this.selected, 'border-white' : !this.selected }"
      class="border-t border-b flex justify-between items-center p-2"
    >
      <span class="flex justify-between w-full md:w-1/2">
        <span>{{ weight }} kg/lbs</span>
        {{ reps }} reps
      </span>

      <div v-show="selected" class="flex items-center">
        <button @click="$emit('delete')" class="flex justify-center items-center h-4 ml-4">
          <img class="h-4" src="../assets/img/trash.svg" alt="edit" />
        </button>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: false
    };
  },

  props: ['weight', 'reps']
};
</script>