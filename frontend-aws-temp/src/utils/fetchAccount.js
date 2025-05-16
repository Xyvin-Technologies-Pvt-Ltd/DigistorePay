import axios from "axios";
import toast from "react-hot-toast";

export const fetchAccount = async (id, setData) => {
  try {
    const res = await axios.get(`/admin/getFranchise`, {
      params: {
        franchiseUniqueId: id,
      },
    });

    if (res.status === 200) {
      setData(res.data.data);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};
