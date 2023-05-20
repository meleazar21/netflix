
import { MAGIC_SERVER_KEY } from '@/constants/commonStrings';
import { Magic } from '@magic-sdk/admin';

export const magicAdmin = new Magic(MAGIC_SERVER_KEY); 