 import {QuestionsPage} from "..";
import ReactDOM from 'react-dom';

it('rendersWithoutCrashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<QuestionsPage />, div);
});