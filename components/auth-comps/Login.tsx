import React from "react";
import { View, Text, TextInput } from "react-native";
import { TView } from "../../themed/themedComps";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppColor from "../../themed/appColors";

import DotsIcon from "../../assets/icons/outline/dots-horizontal-svgrepo-com.svg"
import AppleLogo from "../../assets/icons/filled/apple-logo-svgrepo-com.svg"
import GoogleLogo from "../../assets/icons/filled/google-logo-search-new-svgrepo-com.svg"
import FacebookLogo from "../../assets/icons/filled/facebook-3-logo-svgrepo-com.svg"

import { Button } from "react-native-paper";
import {
    GoogleSignin,
    GoogleSigninButton,
    isErrorWithCode,
    statusCodes,
  } from "@react-native-google-signin/google-signin";
import { appStorageInst } from "../../shared/storage";
import { getCallId, getRandomId } from "../../shared/functions";
import { useAppDispatch } from "../../shared/rdx-hooks";
import { setUserDetails } from "../../shared/rdx-slice";

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
  ZegoInvitationType, GROUP_VIDEO_CALL_CONFIG, GROUP_VOICE_CALL_CONFIG, 
  ONE_ON_ONE_VOICE_CALL_CONFIG, ONE_ON_ONE_VIDEO_CALL_CONFIG
  // @ts-ignore
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { ZEGO_APP_ID, ZEGO_APP_SIGN } from "../../shared/zego-creds";

