import React, { useRef, useState, useContext } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/typography/text.component';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const ProfileCamera = styled(CameraView)`
    flex: 1;
    width: 100%;
    height: 100%;
`;

const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const CameraContainer = styled(View)`
    flex: 1;
    width: 100%;
    position: relative;
`;

const ButtonWrapper = styled(View)`
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    background: transparent;
    flex-direction: row;
    justify-content: center;
`;

const FlipCameraButton = styled(TouchableOpacity)`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 15px;
    border-radius: 10px;
`;

const TakePictureButton = styled(TouchableOpacity)`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 15px;
    border-radius: 10px;
    margin-left: 20px;
`;

const RequestPermissionButton = styled(TouchableOpacity)`
    margin-top: 20px;
`;

export const CameraScreen = ({ navigation }) => {
    const [facing, setFacing] = useState('front');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const { user } = useContext(AuthenticationContext);

    const snap = async () => {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();
            AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
            navigation.goBack();
        }
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <Container>
                <Text variant="body">
                    We need your permission to use the camera
                </Text>
                <RequestPermissionButton onPress={requestPermission}>
                    <Text variant="label" style={{ color: 'blue' }}>
                        Grant Permission
                    </Text>
                </RequestPermissionButton>
            </Container>
        );
    }

    return (
        <CameraContainer>
            <ProfileCamera ref={cameraRef} facing={facing} ratio="16:9" />
            <ButtonWrapper>
                <FlipCameraButton
                    onPress={() =>
                        setFacing((current) =>
                            current === 'front' ? 'back' : 'front',
                        )
                    }
                >
                    <Text variant="body" style={{ color: 'white' }}>
                        Flip Camera
                    </Text>
                </FlipCameraButton>
                <TakePictureButton onPress={snap}>
                    <Text variant="body" style={{ color: 'white' }}>
                        Take Picture
                    </Text>
                </TakePictureButton>
            </ButtonWrapper>
        </CameraContainer>
    );
};
