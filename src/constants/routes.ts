export const Routes = {
  // Auth
  Splash: 'Splash',
  Onboarding: 'Onboarding',
  ChurchSelection: 'ChurchSelection',
  Login: 'Login',
  Register: 'Register',
  OTPVerification: 'OTPVerification',
  ForgotPassword: 'ForgotPassword',

  // Main Tabs
  Home: 'Home',
  MassTab: 'MassTab',
  BibleTab: 'BibleTab',
  GiveTab: 'GiveTab',
  ProfileTab: 'ProfileTab',

  // Mass
  MassHome: 'MassHome',
  LiveMass: 'LiveMass',
  RecordedMass: 'RecordedMass',
  MassTimings: 'MassTimings',
  MassCalendar: 'MassCalendar',

  // Bible
  BibleHome: 'BibleHome',
  BibleReader: 'BibleReader',
  DailyReading: 'DailyReading',
  Bookmarks: 'Bookmarks',
  BibleNotes: 'BibleNotes',

  // Donation
  DonationHome: 'DonationHome',
  MakeOffering: 'MakeOffering',
  Subscription: 'Subscription',
  DonationHistory: 'DonationHistory',
  DonationReceipt: 'DonationReceipt',

  // Family
  FamilyCard: 'FamilyCard',
  Members: 'Members',
  AddMember: 'AddMember',
  Certificates: 'Certificates',
  CertificateRequest: 'CertificateRequest',

  // Notifications
  Notifications: 'Notifications',

  // Drawer
  Community: 'Community',
  YouthClub: 'YouthClub',
  WomensClub: 'WomensClub',
  WidowSupport: 'WidowSupport',
  ChildrenScholarship: 'ChildrenScholarship',
  Gallery: 'Gallery',
  Volunteers: 'Volunteers',
  Jobs: 'Jobs',
  ChurchTransfer: 'ChurchTransfer',
  Announcements: 'Announcements',
  Contact: 'Contact',

  // Profile
  Profile: 'Profile',
  Settings: 'Settings',
  Language: 'Language',

  // Admin
  AdminDashboard: 'AdminDashboard',
  AdminMass: 'AdminMass',
  AdminFamilies: 'AdminFamilies',
  AdminDonations: 'AdminDonations',
  AdminCertificates: 'AdminCertificates',
  AdminTransfers: 'AdminTransfers',
  AdminAnnouncements: 'AdminAnnouncements',
} as const;

export type RouteNames = typeof Routes[keyof typeof Routes];
