import styled from 'styled-components';
import PropTypes from 'prop-types';

const VoteButton = styled.div`
 border : 0;
 background: none;
 cursor: pointer;
 text-align: center;
 padding:0;
 font-size: 1.9 rem;
 &:disabled{ cursor : not-allowed; }
`;

const VoteIncrement = styled.div`
 width : 0;
 height : 0;
 border-right: 20px solid transparent;
 border-left: 20px solid transparent;
 border-bottom: 20px solid ${props => props.active ? 'green' : 'gray'};;
 padding:0;
`;
const VoteDecrement = styled.div`
 width : 0;
 height : 0;
 border-top : 20 px solid ${props => props.active ? 'red' : 'gray'};
 border-left: 20 px solid transparent;
 border-right: 20 px solid transparent;
 padding:0;
`;

const NumberofVotes = styled.div`
width: 40px;
text-align: center;
paddding : 5px 0 7px;
font-size: 1.45 rem;
line-height: 1.45 rem;
color: black;

`;


function VotingFeature(props) {
return (
   <div {...props}>
   <VoteButton disabled = {props.vote ===1} > 
   <VoteIncrement active= {props.vote ===1} />
   </VoteButton>
   <NumberofVotes> {props.value} </NumberofVotes>
   <VoteButton disabled = {props.vote ===-1} >
   <VoteDecrement active = {props.vote ===-1}/>
   </VoteButton>
  </div>
 
);
}

VotingFeature.propTypes= {
    value : PropTypes.number.isRequired,
 };
 
export default VotingFeature;