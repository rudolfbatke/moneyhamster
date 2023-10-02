const CHANNEL_LABEL = 'P2P_HAMSTER_CASH_DATA_SYNC';

/** @type {RTCIceServer[]} */
const iceServers = [
  {
    // urls: 'stun:stun.l.google.com:19302'
    urls: 'stun:stun.goldfish.ie:3478'
  }
];

/** @param {CreatePeerConnectionProps } connectionProps */
export function createPeerConnection(connectionProps) {
  const peerConnection = new RTCPeerConnection({ iceServers });

  /** @type {RTCDataChannel|undefined} */
  let channelInstance = undefined;

  function setupChannelAsAHost() {
    try {
      channelInstance = peerConnection.createDataChannel(CHANNEL_LABEL);
      channelInstance.onopen = () => connectionProps.onChannelOpen();
      channelInstance.onmessage = ({ data }) => connectionProps.onMessageReceived(data);
    } catch (e) {
      console.error('No data channel (peerConnection)', e);
    }
  }

  async function createOffer() {
    const description = await peerConnection.createOffer();
    peerConnection.setLocalDescription(description);
  }

  function setupChannelAsAGuest() {
    peerConnection.ondatachannel = ({ channel }) => {
      channelInstance = channel;
      channelInstance.onopen = () => connectionProps.onChannelOpen();
      channelInstance.onmessage = ({ data }) => connectionProps.onMessageReceived(data);
    };
  }

  /** @param {string} remoteDescription */
  async function createAnswer(remoteDescription) {
    await peerConnection.setRemoteDescription(JSON.parse(remoteDescription));
    const description = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(description);
  }

  /** @param {string} answerDescription */
  async function setAnswerDescription(answerDescription) {
    await peerConnection.setRemoteDescription(JSON.parse(answerDescription));
  }

  /** @param {string} message */
  function sendMessage(message) {
    if (channelInstance) channelInstance.send(message);
  }

  /** @type {Promise<CreatePeerConnectionResponse>} */
  const response = new Promise((res) => {
    peerConnection.onicecandidate = (e) => {
      if (e.candidate === null && peerConnection.localDescription) {
        peerConnection.localDescription.sdp.replace('b=AS:30', 'b=AS:1638400');
        res({
          localDescription: JSON.stringify(peerConnection.localDescription),
          setAnswerDescription,
          sendMessage
        });
      }
    };

    if (!connectionProps.remoteDescription) {
      setupChannelAsAHost();
      createOffer();
    } else {
      setupChannelAsAGuest();
      createAnswer(connectionProps.remoteDescription);
    }
  });

  return response;
}
