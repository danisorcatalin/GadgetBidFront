import {
  Campaign,
  CampaignFile,
  CampaignFileType,
  CampaignMember,
  CampaignPresentationFileType,
} from 'types/campaign';

export class BusinessValidationsCampaign {
  campaign: Partial<Campaign>;
  campaignMembers: CampaignMember[];
  campaignFiles: CampaignFile[];

  constructor(
    campaign: Partial<Campaign>,
    campaignFiles: CampaignFile[],
    campaignMembers: CampaignMember[]
  ) {
    this.campaign = campaign;
    this.campaignFiles = campaignFiles;
    this.campaignMembers = campaignMembers;
  }

  isDescriptionTabCompleted(): boolean {
    return !!this.campaign.description && !this.checkEmptyHtmlText(this.campaign.description);
  }

  isRiskTabCompleted(): boolean {
    return !!this.campaign.risk && !this.checkEmptyHtmlText(this.campaign.risk);
  }

  isQaTabCompleted(): boolean {
    return !!this.campaign.qa && !this.checkEmptyHtmlText(this.campaign.qa);
  }

  isDesignTabCompleted(): boolean {
    return (
      this.campaignFiles?.find((file) => file.type === CampaignPresentationFileType.LOGO) !==
        undefined &&
      this.campaignFiles?.find((file) => file.type === CampaignPresentationFileType.COVER) !==
        undefined
    );
  }

  isTeamTabCompleted(): boolean {
    return this.campaignMembers?.length > 0;
  }

  isDocumentsTabCompleted(): boolean {
    const documentsTabFiles = Object.keys(CampaignFileType);
    return (
      this.campaignFiles?.filter(
        (file) => file.type !== 'LOGO' && file.type !== 'COVER' && file.type !== 'LINK'
      ).length === documentsTabFiles.length
    );
  }

  private checkEmptyHtmlText(text: string): boolean {
    return text.replace(/<(.|\n)*?>/g, '').trim().length === 0;
  }
}
