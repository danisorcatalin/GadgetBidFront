import { Components } from '../lib/GadgetClientJava';
import { Components as JavaComponents } from '../lib/GadgetClientJava';
import { CampaignPresentationFileType } from './campaign';
import { InvestmentFile, InvestmentFileType } from './investment';

export type UserOnboardFile = JavaComponents.Schemas.UserOnboardFileOutputDto;
export type UserOnboardFileType = JavaComponents.Schemas.UserOnboardFileType;

export type CompanyFile = JavaComponents.Schemas.CompanyFileDto;
export type CompanyFileType = JavaComponents.Schemas.CompanyFileType;

export type CampaignFile = JavaComponents.Schemas.CampaignFileDto;
export type CampaignFileType = JavaComponents.Schemas.CampaignFileType;

export type UserKycFile = JavaComponents.Schemas.UserKycFileDto & { mimeType?: string };
export type UserKycFileType = JavaComponents.Schemas.UserKycFileType;

export type NewsFeedFile = Components.Schemas.NewsFeedFileDto & { mimeType?: string };
export type NewsFeedFileType = Components.Schemas.NewsFeedFileType;

export type FileDtoUnion =
  | UserOnboardFile
  | CompanyFile
  | CampaignFile
  | InvestmentFile
  | UserKycFile
  | NewsFeedFile;
export type FileTypeUnion =
  | UserOnboardFileType
  | CompanyFileType
  | CampaignFileType
  | InvestmentFileType
  | UserKycFileType
  | NewsFeedFileType
  | CampaignPresentationFileType;

export interface Document<FileType extends FileTypeUnion = FileTypeUnion> {
  label: string;
  type: FileType;
  tooltipText?: string;
  infoText?: string;
  name?: string;

  /**
   * specify fileTypes here for react-dropzone
   * upload file type validation (currently only image
   * files are working, see CompanyDocumentsTable)
   */
  acceptUploadFileType?: string;
  viewMimeType?: string;
  /**
   * specify here if you want the row to be
   * readonly ( donwload/upload disabled)
   */
  readonly?: boolean;
}

export type AugmentedDocument<
  FileDto extends FileDtoUnion = FileDtoUnion,
  FileType extends FileTypeUnion = FileTypeUnion
> = Document<FileType> & FileDto;

export type UploadDocument<FileType extends FileTypeUnion = FileTypeUnion> = (
  relationId: number,
  documentType: FileType,
  file: File
) => Promise<void>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type DiscardDocument<FileType extends FileTypeUnion = FileTypeUnion> = (
  relationId: number,
  fileId: number
) => Promise<void>;
