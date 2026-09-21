// Everything about the restaurant lives in this one file.
// Change a number here and the whole site follows — no hunting through components.

export const RESTAURANT = {
  name: 'Baga',
  tagline: 'Charcoal grill & Filipino kitchen',
  city: 'General Trias, Cavite',
  email: 'reservations@baga.example', // ".example" is a reserved, fake domain

  closedWeekday: 1, // 0 = Sunday, 1 = Monday, ... 6 = Saturday (same as JavaScript's getDay())
  bookingWindowDays: 21, // guests can book up to 3 weeks ahead
  maxPartyOnline: 10, // bigger groups are asked to email us instead
  seatsPerSlot: 24, // how many guests we can seat in one time slot
  leadTimeMinutes: 60, // a slot must start at least 1 hour from now to be bookable
  holdMinutes: 15, // how long we keep a table for late guests
}

// Two services a day. Each time is the start of a seating.
export const SERVICES = [
  {
    id: 'lunch',
    label: 'Lunch',
    hours: '11:00 AM – 2:30 PM',
    times: ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
  },
  {
    id: 'dinner',
    label: 'Dinner',
    hours: '5:00 PM – 9:30 PM',
    times: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'],
  },
]

export const OCCASIONS = [
  'None',
  'Birthday',
  'Anniversary',
  'Date night',
  'Business meal',
  'Family gathering',
]

export const MENU_HIGHLIGHTS = [
  {
    name: 'Liempo sa Baga',
    description: 'Pork belly marinated overnight in calamansi, garlic and soy, then grilled over live coals.',
    price: 420,
  },
  {
    name: 'Inihaw na Pusit',
    description: 'Whole squid stuffed with tomato and onion, charred and brushed with atsuete butter.',
    price: 480,
  },
  {
    name: 'Chicken Inasal',
    description: 'Leg quarter basted with lemongrass, annatto oil and coconut vinegar.',
    price: 350,
  },
  {
    name: 'Ensaladang Talong',
    description: 'Smoky grilled eggplant with salted egg, tomato and a spoon of bagoong.',
    price: 220,
  },
]
