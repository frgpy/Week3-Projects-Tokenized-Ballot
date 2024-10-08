// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IMyToken {
    function getPastVotes(address, uint256) external view returns (uint256);
}

contract TokenizedBallot {
    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    IMyToken public tokenContract;
    Proposal[] public proposals;
    uint256 public targetBlockNumber;
    mapping (address => uint256) public spentVotePower;
    

    constructor(
        bytes32[] memory _proposalNames,
        address _tokenContract,
        uint256 _targetBlockNumber
    ) {
        tokenContract = IMyToken(_tokenContract);
        targetBlockNumber = _targetBlockNumber - 10;
        
        require(

          targetBlockNumber <=  block.number,
          "TokenizedBallot: targetBlockNumber must be in the past"
        );

        for (uint i = 0; i < _proposalNames.length; i++) {
            proposals.push(Proposal({name: _proposalNames[i], voteCount: 0}));
        }
    }

    function vote(uint256 proposal, uint256 amount) external {

        uint256 senderVotingPower = getVotePower(msg.sender);
        require(
          senderVotingPower >= amount,
          "TokenizedBallot: insufficient voting power"
        );
        spentVotePower[msg.sender] += amount;
        proposals[proposal].voteCount += amount;
        }
        function getVotePower(address voter ) public view returns (uint voterPower_) {
        voterPower_ = tokenContract.getPastVotes(voter, targetBlockNumber) - spentVotePower[voter];
     }

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}