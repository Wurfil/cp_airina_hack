import { useBaseFetch } from '~/composables/useBaseFetch.js';

export async function getAnswer(question, chat_history) {
  const { data } = await useBaseFetch('/get-answer', {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': 'none',
    },
    body: {
      question,
      chat_history,
    },
  });

  return data.value;
}
export async function getAnswerV2(question, chat_history) {
  const { data } = await useBaseFetch('/get-answer-v2', {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': 'none',
    },
    body: {
      question,
      chat_history,
    },
  });

  return data.value;
}
