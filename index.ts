interface RoomInterface {
  bookings: Array<BookingInterface>;
  discount: number;
  name: string;
  rate: number;
}
function datesArray(dateStart: Date, dateEnd: Date): Array<Date> {
  let range: Array<Date> = [];
  const startDate = new Date(dateStart);
  while (startDate < dateEnd) {
    range = [...range, new Date(startDate)];
    startDate.setDate(startDate.getDate() + 1);
  }
  return range;
}

class Room implements RoomInterface {
  bookings;
  discount;
  name;
  rate;
  constructor({ name, bookings, rate, discount }) {
    this.bookings = bookings;
    this.discount = discount;
    this.name = name;
    this.rate = rate;
  }

  isOccupied(date: Date): Boolean {
    for (let booking of this.bookings) {
      if (date >= booking.checkIn && date < booking.checkOut) {
        return true;
      }
    }
    return false;
  }
  occupancyPercentage(startDate: Date, endDate: Date): number {
    const datesRange = datesArray(startDate, endDate);
    const datesOccupied: Array<Date> = [];
    for (let date of datesRange) {
      if (this.isOccupied(date)) return datesOccupied.push(date);
      else return 0;
    }
    const occupancyPercentage: number = (datesOccupied.length / datesRange.length) * 100;
    return occupancyPercentage < 100 ? occupancyPercentage : 100;
  }
}

interface BookingInterface {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  discount: number;
  room: RoomInterface;
}

class Booking implements BookingInterface {
  name;
  email;
  checkIn;
  checkOut;
  discount;
  room;

  constructor({ name, email, checkIn, checkOut, discount, room }) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  /* This returns the total price of the room after applying the discounts.*/
  getFee({discount}):number {
    const totalDiscount: number = discount + this.room.discount
    const dateRange: Array<string> = this.room.dateRange(this.checkIn, this.checkOut)
    const totalPrice: number = dateRange.length * this.room.rate
    return (totalPrice - ((totalDiscount / 100) * totalPrice));
  }
}
/* This takes an array of rooms, a start date and an end date, and returns the average occupancy percentage of all the rooms in the array. */
const totalOccupancyPercentage = (rooms:Array<any>, startDate: Date, endDate: Date): number => {
  const occupancyOfEachRoom = rooms.map((room) => room.occupancyPercentage(startDate, endDate)).reduce((a, b) => a + b, 0);
  return Math.round(occupancyOfEachRoom / rooms.length);
};
/* This filters through the rooms array and returns the names of the rooms that have a booking that overlaps with the given date range.*/
const availableRooms = (rooms: Array<any>, startDate: Date, endDate: Date) => {
  const availableRoomArr = rooms.filter((room) => room.bookings.find((booking) => startDate <= booking.checkIn && endDate >= booking.checkOut));
  return availableRoomArr[0] ? availableRoomArr.map((room) => room.name).join(", ") : "No rooms booked";
};

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms };
