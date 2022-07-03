import { useCallback, useEffect } from "react";
import "./Toast.scss";
const useToast = () => {
  const toast = useCallback((msg = "Tính năng này chưa được phát triển") => {
    const toastList = document.querySelector(".toast-list");
    if (!!toastList.querySelector(".toast")) {
      const toast = toastList.querySelector(".toast");
      toastList.removeChild(toast);
    }
    toastList.innerHTML += `<div class="toast">
      <p class="toast-msg">${msg}</p>
      <span class="toast-close is-hover-dark">
        <i class="ic-close"></i>
      </span>
    </div>`;
    const toast = toastList.querySelector(".toast");
    const close = toast.querySelector(".toast-close");

    const slideOutTimeoutId = setTimeout(function () {
      toast.classList.add("slide-out");
    }, 4000);

    const closeToastTimeoutId = setTimeout(function () {
      toastList.removeChild(toast);
    }, 5000);
    close.onclick = () => {
      toastList.removeChild(toast);
      if (slideOutTimeoutId) {
        clearTimeout(slideOutTimeoutId);
      }
      if (closeToastTimeoutId) {
        clearTimeout(closeToastTimeoutId);
      }
    };
  }, []);
  return toast;
};

export default useToast;
