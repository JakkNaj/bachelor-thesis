import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../Button';
import { PencilIcon } from '@/assets/icons/PencilIcon';
import { CrossIcon } from '@/assets/icons/CrossIcon';
import { colors } from '@/assets/colors/colors';

type TActivityContextMenuProps = {
    onEdit: () => void;
    onDelete: () => void;
    isDeleting?: boolean;
};

export const ActivityContextMenu = ({
    onEdit,
    onDelete,
    isDeleting = false
}: TActivityContextMenuProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    variant="secondary"
                    onPress={onEdit}
                    title="Edit"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    variant="danger"
                    onPress={onDelete}
                    disabled={isDeleting}
                    icon={<CrossIcon size={20} color={colors.red[500]} />}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
    },
    buttonContainer: {
        flexShrink: 0,
    }
});