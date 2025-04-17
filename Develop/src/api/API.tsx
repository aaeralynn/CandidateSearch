const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Invalid API response");
    }

    const users = await response.json();

    // Fetch detailed user profiles in parallel
    const detailedUsers = await Promise.all(
      users.map((user: { login: string }) => searchGithubUser(user.login))
    );

    return detailedUsers;
  } catch (err) {
    console.error("An error occurred while fetching candidates:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid API response");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching user ${username}:`, err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
