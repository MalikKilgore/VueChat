<template>
  <div class="videoRoot">
    <div class="videoCall">
      <div class="localOptions"> 
        <video
          id="localVideo"
          width="450"
          height="300"
          playsinline
          autoplay
          muted
        ></video>
      </div>

      <div class="remoteOptions"> 
        <video
          id="remoteVideo"
          width="450"
          height="300"
          playsinline
          autoplay
        ></video>
        <br>
        <input type="range" id="remoteVolume" name="remoteVolume"
         min="0" max="10" onchange="volume()" v-model="remoteVolume">
        <label for="remoteVolume">Volume</label>
      </div>
    </div>
    <br />
    <div class="box">
      <button id="cameraBtn" v-on:click="callOrganizer">Start Call</button>
      <button id="hangupBtn" v-on:click="hangUp">Hang Up</button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import store from "../store";
import firebase from "firebase/app";
import {
  db,
  usersCollection,
  programChat,
  networkChat,
  creativeChat,
  generalChat,
  bugChat,
  videoRooms,
} from "../firebase/firebase.js";

export default {
  name: "DirectVideo",
  data() {
    return {
      route: {
        id: this.$route.params.directID,
        path: this.$route.path,
      },
      localVideo: null,
      remoteVideo: null,
      remoteVolume: 0.30,
      peerConnection: null,
      localStream: null,
      remoteStream: null,
      roomId: null,
      callerID: null,
      receiverID: null,
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
    };
  },
  methods: {
    volume(){
      const remoteVid = document.getElementById('remoteVideo')
      remoteVid.volume = this.remoteVolume
    },
    async callOrganizer(){
      await this.openUserMedia()
      await this.fetchCallerID()
      this.createRoom()
    },
    async fetchCallerID(){
      let userIDslice = this.route.path.substr(8)
      let userDoc = await usersCollection.doc(userIDslice).get()
      const receiverID = userDoc.data().callerID
      console.log(`The receiverID field grabbed is: ${receiverID}`)
      this.receiverID = receiverID
    },
    async createRoom() {
      const user = store.state.currentUser
      //document.querySelector("#createBtn").disabled = true;
      //document.querySelector("#joinBtn").disabled = true;
      const roomRef = await videoRooms.doc(`${this.receiverID}`);
      roomRef.set({
        callerUID: user.uid,
      })

      console.log(
        "Create PeerConnection with configuration: ",
        this.configuration
      );
      this.peerConnection = new RTCPeerConnection(this.configuration);

      this.registerPeerConnectionListeners();

      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      // Code for collecting ICE candidates below
      const callerCandidatesCollection = roomRef.collection("callerCandidates");
      this.peerConnection.addEventListener("icecandidate", (event) => {
        if (!event.candidate) {
          console.log("Got final candidate!");
          return;
        }
        console.log("Got candidate: ", event.candidate);
        callerCandidatesCollection.add(event.candidate.toJSON());
      });

      // Code for creating a room below
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      console.log("Created offer:", offer);

      const roomWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };

      await roomRef.set(roomWithOffer);
      this.roomId = roomRef.id;
      console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`);
      // Code for creating a room above

      //Listens for and adds remote tracks
      this.peerConnection.addEventListener("track", (event) => {
        console.log("Got remote track:", event.streams[0]);
        event.streams[0].getTracks().forEach((track) => {
          console.log("Add a track to the remoteStream:", track);
          this.remoteStream.addTrack(track);
        });
      });

      // Listening for remote session description below
      roomRef.onSnapshot(async (snapshot) => {
        const data = snapshot.data();
        if (!this.peerConnection.currentRemoteDescription && data && data.answer) {
          console.log("Got remote description: ", data.answer);
          const rtcSessionDescription = new RTCSessionDescription(data.answer);
          await this.peerConnection.setRemoteDescription(rtcSessionDescription);
        }
      });

      // Listen for remote ICE candidates below
      roomRef.collection("receiverCandidates").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            console.log(
              `Got new remote ICE candidate: ${JSON.stringify(data)}`
            );
            await this.peerConnection.addIceCandidate(
              new RTCIceCandidate(data)
            );
          }
        });
      });
      // Listen for remote ICE candidates above
    },
    async joinRoom() {
      //document.querySelector("#createBtn").disabled = true;
      document.querySelector("#joinBtn").disabled = true;

          this.roomId = document.querySelector("#room-id").value;
          console.log("Join room: ", this.roomId);
          await this.joinRoomById(this.roomId);
        
        { once: true }
    },
    async joinRoomById(roomId) {
      const roomRef = videoRooms.doc(`${this.roomId}`);
      const roomSnapshot = await roomRef.get();
      console.log("Got room:", roomSnapshot.exists);

      if (roomSnapshot.exists) {
        console.log(
          "Create PeerConnection with configuration: ",
          this.configuration
        );
        this.peerConnection = new RTCPeerConnection(this.configuration);
        this.registerPeerConnectionListeners();
        this.localStream.getTracks().forEach((track) => {
          this.peerConnection.addTrack(track, this.localStream);
        });

        // Code for collecting ICE candidates below
        const receiverCandidatesCollection = roomRef.collection(
          "receiverCandidates"
        );
        this.peerConnection.addEventListener("icecandidate", (event) => {
          if (!event.candidate) {
            console.log("Got final candidate!");
            return;
          }
          console.log("Got candidate: ", event.candidate);
          receiverCandidatesCollection.add(event.candidate.toJSON());
        });
        // Code for collecting ICE candidates above

        //Listens for Video/Audio tracks and adds them to the DOM
        this.peerConnection.addEventListener("track", (event) => {
          console.log("Got remote track:", event.streams[0]);
          event.streams[0].getTracks().forEach((track) => {
            console.log("Add a track to the remoteStream:", track);
            this.remoteStream.addTrack(track);
          });
        });

        // Code for creating SDP answer below
        const offer = roomSnapshot.data().offer;
        console.log("Got offer:", offer);
        await this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await this.peerConnection.createAnswer();
        console.log("Created answer:", answer);
        await this.peerConnection.setLocalDescription(answer);

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
              await this.peerConnection.addIceCandidate(
                new RTCIceCandidate(data)
              );
            }
          });
        });
        // Listening for remote ICE candidates above
      }
    },
    async openUserMedia(e) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      document.querySelector("#localVideo").srcObject = stream;
      this.localStream = stream;
      this.remoteStream = new MediaStream();
      document.querySelector("#remoteVideo").srcObject = this.remoteStream;

      console.log("Stream:", document.querySelector("#localVideo").srcObject);
      document.querySelector("#cameraBtn").disabled = true;
      document.querySelector("#hangupBtn").disabled = false;
    },
    async hangUp() {
      const tracks = document.querySelector("#localVideo").srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });

      if (this.remoteStream) {
        this.remoteStream.getTracks().forEach((track) => track.stop());
      }

      if (this.peerConnection) {
        this.peerConnection.close();
      }
      document.querySelector("#localVideo").srcObject = null;
      document.querySelector("#remoteVideo").srcObject = null;
      document.querySelector("#cameraBtn").disabled = false;
      document.querySelector("#hangupBtn").disabled = true;

      // Delete room on hangup
      if (this.roomId) {
        const roomRef = videoRooms.doc(`${this.roomId}`);
        const receiverCandidates = await roomRef
          .collection("receiverCandidates")
          .get();
        receiverCandidates.forEach(async (candidate) => {
          await candidate.ref.delete();
        });
        const callerCandidates = await roomRef
          .collection("callerCandidates")
          .get();
        callerCandidates.forEach(async (candidate) => {
          await candidate.ref.delete();
        });
        await roomRef.delete();
      }

      //document.location.reload(true);
    },
    registerPeerConnectionListeners() {
      this.peerConnection.addEventListener("icegatheringstatechange", () => {
        console.log(
          `ICE gathering state changed: ${this.peerConnection.iceGatheringState}`
        );
      });
      this.peerConnection.addEventListener("connectionstatechange", () => {
        console.log(
          `Connection state change: ${this.peerConnection.connectionState}`
        );
      });
      this.peerConnection.addEventListener("signalingstatechange", () => {
        console.log(`Signaling state change: ${this.peerConnection.signalingState}`);
      });

      this.peerConnection.addEventListener("iceconnectionstatechange ", () => {
        console.log(
          `ICE connection state change: ${this.peerConnection.iceConnectionState}`
        );
      });
    },
  },
};
</script>
<style scoped lang="scss">
.videoRoot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0f1a2a;
  min-width: fit-content;
  max-width: stretch;
  width: auto;
  resize: horizontal;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  overflow: auto;
  position: static;
  grid-area: videoRoot;
}
.videoCall {
  display: flex;
  flex-direction: row;
}

video {
  background: #18243a;
  border-radius: 5px;
  margin: 0.5rem;
}

h2 {
  color: #ffffff;
}

label {
  color: #ffffff;
  font-weight: bold;
  text-align: center;
}

button {
  padding: 5px 15px;
  margin-top: 1rem;
  background: #ffffff;
  color: #2c3e50;
  border: 0;
  border-radius: 5px;
  font-size: 25px;
  margin-left: 2rem;
  &:hover {
    background: #bebebe;
  }
}
</style>
