import { UserOutputSingleDto } from 'types/user';
import { Campaign } from 'types/campaign';

export class BusinessValidations {
  user: UserOutputSingleDto;

  constructor(user: UserOutputSingleDto) {
    this.user = user;
  }

  isContactTabCompleted(): boolean {
    const hasIdentityCard = !!this.user?.onboard?.files?.find((file) => file.type === 'IDENTITY');

    return hasIdentityCard;
  }

  isCompanyTabCompleted(): boolean {
    if (this.user.companies.length === 0) {
      return false;
    }

    const hasPitchDeck =
      this.user.companies[0] &&
      !!this.user.companies[0]?.companyFiles.find((file) => file.type === 'PITCH_DECK');

    const hasBusinessPlan =
      this.user.companies[0] &&
      !!this.user.companies[0]?.companyFiles.find((file) => file.type === 'BUSINESS_PLAN');

    return hasPitchDeck && hasBusinessPlan;
  }

  isRepresentativesTabCompleted(): boolean {
    return this.user.companies[0] && this.user.companies[0]?.companyMembers
      ? this.user.companies[0] &&
          !!this.user.companies[0]?.companyMembers.find(
            (member) => member.role === 'LEGAL_REPRESENTATIVE'
          )
      : false;
  }

  isShareholdersTabCompleted(): boolean {
    return this.user.companies[0] && this.user.companies[0]?.companyMembers
      ? this.user.companies[0] &&
          !!this.user.companies[0]?.companyMembers.find((member) => member.role === 'SHAREHOLDER')
      : false;
  }

  isCompanyProfileCompleted(): boolean {
    return (
      this.isContactTabCompleted() &&
      this.isCompanyTabCompleted() &&
      this.isRepresentativesTabCompleted() &&
      this.isShareholdersTabCompleted()
    );
  }

  isIssuerApplicationApproved(): boolean {
    return this.user.onboard.status === 'KYC_KYB_AML_OK';
  }

  userHasCampaignStarted(): boolean {
    const startedStatuses: Campaign['status'][] = [
      'LISTED',
      'FINISHED',
      'TOKENIZATION',
      'DONE',
      'AUDIT_DONE',
    ];
    return this.user.campaigns?.length && startedStatuses.includes(this.user.campaigns[0]?.status);
  }
}
