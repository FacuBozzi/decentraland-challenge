import React from "react"
import { Toast } from "decentraland-ui"
import { useToast } from "@/hooks/use-toast"

export function ToastContainer() {
  const { toasts } = useToast()

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          body={toast.body}
          type={toast.variant}
          timeout={toast.timeout}
        />
      ))}
    </>
  )
}