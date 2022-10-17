// Room
//      Properties:
//           Name - string
//           Bookings - array of Booking objects
//           Rate - int price in cents
//           Discount - int percentage
//       Methods:
//           isOccupied(date) returns false if not occupied, returns the booking if occupied
//           occupancyPercentage(startDate, endDate) returns the percentage of days with occupancy within the range of dates provided (inclusive)
//
// Booking
//       Properties:
//           Name - string
//           Email - string
//           Check in - date
//           Check out - date
//           Discount - int percentage
//           Room - a room object
//       Methods:
//           get fee() returns the fee, including discounts on room and guest
//
// Functions:
//      totalOccupancyPercentage(rooms, startDate, endDate)
//          returns the total occupancy percentage across all rooms in the array
//      availableRooms(rooms, startDate, endDate)
//          returns all rooms in the array that are not occupied for the entire duration

interface RoomInterface {
  bookings: Array<BookingInterface>;
  discount: number;
  name: string;
  rate: number;
}
function datesArray(dateStart: Date, dateEnd: Date): Date[] {
  let range: Date[] = [];
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

 
}


module.exports = { Room, Booking};
