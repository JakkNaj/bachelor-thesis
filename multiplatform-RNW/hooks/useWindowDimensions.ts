import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

type TWindowDimensions = {
    width: number;
    height: number;
};

export const useWindowDimensions = (): TWindowDimensions => {
    const [dimensions, setDimensions] = useState<TWindowDimensions>({
        width: Platform.OS === 'web' ? window.innerWidth : 0,
        height: Platform.OS === 'web' ? window.innerHeight : 0
    });

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return dimensions;
};