import React from "react";
import { View, Text } from "react-native";
import { TView } from "../../themed/themedComps";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import useAppColor from "../../themed/appColors";

const MailTab = React.memo((props: any) => {
    const appColor = useAppColor();

    return (
        <TView isContainer>
            <ScrollView style={{paddingHorizontal: 20}}>
                <View style={{marginTop: 200}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: appColor.main_text_color}}>Welcome</Text>
                    <Text style={{fontSize: 30, marginBottom: 40, fontWeight: 'bold', color: appColor.main_text_color}}>to Zoom Mail</Text>
                    <Button style={{backgroundColor: appColor.zoom_blue, borderRadius: 12, paddingVertical: 5}} 
                        labelStyle={{color: 'white', fontWeight: 600, fontSize: 18}}>
                        Get Started
                    </Button>
                </View>
            </ScrollView>

        </TView>
    )
})

export default MailTab