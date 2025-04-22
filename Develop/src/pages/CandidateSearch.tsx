import { useEffect, useState } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface"; // Import Candidate interface

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false); // Track if there are no more candidates

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true); // Ensure the loading state is set before fetching
      try {
        const basicUsers = await searchGithub();
        console.log("Fetched basic users:", basicUsers);
        if (basicUsers.length === 0) {
          setNoMoreCandidates(true);
          return;
        }

        const detailedUsers = await Promise.all(
          basicUsers.map(async (user) => {
            const fullUser = await searchGithubUser(user.login);
            return fullUser;
          })
        );

        setCandidates(detailedUsers);
        console.log("Detailed users:", detailedUsers); // Check what you get back
      } catch (error) {
        console.error("Error loading candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleAccept = () => {
    if (candidates[currentIndex]) {
      const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
      saved.push(candidates[currentIndex]);
      localStorage.setItem("savedCandidates", JSON.stringify(saved));
      setCurrentIndex((prev) => prev + 1); // Move to the next candidate
    }
  };

  const handleReject = () => {
    setCurrentIndex((prev) => prev + 1); // Move to the next candidate without saving
  };

  if (loading) return <p>Loading candidates...</p>;

  if (noMoreCandidates || currentIndex >= candidates.length) {
    return <p>No more candidates to review.</p>; // Show when no more candidates are available
  }

  const candidate = candidates[currentIndex];

  return (
    <div>
      <img
        src={candidate.avatar_url}
        alt={candidate.name || candidate.login}
        width="100"
      />
      <h2>{candidate.name || "No name provided"}</h2>
      <p>Username: {candidate.login}</p>
      <p>Location: {candidate.location || "N/A"}</p>
      <p>Email: {candidate.email || "N/A"}</p>
      <p>Company: {candidate.company || "N/A"}</p>
      <p>
        GitHub: <a href={candidate.html_url}>{candidate.html_url}</a>
      </p>

      <button onClick={handleAccept}>+</button>
      <button onClick={handleReject}>−</button>
    </div>
  );
};

export default CandidateSearch;
