export const getAllProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/get_products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
