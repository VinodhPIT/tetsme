import React from "react";
import Image from "next/image";
import styles from "@/components/noDatafound/style.module.css";

export default function NoData({ category }) {
  return (
    <div>
      <Image src={"/searchIcon.svg"} alt="SearchIcon" width={30} height={30} />

      <h1 className={styles.title}>No data found</h1>
    </div>
  );
}
