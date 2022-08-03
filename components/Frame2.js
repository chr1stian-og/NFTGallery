import React from "react";
import { motion } from "framer-motion";

function Frame2() {
  return (
    <div className="flex flex-col min-w-[150px] bg-cyan-900 px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 hover:translate-y-[-4px]">
      <motion.button
        whileHover={{
          textShadow: "0px 0px 8px rgb(255, 255, 255)",
        }}
        className="rounded-lg text-xl justify-end z-10 flex"
        onClick={() => this.props.onDeleteImage(this.props.key)}
      >
        ...
      </motion.button>
      <img
        src={this.props.imageData}
        onClick={() => this.props.onImageClicked(this.props.imageData)}
        alt="Image"
        accept=".jpg, .pn, .jpeg"
        className="rounded-lg hover:opacity-95 max-w-[200px] sm:max-w-max duration-300"
      />
      <h5 className=" text-xl items-center font-bold align-center">Sand Dog</h5>
      <h5 className="text-sm font-thin">99,00 $</h5>
    </div>
  );
}

export default Frame2;
