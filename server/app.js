import express from "express";
import axios from "axios";

const app = express();
const SERVER_URL = "https://mauvelous-leopard-5257.twil.io";

app.get(
  [
    // ignore; endpoint for easily viewing the default server
    // response on CodeSandbox
    "/"
  ],
  (req, res) => {
    res.status(200).json({ test: "hello world!" });
  }
);

app.get("/api/users/:username", async (req, res) => {
  try {
    let username = req.params.username;
    if (username) {
      const [firstResponse, secondResponse] = await Promise.all([
        axios.get(`${SERVER_URL}/friend-detail?username=${username}`, {
          validateStatus: false
        }),
        axios.get(`${SERVER_URL}/plays-detail?username=${username}`, {
          validateStatus: false
        })
      ]);
      if (
        Number(firstResponse.status) === 200 &&
        Number(secondResponse.status) === 200
      ) {
        //Filter unique track values
        var tracks = secondResponse.data.plays.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });

        res.status(200).json({
          username: username,
          plays: secondResponse.data.plays.length,
          friends: firstResponse.data.friends.length,
          tracks: tracks,
          uri: `/users/${username}`
        });
      } else {
        res.status(404).json({ statusText: "error", status: 404 });
      }
    } else {
      res.status(404).json({ response: "no valid user" });
    }
  } catch (error) {
    console.warn(error);
  }
});

export default app;
