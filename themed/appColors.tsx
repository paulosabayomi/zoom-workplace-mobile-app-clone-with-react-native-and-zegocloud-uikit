import React from "react";
import { useColorScheme } from "react-native";
import colors from "./colors";

const useAppColor = () => {
    const colorMode = useColorScheme() || 'light';
    return colors[colorMode]
}

export default useAppColor