import React, { useEffect, useState } from 'react';
import type { EmitterSubscription, ViewProps } from 'react-native';
import useScreenCaptureSecure from './useScreenCaptureSecure';
import { StyleSheet, View } from 'react-native';

type TScreenCaptureSecureViewProps = {
  isFocusIn: boolean;
  children?: React.ReactNode;
  screenCaptureListener?: () => void;
  onChangeSecure?: (isSecure: boolean) => void
} & ViewProps;

// does not work properly yet...
function ScreenCaptureSecureView({isFocusIn, screenCaptureListener, onChangeSecure, ...props}: TScreenCaptureSecureViewProps) {
  const {addScreenCaptureListener, getIsSecure, enableSecure, disableSecure} = useScreenCaptureSecure();

  const [isSecure, setIsSecure] = useState(false);

  const getInitialSecureVal = async () => {
    const initialVal = await getIsSecure();
    await setIsSecure(initialVal);
  }

  useEffect(() => {
    getInitialSecureVal();
  }, [])

  useEffect(() => {
    let subscription: EmitterSubscription | undefined;
    if(isFocusIn) {
      subscription = addScreenCaptureListener(() => {
        screenCaptureListener && screenCaptureListener();
      })
    }
    else {
      handleOutFocused();
    }
    return () => {
      subscription?.remove();
    }
  }, [isFocusIn, screenCaptureListener]);

  useEffect(() => {
    if (isFocusIn && onChangeSecure) {
      onChangeSecure(isSecure);
    }
  }, [isFocusIn, isSecure, onChangeSecure]);

  const handleOnLayout = async () => {
    if (!isSecure) {
      await enableSecure();
      setIsSecure(true);
    }
  }

  const handleOutFocused = async () => {
    if (isSecure) {
      await disableSecure();
      setIsSecure(false);
    }
  }

  return <View onLayout={handleOnLayout} style={styles.secureView}>
    {props.children}
  </View>

}

const styles = StyleSheet.create({
  secureView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  }
})

export default ScreenCaptureSecureView;
