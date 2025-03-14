<script setup>
</script>

<template>
  <div class="home">
    <div class="content-frame">
      <h1>Đánh giá năng lực số</h1>
      <div class="content">
        <p>Chào mừng bạn đến với công cụ Đánh giá năng lực số. Đánh giá này sẽ giúp đánh giá các kỹ năng số của bạn trên nhiều lĩnh vực năng lực khác nhau.</p>
        <button class="start-btn" @click="$router.push('/assessment')">Bắt đầu đánh giá!</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  align-items: top and center;
  justify-content: center;
}

.content-frame {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: clamp(1.5rem, 4vw, 3rem);
  width: 100%;
  max-width: 800px;
}

.content {
  margin-top: 2rem;
}

.start-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 2rem;
}

.start-btn:hover {
  background-color: #3aa876;
}
</style>