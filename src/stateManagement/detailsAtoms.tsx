import { atom } from "jotai";
import { blogPost, event, groupDetails } from "../types/types";

export const groupAtom = atom<groupDetails | null>(null);
export const eventAtom = atom<event | null>(null);
export const blogPostAtom = atom<blogPost | null>(null);
