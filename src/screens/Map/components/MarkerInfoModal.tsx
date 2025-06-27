import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Linking,
} from 'react-native';
import React from 'react';
import { Place } from '@/apis/searchNearbyPlaces';
import { styles } from './MarkerInfoModal.styles';

interface MarkerInfoModalProps {
    modalVisible: boolean;
    selectedPlace: Place | null;
    closeModal: () => void;
}

const MarkerInfoModal: React.FC<MarkerInfoModalProps> = ({
    modalVisible,
    selectedPlace,
    closeModal,
}) => {
    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="none"
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {selectedPlace?.name || '장소 정보'}
                    </Text>
                    <TouchableOpacity
                        onPress={closeModal}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                </View>

                {selectedPlace && (
                    <View>
                        <Text style={styles.address}>
                            {selectedPlace.address}
                        </Text>
                        {selectedPlace.phone && (
                            <TouchableOpacity
                                onPress={() =>
                                    selectedPlace.phone &&
                                    Linking.openURL(
                                        `tel:${selectedPlace.phone}`
                                    )
                                }
                            >
                                <Text style={styles.infoText}>
                                    📞 {selectedPlace.phone}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {selectedPlace.url && (
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(selectedPlace.url)
                                }
                                style={styles.urlButton}
                            >
                                <Text style={styles.urlButtonText}>자세히</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </Modal>
    );
};

export default MarkerInfoModal;
