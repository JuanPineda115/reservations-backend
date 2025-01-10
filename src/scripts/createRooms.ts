import pool from '../config/database';

async function createRooms() {
    try {
        // Primero, vamos a limpiar la tabla de rooms
        await pool.query('DELETE FROM room');

        // Habitaciones para Hostal San Martin (idHotel = 1)
        const sanMartinRooms = Array(30).fill({
            type: 'Doble',
            noChildren: false,
            adultsCapacity: 2,
            childrenCapacity: 2,
            hotelId: 1,
            memberPrice: 190,
            normalPrice: 545
        });

        // Habitaciones para Hotel Santa Cruz (idHotel = 2)
        const santaCruzRooms = [
            // Habitación Doble - 5 unidades
            ...Array(5).fill({
                type: 'Doble',
                noChildren: false,
                adultsCapacity: 2,
                childrenCapacity: 2,
                hotelId: 2,
                memberPrice: 250,
                normalPrice: 700
            }),
            ...Array(5).fill({
                type: 'Doble Sin Niños',
                noChildren: true,
                adultsCapacity: 2,
                childrenCapacity: 0,
                hotelId: 2,
                memberPrice: 250,
                normalPrice: 700
            }),
            // Jr. Suite 1 cama - 3 unidades
            ...Array(5).fill({
                type: 'Jr. Suite 1',
                noChildren: false,
                adultsCapacity: 2,
                childrenCapacity: 2,
                hotelId: 2,
                memberPrice: 300,
                normalPrice: 800
            }),
            // Jr. Suite 2 camas - 3 unidades
            ...Array(5).fill({
                type: 'Jr. Suite 2',
                noChildren: false,
                adultsCapacity: 3,
                childrenCapacity: 2,
                hotelId: 2,
                memberPrice: 350,
                normalPrice: 900
            }),
            // Suite - 2 unidades
            ...Array(5).fill({
                type: 'Suite',
                noChildren: false,
                adultsCapacity: 4,
                childrenCapacity: 4,
                hotelId: 2,
                memberPrice: 450,
                normalPrice: 1100
            })
        ];

        // Insertar habitaciones de San Martin
        for (const room of sanMartinRooms) {
            await pool.query(
                'INSERT INTO room (type, noChildren, adultsCapacity, childrenCapacity, hotelId, memberPrice, normalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [room.type, room.noChildren, room.adultsCapacity, room.childrenCapacity, room.hotelId, room.memberPrice, room.normalPrice]
            );
        }

        // Insertar habitaciones de Santa Cruz
        for (const room of santaCruzRooms) {
            await pool.query(
                'INSERT INTO room (type, noChildren, adultsCapacity, childrenCapacity, hotelId, memberPrice, normalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [room.type, room.noChildren, room.adultsCapacity, room.childrenCapacity, room.hotelId, room.memberPrice, room.normalPrice]
            );
        }

        console.log('Habitaciones creadas exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear las habitaciones:', error);
        process.exit(1);
    }
}

createRooms(); 