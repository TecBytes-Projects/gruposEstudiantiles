import { atom } from "jotai";
import { groupDetails } from "../types/types";

export const groupAtom = atom<groupDetails | null>(null);
