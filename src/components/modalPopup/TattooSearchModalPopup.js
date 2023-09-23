import React from 'react';
import Modal from 'react-modal';
import style from './popup.module.css'
import Image from 'next/image';
// Make sure to set the app element to avoid accessibility issues.
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(6, 6, 6, 0.78)', // Adjust the opacity and color as needed
    zIndex: 1000, // Ensure the modal appears above other elements
  },
  content: {
    border: 'none', // Remove the default border
    background: 'transparent', // Make the modal background transparent
    maxWidth: '800px', // Adjust the modal width as needed
    margin: '0 auto', // Center the modal horizontally
    padding: '0px',
    top:'0',
    bottom: '0px',
    right:'0px',
    left: '0px',
    overflow: 'inherit',
    maxHeight: 'inherit',
    borderRadius: '8px'
  },
};
const TattooSearchModalPopup = ({ isOpen, closeModal }) => {
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Example Modal"
    style={customStyles} // Apply custom styles
    ariaHideApp={false} //
    >
      <div className='popup_wrap'>        
        <div className="popup_container">
          <div className="popup_box_inner">
          <button className="close_button" onClick={closeModal}>
            <img src="/popup-close.svg" alt="close"/>        
          </button>
            <div className="popup_left justify_content_center block_bg_orange">
              <img src="/mockup-iPhone-business.png" alt="Manage your business" className="w_auto max_w_100pc object_fit_contain object_position img_box_shadow" />
            </div>
            <div className="popup_right">        
              <div className="popup_right_content">
                <div className="popup_logo">
                  <img src="/Inckd-logo-black.svg" alt="Picture of the author"/>
                </div>
                <div className="popup_content_wrap">
                  <h2>Explore the <br/>Features in the App</h2>
                  <ul class="download_app">
                    <li class="download_app_title">
                      <h6>Download our app from</h6>
                    </li>
                    <li>
                      <a target="_blank" href="https://apps.apple.com/us/app/inckd/id1526690381">
                        <img src="/app-store.svg" alt="app store" />
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="https://play.google.com/store/apps/details?id=com.inckd.tattoo">
                        <img src="/g-play.svg" alt="google play" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Modal>
  );
};

export default TattooSearchModalPopup;
