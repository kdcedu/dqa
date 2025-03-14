<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentQuestion = ref(0);
const answers = ref([]);
const selectedLevel = ref(0);
const hoverLevel = ref(0);
const userName = ref('');
const showNameInput = ref(false);

const questions = [
  {
    id: 1,
    title: 'TÌM KIẾM',
    description: '1.1 Duyệt, tìm kiếm và lọc dữ liệu, thông tin và nội dung số.\nXác định được nhu cầu thông tin; tìm kiếm được dữ liệu, thông tin và nội dung trong môi trường số; truy cập chúng và khai thác được kết quả tìm kiếm. Tạo và cập nhật được chiến lực tìm kiếm.'
  },
  {
    id: 2,
    title: 'ĐÁNH GIÁ',
    description: '1.2 Đánh giá dữ liệu, thông tin và nội dung số.\nPhân tích, so sánh và đánh giá được độ tin cậy và tính xác thực của nguồn dữ liệu, thông tin và nội dung số. Phân tích, giải thích và đánh giá được dữ liệu, thông tin và nội dung số.'
  },
  {
    id: 3,
    title: 'QUẢN LÝ DỮ LIỆU',
    description: '1.3 Quản lý dữ liệu, thông tin và nội dung số.\nTổ chức, lưu trữ và truy xuất được dữ liệu, thông tin và nội dung trong môi trường số. Tổ chức và sắp xếp được chúng trong một môi trường có cấu trúc.'
  },
  {
    id: 4,
    title: 'TƯƠNG TÁC',
    description: '2.1 Tương tác thông qua công nghệ số.\nTương tác thông qua các công nghệ số khác nhau và nhận biết được phương tiện giao tiếp số nào phù hợp cho một bối cảnh cụ thể.'
  },
  {
    id: 5,
    title: 'CHIA SẺ',
    description: '2.2 Chia sẻ thông tin và nội dung thông qua công nghệ số.\nChia sẻ dữ liệu, thông tin và nội dung số với người khác thông qua các công nghệ số phù hợp. Đóng vai trò là người trung gian, hiểu biết về thực hành trích dẫn và ghi chú nguồn.'
  },
  {
    id: 6,
    title: 'TRÁCH NHIỆM CÔNG DÂN',
    description: '2.3 Sử dụng công nghệ số để thực hiện trách nhiệm công dân.\nTham gia đóng góp cho xã hội thông qua việc sử dụng các dịch vụ số công và tư. Tìm kiếm được cơ hội, để trao quyền và thu hút công dân thông qua các công nghệ số phù hợp.'
  }
];

const submitAnswer = (level) => {
  selectedLevel.value = level;
  answers.value.push({
    questionId: questions[currentQuestion.value].id,
    level: level
  });
  
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++;
    selectedLevel.value = 0;
  } else {
    showNameInput.value = true;
  }
};

const submitName = () => {
  if (!userName.value.trim()) return;
  
  router.push({
    path: '/results',
    query: { 
      answers: JSON.stringify(answers.value),
      name: userName.value,
      date: new Date().toISOString()
    }
  });
};
</script>

<template>
  <div class="assessment">
    <div class="content-frame">
      <template v-if="!showNameInput">
        <h1>{{ questions[currentQuestion].title }}</h1>
        
        <div class="question-container">
          <h2>Đọc mô tả và chọn mức độ thành thạo năng lực phù hợp nhất</h2>
          
          <div class="description">
            <p>{{ questions[currentQuestion].description }}</p>
          </div>
          
          <div class="rating">
            <button 
              v-for="level in 8" 
              :key="level"
              @click="submitAnswer(level)"
              @mouseover="hoverLevel = level"
              @mouseleave="hoverLevel = 0"
              :class="['rating-btn', { active: selectedLevel >= level || hoverLevel >= level }]"
            >
              ★
            </button>
          </div>
          
          <div class="rating-labels">
            <span>Mức độ thấp</span>
            <span>Mức độ cao</span>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="question-container name-input-container">
          <h1>HỌ TÊN</h1>
          <h2>Vui lòng nhập tên</h2>
          <div class="name-input-wrapper">
            <input 
              type="text" 
              v-model="userName"
              placeholder="Điền tên tại đây"
              @keyup.enter="submitName"
              class="name-input"
            >
          </div>
          <button 
            @click="submitName"
            class="continue-btn"
            :disabled="!userName.trim()"
          >
            TIẾP TỤC
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.assessment {
  max-width: 100%;
  margin: 0;
  padding: clamp(1rem, 2vw, 2rem);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
}

.content-frame {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: clamp(1rem, 3vw, 3.5rem);
  width: 100%;
  max-width: min(900px, 95%);
  margin: clamp(1rem, 2vw, 2rem);
}

h1 {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-align: center;
}

.question-container {
  text-align: center;
}

h2 {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  color: #ffffff;
  padding: 0 0.5rem;
}

.description {
  background-color: rgba(255, 255, 255, 0.05);
  padding: clamp(1.2rem, 2vw, 2rem);
  border-radius: 8px;
  margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem);
  text-align: left;
  width: 100%;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  box-sizing: border-box;
}

.description p {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  line-height: 1.6;
  white-space: pre-wrap;
  color: #a8b2bc;
  margin: 0;
  padding: 0;
}

.rating {
  display: flex;
  justify-content: center;
  gap: clamp(0.1rem, 0.3vw, 0.3rem);
  margin: clamp(1rem, 2vw, 2rem) 0;
  padding: clamp(0.25rem, 0.8vw, 0.8rem);
}

.rating-btn {
  font-size: clamp(2rem, 4vw, 3rem);
  color: rgba(255, 255, 255, 0.2);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease, transform 0.2s ease;
}

.rating-btn:focus {
  outline: none;
}

.rating-btn.active,
.rating-btn:hover {
  color: #42b883;
  transform: scale(1.1);
}

.rating-labels {
  display: flex;
  justify-content: space-between;
  color: #a8b2bc;
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  margin-top: 0.5rem;
  padding: 0 0.5rem;
}

.name-input-container {
  max-width: min(600px, 90%);
  margin: 0 auto;
  width: 100%;
  padding: clamp(0.5rem, 1vw, 1rem);
}

.name-input-container h2 {
  line-height: 1.5;
  margin: 1.5rem 0;
  width: 100%;
}
.name-input-wrapper {
  margin: clamp(1rem, 4vw, 2rem) 0;
}

.name-input {
  width: 80%;
  padding: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(1rem, 2vw, 1.2rem);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #ffffff;
}

.name-input:focus {
  outline: none;
  border-color: #42b883;
}

.continue-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.continue-btn:hover {
  background-color: #3aa876;
}

.continue-btn:disabled {
  background-color: rgba(66, 184, 131, 0.5);
  cursor: not-allowed;
}
</style>