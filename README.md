# Screen Capture Secure View


React Native에서 사용하기 위한 iOS 캡처 방지

## 설치

```sh
npm install @testbank-inc/screen-capture-secure-view

yarn add @testbank-inc/screen-capture-secure-view
```

## 

``useScreenCaptureSecure``로부터 네 개의 메서드를 불러올 수 있으며 다음과 같이 사용할 수 있습니다.

1. ``addScreenCaptureListener`` : callback을 넘겨주어 스크린샷이 일어났을 때 행동 작성
2. ``isSecure`` : promise 형태로 현재 secure 값이 true인지 false인지 return
2. ``enableSecure`` : 현재 view를 캡처 불가능 view로 설정
3. ``disableSecure`` : 현재 view를 캡처 가능 view로 설정

## 예시
```tsx
import React from 'react';
import { Alert, StyleSheet, View, ViewProps } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useScreenCaptureSecure } from '@testbank-inc/screen-capture-secure-view';

type TScreenCaptureSecureViewProps = {
  children?: React.ReactNode;
} & ViewProps;

export function ScreenCaptureSecureView({ ...props }: TScreenCaptureSecureViewProps) {
  const { addScreenCaptureListener, isSecure, enableSecureView, disableSecureView } = useScreenCaptureSecure();

  useFocusEffect(
    React.useCallback(() => {
      const subscription = addScreenCaptureListener(() => {
        // ... what you gonna do after screen captured
      });

      return () => {
        handleOutFocused();
        subscription?.remove();
      };
    }, []),
  );

  const handleOnLayout = async () => {
    const secureVal = await isSecure();
    if (!secureVal) {
      enableSecureView();
    }
  };

  const handleOutFocused = async () => {
    const secureVal = await isSecure();
    if (secureVal) {
      disableSecureView();
    }
  };

  return (
    <View onLayout={handleOnLayout} style={styles.secureView}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  secureView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
});

```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
