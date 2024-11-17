"use client"
import { useEffect } from "react";

declare global {
  interface Window {
    kommunicate: any;
  }
}

export default function KommunicateChat() {
  useEffect(() => {
    (function(d, m){
        var kommunicateSettings = {
            "appId": "1a0458d64456839fc5e170ccd0fa2e33c",
            "popupWidget": true,
            "automaticChatOpenOnNavigation": true
        };
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return null;
} 