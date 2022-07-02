import axios from "axios";
const instance = axios.create({
  baseURL: "https://pixabay.com/api/",
});

const APIkey = "27849023-ecfc5ae512196a63a069d8b57";

export const getImgsByQwery = async (qwery, page = 1) => {
  const { data } = await instance.get(`/`, {
    params: {
      q: qwery,
      page,
      key: APIkey,
      image_type: "photo",
      orientation: "horizontal",
      per_page: 12,
    },
  });
  return data;
};
