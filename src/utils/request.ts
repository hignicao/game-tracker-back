import axios from "axios";

async function post(url: string, body: string, config: any) {
  try {
    const result = await axios.post(url, body, config);
    return result;
  } catch (error) {
    return error;
  }
}

export const request = {
  post,
};

