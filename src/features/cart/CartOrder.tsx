import React from "react";
import { clearCart } from "./cartSlice";
import { useAppDispatch } from "../../app/hooks";
import styles from "./CartOrder.module.scss";

const CartOrder: React.FC = () => {
  const dispatch = useAppDispatch();

  const [visible, setVisible] = React.useState<boolean>();
  const refOverlay = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    console.log(1);
    if (refOverlay.current) {
      document.addEventListener("click", handleClose);
    }
    return () => {
      document.removeEventListener("click", handleClose);
    };
  });

  const handleClose = (e: MouseEvent) => {
    if (e.target === refOverlay.current) {
      setVisible(false);
    }
  };

  const handleOrderComplete: React.MouseEventHandler = () => {
    dispatch(clearCart());
    setVisible(false);
  };

  return (
    <>
      <button onClick={() => setVisible(true)} className="button pay-btn">
        <span>Подтвердить заказ</span>
      </button>
      {visible && (
        <div ref={refOverlay} className={styles.overlay}>
          <div className={styles.content}>
            <button
              onClick={() => setVisible(false)}
              className={styles.content__close}
            >
              X
            </button>
            <h4 className={styles.content__title}>
              ПРИЯТНОГО АППЕТИТА! <br /> 🍕🍕🍕
            </h4>

            <button
              onClick={handleOrderComplete}
              className={styles.content__ok + " button"}
            >
              СПАСИБО
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartOrder;
