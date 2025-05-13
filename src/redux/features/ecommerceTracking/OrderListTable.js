import {hashParam} from '../../../../src/Admin/components/common/password/passwordGenerator.js'
export const OrderList = [
    {
      orderId: '125ff3',
      orderDate: '14/12/2022',
      customer: {
        title: 'Chris',
        url: 'https://preview.redd.it/hyds8edfnty11.jpg?width=640&crop=smart&auto=webp&s=6ced1fb004974fb55311eb1b5e46834dff60be52',
      },
      paymentStatus: {
        title: 'pending',
        color: 'yellow-300',
      },
      total: 2000,
      delivery: 'N/A',
      orderQtyItem: 3,
      fulfilment: {
        title: 'unfulfilled',
        color: 'red-500',
      },
      location: '128.01.12',
    },
    {
      orderId: '14fg5ff3',
      orderDate: '15/12/2022',
      customer: {
        title: 'Peter',
        url: 'https://images.immediate.co.uk/production/volatile/sites/3/2023/12/radio-times-fotnite-peter-griffin-5045a9b.jpg?quality=90&resize=980,654',
      },
      paymentStatus: {
        title: 'cancelled',
        color: 'red-500',
      },
      total: 1000,
      delivery: 'N/A',
      orderQtyItem: 1,
      fulfilment: {
        title: 'unfulfilled',
        color: 'red-500',
      },
      location: '129.01.12',
    },
    {
      orderId: '24yt5ff3',
      orderDate: '16/12/2022',
      customer: {
        title: 'Meg',
        url: 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Meg-Griffin.Family-Guy.webp',
      },
      paymentStatus: {
        title: 'paid',
        color: 'green-500',
      },
      total: 3000,
      delivery: 'Standard',
      orderQtyItem: 2,
      fulfilment: {
        title: 'fulfilled',
        color: 'green-500',
      },
      location: '130.01.12',
    },
    {
      orderId: '58jt3er5',
      orderDate: '17/12/2022',
      customer: {
        title: 'Lois',
        url: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/075849e1-b49e-48a4-a618-fa449dbef6e4/width=450/00001-3528304317.jpeg',
      },
      paymentStatus: {
        title: 'pending',
        color: 'yellow-300',
      },
      total: 2500,
      delivery: 'Express',
      orderQtyItem: 4,
      fulfilment: {
        title: 'in-progress',
        color: 'blue-400',
      },
      location: '131.01.12',
    },
    {
      orderId: '62lt9fh3',
      orderDate: '18/12/2022',
      customer: {
        title: 'Brian',
        url: 'https://i.cbc.ca/1.2439270.1385396617!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/family-guy-brian-from-fox.jpg',
      },
      paymentStatus: {
        title: 'paid',
        color: 'green-500',
      },
      total: 1200,
      delivery: 'Standard',
      orderQtyItem: 1,
      fulfilment: {
        title: 'fulfilled',
        color: 'green-500',
      },
      location: '132.01.12',
    },
    {
      orderId: '72ht7yj4',
      orderDate: '19/12/2022',
      customer: {
        title: 'Stewie',
        url: 'https://i.etsystatic.com/26158159/r/il/a1d98a/3488450865/il_fullxfull.3488450865_b950.jpg',
      },
      paymentStatus: {
        title: 'pending',
        color: 'yellow-300',
      },
      total: 4000,
      delivery: 'N/A',
      orderQtyItem: 5,
      fulfilment: {
        title: 'unfulfilled',
        color: 'red-500',
      },
      location: '133.01.12',
    },
    {
      orderId: '84ut5jt8',
      orderDate: '20/12/2022',
      customer: {
        title: 'Quagmire',
        url: 'https://cdns-images.dzcdn.net/images/cover/7b94be53374b7142674d780e9726a139/0x1900-000000-80-0-0.jpg',
      },
      paymentStatus: {
        title: 'paid',
        color: 'green-500',
      },
      total: 1800,
      delivery: 'Standard',
      orderQtyItem: 2,
      fulfilment: {
        title: 'fulfilled',
        color: 'green-500',
      },
      location: '134.01.12',
    },
    {
      orderId: '94pt6wt9',
      orderDate: '21/12/2022',
      customer: {
        title: 'Joe',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV6G0MPARIwG5MFkoRl58OalfDevWoQrdKzg&s',
      },
      paymentStatus: {
        title: 'cancelled',
        color: 'red-500',
      },
      total: 2200,
      delivery: 'Express',
      orderQtyItem: 3,
      fulfilment: {
        title: 'unfulfilled',
        color: 'red-500',
      },
      location: '135.01.12',
    },
    // Continue generating objects for the remaining orders up to 20.
  ];
export const sortOrder=[
    {   
        id:1,
        title:'all',
        url:'/admin/list-booking/all'
    },
    {
        id:2,
        title:'confirmed',
        url:'/admin/list-booking/confirmed'
    },
    {   
        id:3,
        title:'pending',
        url:'/admin/list-booking/pending'
    },
    {
        id:4,
        title:'expired',
        url:'/admin/list-booking/expired'
    },
    {
        id:5,
        title:'cancelled',
        url:'/admin/list-booking/cancelled'
    },
]

export const sortApprove=[
    {   
        id:1,
        title:'all',
        sort:'all',
        url:'/admin/draft'
    },
    {
        id:2,
        title:'*fulfilled',
        sort:'fulfilled',
        url:'/admin/draft/fulfilled'
    },
    {  
        id:3,
        title:'*unfulfilled',
        sort:'unfulfilled',
        url:'/admin/draft/unfulfilled'
    },
]
export const sortCompleteProduct=[
    {   
        id:1,
        title:'Total',
        sort:'total',
        url:'/admin/view-room/total'
    },
    {
        id:2,
        title:'Available',
        sort:'available',
        url:'/admin/view-room/available'
    },
    {  
        id:3,
        title:'Occupied',
        sort:'occupied',
        url:'/admin/view-room/occupied'
    },
    {  
        id:4,
        title:'Maintenance',
        sort:'maintenance',
        url:'/admin/view-room/maintenance'
    },
    {  
        id:5,
        title:'Closed',
        sort:'closed',
        url:'/admin/view-room/closed'
    },
]
export const sortCategory=[
    {   
        id:1,
        title:'all',
        url:'/admin/view-hotel/all'
    },
    {
        id:2,
        title:'active',
        url:'/admin/view-hotel/active'
    },
    {   
        id:3,
        title:'inactive',
        url:'/admin/view-hotel/inactive'
    },
]


export const productTags=[
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'Yiminghe',
    label: 'yiminghe',
  },
]
  