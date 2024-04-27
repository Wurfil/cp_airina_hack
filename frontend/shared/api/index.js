import { useBaseFetch } from '~/composables/useBaseFetch.js';

export async function getAnswer(question) {
  const { data } = await useBaseFetch('/get-answer', {
    method: 'GET',
    params: question,
  });

  return data.value;
}
