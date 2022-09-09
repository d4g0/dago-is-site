<template>
  <div class="min-h-screen max-w-[500px] mx-auto px-[30px] md:px-[0px]">
    <h1 class="font-extrabold text-4xl pt-[60px]">Hellow im dago</h1>
    <form ref="msg_form" @submit.prevent="onSubmit" class="mt-[30px]">
      <h2 class="font-medium text-2xl">Send me a message</h2>
      <div class="mt-[10px]">
        <label for="msg-inp" class="block sr-only">Message</label>
        <input
          type="text"
          id="msg-inp"
          v-model="msg"
          class="block w-full px-[20px] py-[16px] border rounded-xl"
          required
        />
      </div>
      <div class="mt-[30px]">
        <button
          :disabled="is_fetching ? true : false"
          class="border border-gray-800 px-[30px] py-[10px] rounded-xl"
        >
          Send
        </button>
      </div>
    </form>

    <div
      class="fixed bottom-0 left-0 w-full h-auto border-red-500 border-t-4 p-[30px] min-h-[200px] bg-red-100"
      v-if="fetch_error"
    >
      <code class="text-red-800">{{ fetch_error }}</code>
    </div>

    <div
      class="fixed bottom-0 left-0 w-full h-auto border-blue-500 border-t-4 p-[30px] min-h-[200px] bg-blue-100"
      v-if="form_sended"
    >
      <code class="text-blue-800">Message recived</code>
    </div>
  </div>
</template>

<script setup>
import { usePostQuery_with_throw } from "./composables/usePostQuery";
const msg_form = ref("");
const msg = ref("");
const form_sended = ref(false);
const fetch_error = ref(false);

const { is_fetching, load } = usePostQuery_with_throw();
async function onSubmit() {
  form_sended.value = false;
  fetch_error.value = false;
  const data = {
    message: msg.value,
  };
  try {
    const res = await load("/api/message", data);
    console.log({ res });
    form_sended.value = true;
  } catch (error) {
    is_fetching.value =
    console.error(error);
    fetch_error.value = error;
  }
}
</script>