GoogleSignin.configure({
    webClientId: "<FROM DEVELOPER CONSOLE>", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: "", // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: "", // [Android] specifies an account name on the device that should be used
    iosClientId: "603652448354-6npl94hk6kp3rdi1ehgd3tsll9vajlup.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

const LoginPage = React.memo((props: any) => {
    const appColor = useAppColor();
    const [username, setUsername] = React.useState<string>('');
    const dispatch = useAppDispatch()

    const handleLoginWithGoogle = React.useCallback(async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
        //   setState({ userInfo, error: undefined });
        } catch (error) {
          if (isErrorWithCode(error)) {
            switch (error.code) {
              case statusCodes.SIGN_IN_CANCELLED:
                // user cancelled the login flow
                break;
              case statusCodes.IN_PROGRESS:
                // operation (eg. sign in) already in progress
                break;
              case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                // play services not available or outdated
                break;
              default:
              // some other error happened
            }
          } else {
            // an error that's not related to google sign in occurred
          }
        }
      },[])

    const handleLogin = React.useCallback(() => {
        const user_id = getRandomId()
        const data = {
            user_id,
            call_id: getCallId(),
            username
        };

        dispatch(setUserDetails(data))

        ZegoUIKitPrebuiltCallService.init(
            ZEGO_APP_ID, // You can get it from ZEGOCLOUD's console
            ZEGO_APP_SIGN, // You can get it from ZEGOCLOUD's console
            user_id,
            username,
            [ZIM, ZPNs],
            {
                ringtoneConfig: {
                    incomingCallFileName: 'zego_incoming.mp3',
                    outgoingCallFileName: 'zego_outgoing.mp3',
                },
                requireConfig: (data: any) => {
                    const callConfig =
                        data.invitees.length > 1
                            ? ZegoInvitationType.videoCall === data.type
                                ? GROUP_VIDEO_CALL_CONFIG
                                : GROUP_VOICE_CALL_CONFIG
                            : ZegoInvitationType.videoCall === data.type
                                ? ONE_ON_ONE_VIDEO_CALL_CONFIG
                                : ONE_ON_ONE_VOICE_CALL_CONFIG;
                    return callConfig;
                },
                notifyWhenAppRunningInBackgroundOrQuit: true,
            },);

        appStorageInst.setItem(appStorageInst.user_details_key, JSON.stringify(data))
        props.navigation.navigate("Home")
        
    }, [username])

    return (
        <TView>
            <SafeAreaView>

                <View style={{flexDirection: 'row', borderBottomColor: appColor.border_color, paddingVertical: 10, borderBottomWidth: .4, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'}}>
                    <View onTouchEnd={() => props.navigation.goBack()}>
                        <Text style={{color: appColor.zoom_blue, fontWeight: 300, fontSize: 18}}>
                            Cancel
                        </Text>
                    </View>

                    <View>
                        <Text style={{color: appColor.main_text_color, fontWeight: 500, fontSize: 18}}>
                            Sign in
                        </Text>
                    </View>

                    <View>
                        <DotsIcon width={25} height={25} style={{color: appColor.zoom_blue}} />
                    </View>
                </View>

                <View style={{marginTop: 25, paddingHorizontal: 20}}>
                    <View style={{paddingHorizontal: 5}}>
                        <Text style={{color: appColor.alt_text_color, textTransform: "uppercase"}}>Enter your email address</Text>
                    </View>

                    <View style={{backgroundColor: appColor.inverseBlack, padding: 10, marginTop: 5, borderRadius: 8}}>
                        <View style={{flexDirection: 'row',padding: 10, borderBottomColor: appColor.border_color, paddingVertical: 10, borderBottomWidth: .4,}}>
                            <Text style={{width: "25%", fontSize: 18, color: appColor.main_text_color}}>
                                Email
                            </Text>
                            <TextInput 
                                placeholder="user@example.com"
                                style={{width: "75%", fontSize: 16}}
                                onChangeText={setUsername}
                                placeholderTextColor={appColor.alt_text_color}
                            />
                        </View>
                        <View style={{flexDirection: 'row', padding: 10}}>
                            <Text style={{width: "25%", fontSize: 18, color: appColor.main_text_color}}>
                                Password
                            </Text>
                            <TextInput 
                                placeholder="Required"
                                style={{width: "75%", fontSize: 16}}
                                placeholderTextColor={appColor.alt_text_color}
                                secureTextEntry
                            />
                        </View>

                    </View>
                </View>

                <View style={{marginTop: 25, paddingHorizontal: 20}}>
                    <Button disabled={username == ""} onPress={handleLogin} style={{backgroundColor: appColor.zoom_blue, paddingVertical: 6, opacity: username == "" ? .5 : 1}} labelStyle={{color: 'white', fontSize: 18, fontWeight: 600}}>
                        Sign in
                    </Button>
                    <Text style={{color: "blue", marginTop: 10}}>
                        Forgot password?
                    </Text>
                </View>

                <View style={{marginTop: 35}}>
                    <View style={{paddingHorizontal: 20}}>
                        <View style={{paddingHorizontal: 5, marginBottom: 10}}>
                            <Text style={{color: appColor.alt_text_color, textTransform: "uppercase"}}>
                                Other sign in methods
                            </Text>
                        </View>

                        <View style={{backgroundColor: appColor.inverseBlack, borderRadius: 12, paddingVertical: 10, marginBottom: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <AppleLogo width={25} height={25} color={"black"} style={{marginRight: 10}} />
                            <Text style={{fontSize: 17, color: appColor.main_text_color, fontWeight: 500}}>Continue with Apple</Text> 
                        </View>
                        <View onTouchEnd={handleLoginWithGoogle} style={{backgroundColor: appColor.inverseBlack, borderRadius: 12, paddingVertical: 10, marginBottom: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <GoogleLogo width={25} height={25} color={"black"} style={{marginRight: 10}} />
                            <Text style={{fontSize: 17, color: appColor.main_text_color, fontWeight: 500}}>Continue with Google</Text> 
                        </View>
                        <View style={{backgroundColor: appColor.inverseBlack, borderRadius: 12, paddingVertical: 10, marginBottom: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <FacebookLogo width={25} height={25} color={"black"} style={{marginRight: 10}} />
                            <Text style={{fontSize: 17, color: appColor.main_text_color, fontWeight: 500}}>Continue with Facebook</Text> 
                        </View>
                        <View style={{backgroundColor: appColor.inverseBlack, borderRadius: 12, paddingVertical: 10, marginBottom: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 17, color: appColor.main_text_color, fontWeight: 500}}>Continue with SSO</Text> 
                        </View>
                    </View>

                </View>

            </SafeAreaView>
        </TView>
    )
})

export default LoginPage