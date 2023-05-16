import { MAGIC_LINK_KEY } from '@/constants/commonStrings';
import { Magic } from 'magic-sdk';

const createMagic = () => {
    if (typeof window !== "undefined") return new Magic(MAGIC_LINK_KEY);
    else null;
}


export const magic = createMagic();
