<template>
  <div class="videoRoot">
    <div class="videoCall">
      <!-- 
:src="localVideo.srcObject"
:src="remoteVideo.srcObject"
      -->
      <video id="localVideo" width="450" height="300" playsinline autoplay muted></video>
      <video id="remoteVideo" width="450" height="300" playsinline autoplay></video>
    </div>
    <br />
    <div class="box">
      <button id="startButton" v-on:click="start">Start</button>
      <button id="callButton" v-on:click="call">Call</button>
      <button id="hangupButton" v-on:click="hangup">Hang Up</button>
    </div>
    <br />
    <div class="box">
      <span>SDP Semantics:</span>
      <select id="sdpSemantics">
        <option selected value="">Default</option>
        <option value="unified-plan">Unified Plan</option>
        <option value="plan-b">Plan B</option>
      </select>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import store from '../store'

export default {
    name: 'Video',
  data() {
    return {
        startTime: null,
        localVideo: {
          srcObject: null,
        },
        remoteVideo: {
          srcObject: null,
        },
        localStream: null,
        pc1: null,
        pc2: null,
        offerOptions: {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1  
        },
        buttons: {
            startButton: {
                disabled: false
            },
            callButton: {
                disabled: true
            },
            hangupButton: {
                disabled: true
            },        
        },

    }
  },
  methods: {
    async start() {
        console.log('Requesting local stream');
        this.buttons.startButton.disabled = true;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
            console.log('Received local stream');
            document.getElementById('localVideo').srcObject = stream
            this.localVideo.srcObject = stream;
            this.localStream = stream;
            this.buttons.callButton.disabled = false;
            console.log('attempting to load video...')
            vid.load()
        } catch (e) {
            alert(`getUserMedia() error: ${e.name}`);
        }
    },
    async call() {
        this.buttons.callButton.disabled = true;
        this.buttons.hangupButton.disabled = false;
        console.log('Starting call');
        this.startTime = window.performance.now();
        const videoTracks = this.localStream.getVideoTracks();
        const audioTracks = this.localStream.getAudioTracks();
        if (videoTracks.length > 0) {
            console.log(`Using video device: ${videoTracks[0].label}`);
        }
        if (audioTracks.length > 0) {
            console.log(`Using audio device: ${audioTracks[0].label}`);
        }
        const configuration = getSelectedSdpSemantics();
        console.log('RTCPeerConnection configuration:', configuration);
        pc1 = new RTCPeerConnection(configuration);
        console.log('Created local peer connection object pc1');
        pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e));
        pc2 = new RTCPeerConnection(configuration);
        console.log('Created remote peer connection object pc2');
        pc2.addEventListener('icecandidate', e => onIceCandidate(pc2, e));
        pc1.addEventListener('iceconnectionstatechange', e => onIceStateChange(pc1, e));
        pc2.addEventListener('iceconnectionstatechange', e => onIceStateChange(pc2, e));
        pc2.addEventListener('track', gotRemoteStream);

        this.localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));
        console.log('Added local stream to pc1');

        try {
            console.log('pc1 createOffer start');
            const offer = await pc1.createOffer(offerOptions);
            await onCreateOfferSuccess(offer);
        } catch (e) {
            onCreateSessionDescriptionError(e);
        }
    },
    hangup() {
        console.log('Ending call');
        pc1.close();
        pc2.close();
        pc1 = null;
        pc2 = null;
        this.buttons.hangupButton.disabled = true;
        this.buttons.callButton.disabled = false;
    },
    getName(pc) {
      return (pc === pc1) ? 'pc1' : 'pc2';
    },
    getOtherPc(pc) {
      return (pc === pc1) ? pc2 : pc1;
    },
    getSelectedSdpSemantics() {
      const sdpSemanticsSelect = document.querySelector('#sdpSemantics');
      const option = sdpSemanticsSelect.options[sdpSemanticsSelect.selectedIndex];
      return option.value === '' ? {} : {sdpSemantics: option.value};
    },
    async onCreateOfferSuccess(desc) {
      console.log(`Offer from pc1\n${desc.sdp}`);
      console.log('pc1 setLocalDescription start');
      try {
        await pc1.setLocalDescription(desc);
        onSetLocalSuccess(pc1);
      } catch (e) {
        onSetSessionDescriptionError();
      }

      console.log('pc2 setRemoteDescription start');
      try {
        await pc2.setRemoteDescription(desc);
        onSetRemoteSuccess(pc2);
      } catch (e) {
        onSetSessionDescriptionError();
      }

      console.log('pc2 createAnswer start');
      // Since the 'remote' side has no media stream we need
      // to pass in the right constraints in order for it to
      // accept the incoming offer of audio and video.
      try {
        const answer = await pc2.createAnswer();
        await onCreateAnswerSuccess(answer);
      } catch (e) {
        onCreateSessionDescriptionError(e);
      }
    },
    gotRemoteStream(e) {
      if (this.remoteVideo.srcObject !== e.streams[0]) {
        this.remoteVideo.srcObject = e.streams[0];
        console.log('pc2 received remote stream');
      }
    },
    async onCreateAnswerSuccess(desc) {
      console.log(`Answer from pc2:\n${desc.sdp}`);
      console.log('pc2 setLocalDescription start');
      try {
        await pc2.setLocalDescription(desc);
        onSetLocalSuccess(pc2);
      } catch (e) {
        onSetSessionDescriptionError(e);
      }
      console.log('pc1 setRemoteDescription start');
      try {
        await pc1.setRemoteDescription(desc);
        onSetRemoteSuccess(pc1);
      } catch (e) {
        onSetSessionDescriptionError(e);
      }
    },
    async onIceCandidate(pc, event) {
      try {
        await (getOtherPc(pc).addIceCandidate(event.candidate));
        onAddIceCandidateSuccess(pc);
      } catch (e) {
        onAddIceCandidateError(pc, e);
      }
      console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
    },

  },
}
</script>
<style scoped lang="scss">
.videoRoot {
  display: flex;
  align-items: flex-start;
  background-color: rgb(77, 77, 77);
  height: 80%;
  width: 60%;
  justify-content: center;
  margin: auto;
  overflow-y: auto;
  position: fixed;
  z-index: 20;
}
.videoCall {
    
}

video {
  background: #222;
}

label {
  color: #000000;
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
