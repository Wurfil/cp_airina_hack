<template>
  <div>
    <div>
      <div class="tw-text-xl tw-h-[100px] tw-py-5 tw-bg-white tw-fixed tw-w-[510px] tw-top-0 tw-z-10">
        <h1 class="tw-text-primary tw-text-center tw-text-2xl tw-mt-3 tw-font-bold">Альтподдержка</h1>

      </div>
      <div class="tw-my-12">
        <div
          v-for="chat in chatTree"
          :key="chat"

        >
          <q-chat-message
            v-if="chat.type === 'ai'"
            class="tw-text-base tw-pr-28 before:tw-content-none"
            bg-color="secondary"
            text-color="black"
          >
            <template v-slot:name>
              <p class="tw-text-sm tw-opacity-50 tw-mb-2">
                Альтушка
              </p>
            </template>
            <template v-slot:avatar>
              <img
                class="q-message-avatar q-message-avatar--sent tw-mr-4"
                src="~/assets/2d8f34884f7e83fac400bc4758243c45.jpg"
              >
            </template>
            <template #stamp>{{ chat.date ? format(new Date(chat.date), 'HH:mm') : '' }}</template>
            <p class="tw-p-1" v-html="chat.content.replace(/\n/g, '<br>')" />
          </q-chat-message>

          <q-chat-message
            v-else
            class="tw-text-base tw-pl-40 before:tw-content-none"
            bg-color="primary"
            text-color="white"
            sent
          >
            <template v-slot:name>
              <p class="tw-text-sm tw-opacity-50 tw-mb-2">
                Скуф
              </p>
            </template>
            <template v-slot:avatar>
              <img
                class="q-message-avatar q-message-avatar--sent"
                src="~/assets/h2I19IAcMkg.jpg"
              >
            </template>
            <template #stamp>{{ chat.date ? format(new Date(chat.date), 'HH:mm') : '' }}</template>

            <p class="tw-p-1">
              {{ chat.content }}
            </p>
          </q-chat-message>
        </div>
      </div>
      <div class="tw-text-xl tw-h-[100px] tw-py-5 tw-bg-white tw-fixed tw-w-[510px] tw-bottom-0">
        <q-input
          :disable="loading"
          @keydown.enter="sendMessage"
          class="tw-bg-white tw-text-lg tw-z-10"
          rounded
          outlined
          v-model="question"
          label="Спросите у ассистента">
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

const chatTree = ref([]);
const question = ref('');
const loading = ref(false);
const chatHistory = [];

async function sendMessage() {
  if (!loading.value) {
    try {
      const message = {
        type: 'human',
        content: `${question.value}`,
        date: new Date(),
      };

      question.value = '';
      chatTree.value.push(message);

      chatHistory.push(message);
      window.scrollTo(0, document.body.scrollHeight);

      const response = await fetch('http://10.0.24.81:8080/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            messages: chatHistory,
          },
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      const responseMessage = {
        type: 'ai',
        content: '',
        date: new Date(),
      };
      chatTree.value.push(responseMessage);

      reader.read().then(function processResult(result) {
        let token = decoder.decode(result.value);
        console.log(token.split('event: data\r\ndata: ')[1]);
        token = JSON.parse(token.split('event: data\r\ndata: ')[1]);

        if (token.content) {
          chatTree.value.at(-1).content += token.content;
          window.scrollTo(0, document.body.scrollHeight);
        }
        if (result.done) return;

        return reader.read().then(processResult);
      });
      chatHistory.push(chatTree.value.at(-1));
    } catch (error) {
      alert(`Join the waiting list if you want to use models: ${error}`);
    }
  }
}

</script>
<style>
.q-message-text:last-child:before{
  display: none;
}
.q-message-text--received{
  border-radius: 15px;

}
.q-message-text--sent{
  border-radius: 15px;
}
textarea {
  resize: none;
}

textarea:focus {
  outline: none;
}
</style>
