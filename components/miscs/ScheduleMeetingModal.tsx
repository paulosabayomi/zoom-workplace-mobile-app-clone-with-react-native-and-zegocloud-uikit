import React from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import { TView } from "../../themed/themedComps";
import useAppColor from "../../themed/appColors";
import { ListItem } from "../../shared/Reusables";
import { Button, Switch } from 'react-native-paper';
import { useAppSelector } from "../../shared/rdx-hooks";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';

import AngleIcon from "../../assets/icons/outline/angle-right.svg"
import RNDateTimePicker from "@react-native-community/datetimepicker";


const ScheduleMeeting = React.memo((props: any) => {
    const appColor = useAppColor();
    const user_details = useAppSelector(state => state.main.user_details);
    const [meeting_id, set_meeting_id] = React.useState<string>('');


    const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false)
    const [showTimePicker, setShowTimePicker] = React.useState<boolean>(false)

    const handleDateChange = React.useCallback((value: any) => {
        setShowDatePicker(false)
    }, [])

    const handleTimeChange = React.useCallback((value: any) => {
        setShowTimePicker(false)
    }, [])

    return (
        <TView style={{backgroundColor: appColor.popup_modal_bg}}>
            <SafeAreaView>

            <ScrollView>

                <View style={{flexDirection: 'row', borderBottomColor: appColor.border_color, paddingVertical: 10, borderBottomWidth: .4, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'}}>
                    <View onTouchEnd={() => props.navigation.goBack()}>
                        <Text style={{color: appColor.zoom_blue, fontWeight: 300, fontSize: 18}}>
                            Cancel
                        </Text>
                    </View>

                    <View>
                        <Text style={{color: appColor.main_text_color, fontWeight: 500, fontSize: 18}}>
                            Schedule meeting
                        </Text>
                    </View>

                    <View style={{width: 60}}>
                    </View>
                </View>

                <View style={{marginTop: 30}}>
                    <TextInput 
                        style={{height: 45, backgroundColor: appColor.list_item_bg, width: '100%', paddingHorizontal: 8}}
                        placeholder={user_details.username + "'s Zoom Meeting"}
                        placeholderTextColor={appColor.alt_text_color}
                        keyboardType="number-pad"
                    />

                </View>

                <View style={{marginTop: 30}}>

                    <ListItem title="Starts" 
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}} onTouchEnd={() => setShowDatePicker(true)}>
                            <Text style={{color: appColor.alt_text_color, fontSize: 15}}>Today at 19:00</Text>
                            <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                        </View>}
                    />
                    <ListItem title="Duration"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}} onTouchEnd={() => setShowTimePicker(true)}>
                        <Text style={{color: appColor.alt_text_color, fontSize: 15}}>30 min</Text>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                    <ListItem title="Time zone"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: appColor.alt_text_color, fontSize: 15}}>Africa/Lagos</Text>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                    <ListItem title="Repeat"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: appColor.alt_text_color, fontSize: 15}}>Never</Text>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                    <ListItem title="Calendar"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: appColor.alt_text_color, fontSize: 15}}>iCalendar</Text>
                        <AngleIcon color={appColor.alt_text_color} width={30} height={30} />
                    </View>}
                    />
                </View>

                <View style={{marginTop: 30}}>
                    <ListItem title="Attendees" 
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: appColor.alt_text_color, fontSize: 15}}>None</Text>
                    </View>}
                    />
                    <ListItem title="Turn off my video"
                        otherContent={<View>
                            <Switch value={true} color={appColor.toggle_switch_green} onValueChange={() => undefined} />
                        </View>}
                    />
                </View>

                <View style={{marginTop: 30}}>

                    <ListItem title="Use personal meeting ID" subtitle={user_details.call_id} 
                        otherContent={<View>
                            <Switch value={true} color={appColor.toggle_switch_green} onValueChange={() => undefined} />
                        </View>}
                    />
                    <Text style={{color: appColor.alt_text_color, marginTop: 10, marginLeft: 15, marginBottom: 13, fontSize: 13,}}>
                        If this option is enabled, any meeting options that you change
                        here will be applied to all meetings that use your personal meeting ID
                    </Text>

                </View>

                <View style={{marginTop: 30}}>
                    <Text style={{color: appColor.alt_text_color, marginTop: 10, marginLeft: 15, marginBottom: 13, fontSize: 13, textTransform: 'uppercase',}}>
                        Security
                    </Text>
                    <ListItem title="Require meeting passcode" 
                    subtitle={"Only users who have the invite link or passcode"}
                        otherContent={<View>
                            <Switch value={true} color={appColor.toggle_switch_green} onValueChange={() => undefined} />
                        </View>}
                    />
                    <ListItem title="Passcode"
                        otherContent={<View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: appColor.alt_text_color, fontSize: 15}}>ra8d0k</Text>
                    </View>}
                    />
                    <ListItem title="Enable waiting room"
                        subtitle={"Only users admitted by the host can join"}
                        otherContent={<View>
                            <Switch value={true} color={appColor.toggle_switch_green} onValueChange={() => undefined} />
                        </View>}
                    />
                </View>

                <View style={{marginTop: 30}}>
                    <Text style={{color: appColor.alt_text_color, marginTop: 10, marginLeft: 15, marginBottom: 13, fontSize: 13, textTransform: 'uppercase',}}>
                        Meeting options
                    </Text>
                    <ListItem title="Host video on" 
                        otherContent={<View>
                            <Switch value={true} color={appColor.toggle_switch_green} onValueChange={() => undefined} />
                        </View>}
                    />
                    <ListItem title="Participant video on"
                        otherContent={<View>
                            <Switch value={true} color={appColor.toggle_switch_green} onValueChange={() => undefined} />
                        </View>}
                    />
                    <ListItem title="Advanced options"
                    />
                </View>
            

            {
                showDatePicker &&
                <RNDateTimePicker
                    // testID="dateTimePicker"
                    value={new Date()}
                    mode={'date'}
                    style={{width: '100%', flex: 1}}
                    display="spinner"
                    // is24Hour={true}
                    onChange={handleDateChange}
                />
            }

            {
                showTimePicker &&
                <RNDateTimePicker
                    testID="onlydateTimePicker"
                    value={new Date()}
                    mode={'time'}
                    is24Hour={true}
                    onChange={handleTimeChange}
                />
            }
                
            </ScrollView>



            
            </SafeAreaView>


        </TView>
    )
})

export default ScheduleMeeting