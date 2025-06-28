import { createContext, useState } from "react";
import React from 'react';

export interface TestContextType {
    message: string,
    saveMessage: (msg: string) => void;
};

export const TestContext = createContext<TestContextType|null>(null);

const TestProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [message, setMessage] = useState<string>("Hello World!");

    const saveMessage = (message: string) => {
        setMessage(message);
    };

    return <TestContext.Provider value={{ message, saveMessage }}>{children}</TestContext.Provider>;
};

export default TestProvider;