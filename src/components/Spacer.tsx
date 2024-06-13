import { FC } from 'react';

interface Props {
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
}

export const Spacer: FC<Props> = (props: Props): JSX.Element => {
  const {
    marginTop = 'initial',
    marginBottom = 'initial',
    marginRight = 'initial',
    marginLeft = 'initial',
  } = props;
  return <div style={{ marginTop, marginBottom, marginRight, marginLeft }} />;
};
