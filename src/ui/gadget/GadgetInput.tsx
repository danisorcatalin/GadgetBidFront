import { Box, TextareaAutosize, Typography, Button } from '@mui/material';
import { useState, CSSProperties } from 'react';
import { inputColors } from 'theme';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface GadgetInputProps {
  formVariant?: boolean;
  name?: string;
  label?: string;
  type?: string;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  value?: string | number;
  autoFocus?: boolean;
  onBlur?: (event) => void;
  onChange?: (event) => void;
  multiline?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
}

export const GadgetInput = (props: GadgetInputProps): JSX.Element => {
  const {
    name,
    label,
    type,
    formVariant,
    placeholder,
    multiline,
    disabled,
    error,
    helperText,
    value,
    autoFocus,
    onChange,
    style = {},
    ...rest
  } = props;
  const [focus, setFocus] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {label && (
        <label
          style={{
            color: error
              ? inputColors.errorColor
              : !disabled && (focus || value)
              ? inputColors.primaryColor
              : disabled && value
              ? inputColors.primaryColor
              : inputColors.secondaryColor,
            fontSize: '12px',
            letterSpacing: '-0.22px',
            fontFamily: 'Neue Haas Grotesk Display Pro, sans-serif',
            textAlign: 'left',
            transition: 'all 0.5s ease',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(133%-24px)',
          }}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <TextareaAutosize
          style={{
            minWidth: '100%',
            fontFamily: 'Neue Haas Grotesk Display Pro, sans-serif',
            minHeight: '20px',
            backgroundColor: inputColors.whiteColor,
            borderRadius: '4px',
            outline: 'none',
            border: error
              ? `1px solid ${inputColors.errorColor}`
              : !disabled && (focus || value)
              ? `1px solid ${inputColors.primaryColor}`
              : formVariant
              ? `1px solid ${inputColors.secondaryColor}`
              : `1px solid ${inputColors.whiteColor}`,
            fontSize: '22px',
            letterSpacing: '-0.44px',
            lineHeight: '24px',
            textAlign: 'left',
            marginTop: '8px',
            paddingTop: '5px',
            transition: 'all 0.5s ease',
            paddingLeft: '8px',
            WebkitBoxShadow: '0 0 0 1000px white inset',
          }}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          autoFocus={autoFocus}
          disabled={disabled}
        />
      ) : type === 'button' ? (
        <Button
          variant="outlined"
          size="medium"
          color={'primary'}
          sx={{
            mt: 1,
            border: 0,
            width: '100%',
            backgroundColor: '#D7E1FF',
            '&:hover': { border: 0 },
          }}
        >
          {value}
        </Button>
      ) : (
        <input
          style={{
            width: '100%',
            fontFamily: 'Neue Haas Grotesk Display Pro, sans-serif',
            height: '32px',
            backgroundColor: inputColors.whiteColor,
            borderRadius: '4px',
            outline: 'none',
            border: error
              ? `1px solid ${inputColors.errorColor}`
              : !disabled && (focus || value)
              ? `1px solid ${inputColors.primaryColor}`
              : formVariant
              ? `1px solid ${inputColors.secondaryColor}`
              : `1px solid ${inputColors.whiteColor}`,
            fontSize: '22px',
            letterSpacing: '-0.44px',
            lineHeight: '24px',
            textAlign: 'left',
            marginTop: '8px',
            transition: 'all 0.5s ease',
            padding: '0px 8px',
            WebkitBoxShadow: '0 0 0 1000px white inset',
            textOverflow: 'ellipsis',
            ...style,
          }}
          name={name}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          autoFocus={autoFocus}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />
      )}

      {type === 'password' ? (
        <i
          style={{
            top: '36px',
            color: '#A2AAAD',
            cursor: 'pointer',
            height: '24px',
            position: 'absolute',
            right: '5px',
            width: '24px',
          }}
          onClick={togglePasswordVisiblity}
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </i>
      ) : null}
      <Typography
        sx={{
          fontSize: '11px',
          marginTop: '5px',
          color: inputColors.errorColor,
        }}
      >
        {error ? helperText : null}
      </Typography>
    </Box>
  );
};
