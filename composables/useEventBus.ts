// composables/useEventBus.ts
import mitt from "mitt";

type ApplicationEvents = {
	"add-board": undefined;
};

const emitter = mitt<ApplicationEvents>();

export const useEvent = emitter.emit;
export const useListen = emitter.on;
