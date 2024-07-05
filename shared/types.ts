import { TextStyle, ViewProps, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

// Define a type for the slice state
export interface IMainState {
    user_details: TUserDetails;
    call_id: number;
}

export interface ISVGRProp extends SvgProps {
    style: ViewStyle & {color: string}
}

export interface ITView extends ViewProps {
    isContainer?: boolean;
}

export type TUserDetails = {
    user_id: string;
    call_id: number;
    username: string;
}

export interface IListItemProp extends ViewProps {
    title: string;
    subtitle?: any;
    otherContent?: any;
    titleStyle?: TextStyle;
    icon?: any;
}