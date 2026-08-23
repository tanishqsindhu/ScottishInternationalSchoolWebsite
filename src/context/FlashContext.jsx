import { createContext, useCallback, useContext, useState } from "react";

const FlashContext = createContext({ success: "", error: "", flash: () => {}, clear: () => {} });

export function FlashProvider({ children }) {
	const [messages, setMessages] = useState({ success: "", error: "" });

	const flash = useCallback((type, message) => {
		setMessages({ success: "", error: "", [type]: message });
	}, []);

	const clear = useCallback(() => setMessages({ success: "", error: "" }), []);

	return (
		<FlashContext.Provider value={{ ...messages, flash, clear }}>{children}</FlashContext.Provider>
	);
}

export function useFlash() {
	return useContext(FlashContext);
}
