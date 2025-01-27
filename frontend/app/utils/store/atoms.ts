import { atomWithStorage } from 'jotai/utils';

export const teamIdAtom = atomWithStorage<number | null>('teamId',null);
export const teamCommonNameAtom = atomWithStorage<string>('teamCommonName', '');
export const isLoggedInAtom = atomWithStorage<boolean>('isLoggedIn', false);