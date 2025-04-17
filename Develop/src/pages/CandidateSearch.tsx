import { useEffect, useState } from "react";
import { searchGithub } from "../api/API";

interface Candidate {
  avatar_url: string;
  name: string;
  login: string;
  location: string;
  email: string;
  html_url: string;
  company: string;
}

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const users = await searchGithub(); // assumes this returns an array of user data
      setCandidates(users);
    };

    fetchCandidates();
  }, []);

  const handleAccept = () => {
    const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    saved.push(candidates[currentIndex]);
    localStorage.setItem("savedCandidates", JSON.stringify(saved));
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReject = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (candidates.length === 0) return <p>Loading candidates...</p>;

  if (currentIndex >= candidates.length)
    return <p>No more candidates to review.</p>;

  const candidate = candidates[currentIndex];

  return (
    <div>
      <img src={candidate.avatar_url} alt={candidate.name} width="100" />
      <h2>{candidate.name}</h2>
      <p>Username: {candidate.login}</p>
      <p>Location: {candidate.location}</p>
      <p>Email: {candidate.email}</p>
      <p>Company: {candidate.company}</p>
      <p>
        GitHub: <a href={candidate.html_url}>{candidate.html_url}</a>
      </p>

      <button onClick={handleAccept}>+</button>
      <button onClick={handleReject}>−</button>
    </div>
  );
};

export default CandidateSearch;
