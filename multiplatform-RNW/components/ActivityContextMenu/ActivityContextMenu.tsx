import React, { useState } from 'react';
import { View, Modal, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '@/assets/colors/colors';
import { CrossIcon } from '@/assets/icons/CrossIcon';
import { PencilIcon } from '@/assets/icons/PencilIcon';
import { DotsIcon } from '@/assets/icons/DotsIcon';

type TActivityContextMenuProps = {
    onEdit: () => void;
    onDelete: () => void;
    isDeleting?: boolean;
};

type TMenuState = {
    isVisible: boolean;
    position: {
        top: number;
        right: number;
    };
};

export const ActivityContextMenu = ({
    onEdit,
    onDelete,
    isDeleting = false
}: TActivityContextMenuProps) => {
    const [menuState, setMenuState] = useState<TMenuState>({
        isVisible: false,
        position: {
            top: 0,
            right: 0,
        },
    });

    const handleOpenMenu = (event: any) => {
        const { pageY, pageX } = event.nativeEvent;
        setMenuState({
            isVisible: true,
            position: {
                top: pageY,
                right: pageX,
            },
        });
    };

    const handleEdit = () => {
        setMenuState(prev => ({ ...prev, isVisible: false }));
        requestAnimationFrame(() => {
            onEdit();
        });
    };

    const handleDelete = () => {
        setMenuState(prev => ({ ...prev, isVisible: false }));
        requestAnimationFrame(() => {
            onDelete();
        });
    };

    return (
        <>
            <Pressable onPress={handleOpenMenu} style={styles.menuButton}>
                <DotsIcon size={16} color={colors.slate[900]} />
            </Pressable>

            <Modal
                visible={menuState.isVisible}
                transparent
                animationType="none"
                onRequestClose={() => setMenuState(prev => ({ ...prev, isVisible: false }))}
            >
                <Pressable
                    style={styles.menuOverlay}
                    onPress={() => setMenuState(prev => ({ ...prev, isVisible: false }))}
                >
                    <View
                        style={[
                            styles.menuContainer,
                            {
                                top: menuState.position.top - 20,
                                right: 20,
                                opacity: menuState.isVisible ? 1 : 0,
                            },
                        ]}
                    >
                        <Pressable
                            style={styles.menuOption}
                            onPress={handleEdit}
                        >
                            <PencilIcon size={16} color={colors.slate[900]} />
                            <Text style={styles.menuOptionText}>Edit</Text>
                        </Pressable>
                        <Pressable
                            style={styles.menuOptionDelete}
                            onPress={handleDelete}
                            disabled={isDeleting}
                        >
                            <CrossIcon size={24} color={colors.red[500]} />
                            <Text style={styles.menuOptionTextDelete}>Delete</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    menuButton: {
        padding: 8,
    },
    menuOverlay: {
        flex: 1,
    },
    menuContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        minWidth: 120,
        borderWidth: 1,
        borderColor: colors.slate[200],
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.slate[200],
    },
    menuOptionDelete: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 4,
    },
    menuOptionText: {
        marginLeft: 8,
        fontSize: 16,
        color: colors.slate[900],
    },
    menuOptionTextDelete: {
        marginLeft: 8,
        fontSize: 16,
        color: colors.red[500],
    },
});