  export const userData: User[] = [
    {
      key: '1',
      serialId: '#01',
      userName: 'Omar Yusuf',
      email: 'omar@gmail.com',
      contactNumber: '(406) 555-0120',
      subscription: 'Monthly',
      status:"active"
    },
    {
      key: '2',
      serialId: '#02',
      userName: 'Nikolai Ivanovich',
      email: 'nikolai@gmail.com',
      contactNumber: '(603) 555-0123',
      subscription: 'Yearly',
      status:"delete"
    },
    {
      key: '3',
      serialId: '#03',
      userName: 'Brooklyn Simmons',
      email: 'brooklyn@gmail.com',
      contactNumber: '(316) 555-0116',
      subscription: 'Monthly',
      status:"active"
    },
    {
      key: '4',
      serialId: '#04',
      userName: 'Brooklyn Simmons',
      email: 'brooklyn@gmail.com',
      contactNumber: '(316) 555-0116',
      subscription: 'Monthly',
      status:"active"
    },
    {
      key: '5',
      serialId: '#05',
      userName: 'Brooklyn Simmons',
      email: 'brooklyn@gmail.com',
      contactNumber: '(316) 555-0116',
      subscription: 'Monthly',
      status:"active"
    },
    {
      key: '6',
      serialId: '#06',
      userName: 'Omar Yusuf',
      email: 'omar@gmail.com',
      contactNumber: '(406) 555-0120',
      subscription: 'Monthly',
      status:"active"
    },
    {
      key: '7',
      serialId: '#07',
      userName: 'Nikolai Ivanovich',
      email: 'nikolai@gmail.com',
      contactNumber: '(603) 555-0123',
      subscription: 'Yearly',
      status:"delete"
    },
    {
      key: '8',
      serialId: '#08',
      userName: 'Brooklyn Simmons',
      email: 'brooklyn@gmail.com',
      contactNumber: '(316) 555-0116',
      subscription: 'Monthly',
      status:"active"
    },
    {
      key: '9',
      serialId: '#09',
      userName: 'Brooklyn Simmons',
      email: 'brooklyn@gmail.com',
      contactNumber: '(316) 555-0116',
      subscription: 'Monthly',
      status:"active"
    },
    {
      key: '10',
      serialId: '#10',
      userName: 'Brooklyn Simmons',
      email: 'brooklyn@gmail.com',
      contactNumber: '(316) 555-0116',
      subscription: 'Monthly',
      status:"active"
    },
  ];
export  interface User {
  key: string;
  serialId: string;
  userName: string;
  email: string;
  contactNumber: string;
  subscription: string;
  status?:"active"|"delete"
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}