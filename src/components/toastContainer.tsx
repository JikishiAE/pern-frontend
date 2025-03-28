import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store"
import { removeToast } from "../store/toast"
import { Toast } from "./toast.component";

export function ToastContainer() {
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  const dispatch = useDispatch();

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          action={toast.action}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  )
}
