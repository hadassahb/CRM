import * as React from "react";
const drawerWidth = 250;

export default function hookie(navDrawerOpen, isSmallScreen){
    return {
        appBar: {
            position: "fixed",
            top: 0,
            overflow: "hidden",
            maxHeight: 58,
            minHeight: 0,
            width: navDrawerOpen && !isSmallScreen
                ? "calc(100% - " + drawerWidth + "px)"
                : "100%",
            marginLeft: navDrawerOpen && isSmallScreen ? drawerWidth : 0,
        },
        drawer: {
            width: isSmallScreen ? drawerWidth : 0,
            // flexShrink: 0,
            overflow: "auto",
        },
        content: {
            // margin: '10px 20px 20px 15px',
            flexGrow: 1,
            paddingLeft: navDrawerOpen && !isSmallScreen ? drawerWidth : 0,
        },
    };
};
