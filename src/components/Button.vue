<template>
  <button @click="$emit('click')" :class="btnClasses">
    <img v-if="isRounded || isIncrease" src="../assets/img/plus.svg" alt="add button" />
    <img v-else-if="isSquared && !isIncrease" src="../assets/img/minus.svg" alt="add button" />
    <span v-else-if="isText && isSave">Save</span>
    <span v-else>Close</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    isRounded: {
      type: Boolean,
      required: false
    },
    isSquared: {
      type: Boolean,
      required: false
    },
    isText: {
      type: Boolean,
      required: false
    },
    isIncrease: {
      type: Boolean,
      required: false
    },
    isSave: {
      type: Boolean,
      required: false
    },
    contentCentered: {
      type: Boolean,
      required: false
    }
  },

  computed: {
    btnClasses() {
      return {
        'fixed bottom-0 right-0 bg-red-600 hover:bg-red-700 rounded-full m-4': this
          .isRounded,
        'rounded ': this.isSquared,
        'text-sm font-semibold pt-3 px-3': this.isText,
        'flex justify-center items-center': this.contentCentered,
        'shadow w-12 h-12': this.isRounded || this.isSquared,
        'bg-blue-600': this.isIncrease && this.isSquared,
        'bg-gray-500': !this.isIncrease && this.isSquared
      };
    }
  }
};
</script>