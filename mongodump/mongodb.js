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
  address: 'R. Marília, 60, Jundiai, Vila Hortolandia',
  rating: 2,
  facilities: ['Hot drinks', 'Food', 'Premium wifi'],

})

db.locations.save({
  name: 'Burger Queen',
  address: '125 High Street, Reading, RG6 1PS',
  rating: 2,
  facilities: ['Food', 'Premium wifi'],
})

db.locations.save({
  name: 'Supermecados Boa',
  address: 'R. Marília, 60, Jundiai, Vila Hortolandia',
  rating: 2,
  facilities: ['Food', 'Premium wifi'],
  coords: [-46.9098690, -23.1695940]
})

db.locations.save({
  name: 'Supermercados Russi',
  address: '132 Rua Marco Polo, Jundiai, Vila Hortolandia',
  rating: 2,
  facilities: ['Food', 'Premium wifi'],
  coords: [-46.9117586, -23.1661869]
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
      _id: ObjectId(),
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
      _id: ObjectId(),
      rating: 3,
      reviewText: "It was okay. Coffee wasn't great, but the wifi was fast."
    }
  }
})

// remover array e add
db.locations.update({name: "Supermecados Boa"}, { $pullAll: { coords: [-46.909869, -23.169594] }})

db.locations.update(
  {name: "Supermecados Boa"},
  { $push: { coords: { $each: [-46.9097923, -23.1691194] } } }
)

// db geoNear
db.runCommand({
  geoNear: "locations",
  near: { type: "Point", coordinates: [-46.9096380, -23.1652510] },
  spherical: true
})

// earth
6378.1

// position of starcups
51.4491020,-0.9254240

// rua corumbatai
lat, lng
-23.1652508,-46.9118265

// Boa
lat, lng
-23.1691194,-46.9097923

// Russi
lat, lng
-23.1661869,-46.9117586
