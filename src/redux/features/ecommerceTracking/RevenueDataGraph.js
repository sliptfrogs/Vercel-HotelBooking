import numeral from "numeral";
export const TableSaleAnalysis =[
    {
      month:'Jan',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'Feb',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(75000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'Mar',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'Apr',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'May',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'Jun',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'Jul',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'Aug',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'Sep',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'Oct',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'Nov',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
    {
      month:'Dec',
      profit: numeral(1500).format("0.0a"),
      revenue: numeral(25000).format("0.0a"),
      expenses: numeral(3500).format("0.0a")
    },
  ]
export const SaleRankingData = [
    { name: "Daun Penh", branch: 590, pv: 800, amt: 1400 },
    { name: "Keo Penh", branch: 520, pv: 400, amt: 1300 },
    { name: "Chamkarmon", branch: 868, pv: 967, amt: 1506 },
    { name: "7 Makara", branch: 1397, pv: 1098, amt: 989 },
    { name: "Chroy Changvar", branch: 1480, pv: 1200, amt: 1228 },
    { name: "Dangkor", branch: 1520, pv: 1108, amt: 1100 },
    { name: "Prek Pnov", branch: 1400, pv: 680, amt: 1700 },
    { name: "Toul Kork", branch: 1200, pv: 950, amt: 1350 },
    { name: "Russey Keo", branch: 1300, pv: 800, amt: 1450 },
    { name: "Sen Sok", branch: 1100, pv: 900, amt: 1300 },
    { name: "Mean Chey", branch: 1000, pv: 700, amt: 1250 },
  ];
export const SaleAnalysisData = [
  { month: "Jan", revenue: 1210, profit: 510, expenses: 700 },
  { month: "Feb", revenue: 1510, profit: 610, expenses: 900 },
  { month: "Mar", revenue: 1710, profit: 710, expenses: 1000 },
  { month: "Apr", revenue: 1410, profit: 510, expenses: 900 },
  { month: "May", revenue: 2010, profit: 810, expenses: 1200 },
  { month: "Jun", revenue: 1810, profit: 710, expenses: 1100 },
  { month: "Jul", revenue: 2210, profit: 910, expenses: 1300 },
  { month: "Aug", revenue: 2410, profit: 1010, expenses: 1400 },
  { month: "Sep", revenue: 1910, profit: 810, expenses: 1100 },
  { month: "Oct", revenue: 2510, profit: 1110, expenses: 1400 },
  { month: "Nov", revenue: 2310, profit: 1010, expenses: 1300 },
  { month: "Dec", revenue: 1710, profit: 1510, expenses: 1500 },
];

/* {Data of Dashboard} */
export const dataAsMonth = {
  labels: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ], // X-axis labels
  datasets: [
    {
      label: 'Visitor', // Line label
      data: [20, 39, 80, 81, 56, 55, 40, 47, 85, 10, 17, 39], // Y-axis data points
      fill: false, // Do not fill the area under the line
      borderColor: '#3bd949', // Line color
      tension: 0.4, // Smoothness of the line
    },
    {
      label: 'Sales Over Time', // Line label
      data: [65, 69, 80, 7, 56, 25, 40, 47, 25, 30, 17, 39], // Y-axis data points
      fill: false, // Do not fill the area under the line
      borderColor: '#ff0017', // Line color
      tension: 0.4, // Smoothness of the line
    },
    {
      label: 'Revenue', // Line label
      data: [25, 59, 40, 7, 56, 25, 80, 47, 25, 60, 17, 49], // Y-axis data points
      fill: false, // Do not fill the area under the line
      borderColor: '#ffd500', 
      tension: 0.4, // Smoothness of the line
    }
  ],
};
export const dataAsWeek = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], // X-axis labels
  datasets: [
    {
      label: 'Visitor',
      data: [120, 150, 180, 170, 200, 210, 190],
      fill: false,
      borderColor: '#3bd949',
      tension: 0.4,
    },
    {
      label: 'Sales Over Time',
      data: [65, 80, 95, 100, 110, 130, 90],
      fill: false,
      borderColor: '#ff0017',
      tension: 0.4,
    },
    {
      label: 'Revenue',
      data: [50, 70, 60, 90, 100, 85, 75],
      fill: false,
      borderColor: '#ffd500',
      tension: 0.4,
    }
  ],
};

export const dataAsYear = {
  labels: ["2019", "2020", "2021", "2022", "2023"], // X-axis labels
  datasets: [
    {
      label: 'Visitor',
      data: [5000, 7000, 8000, 8500, 9000],
      fill: false,
      borderColor: '#3bd949',
      tension: 0.4,
    },
    {
      label: 'Sales Over Time',
      data: [1500, 2000, 1800, 2100, 2300],
      fill: false,
      borderColor: '#ff0017',
      tension: 0.4,
    },
    {
      label: 'Revenue',
      data: [30000, 40000, 38000, 45000, 47000],
      fill: false,
      borderColor: '#ffd500',
      tension: 0.4,
    }
  ],
};
export const dataAsDay = {
  labels: [
    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
  ], // X-axis labels
  datasets: [
    {
      label: 'Visitor',
      data: [5, 10, 15, 7, 9, 10, 25, 50, 45, 60, 55, 50, 70, 85, 90, 75, 60, 55, 40, 35, 30, 20, 10, 5],
      fill: false,
      borderColor: '#3bd949',
      tension: 0.7,
    },
    {
      label: 'Sales Over Time',
      data: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 25, 20, 30, 35, 40, 30, 20, 15, 10, 8, 5, 3, 2, 1],
      fill: false,
      borderColor: '#ff0017',
      tension: 0.7,
    },
    {
      label: 'Revenue',
      data: [10, 20, 15, 12, 18, 22, 30, 40, 45, 55, 60, 50, 70, 75, 65, 55, 50, 45, 30, 25, 20, 15, 10, 8],
      fill: false,
      borderColor: '#ffd500',
      tension: 0.7,
    }
  ],
};

export const TableOrderList= [
  
]
