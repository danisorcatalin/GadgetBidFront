import { GadgetClientJava } from '../lib/axios';

export const issueTokens = async (campaignId: number): Promise<boolean> => {
  try {
    if (!campaignId) throw new Error('No campaignId specified');
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerIssueCampaignTokens(campaignId);
    const campaign = response.data as boolean;
    return campaign;
  } catch (err) {
    throw new Error(err);
  }
};
