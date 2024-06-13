import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import { CampaignCard } from './CampaignCard';
import { NewCampaign } from 'types/campaign';
import { styled } from '@mui/system';

const StyledSlider = styled(Slider)`
  .slick-prev {
    top: 45%;
    left: 10px !important;
    z-index: 1;
  }
  .slick-prev:before {
    font-size: 30px;
    opacity: 1;
  }
  .slick-prev.slick-disabled:before {
    opacity: 0.5;
  }
  .slick-next {
    top: 45%;
    right: 35px !important;
    z-index: 1;
  }
  .slick-next:before {
    font-size: 30px;
    opacity: 1;
  }
  .slick-next.slick-disabled:before {
    opacity: 0.5;
  }
  .slick-track {
    display: flex;
    justify-content: center;
  }
  .slick-dots {
    margin-top: 15px;
    position: initial;
  }
  .slick-dots li {
    width: 8px;
    height: 8px;
  }
  .slick-dots li button {
    padding: 0px;
    width: 10px;
    height: 10px;
  }
  .slick-dots li.slick-active button:before {
    color: #3769ff;
    opacity: 1;
  }
  .slick-dots li button:before {
    color: #ffffff;
    border: 1px solid #3769ff;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    font-size: 8px;
    line-height: 11px;
    opacity: 1;
  }
`;

export interface CampaignCardCarouselProps {
  campaignsData: NewCampaign[];
  hasDetails?: boolean;
  isUpcoming?: boolean;
}

export const CampaignCardCarousel = (props: CampaignCardCarouselProps): JSX.Element => {
  const { campaignsData = [], hasDetails, isUpcoming } = props;
  const settings = {
    variableWidth: false,
    draggable: false,
    swipe: false,
    infinite: false,
    dots: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <StyledSlider {...settings}>
      {campaignsData.map((campaignData) => (
        <Box key={campaignData.id}>
          <CampaignCard
            hasDetails={hasDetails}
            campaignData={campaignData}
            isUpcoming={isUpcoming}
          />
        </Box>
      ))}
    </StyledSlider>
  );
};
