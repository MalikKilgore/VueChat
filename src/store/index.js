import { createStore } from 'vuex'
import router from '../router/index'
import { usersCollection, auth, programChat,
   networkChat, creativeChat, generalChat, bugChat, videoRooms } from '../firebase/firebase.js'


export default createStore({
  state: {
    //Stores current user profile
    userProfile: {},
    //Stores current route associated with the chatroom you're viewing
    currentRoute: {},
    //Stores current database associated with the chatroom you're viewing
    currentDatabase: {},
    //Stores current signed in user reference
    currentUser: {},
    //Toggles Video div on or off.
    displayVid: false,

    //State properties for accepting a call from listener
    peerConnection: null,
    localStream: null,
    remoteStream: null,
    unsubscribe: null,
    roomId: null,
    configuration: {
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302", 
            "stun:stun2.l.google.com:19302",
            "stun:stun.services.mozilla.com"
          ]
        }
      ]
    },
    iceCandidatePoolSize: 2,
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setCurrentRoute(state, val) {
      state.currentRoute = val
    },
    setCurrentDatabase(state, val) {
      state.currentDatabase = val
    },
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setDisplayVid(state, val){
      state.displayVid = val
    },
  },
  actions: {
    async makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },

    async login({ dispatch }, form) {
      // Signs the user in
      const { user } = await auth.signInWithEmailAndPassword(form.email, form.password)
  
      // Fetches the current user profile and updates it in state
      dispatch('fetchUserProfile', user).then(alert(`Sign-in successful for ${form.email}`))
    },

    async fetchUserProfile({commit}, user) {
      // Fetches the current user profile
      const userProfile = await usersCollection.doc(user.uid).get()
  
      // Sets user profile in state
      commit('setUserProfile', userProfile.data())

      //Sets active user in state
      commit('setCurrentUser', user)

      this.dispatch('callListener')
      
      // Reroutes to dashboard/home
      router.push('/chatrooms/general')
    },

    async createUser({ dispatch }, form) {
      // Registers user account in Firebase
      const { user } = await auth.createUserWithEmailAndPassword(form.email, form.password)
    
      // Creates user profile in usersCollections database/firestore
      await usersCollection.doc(user.uid).set({
        name: form.name,
        email: form.email,
        password: form.password,
        edit: false,
        uid: user.uid,
        callerID: this.makeid(16)
      })

      //Creates direct message collection for user profile upon account creation.
      await usersCollection.doc(user.uid).collection('direct').doc('first').set({
        createdOn: new Date(),
        sentByUID: 'SYSTEM',
        sentByEmail: 'SYSTEM',
        content: `Welcome to the beginning of your chat history with ${form.name}!`
      })

      // Fetches the current user profile and updates it in state
      dispatch('fetchUserProfile', user).then(alert(`Account created for ${form.email}`))
    },

    async logout({ commit }) {
      await auth.signOut().then(alert(`You've successfully signed out`))
    
      // Clears userProfile and redirect to login page
      commit('setUserProfile', {})
      router.push('/join')
    },

    // Grabs and updates the active route/database state
    async activeRoute({ commit }, form) {
      if (form.id){
        commit('setCurrentRoute', form.id)
      } else if (form.dbPln) {
        commit('setCurrentDatabase', form.dbPln)
      }
    },

    // Adds message to the specified database/firestore.
    async sendMsg({dispatch}, form) {
      const user = this.state.currentUser
      const dmChat = form.dbPln
      const dmID = form.dbStr
      const personalChat = usersCollection.doc(user.uid).collection('direct')

      switch(form.dbStr){
        case `programChat`:
          await programChat.doc().set({
            createdOn: new Date(),
            content: form.message,
            sentByUID: user.uid,
            sentByEmail: user.email,
          })
          break
        case `networkChat`:
          await networkChat.doc().set({
            createdOn: new Date(),
            content: form.message,
            sentByUID: user.uid,
            sentByEmail: user.email
          })
          break
        case `creativeChat`:
          await creativeChat.doc().set({
            createdOn: new Date(),
            content: form.message,
            sentByUID: user.uid,
            sentByEmail: user.email
          })
          break
        case `generalChat`:
          await generalChat.doc().set({
            createdOn: new Date(),
            content: form.message,
            sentByUID: user.uid,
            sentByEmail: user.email
          })
          break
        case `bugChat`:
          await bugChat.doc().set({
            createdOn: new Date(),
            content: form.message,
            sentByUID: user.uid,
            sentByEmail: user.email
          })
          break
        default:
          await dmChat.doc().set({
            createdOn: new Date(),
            content: form.message,
            sentByUID: user.uid,
            sentByEmail: user.email,
            sentTo: dmID,
          })
          await personalChat.doc().set({
            createdOn: new Date(),
            content: form.message,
            sentByUID: user.uid,
            sentByEmail: user.email,
            sentTo: dmID,
          })
          break
        }

    },
    //Deletes message in database/firestore
    async dltMsg({dispatch}, id){
      const user = this.state.currentUser
      const database = this.state.currentDatabase
      const doc = await database.doc(id).get()

      if(doc.data().sentByUID != user.uid){
        console.log('You cannot delete this message')
      } else {
        database.doc(id).delete()
      }
    },
    //Edits message content in database/firestore
    async editMsg({dispatch}, form){
      const user = this.state.currentUser
      const database = this.state.currentDatabase
      const doc = await database.doc(form.id).get()

      if(doc.data().sentByUID != user.uid){
        console.log('You cannot edit this message')
      } else {
        database.doc(form.id).set({
          createdOn: doc.data().createdOn,
          editedOn: new Date(),
          content: form.content,
          sentByUID: doc.data().sentByUID,
          sentByEmail: doc.data().sentByEmail
        })
      }
    },

    //VIDEO CALL FUNCTIONS
    async toggleVid({commit}){
      const val = this.state.displayVid
      switch(val){
        case true:
          commit('setDisplayVid', false)
          break
        case false:
          commit('setDisplayVid', true)
          break
      }
    },
    async registerPeerConnectionListeners() {
      console.log('registerPeerConnectionListeners() FUNCTION JUST FIRED')
      this.state.peerConnection.addEventListener("icegatheringstatechange", () => {
        console.log(
          `ICE gathering state changed: ${this.state.peerConnection.iceGatheringState}`
        );
      });
      this.state.peerConnection.addEventListener("connectionstatechange", () => {
        console.log(
          `Connection state change: ${this.state.peerConnection.connectionState}`
        );
      });
      this.state.peerConnection.addEventListener("signalingstatechange", () => {
        console.log(`Signaling state change: ${this.state.peerConnection.signalingState}`);
      });

      this.state.peerConnection.addEventListener("iceconnectionstatechange ", () => {
        console.log(
          `ICE connection state change: ${this.state.peerConnection.iceConnectionState}`
        );
      });
    },
    async receiveUserMedia(roomRef) {
      if(this.state.displayVid == false) {
        await this.dispatch("toggleVid")
      }
      
      await router.push(`/direct/${roomRef.callerUID}`)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      document.querySelector("#localVideo").srcObject = stream;
      this.state.localStream = stream;
      this.state.remoteStream = new MediaStream();
      document.querySelector("#remoteVideo").srcObject = this.state.remoteStream;

      console.log("Stream:", document.querySelector("#localVideo").srcObject);
      document.querySelector("#cameraBtn").disabled = true;
      //document.querySelector("#joinBtn").disabled = false;
      //document.querySelector("#createBtn").disabled = false;
      document.querySelector("#hangupBtn").disabled = false;
    },
    async joinRoomByCallerID({dispatch}, form) {
      const database = usersCollection;
      const user = this.state.userProfile;
      const roomId = form.callerID

      const roomRef = videoRooms.doc(`${roomId}`);
      await dispatch('receiveUserMedia', roomRef)
      const roomSnapshot = await roomRef.get();
      console.log("Got room:", roomSnapshot.exists);

      if (roomSnapshot.exists) {
        console.log(
          "Create PeerConnection with configuration: ",
          this.state.configuration
        );
        this.state.peerConnection = new RTCPeerConnection(this.state.configuration);
        dispatch("registerPeerConnectionListeners");
        this.state.localStream.getTracks().forEach((track) => {
          this.state.peerConnection.addTrack(track, this.state.localStream);
        });

        // Code for collecting ICE candidates below
        const receiverCandidatesCollection = roomRef.collection(
          "receiverCandidates"
        );
        this.state.peerConnection.addEventListener("icecandidate", (event) => {
          if (!event.candidate) {
            console.log("Got final candidate!");
            return;
          }
          console.log("Got candidate: ", event.candidate);
          receiverCandidatesCollection.add(event.candidate.toJSON());
        });
        // Code for collecting ICE candidates above

        //Listens for Video/Audio tracks and adds them to the DOM
        this.state.peerConnection.addEventListener("track", (event) => {
          console.log("Got remote track:", event.streams[0]);
          event.streams[0].getTracks().forEach((track) => {
            console.log("Add a track to the remoteStream:", track);
            this.state.remoteStream.addTrack(track);
          });
        });

        // Code for creating SDP answer below
        const offer = roomSnapshot.data().offer;
        console.log("Got offer:", offer);
        await this.state.peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await this.state.peerConnection.createAnswer();
        console.log("Created answer:", answer);
        await this.state.peerConnection.setLocalDescription(answer);

        const roomWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        await roomRef.update(roomWithAnswer);
        // Code for creating SDP answer above
        
        // Listening for remote ICE candidates below
        roomRef.collection("callerCandidates").onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              let data = change.doc.data();
              console.log(
                `Got new remote ICE candidate: ${JSON.stringify(data)}`
              );
              await this.state.peerConnection.addIceCandidate(
                new RTCIceCandidate(data)
              );
            }
          });
        });
        // Listening for remote ICE candidates above
      }
    },
    async callListener({dispatch}) {
      const user = this.state.userProfile
      const currentCallerID = user.callerID
      console.log(currentCallerID)

      this.state.unsubscribe = videoRooms.onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
            //ADDED
            if (change.type === "added") {
              //If it matches this user's callerID
              if (change.doc.id == currentCallerID){
                if(confirm(`Someone is calling you!`)){
                  console.log('Call Accepted')
                  dispatch('joinRoomByCallerID', {callerID: currentCallerID})
                } else {
                  console.log('Call Denied')
                }
              }
            }
            //MODIFIED 
            if (change.type === "modified") {
              console.log('modified room')
            }
            //DELETED
            if (change.type === "removed") {
              console.log('removed room')
            }
          });
        });
    },
    //
  },

  modules: {}
})
