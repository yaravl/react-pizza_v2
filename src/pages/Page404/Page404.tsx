import React from "react";
import styles from "./Page404.module.scss";

const Page404 = () => {
  return (
    <div className={styles.page404 + " container"}>
      <h1>Ничего не найдено {"-->"} 404...</h1>
    </div>
  );
};

export default Page404;
