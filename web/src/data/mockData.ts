import { ScrapRate, Pickup, GarbageTiming, Notification, Kabadiwala, DashboardStats, Locality, Payment, Complaint } from '@/types';

export const scrapRates: ScrapRate[] = [
  { id: '1', category: 'plastic', nameEn: 'Plastic', nameHi: 'प्लास्टिक', rate: 15, unit: 'kg', icon: 'Package', updatedAt: '2024-01-14T10:00:00Z' },
  { id: '2', category: 'paper', nameEn: 'Paper/Cardboard', nameHi: 'कागज/गत्ता', rate: 12, unit: 'kg', icon: 'FileText', updatedAt: '2024-01-14T10:00:00Z' },
  { id: '3', category: 'metal', nameEn: 'Metal/Iron', nameHi: 'धातु/लोहा', rate: 35, unit: 'kg', icon: 'Wrench', updatedAt: '2024-01-14T10:00:00Z' },
  { id: '4', category: 'glass', nameEn: 'Glass Bottles', nameHi: 'कांच की बोतलें', rate: 5, unit: 'kg', icon: 'Wine', updatedAt: '2024-01-14T10:00:00Z' },
  { id: '5', category: 'electronics', nameEn: 'E-Waste', nameHi: 'ई-कचरा', rate: 50, unit: 'kg', icon: 'Smartphone', updatedAt: '2024-01-14T10:00:00Z' },
  { id: '6', category: 'clothes', nameEn: 'Old Clothes', nameHi: 'पुराने कपड़े', rate: 8, unit: 'kg', icon: 'Shirt', updatedAt: '2024-01-14T10:00:00Z' },
];

export const pickups: Pickup[] = [
  {
    id: 'PU001',
    citizenId: 'c1',
    citizenName: 'Rahul Sharma',
    citizenPhone: '9876543210',
    kabadiWalaId: 'k1',
    kabadiWalaName: 'Raju Kumar',
    categories: ['plastic', 'paper'],
    scheduledDate: '2024-01-15',
    scheduledTime: '10:00 AM - 12:00 PM',
    address: '123, 4th Cross, Koramangala',
    locality: 'Koramangala',
    pincode: '560034',
    status: 'scheduled',
    createdAt: '2024-01-14T08:00:00Z',
  },
  {
    id: 'PU002',
    citizenId: 'c1',
    citizenName: 'Rahul Sharma',
    citizenPhone: '9876543210',
    kabadiWalaId: 'k1',
    kabadiWalaName: 'Raju Kumar',
    categories: ['metal', 'electronics'],
    scheduledDate: '2024-01-12',
    address: '123, 4th Cross, Koramangala',
    locality: 'Koramangala',
    pincode: '560034',
    status: 'completed',
    weight: 15,
    amount: 525,
    completedAt: '2024-01-12T11:30:00Z',
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'PU003',
    citizenId: 'c2',
    citizenName: 'Priya Patel',
    citizenPhone: '9876543213',
    categories: ['paper', 'clothes'],
    scheduledDate: '2024-01-15',
    address: '45, MG Road',
    locality: 'Indiranagar',
    pincode: '560038',
    status: 'scheduled',
    createdAt: '2024-01-14T09:00:00Z',
  },
  {
    id: 'PU004',
    citizenId: 'c3',
    citizenName: 'Amit Singh',
    citizenPhone: '9876543214',
    kabadiWalaId: 'k1',
    kabadiWalaName: 'Raju Kumar',
    categories: ['glass', 'plastic'],
    scheduledDate: '2024-01-15',
    scheduledTime: '2:00 PM - 4:00 PM',
    address: '78, 12th Main, HSR Layout',
    locality: 'HSR Layout',
    pincode: '560102',
    status: 'assigned',
    createdAt: '2024-01-13T14:00:00Z',
  },
];

