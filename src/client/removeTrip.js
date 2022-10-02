import { handleSubmit } from "./formHandler";

function remove() {
    document.getElementById('add-trip').removeEventListener('click', handleSubmit)
  }

export { remove };