import React from "react";
import { useDispatch } from "react-redux";

function useDispatchDebounce(callback: any, delay?: number) {
  const dispatch = useDispatch();
  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  const debouncedCallback = React.useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        dispatch(callback(...args));
      }, delay);
    },
    [callback, delay, dispatch]
  );

  return debouncedCallback;
}
export default useDispatchDebounce;
