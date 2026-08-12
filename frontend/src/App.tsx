import './App.css';
import QuoteList from './components/QuoteList/QuoteList';
import { useState, useEffect } from 'react';
import QuoteForm from './components/QuoteForm/QuoteForm';
import api from './api/quotes';
import { Container } from '@mui/material';
import { CompanyLogo, ContentWrapper, Banner, ListDiv, InstructionsText } from './App.styles';

export interface IState {
  quotes: {
    id: string;
    author: string;
    content: string;
    imgUrl?: string;
    // either string or undefined
    length?: number;
    createdAt: string;
  }[];
}

function App() {
  const [quotes, setQuotes] = useState<IState['quotes']>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await api.get('/quotes');
        console.log(response.data);
        setQuotes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuotes();
  }, []);

  return (
    <Container maxWidth="lg" className="">
      <Banner>
        <CompanyLogo>Quote Wall</CompanyLogo>
      </Banner>
      <ContentWrapper>
        <div>
          <QuoteForm quotes={quotes} setQuotes={setQuotes} />
        </div>
        <ListDiv>
          {quotes.length === 0 ? (
            <InstructionsText>
              Make your first quote by clicking the random quote button or write a custom quote
            </InstructionsText>
          ) : (
            <QuoteList quotes={quotes} setQuotes={setQuotes} />
          )}
        </ListDiv>
      </ContentWrapper>
    </Container>
  );
}

export default App;
