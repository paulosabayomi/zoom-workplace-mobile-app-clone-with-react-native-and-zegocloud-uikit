import React from "react";
import { Provider } from "react-redux";
import { store } from "../shared/rdx-store";
import App from "../App";
import { NavigationContainer } from '@react-navigation/native';
import {
    ZegoCallInvitationDialog,
    // @ts-ignore
  } from '@zegocloud/zego-uikit-prebuilt-call-rn'

const AppProviders = React.memo((props: any) => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <ZegoCallInvitationDialog />
                <App />
            </NavigationContainer>
        </Provider>
    )
})

export default AppProviders