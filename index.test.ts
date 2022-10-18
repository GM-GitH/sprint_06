import { Room, Booking, totalOccupancyPercentage, availableRooms } from "./index"

const roomExample = {
  bookings: [],
  discount: 0,
  name: "Presidential Suite",
  rate: 100,
};
const bookingExample = {
  checkIn: new Date("2022-01-01"),
  checkOut: new Date("2022-01-10"),
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
  { ...bookingExample, checkIn: new Date("2022-01-20"), checkOut: new Date("2022-01-26") },
  { ...bookingExample, checkIn: new Date("2022-01-26"), checkOut: new Date("2022-02-06") },
];
room1.bookings = bookings1;
room2.bookings = bookings2;

/*********************************************TEST*******************************************/

test("Room - Bookings (0)", () => {
  const date0: Date = new Date("2022-01-18")
  expect(room.isOccupied(date0)).toBeFalsy();
});
test("Room - Occupancy (>0)", () => {
  room.bookings = {...bookingExample};
  const date0: Date = new Date("2022-01-01")
  console.log(date0)
  expect(room.isOccupied(date0)).toBeTruthy();
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
  const date0: Date = new Date("2022-03-01")
  const date1: Date = new Date("2022-03-13")
  expect(room.occupancyPercentage(date0, date1)).toBe(0);
});
test("Room - Ocuppancy % between 2 dates (50%)", () => {
  room.bookings = [{ ...bookingExample, checkIn: new Date("2022-01-01"), checkOut: new Date("2022-01-07") }];
  const date0: Date = new Date("2022-01-01")
  const date1: Date = new Date("2022-01-13")
  expect(room.occupancyPercentage(date0, date1)).toBe(50);
});
test("Room - Ocuppancy % between 2 dates (100%)", () => {
  room.bookings = [{ ...bookingExample }, { ...bookingExample, checkIn: new Date("2022-02-01"), checkOut: new Date("2022-02-31") }];
  const date0: Date = new Date("2022-02-01")
  const date1: Date = new Date("2022-02-31")
  expect(room.occupancyPercentage(date0, date1)).toBe(100);
});
test("Booking - Price with booking discount (10%)", () => {
  const room: Room = new Room({ ...roomExample });
  const booking: Booking = new Booking({...bookingExample, discount: 10, room: room });
  expect(booking.getFee()).toBe(90);
});
test("Booking - Price with booking discount (50%)", () => {
  const booking = new Booking({ ...bookingExample, discount: 50, room: room });
  expect(booking.getFee()).toBe(50);
});
test("Booking - Price with booking discount (101%)", () => {
  const booking = new Booking({ ...bookingExample, discount: 101, room: room });
  expect(booking.getFee()).toBe(0);
});
test("Booking - Price with room discount (10%) + booking discount (15%)", () => {
  const room = new Room({...roomExample, discount: 10 });
  const booking = new Booking({ ...bookingExample, discount: 15, room: room });
  expect(booking.getFee()).toBe(75);
});
test("Booking - Price with room discount (50%)", () => {
  const booking = new Booking({ ...bookingExample, discount: 50, room: room });
  expect(booking.getFee()).toBe(50);
});
test("Booking - Price with room discount (101%)", () => {
  const booking = new Booking({ ...bookingExample, discount: 101, room: room });
  expect(booking.getFee()).toBe(0);
});
test("Booking - Rooms occupancy % in array (0%)", () => {
  const date0: Date = new Date("2022-09-01")
  const date1: Date = new Date("2022-09-02")
  expect(totalOccupancyPercentage(rooms, date0, date1)).toBe(0);
});
test("Booking - Rooms occupancy % in array (50%)", () => {
  const date0: Date = new Date("2022-01-10")
  const date1: Date = new Date("2022-01-20")
  expect(totalOccupancyPercentage(rooms, date0, date1)).toBe(50);
});
// test("Booking - Rooms occupancy % in array (100%)", () => {
//   expect(totalOccupancyPercentage(rooms, "2022-01-01", "2022-02-07")).toBe(100);
// });
test("Booking - Rooms in array (presidential_suite)", () => {
  const date0: Date = new Date("2022-01-10")
  const date1: Date = new Date("2022-01-20")
  expect(availableRooms(rooms, date0, date1)).toBe("Presidential Suite");
});
test("Rooms in array (no_rooms_booked)", () => {
  const date0: Date = new Date("2022-09-17")
  const date1: Date = new Date("2022-09-25")
  expect(availableRooms(rooms, date0, date1)).toBe("No rooms booked");
});
