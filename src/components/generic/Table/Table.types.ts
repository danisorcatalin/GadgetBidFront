import type { FC } from 'react';
import { keyable } from 'types/util';

export interface TableTab {
  label: string;
  value: string;
}

export interface TableHeader {
  cellProps?: Array<{ prop: string; value: string }>;
  cellValue?: FC | string;
  cellType?: RowCellType;
}

export enum RowCellType {
  TEXT = 'TEXT',
  INVESTMENT_TEXT = 'INVESTMENT_TEXT',
  INVESTMENT_COMPANY_TEXT = 'INVESTMENT_COMPANY_TEXT',
  TEXT_WITH_TOOLTIP = 'TEXT_WITH_TOOLTIP',
  CHECKBOX = 'CHECKBOX',
  STATUS = 'STATUS',
  MANAGER_ACTIONS = 'MANAGER_ACTIONS',
  DOWNLOAD_BUTTON = 'DOWNLOAD_BUTTON',
  UPLOAD_BUTTON = 'UPLOAD_BUTTON',
  VIEW_BUTTON = 'VIEW_BUTTON',
  DISCARD_BUTTON = 'DiSCARD_BUTTON',
  LINK = 'LINK',
  DOCUMENT_NAME = 'DOCUMENT_NAME',
  INFO_BUTTON = 'INFO_BUTTON',
  SPACER = 'SPACER',
}
export interface RowCell {
  type: RowCellType;
  dataKey?: string;
  extra?: keyable;
  readonly?: boolean;
}

export interface TableProps<T> {
  rows: T[];
  tabs?: TableTab[];
  header: TableHeader[];
  rowCells: RowCell[];
  showTabs?: boolean;
  showHeader?: boolean;
  showSearch?: boolean;
  showSortBy?: boolean;
  showPagination?: boolean;
  paginationLimit?: number;
  handleFileDownload?: (rowData) => void;
  handleFileUpload?: (rowData) => void;
  handleFileView?: (rowData) => void;
  handleFileDiscard?: (rowData) => void;
  className?: string;
  readonly?: boolean;
  type?: 'documents';
}

export type Sort = 'updatedAt|desc' | 'updatedAt|asc' | 'id|desc' | 'id|asc';

export interface SortOption {
  value: Sort;
  label: string;
}
