import { useState } from 'react';
import { IState as Props } from '../../App';
import { Typography, useMediaQuery } from '@mui/material';
import { AddCard, GenerateButton, StyledForm, AddButton } from './QuoteForm.styles';
import api from '../../api/quotes';

interface IProps {
  quotes: Props['quotes'];
  setQuotes: React.Dispatch<React.SetStateAction<Props['quotes']>>;
}

const QuoteForm: React.FC<IProps> = ({ quotes, setQuotes }) => {
  const [input, setInput] = useState({
    author: '',
    content: ''
  });
  const matches = useMediaQuery('(min-width:1080px)');

  const generateQuote = async () => {
    try {
      const response = await api.post('/random');
      console.log(response.data);
      setQuotes([...quotes, response.data]);
    } catch (err) {
      return console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    // e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleClick = async (e: any): Promise<void> => {
    e.preventDefault();
    if (!input.author || !input.content) {
      return;
    }
    // created the new quote
    const newQuote = { author: input.author, content: input.content };

    // now input it within the database
    try {
      const response = await api.post('/quote', newQuote);
      const allQuotes = [...quotes, response.data];
      setQuotes(allQuotes);
    } catch (err) {
      console.log(`Error: ${err}`);
    }

    // clear the inputs
    setInput({ author: '', content: '' });
  };

  return (
    <AddCard>
      {matches && <Typography variant="h4">Add Quote</Typography>}
      <GenerateButton onClick={generateQuote}>Create Random Quote</GenerateButton>
      <h4 style={{ textAlign: 'center', margin: '5px' }}>OR</h4>
      <StyledForm onSubmit={handleClick}>
        <input
          type="text"
          placeholder="author"
          className="AddToList-input"
          value={input.author}
          onChange={handleChange}
          name="author"
          required
        />
        <textarea
          placeholder="content"
          className="AddToList-input"
          value={input.content}
          onChange={handleChange}
          name="content"
          required
        />
        <AddButton className="AddToList-btn">Create a Quote</AddButton>
      </StyledForm>
    </AddCard>
  );
};

export default QuoteForm;
