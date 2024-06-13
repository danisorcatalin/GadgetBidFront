import { Box, Button, Container, Dialog, DialogProps, Typography } from '@mui/material';
import { Form, FormInput, FormInputType } from 'components/generic/Form';
import { FC, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  FeedbackAnswerInput,
  FeedbackData,
  FeedbackInputType,
  FeedbackGetDto,
} from 'types/feedback';

type Props = DialogProps & {
  feedbackForm: FeedbackGetDto;
  onSubmit: (values: unknown) => Promise<void>;
};

const otherReasonsCheckboxName = 'presubscribe-cancel-form-answer-4';
const optionalTextAreaName = 'presubscribe-cancel-form-answer-freetext';

const getFormInputType = (type: FeedbackInputType): FormInputType => {
  let formInputType;
  switch (type) {
    case 'checkbox':
      formInputType = FormInputType.CHECKBOX;
      break;
    case 'text':
      formInputType = FormInputType.TEXT_AREA;
      break;
    default:
      formInputType = FormInputType.TEXT_AREA;
      break;
  }
  return formInputType;
};

const PresubscribeCancelFeedbackModal: FC = (props: Props): JSX.Element => {
  const { feedbackForm, onSubmit, ...rest } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { text, inputs } = JSON.parse(feedbackForm.data as unknown as string) as FeedbackData;
  const [formErrorText, setFormErrorText] = useState('');

  const optionalTextAreaField = inputs.find((input) => input.name === optionalTextAreaName);
  const initialInputs = inputs.filter((input) => input.name !== optionalTextAreaName);
  const formInputs: FormInput[] = initialInputs.map((input) => {
    return {
      ...input,
      label: t(input.label),
      type: getFormInputType(input.type),
    };
  });

  const formInitialValues = initialInputs.reduce(
    (acc, curr) => ((acc[curr.name] = curr.type === 'checkbox' ? false : ''), acc),
    {}
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: { [key: string]: string | boolean }): Promise<void> => {
    const feedback: FeedbackAnswerInput[] = [];
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        feedback.push({
          inputName: key,
          // TODO JAVA MIGRATION: This logic seems to be off. We should test this functionality to see if there is anything crashing on Backend or frontend
          // Remove as any casting once this is cleared.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputValue: values[key] as any,
          extra: '',
        });
      }
    });
    if (feedback.length) {
      onSubmit(feedback);
      setFormErrorText('');
      navigate('/dashboard');
    } else {
      setFormErrorText(t('feedbackForms.errorMessage'));
    }
  };

  const onChange = (value: FormEvent) => {
    const target = value.target as HTMLInputElement;
    if (target.name === otherReasonsCheckboxName) {
      if (target.checked) {
        formInputs.push({
          name: optionalTextAreaName,
          label: t(optionalTextAreaField.label),
          type: FormInputType.TEXT_AREA,
        });
      } else {
        formInputs.pop();
      }
    }
  };

  return (
    <Dialog {...rest} fullWidth={true} open={open} onClose={handleClose} maxWidth="lg">
      <Container
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ color: '#000000', mb: 2 }} variant="h1">
            {t('managerOverview.welcome')}
          </Typography>
          <Typography variant="h2">{t(text)}</Typography>
        </Box>

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Form<any>
          inputs={formInputs}
          initialValues={formInitialValues}
          onSubmit={handleSubmit}
          submitBtnText={t('feedbackForms.submit')}
          formErrorText={formErrorText}
          onChange={onChange}
        />
        <Button
          sx={{ mt: -3 }}
          color="primary"
          variant="contained"
          onClick={handleClose}
          href="/dashboard"
          fullWidth
        >
          {t('crowdfunding.campaign.presubscribeSuccessModal.seeOtherCampaigns')}
        </Button>
      </Container>
    </Dialog>
  );
};

export default PresubscribeCancelFeedbackModal;
