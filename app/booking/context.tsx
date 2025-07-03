import { createContext, ReactNode, useState } from 'react';

export interface BookingContextType {
    destinationId: number;
    setDestinationId: (destinationId: number) => void;
    startDate: string;
    setStartDate: (startDate: string) => void;
    endDate: string;
    setEndDate: (endDate: string) => void;
    airportId: number;
    setAirportId: (airportId: number) => void;
}

export const BookingContext = createContext<BookingContextType | null>(null);
 
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [destinationId, setDestinationId] = useState<number>(-1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [airportId, setAirportId] = useState<number>(-1);
   
  const contextValue : BookingContextType = {
    destinationId,
    setDestinationId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    airportId,
    setAirportId

  }
  return (
    <BookingContext.Provider value={contextValue }>
      {children}
    </BookingContext.Provider>
  );
};
