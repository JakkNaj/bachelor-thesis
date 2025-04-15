import React, { useState, useEffect, useRef } from 'react';
import { css, html } from 'react-strict-dom';
import { colors } from '@/assets/colors/colors';
import { CrossIcon } from '@/assets/icons/CrossIcon/CrossIcon';
import { PencilIcon } from '@/assets/icons/PencilIcon/PencilIcon';
import { DotsIcon } from '@/assets/icons/DotsIcon/DotsIcon';
import { Platform } from 'react-native';

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
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOpenMenu = () => {
        setIsMenuVisible(true);
    };

    const handleCloseMenu = () => {
        setIsMenuVisible(false);
    };

    const handleEdit = () => {
        handleCloseMenu();
        requestAnimationFrame(() => {
            onEdit();
        });
    };

    const handleDelete = () => {
        handleCloseMenu();
        requestAnimationFrame(() => {
            onDelete();
        });
    };

    return (
        <html.div style={styles.container}>
            <html.button 
                ref={buttonRef}
                onClick={handleOpenMenu} 
                style={styles.menuButton}
                aria-label="Open menu"
            >
                <DotsIcon size={16} color={colors.slate[900]} />
            </html.button>

            {isMenuVisible && (
                <html.div 
                    ref={menuRef}
                    style={styles.menuContainer()}
                >
                    <html.button
                        style={styles.menuOption()}
                        onClick={handleEdit}
                        aria-label="Edit activity"
                    >
                        <PencilIcon size={16} color={colors.slate[900]} />
                        <html.span style={styles.menuOptionText()}>Edit</html.span>
                    </html.button>
                    <html.button
                        style={styles.menuOptionDelete}
                        onClick={handleDelete}
                        disabled={isDeleting}
                        aria-label="Delete activity"
                    >
                        <CrossIcon size={16} color={colors.red[500]} />
                        <html.span style={styles.menuOptionTextDelete()}>Delete</html.span>
                    </html.button>
                </html.div>
            )}
        </html.div>
    );
};

const styles = css.create({
    container: {
        position: 'relative',
    },
    menuButton: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderStyle: 'none',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    menuContainer: () => ({
        position: 'absolute',
        right: 0,
        bottom: "-4rem",
        backgroundColor: colors.white,
        borderRadius: '0.5rem',
        padding: '0.125rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        minWidth: '7.5rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: colors.slate[200],
        zIndex: 51,
    }),
    menuOption: () => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0.75rem',
        borderRadius: '0.25rem',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: colors.slate[200],
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderStyle: 'none',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
    }),
    menuOptionDelete: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0.75rem',
        borderRadius: '0.25rem',
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderStyle: 'none',
        textAlign: 'left',
        cursor: 'pointer',
    },
    menuOptionText: () => ({
        marginLeft: '0.5rem',
        fontSize: '1rem',
        color: colors.slate[900],
    }),
    menuOptionTextDelete: () => ({
        marginLeft: '0.5rem',
        fontSize: '1rem',
        color: colors.red[500],
    }),
});