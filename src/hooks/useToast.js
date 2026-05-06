import { useStore } from "../context/StoreContext";

export default function useToast() {
  const { addToast } = useStore();

  const showSuccess = (msg) => addToast(msg, "success");
  const showError = (msg) => addToast(msg, "error");
  const showInfo = (msg) => addToast(msg, "info");

  return { showSuccess, showError, showInfo, addToast };
}
