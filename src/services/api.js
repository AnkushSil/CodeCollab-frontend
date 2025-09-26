const BASE_URL = "";

export const fetchRemarks = async (roomId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/remarks/${roomId}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const postRemark = async (remark) => {
  try {
    const res = await fetch(`${BASE_URL}/api/remarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(remark),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};