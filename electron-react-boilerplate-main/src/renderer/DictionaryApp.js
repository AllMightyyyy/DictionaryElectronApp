import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

function DictionaryApp() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [wordsList, setWordsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch available words on initial load
    axios
      .get('http://localhost:8080/api/words')
      .then((response) => setWordsList(response.data))
      .catch((error) => console.error('Error fetching words list:', error));
  }, []);

  const fetchDefinition = () => {
    if (word) {
      setLoading(true);
      setError('');
      setDefinition('');
      axios
        .get(`http://localhost:8080/api/definition?word=${word}`)
        .then((response) => {
          setDefinition(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch definition.');
          setLoading(false);
        });
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dictionary App
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Autocomplete
            options={wordsList}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter a word"
                variant="outlined"
                fullWidth
                onChange={(e) => setWord(e.target.value)}
                onSelect={(e) => setWord(e.target.value)}
              />
            )}
            sx={{ marginBottom: 3, width: '100%' }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={fetchDefinition}
            sx={{ marginBottom: 3 }}
            fullWidth
          >
            Get Definition
          </Button>

          {loading && <CircularProgress sx={{ marginBottom: 3 }} />}

          {error && (
            <Typography color="error" sx={{ marginBottom: 3 }}>
              {error}
            </Typography>
          )}

          <Divider sx={{ width: '100%', marginY: 3 }} />

          {definition && (
            <Box width="100%">
              <Typography variant="h5" gutterBottom>
                Definition:
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {definition}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default DictionaryApp;
