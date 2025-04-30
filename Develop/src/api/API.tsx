const searchGithub = async () => {
  try {
    const res = await fetch("/.netlify/functions/searchGithub");
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error fetching candidates: ${res.status} - ${errorText}`);
      throw new Error(`Invalid API response: ${res.status} - ${errorText}`);
    }

    const users = await res.json();
    console.log("Fetched detailed users:", users);
    return users;
  } catch (err) {
    console.error("An error occurred while fetching candidates:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const res = await fetch(
      `/.netlify/functions/searchGithubUser?username=${username}`
    );
    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `Error fetching user ${username}: ${res.status} - ${errorText}`
      );
      throw new Error(`Invalid API response: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log("Fetched user data:", data);
    return data;
  } catch (err) {
    console.error(`Error fetching user ${username}:`, err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
