declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    KEYCLOAK_CLIENT_ID: string
    KEYCLOAK_CLIENT_SECRET: string
    KEYCLOAK_ISSUER: string
  }
}

declare module "trips/utils" {
    interface Trip {
        bookingId: number
        destination: string
        start_date: string
        end_date: string
    };
    interface Destination {
      destination_id: number
      city: string
      description: string
    };
    interface BookingRequest {
      email: string | null | undefined
      destination_id: number
      origin_id?: number
      start_date: string
      end_date: string
    };
    type FlightRequest = Partial<BookingRequest>;
    interface Layover {
      destinationId: number
      estLayoverTime: number
    };
    interface Airport {
      airport_id: number
      airport_name: string
      timezone: string
    };
    interface Flight {
      id: number
      airline: string
      origin: Destination
      destination: Destination
      airport: Airport
      departure_date: string
      departure_time: string
      arrival_date: string
      arrival_time: string
      layOvers: Layover[]
    };
    interface FlightResponse {
      flights: Flight[]
    };
}