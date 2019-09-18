<template>
  <div
    @click="selected = !selected"
    class="border-t border-b flex justify-between items-center p-2"
    :class="[ this.selected ? 'border-indigo-500' : 'border-white' ]"
  >
    <div class="flex justify-between w-full md:w-1/2">
      <div>{{ weight }} kg/lbs</div>
      {{ reps }} reps
    </div>

    <button
      v-show="selected"
      @click="$emit('delete')"
      class="flex justify-center items-center h-4 ml-4"
    >
      <img class="h-4" src="../assets/img/trash.svg" alt="delete set" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    weight: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selected: false
    };
  }
};
</script>