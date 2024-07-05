import React from "react";
import { View } from "react-native";
// @ts-ignore
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG, GROUP_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import { ZEGO_APP_ID, ZEGO_APP_SIGN } from "../../shared/zego-creds";
import { useAppSelector } from "../../shared/rdx-hooks";
import { TView } from "../../themed/themedComps";

const MeetingsPage = React.memo((props: any) => {
    const userDetails = useAppSelector(state => state.main.user_details);
    const call_id = useAppSelector(state => state.main.call_id);

    return (
        <TView isContainer>

            <ZegoUIKitPrebuiltCall
                appID={ZEGO_APP_ID}
                appSign={ZEGO_APP_SIGN}
                userID={userDetails.user_id} // userID can be something like a phone number or the user id on your own user system. 
                userName={userDetails.username}
                callID={call_id.toString()} // callID can be any unique string. 
                style={{height: '100%', width: '100%'}}
                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onCallEnd: (callID: any, reason: any, duration: any) => { props.navigation.navigate('Home') },
                }}
            />

        </TView>
    )
})

export default MeetingsPage