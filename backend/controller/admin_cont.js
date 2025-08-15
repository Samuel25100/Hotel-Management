const Booking = require("../models/booking");
const Users = require("../models/users");
const Guests = require("../models/guests");
const { ObjectId } = require("mongodb");
const Rooms = require("../models/rooms");
const Housekeeping = require("../models/house_keeping");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Admin_cont {

    static async login(req, res) {
        const { email, pwd } = req.body;
        const user = await Users.findOne({ email });
        if (user) {
            if (user.role !== "admin") {
              return res.status(401).json({ message: "Not Authorized" });
            }
            const userId = user._id.toString();
            const match = await bcrypt.compare(pwd, user.pwd);
            if (match) {
                const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN, { expiresIn: '1d'});
                const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN, { expiresIn: '7d'});
                res.status(200).json({ accessToken, refreshToken, email: user.email, name: user.name, phone: user.phone });
                return;
            }
            res.status(401).json({ message: "Wrong email or password" });
            return;   
        }
        res.status(401).json({ message: "The account doesn't exist"});
        return;
    }

    static async get_dashboard(req, res) {
      try {
          // set default value
          let dashboardData = [
                    { id: 1, title: 'Total Bookings', value: 200, 
                      category: 'booking', status: 'active', description: 'This month' },
                    { id: 2, title: 'Pending Bookings', value: 28, category: 'booking',
                      status: 'pending', description: 'Awaiting confirmation' },
                    { id: 3, title: 'New Registrations', value: 67, category: 'registration',
                      status: 'completed', description: 'This week' },
                    { id: 4, title: 'Total Revenue', value: '$45,230', category: 'revenue',
                      status: 'active', description: 'This month' },
                    { id: 5, title: 'Staff Members', value: 32, category: 'registration',
                      status: 'active', description: 'Currently active' },
                    { id: 6, title: 'Outstanding Bills', value: '$8,450', category: 'bill',
                      status: 'pending', description: 'Due this week' },
                    { id: 7, title: 'Check-ins Today', value: 18, category: 'checkin',
                      status: 'completed', description: 'Completed today' },
                    { id: 8, title: 'Check-outs Today', value: 22, category: 'checkin',
                      status: 'completed', description: 'Completed today' },
                    { id: 9, title: 'Cancelled Bookings', value: 12, category: 'booking',
                      status: 'cancelled', description: 'This month' },
                    { id: 10, title: 'Monthly Costs', value: '$12,800', category: 'bill',
                      status: 'active', description: 'Operating expenses' },
                    { id: 11, title: 'Average Revenue', value: '$1,507', category: 'revenue',
                      status: 'active', description: 'Per day' },
                    { id: 12, title: 'Occupancy Rate', value: '78%', category: 'booking',
                      status: 'active', description: 'Current rate' },
                    { id: 13, title: 'Available Rooms', value: 10, category: 'booking', status: 'active', description: 'Ready for booking'}
          ];
          // Get current date and time calculations
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
          const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const endOfToday = new Date(startOfToday);
          endOfToday.setDate(endOfToday.getDate() + 1);

          // Fetch data from database
          const totalBookings = await Booking.countDocuments({ 
                  createdAt: { $gte: startOfMonth } 
              });
          const pendingBookings = await Booking.countDocuments({ 
                  checkIn: { $gte: now }
              });
          const newRegistrations = await Users.countDocuments({ 
              createdAt: { $gte: startOfWeek }
          });
          const StaffMembers = await Users.countDocuments({ 
                  role: "staff"
          });
          const totalRooms = await Rooms.countDocuments();
          const availableRooms = await Rooms.countDocuments({ 
              status: "available" 
          });
          const todayCheckIns = await Booking.countDocuments({
                  checkIn: { 
                      $gte: startOfToday, 
                      $lt: endOfToday 
                  }
          });
          const todayCheckOuts = await Booking.countDocuments({
                  checkOut: { 
                      $gte: startOfToday, 
                      $lt: endOfToday 
                  }
          });
          const cancelledBookings = await Booking.countDocuments({ 
                  createdAt: { $gte: startOfMonth },
                  status: 'cancelled'
              });
          const housekeepingTasks = await Housekeeping.countDocuments({});


          // Calculate occupancy rate
          const occupancyRate = totalRooms > 0 
              ? Math.round(((totalRooms - availableRooms) / totalRooms) * 100)
              : 0;

          // Calculate total revenue this month (sum of totalPrice from bookings)
          const revenueResult = await Booking.aggregate([
              {
                  $match: {
                      createdAt: { $gte: startOfMonth }
                  }
              },
              {
                  $group: {
                      _id: null,
                      totalRevenue: { $sum: "$totalPrice" }
                  }
              }
          ]);
          
          const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
          const averageRevenue = totalBookings > 0 ? Math.round(totalRevenue / 30) : 0; // Per day average

          // Inputing all values to variable
          dashboardData[0].value = totalBookings || dashboardData[0].value;
          dashboardData[1].value = pendingBookings || dashboardData[1].value;
          dashboardData[2].value = newRegistrations || dashboardData[2].value;
          dashboardData[3].value = `$${totalRevenue.toLocaleString()}` || dashboardData[3].value;
          dashboardData[4].value = StaffMembers || dashboardData[4].value;
          dashboardData[6].value = todayCheckIns || dashboardData[6].value;
          dashboardData[7].value = todayCheckOuts || dashboardData[7].value;
          dashboardData[8].value = cancelledBookings || dashboardData[8].value;
          dashboardData[10].value = `$${averageRevenue}` || dashboardData[10].value;
          dashboardData[11].value = `${occupancyRate}%` || dashboardData[11].value;
          dashboardData[12].value = availableRooms || dashboardData[12].value;
          return res.status(200).json(dashboardData);
      } catch (error) {
          console.error('Dashboard error:', error);
          return res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
      }
    }

    static async createBooking(req, res) {
      const {  firstName, lastName, email, phone, checkinDate, checkoutDate, roomType, guestNumber, specialRequests} = req.body;
      const name = firstName + " " + lastName;
      const guests = parseInt(guestNumber);
      // The Booking Creation
      try {
            const userId = new ObjectId(req.userId);
            const [guestsName, checkIn, checkOut] = [name, new Date(checkinDate), new Date(checkoutDate)];
            const room = await Rooms.findOne({type: roomType, status: "available", capacity: { $gte: guests }}).select("_id price");

            if (!room) {
              return res.status(404).json({ message: "No available room of the specified type or capacity" });
            }
            
            let totalPrice = 0;
            if (!userId || !room || !checkIn || !checkOut) {
              return res.status(400).json({ error: "All fields are required" });
            }
          
            // Calculate total price based on room price and number of nights
            const checkInTime = new Date(checkIn);
            const checkOutTime = new Date(checkOut);
            const service_hr = (checkOutTime - checkInTime) / (1000 * 60 * 60);
            const service = parseInt(service_hr / 24);
            if (service == 0) {
                totalPrice = room.price;
            } else if (service >= 1) {
                totalPrice = room.price * service;
            }
            // Create booking
            const guest = await Guests.create({ roomId: room._id, name, phone, email, userId });
            const booking = await Booking.create({ user: userId, room, checkIn, checkOut, guests, totalPrice, specialRequests, guestsId: guest._id, roomType });
            if (guest || booking) {
              await Rooms.findByIdAndUpdate(new ObjectId(room), { status: "booked" });
            }
            return res.status(201).json({ message: "Booking and Guest created", booking, guest });
        } catch (err) {
            return res.status(400).json({ error: err.message });
          }
    }

    static async getBookings(req, res) {
      try {
          const bookings = await Booking.find().select("-user -_id -__v").populate("room", "-_id -__v").populate("guestsId", "-_id -__v -roomId -userId");
          const processedBookings = bookings.map(booking => ({
              ...booking.toObject(),  //Convert Mongoose doc to plain object
              checkIn: new Date(booking.checkIn).toISOString().split('T')[0],
              checkOut: new Date(booking.checkOut).toISOString().split('T')[0],
              createdAt: new Date(booking.createdAt).toISOString().split('T')[0]
          }));
          return res.status(200).json(processedBookings);
      } catch (error) {
          console.error('Error fetching bookings:', error);
          return res.status(500).json({ message: "Error fetching bookings", error: error.message });
      }
    }
}

module.exports = Admin_cont;