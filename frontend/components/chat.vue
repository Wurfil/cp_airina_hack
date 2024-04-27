<template>
  <div>
    <div>
      <div class="tw-h-[20px] tw-bg-white" />
      <div class="tw-mx-10">
        <div
          v-for="chat in chatTree"
          :key="chat"

        >
          <q-chat-message
            v-if="chat.role === 'assistant'"
            class="tw-text-base"
            bg-color="secondary"
            text-color="gray"
          >
            <template v-slot:name>
              <strong class="tw-text-base">
                Рина
              </strong>
            </template>
            <template v-slot:avatar>
              <img
                class="q-message-avatar q-message-avatar--sent tw-mr-2"
                src="~/assets/24884dd5-c6bc-4236-8d09-4646d6f36421.jfif"
              >
            </template>
            <template #stamp>{{chat.date ? format(new Date(chat.date), 'HH:mm') : ''}}</template>
            <p class="tw-py-1" v-html="chat.content.replace(/\n/g, '<br>')" />
          </q-chat-message>

          <q-chat-message
            v-else
            class="tw-text-base"
            bg-color="primary"
            text-color="white"
            sent
          >
            <template v-slot:name>
              <strong class="tw-text-base">Вы</strong>
            </template>
            <template #stamp>{{chat.date ? format(new Date(chat.date), 'HH:mm') : ''}}</template>

            <p class="tw-py-1">
              {{chat.content}}
            </p>
          </q-chat-message>
        </div>
        <q-chat-message
          v-if="loading"
          class="tw-text-base"
          bg-color="secondary"
          text-color="gray"
        >
          <template v-slot:name>
            <strong class="tw-text-base">
              Рина
            </strong>
          </template>
          <template v-slot:avatar>
            <img
              class="q-message-avatar q-message-avatar--sent tw-mr-2"
              src="~/assets/24884dd5-c6bc-4236-8d09-4646d6f36421.jfif"
            >
          </template>
          <div class="tw-py-1">
            <q-spinner-dots size="2rem" />
          </div>
        </q-chat-message>
      </div>
      <div v-if="!chatTree.length">
        <p class="tw-text-4xl tw-mb-5 tw-text-center tw-text-primary">Рады вам помочь</p>
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
      <div v-else class="tw-text-xl ">
        <q-input :disable="loading" @keydown.enter="sendMessage" rounded class="tw-bg-white tw-text-lg tw-fixed tw-w-[766px] tw-bottom-5 tw-z-10" outlined v-model="question" label="Спросите у ассистента">
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
import cloneDeep from 'lodash.clonedeep';
import { format } from 'date-fns';
import { getAnswer } from '~/shared/api/index.js';

const chatTree = ref([]);
const question = ref('');
const loading = ref(false);
const chatHistory = [];
async function sendMessage() {
  if (!loading.value) {
    try {
      const message = {
        role: 'user',
        content: `${question.value}`,
        date: new Date(),
      };
      const req = question.value;

      question.value = '';
      chatTree.value.push(message);
      if (chatTree.value.length === 1) {
        loading.value = true;

        await new Promise((resolve) => {
          setTimeout(() => {
            const hello = {
              role: 'assistant',
              content: 'Привет, меня зовут Рина. Сейчас я отвечу на ваш вопрос',
              date: new Date(),
            };
            chatTree.value.push(hello);
            resolve(true);
            loading.value = false;
          }, 3000);
        });
      }

      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((resolve) => {
        setTimeout(() => {
          loading.value = true;

          resolve(true);
        }, 2000);
      });

      // const answer = await getAnswer(req, chatHistory);

      const answer = await new Promise((resolve) => {
        setTimeout(() => {
          const data = 'Ответ';
          resolve(data);
        }, 2000);
      });
      const responseMessage = {
        role: 'assistant',
        content: answer,
        date: new Date(),
      };
      loading.value = false;

      chatTree.value.push(responseMessage);
      chatHistory.push(message);
      chatHistory.push(responseMessage);
    } catch (error) {
      alert(`Join the waiting list if you want to use models: ${error}`);
    }
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
</style>
