// API.tsx
const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log(`Fetching users starting from: ${start}`);
    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching users: ${response.status} - ${errorText}`);
      throw new Error(
        `Invalid API response: ${response.status} - ${errorText}`
      );
    }

    const users = await response.json();
    console.log("Fetched users:", users);

    if (users.length === 0) {
      console.log("No more users to fetch.");
      return [];
    }

    // Fetch detailed user profiles in parallel
    const detailedUsers = await Promise.all(
      users.map((user: { login: string }) => searchGithubUser(user.login))
    );
    console.log("Fetched detailed users:", detailedUsers);
    return detailedUsers;
  } catch (err) {
    console.error("An error occurred while fetching candidates:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    console.log(`Fetching user details for: ${username}`);
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching user ${username}: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Invalid API response: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Fetched user data:", data);
    return data;
  } catch (err) {
    console.error(`Error fetching user ${username}:`, err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
