import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';

function DictionaryApp() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [wordsList, setWordsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

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

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4">Dictionary App</Typography>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={toggleTheme} />}
              label={darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
            />
          </Box>

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
                  sx={{ marginBottom: 3 }}
                />
              )}
              sx={{ width: '100%' }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={fetchDefinition}
              sx={{ marginBottom: 3, width: '100%', paddingY: 1.5 }}
            >
              {loading ? 'Loading...' : 'Get Definition'}
            </Button>

            {loading && <CircularProgress sx={{ marginBottom: 3 }} />}

            {error && (
              <Typography color="error" sx={{ marginBottom: 3 }}>
                {error}
              </Typography>
            )}

            <Divider sx={{ width: '100%', marginY: 3 }} />

            {definition && (
              <Card elevation={3} sx={{ width: '100%', marginBottom: 3 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Definition:
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {definition}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default DictionaryApp;
