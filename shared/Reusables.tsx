import React from "react";
import { Text, View } from "react-native";
import { IListItemProp } from "./types";
import useAppColor from "../themed/appColors";

export const ListItem = React.memo((props: IListItemProp) => {
    const appColor = useAppColor();

    return (
        <View {...props} style={[{flexDirection: 'row', paddingVertical: 10, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: appColor.list_item_bg, borderBottomColor: /** Changed after the tutorial from .inverse_black to .border_color ====> */ appColor.border_color, /** <====== Changed after the tutorial */ borderBottomWidth: .4}, props.style]}>
            <View style={{flexDirection: 'row'}}>
                {
                    props.icon &&
                    <View style={{marginRight: 15}}>
                        {props.icon}
                    </View>
                }
                <View>
                    <Text style={[{color: appColor.main_text_color, fontSize: 16, fontWeight: 500}, props.titleStyle]}>
                        {props.title}
                    </Text>
                    {
                        props.subtitle !== undefined &&
                        <Text  style={{color: appColor.alt_text_color, fontSize: 16}}>
                            {props.subtitle}
                        </Text>
                    }
                </View>
            </View>
            <View style={{maxWidth: '70%'}}>
                {props.otherContent}
            </View>
        </View>
    )
})