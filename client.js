const net = require("net");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const waitforUsername = new Promise((resolve) => {
  readline.question("Enter a username to join chat ", (answer) => {
    resolve(answer);
  });
});

waitforUsername.then((username) => {
  const socket = net.connect({
    port: 1234,
  });
  socket.on("connect", () => {
    socket.write(`${username} has joined the chat. `);
  });

  readline.on("line", (data) => {
    if (data === "quit") {
      socket.write(`${username} has left the chat. `);
      socket.setTimeout(1000);
    } else {
      socket.write(`${username}: ${data}`);
    }
  });

  socket.on("data", (data) => {
    //makes diffrent color on message reseived from send message
    console.log("\x1b[33m%s\x1b[0m", data);
  });

  socket.on("timeout", () => {
    socket.write("quit");
    socket.end();
  });
  socket.on("end", () => {
    process.exit();
  });
  socket.on("error", () => {
    confirm.log("The server seems to been shutdown... ");
  });
});
