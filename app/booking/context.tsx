import { createContext, ReactNode, useState } from 'react';

export interface BookingContextType {
    destinationId: number
    setDestinationId: (destinationId: number) => void
}

export const BookingContext = createContext<BookingContextType | null>(null);
 
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [destinationId, setDestinationId] = useState<number>(-1);
   
  const contextValue : BookingContextType = {
    destinationId,
    setDestinationId
  }
  return (
    <BookingContext.Provider value={contextValue }>
      {children}
    </BookingContext.Provider>
  );
};
