const { Room, Booking, totalOccupancyPercentage, availableRooms } = require("./index");

const roomExample = {
  bookings: [],
  discount: 0,
  name: "Presidential Suite",
  rate: 100,
};
const bookingExample = {
  checkIn: "2022-01-01",
  checkOut: "2022-01-10",
  discount: 0,
  email: "example@contoso.com",
  name: "Bill",
  room: { ...roomExample },
};
const room = new Room({ ...roomExample });
const room1 = new Room({ ...roomExample });
const room2 = new Room({ ...roomExample });
const rooms = [room1, room2];
const bookings1 = [{ ...bookingExample }, { checkIn: "2022-01-10", checkOut: "2022-01-20" }];
const bookings2 = [
  { ...bookingExample, checkIn: "2022-01-20", checkOut: "2022-01-26" },
  { ...bookingExample, checkIn: "2022-01-26", checkOut: "2022-02-06" },
];
room1.bookings = bookings1;
room2.bookings = bookings2;

/*********************************************TEST*******************************************/

test("Room - Bookings (0)", () => {
  expect(room.isOccupied("2022-01-18")).toBeFalsy();
});
test("Room - Occupancy (>0)", () => {
  room.bookings = [bookingExample];
  expect(room.isOccupied("2022-01-10")).toBeTruthy();
});
// test("Room - Room occupied (guest_name)", () => {
//   room.bookings = [bookingExample];
//   const d = room.isOccupied("2022-03-19");
//   expect(d ? d : bookingExample.name).toBe("Bill ");
// });
test("Room - Ocuppancy % between 2 dates (0%)", () => {
  room.bookings = [
    { ...bookingExample, checkIn: "2022-06-01", checkOut: "2022-06-03" },
    { ...bookingExample, checkIn: "2022-06-03", checkOut: "2022-06-04" },
  ];
  expect(room.occupancyPercentage("2022-03-01", "2022-03-13")).toBe(0);
});
test("Room - Ocuppancy % between 2 dates (50%)", () => {
  room.bookings = [{ ...bookingExample, checkIn: "2022-01-01", checkOut: "2022-01-07" }];
  expect(room.occupancyPercentage("2022-01-01", "2022-01-13")).toBe(50);
});
test("Room - Ocuppancy % between 2 dates (100%)", () => {
  room.bookings = [{ ...bookingExample }, { ...bookingExample, checkIn: "2022-02-01", checkOut: "2022-02-31" }];
  expect(room.occupancyPercentage("2022-02-01", "2022-02-31")).toBe(100);
});
test("Booking - Price with booking discount (10%)", () => {
  const booking = new Booking({ discount: 10, room: room });
  expect(booking.getFee()).toBe(90);
});
test("Booking - Price with booking discount (50%)", () => {
  const booking = new Booking({ discount: 50, room: room });
  expect(booking.getFee()).toBe(50);
});
test("Booking - Price with booking discount (101%)", () => {
  const booking = new Booking({ discount: 101, room: room });
  expect(booking.getFee()).toBe(0);
});
test("Booking - Price with room discount (10%) + booking discount (15%)", () => {
  const room = new Room({...roomExample, discount: 10 });
  const booking = new Booking({ discount: 15, room: room });
  expect(booking.getFee()).toBe(75);
});
test("Booking - Price with room discount (50%)", () => {
  const booking = new Booking({ discount: 50, room: room });
  expect(booking.getFee()).toBe(50);
});
test("Booking - Price with room discount (101%)", () => {
  const booking = new Booking({ discount: 101, room: room });
  expect(booking.getFee()).toBe(0);
});
test("Booking - Rooms occupancy % in array (0%)", () => {
  expect(totalOccupancyPercentage(rooms, "2022-09-01", "2022-09-02")).toBe(0);
});
test("Booking - Rooms occupancy % in array (50%)", () => {
  expect(totalOccupancyPercentage(rooms, "2022-01-10", "2022-01-20")).toBe(50);
});
// test("Booking - Rooms occupancy % in array (100%)", () => {
//   expect(totalOccupancyPercentage(rooms, "2022-01-01", "2022-02-07")).toBe(100);
// });
test("Booking - Rooms in array (presidential_suite)", () => {
  expect(availableRooms(rooms, "2022-01-01", "2022-01-10")).toBe("Presidential Suite");
});
test("Rooms in array (no_rooms_booked)", () => {
  expect(availableRooms(rooms, "2022-09-17", "2022-09-25")).toBe("No rooms booked");
});
