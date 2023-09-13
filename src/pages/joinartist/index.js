import React from "react";
import _Form from "@/components/artistForm/form";

export default function JoinArtist() {
  return (
    <div className="page-wrapper">
      <section class="forms_section default_form_block artist_tattoo_form_block">
        <div class="container">
          <div class="full_block_wrap">
            <div class="form_block_left">
              <h1 class="page_title">
                Become an inckd. <br />
                Artist
              </h1>
              <div class="form_left_wrap">
                <section class="progress_block">
                  <ul class="progressbar">
                    <li class="active">
                      <h4>Submit the contact from</h4>
                      <p>Tell us more about yourself.</p>
                    </li>
                    <li>
                      <h4>Download the App & complete your profile</h4>
                      <p>Tell us more about yourself.</p>
                    </li>
                    <li>
                      <h4>Get verified & bring your Profile live</h4>
                      <p>Tell us more about yourself.</p>
                    </li>
                  </ul>
                </section>
              </div>
            </div>

            <div class="form_block_right">
              <_Form />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
