/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/screens/Home';
import AuthScreen from './components/screens/AuthScreen';
import ZoomIcon from "./assets/icons/outline/zoom-logo.svg"


import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen
  // @ts-ignore
} from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import LoginPage from './components/auth-comps/Login';
import { appStorageInst } from './shared/storage';
import { useAppDispatch, useAppSelector } from './shared/rdx-hooks';
import { setUserDetails } from './shared/rdx-slice';
import NewMeeting from './components/miscs/NewMeetingModal';
import JoinMeeting from './components/miscs/JoinMeetingModal';
import ScheduleMeeting from './components/miscs/ScheduleMeetingModal';
import TeamChat from './components/tabs/TeamChat';
import useAppColor from './themed/appColors';
import ProfilePage from './components/miscs/ProfilePage';
import MeetingsPage from './components/meeting/MeetingsPage';

ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

const Stack = createStackNavigator();


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const userDetails = useAppSelector(state => state.main.user_details)
  const dispatch = useAppDispatch()
  const [appLoading, setAppLoading] = React.useState<boolean>(true);
  const appColor = useAppColor()

  const handleCheckLogin = React.useCallback(async () => {
    const userDetails = await appStorageInst.getItem(appStorageInst.user_details_key);
    console.log("userDetails", userDetails);
    
    if (userDetails != null) {
      dispatch(setUserDetails(JSON.parse(userDetails)))      
    }

    setTimeout(() => {
      setAppLoading(false)      
    }, 500);

  }, [])

  React.useLayoutEffect(() => {
    handleCheckLogin()
  }, [])

  return (
    <>
      {
        appLoading &&
        <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, zIndex: 5, backgroundColor: appColor.inverseBlack}}>
          <View style={{alignItems: 'center'}}>
              <ZoomIcon width={350} height={100} style={{color: appColor.zoom_blue,}} />
              <Text style={{color: appColor.alt_text_color, fontSize: 40, fontWeight: 600, marginTop: 0}}>
                  Workplace
              </Text>
          </View>
        </View>
      }
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
      <Stack.Navigator initialRouteName={'AuthScreen'}>

        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="AuthScreen" options={{headerShown: false}} component={AuthScreen} />
        <Stack.Screen name="MeetingsPage" options={{headerShown: false}} component={MeetingsPage} />
        <Stack.Screen name="ProfilePage" options={{headerShown: true, headerStyle: {backgroundColor: appColor.header_bg}, 
        headerTitleStyle: {color: 'white'}, headerBackTitleVisible: false, title: "My profile",}} component={ProfilePage} />
        <Stack.Screen name="Login" 
          options={{
            headerShown: false, 
            gestureDirection: 'vertical',
            gestureEnabled: true,
            cardStyleInterpolator: Platform.OS == "ios" ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forRevealFromBottomAndroid
          }} 
          component={LoginPage} />
        <Stack.Screen name="StartMeeting" 
          options={{
            headerShown: false, 
            gestureDirection: 'vertical',
            gestureEnabled: true,
            cardStyleInterpolator: Platform.OS == "ios" ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forRevealFromBottomAndroid
          }} 
          component={NewMeeting} />
        <Stack.Screen name="JoinMeeting" 
          options={{
            headerShown: false, 
            gestureDirection: 'vertical',
            gestureEnabled: true,
            cardStyleInterpolator: Platform.OS == "ios" ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forRevealFromBottomAndroid
          }} 
          component={JoinMeeting} />
        <Stack.Screen name="ScheduleMeeting" 
          options={{
            headerShown: false, 
            gestureDirection: 'vertical',
            gestureEnabled: true,
            cardStyleInterpolator: Platform.OS == "ios" ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forRevealFromBottomAndroid
          }} 
          component={ScheduleMeeting} />

        <Stack.Screen
            options={{ headerShown: false }}
            // DO NOT change the name 
            name="ZegoUIKitPrebuiltCallWaitingScreen"
            component={ZegoUIKitPrebuiltCallWaitingScreen}
        />
        <Stack.Screen
            options={{ headerShown: false }}
            // DO NOT change the name
            name="ZegoUIKitPrebuiltCallInCallScreen"
            component={ZegoUIKitPrebuiltCallInCallScreen}
        />

      </Stack.Navigator>
    </>
  );
}

export default App;
