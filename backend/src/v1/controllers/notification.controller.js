import { pushNotification } from "../services/notification.service.js";

export const pushNewNotification = async (req, res) => {
  try {
    const { msg, client_id, attack_id } = req.body;
    const message = await pushNotification(msg, client_id, attack_id);

    res.json(message);
  } catch (e) {
    console.log(e);
  }
};
