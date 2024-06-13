import { Box, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import type { Components as JavaComponents } from 'lib/GadgetClientJava';

interface Props {
  team: JavaComponents.Schemas.CampaignMemberDto[];
}

export const TeamDetails: FC<Props> = (props: Props) => {
  const { team } = props;
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ mt: 2 }}>
      {team.map((teamMember, index) => (
        <Box
          key={`teamDetails.${index}`}
          sx={{
            display: 'flex',
            flexDirection: mobileDevice ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography sx={{ my: 2 }} color="textPrimary" variant="h3">
              {teamMember.fullName}
            </Typography>
            <Typography color="textSecondary" variant="h2">
              {teamMember.role}
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {teamMember.description}
            </Typography>
            <Link sx={{ my: 2 }} href={teamMember.linkedinProfile} underline="none" variant="body1">
              {teamMember.linkedinProfile}
            </Link>
          </Box>
          <img
            src={`${teamMember.avatar}`}
            style={{
              height: '300px',
              width: '300px',
              marginTop: 2,
              objectFit: 'contain',
            }}
          />
        </Box>
      ))}
    </Box>
  );
};
