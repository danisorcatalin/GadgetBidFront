import {
  Typography,
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { UserQuestionDto, UserAnswerInputDto } from 'types/user';
import { useState } from 'react';
import { Investment } from 'types/investment';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import WarningIcon from '@mui/icons-material/Warning';

export interface InvestQAProps {
  questions: UserQuestionDto[];
  lastUserInvestment: Investment;
  saveInvestmentAnswers: (answers: UserAnswerInputDto[]) => Promise<number>;
}

export const InvestQA = ({ questions = [], saveInvestmentAnswers }: InvestQAProps): JSX.Element => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState<number>();
  const onChange = (e, questionId) => {
    const answer = e.target.value;
    setAnswers({ ...answers, [questionId]: answer });
  };

  const onSubmit = async () => {
    const answersArray = Object.keys(answers).map((question) => ({
      question: +question,
      answer: +answers[question],
    }));
    const score = await saveInvestmentAnswers(answersArray);
    setScore(score);
  };

  const canSubmit = Object.keys(answers).length === questions.length;

  return (
    <Box>
      {score === undefined ? (
        <>
          <Box sx={{ textAlign: 'center' }}>
            <QuestionAnswerIcon
              color="primary"
              sx={{ verticalAlign: 'middle', fontSize: '36px' }}
            />
            <Box>Please answer to the following questions:</Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            {questions.map((question) => {
              return (
                <Box key={question.id} sx={{ mt: 2 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{ fontSize: 18, mb: 1 }}>
                      {question.question}
                    </FormLabel>
                    <RadioGroup
                      aria-label="answer"
                      name={`radio-buttons-group${question.id}`}
                      onChange={(e) => onChange(e, question.id)}
                    >
                      <FormControlLabel
                        sx={{ ml: 0, mb: 1 }}
                        value="1"
                        control={<Radio sx={{ mr: 1 }} />}
                        label={question.variant1}
                      />
                      <FormControlLabel
                        sx={{ ml: 0, mb: 1 }}
                        value="2"
                        control={<Radio sx={{ mr: 1 }} />}
                        label={question.variant2}
                      />
                      <FormControlLabel
                        sx={{ ml: 0, mb: 1 }}
                        value="3"
                        control={<Radio sx={{ mr: 1 }} />}
                        label={question.variant3}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              );
            })}
            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{ mt: 2, fontSize: '24px', border: '0 !important' }}
              onClick={onSubmit}
              disabled={!canSubmit}
              fullWidth={true}
            >
              Submit
            </Button>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            // pt: 5,
            // pb: 5,
          }}
        >
          {score >= 50 ? (
            <DoneOutlineIcon fontSize="large" sx={{ color: 'green' }} style={{ marginTop: 16 }} />
          ) : (
            <WarningIcon fontSize="large" sx={{ color: 'orange' }} style={{ marginTop: 16 }} />
          )}
          <Typography gutterBottom textAlign="center" variant="h6">
            Your score:
          </Typography>
          <Typography gutterBottom textAlign="center" variant="h5">
            {score}%
          </Typography>
          <Typography gutterBottom textAlign="center" variant="body1">
            {score >= 50
              ? 'Well done! You can be considered a sophisticated investor.'
              : 'You can be considered an unexperienced investor. '}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
