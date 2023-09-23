import React ,{useState} from 'react'
import styles from "@/components/styles/listing.module.css";
import TattooSearchModalPopup from "@/components/modalPopup/TattooSearchModalPopup";



export default function Offer() {

  const [isPopupOpen, setPopupOpen] = useState(false);


  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className={styles.custom_adv_block_3}>
    <div className={styles.custom_adv_wrap}>
      <div className={styles.custom_adv_content}>
        <h6>Get exciting offers!</h6>
        <span className={styles.adv_price}>CHF 30</span>
        <p>off on your next tattoo</p>
        <span className={styles.adv_btn_wrap}>
          <a   onClick={openPopup}
                    target="_blank"   className={styles.btn_secondary}>
            Refer and Earn
          </a>
        </span>
        <img
          src="./shutterstock_2068639577-1.png"
          alt="Tattoo now Pay later"
        />
      </div>
    </div>

        <TattooSearchModalPopup
          className="custom-modal"
          isOpen={isPopupOpen}
          closeModal={closePopup}
        />


  </div>
  )
}
