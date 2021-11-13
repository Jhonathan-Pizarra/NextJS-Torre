import ReadCandidates from "@/components/candidates/ReadCandidates";
import CreateCandidate from "@/components/candidates/CreateCandidate";
import withAuth from "@/hocs/withAuth";

const Candidates = () => {

    return (
        <div>
            <div className="container">
                <ReadCandidates/>
                <CreateCandidate/>
            </div>
        </div>

    )
}

export default withAuth(Candidates);
