import { useMemo } from "react";
import { generateColor, getInitials } from "@/lib/utils/avatar-utils";
import { css, html } from "react-strict-dom";

type AvatarProps = {
    name: string;
    size?: 'sm' | 'md' | 'lg';
}

const styles = css.create({
    container: (color: string, size: 'sm' | 'md' | 'lg') => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: color,
        width: size === 'sm' ? '32px' : size === 'lg' ? '64px' : '48px',
        height: size === 'sm' ? '32px' : size === 'lg' ? '64px' : '48px',
    }),
    initials: {
        fontSize: '14px',
        fontWeight: '500',
    }
});

export const Avatar = ({ name, size = 'md' }: AvatarProps) => {
    const initials = useMemo(() => getInitials(name), [name]);
    const color = useMemo(() => generateColor(name), [name]);

    return (
        <html.div style={styles.container(color, size)}>
            <html.p style={styles.initials}>{initials}</html.p>
        </html.div>
    );
}