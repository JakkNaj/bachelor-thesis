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
        <>
            <style>{webOnlyStyles}</style>
            <div className="trip-context-menu">
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
            </div>
        </>
    );
};


const webOnlyStyles = `
    .trip-context-menu {
        display: flex;
        flex-direction: row;
        gap: 8px;
    }

`;
