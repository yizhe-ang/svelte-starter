import { schemePastel1 } from "d3";
import { writable } from "svelte/store";

export const clusterColors = schemePastel1;

export const dataStore = writable(undefined);
export const numIterationsStore = writable(undefined);
