import React, { useState } from "react";
import Header from "@/components/pageHeader/Header";
import { FAQ_ARTISTS, FAQ_GENERAL, FAQ_CUSTOMERS } from "@/constants/faq";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import Search from "@/components/tattooSearch/index";
import { faqTab } from "@/components/tabMenu/menu";
import style from "@/pages/search/search.module.css";
export default function FAQ() {
  const [state, setState] = useState("general");

  const changeTab = (id) => {
    setState(id);
  };

  return (
    <div>
      <Header
        logo={"/Inckd-logo-footer-black.svg"}
        theme={"white"}
        isPosition={false}
      />
      <div className="faq_search_wrap">
        <div className="container">
          <Search />
        </div>
      </div>

      <div className="faq_wrap">
        <div className="container"> 
          <h1>Find Answers to your questions</h1>
        </div>
        <div className="faq_tab_wrap">
          <div className="container"> 
            <div className="tabSection">
              <ul>
                {faqTab.map((tab) => (
                  <li
                    key={tab.id}
                    className={
                      state === tab.id ? 'activeTab' : 'inActivetab'
                    }
                    onClick={() => changeTab(tab.id)}
                  >
                    <div className={style.tabBox}>
                      <img src={state === tab.id ? tab.activeImage : tab.image} />
                      <p style={{ margin: "0" }}>{tab.label}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


        <div className="faq_accordion_wrap">
          <div className="container"> 
              {state==="general" ? 
              <Accordion>
                {FAQ_GENERAL.map((e) => {
                  return (
                    <>
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton>{e.summary}</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <p>{e.details}</p>
                        </AccordionItemPanel>
                      </AccordionItem>
                    </>
                  );
                })}
              </Accordion>
      : state=="artist" ? 
              <Accordion>
                {FAQ_ARTISTS.map((e) => {
                  return (
                    <>
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton>{e.summary}</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <p>{e.details}</p>
                        </AccordionItemPanel>
                      </AccordionItem>
                    </>
                  );
                })}
              </Accordion>
      :
              <Accordion>
                {FAQ_CUSTOMERS.map((e) => {
                  return (
                    <>
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton>{e.summary}</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <p>{e.details}</p>
                        </AccordionItemPanel>
                      </AccordionItem>
                    </>
                  );
                })} 
              </Accordion> }
          </div>
        </div>
      </div>
    </div>
  );
}
