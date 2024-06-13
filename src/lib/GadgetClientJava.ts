import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

export declare namespace Components {
    namespace Schemas {
        export interface AccountManagerDto {
            id?: number; // int64
            firstName?: string;
            lastName?: string;
        }
        export interface AuditDto {
            id?: number; // int64
            url?: string;
            method?: string;
            payload?: string;
            user?: SimplePersonDto;
            createdAt?: string; // date-time
        }
        export interface AuthSessionDto {
            expiresIn?: string;
            accessToken?: string;
            isSecondFactorActive?: boolean;
        }
        export type CampaignCategory = "AGRICULTURE" | "METAL_PRODUCTION" | "CHEMICAL" | "COMMERCE" | "CONSTRUCTION" | "EDUCATION" | "FINANCIAL" | "FOOD" | "FORESTRY" | "HEALTH" | "TOURISM" | "MINING" | "ENGINEERING" | "MEDIA" | "OIL" | "TELECOMUNICATIONS" | "PUBLIC" | "SHIPPING" | "TEXTILES" | "TRANSPORT" | "TRANSPORT_EQUIPMENT" | "UTILITIES";
        export type CampaignCurrency = "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BDT" | "BGN" | "BHD" | "BIF" | "BMD" | "BND" | "BOB" | "BOV" | "BRL" | "BSD" | "BTN" | "BWP" | "BYR" | "BZD" | "CAD" | "CDF" | "CHE" | "CHF" | "CHW" | "CLF" | "CLP" | "CNY" | "COP" | "COU" | "CRC" | "CUC" | "CUP" | "CVE" | "CZK" | "DJF" | "DKK" | "DOP" | "DZD" | "EGP" | "ERN" | "ETB" | "EUR" | "FJD" | "FKP" | "GBP" | "GEL" | "GHS" | "GIP" | "GMD" | "GNF" | "GTQ" | "GYD" | "HKD" | "HNL" | "HRK" | "HTG" | "HUF" | "IDR" | "ILS" | "INR" | "IQD" | "IRR" | "ISK" | "JMD" | "JOD" | "JPY" | "KES" | "KGS" | "KHR" | "KMF" | "KPW" | "KRW" | "KWD" | "KYD" | "KZT" | "LAK" | "LBP" | "LKR" | "LRD" | "LSL" | "LTL" | "LVL" | "LYD" | "MAD" | "MDL" | "MGA" | "MKD" | "MMK" | "MNT" | "MOP" | "MRO" | "MUR" | "MVR" | "MWK" | "MXN" | "MXV" | "MYR" | "MZN" | "NAD" | "NGN" | "NIO" | "NOK" | "NPR" | "NZD" | "OMR" | "PAB" | "PEN" | "PGK" | "PHP" | "PKR" | "PLN" | "PYG" | "QAR" | "RON" | "RSD" | "RUB" | "RWF" | "SAR" | "SBD" | "SCR" | "SDG" | "SEK" | "SGD" | "SHP" | "SLL" | "SOS" | "SRD" | "SSP" | "STD" | "SYP" | "SZL" | "THB" | "TJS" | "TMT" | "TND" | "TOP" | "TRY" | "TTD" | "TWD" | "TZS" | "UAH" | "UGX" | "USD" | "USN" | "USS" | "UYI" | "UYU" | "UZS" | "VEF" | "VND" | "VUV" | "WST" | "XAF" | "XAG" | "XAU" | "XBA" | "XBB" | "XBC" | "XBD" | "XCD" | "XDR" | "XFU" | "XOF" | "XPD" | "XPF" | "XPT" | "XTS" | "XXX" | "YER" | "ZAR" | "ZMW";
        export interface CampaignDto {
            id?: number; // int64
            userid?: number; // int64
            companyId?: number; // int64
            shortDescription?: string;
            description?: string;
            risk?: string;
            qa?: string;
            videoPresentation?: string;
            location?: string;
            startDate?: string; // date-time
            endDate?: string; // date-time
            amountToRaise?: number;
            maximumAmountToRaise?: number;
            amountRaised?: number;
            tokenValue?: number;
            equity?: string;
            valuation?: number;
            maximumTicketsPerInvestor?: number;
            status?: CampaignStatus;
            campaignMembers?: CampaignMemberDto[];
            campaignFiles?: CampaignFileDto[];
            confirmedInvestors?: number;
            presubscribedUser?: boolean;
            category?: CampaignCategory;
            currency?: CampaignCurrency;
        }
        export interface CampaignFileDto {
            id?: number; // int64
            campaignId?: number; // int64
            size?: number; // int64
            name?: string;
            fileType?: string;
            description?: string;
            mimeType?: string;
            filePath?: string;
            type?: CampaignFileType;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        export type CampaignFileType = "BUSINESS_PLAN" | "EXECUTIVE_SUMMARY" | "PITCH" | "MATERIAL_RISK_MANAGEMENT" | "FINANCIAL_STATEMENT" | "TRADE_REGISTRY_CERTIFICATE" | "LAST_3_YEARS_FINANCIAL_STATEMENT" | "TEAM_MEMBERS_PICTURES" | "COVER" | "LOGO" | "LINK" | "DESCRIPTION";
        export interface CampaignInputDto {
            companyId?: number; // int64
            shortDescription: string;
            description?: string;
            risk?: string;
            qa?: string;
            videoPresentation?: string;
            location?: string;
            equity?: string;
            amountToRaise: number;
            maximumAmountToRaise?: number;
            tokenValue?: number;
            valuation?: number;
            maximumTicketsPerInvestor?: number;
            company?: CompanyInputDto;
            status?: CampaignStatus;
            category: CampaignCategory;
            currency?: CampaignCurrency;
            startDate?: string; // date-time
            endDate?: string; // date-time
        }
        export interface CampaignMemberDto {
            id?: number; // int64
            fullName?: string;
            role?: string;
            description?: string;
            linkedinProfile?: string;
            avatar?: string;
            sort?: number; // int32
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        export interface CampaignPublicDto {
            id?: number; // int64
            company?: CompanyDto;
            shortDescription?: string;
            description?: string;
            risk?: string;
            qa?: string;
            videoPresentation?: string;
            location?: string;
            startDate?: string; // date-time
            endDate?: string; // date-time
            amountToRaise?: number;
            maximumAmountToRaise?: number;
            amountRaised?: number;
            tokenValue?: number;
            equity?: string;
            valuation?: number;
            maximumTicketsPerInvestor?: number;
            status?: CampaignStatus;
            campaignMembers?: CampaignMemberDto[];
            campaignFiles?: CampaignFileDto[];
            category?: CampaignCategory;
            currency?: CampaignCurrency;
            confirmedInvestors?: number;
            presubscribedInvestorsNo?: number; // int32
            presubscribedInvestmentsValue?: number; // int32
            confirmedInvestorsNo?: number; // int32
            confirmedInvestmentsValue?: number; // int32
        }
        export type CampaignStatus = "IN_PROGRESS" | "READY" | "AUDIT" | "AUDIT_DONE" | "LISTED" | "FINISHED" | "TOKENIZATION" | "DONE";
        export interface CampaignUpdateDto {
            shortDescription: string;
            description?: string;
            risk?: string;
            qa?: string;
            videoPresentation?: string;
            location?: string;
            companyName?: string;
            equity?: string;
            amountToRaise: number; // int32
            maximumAmountToRaise?: number; // int32
            tokenValue?: number; // int32
            valuation?: number; // int32
            maximumTicketsPerInvestor?: number; // int32
            companyId?: number; // int64
            status?: CampaignStatus;
            category: CampaignCategory;
            currency?: CampaignCurrency;
            startDate?: string; // date-time
            endDate?: string; // date-time
        }
        export interface CompanyDto {
            id?: number; // int64
            name?: string;
            registrationName?: string;
            cui?: string;
            fui?: string;
            website?: string;
            euid?: string;
            bankName?: string;
            iban?: string;
            address?: string;
            city?: string;
            country?: string;
            legalForm?: "SRL" | "SA";
            userid?: number; // int64
            companyMembers?: CompanyMemberDto[];
            companyFiles?: CompanyFileDto[];
        }
        export interface CompanyFileDto {
            id?: number; // int64
            size?: number; // int64
            name?: string;
            fileExtension?: string;
            description?: string;
            filePath?: string;
            mimeType?: string;
            type?: CompanyFileType;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        export type CompanyFileType = "TRADE_REGISTRY_CERTIFICATE" | "LAST_3_YEARS_FINANCIAL_STATEMENT" | "LOGO" | "PITCH_DECK" | "BUSINESS_PLAN" | "INCORPORATION_DOCUMENT" | "CERTIFICATE_OF_STATUS";
        export interface CompanyInputDto {
            name?: string;
            registrationName?: string;
            cui?: string;
            fui?: string;
            website?: string;
            euid?: string;
            bankName?: string;
            iban?: string;
            address?: string;
            city?: string;
            country?: string;
            legalForm?: "SRL" | "SA";
            user?: number;
        }
        export interface CompanyMemberDto {
            id?: number; // int64
            firstName?: string;
            lastName?: string;
            address?: string;
            city?: string;
            country?: string;
            phone?: string;
            equity?: string;
            role?: "LEGAL_REPRESENTATIVE" | "SHAREHOLDER";
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        export interface CompanyMemberInputDto {
            companyId?: number; // int64
            firstName?: string;
            lastName?: string;
            address?: string;
            city?: string;
            country?: string;
            phone?: string;
            equity?: string;
            role?: "LEGAL_REPRESENTATIVE" | "SHAREHOLDER";
        }
        export interface CompanyMemberUpdateDto {
            companyId?: number; // int64
            firstName?: string;
            lastName?: string;
            address?: string;
            city?: string;
            country?: string;
            phone?: string;
            equity?: string;
            role?: "LEGAL_REPRESENTATIVE" | "SHAREHOLDER";
        }
        export interface ErrorDto {
            statusCode?: number; // int32
            message?: string[];
            error?: string;
        }
        export interface FeedbackAnswerDto {
            id?: number; // int64
            extra?: string;
            data?: FeedbackAnswerInputDataDto[];
            form?: FeedbackGetDto;
        }
        export interface FeedbackAnswerInputDataDto {
            inputName?: string;
            extra?: string;
            inputValue?: {
                [key: string]: any;
            };
        }
        export interface FeedbackAnswerInputDto {
            extra?: string;
            data?: FeedbackAnswerInputDataDto[];
        }
        export interface FeedbackAnswerResponseDto {
            id?: number; // int64
            user?: number; // int64
            form?: number; // int64
            extra?: string;
            data?: FeedbackAnswerInputDataDto[];
            createdAt?: string; // date-time
        }
        export interface FeedbackDto {
            id?: number; // int64
            name?: string;
            extra?: string;
            data?: FeedbackRequestDataDto;
        }
        export interface FeedbackGetDto {
            id?: number; // int64
            name?: string;
            data?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        export interface FeedbackRequestDataDto {
            text?: string;
            inputs?: FeedbackRequestDataInputDto[];
        }
        export interface FeedbackRequestDataInputDto {
            name?: string;
            label?: string;
            type?: "input" | "radio" | "checkbox" | "text";
            value?: "string" | "number" | "boolean" | "undefined";
            extra?: {
                [key: string]: any;
            };
        }
        export interface FeedbackRequestDto {
            name?: string;
            data?: FeedbackRequestDataDto;
        }
        export interface FeedbackUpdateRequestDto {
            name?: string;
            data?: FeedbackRequestDataDto;
        }
        export interface InvestmentCampaign {
            id?: number; // int64
            tokenValue?: number; // int32
            currency?: CampaignCurrency;
            company?: SimpleCompanyDto;
        }
        export interface InvestmentCampaignCompanyDto {
            id?: number; // int64
            name?: string;
        }
        export interface InvestmentCampaignDto {
            id?: number; // int64
            tokenValue?: number; // int32
            status?: CampaignStatus;
            company?: InvestmentCampaignCompanyDto;
        }
        export interface InvestmentCreateDto {
            userId?: number; // int64
            campaignId?: number; // int64
            tokenAmount?: number; // int32
        }
        export interface InvestmentDto {
            id?: number; // int64
            tokenAmount?: number; // int32
            status?: "PRESUBSCRIBED" | "NEW" | "VERIFIED" | "NOT_ELIGIBLE" | "AGREEMENT_SENT" | "AGREEMENT_SIGNED" | "SPV_SENT" | "SPV_SIGNED" | "FUNDS_REQUEST" | "FUNDS_RECEIVED" | "AGEA_SENT" | "AGEA_SIGNED" | "TOKENIZATION" | "DONE";
            transferedHash?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            accountManager?: SimplePersonDto;
            user?: SimpleUserDto;
            campaign?: InvestmentCampaignDto;
            investmentFiles?: InvestmentFileDto[];
        }
        export interface InvestmentFileDto {
            id?: number; // int64
            size?: number; // int64
            name?: string;
            fileType?: string;
            description?: string;
            mimeType?: string;
            filePath?: string;
            type?: InvestmentFileType;
            createdAt?: string; // date-time
        }
        export type InvestmentFileType = "INVESTMENT_AGREEMENT" | "SPV_AGREEMENT" | "PROOF_OF_PAYMENT";
        export type InvestmentStatus = "PRESUBSCRIBED" | "NEW" | "VERIFIED" | "NOT_ELIGIBLE" | "AGREEMENT_SENT" | "AGREEMENT_SIGNED" | "SPV_SENT" | "SPV_SIGNED" | "FUNDS_REQUEST" | "FUNDS_RECEIVED" | "AGEA_SENT" | "AGEA_SIGNED" | "TOKENIZATION" | "DONE";
        export interface InvestmentUpdateDto {
            id?: number; // int64
            tokenAmount?: number; // int32
            status?: InvestmentStatus;
        }
        export interface InvestorDto {
            id?: number; // int64
            firstName?: string;
            lastName?: string;
            email?: string;
            phone?: string;
            role?: UserRole;
            onboardStatus?: UserOnboardStatus;
        }
        export interface IssuerDto {
            id?: number; // int64
            firstName?: string;
            lastName?: string;
            email?: string;
            phone?: string;
            role?: UserRole;
            onboardStatus?: UserOnboardStatus;
            companyName?: string;
            accountManagerName?: string;
        }
        export interface KycInputDto {
            id?: string;
            attemptId?: string;
            status?: string;
            action?: string;
            vendorData?: string;
            code?: number; // int32
            verification?: KycInputVerificationDto;
        }
        export interface KycInputVerificationDocumentDto {
            type?: string;
            number?: string;
            country?: string;
            validFrom?: string;
            validUntil?: string;
        }
        export interface KycInputVerificationDto {
            id?: string;
            reason?: string;
            status?: string;
            vendorData?: string;
            code?: number; // int32
            reasonCode?: number; // int32
            person?: KycInputVerificationPersonDto;
            document?: KycInputVerificationDocumentDto;
            comments?: string[];
            additionalVerifiedData?: {
                [name: string]: string;
            };
        }
        export interface KycInputVerificationPersonAddressDto {
            fullAddress?: string;
        }
        export interface KycInputVerificationPersonDto {
            gender?: string;
            idNumber?: string;
            lastName?: string;
            firstName?: string;
            citizenship?: string;
            dateOfBirth?: string;
            nationality?: string;
            placeOfBirth?: string;
            pepSanctionMatch?: string;
            yearOfBirth?: number; // int32
            addresses?: KycInputVerificationPersonAddressDto[];
        }
        export interface KycVerifyResponse {
            sessionId?: string;
            redirectUrl?: string;
            status?: string;
        }
        export interface LogInDto {
            email: string;
            password: string;
        }
        export interface NewCampaignDto {
            id?: number; // int64
            shortDescription?: string;
            description?: string;
            risk?: string;
            qa?: string;
            videoPresentation?: string;
            location?: string;
            equity?: string;
            companyName?: string;
            startDate?: string; // date-time
            endDate?: string; // date-time
            amountToRaise?: number;
            maximumAmountToRaise?: number;
            amountRaised?: number;
            tokenValue?: number;
            valuation?: number;
            maximumTicketsPerInvestor?: number;
            remainingTicketsPerInvestor?: number; // int32
            status?: CampaignStatus;
            category?: CampaignCategory;
            currency?: CampaignCurrency;
            presubscribedUser?: boolean;
            user?: SimpleUserDto;
            accountManager?: SimplePersonDto;
            company?: SimpleCompanyDto;
        }
        export interface NewInvestmentDto {
            id?: number; // int64
            tokenAmount?: number; // int32
            status?: "PRESUBSCRIBED" | "NEW" | "VERIFIED" | "NOT_ELIGIBLE" | "AGREEMENT_SENT" | "AGREEMENT_SIGNED" | "SPV_SENT" | "SPV_SIGNED" | "FUNDS_REQUEST" | "FUNDS_RECEIVED" | "AGEA_SENT" | "AGEA_SIGNED" | "TOKENIZATION" | "DONE";
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            user?: SimplePersonDto;
            tokenValue?: number; // int32
        }
        export interface NewNewsFeedDto {
            id?: number; // int64
            message?: string;
            status?: string;
            user?: SimplePersonDto;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            postFiles?: NewsFeedFileDto[];
        }
        export interface NewsFeedFileDto {
            id?: number; // int64
            size?: number; // int64
            name?: string;
            fileType?: string;
            description?: string;
            mimeType?: string;
            filePath?: string;
            type?: NewsFeedFileType;
            createdAt?: string; // date-time
        }
        export type NewsFeedFileType = "PHOTO" | "DOCUMENT";
        export interface NewsFeedInputDto {
            message?: string;
            fileIds?: number /* int64 */[];
        }
        export type NewsFeedStatus = "PENDING" | "ACCEPTED" | "HIDDEN";
        export interface PresubscribeInvestmentCreateDto {
            campaignId?: number; // int64
            tokenAmount?: number; // int32
        }
        export interface RegisterDto {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            password: string;
            passwordConfirmation: string;
            role?: "ISSUER" | "INVESTOR";
        }
        export interface ResetPasswordDto {
            email: string;
        }
        export interface SimpleCampaignDto {
            id?: number; // int64
            status?: CampaignStatus;
        }
        export interface SimpleCompanyDto {
            id?: number; // int64
            name?: string;
            city?: string;
            country?: string;
        }
        export interface SimpleInvestmentDto {
            id?: number; // int64
            tokenAmount?: number; // int32
            status?: "PRESUBSCRIBED" | "NEW" | "VERIFIED" | "NOT_ELIGIBLE" | "AGREEMENT_SENT" | "AGREEMENT_SIGNED" | "SPV_SENT" | "SPV_SIGNED" | "FUNDS_REQUEST" | "FUNDS_RECEIVED" | "AGEA_SENT" | "AGEA_SIGNED" | "TOKENIZATION" | "DONE";
            campaign?: InvestmentCampaign;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        export interface SimplePersonDto {
            id?: number; // int64
            firstName?: string;
            lastName?: string;
        }
        export interface SimpleUserDto {
            id?: number; // int64
            firstName?: string;
            lastName?: string;
            email?: string;
            phone?: string;
            kycCompleted?: boolean;
        }
        export interface SimpleUserOnboardDto {
            userId?: number; // int64
            status?: UserOnboardStatus;
        }
        export interface TwoFactorAuthenticationInvestmentDto {
            token?: string;
        }
        export interface UpdateNewsFeedDto {
            message?: string;
            fileIds?: number /* int64 */[];
        }
        export interface UpdateNewsFeedPostVisibilityDto {
            status?: NewsFeedStatus;
        }
        export interface UpdatePasswordDto {
            password: string;
            passwordConfirmation: string;
            token: string;
        }
        export interface UpdateUserPasswordDto {
            currentPassword: string;
            newPassword: string;
            newPasswordConfirmation: string;
        }
        export interface UserAnswerInputArrayDto {
            qa?: UserAnswerInputDto[];
        }
        export interface UserAnswerInputDto {
            answer?: number; // int32
            question?: number; // int64
        }
        export interface UserAnswerOutputDto {
            id?: number; // int64
            question?: UserQuestionDto;
            answer?: number; // int32
        }
        export interface UserAnswersScoreDto {
            score?: number;
        }
        export interface UserInputDto {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            password?: string;
            role: UserRole;
        }
        export interface UserKycDto {
            id?: number; // int64
            user?: number; // int64
            status?: string;
            createdAt?: string; // date-time
        }
        export interface UserKycFileDto {
            id?: number; // int64
            type?: UserKycFileType;
            createdAt?: string; // date-time
            name?: string;
        }
        export type UserKycFileType = "IDENTITY" | "PHOTO";
        export interface UserOnboardFileOutputDto {
            id?: number; // int64
            size?: number; // int64
            name?: string;
            description?: string;
            mimeType?: string;
            fileExtension?: string;
            filePath?: string;
            type?: UserOnboardFileType;
        }
        export type UserOnboardFileType = "IDENTITY" | "INVESTMENT_AGREEMENT" | "INVESTMENT_AGREEMENT_SIGNED" | "SPV_AGREEMENT" | "SPV_AGREEMENT_SIGNED" | "PROOF_OF_PAYMENT" | "CONTRACT" | "CONTRACT_SIGNED" | "EXECUTIVE_SUMMARY";
        export interface UserOnboardOutputDto {
            id?: number; // int64
            userid?: number; // int64
            files?: UserOnboardFileOutputDto[];
            accountManager?: AccountManagerDto;
            status?: UserOnboardStatus;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        export type UserOnboardStatus = "OPEN" | "REGISTERED" | "NOT_VERIFIED" | "VERIFIED" | "KYC_KYB_AML" | "KYC_KYB_AML_OK" | "REJECTED" | "NOT_ELIGIBLE";
        export interface UserOnboardStatusDto {
            status?: UserOnboardStatus;
        }
        export interface UserOutputDto {
            id?: number; // int64
            firstName?: string;
            lastName?: string;
            email?: string;
            phone?: string;
            address?: string;
            country?: string;
            active?: boolean;
            kycCompleted?: boolean;
            tourComplete?: boolean;
            questionsCompleted?: boolean;
            verified?: boolean;
            twoFactorActivated?: boolean;
            role?: UserRole;
        }
        export interface UserOutputSingleCampaignCompanyDto {
            id?: number; // int64
            name?: string;
        }
        export interface UserOutputSingleCampaignDto {
            id?: number; // int64
            status?: CampaignStatus;
            tokenValue?: number; // int32
            company?: UserOutputSingleCampaignCompanyDto;
        }
        export interface UserOutputSingleCompanyDto {
            id?: number; // int64
            name?: string;
            companyMembers?: CompanyMemberDto[];
            companyFiles?: CompanyFileDto[];
        }
        export interface UserOutputSingleDto {
            id?: number; // int64
            firstName?: string;
            lastName?: string;
            email?: string;
            phone?: string;
            address?: string;
            country?: string;
            active?: boolean;
            kycCompleted?: boolean;
            tourComplete?: boolean;
            questionsCompleted?: boolean;
            verified?: boolean;
            twoFactorActivated?: boolean;
            role?: UserRole;
            personalNumber?: string;
            cardNumber?: string;
            walletId?: string;
            dateOfBirth?: string;
            qaScore?: number; // int64
            accountManager?: AccountManagerDto;
            onboard?: UserOutputSingleOnboardDto;
            campaigns?: UserOutputSingleCampaignDto[];
            companies?: UserOutputSingleCompanyDto[];
            investments?: UserOutputSingleInvestmentDto[];
            userKyc?: UserOutputSingleKycDto;
            kycFiles?: UserKycFileDto[];
        }
        export interface UserOutputSingleInvestmentDto {
            id?: number; // int64
            status?: InvestmentStatus;
            tokenAmount?: number; // int32
            updatedAt?: string; // date-time
            createdAt?: string; // date-time
        }
        export interface UserOutputSingleKycDto {
            id?: number; // int64
            sessionId?: string;
            status?: string;
            response?: string;
        }
        export interface UserOutputSingleOnboardDto {
            id?: number; // int64
            files?: UserOnboardFileOutputDto[];
            status?: UserOnboardStatus;
        }
        export interface UserQuestionDto {
            id?: number; // int64
            question?: string;
            variant1?: string;
            variant2?: string;
            variant3?: string;
            order?: number; // int32
            active?: boolean;
        }
        export interface UserQuestionInputDto {
            question?: string;
            variant1?: string;
            variant2?: string;
            variant3?: string;
            correctVariant?: number; // int32
            order?: number; // int32
            active?: boolean;
        }
        export type UserRole = "ADMIN" | "ACCOUNT_MANAGER" | "AUDITOR" | "ISSUER" | "INVESTOR" | "USER";
        export interface UserUpdateDto {
            firstName: string;
            lastName: string;
            phone: string;
            address?: string;
            country?: string;
            twoFactorActivated?: boolean;
        }
        export interface UserWalletDto {
            walletId: string;
        }
    }
}
declare namespace Paths {
    namespace AuditControllerGetAuditList {
        namespace Responses {
            export type $200 = Components.Schemas.AuditDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace AuthControllerEmailConfirm {
        namespace Parameters {
            export type Token = string;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace AuthControllerGetLoggedInUser {
        namespace Responses {
            export type $200 = Components.Schemas.AuthSessionDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace AuthControllerLogin {
        export type RequestBody = Components.Schemas.LogInDto;
        namespace Responses {
            export type $200 = Components.Schemas.AuthSessionDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace AuthControllerRegister {
        export type RequestBody = Components.Schemas.RegisterDto;
        namespace Responses {
            export type $200 = Components.Schemas.UserOutputDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace AuthControllerResetPassword {
        export type RequestBody = Components.Schemas.ResetPasswordDto;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace AuthControllerUpdatePassword {
        export type RequestBody = Components.Schemas.UpdatePasswordDto;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerCreateCampaign {
        export type RequestBody = Components.Schemas.CampaignInputDto;
        namespace Responses {
            export type $200 = Components.Schemas.NewCampaignDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerCreateCampaignMember {
        namespace Parameters {
            export type Description = string;
            export type FullName = string;
            export type Id = number; // int64
            export type LinkedinProfile = string;
            export type Role = string;
            export type Sort = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export interface QueryParameters {
            fullName: Parameters.FullName;
            role?: Parameters.Role;
            description?: Parameters.Description;
            sort?: Parameters.Sort /* int32 */;
            linkedinProfile?: Parameters.LinkedinProfile;
        }
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export type $200 = Components.Schemas.CampaignMemberDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerDeleteCampaignFile {
        namespace Parameters {
            export type FileId = number; // int64
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerDeleteCampaignMember {
        namespace Parameters {
            export type Id = number; // int64
            export type MemberId = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            memberId: Parameters.MemberId /* int64 */;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerDownloadCampaignFile {
        namespace Parameters {
            export type FileId = number; // int64
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerDownloadCampaignMemberAvatar {
        namespace Parameters {
            export type MemberId = number; // int64
        }
        export interface PathParameters {
            memberId: Parameters.MemberId /* int64 */;
        }
        namespace Responses {
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerGetCampaign {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.NewCampaignDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerGetCampaignFiles {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CampaignFileDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerGetCampaignList {
        namespace Responses {
            export type $200 = Components.Schemas.NewCampaignDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerGetCampaignMembers {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CampaignMemberDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerGetPublicCampaign {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CampaignPublicDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerGetPublicCampaignList {
        namespace Parameters {
            export type Size = number; // int64
        }
        export interface QueryParameters {
            size?: Parameters.Size /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CampaignPublicDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerIssueCampaignTokens {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = boolean;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerUpdateCampaign {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.CampaignUpdateDto;
        namespace Responses {
            export type $200 = Components.Schemas.NewCampaignDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerUpdateCampaignMember {
        namespace Parameters {
            export type Description = string;
            export type FullName = string;
            export type Id = number; // int64
            export type LinkedinProfile = string;
            export type MemberId = number; // int64
            export type Role = string;
            export type Sort = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            memberId: Parameters.MemberId /* int64 */;
        }
        export interface QueryParameters {
            fullName?: Parameters.FullName;
            role?: Parameters.Role;
            description?: Parameters.Description;
            sort?: Parameters.Sort /* int32 */;
            linkedinProfile?: Parameters.LinkedinProfile;
        }
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export type $200 = Components.Schemas.CampaignMemberDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CampaignControllerUploadCampaignFile {
        namespace Parameters {
            export type DocumentType = Components.Schemas.CampaignFileType;
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            documentType: Parameters.DocumentType;
        }
        export interface RequestBody {
            file: string; // binary
        }
        namespace Responses {
            export type $200 = Components.Schemas.CampaignFileDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerCreateCompany {
        export type RequestBody = Components.Schemas.CompanyInputDto;
        namespace Responses {
            export type $200 = Components.Schemas.CompanyDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerCreateCompanyMember {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.CompanyMemberInputDto;
        namespace Responses {
            export type $200 = Components.Schemas.CompanyMemberDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerDeleteCompanyFile {
        namespace Parameters {
            export type FileId = number; // int64
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerDeleteCompanyMember {
        namespace Parameters {
            export type Id = number; // int64
            export type MemberId = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            memberId: Parameters.MemberId /* int64 */;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerDownloadCompanyFile {
        namespace Parameters {
            export type FileId = number; // int64
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerGetCompanyById {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CompanyDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerGetCompanyFiles {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CompanyFileDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerGetCompanyList {
        namespace Responses {
            export type $200 = Components.Schemas.CompanyDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerGetCompanyMembers {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CompanyMemberDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerUpdateCompany {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.CompanyInputDto;
        namespace Responses {
            export type $200 = Components.Schemas.CompanyDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerUpdateCompanyMember {
        namespace Parameters {
            export type Id = number; // int64
            export type MemberId = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            memberId: Parameters.MemberId /* int64 */;
        }
        export type RequestBody = Components.Schemas.CompanyMemberUpdateDto;
        namespace Responses {
            export type $200 = Components.Schemas.CompanyMemberDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace CompanyControllerUploadCompanyFile {
        namespace Parameters {
            export type DocumentType = Components.Schemas.CompanyFileType;
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            documentType: Parameters.DocumentType;
        }
        export interface RequestBody {
            file: string; // binary
        }
        namespace Responses {
            export type $200 = Components.Schemas.CompanyFileDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace FeedbackControllerAddFeedback {
        export type RequestBody = Components.Schemas.FeedbackRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.FeedbackDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace FeedbackControllerAnswerFeedback {
        namespace Parameters {
            export type FormName = string;
        }
        export interface PathParameters {
            formName: Parameters.FormName;
        }
        export type RequestBody = Components.Schemas.FeedbackAnswerInputDto;
        namespace Responses {
            export type $200 = Components.Schemas.FeedbackAnswerResponseDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace FeedbackControllerGetAllFeedbackAnswers {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FeedbackAnswerDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace FeedbackControllerGetFeedbackForm {
        namespace Parameters {
            export type FormName = string;
        }
        export interface PathParameters {
            formName: Parameters.FormName;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FeedbackGetDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace FeedbackControllerGetFeedbackForms {
        namespace Responses {
            export type $200 = Components.Schemas.FeedbackGetDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace FeedbackControllerUpdateFeedback {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.FeedbackUpdateRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.FeedbackDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace GetLastUserKyc {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserKycDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace GetSimpleCampaignById {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SimpleCampaignDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace GetSimpleCampaignsByUser {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SimpleCampaignDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace GetUserCampaigns {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CampaignDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace GetUserCompanies {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CompanyDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace GetUserKycFiles {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserKycFileDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace GetUserOnboardingStatus {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SimpleUserOnboardDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace HelloAdmin {
        namespace Responses {
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace HelloUser {
        namespace Responses {
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace InvestmentControllerAddInvestmentFile {
        namespace Parameters {
            export type Id = number; // int64
            export type Type = Components.Schemas.InvestmentFileType;
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            type: Parameters.Type;
        }
        export interface RequestBody {
            file: string; // binary
        }
        namespace Responses {
            export type $200 = Components.Schemas.InvestmentFileDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace InvestmentControllerCreateInvestment {
        export type RequestBody = Components.Schemas.InvestmentCreateDto;
        namespace Responses {
            export type $200 = Components.Schemas.InvestmentDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace InvestmentControllerCreatePresubscription {
        export type RequestBody = Components.Schemas.PresubscribeInvestmentCreateDto;
        namespace Responses {
            export type $200 = Components.Schemas.InvestmentDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace InvestmentControllerDeleteInvestmentFile {
        namespace Parameters {
            export type FileId = number; // int64
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace InvestmentControllerDownloadInvestmentFile {
        namespace Parameters {
            export type FileId = number; // int64
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace InvestmentControllerGetAllInvestmentsFromCampaign {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.NewInvestmentDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace InvestmentControllerGetInvestment {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.InvestmentDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace InvestmentControllerGetInvestmentFiles {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.InvestmentFileDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace InvestmentControllerGetInvestments {
        namespace Responses {
            export type $200 = Components.Schemas.InvestmentDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace InvestmentControllerUpdateInvestment {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.InvestmentUpdateDto;
        namespace Responses {
            export type $200 = Components.Schemas.InvestmentDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace NewsFeedControllerAddNewsFeedFile {
        namespace Parameters {
            export type Id = number; // int64
            export type Type = Components.Schemas.NewsFeedFileType;
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            type: Parameters.Type;
        }
        export interface RequestBody {
            file: string; // binary
        }
        namespace Responses {
            export type $200 = Components.Schemas.NewsFeedFileDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace NewsFeedControllerCreatePost {
        export type RequestBody = Components.Schemas.NewsFeedInputDto;
        namespace Responses {
            export type $200 = Components.Schemas.NewNewsFeedDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace NewsFeedControllerDeleteNewsFeedFile {
        namespace Parameters {
            export type FileId = number; // int64
        }
        export interface PathParameters {
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace NewsFeedControllerDeletePost {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.NewNewsFeedDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace NewsFeedControllerDownloadNewsFeedFile {
        namespace Parameters {
            export type FileId = number; // int64
        }
        export interface PathParameters {
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace NewsFeedControllerGetNewsFeedById {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.NewNewsFeedDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace NewsFeedControllerGetNewsFeedList {
        namespace Responses {
            export type $200 = Components.Schemas.NewNewsFeedDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace NewsFeedControllerUpdateNewsFeed {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateNewsFeedDto;
        namespace Responses {
            export type $200 = Components.Schemas.NewNewsFeedDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace NewsFeedControllerUpdatePostVisibility {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.UpdateNewsFeedPostVisibilityDto;
        namespace Responses {
            export type $200 = Components.Schemas.NewNewsFeedDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace Test {
        namespace Responses {
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace TestPubSub {
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace TwoFactorAuthenticationControllerAuthenticate {
        export type RequestBody = Components.Schemas.TwoFactorAuthenticationInvestmentDto;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace TwoFactorAuthenticationControllerTwoFactorAuthenticateGenerate {
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerAddUserAnswers {
        namespace Parameters {
            export type InvestmentId = number; // int64
        }
        export interface PathParameters {
            investmentId: Parameters.InvestmentId /* int64 */;
        }
        export type RequestBody = Components.Schemas.UserAnswerInputArrayDto;
        namespace Responses {
            export type $200 = Components.Schemas.UserAnswersScoreDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerAddUserOnboardDocument {
        namespace Parameters {
            export type DocumentType = Components.Schemas.UserOnboardFileType;
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            documentType: Parameters.DocumentType;
        }
        export interface RequestBody {
            file: string; // binary
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserOnboardFileOutputDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerAddUserQuestion {
        export type RequestBody = Components.Schemas.UserQuestionInputDto;
        namespace Responses {
            export type $200 = Components.Schemas.UserQuestionDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerCreateUser {
        export type RequestBody = Components.Schemas.UserInputDto;
        namespace Responses {
            export type $200 = Components.Schemas.UserOutputDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerDeleteOnboardFile {
        namespace Parameters {
            export type FileId = number; // int64
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerDeleteUserQuestion {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerEventKyc {
        export type RequestBody = Components.Schemas.KycInputDto;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerGetKycFile {
        namespace Parameters {
            export type FileId = number; // int64
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerGetSimpleUserById {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SimpleUserDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerGetUser {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserOutputSingleDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerGetUserAnswerList {
        namespace Parameters {
            export type InvestmentId = number; // int64
        }
        export interface PathParameters {
            investmentId: Parameters.InvestmentId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserAnswerOutputDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerGetUserInvestmentsByUserId {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SimpleInvestmentDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerGetUserOnboard {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserOnboardOutputDto;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerGetUserOnboardDocument {
        namespace Parameters {
            export type FileId = number; // int64
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
            fileId: Parameters.FileId /* int64 */;
        }
        namespace Responses {
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerGetUserOnboardFiles {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserOnboardFileOutputDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerGetUserOnboardList {
        namespace Responses {
            export type $200 = Components.Schemas.UserOnboardOutputDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerGetUserQuestionList {
        namespace Responses {
            export type $200 = Components.Schemas.UserQuestionDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerStartKyc {
        namespace Responses {
            export type $200 = Components.Schemas.KycVerifyResponse;
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerUpdatePassword {
        export type RequestBody = Components.Schemas.UpdateUserPasswordDto;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerUpdateUser {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.UserUpdateDto;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerUpdateUserOnboard {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.UserOnboardStatusDto;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerUpdateUserQuestion {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.UserQuestionInputDto;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerUpdateUserWallet {
        namespace Parameters {
            export type Id = number; // int64
        }
        export interface PathParameters {
            id: Parameters.Id /* int64 */;
        }
        export type RequestBody = Components.Schemas.UserWalletDto;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerUserInvestorList {
        namespace Responses {
            export type $200 = Components.Schemas.InvestorDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerUserIssuerList {
        namespace Responses {
            export type $200 = Components.Schemas.IssuerDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
    namespace UserControllerUserList {
        namespace Parameters {
            export type Email = string;
            export type Role = Components.Schemas.UserRole;
        }
        export interface QueryParameters {
            email?: Parameters.Email;
            role?: Parameters.Role;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserOutputDto[];
            export type $400 = Components.Schemas.ErrorDto;
            export type $401 = Components.Schemas.ErrorDto;
            export type $403 = Components.Schemas.ErrorDto;
            export type $404 = Components.Schemas.ErrorDto;
            export type $406 = Components.Schemas.ErrorDto;
            export type $409 = Components.Schemas.ErrorDto;
            export type $500 = Components.Schemas.ErrorDto;
        }
    }
}

export interface OperationMethods {
  /**
   * userControllerGetUser - Get user details
   */
  'userControllerGetUser'(
    parameters?: Parameters<Paths.UserControllerGetUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetUser.Responses.$200>
  /**
   * userControllerUpdateUser - Update user
   */
  'userControllerUpdateUser'(
    parameters?: Parameters<Paths.UserControllerUpdateUser.PathParameters> | null,
    data?: Paths.UserControllerUpdateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerUpdateUser.Responses.$200>
  /**
   * userControllerUpdateUserWallet - Update user wallet
   */
  'userControllerUpdateUserWallet'(
    parameters?: Parameters<Paths.UserControllerUpdateUserWallet.PathParameters> | null,
    data?: Paths.UserControllerUpdateUserWallet.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerUpdateUserWallet.Responses.$200>
  /**
   * userControllerUpdateUserQuestion - Update question
   */
  'userControllerUpdateUserQuestion'(
    parameters?: Parameters<Paths.UserControllerUpdateUserQuestion.PathParameters> | null,
    data?: Paths.UserControllerUpdateUserQuestion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerUpdateUserQuestion.Responses.$200>
  /**
   * userControllerDeleteUserQuestion - Delete question
   */
  'userControllerDeleteUserQuestion'(
    parameters?: Parameters<Paths.UserControllerDeleteUserQuestion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerDeleteUserQuestion.Responses.$200>
  /**
   * userControllerGetUserOnboard - Get onboard details
   */
  'userControllerGetUserOnboard'(
    parameters?: Parameters<Paths.UserControllerGetUserOnboard.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetUserOnboard.Responses.$200>
  /**
   * userControllerUpdateUserOnboard - Update user onboard request
   */
  'userControllerUpdateUserOnboard'(
    parameters?: Parameters<Paths.UserControllerUpdateUserOnboard.PathParameters> | null,
    data?: Paths.UserControllerUpdateUserOnboard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerUpdateUserOnboard.Responses.$200>
  /**
   * newsFeedControllerGetNewsFeedById - Get news feed post details
   */
  'newsFeedControllerGetNewsFeedById'(
    parameters?: Parameters<Paths.NewsFeedControllerGetNewsFeedById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsFeedControllerGetNewsFeedById.Responses.$200>
  /**
   * newsFeedControllerUpdateNewsFeed - Update news feed post details
   */
  'newsFeedControllerUpdateNewsFeed'(
    parameters?: Parameters<Paths.NewsFeedControllerUpdateNewsFeed.PathParameters> | null,
    data?: Paths.NewsFeedControllerUpdateNewsFeed.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsFeedControllerUpdateNewsFeed.Responses.$200>
  /**
   * newsFeedControllerUpdatePostVisibility - Update news feed post visibility
   */
  'newsFeedControllerUpdatePostVisibility'(
    parameters?: Parameters<Paths.NewsFeedControllerUpdatePostVisibility.PathParameters> | null,
    data?: Paths.NewsFeedControllerUpdatePostVisibility.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsFeedControllerUpdatePostVisibility.Responses.$200>
  /**
   * newsFeedControllerDeletePost - Delete news feed post
   */
  'newsFeedControllerDeletePost'(
    parameters?: Parameters<Paths.NewsFeedControllerDeletePost.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsFeedControllerDeletePost.Responses.$200>
  /**
   * investmentControllerGetInvestment - Get investment request
   */
  'investmentControllerGetInvestment'(
    parameters?: Parameters<Paths.InvestmentControllerGetInvestment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvestmentControllerGetInvestment.Responses.$200>
  /**
   * investmentControllerUpdateInvestment - Update investment request
   */
  'investmentControllerUpdateInvestment'(
    parameters?: Parameters<Paths.InvestmentControllerUpdateInvestment.PathParameters> | null,
    data?: Paths.InvestmentControllerUpdateInvestment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvestmentControllerUpdateInvestment.Responses.$200>
  /**
   * feedbackControllerUpdateFeedback - Update feedback form
   */
  'feedbackControllerUpdateFeedback'(
    parameters?: Parameters<Paths.FeedbackControllerUpdateFeedback.PathParameters> | null,
    data?: Paths.FeedbackControllerUpdateFeedback.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FeedbackControllerUpdateFeedback.Responses.$200>
  /**
   * companyControllerGetCompanyById - Get company details
   */
  'companyControllerGetCompanyById'(
    parameters?: Parameters<Paths.CompanyControllerGetCompanyById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerGetCompanyById.Responses.$200>
  /**
   * companyControllerUpdateCompany - Update company details
   */
  'companyControllerUpdateCompany'(
    parameters?: Parameters<Paths.CompanyControllerUpdateCompany.PathParameters> | null,
    data?: Paths.CompanyControllerUpdateCompany.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerUpdateCompany.Responses.$200>
  /**
   * companyControllerUpdateCompanyMember - Update company member
   */
  'companyControllerUpdateCompanyMember'(
    parameters?: Parameters<Paths.CompanyControllerUpdateCompanyMember.PathParameters> | null,
    data?: Paths.CompanyControllerUpdateCompanyMember.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerUpdateCompanyMember.Responses.$200>
  /**
   * companyControllerDeleteCompanyMember - Delete company member
   */
  'companyControllerDeleteCompanyMember'(
    parameters?: Parameters<Paths.CompanyControllerDeleteCompanyMember.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerDeleteCompanyMember.Responses.$200>
  /**
   * campaignControllerGetCampaign - Get campaign details
   */
  'campaignControllerGetCampaign'(
    parameters?: Parameters<Paths.CampaignControllerGetCampaign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerGetCampaign.Responses.$200>
  /**
   * campaignControllerUpdateCampaign - Update campaign details
   */
  'campaignControllerUpdateCampaign'(
    parameters?: Parameters<Paths.CampaignControllerUpdateCampaign.PathParameters> | null,
    data?: Paths.CampaignControllerUpdateCampaign.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerUpdateCampaign.Responses.$200>
  /**
   * campaignControllerUpdateCampaignMember - Update campaign member
   */
  'campaignControllerUpdateCampaignMember'(
    parameters?: Parameters<Paths.CampaignControllerUpdateCampaignMember.PathParameters & Paths.CampaignControllerUpdateCampaignMember.QueryParameters> | null,
    data?: FormData,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerUpdateCampaignMember.Responses.$200>
  /**
   * campaignControllerDeleteCampaignMember - Delete campaign member
   */
  'campaignControllerDeleteCampaignMember'(
    parameters?: Parameters<Paths.CampaignControllerDeleteCampaignMember.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerDeleteCampaignMember.Responses.$200>
  /**
   * userControllerCreateUser - Create user
   */
  'userControllerCreateUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UserControllerCreateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerCreateUser.Responses.$200>
  /**
   * userControllerStartKyc - KYC verification
   */
  'userControllerStartKyc'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerStartKyc.Responses.$200>
  /**
   * userControllerEventKyc - KYC response
   */
  'userControllerEventKyc'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UserControllerEventKyc.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerEventKyc.Responses.$200>
  /**
   * userControllerUpdatePassword - Update user password
   */
  'userControllerUpdatePassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UserControllerUpdatePassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerUpdatePassword.Responses.$200>
  /**
   * userControllerAddUserQuestion - Add new question
   */
  'userControllerAddUserQuestion'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UserControllerAddUserQuestion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerAddUserQuestion.Responses.$200>
  /**
   * userControllerAddUserOnboardDocument - Upload documents for specific onboard ID
   */
  'userControllerAddUserOnboardDocument'(
    parameters?: Parameters<Paths.UserControllerAddUserOnboardDocument.PathParameters> | null,
    data?: FormData,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerAddUserOnboardDocument.Responses.$200>
  /**
   * userControllerAddUserAnswers - Add answers
   */
  'userControllerAddUserAnswers'(
    parameters?: Parameters<Paths.UserControllerAddUserAnswers.PathParameters> | null,
    data?: Paths.UserControllerAddUserAnswers.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerAddUserAnswers.Responses.$200>
  /**
   * newsFeedControllerCreatePost - Create news feed post
   */
  'newsFeedControllerCreatePost'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.NewsFeedControllerCreatePost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsFeedControllerCreatePost.Responses.$200>
  /**
   * newsFeedControllerAddNewsFeedFile - Upload file for news feed
   */
  'newsFeedControllerAddNewsFeedFile'(
    parameters?: { id: number; type: Components.Schemas.NewsFeedFileType },
    data?: FormData,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsFeedControllerAddNewsFeedFile.Responses.$200>
  /**
   * investmentControllerCreateInvestment - Create investment request
   */
  'investmentControllerCreateInvestment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.InvestmentControllerCreateInvestment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvestmentControllerCreateInvestment.Responses.$200>
  /**
   * investmentControllerAddInvestmentFile - Upload file for investment request
   */
  'investmentControllerAddInvestmentFile'(
    parameters?: { id: number; type: Components.Schemas.InvestmentFileType },
    data?: FormData,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvestmentControllerAddInvestmentFile.Responses.$200>
  /**
   * investmentControllerCreatePresubscription - Create presubscription
   */
  'investmentControllerCreatePresubscription'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.InvestmentControllerCreatePresubscription.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvestmentControllerCreatePresubscription.Responses.$200>
  /**
   * feedbackControllerGetFeedbackForms - Get feedback forms
   */
  'feedbackControllerGetFeedbackForms'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FeedbackControllerGetFeedbackForms.Responses.$200>
  /**
   * feedbackControllerAddFeedback - Add feedback form
   */
  'feedbackControllerAddFeedback'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.FeedbackControllerAddFeedback.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FeedbackControllerAddFeedback.Responses.$200>
  /**
   * feedbackControllerAnswerFeedback - Answer for feedback form by name
   */
  'feedbackControllerAnswerFeedback'(
    parameters?: Parameters<Paths.FeedbackControllerAnswerFeedback.PathParameters> | null,
    data?: Paths.FeedbackControllerAnswerFeedback.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FeedbackControllerAnswerFeedback.Responses.$200>
  /**
   * companyControllerCreateCompany - Create a new company
   */
  'companyControllerCreateCompany'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CompanyControllerCreateCompany.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerCreateCompany.Responses.$200>
  /**
   * companyControllerCreateCompanyMember - Add company member
   */
  'companyControllerCreateCompanyMember'(
    parameters?: Parameters<Paths.CompanyControllerCreateCompanyMember.PathParameters> | null,
    data?: Paths.CompanyControllerCreateCompanyMember.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerCreateCompanyMember.Responses.$200>
  /**
   * companyControllerUploadCompanyFile - Upload company file
   */
  'companyControllerUploadCompanyFile'(
    parameters?: { documentType: Components.Schemas.CompanyFileType; id: number },
    data?: FormData,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerUploadCompanyFile.Responses.$200>
  /**
   * campaignControllerCreateCampaign - Create a new campaign
   */
  'campaignControllerCreateCampaign'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CampaignControllerCreateCampaign.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerCreateCampaign.Responses.$200>
  /**
   * campaignControllerCreateCampaignMember - Add campaign member
   */
  'campaignControllerCreateCampaignMember'(
    parameters?: { id: number },
    data?: FormData,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerCreateCampaignMember.Responses.$200>
  /**
   * campaignControllerIssueCampaignTokens - Issue campaign tokens
   */
  'campaignControllerIssueCampaignTokens'(
    parameters?: Parameters<Paths.CampaignControllerIssueCampaignTokens.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerIssueCampaignTokens.Responses.$200>
  /**
   * campaignControllerUploadCampaignFile - Upload campaign file
   */
  'campaignControllerUploadCampaignFile'(
    parameters?: Parameters<Paths.CampaignControllerUploadCampaignFile.PathParameters> | null,
    data?: FormData,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerUploadCampaignFile.Responses.$200>
  /**
   * authControllerUpdatePassword - Request to update password with reset password token
   */
  'authControllerUpdatePassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerUpdatePassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerUpdatePassword.Responses.$200>
  /**
   * authControllerResetPassword - Request to reset password
   */
  'authControllerResetPassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerResetPassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerResetPassword.Responses.$200>
  /**
   * authControllerRegister - Register endpoint
   */
  'authControllerRegister'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerRegister.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerRegister.Responses.$200>
  /**
   * authControllerLogin - Login endpoint
   */
  'authControllerLogin'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerLogin.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerLogin.Responses.$200>
  /**
   * twoFactorAuthenticationControllerAuthenticate - Generate token to access API when user has 2FA activated
   */
  'twoFactorAuthenticationControllerAuthenticate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.TwoFactorAuthenticationControllerAuthenticate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TwoFactorAuthenticationControllerAuthenticate.Responses.$200>
  /**
   * userControllerGetSimpleUserById - Get Simple User
   */
  'userControllerGetSimpleUserById'(
    parameters?: Parameters<Paths.UserControllerGetSimpleUserById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetSimpleUserById.Responses.$200>
  /**
   * getUserOnboardingStatus - Get User Onboarding Status
   */
  'getUserOnboardingStatus'(
    parameters?: Parameters<Paths.GetUserOnboardingStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserOnboardingStatus.Responses.$200>
  /**
   * getUserKycFiles - Get user kyc files
   */
  'getUserKycFiles'(
    parameters?: Parameters<Paths.GetUserKycFiles.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserKycFiles.Responses.$200>
  /**
   * userControllerGetKycFile - Download kyc file for specific user ID
   */
  'userControllerGetKycFile'(
    parameters?: Parameters<Paths.UserControllerGetKycFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * getLastUserKyc - Get last user kyc
   */
  'getLastUserKyc'(
    parameters?: Parameters<Paths.GetLastUserKyc.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLastUserKyc.Responses.$200>
  /**
   * userControllerGetUserInvestmentsByUserId - Get User Simple Investments
   */
  'userControllerGetUserInvestmentsByUserId'(
    parameters?: Parameters<Paths.UserControllerGetUserInvestmentsByUserId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetUserInvestmentsByUserId.Responses.$200>
  /**
   * getUserCompanies - Get user companies
   */
  'getUserCompanies'(
    parameters?: Parameters<Paths.GetUserCompanies.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserCompanies.Responses.$200>
  /**
   * getUserCampaigns - Get user campaigns
   */
  'getUserCampaigns'(
    parameters?: Parameters<Paths.GetUserCampaigns.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserCampaigns.Responses.$200>
  /**
   * getSimpleCampaignsByUser - Get User Simple Campaigns
   */
  'getSimpleCampaignsByUser'(
    parameters?: Parameters<Paths.GetSimpleCampaignsByUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSimpleCampaignsByUser.Responses.$200>
  /**
   * userControllerGetUserQuestionList - List all active questions
   */
  'userControllerGetUserQuestionList'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetUserQuestionList.Responses.$200>
  /**
   * userControllerGetUserOnboardFiles - Get files for specific onboard ID
   */
  'userControllerGetUserOnboardFiles'(
    parameters?: Parameters<Paths.UserControllerGetUserOnboardFiles.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetUserOnboardFiles.Responses.$200>
  /**
   * userControllerGetUserOnboardDocument - Download documents for specific onboard ID
   */
  'userControllerGetUserOnboardDocument'(
    parameters?: Parameters<Paths.UserControllerGetUserOnboardDocument.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * userControllerDeleteOnboardFile - Delete onboard file
   */
  'userControllerDeleteOnboardFile'(
    parameters?: Parameters<Paths.UserControllerDeleteOnboardFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerDeleteOnboardFile.Responses.$200>
  /**
   * userControllerGetUserOnboardList - List all onboard requests
   */
  'userControllerGetUserOnboardList'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetUserOnboardList.Responses.$200>
  /**
   * userControllerUserList - List all registered users
   */
  'userControllerUserList'(
    parameters?: Parameters<Paths.UserControllerUserList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerUserList.Responses.$200>
  /**
   * userControllerUserIssuerList - List all issuers
   */
  'userControllerUserIssuerList'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerUserIssuerList.Responses.$200>
  /**
   * userControllerUserInvestorList - List all investors
   */
  'userControllerUserInvestorList'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerUserInvestorList.Responses.$200>
  /**
   * userControllerGetUserAnswerList - List answers to questions
   */
  'userControllerGetUserAnswerList'(
    parameters?: Parameters<Paths.UserControllerGetUserAnswerList.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetUserAnswerList.Responses.$200>
  /**
   * newsFeedControllerGetNewsFeedList - List all news feed posts
   */
  'newsFeedControllerGetNewsFeedList'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsFeedControllerGetNewsFeedList.Responses.$200>
  /**
   * newsFeedControllerDownloadNewsFeedFile - Download news feed file
   */
  'newsFeedControllerDownloadNewsFeedFile'(
    parameters?: Parameters<Paths.NewsFeedControllerDownloadNewsFeedFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * newsFeedControllerDeleteNewsFeedFile - Delete news feed file
   */
  'newsFeedControllerDeleteNewsFeedFile'(
    parameters?: Parameters<Paths.NewsFeedControllerDeleteNewsFeedFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsFeedControllerDeleteNewsFeedFile.Responses.$200>
  /**
   * investmentControllerGetInvestmentFiles - Get files from investment request
   */
  'investmentControllerGetInvestmentFiles'(
    parameters?: Parameters<Paths.InvestmentControllerGetInvestmentFiles.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvestmentControllerGetInvestmentFiles.Responses.$200>
  /**
   * investmentControllerDownloadInvestmentFile - Download investment file
   */
  'investmentControllerDownloadInvestmentFile'(
    parameters?: Parameters<Paths.InvestmentControllerDownloadInvestmentFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * investmentControllerDeleteInvestmentFile - Delete investment file
   */
  'investmentControllerDeleteInvestmentFile'(
    parameters?: Parameters<Paths.InvestmentControllerDeleteInvestmentFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvestmentControllerDeleteInvestmentFile.Responses.$200>
  /**
   * investmentControllerGetInvestments - Get investments request
   */
  'investmentControllerGetInvestments'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvestmentControllerGetInvestments.Responses.$200>
  /**
   * investmentControllerGetAllInvestmentsFromCampaign - Get investment request
   */
  'investmentControllerGetAllInvestmentsFromCampaign'(
    parameters?: Parameters<Paths.InvestmentControllerGetAllInvestmentsFromCampaign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvestmentControllerGetAllInvestmentsFromCampaign.Responses.$200>
  /**
   * test
   */
  'test'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * helloUser
   */
  'helloUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * testPubSub
   */
  'testPubSub'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestPubSub.Responses.$200>
  /**
   * helloAdmin
   */
  'helloAdmin'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * feedbackControllerGetAllFeedbackAnswers - Get Feedback form answers
   */
  'feedbackControllerGetAllFeedbackAnswers'(
    parameters?: Parameters<Paths.FeedbackControllerGetAllFeedbackAnswers.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FeedbackControllerGetAllFeedbackAnswers.Responses.$200>
  /**
   * feedbackControllerGetFeedbackForm - Get feedback form data by form name
   */
  'feedbackControllerGetFeedbackForm'(
    parameters?: Parameters<Paths.FeedbackControllerGetFeedbackForm.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FeedbackControllerGetFeedbackForm.Responses.$200>
  /**
   * companyControllerGetCompanyMembers - Get company members
   */
  'companyControllerGetCompanyMembers'(
    parameters?: Parameters<Paths.CompanyControllerGetCompanyMembers.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerGetCompanyMembers.Responses.$200>
  /**
   * companyControllerGetCompanyFiles - Get company files
   */
  'companyControllerGetCompanyFiles'(
    parameters?: Parameters<Paths.CompanyControllerGetCompanyFiles.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerGetCompanyFiles.Responses.$200>
  /**
   * companyControllerDownloadCompanyFile - Download company file
   */
  'companyControllerDownloadCompanyFile'(
    parameters?: Parameters<Paths.CompanyControllerDownloadCompanyFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * companyControllerDeleteCompanyFile - Delete company file
   */
  'companyControllerDeleteCompanyFile'(
    parameters?: Parameters<Paths.CompanyControllerDeleteCompanyFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerDeleteCompanyFile.Responses.$200>
  /**
   * companyControllerGetCompanyList - List all companies
   */
  'companyControllerGetCompanyList'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompanyControllerGetCompanyList.Responses.$200>
  /**
   * getSimpleCampaignById - Get Simple Campaign By Id
   */
  'getSimpleCampaignById'(
    parameters?: Parameters<Paths.GetSimpleCampaignById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSimpleCampaignById.Responses.$200>
  /**
   * campaignControllerGetPublicCampaign - Get public campaign
   */
  'campaignControllerGetPublicCampaign'(
    parameters?: Parameters<Paths.CampaignControllerGetPublicCampaign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerGetPublicCampaign.Responses.$200>
  /**
   * campaignControllerGetCampaignMembers - Get campaign members
   */
  'campaignControllerGetCampaignMembers'(
    parameters?: Parameters<Paths.CampaignControllerGetCampaignMembers.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerGetCampaignMembers.Responses.$200>
  /**
   * campaignControllerGetCampaignFiles - Get campaign files
   */
  'campaignControllerGetCampaignFiles'(
    parameters?: Parameters<Paths.CampaignControllerGetCampaignFiles.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerGetCampaignFiles.Responses.$200>
  /**
   * campaignControllerDownloadCampaignFile - Download campaign file
   */
  'campaignControllerDownloadCampaignFile'(
    parameters?: Parameters<Paths.CampaignControllerDownloadCampaignFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * campaignControllerDeleteCampaignFile - Delete campaign file
   */
  'campaignControllerDeleteCampaignFile'(
    parameters?: Parameters<Paths.CampaignControllerDeleteCampaignFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerDeleteCampaignFile.Responses.$200>
  /**
   * campaignControllerDownloadCampaignMemberAvatar - Download campaign member avatar
   */
  'campaignControllerDownloadCampaignMemberAvatar'(
    parameters?: Parameters<Paths.CampaignControllerDownloadCampaignMemberAvatar.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * campaignControllerGetCampaignList - List all campaigns
   */
  'campaignControllerGetCampaignList'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerGetCampaignList.Responses.$200>
  /**
   * campaignControllerGetPublicCampaignList - List public campaigns
   */
  'campaignControllerGetPublicCampaignList'(
    parameters?: Parameters<Paths.CampaignControllerGetPublicCampaignList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignControllerGetPublicCampaignList.Responses.$200>
  /**
   * authControllerGetLoggedInUser - Callback endpoint for Google Auth
   */
  'authControllerGetLoggedInUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerGetLoggedInUser.Responses.$200>
  /**
   * authControllerEmailConfirm - Set user email to verified if token is valid
   */
  'authControllerEmailConfirm'(
    parameters?: Parameters<Paths.AuthControllerEmailConfirm.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerEmailConfirm.Responses.$200>
  /**
   * auditControllerGetAuditList - List audit logs
   */
  'auditControllerGetAuditList'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuditControllerGetAuditList.Responses.$200>
  /**
   * twoFactorAuthenticationControllerTwoFactorAuthenticateGenerate - Generate qrcode to activate 2FA
   */
  'twoFactorAuthenticationControllerTwoFactorAuthenticateGenerate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TwoFactorAuthenticationControllerTwoFactorAuthenticateGenerate.Responses.$200>
}

export interface PathsDictionary {
  ['/user/{id}']: {
    /**
     * userControllerGetUser - Get user details
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetUser.Responses.$200>
    /**
     * userControllerUpdateUser - Update user
     */
    'put'(
      parameters?: Parameters<Paths.UserControllerUpdateUser.PathParameters> | null,
      data?: Paths.UserControllerUpdateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerUpdateUser.Responses.$200>
  }
  ['/user/{id}/wallet']: {
    /**
     * userControllerUpdateUserWallet - Update user wallet
     */
    'put'(
      parameters?: Parameters<Paths.UserControllerUpdateUserWallet.PathParameters> | null,
      data?: Paths.UserControllerUpdateUserWallet.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerUpdateUserWallet.Responses.$200>
  }
  ['/user/question/{id}']: {
    /**
     * userControllerUpdateUserQuestion - Update question
     */
    'put'(
      parameters?: Parameters<Paths.UserControllerUpdateUserQuestion.PathParameters> | null,
      data?: Paths.UserControllerUpdateUserQuestion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerUpdateUserQuestion.Responses.$200>
    /**
     * userControllerDeleteUserQuestion - Delete question
     */
    'delete'(
      parameters?: Parameters<Paths.UserControllerDeleteUserQuestion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerDeleteUserQuestion.Responses.$200>
  }
  ['/user/onboard/{id}']: {
    /**
     * userControllerGetUserOnboard - Get onboard details
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetUserOnboard.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetUserOnboard.Responses.$200>
    /**
     * userControllerUpdateUserOnboard - Update user onboard request
     */
    'put'(
      parameters?: Parameters<Paths.UserControllerUpdateUserOnboard.PathParameters> | null,
      data?: Paths.UserControllerUpdateUserOnboard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerUpdateUserOnboard.Responses.$200>
  }
  ['/news-feed/{id}']: {
    /**
     * newsFeedControllerGetNewsFeedById - Get news feed post details
     */
    'get'(
      parameters?: Parameters<Paths.NewsFeedControllerGetNewsFeedById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsFeedControllerGetNewsFeedById.Responses.$200>
    /**
     * newsFeedControllerUpdateNewsFeed - Update news feed post details
     */
    'put'(
      parameters?: Parameters<Paths.NewsFeedControllerUpdateNewsFeed.PathParameters> | null,
      data?: Paths.NewsFeedControllerUpdateNewsFeed.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsFeedControllerUpdateNewsFeed.Responses.$200>
    /**
     * newsFeedControllerUpdatePostVisibility - Update news feed post visibility
     */
    'post'(
      parameters?: Parameters<Paths.NewsFeedControllerUpdatePostVisibility.PathParameters> | null,
      data?: Paths.NewsFeedControllerUpdatePostVisibility.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsFeedControllerUpdatePostVisibility.Responses.$200>
    /**
     * newsFeedControllerDeletePost - Delete news feed post
     */
    'delete'(
      parameters?: Parameters<Paths.NewsFeedControllerDeletePost.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsFeedControllerDeletePost.Responses.$200>
  }
  ['/investment/{id}']: {
    /**
     * investmentControllerGetInvestment - Get investment request
     */
    'get'(
      parameters?: Parameters<Paths.InvestmentControllerGetInvestment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvestmentControllerGetInvestment.Responses.$200>
    /**
     * investmentControllerUpdateInvestment - Update investment request
     */
    'put'(
      parameters?: Parameters<Paths.InvestmentControllerUpdateInvestment.PathParameters> | null,
      data?: Paths.InvestmentControllerUpdateInvestment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvestmentControllerUpdateInvestment.Responses.$200>
  }
  ['/feedback/{id}']: {
    /**
     * feedbackControllerUpdateFeedback - Update feedback form
     */
    'put'(
      parameters?: Parameters<Paths.FeedbackControllerUpdateFeedback.PathParameters> | null,
      data?: Paths.FeedbackControllerUpdateFeedback.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FeedbackControllerUpdateFeedback.Responses.$200>
  }
  ['/company/{id}']: {
    /**
     * companyControllerGetCompanyById - Get company details
     */
    'get'(
      parameters?: Parameters<Paths.CompanyControllerGetCompanyById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerGetCompanyById.Responses.$200>
    /**
     * companyControllerUpdateCompany - Update company details
     */
    'put'(
      parameters?: Parameters<Paths.CompanyControllerUpdateCompany.PathParameters> | null,
      data?: Paths.CompanyControllerUpdateCompany.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerUpdateCompany.Responses.$200>
  }
  ['/company/{id}/member/{memberId}']: {
    /**
     * companyControllerUpdateCompanyMember - Update company member
     */
    'put'(
      parameters?: Parameters<Paths.CompanyControllerUpdateCompanyMember.PathParameters> | null,
      data?: Paths.CompanyControllerUpdateCompanyMember.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerUpdateCompanyMember.Responses.$200>
    /**
     * companyControllerDeleteCompanyMember - Delete company member
     */
    'delete'(
      parameters?: Parameters<Paths.CompanyControllerDeleteCompanyMember.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerDeleteCompanyMember.Responses.$200>
  }
  ['/campaign/{id}']: {
    /**
     * campaignControllerGetCampaign - Get campaign details
     */
    'get'(
      parameters?: Parameters<Paths.CampaignControllerGetCampaign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerGetCampaign.Responses.$200>
    /**
     * campaignControllerUpdateCampaign - Update campaign details
     */
    'put'(
      parameters?: Parameters<Paths.CampaignControllerUpdateCampaign.PathParameters> | null,
      data?: Paths.CampaignControllerUpdateCampaign.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerUpdateCampaign.Responses.$200>
  }
  ['/campaign/{id}/member/{memberId}']: {
    /**
     * campaignControllerUpdateCampaignMember - Update campaign member
     */
    'put'(
      parameters?: Parameters<Paths.CampaignControllerUpdateCampaignMember.PathParameters & Paths.CampaignControllerUpdateCampaignMember.QueryParameters> | null,
      data?: Paths.CampaignControllerUpdateCampaignMember.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerUpdateCampaignMember.Responses.$200>
    /**
     * campaignControllerDeleteCampaignMember - Delete campaign member
     */
    'delete'(
      parameters?: Parameters<Paths.CampaignControllerDeleteCampaignMember.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerDeleteCampaignMember.Responses.$200>
  }
  ['/user']: {
    /**
     * userControllerCreateUser - Create user
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UserControllerCreateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerCreateUser.Responses.$200>
  }
  ['/user/verify']: {
    /**
     * userControllerStartKyc - KYC verification
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerStartKyc.Responses.$200>
  }
  ['/user/verify/callback']: {
    /**
     * userControllerEventKyc - KYC response
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UserControllerEventKyc.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerEventKyc.Responses.$200>
  }
  ['/user/updatePassword']: {
    /**
     * userControllerUpdatePassword - Update user password
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UserControllerUpdatePassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerUpdatePassword.Responses.$200>
  }
  ['/user/question']: {
    /**
     * userControllerAddUserQuestion - Add new question
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UserControllerAddUserQuestion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerAddUserQuestion.Responses.$200>
  }
  ['/user/onboard/{id}/file/{documentType}']: {
    /**
     * userControllerAddUserOnboardDocument - Upload documents for specific onboard ID
     */
    'post'(
      parameters?: Parameters<Paths.UserControllerAddUserOnboardDocument.PathParameters> | null,
      data?: Paths.UserControllerAddUserOnboardDocument.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerAddUserOnboardDocument.Responses.$200>
  }
  ['/user/answers/{investmentId}']: {
    /**
     * userControllerAddUserAnswers - Add answers
     */
    'post'(
      parameters?: Parameters<Paths.UserControllerAddUserAnswers.PathParameters> | null,
      data?: Paths.UserControllerAddUserAnswers.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerAddUserAnswers.Responses.$200>
  }
  ['/news-feed']: {
    /**
     * newsFeedControllerCreatePost - Create news feed post
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.NewsFeedControllerCreatePost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsFeedControllerCreatePost.Responses.$200>
  }
  ['/news-feed/{id}/file/{type}']: {
    /**
     * newsFeedControllerAddNewsFeedFile - Upload file for news feed
     */
    'post'(
      parameters?: Parameters<Paths.NewsFeedControllerAddNewsFeedFile.PathParameters> | null,
      data?: Paths.NewsFeedControllerAddNewsFeedFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsFeedControllerAddNewsFeedFile.Responses.$200>
  }
  ['/investment']: {
    /**
     * investmentControllerCreateInvestment - Create investment request
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.InvestmentControllerCreateInvestment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvestmentControllerCreateInvestment.Responses.$200>
  }
  ['/investment/{id}/file/{type}']: {
    /**
     * investmentControllerAddInvestmentFile - Upload file for investment request
     */
    'post'(
      parameters?: Parameters<Paths.InvestmentControllerAddInvestmentFile.PathParameters> | null,
      data?: Paths.InvestmentControllerAddInvestmentFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvestmentControllerAddInvestmentFile.Responses.$200>
  }
  ['/investment/presubscription']: {
    /**
     * investmentControllerCreatePresubscription - Create presubscription
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.InvestmentControllerCreatePresubscription.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvestmentControllerCreatePresubscription.Responses.$200>
  }
  ['/feedback']: {
    /**
     * feedbackControllerGetFeedbackForms - Get feedback forms
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FeedbackControllerGetFeedbackForms.Responses.$200>
    /**
     * feedbackControllerAddFeedback - Add feedback form
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.FeedbackControllerAddFeedback.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FeedbackControllerAddFeedback.Responses.$200>
  }
  ['/feedback/{formName}/answer']: {
    /**
     * feedbackControllerAnswerFeedback - Answer for feedback form by name
     */
    'post'(
      parameters?: Parameters<Paths.FeedbackControllerAnswerFeedback.PathParameters> | null,
      data?: Paths.FeedbackControllerAnswerFeedback.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FeedbackControllerAnswerFeedback.Responses.$200>
  }
  ['/company']: {
    /**
     * companyControllerCreateCompany - Create a new company
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CompanyControllerCreateCompany.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerCreateCompany.Responses.$200>
  }
  ['/company/{id}/member']: {
    /**
     * companyControllerCreateCompanyMember - Add company member
     */
    'post'(
      parameters?: Parameters<Paths.CompanyControllerCreateCompanyMember.PathParameters> | null,
      data?: Paths.CompanyControllerCreateCompanyMember.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerCreateCompanyMember.Responses.$200>
  }
  ['/company/{id}/file/{documentType}']: {
    /**
     * companyControllerUploadCompanyFile - Upload company file
     */
    'post'(
      parameters?: Parameters<Paths.CompanyControllerUploadCompanyFile.PathParameters> | null,
      data?: Paths.CompanyControllerUploadCompanyFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerUploadCompanyFile.Responses.$200>
  }
  ['/campaign']: {
    /**
     * campaignControllerCreateCampaign - Create a new campaign
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CampaignControllerCreateCampaign.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerCreateCampaign.Responses.$200>
  }
  ['/campaign/{id}/member']: {
    /**
     * campaignControllerCreateCampaignMember - Add campaign member
     */
    'post'(
      parameters?: Parameters<Paths.CampaignControllerCreateCampaignMember.PathParameters & Paths.CampaignControllerCreateCampaignMember.QueryParameters> | null,
      data?: Paths.CampaignControllerCreateCampaignMember.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerCreateCampaignMember.Responses.$200>
  }
  ['/campaign/{id}/issueTokens']: {
    /**
     * campaignControllerIssueCampaignTokens - Issue campaign tokens
     */
    'post'(
      parameters?: Parameters<Paths.CampaignControllerIssueCampaignTokens.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerIssueCampaignTokens.Responses.$200>
  }
  ['/campaign/{id}/file/{documentType}']: {
    /**
     * campaignControllerUploadCampaignFile - Upload campaign file
     */
    'post'(
      parameters?: Parameters<Paths.CampaignControllerUploadCampaignFile.PathParameters> | null,
      data?: Paths.CampaignControllerUploadCampaignFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerUploadCampaignFile.Responses.$200>
  }
  ['/auth/updatePassword']: {
    /**
     * authControllerUpdatePassword - Request to update password with reset password token
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerUpdatePassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerUpdatePassword.Responses.$200>
  }
  ['/auth/resetPassword']: {
    /**
     * authControllerResetPassword - Request to reset password
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerResetPassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerResetPassword.Responses.$200>
  }
  ['/auth/register']: {
    /**
     * authControllerRegister - Register endpoint
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerRegister.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerRegister.Responses.$200>
  }
  ['/auth/login']: {
    /**
     * authControllerLogin - Login endpoint
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerLogin.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerLogin.Responses.$200>
  }
  ['/2fa/authenticate']: {
    /**
     * twoFactorAuthenticationControllerAuthenticate - Generate token to access API when user has 2FA activated
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.TwoFactorAuthenticationControllerAuthenticate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TwoFactorAuthenticationControllerAuthenticate.Responses.$200>
  }
  ['/user/{id}/simple']: {
    /**
     * userControllerGetSimpleUserById - Get Simple User
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetSimpleUserById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetSimpleUserById.Responses.$200>
  }
  ['/user/{id}/onboard/status']: {
    /**
     * getUserOnboardingStatus - Get User Onboarding Status
     */
    'get'(
      parameters?: Parameters<Paths.GetUserOnboardingStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserOnboardingStatus.Responses.$200>
  }
  ['/user/{id}/kycfiles']: {
    /**
     * getUserKycFiles - Get user kyc files
     */
    'get'(
      parameters?: Parameters<Paths.GetUserKycFiles.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserKycFiles.Responses.$200>
  }
  ['/user/{id}/kyc/{fileId}']: {
    /**
     * userControllerGetKycFile - Download kyc file for specific user ID
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetKycFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/user/{id}/kyc/details']: {
    /**
     * getLastUserKyc - Get last user kyc
     */
    'get'(
      parameters?: Parameters<Paths.GetLastUserKyc.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLastUserKyc.Responses.$200>
  }
  ['/user/{id}/investments/simple']: {
    /**
     * userControllerGetUserInvestmentsByUserId - Get User Simple Investments
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetUserInvestmentsByUserId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetUserInvestmentsByUserId.Responses.$200>
  }
  ['/user/{id}/companies']: {
    /**
     * getUserCompanies - Get user companies
     */
    'get'(
      parameters?: Parameters<Paths.GetUserCompanies.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserCompanies.Responses.$200>
  }
  ['/user/{id}/campaigns']: {
    /**
     * getUserCampaigns - Get user campaigns
     */
    'get'(
      parameters?: Parameters<Paths.GetUserCampaigns.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserCampaigns.Responses.$200>
  }
  ['/user/{id}/campaigns/simple']: {
    /**
     * getSimpleCampaignsByUser - Get User Simple Campaigns
     */
    'get'(
      parameters?: Parameters<Paths.GetSimpleCampaignsByUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSimpleCampaignsByUser.Responses.$200>
  }
  ['/user/question/list']: {
    /**
     * userControllerGetUserQuestionList - List all active questions
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetUserQuestionList.Responses.$200>
  }
  ['/user/onboard/{id}/files']: {
    /**
     * userControllerGetUserOnboardFiles - Get files for specific onboard ID
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetUserOnboardFiles.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetUserOnboardFiles.Responses.$200>
  }
  ['/user/onboard/{id}/file/{fileId}']: {
    /**
     * userControllerGetUserOnboardDocument - Download documents for specific onboard ID
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetUserOnboardDocument.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * userControllerDeleteOnboardFile - Delete onboard file
     */
    'delete'(
      parameters?: Parameters<Paths.UserControllerDeleteOnboardFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerDeleteOnboardFile.Responses.$200>
  }
  ['/user/onboard/list']: {
    /**
     * userControllerGetUserOnboardList - List all onboard requests
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetUserOnboardList.Responses.$200>
  }
  ['/user/list']: {
    /**
     * userControllerUserList - List all registered users
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerUserList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerUserList.Responses.$200>
  }
  ['/user/issuer/list']: {
    /**
     * userControllerUserIssuerList - List all issuers
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerUserIssuerList.Responses.$200>
  }
  ['/user/investor/list']: {
    /**
     * userControllerUserInvestorList - List all investors
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerUserInvestorList.Responses.$200>
  }
  ['/user/answer/list/{investmentId}']: {
    /**
     * userControllerGetUserAnswerList - List answers to questions
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetUserAnswerList.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetUserAnswerList.Responses.$200>
  }
  ['/news-feed/list']: {
    /**
     * newsFeedControllerGetNewsFeedList - List all news feed posts
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsFeedControllerGetNewsFeedList.Responses.$200>
  }
  ['/news-feed/file/{fileId}']: {
    /**
     * newsFeedControllerDownloadNewsFeedFile - Download news feed file
     */
    'get'(
      parameters?: Parameters<Paths.NewsFeedControllerDownloadNewsFeedFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * newsFeedControllerDeleteNewsFeedFile - Delete news feed file
     */
    'delete'(
      parameters?: Parameters<Paths.NewsFeedControllerDeleteNewsFeedFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsFeedControllerDeleteNewsFeedFile.Responses.$200>
  }
  ['/investment/{id}/files']: {
    /**
     * investmentControllerGetInvestmentFiles - Get files from investment request
     */
    'get'(
      parameters?: Parameters<Paths.InvestmentControllerGetInvestmentFiles.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvestmentControllerGetInvestmentFiles.Responses.$200>
  }
  ['/investment/{id}/file/{fileId}']: {
    /**
     * investmentControllerDownloadInvestmentFile - Download investment file
     */
    'get'(
      parameters?: Parameters<Paths.InvestmentControllerDownloadInvestmentFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * investmentControllerDeleteInvestmentFile - Delete investment file
     */
    'delete'(
      parameters?: Parameters<Paths.InvestmentControllerDeleteInvestmentFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvestmentControllerDeleteInvestmentFile.Responses.$200>
  }
  ['/investment/list']: {
    /**
     * investmentControllerGetInvestments - Get investments request
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvestmentControllerGetInvestments.Responses.$200>
  }
  ['/investment/campaign/{id}']: {
    /**
     * investmentControllerGetAllInvestmentsFromCampaign - Get investment request
     */
    'get'(
      parameters?: Parameters<Paths.InvestmentControllerGetAllInvestmentsFromCampaign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvestmentControllerGetAllInvestmentsFromCampaign.Responses.$200>
  }
  ['/hello']: {
    /**
     * test
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/hello/user']: {
    /**
     * helloUser
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/hello/pubsub']: {
    /**
     * testPubSub
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestPubSub.Responses.$200>
  }
  ['/hello/admin']: {
    /**
     * helloAdmin
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/feedback/{id}/answers']: {
    /**
     * feedbackControllerGetAllFeedbackAnswers - Get Feedback form answers
     */
    'get'(
      parameters?: Parameters<Paths.FeedbackControllerGetAllFeedbackAnswers.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FeedbackControllerGetAllFeedbackAnswers.Responses.$200>
  }
  ['/feedback/{formName}']: {
    /**
     * feedbackControllerGetFeedbackForm - Get feedback form data by form name
     */
    'get'(
      parameters?: Parameters<Paths.FeedbackControllerGetFeedbackForm.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FeedbackControllerGetFeedbackForm.Responses.$200>
  }
  ['/company/{id}/member/list']: {
    /**
     * companyControllerGetCompanyMembers - Get company members
     */
    'get'(
      parameters?: Parameters<Paths.CompanyControllerGetCompanyMembers.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerGetCompanyMembers.Responses.$200>
  }
  ['/company/{id}/files/list']: {
    /**
     * companyControllerGetCompanyFiles - Get company files
     */
    'get'(
      parameters?: Parameters<Paths.CompanyControllerGetCompanyFiles.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerGetCompanyFiles.Responses.$200>
  }
  ['/company/{id}/file/{fileId}']: {
    /**
     * companyControllerDownloadCompanyFile - Download company file
     */
    'get'(
      parameters?: Parameters<Paths.CompanyControllerDownloadCompanyFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * companyControllerDeleteCompanyFile - Delete company file
     */
    'delete'(
      parameters?: Parameters<Paths.CompanyControllerDeleteCompanyFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerDeleteCompanyFile.Responses.$200>
  }
  ['/company/list']: {
    /**
     * companyControllerGetCompanyList - List all companies
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompanyControllerGetCompanyList.Responses.$200>
  }
  ['/campaign/{id}/status']: {
    /**
     * getSimpleCampaignById - Get Simple Campaign By Id
     */
    'get'(
      parameters?: Parameters<Paths.GetSimpleCampaignById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSimpleCampaignById.Responses.$200>
  }
  ['/campaign/{id}/public']: {
    /**
     * campaignControllerGetPublicCampaign - Get public campaign
     */
    'get'(
      parameters?: Parameters<Paths.CampaignControllerGetPublicCampaign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerGetPublicCampaign.Responses.$200>
  }
  ['/campaign/{id}/member/list']: {
    /**
     * campaignControllerGetCampaignMembers - Get campaign members
     */
    'get'(
      parameters?: Parameters<Paths.CampaignControllerGetCampaignMembers.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerGetCampaignMembers.Responses.$200>
  }
  ['/campaign/{id}/files/list']: {
    /**
     * campaignControllerGetCampaignFiles - Get campaign files
     */
    'get'(
      parameters?: Parameters<Paths.CampaignControllerGetCampaignFiles.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerGetCampaignFiles.Responses.$200>
  }
  ['/campaign/{id}/file/{fileId}']: {
    /**
     * campaignControllerDownloadCampaignFile - Download campaign file
     */
    'get'(
      parameters?: Parameters<Paths.CampaignControllerDownloadCampaignFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * campaignControllerDeleteCampaignFile - Delete campaign file
     */
    'delete'(
      parameters?: Parameters<Paths.CampaignControllerDeleteCampaignFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerDeleteCampaignFile.Responses.$200>
  }
  ['/campaign/member/{memberId}/avatar']: {
    /**
     * campaignControllerDownloadCampaignMemberAvatar - Download campaign member avatar
     */
    'get'(
      parameters?: Parameters<Paths.CampaignControllerDownloadCampaignMemberAvatar.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/campaign/list']: {
    /**
     * campaignControllerGetCampaignList - List all campaigns
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerGetCampaignList.Responses.$200>
  }
  ['/campaign/list/public']: {
    /**
     * campaignControllerGetPublicCampaignList - List public campaigns
     */
    'get'(
      parameters?: Parameters<Paths.CampaignControllerGetPublicCampaignList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignControllerGetPublicCampaignList.Responses.$200>
  }
  ['/auth/google/callback']: {
    /**
     * authControllerGetLoggedInUser - Callback endpoint for Google Auth
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerGetLoggedInUser.Responses.$200>
  }
  ['/auth/email/confirm']: {
    /**
     * authControllerEmailConfirm - Set user email to verified if token is valid
     */
    'get'(
      parameters?: Parameters<Paths.AuthControllerEmailConfirm.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerEmailConfirm.Responses.$200>
  }
  ['/audit/list']: {
    /**
     * auditControllerGetAuditList - List audit logs
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuditControllerGetAuditList.Responses.$200>
  }
  ['/2fa/generate']: {
    /**
     * twoFactorAuthenticationControllerTwoFactorAuthenticateGenerate - Generate qrcode to activate 2FA
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TwoFactorAuthenticationControllerTwoFactorAuthenticateGenerate.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
