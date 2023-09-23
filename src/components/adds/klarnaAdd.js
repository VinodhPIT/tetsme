import React from 'react'
import styles from "@/components/styles/listing.module.css";
import Link from 'next/link'

export default function KlarnaAdd() {
  return (
    <div className={styles.custom_adv_block_2}>
    <div className={styles.custom_adv_wrap}>
      <div className={styles.custom_adv_content}>

        <Link href={'/klarna'}>
    
        <img
          src="./klarna-b-19.svg"
          alt="Tattoo now Pay later"
          className={styles.adv_klarna}
        />    </Link>

        <h6>
          Tattoo now.
          <br />
          Pay later.
        </h6>
        <span className={styles.adv_btn_wrap}>
          <img
            src="./pngwing-39.png"
            alt="Tattoo now Pay later"
            className={styles.adv_img_app}
          />
          <img
            src="./pngwing-40.png"
            alt="Tattoo now Pay later"
            className={styles.adv_img_app}
          />
        </span>
        <img
          src="./shutterstock_2068639577.png"
          alt="Tattoo now Pay later"
        />
      </div>
    </div>
  </div>
  )
}
