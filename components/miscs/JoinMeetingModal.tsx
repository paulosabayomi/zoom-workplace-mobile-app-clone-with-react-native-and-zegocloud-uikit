import React from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import { TView } from "../../themed/themedComps";
import useAppColor from "../../themed/appColors";
import { ListItem } from "../../shared/Reusables";
import { Button, Switch } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from "../../shared/rdx-hooks";
import { ScrollView } from "react-native-gesture-handler";
import { setCallId } from "../../shared/rdx-slice";


const JoinMeeting = React.memo((props: any) => {
    const appColor = useAppColor();
    const user_details = useAppSelector(state => state.main.user_details);
    const [meeting_id, set_meeting_id] = React.useState<string>('');

    const dispatch = useAppDispatch()

    const handleStartNewMeeting = React.useCallback(() => {
        dispatch(setCallId(parseInt(meeting_id)))
        props.navigation.navigate("MeetingsPage")
    }, [meeting_id])

    return (
        <TView isContainer style={{backgroundColor: appColor.popup_modal_bg}}>
            <SafeAreaView style={{height: '100%'}}>
                <ScrollView>

                    <View style={{flexDirection: 'row', borderBottomColor: appColor.border_color, paddingVertical: 10, borderBottomWidth: .4, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'}}>
                        <View onTouchEnd={() => props.navigation.goBack()}>
                            <Text style={{color: appColor.zoom_blue, fontWeight: 300, fontSize: 18}}>
                                Cancel
                            </Text>
                        </View>

                        <View>
                            <Text style={{color: appColor.main_text_color, fontWeight: 500, fontSize: 18}}>
                                Join meeting
                            </Text>
                        </View>

                        <View style={{width: 60}}>
                        </View>
                    </View>

                    <View>
                        <TextInput 
                            style={{height: 45, backgroundColor: appColor.list_item_bg, width: '100%', textAlign: 'center',}}
                            placeholder="Meeting ID"
                            placeholderTextColor={appColor.alt_text_color}
                            keyboardType="number-pad"
                            onChangeText={set_meeting_id}
                        />

                        <Text style={{color: appColor.zoom_blue, marginTop: 10, fontSize: 12, textAlign: "center"}}>Join with a personal link name</Text>
                    </View>

                    <View style={{marginTop: 30}}>
                        <TextInput 
                            style={{height: 45, backgroundColor: appColor.list_item_bg, width: '100%', textAlign: 'center',}}
                            placeholder="Meeting ID"
                            placeholderTextColor={appColor.alt_text_color}
                            keyboardType="number-pad"
                            value={user_details.username}
                        />

                    </View>

                    <View style={{marginTop: 30, paddingHorizontal: 10}}>
                        <Button onPress={handleStartNewMeeting} disabled={meeting_id == ''} style={{backgroundColor: meeting_id == '' ? appColor.btn_disabled : appColor.zoom_blue, paddingVertical: 6,}} labelStyle={{color: meeting_id == '' ? appColor.alt_text_color : 'white', opacity: meeting_id == '' ? .8 : 1, fontSize: 18, fontWeight: 600}}>
                            Join
                        </Button>
                        <Text style={{color: appColor.alt_text_color, marginTop: 8, fontSize: 12, }}>
                            If you receive an invitation link, tap on the link again to join the meeting
                        </Text>
                    </View>

                    <View style={{marginTop: 30}}>
                        <Text style={{color: appColor.alt_text_color, marginTop: 10, marginLeft: 15, marginBottom: 13, fontSize: 13,}}>Join options</Text>

                        <ListItem title="Don't connect to audio" 
                            otherContent={<View>
                                <Switch value={true} color={appColor.toggle_switch_green} onValueChange={() => undefined} />
                            </View>}
                        />
                        <ListItem title="Turn off my video"
                            otherContent={<View>
                                <Switch value={true} color={appColor.toggle_switch_green} onValueChange={() => undefined} />
                            </View>}
                        />
                    </View>

                    
                </ScrollView>

            </SafeAreaView>
            

        </TView>
    )
})

export default JoinMeeting