export const garbageTimings: GarbageTiming[] = [
  { id: '1', locality: 'Koramangala', pincode: '560034', day: 'Monday', startTime: '7:00 AM', endTime: '9:00 AM', vehicleNumber: 'KA01AB1234' },
  { id: '2', locality: 'Koramangala', pincode: '560034', day: 'Wednesday', startTime: '7:00 AM', endTime: '9:00 AM', vehicleNumber: 'KA01AB1234' },
  { id: '3', locality: 'Koramangala', pincode: '560034', day: 'Friday', startTime: '7:00 AM', endTime: '9:00 AM', vehicleNumber: 'KA01AB1234' },
  { id: '4', locality: 'Indiranagar', pincode: '560038', day: 'Tuesday', startTime: '8:00 AM', endTime: '10:00 AM' },
  { id: '5', locality: 'Indiranagar', pincode: '560038', day: 'Thursday', startTime: '8:00 AM', endTime: '10:00 AM' },
  { id: '6', locality: 'Indiranagar', pincode: '560038', day: 'Saturday', startTime: '8:00 AM', endTime: '10:00 AM' },
];

export const notifications: Notification[] = [
  { id: '1', userId: 'c1', title: 'Pickup Scheduled', message: 'Your pickup for tomorrow has been confirmed. Raju Kumar will collect.', type: 'pickup', read: false, createdAt: '2024-01-14T08:30:00Z' },
  { id: '2', userId: 'c1', title: 'Payment Received', message: 'Payment of ₹525 for pickup PU002 has been credited.', type: 'payment', read: true, createdAt: '2024-01-12T12:00:00Z' },
  { id: '3', userId: 'c1', title: 'Rates Updated', message: 'Plastic rates have been updated to ₹15/kg.', type: 'general', read: true, createdAt: '2024-01-10T10:00:00Z' },
];

export const kabadiwalas: Kabadiwala[] = [
  { id: 'k1', name: 'Raju Kumar', phone: '9876543211', localities: ['Koramangala', 'HSR Layout'], trustScore: 4.8, totalPickups: 234, todayPickups: 5, todayEarnings: 1250, status: 'active' },
  { id: 'k2', name: 'Suresh Yadav', phone: '9876543215', localities: ['Indiranagar', 'Domlur'], trustScore: 4.5, totalPickups: 189, todayPickups: 3, todayEarnings: 890, status: 'active' },
  { id: 'k3', name: 'Mohammad Ali', phone: '9876543216', localities: ['Whitefield', 'Marathahalli'], trustScore: 4.9, totalPickups: 312, todayPickups: 7, todayEarnings: 1850, status: 'active' },
];

export const localities: Locality[] = [
  { id: '1', name: 'Koramangala', pincode: '560034', zone: 'South', isActive: true },
  { id: '2', name: 'Indiranagar', pincode: '560038', zone: 'East', isActive: true },
  { id: '3', name: 'HSR Layout', pincode: '560102', zone: 'South', isActive: true },
  { id: '4', name: 'Whitefield', pincode: '560066', zone: 'East', isActive: true },
  { id: '5', name: 'Marathahalli', pincode: '560037', zone: 'East', isActive: true },
  { id: '6', name: 'JP Nagar', pincode: '560078', zone: 'South', isActive: true },
  { id: '7', name: 'Jayanagar', pincode: '560041', zone: 'South', isActive: true },
  { id: '8', name: 'Electronic City', pincode: '560100', zone: 'South', isActive: false },
];

export const payments: Payment[] = [
  { id: 'pay1', pickupId: 'PU002', amount: 525, status: 'paid', upiReference: 'UPI123456', paidAt: '2024-01-12T12:00:00Z' },
  { id: 'pay2', pickupId: 'PU001', amount: 0, status: 'pending' },
];

export const complaints: Complaint[] = [
  { id: 'comp1', userId: 'c1', userName: 'Rahul Sharma', pickupId: 'PU002', kabadiWalaId: 'k1', category: 'Late Pickup', description: 'Collector arrived 2 hours late', status: 'resolved', createdAt: '2024-01-11T15:00:00Z', resolvedAt: '2024-01-12T10:00:00Z' },
  { id: 'comp2', userId: 'c2', userName: 'Priya Patel', category: 'Wrong Rate', description: 'Charged less than displayed rate for paper', status: 'open', createdAt: '2024-01-14T08:00:00Z' },
];

export const dashboardStats: DashboardStats = {
  totalPickups: 1247,
  completedPickups: 1189,
  pendingPickups: 58,
  totalEarnings: 234500,
  activeKabadiwalas: 15,
  landfillDiverted: 4.2, // in tons
};
