import { TodoFirestore } from '../firestore'
import cuid from 'cuid'

async function main() {
  const todoFirestore = new TodoFirestore()

  const data = [
    { id: cuid(), text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', completed: false },
    { id: cuid(), text: 'Praesentium placeat aut animi suscipit ipsa nesciunt vitae vero', completed: true },
  ]

  // must run in series
  for (const d of data) {
    await todoFirestore.create(d)
  }

  console.log("Done")
}

if (require.main === module) {
  main()
}
