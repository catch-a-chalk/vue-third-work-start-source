<template>
  <div class="container">
    <router-link class="link" to="/component-a">Component A</router-link>
    |
    <router-link class="link" to="/component-b">Component B</router-link>
    <transition
      name="view"
      appear
      enter-active-class="animate__animated animate__bounceInRight"
    >
      <router-view/>
    </transition>
  </div>
</template>

<style scoped>
    .container {
        margin: 20px;
    }

    .link {
        border-bottom: 1px solid #343838FF;
        color: #343838FF;
        padding-bottom: .25rem;
        text-decoration: none;
    }
</style>
