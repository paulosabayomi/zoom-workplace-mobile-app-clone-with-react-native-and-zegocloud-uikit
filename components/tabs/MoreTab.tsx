import React from "react";
import { View, Text, SafeAreaView, TextInput, Alert } from "react-native";
import { TView } from "../../themed/themedComps";
import useAppColor from "../../themed/appColors";
import { ListItem } from "../../shared/Reusables";
import { Button, Switch } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from "../../shared/rdx-hooks";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';

import AngleIcon from "../../assets/icons/outline/angle-right.svg"
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { setUserDetails } from "../../shared/rdx-slice";
import { TUserDetails } from "../../shared/types";
import { appStorageInst } from "../../shared/storage";

import TicketIcon from '../../assets/icons/outline/ticket-star.svg'
import UserSquareIcon from '../../assets/icons/outline/user-square.svg'
import NotesIcon from '../../assets/icons/outline/note-text.svg'
import VideoIcon from '../../assets/icons/outline/video-outline.svg'
import TeamChatIcon from '../../assets/icons/outline/chat-outline.svg'
import SettingsIcon from '../../assets/icons/outline/settings-outline.svg'
import NotificationIcon from '../../assets/icons/outline/notification.svg'
import AudioWaveIcon from '../../assets/icons/outline/audio-wave.svg'
import QRCodeIcon from '../../assets/icons/outline/qr-code.svg'
import InfoIcon from '../../assets/icons/outline/info-circle-thin.svg'


const MoreTab = React.memo((props: any) => {
    const appColor = useAppColor();
    const user_details = useAppSelector(state => state.main.user_details);
    const dispatch = useAppDispatch()

    const handleSignout = React.useCallback((value: any) => {

        Alert.alert("Logout", "Are you sure you want to logout?", [
            {text: "Cancel", style: 'cancel'},
            {text: "Logout", style: 'destructive', onPress(value) {
                dispatch(setUserDetails({} as TUserDetails))
        
                appStorageInst.removeItem(appStorageInst.user_details_key)
                props.navigation.navigate("AuthScreen")                
            },},
        ])

    }, [])

    return (
        <TView style={{backgroundColor: appColor.popup_modal_bg,}}>

            <ScrollView style={{padding: 20, paddingBottom: 150}}>

                <View style={{marginTop: 30, borderRadius: 10, backgroundColor: appColor.list_item_bg}}>
                    <View style={{flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 10, alignItems: 'center'}}>
                        <View onTouchEnd={() => props.navigation.navigate("ProfilePage")} style={{width: 60, height: 60, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: 'purple'}}>
                            <Text style={{fontSize: 30, color: 'white'}}>{user_details.username?.[0] || "U"}</Text>
                        </View>

                        <View style={{flexGrow: 1, justifyContent: 'center', marginLeft: 10}}>
                            <Text style={{fontSize: 20, fontWeight: 500, color: appColor.main_text_color}}>{user_details.username}</Text>
                            <Text style={{fontSize: 13, color: appColor.alt_text_color}}>myemail@gmail.com</Text>
                        </View>

                        <View style={{backgroundColor: appColor.btn_disabled, width: 50, height: 50, borderRadius: 60}}>
                        </View>
                    </View>
                </View>

                <View style={{marginTop: 30}}>
                    <Text style={{color: appColor.alt_text_color, marginLeft: 10, marginBottom: 6, textTransform: 'uppercase', fontSize: 15}}>
                        Added features
                    </Text>
                    <ListItem title="Events" 
                        icon={<TicketIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                    <ListItem title="Contacts"
                        icon={<UserSquareIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                    <ListItem title="Notes"
                        icon={<NotesIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                </View>

                <View style={{marginTop: 30}}>
                    <Text style={{color: appColor.alt_text_color, marginLeft: 10, marginBottom: 6, textTransform: 'uppercase', fontSize: 15}}>
                        Settings
                    </Text>
                    <ListItem title="Meetings" 
                        icon={<VideoIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                    <ListItem title="Contacts requests"
                        icon={<UserSquareIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                    <ListItem title="Team Chat"
                        icon={<TeamChatIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                    <ListItem title="General"
                        icon={<SettingsIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                    <ListItem title="Notification"
                        icon={<NotificationIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                </View>

                <View style={{marginTop: 30}}>
                    <Text style={{color: appColor.alt_text_color, marginLeft: 10, marginBottom: 6, textTransform: 'uppercase', fontSize: 15}}>
                        Other
                    </Text>
                    <ListItem title="Siri shortcuts" 
                        icon={<AudioWaveIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                    <ListItem title="Scan QR code"
                        icon={<QRCodeIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                    <ListItem title="About"
                        icon={<InfoIcon width={20} height={20} color={appColor.main_text_color} />}
                        otherContent={<View>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                </View>
                
                <View style={{marginTop: 20, marginBottom: 30}}>
                    <Text style={{color: appColor.alt_text_color, textAlign: 'center', fontSize: 14}}>
                        Copyright 2012-{new Date().getFullYear()} Zoom Video Communications, Inc.
                    </Text>
                    <Text style={{color: appColor.alt_text_color, textAlign: 'center', fontSize: 14}}>
                        All rights reserved
                    </Text>
                </View>
                
            </ScrollView>



            


        </TView>
    )
})

export default MoreTab