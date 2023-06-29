import mitt from "mitt";

type ApplicationEvents = {
	"add-board": undefined;
	"show-sidebar": undefined;
};

const emitter = mitt<ApplicationEvents>();

export const useEvent = emitter.emit;
export const useListen = emitter.on;
