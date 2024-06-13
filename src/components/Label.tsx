import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import type { Theme } from '@mui/material';
import { experimentalStyled } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

export type LabelColor = 'primary' | 'secondary' | 'error' | 'warning' | 'success';

interface LabelProps {
  children?: ReactNode;
  color?: LabelColor;
  style?: {};
  sx?: SxProps<Theme>;
}

interface LabelRootProps {
  styleProps: {
    color: string;
  };
}

const LabelRoot = experimentalStyled('span')<LabelRootProps>(({ theme, styleProps }) => {
  const backgroundColor = theme.palette[styleProps.color].main;
  const color = theme.palette[styleProps.color].contrastText;

  return {
    alignItems: 'center',
    backgroundColor,
    color,
    cursor: 'default',
    display: 'inline-flex',
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(11),
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: 0.5,
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    borderRadius: '4px',
    // minWidth: '150px',
    justifyContent: 'flex-start',
  };
});

const Label: FC<LabelProps> = (props) => {
  const { color = 'primary', children, ...other } = props;

  const styleProps = { color };

  return (
    <LabelRoot styleProps={styleProps} {...other}>
      {children}
    </LabelRoot>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'success']),
};

export default Label;
