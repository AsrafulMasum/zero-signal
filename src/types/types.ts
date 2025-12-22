interface MonthlyStats {
    month: string;
    newUsers: number;
    totalUsers: number;
    newSubscriptions: number;
    totalSubscriptions: number;
    monthlyEarning: number;
}

export interface IAnalatycs {
    year: number;
    totalUsers: number;
    totalBookings: number;
    totalEarning: number;
    totalSubscriptions: number;
    monthlyData: MonthlyStats[];
}

export interface IUser {
    _id: string;
    name: string;
    profilePic: string | null;
    isVerifiedHost: boolean;
    email: string;
    contact: string;
    address: string;
    connectedAccountId: string | null;
    stripeConnectedLink: string | null;
    dateOfBirth: string; // ISO string (e.g., "2003-09-11T18:00:00.000Z")
    images: string[];
    status: 'active' | 'inactive' | string;
    role: 'guest' | 'host' | 'admin' | string;
    verified: boolean;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    airlineVerification: string | null;
}

export interface IPagination {
    total: number;
    limit: number;
    page: number;
    totalPage: number;
}

export interface IFacility {
    _id: string;
    name: string;
    logo: string;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
}

export interface IPackage {
    _id: string;
    title: string;
    price: number;
    billingCycle: string; // e.g. "add-on"
    description: string;
    features: string[];
    active: boolean;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    __v: number;
}

export interface IReview {
    _id: string;
    hotel: string;
    content: string;
    user: {
        _id: string;
        name: string;
        email: string;
        id: string;
    };
    rating: number;
    isVisible: boolean;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    __v: number;
}

export interface INotification {
    _id: string;
    title: string;
    refId: string;
    path: string;
    message: string;
    seen: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
    receiver: string;
}

export interface Order {
    email: string;
    key: string;
    orderNumber: string;
    customerName: string;
    chefName: string;
    itemCount: number;
    city: string;
    price: number;
    revenue: number;
    orderData: string;
    deliveryStatus: 'pending' | 'completed' | 'cancelled' | 'delivered';
    status: 'active' | 'inactive';
    productImage: string;
}

export interface WaitingListTypes {
    key: string;
    customerName: string;
    city: string;
    zipCode: string;
    email: string;
    contact: string;
}

export interface User {
    key: string;
    serialId?: string;
    userName?: string;
    email?: string;
    city?: string;
    country?: string;
    createdAt?: string;
    address?: string;
    userType?: String;
    role?: String;
    status?: 'Active' | 'Inactive' | String;
}

export interface DriverTypes {
    key: string;
    serialId: string;
    userName: string;
    email: string;
    address: string;
    city: string;
    vehicleType: string;
    licenseNo: string;
    files: string; // could be a filename or short label like "3 files uploaded"
    status: 'active' | 'inactive';
}

export interface ChefsTypes {
    serialId?: string;
    userName?: string;
    name?: string;
    email: string;
    address: string;
    city?: string;
    createdAt?: string;
    totalOrder?: number;
    revenue?: number;
    status: string;
    cuisineType?: string;
    certificate?: string;
}

export interface CategoryTypes {
    key: string;
    categoryName: string;
    totalDishes: number;
    city: string;
    deliveryStatus: 'active' | 'inactive';
}

export interface ReviewTypes {
    key: string;
    customerName: string;
    chefName: string;
    dishName: string;
    rating: number;
    city: string;
    reviewText: string;
    createdAt: string;
    status: string;
}

export interface RefundType {
    key: string;
    orderNumber: string;
    customerName: string;
    chefName: string;
    refundType: string;
    paidAmount: string;
    refundPercentage: string;
    reason: string;
    deliveryStatus: 'Approved' | 'Pending' | 'Rejected';
    refundPercent: number;
    amount: string;
}

export interface TransactionTypes {
    key: string;
    transactionID: string;
    name: string;
    email: string;
    city: string;
    date: string;
    totalSales?: string;
    totalDeliveries?: number;
    totalOrders?: number;
    payment?: string;
    income?: string;
    revenue: string;
    deliveryStatus: 'Approved' | 'Pending' | 'Rejected';
}

export type StatusType = 'active' | 'inactive';
export type ActiveTab = 'region' | 'city';

export type RegionType = {
    key: string;
    regionName: string;
    totalCity: number;
    status: StatusType;
};

export type CityType = {
    key: string;
    regionName: string;
    cityName: string;
    status: StatusType;
};

export interface LockerType {
    _id?: string;
    lockerID: string;
    name: string;
    lockerLocation: string;
    capacity: number;
    price?: number;
    lastActivity: string;
    deliveryStatus: 'active' | 'maintenance' | 'offline';
}
