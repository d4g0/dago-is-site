// import { ref } from "vue";

export function usePostQuery() {
  const is_fetching = ref(false);
  const fetch_error = ref(false);
  async function load(url, data) {
    fetch_error.value = false;
    is_fetching.value = true;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(!res.ok){
        console.log({res})
        throw new Error(`(${res.status}) ${res.statusText} : ${res.url}`);
      }
      const result = await res.json();
      is_fetching.value = false;
      return result;
    } catch (error) {
      console.log(error)
      is_fetching.value = false;
      fetch_error.value = error;
    }
  }

  return {
    is_fetching,
    fetch_error,
    load,
  };
}

// export function usePostQuery() {
//   const is_fetching = ref(false);
//   const fetch_error = ref(false);
//   async function load(url, data) {
//     fetch_error.value = false;
//     is_fetching.value = true;
//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//     });

//     const result = await res.json();
//     is_fetching.value = false;
//     return result;
//   }

//   return {
//     is_fetching,
//     fetch_error,
//     load
//   };
// }
