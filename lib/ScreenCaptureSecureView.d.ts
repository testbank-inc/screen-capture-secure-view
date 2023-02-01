import React from 'react';
import type { ViewProps } from 'react-native';
type TScreenCaptureSecureViewProps = {
    isFocusIn: boolean;
    children?: React.ReactNode;
    screenCaptureListener?: () => void;
    onChangeSecure?: (isSecure: boolean) => void;
} & ViewProps;
declare function ScreenCaptureSecureView({ isFocusIn, screenCaptureListener, onChangeSecure, ...props }: TScreenCaptureSecureViewProps): JSX.Element;
export default ScreenCaptureSecureView;
