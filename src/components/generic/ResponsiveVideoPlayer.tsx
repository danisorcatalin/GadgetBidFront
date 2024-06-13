import styled from '@emotion/styled';
import { FC, memo } from 'react';
import ReactPlayer from 'react-player';

interface ResponsiveVideoPlayerProps {
  controls: boolean;
  url: string;
}

const ResponsiveVideoPlayer: FC<ResponsiveVideoPlayerProps> = (
  props: ResponsiveVideoPlayerProps
) => {
  const { controls, url } = props;

  const ReactPlayerWrapper = styled.div`
    position: relative;
    padding-top: 56.25%;
  `;

  const Player = (props): JSX.Element => {
    const { className } = props;
    return <ReactPlayer className={className} width="100%" height="100%" {...props} />;
  };

  const AbsolutelyPositionedPlayer = styled(Player)`
    position: absolute;
    top: 0;
    left: 0;
  `;

  return (
    <ReactPlayerWrapper>
      <AbsolutelyPositionedPlayer controls={controls} url={url} />
    </ReactPlayerWrapper>
  );
};

export default memo(ResponsiveVideoPlayer);
