import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from "../tabs/HomeTab";
import useAppColor from "../../themed/appColors";

import RefreshIcon from "../../assets/icons/outline/refresh-outline-white.svg"
import InfoCircleIcon from "../../assets/icons/outline/info-circle-white.svg"
import VideoIcon from "../../assets/icons/outline/video-outline.svg"
import ChatIcon from "../../assets/icons/outline/chat-outline.svg"
import MailIcon from "../../assets/icons/outline/email-outline.svg"
import DotsIcon from "../../assets/icons/outline/dots-horizontal-svgrepo-com.svg"
import CalendarIcon from "../../assets/icons/outline/calendar-outline.svg"
import PlusSquareIcon from "../../assets/icons/outline/plus-square-outline-white.svg"

import { TouchableOpacity } from "react-native-gesture-handler";
import TeamChat from "../tabs/TeamChat";
import { useAppSelector } from "../../shared/rdx-hooks";
import MailTab from "../tabs/MailTab";
import CalendarTab from "../tabs/CalendarTab";
import MoreTab from "../tabs/MoreTab";

const Tab = createBottomTabNavigator();

const HomeScreen = React.memo((props: any) => {
    const appColor = useAppColor();
    const user_details = useAppSelector(state => state.main.user_details)

    function MyTabBar({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) {
        const getIcon = (options: any, state: any, index: any) => {
            if (options.title.toLowerCase() == "meetings") {
                return <VideoIcon width={26} height={26} color={state.index === index ? appColor.zoom_blue : appColor.alt_text_color} />
            }
            else if (options.title.toLowerCase() == "team chat") {
                return <ChatIcon width={23} height={23} color={state.index === index ? appColor.zoom_blue : appColor.alt_text_color} />
            }
            else if (options.title.toLowerCase() == "mail") {
                return <MailIcon width={26} height={26} color={state.index === index ? appColor.zoom_blue : appColor.alt_text_color} />
            }
            else if (options.title.toLowerCase() == "calendar") {
                return <CalendarIcon width={26} height={26} color={state.index === index ? appColor.zoom_blue : appColor.alt_text_color} />
            }
            else if (options.title.toLowerCase() == "more") {
                return <DotsIcon width={26} height={26} color={state.index === index ? appColor.zoom_blue : appColor.alt_text_color} />
            }

        }

        const iconsObj = {
            meetings: (options: any, state: any, index: any) => <VideoIcon width={22} height={22} color={state.index === index ? appColor.zoom_blue : appColor.alt_text_color} />
        }
        
        return (
          <View style={{ flexDirection: 'row', backgroundColor: appColor.tabbar_bg, borderTopColor: appColor.border_color, alignItems: 'center', borderTopWidth: .4, paddingTop: 10, paddingBottom: 15, justifyContent: "space-between", paddingHorizontal: 20 }}>
            {state.routes.map((route: any, index: number) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
      
              const isFocused = state.index === index;
      
              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
      
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };
      
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
      
              return (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{ height: 60, alignItems: 'center'  }}
                  key={Math.floor(Math.random() * 999999999).toString()}
                >
                    {
                        getIcon(options, state, index)
                    }

                    <Text style={{ color: isFocused ? appColor.zoom_blue : appColor.alt_text_color, fontSize: 13 }}>
                        {label}
                    </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }

    return (
        <Tab.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: appColor.header_bg,
            },
            headerTitleStyle: {
                color: "white" // Changed after thr tutorial from .inverse_black to "white"
            },
            tabBarStyle: {
                backgroundColor: 'green', 
                width: '100%'
            },
            
        }} tabBar={MyTabBar}>
            <Tab.Screen name="HomeTab" options={{
                title: "Meetings",
                // headerRight(props) {
                //     return <View style={{flexDirection: "row", marginHorizontal: 15}}>
                //         <RefreshIcon width={22} height={22} color={appColor.inverseBlack} />
                //         <InfoCircleIcon style={{marginLeft: 20}} width={22} height={22} color={appColor.inverseBlack} />
                //     </View>
                // },
                tabBarIcon(props) {
                    return <RefreshIcon width={22} height={22} color={"white"} />
                },
            }} component={HomeTab} />

            <Tab.Screen name="Chat" options={{
                title: "Team Chat",
                headerRight(props) {
                    return <View style={{flexDirection: "row", marginHorizontal: 15}}>
                        <PlusSquareIcon width={25} height={25} color={appColor.inverseBlack} />
                    </View>
                },
                tabBarIcon(props) {
                    return <RefreshIcon width={22} height={22} color={appColor.inverseBlack} />
                },
            }} component={TeamChat} />

            <Tab.Screen name="Mail" options={{
                title: "Mail",
                tabBarIcon(props) {
                    return <RefreshIcon width={22} height={22} color={appColor.inverseBlack} />
                },
            }} component={MailTab} />

            <Tab.Screen name="Calendar" options={{
                title: "Calendar",
                // headerRight(props) {
                //     return <View style={{flexDirection: "row", marginHorizontal: 15}}>
                //         <RefreshIcon width={22} height={22} color={appColor.inverseBlack} />
                //         <InfoCircleIcon style={{marginLeft: 20}} width={22} height={22} color={appColor.inverseBlack} />
                //     </View>
                // },
                tabBarIcon(props) {
                    return <RefreshIcon width={22} height={22} color={appColor.inverseBlack} />
                },
                
            }} component={CalendarTab} />

            <Tab.Screen name="More" options={{
                title: "More",
            }} component={MoreTab} />

        </Tab.Navigator>
    )
})

export default HomeScreen