import React from 'react';
import type { ViewProps } from 'react-native';
type TScreenCaptureSecureViewProps = {
    children?: React.ReactNode;
    screenCaptureListener?: () => void;
    onChangeSecure?: (isSecure: boolean) => void;
} & ViewProps;
declare function ScreenCaptureSecureView({ screenCaptureListener, onChangeSecure, ...props }: TScreenCaptureSecureViewProps): JSX.Element;
export default ScreenCaptureSecureView;
