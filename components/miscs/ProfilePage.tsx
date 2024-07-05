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


const ProfilePage = React.memo((props: any) => {
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

                <View style={{marginTop: 30, borderRadius: 10, backgroundColor: 'red'}}>

                    <ListItem title="Account" 
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: appColor.alt_text_color, fontSize: 15}}>myemail@gmail.com</Text>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                    <ListItem title="Display name"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: appColor.alt_text_color, fontSize: 15}}>{user_details?.username}</Text>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                    <ListItem title="Profile Photo"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View onTouchEnd={() => props.navigation.navigate("ProfilePage")} style={{width: 60, height: 60, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: 'purple'}}>
                            <Text style={{fontSize: 30, color: 'white'}}>{user_details?.username?.[0]}</Text>
                        </View>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                </View>

                <View style={{marginTop: 30}}>
                    <ListItem title="Work location" 
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: appColor.alt_text_color, fontSize: 15}}>Not set</Text>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                    <ListItem title="Available"
                        otherContent={<View>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                    <ListItem title="Set status message"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: appColor.alt_text_color, fontSize: 15}}>Not set</Text>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                </View>

                <View style={{marginTop: 30}}>

                    <ListItem title="Department"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: appColor.alt_text_color, fontSize: 15}}>Not set</Text>
                        </View>}
                    />

                    <ListItem title="Job title"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: appColor.alt_text_color, textAlign: 'right', fontSize: 15}}>Fullstack Web App & Hybrid Mobile Application Developer</Text>
                        </View>}
                    />

                    <ListItem title="Location"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: appColor.alt_text_color, textAlign: 'right', fontSize: 15}}>
                                Not set    
                            </Text>
                        </View>}
                    />

                </View>

                <View style={{marginTop: 30}}>
                    <ListItem title="Personal meeting ID (PMI)" 
                        otherContent={<View>
                            <Text style={{color: appColor.alt_text_color, textAlign: 'right', fontSize: 15}}>
                                {user_details.call_id}   
                            </Text>
                        </View>}
                    />
                    <ListItem title="Default call-in country or region"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: appColor.alt_text_color, fontSize: 15}}>Not set</Text>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                    <ListItem title="License"
                        otherContent={<View>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                    <ListItem title="Restore purchase"
                    />
                    <Text style={{color: appColor.alt_text_color, fontSize: 15}}>Meetings you host will be limited to 40 minutes</Text>
                </View>

                <View style={{marginTop: 30}}>
                    <ListItem title="Where you're logged in" 
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: appColor.alt_text_color, fontSize: 15}}>4</Text>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                </View>

                <View style={{marginTop: 30, marginBottom: 80, alignItems: 'center', backgroundColor: appColor.list_item_bg}}>
                    <ListItem title="Switch account" titleStyle={{color: appColor.zoom_blue}} />
                    <ListItem title="Sign out" onTouchEnd={handleSignout} titleStyle={{color: "red"}} />
                </View>
                
            </ScrollView>



            


        </TView>
    )
})

export default ProfilePage