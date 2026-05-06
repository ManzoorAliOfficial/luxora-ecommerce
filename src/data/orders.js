export const ORDERS = [
  {
    id: "LX-001234",
    date: "2024-05-01",
    status: "Delivered",
    total: 299.99,
    items: [
      { id: 1, name: "Luxury Handbag", quantity: 1, price: 149.99 },
      { id: 2, name: "Minimal Watch", quantity: 1, price: 129.99 },
    ],
    shipping: {
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
  },
  {
    id: "LX-001235",
    date: "2024-05-03",
    status: "Processing",
    total: 149.50,
    items: [
      { id: 3, name: "Classic White Sneakers", quantity: 1, price: 89.99 },
    ],
    shipping: {
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
  },
];
