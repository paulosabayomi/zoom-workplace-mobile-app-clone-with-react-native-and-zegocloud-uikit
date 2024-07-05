import React from "react";
import { View } from "react-native";
import { ITView } from "../shared/types";
import useAppColor from "./appColors";

export const TView = React.memo((props: ITView) => {
    const appColor = useAppColor()

    return (
        <View style={[props.isContainer && {backgroundColor: appColor.main_bg, flex: 1,}, props.style]}>
            {props.children}
        </View>
    )
})