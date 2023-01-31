import React, { useEffect, useState } from 'react';
import useScreenCaptureSecure from './useScreenCaptureSecure';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
function ScreenCaptureSecureView({ screenCaptureListener, onChangeSecure, ...props }) {
    const { addScreenCaptureListener, getIsSecure, enableSecure, disableSecure } = useScreenCaptureSecure();
    const [isSecure, setIsSecure] = useState(false);
    const getInitialSecureVal = async () => {
        const initialVal = await getIsSecure();
        await setIsSecure(initialVal);
    };
    useEffect(() => {
        getInitialSecureVal();
    }, []);
    useFocusEffect(React.useCallback(() => {
        const subscription = addScreenCaptureListener(() => {
            screenCaptureListener && screenCaptureListener();
        });
        return () => {
            handleOutFocused();
            subscription?.remove();
        };
    }, [screenCaptureListener]));
    useFocusEffect(React.useCallback(() => {
        onChangeSecure && onChangeSecure(isSecure);
    }, [isSecure, onChangeSecure]));
    const handleOnLayout = async () => {
        if (!isSecure)
            enableSecure();
    };
    const handleOutFocused = async () => {
        if (isSecure)
            disableSecure();
    };
    return React.createElement(View, { onLayout: handleOnLayout, style: styles.secureView }, props.children);
}
const styles = StyleSheet.create({
    secureView: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    }
});
export default ScreenCaptureSecureView;