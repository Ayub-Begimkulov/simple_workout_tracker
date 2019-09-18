<template>
  <div>
    <add-set-modal
      v-show="showAddSetModal"
      :open="showAddSetModal"
      @close="closeAddSetModal"
      @save="addNewSet"
    />

    <edit-exercise-modal
      v-if="exercise.title"
      v-show="showEditExerciseModal"
      :open="showEditExerciseModal"
      :exerciseName="exercise.title"
      @edit="editExercise"
      @close="showEditExerciseModal = false"
    />

    <Header v-if="exercise.title" :title="exercise.title">
      <kebab-menu @edit="showEditExerciseModal = true" @delete="deleteExercise" />
    </Header>

    <div class="container mx-auto px-2">
      <div
        class="bg-white shadow mb-4"
        v-for="training in trainingsWithSets"
        :key="training['.key']"
      >
        <div class="flex justify-between rounded-t p-3">
          <h3
            class="text-base font-bold"
          >{{ date(training.created_at.seconds, training.created_at.nanoseconds) }}</h3>

          <div>
            <button @click="openAddSetModal(training['.key'])" class="text-sm mr-4">Add Set</button>

            <button @click="deleteTraining(training['.key'])" class="text-sm">Delete</button>
          </div>
        </div>

        <ul class="rounded m-0 p-3">
          <li v-for="set in training.sets" :key="set['.key']" class="first:border-t border-b">
            <set @delete="deleteSet(set['.key'])" :weight="set.weight" :reps="set.reps" />
          </li>
        </ul>
      </div>

      <add-new-button @click="addNewTraining" />
    </div>
  </div>
</template>

<script>
import EditExerciseModal from '../components/EditExerciseModal';
import AddNewButton from '../components/AddNewButton';
import AddSetModal from '../components/AddSetModal';
import KebabMenu from '../components/KebabMenu';
import Header from '../components/Header';
import Set from '../components/Set';
import db from '../firebaseInit';

export default {
  name: 'Exercise',
  components: {
    EditExerciseModal,
    AddNewButton,
    AddSetModal,
    KebabMenu,
    Header,
    Set
  },

  data() {
    return {
      sets: [],
      trainings: [],
      showAddSetModal: false,
      showEditExerciseModal: false,
      trainingId: '',
      exercise: ''
    };
  },

  firestore() {
    return {
      exercise: db.collection('exercises').doc(this.$route.params.id),
      sets: db.collection('sets').orderBy('created_at'),
      trainings: db
        .collection('trainings')
        .where('exercise_id', '==', this.$route.params.id)
        .orderBy('created_at', 'desc')
    };
  },

  computed: {
    trainingsWithSets() {
      return this.trainings.filter(training => {
        const sets = this.sets.filter(set => {
          if (set.training_id == training['.key']) return set;
        });

        if (typeof sets[0] == 'undefined') training.sets = [];
        else training.sets = sets;

        return training;
      });
    }
  },

  methods: {
    editExercise(name) {
      db.collection('exercises')
        .doc(this.$route.params.id)
        .update({
          title: name
        });
      this.showEditExerciseModal = false;
    },

    async deleteExercise() {
      this.trainings.forEach(training => {
        this.deleteTraining(training['.key']);
      });
      await db
        .collection('exercises')
        .doc(this.$route.params.id)
        .delete();
      this.$router.push('/');
    },

    date(seconds, nanoseconds) {
      const date = new Date(seconds * 1000 + (nanoseconds % 1000000));
      const time =
        date.getDate() + ' ' + date.toLocaleString('en-us', { month: 'long' });
      return time;
    },

    addNewTraining() {
      db.collection('trainings').add({
        exercise_id: this.$route.params.id,
        created_at: new Date()
      });
    },

    deleteTraining(key) {
      db.collection('trainings')
        .doc(key)
        .delete();
      this.sets.forEach(set => {
        if (set.training_id === key)
          db.collection('sets')
            .doc(set['.key'])
            .delete();
      });
    },

    addNewSet(weight, reps) {
      db.collection('sets').add({
        weight: weight,
        reps: reps,
        training_id: this.trainingId,
        created_at: new Date()
      });
      this.closeAddSetModal();
    },

    deleteSet(key) {
      db.collection('sets')
        .doc(key)
        .delete();
    },

    openAddSetModal(key) {
      this.showAddSetModal = true;
      this.trainingId = key;
    },

    closeAddSetModal() {
      this.showAddSetModal = false;
      this.trainingId = '';
    }
  }
};
</script>