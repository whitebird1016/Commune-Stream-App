export const appointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2023, 6, 25, 12, 35),
    endDate: new Date(2023, 6, 25, 15, 0),
    id: 0,
    members: [1, 3, 5],
    location: "Room 1",
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2023, 6, 26, 12, 35),
    endDate: new Date(2023, 6, 26, 15, 0),
    id: 1,
    members: [2, 4],
    location: "Room 2",
  },
  {
    title: "Install New Router in Dev Room",
    startDate: new Date(2023, 6, 27, 12, 35),
    endDate: new Date(2023, 6, 27, 15, 0),
    id: 2,
    members: [3],
    location: "Room 3",
  },
  {
    title: "Approve Personal Computer Upgrade Plan",
    startDate: new Date(2023, 6, 28, 12, 35),
    endDate: new Date(2023, 6, 28, 15, 0),
    id: 3,
    members: [4, 1],
    location: "Room 4",
  },
  {
    title: "Final Budget Review",
    startDate: new Date(2023, 6, 29, 12, 35),
    endDate: new Date(2023, 6, 29, 15, 0),
    id: 4,
    members: [5, 1, 3],
    location: "Room 5",
  },
];

export const resources = [
  {
    fieldName: "members",
    title: "Members",
    allowMultiple: true,
    instances: [
      { id: 1, text: "Andrew Glover" },
      { id: 2, text: "Arnie Schwartz" },
      { id: 3, text: "John Heart" },
      { id: 4, text: "Taylor Riley" },
      { id: 5, text: "Brad Farkus" },
    ],
  },
];
