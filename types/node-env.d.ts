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
}