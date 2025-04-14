import { html, css } from 'react-strict-dom';
import { Button } from '@/components/Button';

type TTripContextMenuProps = {
    onEdit: () => void;
    onDelete: () => void;
    isDeleting?: boolean;
};

export const TripContextMenu = ({
    onEdit,
    onDelete,
    isDeleting = false
}: TTripContextMenuProps) => {
    return (
        <html.div style={styles.container}>
            <Button
                variant="secondary"
                outlined
                onPress={onEdit}
                title="Edit Trip"
            />
            <Button
                variant="danger"
                onPress={onDelete}
                disabled={isDeleting}
                title="Delete Trip"
            />
        </html.div>
    );
};

const styles = css.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
    },
});
