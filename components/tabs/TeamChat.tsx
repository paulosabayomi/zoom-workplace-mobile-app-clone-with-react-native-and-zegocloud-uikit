import React from "react";
import { TView } from "../../themed/themedComps";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useAppSelector } from "../../shared/rdx-hooks";
import useAppColor from "../../themed/appColors";

import StarIcon from "../../assets/icons/outline/star.svg"
import FolderIcon from "../../assets/icons/filled/folder.svg"
import AtIcon from "../../assets/icons/outline/at-white.svg"
import SendIcon from "../../assets/icons/filled/send.svg"
import BookmarkIcon from "../../assets/icons/filled/bookmark-white.svg"
import FileIcon from "../../assets/icons/filled/file.svg"
import SettingsIcon from "../../assets/icons/filled/settings.svg"
import EditIcon from "../../assets/icons/outline/edit-rectangle.svg"

import { Button } from "react-native-paper";

const TeamChat = React.memo((props: any) => {
    const user_details = useAppSelector(state => state.main.user_details);
    const appColor = useAppColor()

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft() {
                return <View style={{marginHorizontal: 10}}>
                    <View onTouchEnd={() => props.navigation.navigate("ProfilePage")} style={{width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'purple'}}>
                        <Text style={{fontSize: 20, color: 'white'}}>{user_details.username[0]}</Text>
                    </View>
                </View>
            },
        })
    }, [])

    return (
        <TView isContainer style={{paddingVertical: 8,}}>
            <ScrollView style={{ flexGrow: 1, minHeight: '100%', paddingHorizontal: 12}}>
                <View style={{marginBottom: 14}}>
                    <TextInput 
                        style={{width: '100%', backgroundColor: appColor.btn_disabled, height: 40, fontSize: 18, paddingLeft: 25, borderRadius: 8, alignSelf: 'center'}}
                        placeholder="Search"
                        placeholderTextColor={appColor.alt_text_color}
                    />
                </View>

                <ScrollView horizontal style={{flexGrow: 0}} showsHorizontalScrollIndicator={false}>

                    <View style={{alignItems: 'center', padding: 12}}>
                        <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.team_chat_icon_cont_bg, alignItems: 'center', justifyContent: 'center'}}>
                            <StarIcon width={30} height={30} style={{color: appColor.team_chat_icon_bg}} />
                        </View>
                        <Text style={{color: appColor.alt_text_color, fontSize: 13}}>New meetings</Text>
                    </View>

                    <View style={{alignItems: 'center', padding: 12}}>
                        <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.team_chat_icon_cont_bg, alignItems: 'center', justifyContent: 'center'}}>
                            <FolderIcon width={22} height={22} style={{color: appColor.team_chat_icon_bg}} />
                        </View>
                        <Text style={{color: appColor.alt_text_color, fontSize: 13}}>
                            Join
                        </Text>
                    </View>

                    <View style={{alignItems: 'center', padding: 12}}>
                        <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.team_chat_icon_cont_bg, alignItems: 'center', justifyContent: 'center'}}>
                            <AtIcon width={22} height={22} style={{color: appColor.team_chat_icon_bg}} />
                        </View>
                        <Text style={{color: appColor.alt_text_color, fontSize: 13}}>
                            Schedule
                        </Text>
                    </View>

                    <View style={{alignItems: 'center', padding: 12}}>
                        <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.team_chat_icon_cont_bg, alignItems: 'center', justifyContent: 'center'}}>
                            <SendIcon width={30} height={30} style={{color: appColor.team_chat_icon_bg}} />
                        </View>
                        <Text style={{color: appColor.alt_text_color, fontSize: 13}}>
                            Share Screen
                        </Text>
                    </View>

                    <View style={{alignItems: 'center', padding: 12}}>
                        <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.team_chat_icon_cont_bg, alignItems: 'center', justifyContent: 'center'}}>
                            <BookmarkIcon width={30} height={30} style={{color: appColor.team_chat_icon_bg}} />
                        </View>
                        <Text style={{color: appColor.alt_text_color, fontSize: 13}}>
                            Bookmarks
                        </Text>
                    </View>

                    <View style={{alignItems: 'center', padding: 12}}>
                        <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.team_chat_icon_cont_bg, alignItems: 'center', justifyContent: 'center'}}>
                            <FileIcon width={30} height={30} style={{color: appColor.team_chat_icon_bg}} />
                        </View>
                        <Text style={{color: appColor.alt_text_color, fontSize: 13}}>
                            Files
                        </Text>
                    </View>

                    <View style={{alignItems: 'center', padding: 12}}>
                        <View style={{width: 50, height: 50, borderRadius: 13, backgroundColor: appColor.team_chat_icon_cont_bg, alignItems: 'center', justifyContent: 'center'}}>
                            <SettingsIcon width={30} height={30} style={{color: appColor.team_chat_icon_bg}} />
                        </View>
                        <Text style={{color: appColor.alt_text_color, fontSize: 13}}>
                            Files
                        </Text>
                    </View>

                </ScrollView>

                <View style={{minHeight: 500, marginTop: 20, flexShrink: 0}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 600, fontSize: 22, /** Added after the tutorial ====> */ color: appColor.main_text_color /** <===== Added after the tutorial */}}>Messages</Text>
                    </View>

                    <View style={{flexGrow: 1, alignItems: 'center', justifyContent:'center'}}>
                        <View style={{width: "55%",}}>
                            <Text style={{marginBottom: 15, textAlign: "center", color: appColor.alt_text_color}}>Find people and start chatting!</Text>
                            <View style={{backgroundColor: appColor.zoom_blue, position: 'relative', justifyContent: 'center', borderRadius: 12, paddingVertical: 10,}}>
                                <Text style={{color: 'white', fontWeight: 600, fontSize: 18, textAlign: 'center'}}>Start new chat</Text>
                                <EditIcon width={25} height={25} color="white" style={{position: "absolute", left: 10, }} />
                            </View>
                        </View>
                    </View>

                </View>

            </ScrollView>


        </TView>
    )
})

export default TeamChat