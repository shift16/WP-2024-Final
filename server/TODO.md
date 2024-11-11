* Add logo to login page
* Add a page that allows you to create a new account
* Add the ability to create more users
* Add the ability to remove users
* Remove useTemplateRefs from the Vue components (replace them with v-model="blah") Whatever is in the v-model will be updated automatically by Vue without having to use useTemplateRefs() and reading the text in from the HTML
* Instead of using <template>s in EmbeddedCard and GoalCard, a goal or embedded card object can be sent to the GoalCard and EmbeddedCard in the construction (somehow?)
* Functions should never be called in the <template> tags in the Vue components