import { useEffect, useState } from "react";

interface Candidate {
  login: string;
  name: string;
  location: string;
  avatar_url: string;
  email: string;
  html_url: string;
  company: string;
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
        <ul className="candidate-list">
          {savedCandidates.map((candidate) => (
            <li key={candidate.login} className="candidate-card">
              <img
                src={candidate.avatar_url}
                alt={`${candidate.login}'s avatar`}
                width="80"
                height="80"
              />
              <div>
                <h2>{candidate.name || "No Name Provided"}</h2>
                <p>
                  <strong>Username:</strong> {candidate.login}
                </p>
                <p>
                  <strong>Location:</strong> {candidate.location || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {candidate.email || "N/A"}
                </p>
                <p>
                  <strong>Company:</strong> {candidate.company || "N/A"}
                </p>
                <p>
                  <strong>Profile:</strong>{" "}
                  <a
                    href={candidate.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {candidate.html_url}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
