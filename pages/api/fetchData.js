import axios from "axios";
export const fetchData = async (id) => {
  try {
    const response = await axios.get(
      `https://dashboard.apec.com.lb/api/user/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
