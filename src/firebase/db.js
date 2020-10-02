import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase.initializeApp({ projectId: "vuechat-80a67" }).firestore()
export const namesRef = db.ref('names')

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
db.settings({ timestampsInSnapshots: true })