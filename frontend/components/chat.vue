<template>
  <div>
    <div>
      <div v-if="chatTree.length" class="tw-bg-white tw-z-10 tw-py-8 tw-flex tw-justify-between tw-h-[80px] tw-bg-white tw-fixed tw-w-[766px] tw-top-0">
        <q-btn
          no-caps
          color="primary"
          @click="chatTree = []"
        >
          Новый чат
        </q-btn>
        <q-toggle
          v-model="isV2"
          label="Версия чата 2"
        />

      </div>
      <div class="tw-mx-10 tw-pt-10 tw-mb-12">
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
                src="~/assets/image_2024-04-11_12-23-05.png"
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
              src="~/assets/image_2024-04-11_12-23-05.png"
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
      <div v-else class="tw-text-xl tw-h-[100px] tw-py-5 tw-bg-white tw-fixed tw-w-[766px] tw-bottom-0">
        <q-input :disable="loading" @keydown.enter="sendMessage" rounded class="tw-bg-white tw-text-lg tw-z-10" outlined v-model="question" label="Спросите у ассистента">
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
import { format } from 'date-fns';
import { getAnswer, getAnswerV2 } from '~/shared/api/index.js';

const chatTree = ref([]);
const question = ref('');
const loading = ref(false);
const isV2 = ref(false);
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
      window.scrollTo(0, document.body.scrollHeight);

      question.value = '';
      chatTree.value.push(message);
      if (chatTree.value.length === 1) {
        loading.value = true;

        await new Promise((resolve) => {
          setTimeout(() => {
            const hello = {
              role: 'assistant',
              content: 'Здравствуйте! Меня зовут Рина. Сейчас я отвечу на ваш вопрос',
              date: new Date(),
            };
            chatTree.value.push(hello);
            resolve(true);
            loading.value = false;
          }, 3000);
        });
      }
      if (isV2.value) {
        getAnswerV2(req, chatHistory).then((answer) => {
          const responseMessage = {
            role: 'assistant',
            content: answer,
            date: new Date(),
          };
          loading.value = false;

          chatTree.value.push(responseMessage);
          chatHistory.push(message);
          chatHistory.push(responseMessage);
          window.scrollTo(0, document.body.scrollHeight);
        });
      } else {
        getAnswer(req, chatHistory).then((answer) => {
          const responseMessage = {
            role: 'assistant',
            content: answer,
            date: new Date(),
          };
          loading.value = false;

          chatTree.value.push(responseMessage);
          chatHistory.push(message);
          chatHistory.push(responseMessage);
          window.scrollTo(0, document.body.scrollHeight);
        });
      }
      await new Promise((resolve) => {
        setTimeout(() => {
          loading.value = true;
          resolve(true);
        }, 2000);
      });

      // const answer = await new Promise((resolve) => {
      //   setTimeout(() => {
      //     const data = 'Ответ';
      //     resolve(data);
      //   }, 2000);
      // });
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
