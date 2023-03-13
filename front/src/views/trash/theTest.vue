<template>
  <div>
    <b-form-group>
      <div class="d-flex align-items-center">
        <div class="d-flex mr-2 mr-lg-3 mt-2">
        hry  
        </div>
			<b-form-textarea
          :value="value"
          @input="updateValue"
          aria-label="Écrire une publication"></b-form-textarea>
		</div>
		<div>
		
			<img class="mt-3" v-if="url" :src="url" alt="" />
		</div>
		
		</b-form-group>
		<div class="line mb-3"></div>
		<b-form-group>
			<div class="d-flex justify-content-around">
        <button
          class="d-flex align-items-center justify-content-center create-button btn-block"
          @click="triggerInput"
          type="button"
          aria-label="Choisir un fichier"
        >
          <span class="mr-2 d-none d-md-block">Choisir un fichier</span>
          
        </button>
        <button type="submit" aria-label="Publier">
          Publier
        </button>
        <input
          ref="fileInput"
          
          type="file"
          
        />
      </div>
    </b-form-group>
  </div>
</template>

<script>


export default {
  name: 'PostForm',
  
  props: ['value', 'imgUrl', 'onFormSubmit', 'isCreating'],
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      url: this.imgUrl
    }
  },
  watch: {
    onFormSubmit () {
      this.url = null
    }
  },
  methods: {
    
    updateValue (value) {
      this.$emit('input', value)
    },
    triggerInput () {
      this.$refs.fileInput.click()
    }
  },
  computed: {
    emptyField () {
      return !this.value.trim().length && !this.url
    }
  }
}
</script>

<style lang="scss">
#preview img {
  max-width: 100%;
  max-height: 500px;
}
.disabled {
  cursor: not-allowed;
}
.form-control {
  border: 1px solid rgba(192, 192, 192, 0.5);
  &:focus {
    border: none;
  }
}
.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: rgba(192, 192, 192, 0.5);
}
.create-button {
  background: white;
  color: #747474;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  &:hover {
    background-color: rgba(108, 117, 125, 0.1);
  }
  &:active,
  &:focus {
    background-color: white !important;
    outline: none;
  }
}
</style>