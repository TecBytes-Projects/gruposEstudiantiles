import { atom } from "jotai";
import { event, groupDetails } from "../types/types";

export const groupAtom = atom<groupDetails | null>(null);
export const eventAtom = atom<event | null>(null);
