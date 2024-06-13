import * as Yup from 'yup';
import i18n from 'i18next';

const firstName = Yup.string().max(255).required(i18n.t('register.labels.firstNameValidation'));
const lastName = Yup.string().max(255).required(i18n.t('register.labels.lastNameNameValidation'));
const email = Yup.string()
  .email(i18n.t('register.labels.emailValidationInvalid'))
  .max(255)
  .required(i18n.t('register.labels.emailValidationRequired'));
const phone = Yup.string()
  .matches(
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    i18n.t('register.labels.phoneNumberValidation')
  )
  .required(i18n.t('register.labels.phoneNumberValidationRequired'));
const companyName = Yup.string()
  .nullable()
  .required(i18n.t('company.detailsForm.companyNameRequired'));
const companyCategory = Yup.mixed().required(
  i18n.t('campaign.form.companyCategoryValidationRequired')
);
const campaignShortDescription = Yup.string()
  .max(800)
  .required(i18n.t('campaign.form.shortDescriptionValidation'));
const youtubeLink = Yup.string()
  .matches(
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
    i18n.t('campaign.form.youtubeLinkValid')
  )
  .required(i18n.t('campaign.form.youtubeLinkRequired'));
const currency = Yup.string().required(i18n.t('campaign.form.campaignCurrencyRequired'));
const campaignMinAmount = Yup.number()
  .min(1, i18n.t('campaign.form.amountToRaiseMin'))
  .typeError(i18n.t('campaign.form.amountToRaiseTypeValidation'))
  .required(i18n.t('campaign.form.amountToRaiseRequired'));
const campaignMaxAmount = Yup.number()
  .min(2, i18n.t('campaign.form.maximumAmountToRaiseMin'))
  .typeError(i18n.t('campaign.form.maximumAmountToRaiseTypeValidation'))
  .moreThan(Yup.ref('amountToRaise'), i18n.t('campaign.form.maximumAmountToRaiseLarger'))
  .required(i18n.t('campaign.form.maximumAmountToRaiseRequired'));
const campaignTicketValue = Yup.number()
  .min(1, i18n.t('campaign.form.ticketValueMin'))
  .typeError(i18n.t('campaign.form.ticketValueTypeValidation'))
  .required(i18n.t('campaign.form.ticketValueRequired'));
const equity = Yup.string().max(800).required('Required');
const valuation = Yup.number()
  .typeError(i18n.t('campaign.form.valuationTypeValidation'))
  .required(i18n.t('campaign.form.valuationRequired'));
const maximumTicketsPerInvestor = Yup.number()
  .min(1, i18n.t('campaign.form.maximumTicketsPerInvestorMin'))
  .test({
    name: 'maximumTicketsPerInvestor',
    exclusive: true,
    params: { maximumAmount: Yup.ref('maximumAmountToRaise'), ticketValue: Yup.ref('ticketValue') },
    message: i18n.t('campaign.form.maximumTicketsPerInvestorMax'),
    test: (value, context) => {
      if (value > context.parent.maximumAmountToRaise / context.parent.tokenValue) {
        return false;
      }
      return true;
    },
  })
  .typeError(i18n.t('campaign.form.maximumTicketsPerInvestorTypeValidation'))
  .required(i18n.t('campaign.form.maximumTicketsPerInvestorRequired'));

const registrationNumber = Yup.string()
  .max(255)
  .required(i18n.t('company.detailsForm.registrationNumberRequired'));
const fiscalIdentificationNumber = Yup.string()
  .max(255)
  .required(i18n.t('company.detailsForm.fiscalIdentificationNumberRequired'));
const euRegistrationNumber = Yup.string()
  .max(255)
  .required(i18n.t('company.detailsForm.euRegistrationNumberRequired'));
const website = Yup.string()
  .matches(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    i18n.t('company.detailsForm.websiteValid')
  )
  .required(i18n.t('company.detailsForm.websiteRequired'));
const bankName = Yup.string().max(255).required(i18n.t('company.detailsForm.bankNameRequired'));
const iban = Yup.string().max(255).required(i18n.t('company.detailsForm.ibanRequired'));
const address = Yup.string().max(255).required(i18n.t('company.detailsForm.addressRequired'));
const city = Yup.string().max(255).required(i18n.t('company.detailsForm.cityRequired'));
const country = Yup.string().max(255).required(i18n.t('company.detailsForm.countryRequired'));
const legalForm = Yup.string()
  .matches(/^(?!\s*$)(?:SRL|SA)+$/, i18n.t('company.detailsForm.legalFormValidation'))
  .required(i18n.t('company.detailsForm.legalFormRequired'));

const fullName = Yup.string().max(255).required(i18n.t('campaign.teamForm.fullNameRequired'));
const role = Yup.string().max(255).required(i18n.t('campaign.teamForm.roleRequired'));
const description = Yup.string().max(500).required(i18n.t('campaign.teamForm.descriptionRequired'));
const linkedinProfile = Yup.string()
  .matches(
    /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/,
    i18n.t('campaign.teamForm.linkedinProfileValid')
  )
  .required(i18n.t('campaign.teamForm.linkedinProfileRequired'));
const teamMemberPhoto = Yup.mixed()
  .nullable()
  .required(i18n.t('campaign.teamForm.teamMemberPhotoRequired'));
export {
  firstName,
  lastName,
  email,
  phone,
  companyName,
  companyCategory,
  campaignShortDescription,
  youtubeLink,
  currency,
  campaignMinAmount,
  campaignMaxAmount,
  campaignTicketValue,
  equity,
  valuation,
  maximumTicketsPerInvestor,
  fullName,
  role,
  description,
  registrationNumber,
  fiscalIdentificationNumber,
  euRegistrationNumber,
  website,
  bankName,
  iban,
  address,
  city,
  country,
  legalForm,
  linkedinProfile,
  teamMemberPhoto,
};
