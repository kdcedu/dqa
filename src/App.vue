<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import menuIcon from './assets/menu-icon.svg'

const isSidebarOpen = ref(true)
const sidebarRef = ref(null)
const toggleButtonRef = ref(null)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleClickOutside = (event) => {
  if (isSidebarOpen.value && 
      sidebarRef.value && 
      !sidebarRef.value.contains(event.target) &&
      !toggleButtonRef.value.contains(event.target)) {
    isSidebarOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="app">
    <button @click="toggleSidebar" class="sidebar-toggle" ref="toggleButtonRef">
      <img :src="menuIcon" alt="Menu" class="menu-icon" />
    </button>
    
    <div class="sidebar" :class="{ 'sidebar-closed': !isSidebarOpen }" ref="sidebarRef">
      <div class="logo">
        <img src="./assets/vue.svg" alt="Logo" />
      </div>
      <nav class="menu">
        <RouterLink to="/" class="menu-item">
          Home
        </RouterLink>
        <RouterLink to="/assessment" class="menu-item">
          Assessment
        </RouterLink>
        <RouterLink to="/results" class="menu-item">
          Results
        </RouterLink>
      </nav>
    </div>
    
    <main class="main-content" :class="{ 'main-content-expanded': !isSidebarOpen }">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app {
  display: flex;
  min-height: 100vh;
  background-color: #2c3e50;
  color: #ffffff;
  position: relative;
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  width: 40px;
  height: 40px;
  padding: 0.5rem;
  background-color: #243342;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sidebar-toggle:hover {
  background-color: #2c3e50;
}

.menu-icon {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}

.sidebar {
  width: 250px;
  background-color: #243342;
  padding: 20px;
  transition: transform 0.3s ease;
}

.logo {
  margin-bottom: 30px;
  text-align: center;
}

.logo img {
  width: 100px;
  height: auto;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  color: #ffffff;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu-item:hover,
.menu-item.router-link-active {
  background-color: #2c3e50;
}

.main-content {
  flex: 1;
  padding: 2rem;
  transition: margin-left 0.3s ease;
}

@media (max-width: 768px) {
  .sidebar-toggle {
    display: block;
  }

  .sidebar {
    position: fixed;
    height: 100vh;
    z-index: 999;
  }

  .sidebar-closed {
    transform: translateX(-100%);
  }

  .main-content {
    margin-left: 0;
  }

  .main-content-expanded {
    margin-left: 0;
  }
}

@media (min-width: 769px) {
  .main-content {
    margin-left: 250px;
  }

  .main-content-expanded {
    margin-left: 0;
  }

  .sidebar-closed {
    transform: translateX(-100%);
  }
}
</style>
