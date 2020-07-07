import NoImage from "../assets/noImage.png";

export const SITETITTLE = "Taskprox";
export const USERTOKEN = "rr_token";
export const USERDATA = "rr_user";

// cookies
export const USERDETAILS = "USERDETAILS";
export const USERROLE = "USERROLE";
export const FrontEndUrl = "https://staging.realtyprox.co";

export const primaryColor = "#1CA0D7";
export const secondaryColor = "#f18910";
export const noImage = NoImage;

export const durationSelector = [
  { title: "yearly", value: "yearly" },
  { title: "monthly", value: "monthly" },
  { title: "weekly", value: "weekly" },
  { title: "daily", value: "daily" },
  { title: "one off", value: "one_off" },
];

export const salaryRangeSelector = [
  { title: "50,000 - 100,000", value: "50000-100000" },
  { title: "100,000 - 200,000", value: "100000-200000" },
  { title: "200,000 - 500,000", value: "200000-500000" },
  { title: "500,000 - 1,000,000", value: "500000-1000000" },
  { title: "Above 1,000,000", value: "1000000-10000000" },
];

export const genderOptions = [
  { title: "male", value: "male" },
  { title: "female", value: "female" },
  { title: "prefer not to say", value: "prefer_not_to_say" },
];

export const propertySortOptions = [
  { title: "All", value: "" },
  { title: "Date - newest", value: "desc" },
  { title: "Date - oldest", value: "asc" },
  { title: "Price - highest", value: "high" },
  { title: "Price - lowest", value: "low" },
];

export const maritalStatusOption = [
  { title: "married", value: "married" },
  { title: "single", value: "single" },
  { title: "divorced", value: "divorced" },
];

export const countryCode = [
  { title: "+234", value: "234" },
  { title: "+41", value: "41" },
  { title: "+111", value: "111" },
];

export const sizeOptions = [
  { title: "SQM", value: "sqm" },
  { title: "SQFT", value: "sqft" },
];

export const currencyOptions = [
  { title: "NGN", value: "NGN" },
  { title: "USD", value: "USD" },
  { title: "GBP", value: "GBP" },
];

export const termList = [
  { title: "Percentage (%)", value: "percentage" },
  { title: "Flat Rate", value: "flat_rate" },
];

export const propertyStatusOption = [
  { title: "All", value: "" },
  { title: "Sold", value: "sold" },
  { title: "Rented", value: "rented" },
  { title: "Pending", value: "pending" },
  { title: "Published", value: "published" },
  { title: "Unpublished", value: "unpublished" },
];

export const leaseSortOptions = [
  { title: "All", value: "" },
  { title: "Pending", value: "pending" },
  { title: "Ready", value: "ready" },
  { title: "Active", value: "active" },
  { title: "Canceled", value: "canceled" },
  { title: "Archived", value: "archived" },
];

export const leaseChargeSortOptions = [
  { title: "All", value: "" },
  { title: "Pending", value: "pending" },
  { title: "Paid", value: "paid" },
  { title: "failed", value: "failed" },
];

export const inspectionSortOptions = [
  { title: "All", value: "" },
  { title: "Pending", value: "pending" },
  { title: "Completed", value: "completed" },
  { title: "Failed", value: "failed" },
];

export const applicationSortOptions = [
  { title: "All", value: "" },
  { title: "Pending", value: "pending" },
  { title: "Accepted", value: "accepted" },
  { title: "Rejected", value: "rejected" },
];

export const transactionSortOptions = [
  { title: "All", value: "" },
  { title: "Pending", value: "pending" },
  { title: "Success", value: "success" },
  { title: "Failed", value: "failed" },
  { title: "Abandoned", value: "Abandoned" },
];

export const inspectionAvailabilityOption = [
  { title: "Always available", value: "always_available" },
  {
    title: "Available within a specific period",
    value: "available_on_some_days",
  },
  { title: "Never available", value: "never_available" },
];

export const timeSortOption = [
  { title: "All", value: "" },
  { title: "Newest first", value: "desc" },
  { title: "Oldest first", value: "asc" },
];

export const getNoImage = () => NoImage;

export const maxPercent = 10;
export const minPercent = 5;
export const rentrightPercent = 25;
export const loginUrl = "https://staging.realtyprox.co/login";
