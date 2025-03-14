<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const results = ref([]);
const userName = ref('');
const assessmentDate = ref('');

onMounted(() => {
  const answersData = JSON.parse(route.query.answers || '[]');
  userName.value = route.query.name || 'Anonymous';
  assessmentDate.value = new Date(route.query.date).toLocaleDateString();
  results.value = processResults(answersData);
});

const competencyAreas = [
  {
    id: 'literacy',
    name: 'Khai thác dữ liệu và thông tin',
    questions: [1, 2, 3]
  },
  {
    id: 'communication',
    name: 'Giao tiếp và hợp tác trong môi trường số',
    questions: [4, 5, 6]
  }
];

const processResults = (answers) => {
  return competencyAreas.map(area => {
    const areaAnswers = area.questions.map(qId => {
      const answer = answers.find(a => a.questionId === qId);
      return answer ? answer.level : 0;
    });
    
    const average = areaAnswers.reduce((sum, score) => sum + score, 0) / area.questions.length;
    const percentage = Math.round((average / 8) * 100);
    
    return {
      area: area.name,
      percentage,
      score: average.toFixed(1),
      feedback: getFeedback(percentage)
    };
  });
};

const getFeedback = (percentage) => {
  if (percentage <= 12.5) return 'Ở trình độ cơ bản, có thể làm được khi có hướng dẫn chi tiết.';
  if (percentage <= 25) return 'Ở trình độ cơ bản, có thể tự chủ thao tác hoặc hướng dẫn khi cần.';
  if (percentage <= 37.5) return 'Có thể tự thực hiện với những vấn đề cơ bản.';
  if (percentage <= 50) return 'Có thể tự thực hiện dựa trên nhu cầu cá nhân và các vấn đề được xác định rõ ràng.';
  if (percentage <= 62.5) return 'Có thể tự thực hiện và hướng dẫn cho người khác giải quyết vấn đề cơ bản.';
  if (percentage <= 75) return 'Ở trình độ nâng cao, có thể tự thực hiện hoặc hướng dẫn người khác giải quyết vấn đề phức tạp.';
  if (percentage <= 87.5) return 'Ở trình độ chuyên sâu, có thể tự tạo ra giải pháp cho các vấn đề phức tạp.';
  return 'Ở trình độ chuyên sâu cao nhất, có thể đề xuất những ý tưởng, giải pháp mới để giải quyết vấn đề phức tạp.';
};
</script>

<template>
  <div class="results">
    <div class="content-frame">
      <div class="report-header">
        <h1>Các Miền Năng Lực Số</h1>
        <div class="report-meta">
          <div class="meta-item">
            <div class="meta-label">Họ Tên</div>
            <div class="meta-value">{{ userName }}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Ngày</div>
            <div class="meta-value">{{ assessmentDate }}</div>
          </div>
        </div>
      </div>
      
      <div class="results-container">
        <div 
          v-for="result in results" 
          :key="result.area"
          class="result-card"
        >
          <h2>{{ result.area }}</h2>
          <div class="score-display">
            <div class="score">{{ result.percentage }}%</div>
            <div class="score-bar">
              <div 
                class="score-fill"
                :style="{ width: `${result.percentage}%` }"
              ></div>
            </div>
          </div>
          <p class="feedback">{{ result.feedback }}</p>
        </div>
      </div>
      
      <button class="restart-btn" @click="$router.push('/')">Làm Lại</button>
    </div>
  </div>
</template>

<style scoped>
.results {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-frame {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: clamp(2rem, 4vw, 3.5rem);
  width: 100%;
  max-width: 900px;
}

.report-header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  color: #ffffff;
  margin-bottom: 1.5rem;
}

.report-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  text-align: center;
}

.meta-label {
  color: #a8b2bc;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.meta-value {
  color: #ffffff;
  font-size: 1.1rem;
}

.results-container {
  display: grid;
  gap: 1.5rem;
  margin: 2rem 0;
}

.result-card {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
}

.result-card h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.score-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.score {
  font-size: 1.5rem;
  color: #42b883;
  min-width: 60px;
}

.score-bar {
  flex: 1;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background-color: #42b883;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.feedback {
  color: #a8b2bc;
  font-size: 0.95rem;
  line-height: 1.4;
}

.restart-btn {
  display: block;
  width: fit-content;
  margin: 2rem auto 0;
  background-color: #42b883;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.restart-btn:hover {
  background-color: #3aa876;
}
</style>