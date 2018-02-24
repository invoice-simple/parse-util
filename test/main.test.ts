
import * as x from '../src/index'
describe('main', () => {
  const db = new x.IsDb('postgres://saulotauil:@localhost/db')

  

  it('do nothing', () => {

    return db.query('select * from t').then((x) => {

    })

  })
})