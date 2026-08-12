import { useState } from 'react';
import { IState as Props } from '../../App';
import api from '../../api/quotes';
import {
  QuoteCard,
  ListContainer,
  BottomCard,
  StyledQuoteText,
  StyledAuthurText,
  TopCard,
  EditText,
  BottomEdit
} from './QuoteList.styles';
import { Modal, Box } from '@mui/material';
import { FaTrashAlt } from 'react-icons/fa';
import { StyledForm, AddButton } from '../QuoteForm/QuoteForm.styles';

interface IProps {
  quotes: Props['quotes'];
  setQuotes: React.Dispatch<React.SetStateAction<Props['quotes']>>;
}

interface Quote {
  id: string;
  author: string;
  content: string;
  imgUrl?: string | undefined;
  length?: number | undefined;
  createdAt: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const QuoteList: React.FC<IProps> = ({ quotes, setQuotes }) => {
  const [editQuoteObj, setEditQuoteObj] = useState({ id: '', author: '', content: '' });

  // const [editContact, setEditContact] = useState(-1);
  const [open, setOpen] = useState(false);
  const handleOpen = (quote: Quote) => {
    setOpen(true);
    // setEditContact(index);
    setEditQuoteObj(quote);
    console.log('here edit is quote', quote);
  };

  const handleClose = () => {
    setOpen(false);
    // setEditContact(!editContact);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    // e.preventDefault();
    setEditQuoteObj({ ...editQuoteObj, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        author: editQuoteObj.author,
        content: editQuoteObj.content
      };
      console.log(editQuoteObj.id);
      await api.put(`/quote/${editQuoteObj.id}`, payload);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    console.log('hey delete', id);
    try {
      await api.delete(`/quote/${id}`);
      const quotesFiltered = quotes.filter((quote) => quote.id !== id);
      setQuotes(quotesFiltered);
    } catch (err) {
      console.log(err);
    }
  };

  const renderList = (): JSX.Element[] => {
    const sortedList = quotes.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    console.log('here is sorted', sortedList);
    return sortedList.map((quote, index) => {
      return (
        <QuoteCard key={quote.id} className="">
          <TopCard>
            <StyledQuoteText>"{quote.content}"</StyledQuoteText>
          </TopCard>
          <BottomCard>
            <StyledAuthurText>-{quote.author}</StyledAuthurText>
            <BottomEdit>
              <EditText onClick={() => handleOpen(quote)}>Edit</EditText>
              <FaTrashAlt
                style={{ marginLeft: '5px', fontSize: '20px', cursor: 'pointer' }}
                onClick={() => handleDelete(quote.id)}
              >
                delete
              </FaTrashAlt>
            </BottomEdit>
          </BottomCard>
        </QuoteCard>
      );
    });
  };

  return (
    <ListContainer>
      {renderList()}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <StyledForm onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="author"
              className="AddToList-input"
              value={editQuoteObj.author}
              onChange={handleChange}
              name="author"
              required
            />
            <textarea
              placeholder="content"
              className="AddToList-input"
              value={editQuoteObj.content}
              onChange={handleChange}
              name="content"
              required
            />
            <AddButton className="AddToList-btn">Update</AddButton>
          </StyledForm>
        </Box>
      </Modal>
    </ListContainer>
  );
};

export default QuoteList;
