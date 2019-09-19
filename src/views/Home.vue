<template>
  <div>
    <ExerciseModal
      v-if="showModal"
      :isEdit="true"
      :open="showModal"
      @save="addNewExercise"
      @close="showModal = false"
    />

    <Header :title="'Exercises'">
      <button class="text-sm flex items-center" @click="logout">
        <span class="text-sm mr-2">Log out</span>
        <img class="w-6 h-6" src="../assets/img/logout.svg" alt="logout" />
      </button>
    </Header>

    <div class="container mx-auto px-2">
      <draggable
        v-model="exercises"
        animation="300"
        ghost-class="ghost"
        @change="onEnd"
        handle=".handle"
      >
        <transition-group tag="ul" class="m-0 p-0" type="transition">
          <li
            class="bg-white flex justify-between shadow mb-2"
            v-for="exercise in exercises"
            :key="exercise['.key']"
          >
            <router-link
              class="no-underline text-black w-full p-3"
              :to="{ name: 'Exercise', params: { id: exercise['.key'] } }"
            >{{ exercise.title }}</router-link>

            <span v-if="exercises.length > 1" class="handle cursor-pointer flex items-center px-3">
              <img class="w-6 h-6" src="../assets/img/move.svg" alt="move" />
            </span>
          </li>
        </transition-group>
      </draggable>
      <Button @click="showModal = true" :isRounded="true" :contentCentered="true" />
    </div>
  </div>
</template>

<script>
import ExerciseModal from '../components/ExerciseModal';
import Button from '../components/Button';
import draggable from 'vuedraggable';
import { auth } from '../firebaseInit';
import Header from '../components/Header';
import db from '../firebaseInit';

export default {
  components: {
    ExerciseModal,
    Button,
    draggable,
    Header
  },

  data() {
    return {
      exercises: [],
      drag: false,
      showModal: false
    };
  },

  firestore() {
    return {
      exercises: db
        .collection('exercises')
        .where('user_id', '==', auth.currentUser.uid)
        .orderBy('order')
    };
  },

  methods: {
    logout() {
      auth.signOut().then(() => this.$router.push('/login'));
    },

    addNewExercise(title) {
      db.collection('exercises').add({
        title: title,
        user_id: auth.currentUser.uid,
        order: this.exercises.length
      });

      this.showModal = false;
    },

    onEnd(e) {
      if (e.moved) {
        const movedDown = e.moved.oldIndex < e.moved.newIndex;
        const start = movedDown ? e.moved.oldIndex : e.moved.newIndex;
        const end = movedDown ? e.moved.newIndex : e.moved.oldIndex;

        for (let i = start; i <= end; i++) {
          db.collection('exercises')
            .doc(this.exercises[i]['.key'])
            .update({
              order: i
            });
        }
      }
    }
  }
};
</script>
