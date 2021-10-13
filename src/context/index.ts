import React from "react";

export const ThemeContext = React.createContext({
    user: {
        id:0,
        name: "",
    },
    title: "",
    setTitle: (s:string) => undefined,
    setUser: (s:{
        id:number;
        name:string;
    }) => undefined,
});
