const express = require("express");
const jwt_auth = require("../middleware/jwt_auth");
const { Only_Admin } = require("../middleware/staff_gateKeeper");

const routes_admin = express.Router();
const Admin_cont = require("../controller/admin_cont");

// =================== AUTH ROUTES ===================
routes_admin.post('/login', Admin_cont.login);

// =================== DASHBOARD ROUTES ===================
routes_admin.get('/dashboard', jwt_auth, Only_Admin, Admin_cont.get_dashboard);


// =================== BOOKINGS ROUTES ===================
routes_admin.post('/bookings/add', jwt_auth, Only_Admin, Admin_cont.createBooking); // Create new booking
routes_admin.get('/bookings', jwt_auth, Only_Admin, Admin_cont.getBookings); // Get all bookings

/*
routes_admin.get('/dashboard/stats', jwt_auth, Only_Admin, Admin_cont.getDashboardStats);
routes_admin.get('/dashboard/recent-bookings', jwt_auth, Only_Admin, Admin_cont.getRecentBookings);
routes_admin.get('/dashboard/revenue', jwt_auth, Only_Admin, Admin_cont.getRevenueData);

// =================== ROOMS ROUTES ===================
// Get all rooms
routes_admin.get('/rooms', jwt_auth, Only_Admin, Admin_cont.getAllRooms);
// Add new room
routes_admin.post('/rooms/add', jwt_auth, Only_Admin, Admin_cont.addRoom);
// Get room by ID
routes_admin.get('/rooms/:id', jwt_auth, Only_Admin, Admin_cont.getRoomById);
// Update room
routes_admin.put('/rooms/:id', jwt_auth, Only_Admin, Admin_cont.updateRoom);
// Delete room
routes_admin.delete('/rooms/:id', jwt_auth, Only_Admin, Admin_cont.deleteRoom);
// Get room availability
routes_admin.get('/rooms/availability/:date', jwt_auth, Only_Admin, Admin_cont.getRoomAvailability);
// Update room status
routes_admin.patch('/rooms/:id/status', jwt_auth, Only_Admin, Admin_cont.updateRoomStatus);


// Get all bookings
routes_admin.get('/bookings', jwt_auth, Only_Admin, Admin_cont.getAllBookings);

// Get booking by ID
routes_admin.get('/bookings/:id', jwt_auth, Only_Admin, Admin_cont.getBookingById);
// Update booking
routes_admin.put('/bookings/:id', jwt_auth, Only_Admin, Admin_cont.updateBooking);
// Cancel booking
routes_admin.patch('/bookings/:id/cancel', jwt_auth, Only_Admin, Admin_cont.cancelBooking);
// Confirm booking
routes_admin.patch('/bookings/:id/confirm', jwt_auth, Only_Admin, Admin_cont.confirmBooking);
// Get bookings by date range
routes_admin.get('/bookings/range/:startDate/:endDate', jwt_auth, Only_Admin, Admin_cont.getBookingsByDateRange);
// Get booking statistics
routes_admin.get('/bookings/stats', jwt_auth, Only_Admin, Admin_cont.getBookingStats);

// =================== CHECK-IN/CHECK-OUT ROUTES ===================
// Get check-in/out settings
routes_admin.get('/checkin-checkout/settings', jwt_auth, Only_Admin, Admin_cont.getCheckinSettings);
// Update check-in time
routes_admin.patch('/checkin-checkout/checkin-time', jwt_auth, Only_Admin, Admin_cont.updateCheckinTime);
// Update check-out time
routes_admin.patch('/checkin-checkout/checkout-time', jwt_auth, Only_Admin, Admin_cont.updateCheckoutTime);
// Process check-in
routes_admin.post('/checkin-checkout/checkin/:bookingId', jwt_auth, Only_Admin, Admin_cont.processCheckin);
// Process check-out
routes_admin.post('/checkin-checkout/checkout/:bookingId', jwt_auth, Only_Admin, Admin_cont.processCheckout);
// Get today's check-ins
routes_admin.get('/checkin-checkout/todays-checkins', jwt_auth, Only_Admin, Admin_cont.getTodaysCheckins);
// Get today's check-outs
routes_admin.get('/checkin-checkout/todays-checkouts', jwt_auth, Only_Admin, Admin_cont.getTodaysCheckouts);
// Get pending check-ins/outs
routes_admin.get('/checkin-checkout/pending', jwt_auth, Only_Admin, Admin_cont.getPendingCheckinCheckout);

// =================== GUESTS ROUTES ===================
// Get all guests
routes_admin.get('/guests', jwt_auth, Only_Admin, Admin_cont.getAllGuests);
// Add new guest
routes_admin.post('/guests/add', jwt_auth, Only_Admin, Admin_cont.addGuest);
// Get guest by ID
routes_admin.get('/guests/:id', jwt_auth, Only_Admin, Admin_cont.getGuestById);
// Update guest information
routes_admin.put('/guests/:id', jwt_auth, Only_Admin, Admin_cont.updateGuest);
// Delete guest
routes_admin.delete('/guests/:id', jwt_auth, Only_Admin, Admin_cont.deleteGuest);
// Get guest booking history
routes_admin.get('/guests/:id/bookings', jwt_auth, Only_Admin, Admin_cont.getGuestBookingHistory);
// Search guests
routes_admin.get('/guests/search/:query', jwt_auth, Only_Admin, Admin_cont.searchGuests);
// Get VIP guests
routes_admin.get('/guests/vip', jwt_auth, Only_Admin, Admin_cont.getVipGuests);
// Send message to guest
routes_admin.post('/guests/:id/message', jwt_auth, Only_Admin, Admin_cont.sendMessageToGuest);

// =================== STAFF ROUTES ===================
// Get all staff
routes_admin.get('/staff', jwt_auth, Only_Admin, Admin_cont.getAllStaff);
// Add new staff member
routes_admin.post('/staff/add', jwt_auth, Only_Admin, Admin_cont.addStaffMember);
// Get staff by ID
routes_admin.get('/staff/:id', jwt_auth, Only_Admin, Admin_cont.getStaffById);
// Update staff information
routes_admin.put('/staff/:id', jwt_auth, Only_Admin, Admin_cont.updateStaff);
// Delete staff member
routes_admin.delete('/staff/:id', jwt_auth, Only_Admin, Admin_cont.deleteStaff);
// Update staff status
routes_admin.patch('/staff/:id/status', jwt_auth, Only_Admin, Admin_cont.updateStaffStatus);
// Get staff by department
routes_admin.get('/staff/department/:dept', jwt_auth, Only_Admin, Admin_cont.getStaffByDepartment);
// Get staff schedule
routes_admin.get('/staff/:id/schedule', jwt_auth, Only_Admin, Admin_cont.getStaffSchedule);
// Update staff schedule
routes_admin.put('/staff/:id/schedule', jwt_auth, Only_Admin, Admin_cont.updateStaffSchedule);
// Send message to staff
routes_admin.post('/staff/:id/message', jwt_auth, Only_Admin, Admin_cont.sendMessageToStaff);
// Suspend staff member
routes_admin.patch('/staff/:id/suspend', jwt_auth, Only_Admin, Admin_cont.suspendStaff);
// Terminate staff member
routes_admin.patch('/staff/:id/terminate', jwt_auth, Only_Admin, Admin_cont.terminateStaff);
// Get staff performance
routes_admin.get('/staff/:id/performance', jwt_auth, Only_Admin, Admin_cont.getStaffPerformance);

// =================== REPORTS ROUTES ===================
// Get revenue report
routes_admin.get('/reports/revenue', jwt_auth, Only_Admin, Admin_cont.getRevenueReport);
// Get revenue by date range
routes_admin.get('/reports/revenue/:startDate/:endDate', jwt_auth, Only_Admin, Admin_cont.getRevenueByDateRange);
// Get occupancy report
routes_admin.get('/reports/occupancy', jwt_auth, Only_Admin, Admin_cont.getOccupancyReport);
// Get guest demographics report
routes_admin.get('/reports/demographics', jwt_auth, Only_Admin, Admin_cont.getGuestDemographics);
// Get booking trends report
routes_admin.get('/reports/booking-trends', jwt_auth, Only_Admin, Admin_cont.getBookingTrends);
// Get staff performance report
routes_admin.get('/reports/staff-performance', jwt_auth, Only_Admin, Admin_cont.getStaffPerformanceReport);
// Get monthly report
routes_admin.get('/reports/monthly/:year/:month', jwt_auth, Only_Admin, Admin_cont.getMonthlyReport);
// Get yearly report
routes_admin.get('/reports/yearly/:year', jwt_auth, Only_Admin, Admin_cont.getYearlyReport);
// Export report to PDF
routes_admin.get('/reports/export/:reportType', jwt_auth, Only_Admin, Admin_cont.exportReportToPDF);
// Get custom report
routes_admin.post('/reports/custom', jwt_auth, Only_Admin, Admin_cont.getCustomReport);

// =================== SETTINGS ROUTES ===================
// Get all settings
routes_admin.get('/settings', jwt_auth, Only_Admin, Admin_cont.getAllSettings);
// Update general settings
routes_admin.put('/settings/general', jwt_auth, Only_Admin, Admin_cont.updateGeneralSettings);
// Update notification settings
routes_admin.put('/settings/notifications', jwt_auth, Only_Admin, Admin_cont.updateNotificationSettings);
// Update security settings
routes_admin.put('/settings/security', jwt_auth, Only_Admin, Admin_cont.updateSecuritySettings);
// Update payment settings
routes_admin.put('/settings/payment', jwt_auth, Only_Admin, Admin_cont.updatePaymentSettings);
// Update email settings
routes_admin.put('/settings/email', jwt_auth, Only_Admin, Admin_cont.updateEmailSettings);
// Update backup settings
routes_admin.put('/settings/backup', jwt_auth, Only_Admin, Admin_cont.updateBackupSettings);
// Test email configuration
routes_admin.post('/settings/test-email', jwt_auth, Only_Admin, Admin_cont.testEmailSettings);
// Get system health
routes_admin.get('/settings/system-health', jwt_auth, Only_Admin, Admin_cont.getSystemHealth);

// =================== NOTIFICATIONS ROUTES ===================
// Get all notifications
routes_admin.get('/notifications', jwt_auth, Only_Admin, Admin_cont.getAllNotifications);
// Get unread notifications
routes_admin.get('/notifications/unread', jwt_auth, Only_Admin, Admin_cont.getUnreadNotifications);
// Mark notification as read
routes_admin.patch('/notifications/:id/read', jwt_auth, Only_Admin, Admin_cont.markNotificationAsRead);
// Mark all notifications as read
routes_admin.patch('/notifications/mark-all-read', jwt_auth, Only_Admin, Admin_cont.markAllNotificationsAsRead);
// Delete notification
routes_admin.delete('/notifications/:id', jwt_auth, Only_Admin, Admin_cont.deleteNotification);
// Send notification
routes_admin.post('/notifications/send', jwt_auth, Only_Admin, Admin_cont.sendNotification);
// Get notification settings
routes_admin.get('/notifications/settings', jwt_auth, Only_Admin, Admin_cont.getNotificationSettings);

// =================== ANALYTICS ROUTES ===================
// Get analytics dashboard
routes_admin.get('/analytics', jwt_auth, Only_Admin, Admin_cont.getAnalyticsDashboard);
// Get booking analytics
routes_admin.get('/analytics/bookings', jwt_auth, Only_Admin, Admin_cont.getBookingAnalytics);
// Get revenue analytics
routes_admin.get('/analytics/revenue', jwt_auth, Only_Admin, Admin_cont.getRevenueAnalytics);
// Get guest analytics
routes_admin.get('/analytics/guests', jwt_auth, Only_Admin, Admin_cont.getGuestAnalytics);
// Get room analytics
routes_admin.get('/analytics/rooms', jwt_auth, Only_Admin, Admin_cont.getRoomAnalytics);
// Get staff analytics
routes_admin.get('/analytics/staff', jwt_auth, Only_Admin, Admin_cont.getStaffAnalytics);
// Get seasonal trends
routes_admin.get('/analytics/seasonal-trends', jwt_auth, Only_Admin, Admin_cont.getSeasonalTrends);
// Get competitor analysis
routes_admin.get('/analytics/competitor', jwt_auth, Only_Admin, Admin_cont.getCompetitorAnalysis);

// =================== INVENTORY ROUTES ===================
// Get all inventory items
routes_admin.get('/inventory', jwt_auth, Only_Admin, Admin_cont.getAllInventory);
// Add inventory item
routes_admin.post('/inventory/add', jwt_auth, Only_Admin, Admin_cont.addInventoryItem);
// Update inventory item
routes_admin.put('/inventory/:id', jwt_auth, Only_Admin, Admin_cont.updateInventoryItem);
// Delete inventory item
routes_admin.delete('/inventory/:id', jwt_auth, Only_Admin, Admin_cont.deleteInventoryItem);
// Get low stock items
routes_admin.get('/inventory/low-stock', jwt_auth, Only_Admin, Admin_cont.getLowStockItems);
// Update stock levels
routes_admin.patch('/inventory/:id/stock', jwt_auth, Only_Admin, Admin_cont.updateStockLevels);
// Get inventory by category
routes_admin.get('/inventory/category/:category', jwt_auth, Only_Admin, Admin_cont.getInventoryByCategory);

// =================== MAINTENANCE ROUTES ===================
// Get all maintenance requests
routes_admin.get('/maintenance', jwt_auth, Only_Admin, Admin_cont.getAllMaintenanceRequests);
// Create maintenance request
routes_admin.post('/maintenance/add', jwt_auth, Only_Admin, Admin_cont.createMaintenanceRequest);
// Update maintenance request
routes_admin.put('/maintenance/:id', jwt_auth, Only_Admin, Admin_cont.updateMaintenanceRequest);
// Assign maintenance to staff
routes_admin.patch('/maintenance/:id/assign/:staffId', jwt_auth, Only_Admin, Admin_cont.assignMaintenance);
// Complete maintenance request
routes_admin.patch('/maintenance/:id/complete', jwt_auth, Only_Admin, Admin_cont.completeMaintenanceRequest);
// Get pending maintenance
routes_admin.get('/maintenance/pending', jwt_auth, Only_Admin, Admin_cont.getPendingMaintenance);
// Get maintenance by room
routes_admin.get('/maintenance/room/:roomId', jwt_auth, Only_Admin, Admin_cont.getMaintenanceByRoom);

// =================== ADMIN PROFILE ROUTES ===================
// Get admin profile
routes_admin.get('/profile', jwt_auth, Only_Admin, Admin_cont.getAdminProfile);
// Update admin profile
routes_admin.put('/profile', jwt_auth, Only_Admin, Admin_cont.updateAdminProfile);
// Change password
routes_admin.patch('/profile/change-password', jwt_auth, Only_Admin, Admin_cont.changeAdminPassword);
// Update profile picture
routes_admin.patch('/profile/picture', jwt_auth, Only_Admin, Admin_cont.updateProfilePicture);
// Get admin activity log
routes_admin.get('/profile/activity-log', jwt_auth, Only_Admin, Admin_cont.getAdminActivityLog);

// =================== SECURITY ROUTES ===================
// Get security logs
routes_admin.get('/security/logs', jwt_auth, Only_Admin, Admin_cont.getSecurityLogs);
// Get failed login attempts
routes_admin.get('/security/failed-logins', jwt_auth, Only_Admin, Admin_cont.getFailedLoginAttempts);
// Block IP address
routes_admin.post('/security/block-ip', jwt_auth, Only_Admin, Admin_cont.blockIpAddress);
// Unblock IP address
routes_admin.delete('/security/unblock-ip/:ip', jwt_auth, Only_Admin, Admin_cont.unblockIpAddress);
// Get active sessions
routes_admin.get('/security/active-sessions', jwt_auth, Only_Admin, Admin_cont.getActiveSessions);
// Terminate session
routes_admin.delete('/security/terminate-session/:sessionId', jwt_auth, Only_Admin, Admin_cont.terminateSession);

// =================== BACKUP & RECOVERY ROUTES ===================
// Create backup
routes_admin.post('/backup/create', jwt_auth, Only_Admin, Admin_cont.createBackup);
// Get backup list
routes_admin.get('/backup/list', jwt_auth, Only_Admin, Admin_cont.getBackupList);
// Restore from backup
routes_admin.post('/backup/restore/:backupId', jwt_auth, Only_Admin, Admin_cont.restoreFromBackup);
// Delete backup
routes_admin.delete('/backup/:backupId', jwt_auth, Only_Admin, Admin_cont.deleteBackup);
// Download backup
routes_admin.get('/backup/download/:backupId', jwt_auth, Only_Admin, Admin_cont.downloadBackup);
*/
module.exports = routes_admin;