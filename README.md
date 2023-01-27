# Screen Capture Secure View

## 설치

```sh
npm install @testbank-inc/screen-capture-secure-view

yarn add @testbank-inc/screen-capture-secure-view
```

## Usage

``useScreenCaptureSecureView``로부터 세 개의 메서드를 불러올 수 있으며 다음과 같이 사용할 수 있습니다.

1. ``addScreenCaptureListener`` : callback을 넘겨주어 스크린샷이 일어났을 때 행동 작성
2. ``setSecure`` : 현재 view를 캡처 불가능 view로 설정
3. ``resetSecure`` : 현재 view를 캡처 가능 view로 설정

```tsx
import React from 'react';
import { Alert, StyleSheet, View, ViewProps } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useScreenCaptureSecureView from '@testbank-inc/screen-capture-secure-view';

type TScreenCaptureSecureViewProps = {
  children?: React.ReactNode;
} & ViewProps;

export function ScreenCaptureSecureView({ ...props }: TScreenCaptureSecureViewProps) {
  const { addScreenCaptureListener, setSecureView, resetSecureView } = useScreenCaptureSecureView();

  useFocusEffect(
    React.useCallback(() => {
      const subscription = addScreenCaptureListener(() => {
        // ... what you gonna do after screen captured
      });

      return () => {
        resetSecureView();
        subscription?.remove();
      };
    }, []),
  );

  return (
    <View onLayout={setSecureView} style={styles.secureView}>
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
