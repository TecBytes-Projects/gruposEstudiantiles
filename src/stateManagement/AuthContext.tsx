import { createContext, useContext, useState } from "react";
import { user } from "../types/types";

/*
 * Context for sharing user info and token. Used for granting access to protected pages and signing the API calls
 */

interface AuthProviderProps {
	children: React.ReactNode;
}

interface AuthContextType {
	user: user | null;
	setUser: (user: user | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<user | null>(null);

	const contextValue: AuthContextType = {
		user,
		setUser,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

// Create a custom hook to use the UserContext
const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within a UserProvider");
	}

	return context;
};

export { AuthProvider, useAuth };
