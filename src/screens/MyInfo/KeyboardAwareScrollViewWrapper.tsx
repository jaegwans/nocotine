import React from 'react';
import {
    KeyboardAwareScrollView,
    KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

import { ReactNode } from 'react';

interface KeyboardAwareScrollViewWrapperProps
    extends KeyboardAwareScrollViewProps {
    children: ReactNode;
}

const KeyboardAwareScrollViewWrapper = ({
    children,
    ...props
}: KeyboardAwareScrollViewWrapperProps) => {
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraScrollHeight={30}
            contentContainerStyle={props.contentContainerStyle}
            style={props.style}
        >
            {children}
        </KeyboardAwareScrollView>
    );
};

export default KeyboardAwareScrollViewWrapper;
