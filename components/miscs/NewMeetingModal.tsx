import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TView } from "../../themed/themedComps";
import useAppColor from "../../themed/appColors";
import { ListItem } from "../../shared/Reusables";
import { Button, Switch } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from "../../shared/rdx-hooks";
import { setCallId } from "../../shared/rdx-slice";


const NewMeeting = React.memo((props: any) => {
    const appColor = useAppColor();
    const user_details = useAppSelector(state => state.main.user_details);
    const dispatch = useAppDispatch()

    const handleStartNewMeeting = React.useCallback(() => {
        dispatch(setCallId(user_details.call_id))
        props.navigation.navigate("MeetingsPage")
    }, [user_details.call_id])

    return (
        <TView style={{backgroundColor: appColor.popup_modal_bg}}>
            <SafeAreaView /** added after the tutorial =====> */ style={{height: '100%'}} /** <====== added after the tutorial */>
                <View style={{flexDirection: 'row', borderBottomColor: appColor.border_color, paddingVertical: 10, borderBottomWidth: .4, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'}}>
                    <View onTouchEnd={() => props.navigation.goBack()}>
                        <Text style={{color: appColor.zoom_blue, fontWeight: 300, fontSize: 18}}>
                            Cancel
                        </Text>
                    </View>

                    <View>
                        <Text style={{color: appColor.main_text_color, fontWeight: 500, fontSize: 18}}>
                            Start a meeting
                        </Text>
                    </View>

                    <View style={{width: 60}}>
                    </View>
                </View>

                <View style={{marginTop: 30}}>
                    <ListItem title="Video on" 
                        otherContent={<View>
                            <Switch value={true} color={appColor.toggle_switch_green} onValueChange={() => undefined} />
                        </View>}
                    />
                    <ListItem title="Use personal meeting ID (PMI)" subtitle={user_details.call_id}
                        otherContent={<View>
                            <Switch value={true} color={appColor.toggle_switch_green} onValueChange={() => undefined} />
                        </View>}
                    />
                </View>

                <View style={{marginTop: 30, paddingHorizontal: 20}}>
                    <Button onPress={handleStartNewMeeting} style={{backgroundColor: appColor.zoom_blue, paddingVertical: 6,}} labelStyle={{color: 'white', fontSize: 18, fontWeight: 600}}>
                        Start a meeting
                    </Button>
                </View>

            </SafeAreaView>
            

        </TView>
    )
})

export default NewMeeting