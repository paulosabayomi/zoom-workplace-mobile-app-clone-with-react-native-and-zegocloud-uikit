import React from "react";
import { Text, View } from "react-native";
import { TView } from "../../themed/themedComps";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import VideoFilledIcon from "../../assets/icons/filled/video-filled.svg"
import PlusSquareIcon from "../../assets/icons/filled/plus-square-filled.svg"
import CalendarIcon from "../../assets/icons/filled/calendar-filled.svg"
import ShareScreenIcon from "../../assets/icons/filled/share-screen-filled.svg"
import useAppColor from "../../themed/appColors";
import RBSheet from 'react-native-raw-bottom-sheet';

import RefreshIcon from "../../assets/icons/outline/refresh-outline-white.svg"
import InfoCircleIcon from "../../assets/icons/outline/info-circle-white.svg"
import { useAppSelector } from "../../shared/rdx-hooks";

import ZegoUIKitPrebuiltCallService, { ZegoSendCallInvitationButton 
// @ts-ignore
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const HomeTab = React.memo((props: any) => {
    const appColor = useAppColor()
    const refRBSheet = React.useRef<any>();
    const user_details = useAppSelector(state => state.main.user_details)
    const [invitees, set_invitees] = React.useState<string>('')

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight() {
                return <View style={{flexDirection: "row", marginHorizontal: 15}}>
                    <RefreshIcon width={22} height={22} color={appColor.main_text_color} />
                    <View onTouchEnd={() => refRBSheet.current?.open()} >
                        <InfoCircleIcon style={{marginLeft: 20}} width={22} height={22} color={appColor.main_text_color} />
                    </View>
                </View>
            },
        })
    }, [])

    return (
        <TView isContainer style={{}}>
            <View style={{borderBottomColor: appColor.border_color, flexDirection: 'row', borderBottomWidth: .4, justifyContent: 'space-between'}}>

                <View onTouchEnd={() => props.navigation.navigate('StartMeeting')} style={{alignItems: 'center', padding: 12}}>
                    <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.zoom_orange, alignItems: 'center', justifyContent: 'center'}}>
                        <VideoFilledIcon width={30} height={30} style={{color: 'white'}} />
                    </View>
                    <Text style={{color: appColor.alt_text_color, fontSize: 13}}>New meetings</Text>
                </View>

                <View onTouchEnd={() =>  props.navigation.navigate('JoinMeeting')} style={{alignItems: 'center', padding: 12}}>
                    <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.zoom_blue, alignItems: 'center', justifyContent: 'center'}}>
                        <PlusSquareIcon width={22} height={22} style={{color: 'white'}} />
                    </View>
                    <Text style={{color: appColor.alt_text_color, fontSize: 13}}>
                        Join
                    </Text>
                </View>

                <View onTouchEnd={() =>  props.navigation.navigate('ScheduleMeeting')} style={{alignItems: 'center', padding: 12}}>
                    <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.zoom_blue, alignItems: 'center', justifyContent: 'center'}}>
                        <CalendarIcon width={22} height={22} style={{color: 'white'}} />
                    </View>
                    <Text style={{color: appColor.alt_text_color, fontSize: 13}}>
                        Schedule
                    </Text>
                </View>

                <View style={{alignItems: 'center', padding: 12}}>
                    <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.zoom_blue, alignItems: 'center', justifyContent: 'center'}}>
                        <ShareScreenIcon width={30} height={30} style={{color: 'white'}} />
                    </View>
                    <Text style={{color: appColor.alt_text_color, fontSize: 13}}>
                        Share Screen
                    </Text>
                </View>

            </View>

            <View style={{paddingVertical: 10, borderBottomColor: appColor.border_color, borderBottomWidth: .4, alignItems: 'center'}}>
                <Text style={{color: appColor.zoom_blue}}>Add a calendar</Text>
            </View>

            <View style={{paddingHorizontal: 20}}>
                <Text style={{color: appColor.main_text_color, marginTop: 10, marginBottom: 15, fontSize: 20, textAlign: "center"}}>
                    Make call
                </Text>
                <TextInput 
                    style={{height: 45, backgroundColor: appColor.border_color, borderRadius: 12, width: '100%', textAlign: 'center',}}
                    placeholder="Meeting ID"
                    placeholderTextColor={appColor.alt_text_color}
                    // keyboardType="number-pad"
                    onChangeText={set_invitees}
                />

                <Text style={{color: appColor.zoom_blue, marginTop: 10, fontSize: 12, textAlign: "center"}}>
                    Enter the id of the users you want to call, separated by comma
                </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>
                <View style={{alignItems:'center'}}>
                    <ZegoSendCallInvitationButton
                        // invitees={[{ userID: inviteeID, userName: inviteeName }]} // List of user object.
                        invitees={invitees.split(',').map((inviteeID) => {
                            return { userID: inviteeID, userName: 'user_' + inviteeID };
                        })}
                        isVideoCall={false}
                        resourceID={"zego_video_chat"} // Changed after the tutorial from "zegouikit_call" to "zego_video_chat"  For offline call notification
                    />
                    <Text style={{color: appColor.zoom_blue, marginTop: 10, fontSize: 12, textAlign: "center"}}>
                        Voice call
                    </Text>
                </View>
                <View style={{marginLeft: 30, alignItems:'center'}}>
                    <ZegoSendCallInvitationButton
                        // invitees={[{ userID: inviteeID, userName: inviteeName }]} // List of user object.
                        invitees={invitees.split(',').map((inviteeID) => {
                            return { userID: inviteeID, userName: 'user_' + inviteeID };
                        })}
                        isVideoCall={true}
                        resourceID={"zego_video_chat"} // Changed after the tutorial from "zegouikit_call" to "zego_video_chat"  For offline call notification
                    />
                    <Text style={{color: appColor.zoom_blue, marginTop: 10, fontSize: 12, textAlign: "center"}}>
                        Video call
                    </Text>

                </View>

            </View>

            <View style={{flexGrow: 1, justifyContent: 'center'}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 25, color: appColor.main_text_color}}>No upcoming meetings</Text>
                    <Text style={{color: appColor.alt_text_color}}>The scheduled meetings will be listed here</Text>
                </View>
            </View>

            <RBSheet
                ref={refRBSheet}
                useNativeDriver={false}
                customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                container: {
                    backgroundColor: appColor.popup_modal_bg, 
                    width: "95%",
                    marginBottom: 30,
                    borderRadius: 15,
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                }}
                customModalProps={{
                animationType: 'slide',
                statusBarTranslucent: true,
                }}
                closeOnPressBack={true}
                closeOnPressMask={true}
                customAvoidingViewProps={{
                    enabled: false,
                }}>
                <View style={{paddingTop: 20, justifyContent: 'space-between', height: '100%'}}>
                    <View>
                        <Text style={{color: appColor.alt_text_color, textAlign: 'center'}}>Personal meeting ID</Text>
                        <Text style={{fontSize: 25, marginTop: 10, textAlign: 'center', color: appColor.main_text_color, fontWeight: '700'}}>{user_details.call_id}</Text>
                        <Text style={{fontSize: 25, marginTop: 10, textAlign: 'center', color: appColor.main_text_color, fontWeight: '700'}}>{user_details.user_id}</Text>
                    </View>
                    <View onTouchEnd={() => refRBSheet.current?.close()} style={{width: "100%", paddingVertical: 20}}>
                        <Text style={{fontSize: 20, color: appColor.main_text_color, textAlign: 'center',}}>Cancel</Text>
                    </View>
                </View>
            </RBSheet>
        </TView>
    )
})

export default HomeTab