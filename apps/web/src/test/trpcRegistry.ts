import { createTrpcRegistry } from "./trpcMock";

/** Gemeinsame Registry der tRPC-Attrappe: Tests tragen hier Abfrage-Daten und Mutations-Handler ein (wird vor jedem Test geleert). */
export const registry = createTrpcRegistry();

/** Zustand der übrigen Attrappen: `online` steuert `useOnlineStatus` (Standard: online, wird nach jedem Test zurückgesetzt). */
export const testState = { online: true };
