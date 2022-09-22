import React from "react";
import { clearCart } from "./cartSlice";
import { useAppDispatch } from "../../app/hooks";
import styles from "./CartOrder.module.scss";
import { Modal, Portal } from "../../components";

const CartOrder: React.FC = () => {
  const dispatch = useAppDispatch();

  const [visible, setVisible] = React.useState<boolean>(false);

  const handleOrderComplete: React.MouseEventHandler = () => {
    dispatch(clearCart());
    setVisible(false);
  };

  return (
    <>
      <button onClick={() => setVisible(true)} className="button pay-btn">
        <span>Подтвердить заказ</span>
      </button>

      <Portal>
        <Modal isOpen={visible} onClose={() => setVisible(false)}>
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
        </Modal>
      </Portal>
    </>
  );
};

export default CartOrder;
