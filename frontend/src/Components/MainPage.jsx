import React from "react";
import { FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { CgSmileMouthOpen } from "react-icons/cg";

const MainPage = () => {
  return (
    <div className="w-full">
      <div className="container flex flex-col justify-between h-full">
        <div>
          <div className="headingbar flex items-center justify-between  py-2 border-b-4">
            <div className="flex items-center gap-3">
              <img src="./testimage.jpg" className="w-11 h-12 rounded-full" />
              <p>SARGAM</p>
            </div>
            <div className="callingOptions ">
              <div className="flex gap-3">
                <FaVideo />
                <IoCall />
                <BsThreeDotsVertical />
              </div>
            </div>
          </div>
          {/* this is for the main page */}
          <div className="mainpage">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">I love you </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="./testimage.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          </div>
        </div>

        {/* this is for the chat/text box section  */}
        <div className="textBoxsection">
          <div className="inputcontainer flex items-center w-full p-2 gap-2 border-2 border-gray-600  ">
            <CgSmileMouthOpen size={"30px"} />

            <input
              type="text"
              className=" h-9 p-3 w-full bg-[#1f2420] "
              placeholder="enter the text"
            />
            <IoSend size="25px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
