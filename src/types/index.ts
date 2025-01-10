export interface User {
    idUser?: number;
    name: string;
    mail: string;
    phone: number;
    member: boolean;
}

export interface Hotel {
    idHotel?: number;
    name: string;
    description: string;
}

export interface Room {
    idRoom?: number;
    type: string;
    noChildren: boolean;
    adultsCapacity: number;
    childrenCapacity: number;
    hotelId: number;
    memberPrice: number;
    normalPrice: number;
}

export interface Reservation {
    idReservation?: number;
    roomId: number;
    clientId: number;
    startDate: Date;
    endDate: Date;
    noChildren: boolean;
    adultsQty: number;
    childrenQty: number;
} 