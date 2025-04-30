export const handler = async () => {
  const start = Math.floor(Math.random() * 100000000) + 1;
  const token = process.env.GITHUB_TOKEN; // Ensure your token is set in Netlify environment variables

  try {
    // Fetch basic user list from GitHub API
    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use your GitHub token securely
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorText }),
      };
    }

    const users = await response.json();

    // If no users, return early
    if (users.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    // Fetch detailed profiles of users in parallel
    const detailedUsers = await Promise.all(
      users.map(async (user: { login: string }) => {
        const userRes = await fetch(
          `https://api.github.com/users/${user.login}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!userRes.ok) {
          const userError = await userRes.text();
          return { error: `Error fetching user ${user.login}: ${userError}` };
        }

        return userRes.json(); // Return detailed user data
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(detailedUsers),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
