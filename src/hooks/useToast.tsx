import { useDispatch } from "react-redux"
import { ToastType } from "../utils"
import { addToast, removeToast } from "../store/toast"

export function useToast() {
  const dispatch = useDispatch()

  return {
    toast: (props: Omit<ToastType, "id">) => dispatch(addToast(props)),
    dismiss: (id: string) => dispatch(removeToast(id)),
  }
}
