// this file is just create documents in mongodb
db.locations.save({
  name: 'Starcups',
  address: '125 High Street, Reading, RG6 1PS',
  rating: 3,
  facilities: ['Hot drinks', 'Food', 'Premium wifi'],
  coords: [-0.9690884, 51.455041],
  openingTimes: [{
    days: 'Monday - Friday',
    opening: '7:00am',
    closing: '7:00pm',
    closed: false
  }, {
    days: 'Saturday',
    opening: '8:00am',
    closing: '5:00pm',
    closed: false
  }, {
    days: 'Sunday',
    closed: true
  }]
})

db.locations.save({
  name: 'Cafe Hero',
  address: '125 High Street, Reading, RG6 1PS',
  rating: 4,
  facilities: ['Hot drinks', 'Food', 'Premium wifi'],
})

db.locations.save({
  name: 'Burger Queen',
  address: '125 High Street, Reading, RG6 1PS',
  rating: 2,
  facilities: ['Food', 'Premium wifi'],
})

// update documents

// update without params
db.locations.update({
  name: 'Starcups'
}, {
  $push: {
    reviews: {
      author: 'Mick Jagger',
      timestamp: new Date('Dec 13, 2016'),
      id: ObjectId(),
      rating: 5,
      reviewText: "What a great place. I can't say enough good things about"
    }
  }
})

db.locations.update({
  name: 'Starcups'
}, {
  $push: {
    reviews: {
      author: 'Jim Morrison',
      timestamp: new Date('Dec 13, 2016'),
      id: ObjectId(),
      rating: 3,
      reviewText: "It was okay. Coffee wasn't great, but the wifi was fast."
    }
  }
})
