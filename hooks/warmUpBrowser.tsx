import React from "react";
import * as WebBrowser from "expo-web-browser";

export const usewarmUpBrowser = () => {
    React.useEffect(() => {
        void WebBrowser.warmUpAsync();
        return ()=> {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};