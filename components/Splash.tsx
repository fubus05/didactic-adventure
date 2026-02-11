"use client";

import React from "react";

const Splash = () => {
  React.useEffect(() => {
    const splash = document.getElementById("splash");

    if (document.readyState === "complete") {
      if (splash) splash.style.display = "none";
    } else {
      const onLoad = () => {
        if (splash) splash.style.display = "none";
      };
      window.addEventListener("load", onLoad);

      return () => {
        window.removeEventListener("load", onLoad);
      };
    }
  }, []);

  return null;
};

export default Splash;
