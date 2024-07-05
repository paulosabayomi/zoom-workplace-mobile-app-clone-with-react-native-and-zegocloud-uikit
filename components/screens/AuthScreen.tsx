import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { TView } from "../../themed/themedComps";
import useAppColor from "../../themed/appColors";
import { Button } from 'react-native-paper';

import ZoomIcon from "../../assets/icons/outline/zoom-logo.svg"
import { useAppSelector } from "../../shared/rdx-hooks";

const AuthScreen = React.memo((props: any) => {
    const appColor = useAppColor();
    const userDetails = useAppSelector(state => state.main.user_details)

    React.useLayoutEffect(() => {
        if (userDetails.username !== undefined) {
            props.navigation.navigate("Home")
        }
    }, [userDetails])

    return (
        <TView style={{backgroundColor: appColor.zoom_blue}}>
            <View style={{height: "60%", alignItems: 'center', justifyContent: 'center'}}>
                <View style={{alignItems: 'center'}}>
                    <ZoomIcon width={350} height={100} style={{color: "white",}} />
                    <Text style={{color: "white", fontSize: 40, fontWeight: 600, marginTop: 0}}>
                        Workplace
                    </Text>
                </View>

            </View>
            <View style={{height: "40%", backgroundColor: appColor.inverseBlack, justifyContent: 'center', borderTopRightRadius: 18, borderTopLeftRadius: 18}}>
                <View style={{alignItems: 'center', }}>
                    <View style={{alignItems: 'center', marginBottom: 15}}>
                        <Text style={{color: appColor.main_text_color, fontWeight: 600, fontSize: 25,}}>Welcome</Text>
                        <Text style={{color: appColor.main_text_color,}}>
                            Get started with your account
                        </Text>
                    </View>

                    <View style={{alignItems: 'center', marginBottom: 8, width: "80%",}}>
                        <View style={{width: '100%', marginBottom: 20}}>
                            <Button onPress={() => props.navigation.navigate('JoinMeeting')} style={{backgroundColor: appColor.zoom_blue, borderRadius: 12, paddingVertical: 5}} 
                                labelStyle={{color: 'white', fontWeight: 600, fontSize: 18}}>
                                Join meeting
                            </Button>
                        </View>
                        
                        <View style={{width: '100%', marginBottom: 20}}>
                            <Button style={{backgroundColor: appColor.alt_page_btn_bg, borderRadius: 12, paddingVertical: 5}} 
                                labelStyle={{color: appColor.main_text_color, fontWeight: 600, fontSize: 18}}>
                                Sign up
                            </Button>
                        </View>

                        <View style={{width: '100%', marginBottom: 20}}>
                            <Button style={{backgroundColor: appColor.alt_page_btn_bg, borderRadius: 12, paddingVertical: 5}} 
                                labelStyle={{color: appColor.main_text_color, fontWeight: 600, fontSize: 18}}
                                onPress={() => props.navigation.navigate("Login")}>
                                Sign in
                            </Button>
                        </View>

                    </View>

                </View>
            </View>

        </TView>
    )
})

export default AuthScreen