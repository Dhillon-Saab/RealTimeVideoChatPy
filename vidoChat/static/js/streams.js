const APP_ID = "8c74901b9aff435cac2cb420bdb2265e";
const CHANNEL = "main";
const TOKEN =
  "007eJxTYCiIOFo1P9qm/LO0iNYOhujf3+sOhXlMri0/oytgHtk6JUiBwSLZ3MTSwDDJMjEtzcTYNDkx2Sg5ycTIICklycjIzDRVruB2WkMgI4OUdy4rIwMEgvgsDLmJmXkMDADpxx26";

let UID;

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = [];

let joinAndDisplayLocalStream = async () => {
  UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  let player = `    <div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">My name</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                    </div>`;

  document
    .getElementById("video-streams")
    .insertAdjacentHTML("beforeend", player);

  localTracks[1].play(`user-${UID}`);

  await client.publish([localTracks[0], localTracks[1]]);
};

joinAndDisplayLocalStream();
