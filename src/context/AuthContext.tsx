import { createContext, useContext, useState } from "react";
import { user } from "../types/types";

interface AuthProviderProps {
	children: React.ReactNode;
}

interface AuthContextType {
	token: string | null;
	user: user | null;
	setUser: (user: user | null) => void;
	setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the UserProvider component
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<user | null>(null);
	const [token, setToken] = useState<string | null>(null);

	// Provide the user and setUser values to the context
	const contextValue: AuthContextType = {
		token,
		setToken,
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
