const store = {
  index: 0
}

const generator = function (faker, options) {
  const { clientId } = options
  if (!store[clientId]) {
    store[clientId] = {
      car_id: faker.vehicle.vin(),
      display_name: `car_${store.index += 1}`,
      model: faker.helpers.arrayElement(['J7', 'J6p', 'J6V']),
      latitude: faker.datatype.number({ min: 73.557701, max: 135.041975, precision: 0.000001 }),
      longitude: faker.datatype.number({ min: 20.159379, max: 53.560711, precision: 0.000001 }),
    }
  }
  const data = store[clientId]

  data.speed = faker.datatype.number({ min: 0, max: 120 })
  // 根据速度计算 1 秒内经纬度变化
  const distance = data.speed * 1000 / 3600 * 1
  data.distance = distance
  data.direction = faker.datatype.number({ min: 0, max: 90 })
  data.latitude = data.latitude + distance * Math.sin(data.direction * Math.PI / 180)
  data.longitude = data.longitude + distance * Math.cos(data.direction * Math.PI / 180)
  // 根据速度计算油耗 L/100km
  data.fuel_consumption = data.speed * faker.datatype.number({ min: 0.1, max: 0.5, precision: 0.01 })
  // 根据速度计算档位 0-12 档
  data.shift_state = `D${data.speed / 10 | 0 + 1}`

  const message = {
    ...data,
    state: 'moving',
    power: faker.datatype.number({ min: 0, max: 415 }),
    windows_open: true,
    doors_open: false,
    inside_temp: faker.datatype.number({ min: 14, max: 39, precision: 0.1 }),
    outside_temp: faker.datatype.number({ min: -20, max: 50, precision: 0.1 }),
    timestamp: Date.now(),
  }
  return {
    message: JSON.stringify(message),
  }
}

const name = 'logistics'
const author = 'EMQX Team'
const dataFormat = 'JSON'
const version = '0.0.1'
const description = "Simulation to generate logistics data"

module.exports = {
  generator,
  name,
  author,
  dataFormat,
  version,
  description,
}
