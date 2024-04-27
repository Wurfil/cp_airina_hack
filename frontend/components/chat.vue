<template>
  <div class="">
    <div>
      <div
        v-for="chat in chatTree"
        :key="chat"
        class="tw-overflow-hidden tw-h-2/3"
      >
        <div
          v-if="chat.role === 'assistant'"
          class="tw-text-base tw-mb-10"
        >
          <div class="tw-flex tw-items-center tw-mb-2">
            <strong>Ассистент</strong>
          </div>
          <p v-html="chat.content" />
        </div>

        <div
          v-else
          class="tw-text-base tw-mb-10"
        >
          <strong>
            Вы
          </strong>
          <p>
            {{chat.content}}
          </p>
        </div>
      </div>
      <div
        v-if="loading"
        class="tw-text-base tw-mb-10"
      >
        <div class="tw-mb-2">
          <strong>Ассистент</strong>
          <div class="loading">
            <div class="circle" />
            <div class="circle" />
            <div class="circle" />
          </div>
        </div>
      </div>
      <div v-if="!chatTree.length">
        <p class="tw-text-4xl tw-mb-5 tw-text-center tw-text-secondary">Рады вам помочь</p>
        <div class="q-pa-md tw-relative tw-border-[1px] tw-rounded tw-border-gray-400 focus-within:tw-ring-[1px] tw-ring-gray-400" style="min-width: 700px; max-height: 600px">
          <textarea
            class="tw-text-xl tw-w-full focus:tw-ring-0 "
            v-model="question"
            rows="5"
            placeholder="Спросите что-нибудь..."
            @keydown.enter="sendMessage"
          />
          <div class="tw-flex tw-justify-between tw-align-middle">
            <div />
            <!--        <q-select outlined v-model="searchOptions" :options="options" dense>-->
            <!--          <template v-slot:prepend>-->
            <!--            <q-icon-->
            <!--              class="hover:tw-cursor-pointer"-->
            <!--              size="sm"-->
            <!--              :name="mdiFilterVariant"-->
            <!--            />-->
            <!--          </template>-->
            <!--        </q-select>-->

            <q-icon
              @click="sendMessage"
              class="hover:tw-cursor-pointer"
              color="primary"
              size="md"
              :name="mdiArrowRightBoldCircle"
            />
          </div>
        </div>
      </div>
      <div v-else class="tw-text-xl">
        <q-input @keydown.enter="sendMessage" rounded class="tw-text-lg tw-fixed tw-w-[766px] tw-bottom-10 tw-p-3 tw-z-10" outlined v-model="question" label="Спросите у ассистента">
          <template #append>
            <q-icon
              class="hover:tw-cursor-pointer"
              color="primary"
              size="md"
              @click="sendMessage"
              :name="mdiArrowRightBoldCircle"
            />
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mdiArrowRightBoldCircle } from '@mdi/js';
import { getAnswer } from '~/shared/api/index.js';

const chatTree = ref([]);
const question = ref('');
const loading = ref(false);
async function sendMessage() {
  try {
    const message = {
      role: 'user',
      content: `${question.value}`,
    };

    chatTree.value.push(message);
    question.value = '';
    loading.value = true;
    // const answer = await getAnswer(question);
    const answer = await new Promise((resolve) => {
      setTimeout(() => {
        const data = 'Ответ';
        resolve(data);
      }, 2000);
    });
    const responseMessage = {
      role: 'assistant',
      content: answer,
    };
    loading.value = false;

    chatTree.value.push(responseMessage);
  } catch (error) {
    alert(`Join the waiting list if you want to use GPT-4 models: ${error}`);
  }
}

</script>
<style scoped>
textarea {
  resize: none;
}
textarea:focus{
  outline: none;
}
.loading {
  display: flex;
  align-itens: center;
  margin-top: 40px;
  gap: 5px;
}

.circle {
  background-color: #c5cace;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  position: relative;
  animation-name: jump;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

.circle:nth-child(2) {
  animation-delay: 0.1s;
}

.circle:nth-child(3) {
  animation-delay: 0.3s;
}

.circle:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes jump {
  0% {
    top: 0rem;
    background-color: #13343b;
  }

  25% {
    top: -0.5rem;
    background-color: #ccc;
  }

  50% {
    top: 0rem;
    background-color: #13343b;
  }

  75% {
    top: -0.8rem;
    background-color: #ccc;
  }

  100% {
    top: 0rem;
    background-color: #13343b;
  }
}
</style>
