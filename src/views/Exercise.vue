<template>
	<div>
		<add-set-modal v-show="showAddSetModal" :open="showAddSetModal" @close="closeAddSetModal" @save="addNewSet"></add-set-modal>

		<edit-exercise-modal v-if="exercise.title" v-show="showEditExerciseModal" :open="showEditExerciseModal" :exerciseName="exercise.title" @edit="editExercise" @close="showEditExerciseModal = false"></edit-exercise-modal>

		<navbar :title="exercise.title">
			<kebab-menu
				@edit="showEditExerciseModal = true"
				@delete="deleteExercise"
			>
			</kebab-menu>
		</navbar>

		<div class="container mx-auto px-2">

			<div class="bg-white shadow mb-4" v-for="training in newTrainings" :key="training['.key']">
				<div class="flex justify-between rounded-t p-3">

					<h3 class="text-base font-bold">{{ date(training.created_at.seconds, training.created_at.nanoseconds) }}</h3>

					<div>
						<button
							@click="openAddSetModal(training['.key'])"
							class="text-sm mr-4"
						>
							Add Set
						</button>

						<button
							@click="deleteTraining(training['.key'])"
							class="text-sm"
						>
							Delete
						</button>
					</div>
				</div>

				<ul class="rounded m-0 p-3">
					<li v-for="set in training.sets" class="border-t-first border-b">
						<set @delete="deleteSet(set['.key'])" :weight="set.weight" :reps="set.reps"></set>
					</li>
				</ul>

			</div>

      <add-new-button @click.native="addNewTraining"></add-new-button>

		</div>

	</div>
</template>

<script>
	import EditExerciseModal from '../components/EditExerciseModal'
	import AddNewButton from '../components/AddNewButton'
	import ModalWrapper from '../components/ModalWrapper'
	import AddSetModal from '../components/AddSetModal'
	import KebabMenu from '../components/KebabMenu'
	import Navbar from '../components/Navbar'
  import db from '../firebaseInit'
	import Set from '../components/Set'

	export default{
		components: {
			EditExerciseModal,
			AddNewButton,
			ModalWrapper,
			AddSetModal,
			KebabMenu,
			Navbar,
			Set
		},

		data() {
			return {
				sets: [],
				trainings: [],
				showAddSetModal: false,
				showEditExerciseModal: false,
				trainingId: '',
				exercise: '',
	    }
		},

		firestore() {
      return {
      	exercise: db.collection('exercises').doc(this.$route.params.id),
        sets: db.collection('sets').orderBy('created_at'),
        trainings: db.collection('trainings').where('exercise_id', '==', this.$route.params.id).orderBy('created_at', 'desc')
      }
    },

		computed: {
			newTrainings() {
				return this.trainings.filter((training) => {
		  		let sets = this.sets.filter((set) => {
		  			if (set.training_id == training['.key']) return set
		  		})

		  		if (typeof sets[0] == 'undefined') training.sets = []
		  		else training.sets = sets

		  		return training
		  	})
			}
		},

		methods: {
			editExercise(name) {
				db.collection('exercises').doc(this.$route.params.id).update({
					title: name
				})
				this.showEditExerciseModal = false
			},

			deleteExercise() {
				this.trainings.forEach((training) => this.deleteTraining(training['.key']))
				db.collection('exercises').doc(this.$route.params.id).delete()
				setTimeout(() => {this.$router.push('/')}, 200)
			},

			date(seconds, nanoseconds) {
				let date = new Date(seconds * 1000 + nanoseconds % 1000000 )
				let time = date.getDate() + ' ' + date.toLocaleString('en-us', { month: 'long' })
				return time
			},

		  addNewTraining() {
		  	db.collection('trainings').add({
		  		exercise_id: this.$route.params.id,
		  		created_at: new Date(),
		  	})
		  },

		  deleteTraining(key) {
		  	db.collection('trainings').doc(key).delete()
		  	this.sets.forEach((set) => {
		  		if (set.training_id === key) db.collection('sets').doc(set['.key']).delete()
		  	})
		  },

		  addNewSet(weight, reps) {
		  	db.collection('sets').add({
		  		weight: weight,
		  		reps: reps,
		  		training_id: this.trainingId,
		  		created_at: new Date()
		  	})
		  	this.closeAddSetModal()
		  },

		  deleteSet(key) {
		  	db.collection('sets').doc(key).delete()
		  },

			openAddSetModal (key) {
		    this.showAddSetModal = true
		    this.trainingId = key
		  },

		  closeAddSetModal() {
		  	this.showAddSetModal = false
		  	this.trainingId = ''
		  }
		}
	}
</script>