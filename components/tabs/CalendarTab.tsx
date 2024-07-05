import React from "react";
import { View, Text } from "react-native";
import { TView } from "../../themed/themedComps";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import useAppColor from "../../themed/appColors";

const CalendarTab = React.memo((props: any) => {
    const appColor = useAppColor();

    return (
        <TView isContainer>
            <ScrollView style={{paddingHorizontal: 20}}>
                <View style={{marginTop: 200}}>
                    <Text style={{fontSize: 15, fontWeight: 300, color: appColor.alt_text_color, textAlign: 'center'}}>No events scheduled</Text>
                    <Text style={{fontSize: 15, marginBottom: 40, fontWeight: 300, color: appColor.alt_text_color, textAlign: 'center'}}>
                        Enjoy your day!
                    </Text>
                </View>
            </ScrollView>

        </TView>
    )
})

export default CalendarTab