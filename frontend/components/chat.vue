<template>
  <div>
    <div>
      <div
          v-for="chat in chatTree"
          :key="chat"
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
    </div>
    <div v-if="!chatTree.length">
      <p class="tw-text-4xl tw-mb-5 tw-text-center tw-text-secondary">Здесь начинаются знания</p>
      <div class="q-pa-md tw-relative tw-border-[1px] tw-rounded tw-border-gray-400 focus-within:tw-ring-[1px] tw-ring-gray-400" style="min-width: 700px; max-height: 600px">
        <textarea
            class="tw-text-xl tw-w-full focus:tw-ring-0 "
            v-model="inputData"
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
      <q-input @keydown.enter="sendMessage" rounded class="tw-text-lg tw-fixed tw-w-[766px] tw-bottom-10 tw-p-3" outlined v-model="inputData" label="Спросите у ассистента">
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
</template>

<script setup>
import { mdiArrowRightBoldCircle } from '@mdi/js';

const chatTree = ref([]);
const inputData = ref('');

async function sendMessage() {
  try {
    const message = {
      role: 'user',
      content: `${inputData.value}`,
    };

    chatTree.value.push(message);
    inputData.value = '';

    const response = await chatCompletion(chatTree.value, 'gpt-3.5-turbo-0301');

    const responseMessage = {
      role: response[0].message.role,
      content: response[0].message.content,
    };

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

</style>
